
import { useState, useEffect } from "react";
import { getAllSolutionsFromFirebase } from "@/services/firebaseService";
import { SolutionType } from "@/components/SolutionCard";
import { solutionsArray } from "@/data/solutions";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchSolutions = async () => {
    try {
      console.log("useSolutions: Starting to fetch solutions...");
      setLoading(true);
      setError(null);
      setIsUsingFallback(false);
      
      const result = await getAllSolutionsFromFirebase();
      
      if (result.success && result.solutions.length > 0) {
        console.log("useSolutions: Successfully loaded from Firebase:", result.solutions.length);
        setSolutions(result.solutions as SolutionType[]);
      } else {
        console.log("useSolutions: Firebase failed, using local fallback");
        setIsUsingFallback(true);
        setSolutions(solutionsArray);
        setError(result.error || "Error al cargar desde Firebase, usando datos locales");
      }
    } catch (err) {
      console.error("useSolutions: Unexpected error:", err);
      setError("Error de conexión, usando datos locales");
      setIsUsingFallback(true);
      setSolutions(solutionsArray);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return {
    solutions,
    loading,
    error,
    isUsingFallback,
    refetch: fetchSolutions
  };
};
