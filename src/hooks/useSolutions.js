
import { useState, useEffect } from "react";
import { solutionsArray } from "../data/solutions";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState(solutionsArray);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  useEffect(() => {
    console.log("useSolutions: Using local solutions as primary source");
    console.log("useSolutions: Loaded", solutionsArray.length, "local solutions");
    setSolutions(solutionsArray);
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
