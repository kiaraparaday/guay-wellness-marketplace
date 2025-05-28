
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
    console.log("useSolutions: Setting up real-time listener...");
    setLoading(true);
    setError(null);
    setIsUsingFallback(false);

    // Set up real-time listener for solutions collection
    const unsubscribe = onSnapshot(
      collection(db, "solutions"),
      (snapshot) => {
        console.log("useSolutions: Real-time update received, size:", snapshot.size);
        
        if (!snapshot.empty) {
          const solutionsData: SolutionType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Fix Kiara image URL issue
            const solutionData = {
              id: doc.id,
              ...data,
              // Replace broken image with placeholder if needed
              image: data.image === "Kiara y reduccion del estres" ? 
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80" : 
                data.image
            } as SolutionType;
            solutionsData.push(solutionData);
            console.log("useSolutions: Solution loaded from Firebase:", doc.id);
          });
          
          console.log("useSolutions: Successfully loaded from Firebase real-time:", solutionsData.length);
          setSolutions(solutionsData);
          setIsUsingFallback(false);
          setError(null);
        } else {
          console.log("useSolutions: No solutions in Firebase, using local fallback");
          setIsUsingFallback(true);
          setSolutions(solutionsArray);
          setError("No hay soluciones en Firebase, usando datos locales");
        }
        setLoading(false);
      },
      (err) => {
        console.error("useSolutions: Real-time listener error:", err);
        setError("Error de conexión en tiempo real, usando datos locales");
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
