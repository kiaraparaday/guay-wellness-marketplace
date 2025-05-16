
import { useState, useEffect } from "react";
import { solutionsArray } from "@/data/solutions";
import { filterEventBus } from "@/services/eventBus";

interface Filters {
  solutionTypes: string[];
  modalities: string[];
  durations: string[];
  audiences: string[];
}

export const useCompetencySolutions = (competencyId: string | undefined) => {
  const [solutions, setSolutions] = useState(solutionsArray);
  const [filteredSolutions, setFilteredSolutions] = useState(solutionsArray);
  const [filters, setFilters] = useState<Filters>({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
  });
  
  // Set up initial solutions based on competency ID
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (competencyId) {
      const relatedSolutions = solutionsArray.filter(solution => 
        solution.competencies.includes(competencyId)
      );
      setSolutions(relatedSolutions);
      setFilteredSolutions(relatedSolutions);
    }
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters: Filters) => {
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, [competencyId]);

  // Filter solutions based on current filters
  useEffect(() => {
    const filtered = solutions.filter(solution => {
      const typeMatch = filters.solutionTypes.length === 0 || filters.solutionTypes.includes(solution.type);
      const modalityMatch = filters.modalities.length === 0 || filters.modalities.includes(solution.modality);
      
      return typeMatch && modalityMatch;
    });
    
    setFilteredSolutions(filtered);
  }, [filters, solutions]);

  return {
    solutions,
    filteredSolutions,
    filters,
    setFilters,
    totalActiveFilters: 
      filters.solutionTypes.length + 
      filters.modalities.length + 
      filters.durations.length + 
      filters.audiences.length
  };
};
