
import { useState, useEffect } from "react";
import { filterEventBus } from "../services/eventBus";

export const useDimensionFilters = (allDimensionSolutions = []) => {
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: [],
  });
  
  const [filteredSolutions, setFilteredSolutions] = useState([]);

  // Subscribe to filter changes
  useEffect(() => {
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters) => {
      console.log('Dimension page received filters:', newFilters);
      if (newFilters && typeof newFilters === 'object') {
        setFilters(newFilters);
      }
    });
    
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Apply filters when they change
  useEffect(() => {
    console.log('Applying filters:', filters);
    console.log('All dimension solutions:', allDimensionSolutions.length);
    
    // Always ensure we have an array to work with
    const solutionsToFilter = Array.isArray(allDimensionSolutions) ? allDimensionSolutions : [];
    
    if (solutionsToFilter.length === 0) {
      setFilteredSolutions([]);
      return;
    }

    const filtered = solutionsToFilter.filter(solution => {
      if (!solution || typeof solution !== 'object') {
        console.warn('Invalid solution object:', solution);
        return false;
      }
      
      console.log('Filtering solution:', solution.title);
      
      // Categories filter - if categories are selected, only show solutions from those categories
      const categoriesMatch = !filters.categories || filters.categories.length === 0 || 
        (Array.isArray(solution.competencies) && filters.categories.some(category => {
          return solution.competencies.includes(category);
        }));
      console.log('Categories match:', categoriesMatch, 'solution competencies:', solution.competencies, 'filters:', filters.categories);
      
      // If categories filter is active and this solution doesn't match, exclude it
      if (filters.categories && filters.categories.length > 0 && !categoriesMatch) {
        return false;
      }
      
      // Type filter
      const typeMatch = !filters.solutionTypes || filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      console.log('Type match:', typeMatch, 'solution type:', solution.type, 'filters:', filters.solutionTypes);
      
      // Modality filter
      const modalityMatch = !filters.modalities || filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      console.log('Modality match:', modalityMatch, 'solution modality:', solution.modality, 'filters:', filters.modalities);
      
      // Duration filter
      let durationCategory = "";
      const durationString = solution.duration ? solution.duration.toLowerCase() : "";
      
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
      
      const durationMatch = !filters.durations || filters.durations.length === 0 || 
        filters.durations.includes(durationCategory);
      console.log('Duration match:', durationMatch, 'solution duration:', solution.duration, 'category:', durationCategory, 'filters:', filters.durations);
      
      // Audience filter
      let audienceCategory = "";
      const audienceString = solution.audience ? solution.audience.toLowerCase() : "";
      
      if (audienceString.includes("todos") || audienceString.includes("colaboradores")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("equipo")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("líder") || audienceString.includes("lider") || 
                audienceString.includes("directiv") || audienceString.includes("ejecutiv")) {
        audienceCategory = "leaders";
      } else if (audienceString.includes("recursos humanos") || audienceString.includes("rrhh")) {
        audienceCategory = "hr";
      } else if (audienceString.includes("ejecutiv")) {
        audienceCategory = "executives";
      } else {
        audienceCategory = "employees";
      }
      
      const audienceMatch = !filters.audiences || filters.audiences.length === 0 || 
        filters.audiences.includes(audienceCategory);
      console.log('Audience match:', audienceMatch, 'solution audience:', solution.audience, 'category:', audienceCategory, 'filters:', filters.audiences);

      // Benefits filter
      const benefitsMatch = !filters.benefits || filters.benefits.length === 0 || 
        filters.benefits.some(benefit => {
          const solutionTags = Array.isArray(solution.tags) ? solution.tags.join(" ").toLowerCase() : "";
          const solutionTitle = solution.title ? solution.title.toLowerCase() : "";
          const solutionDescription = solution.description ? solution.description.toLowerCase() : "";
          
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
      console.log('Benefits match:', benefitsMatch, 'solution tags:', solution.tags, 'filters:', filters.benefits);
      
      const finalMatch = typeMatch && modalityMatch && durationMatch && audienceMatch && benefitsMatch && categoriesMatch;
      console.log('Final match for', solution.title, ':', finalMatch);
      
      return finalMatch;
    });
    
    console.log('Filtered solutions count:', filtered.length);
    setFilteredSolutions(filtered);
  }, [filters, allDimensionSolutions]);

  const totalActiveFilters = 
    (filters.solutionTypes ? filters.solutionTypes.length : 0) + 
    (filters.modalities ? filters.modalities.length : 0) + 
    (filters.durations ? filters.durations.length : 0) + 
    (filters.audiences ? filters.audiences.length : 0) +
    (filters.benefits ? filters.benefits.length : 0) +
    (filters.categories ? filters.categories.length : 0);

  return {
    filters,
    setFilters,
    filteredSolutions,
    totalActiveFilters
  };
};
