
import { useState, useEffect } from "react";
import { filterEventBus } from "../services/eventBus";

export const useDimensionFilters = () => {
  // Always initialize with the same structure
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: [],
  });

  // Always subscribe to events - no conditional logic
  useEffect(() => {
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters) => {
      // Safe update with fallback
      setFilters(prevFilters => ({
        solutionTypes: newFilters?.solutionTypes || [],
        modalities: newFilters?.modalities || [],
        durations: newFilters?.durations || [],
        audiences: newFilters?.audiences || [],
        benefits: newFilters?.benefits || [],
        categories: newFilters?.categories || [],
      }));
    });
    
    return unsubscribe || (() => {});
  }, []); // Empty dependency array - runs once

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length +
    filters.benefits.length +
    filters.categories.length;

  return {
    filters,
    setFilters,
    totalActiveFilters
  };
};
