
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
    totalActiveFilters: 
      filters.solutionTypes.length + 
      filters.modalities.length + 
      filters.durations.length + 
      filters.audiences.length
  };
};
