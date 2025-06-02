
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/services/firebaseService";
import { SolutionType } from "@/components/SolutionCard";
import { solutionsArray } from "@/data/solutions";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    console.log("useSolutions: Setting up real-time listener for all solutions...");
    setLoading(true);
    setError(null);
    setIsUsingFallback(false);

    // Set up real-time listener for solutions collection
    const unsubscribe = onSnapshot(
      collection(db, "solutions"),
      (snapshot) => {
        console.log("useSolutions: Real-time update received, snapshot size:", snapshot.size);
        console.log("useSolutions: Snapshot empty?", snapshot.empty);
        
        if (!snapshot.empty) {
          const solutionsData: SolutionType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log("useSolutions: Processing solution document:", doc.id, data.title);
            
            // Fix Kiara image URL issue and ensure all required fields
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
              // Replace broken image with placeholder if needed
              image: data.image === "Kiara y reduccion del estres" ? 
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80" : 
                data.image || "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
              ...data
            } as SolutionType;
            solutionsData.push(solutionData);
          });
          
          console.log("useSolutions: Successfully loaded solutions from Firebase:", solutionsData.length);
          console.log("useSolutions: Solution titles:", solutionsData.map(s => s.title));
          setSolutions(solutionsData);
          setIsUsingFallback(false);
          setError(null);
        } else {
          console.log("useSolutions: No solutions found in Firebase, using local fallback data");
          console.log("useSolutions: Local fallback has", solutionsArray.length, "solutions");
          setIsUsingFallback(true);
          setSolutions(solutionsArray);
          setError("Usando datos locales - no hay soluciones en Firebase");
        }
        setLoading(false);
      },
      (err) => {
        console.error("useSolutions: Real-time listener error:", err);
        console.log("useSolutions: Falling back to local data due to error");
        setError(`Error de conexión: ${err.message}`);
        setIsUsingFallback(true);
        setSolutions(solutionsArray);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => {
      console.log("useSolutions: Cleaning up real-time listener");
      unsubscribe();
    };
  }, []);

  const refetch = () => {
    console.log("useSolutions: Manual refetch called (real-time listener will handle updates)");
    // With real-time listeners, manual refetch is not needed
    // The listener will automatically update when data changes
  };

  return {
    solutions,
    loading,
    error,
    isUsingFallback,
    refetch
  };
};
