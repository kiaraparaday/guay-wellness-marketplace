
import { useState, useEffect } from "react";
import { getAllSolutionsFromFirebase } from "@/services/firebaseService";
import { solutionsArray } from "@/data/solutions";
import { SolutionType } from "@/components/SolutionCard";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolutions = async () => {
    try {
      console.log("Starting to fetch solutions...");
      setLoading(true);
      setError(null);
      
      const result = await getAllSolutionsFromFirebase();
      
      if (result.success && result.solutions.length > 0) {
        console.log("Solutions loaded from Firebase:", result.solutions.length);
        setSolutions(result.solutions as SolutionType[]);
      } else {
        console.log("Using local solutions as fallback, Firebase returned:", result);
        setSolutions(solutionsArray);
      }
    } catch (err) {
      console.error("Error fetching solutions:", err);
      setError("Error al cargar las soluciones");
      setSolutions(solutionsArray); // Fallback to local data
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
    refetch: fetchSolutions
  };
};
