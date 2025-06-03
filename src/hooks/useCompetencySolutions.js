
import { useState, useEffect } from "react";
import { filterEventBus } from "@/services/eventBus";
import { useSolutions } from "@/hooks/useSolutions";

export const useCompetencySolutions = (competencyId) => {
  const { solutions: allSolutions, loading, error } = useSolutions();
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: [],
  });
  
  // Set up initial solutions based on competency ID and subscribe to filter changes
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set initial solutions
    if (competencyId && allSolutions.length > 0) {
      const relatedSolutions = allSolutions.filter(solution => 
        solution.competencies && solution.competencies.includes(competencyId)
      );
      setSolutions(relatedSolutions);
    } else if (allSolutions.length > 0) {
      setSolutions(allSolutions);
    }

    // Subscribe to filter changes
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters) => {
      console.log('Filters received in useCompetencySolutions:', newFilters);
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, [competencyId, allSolutions]);

  // Apply filters whenever filters or solutions change
  useEffect(() => {
    console.log('Applying filters:', filters);
    console.log('Total solutions to filter:', solutions.length);
    
    if (solutions.length === 0) {
      setFilteredSolutions([]);
      return;
    }
    
    const filtered = solutions.filter(solution => {
      // Type filter
      const typeMatch = filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      
      // Modality filter
      const modalityMatch = filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      
      // Duration filter - map duration strings to categories
      let durationCategory = "";
      const durationString = solution.duration?.toLowerCase() || "";
      
      if (durationString.includes("hora")) {
        const hours = parseInt(durationString);
        if (hours < 2) durationCategory = "short";
        else if (hours >= 2 && hours <= 6) durationCategory = "medium";
        else durationCategory = "long";
      } else if (durationString.includes("día") || durationString.includes("dia")) {
        durationCategory = "long";
      } else if (durationString.includes("semana")) {
        durationCategory = "multi-session";
      } else if (durationString.includes("sesion") || durationString.includes("módulo")) {
        durationCategory = "multi-session";
      }
      
      const durationMatch = filters.durations.length === 0 || 
        filters.durations.includes(durationCategory);
      
      // Audience filter - map audience strings to categories
      let audienceCategory = "";
      const audienceString = solution.audience?.toLowerCase() || "";
      
      if (audienceString.includes("todos") || audienceString.includes("colaboradores")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("equipo")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("líder") || audienceString.includes("lider") || 
                audienceString.includes("directiv") || audienceString.includes("ejecutiv")) {
        audienceCategory = "leaders";
      } else if (audienceString.includes("recursos humanos") || audienceString.includes("rrhh")) {
        audienceCategory = "hr";
      } else {
        audienceCategory = "employees"; // Default fallback
      }
      
      const audienceMatch = filters.audiences.length === 0 || 
        filters.audiences.includes(audienceCategory);

      // Benefits filter
      const benefitsMatch = filters.benefits.length === 0 || 
        filters.benefits.some(benefit => {
          const solutionTags = solution.tags?.join(" ").toLowerCase() || "";
          const solutionTitle = solution.title?.toLowerCase() || "";
          const solutionDescription = solution.description?.toLowerCase() || "";
          
          switch (benefit) {
            case "stress":
              return solutionTags.includes("estrés") || solutionTitle.includes("estrés") || solutionDescription.includes("estrés");
            case "emotional-wellbeing":
              return solutionTags.includes("bienestar") || solutionTitle.includes("bienestar") || solutionDescription.includes("bienestar");
            case "mental-load":
              return solutionTags.includes("carga mental") || solutionTitle.includes("carga mental") || solutionDescription.includes("carga mental");
            case "productivity":
              return solutionTags.includes("productividad") || solutionTitle.includes("productividad") || solutionDescription.includes("productividad");
            case "leadership":
              return solutionTags.includes("liderazgo") || solutionTitle.includes("liderazgo") || solutionDescription.includes("liderazgo");
            case "teamwork":
              return solutionTags.includes("equipo") || solutionTitle.includes("equipo") || solutionDescription.includes("equipo");
            case "work-life-balance":
              return solutionTags.includes("equilibrio") || solutionTitle.includes("equilibrio") || solutionDescription.includes("equilibrio");
            case "inclusion":
              return solutionTags.includes("inclusión") || solutionTitle.includes("inclusión") || solutionDescription.includes("inclusión");
            default:
              return false;
          }
        });

      // Categories filter
      const categoriesMatch = filters.categories.length === 0 || 
        filters.categories.some(category => {
          if (!solution.competencies) return false;
          return solution.competencies.includes(category);
        });
      
      const allMatches = typeMatch && modalityMatch && durationMatch && audienceMatch && benefitsMatch && categoriesMatch;
      
      console.log('Solution:', solution.title, {
        typeMatch, modalityMatch, durationMatch, audienceMatch, benefitsMatch, categoriesMatch, allMatches
      });
      
      return allMatches;
    });
    
    console.log('Filtered solutions count:', filtered.length);
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
      filters.audiences.length +
      filters.benefits.length +
      filters.categories.length
  };
};
