
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/services/firebaseService";
import { SolutionType } from "@/components/SolutionCard";
import { solutionsArray } from "@/data/solutions";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>(solutionsArray); // Start with local data
  const [loading, setLoading] = useState(false); // Don't start loading immediately
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true); // Default to local data

  useEffect(() => {
    console.log("useSolutions: Using local solutions as primary source");
    console.log("useSolutions: Loaded", solutionsArray.length, "local solutions");
    
    // Set up Firebase as secondary source (optional)
    const unsubscribe = onSnapshot(
      collection(db, "solutions"),
      (snapshot) => {
        if (!snapshot.empty) {
          const firebaseSolutions: SolutionType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const solutionData = {
              id: doc.id,
              title: data.title || "Sin título",
              type: data.type || "workshop",
              modality: data.modality || "virtual",
              duration: data.duration || "1 hora",
              audience: data.audience || "Todos los colaboradores",
              description: data.description || "Sin descripción",
              competencies: data.competencies || [],
              tags: data.tags || [],
              categories: data.categories || [],
              image: data.image === "Kiara y reduccion del estres" ? 
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80" : 
                data.image || "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
              ...data
            } as SolutionType;
            firebaseSolutions.push(solutionData);
          });
          
          // Combine local and Firebase solutions, removing duplicates
          const combinedSolutions = [...solutionsArray];
          firebaseSolutions.forEach(fbSolution => {
            if (!combinedSolutions.find(localSolution => localSolution.id === fbSolution.id)) {
              combinedSolutions.push(fbSolution);
            }
          });
          
          console.log("useSolutions: Combined solutions count:", combinedSolutions.length);
          setSolutions(combinedSolutions);
          setIsUsingFallback(false);
        }
      },
      (err) => {
        console.log("useSolutions: Firebase error, using local data only:", err.message);
        // Continue using local data without error state
      }
    );

    return () => unsubscribe();
  }, []);

  const refetch = () => {
    console.log("useSolutions: Refetch called - resetting to local data");
    setSolutions(solutionsArray);
    setIsUsingFallback(true);
  };

  return {
    solutions,
    loading,
    error,
    isUsingFallback,
    refetch
  };
};
