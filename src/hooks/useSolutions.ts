
import { useState, useEffect } from "react";
import { getAllSolutionsFromFirebase } from "@/services/firebaseService";
import { SolutionType } from "@/components/SolutionCard";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSolutions = async () => {
    try {
      console.log("Fetching solutions from Firebase only...");
      setLoading(true);
      setError(null);
      
      const result = await getAllSolutionsFromFirebase();
      
      if (result.success) {
        console.log("Solutions loaded from Firebase:", result.solutions.length);
        setSolutions(result.solutions as SolutionType[]);
        
        if (result.solutions.length === 0) {
          setError("No hay soluciones disponibles en Firebase");
        }
      } else {
        console.error("Error loading from Firebase:", result.error);
        setError("Error al cargar las soluciones desde Firebase");
        setSolutions([]);
      }
    } catch (err) {
      console.error("Error fetching solutions:", err);
      setError("Error de conexión con Firebase");
      setSolutions([]);
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
