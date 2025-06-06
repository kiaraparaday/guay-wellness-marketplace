
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../services/firebaseService";
import { solutionsArray } from "../data/solutions";

export const useSolutions = () => {
  const [solutions, setSolutions] = useState(solutionsArray || []); // Start with local data with fallback
  const [loading, setLoading] = useState(false); // Don't start loading immediately
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true); // Default to local data

  useEffect(() => {
    console.log("useSolutions: Using local solutions as primary source");
    console.log("useSolutions: Loaded", (solutionsArray || []).length, "local solutions");
    
    if (!solutionsArray || solutionsArray.length === 0) {
      console.warn("useSolutions: No local solutions found, setting empty array");
      setSolutions([]);
      return;
    }

    // Set up Firebase as secondary source (optional)
    let unsubscribe;
    
    try {
      unsubscribe = onSnapshot(
        collection(db, "solutions"),
        (snapshot) => {
          if (!snapshot.empty) {
            const firebaseSolutions = [];
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
              };
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
    } catch (err) {
      console.log("useSolutions: Firebase setup error, using local data only:", err.message);
    }

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const refetch = () => {
    console.log("useSolutions: Refetch called - resetting to local data");
    setSolutions(solutionsArray || []);
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
