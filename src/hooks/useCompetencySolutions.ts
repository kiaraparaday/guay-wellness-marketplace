import { useState, useEffect } from "react";
import { filterEventBus } from "@/services/eventBus";
import { useSolutions } from "@/hooks/useSolutions";

interface Filters {
  solutionTypes: string[];
  modalities: string[];
  durations: string[];
  audiences: string[];
}

export const useCompetencySolutions = (competencyId: string | undefined) => {
  const { solutions: allSolutions, loading, error } = useSolutions(); // Now uses real-time updates
  const [solutions, setSolutions] = useState(allSolutions);
  const [filteredSolutions, setFilteredSolutions] = useState(allSolutions);
  const [filters, setFilters] = useState<Filters>({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
  });
  
  // Set up initial solutions based on competency ID - now responds to real-time updates
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (competencyId && allSolutions.length > 0) {
      const relatedSolutions = allSolutions.filter(solution => 
        solution.competencies.includes(competencyId)
      );
      setSolutions(relatedSolutions);
      setFilteredSolutions(relatedSolutions);
    } else if (allSolutions.length > 0) {
      setSolutions(allSolutions);
      setFilteredSolutions(allSolutions);
    }
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters: Filters) => {
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, [competencyId, allSolutions]); // This will re-run when allSolutions updates in real-time

  // Filter solutions based on current filters
  useEffect(() => {
    const filtered = solutions.filter(solution => {
      // Type filter
      const typeMatch = filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      
      // Modality filter
      const modalityMatch = filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      
      // Map duration strings to categories
      let durationCategory = "";
      const durationString = solution.duration?.toLowerCase() || "";
      
      if (durationString.includes("hora")) {
        const hours = parseInt(durationString);
        if (hours < 2) durationCategory = "short";
        else if (hours >= 2 && hours <= 6) durationCategory = "medium";
      } else if (durationString.includes("día") || durationString.includes("dia")) {
        durationCategory = "day";
      } else if (durationString.includes("semana")) {
        if (durationString.includes("4") || durationString.includes("5") || 
            durationString.includes("6") || durationString.includes("7") || 
            durationString.includes("8")) {
          durationCategory = "program";
        } else {
          durationCategory = "week";
        }
      }
      
      const durationMatch = filters.durations.length === 0 || 
        filters.durations.includes(durationCategory);
      
      // Map audience strings to categories
      let audienceCategory = "";
      const audienceString = solution.audience?.toLowerCase() || "";
      
      if (audienceString.includes("todos") || audienceString.includes("colaboradores")) {
        audienceCategory = "all";
      } else if (audienceString.includes("equipo")) {
        audienceCategory = "teams";
      } else if (audienceString.includes("líder") || audienceString.includes("lider") || 
                audienceString.includes("directiv") || audienceString.includes("ejecutiv")) {
        audienceCategory = "leaders";
      } else if (audienceString.includes("operativ")) {
        audienceCategory = "operational";
      }
      
      const audienceMatch = filters.audiences.length === 0 || 
        filters.audiences.includes(audienceCategory);
      
      return typeMatch && modalityMatch && durationMatch && audienceMatch;
    });
    
    setFilteredSolutions(filtered);
  }, [filters, solutions]);

  return {
    solutions,
    filteredSolutions,
    filters,
    setFilters,
    loading,
    error,
    totalActiveFilters: 
      filters.solutionTypes.length + 
      filters.modalities.length + 
      filters.durations.length + 
      filters.audiences.length
  };
};
