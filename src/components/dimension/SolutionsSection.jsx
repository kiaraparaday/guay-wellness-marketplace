
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { filterEventBus } from "@/services/eventBus";
import { Button } from "@/components/ui/button";

const SolutionsSection = ({ 
  filteredSolutions = [], 
  totalActiveFilters = 0, 
  setFilters, 
  dimension 
}) => {
  // Ensure filteredSolutions is always an array
  const safeSolutions = Array.isArray(filteredSolutions) ? filteredSolutions : [];
  
  // Group solutions by competency for display
  const groupSolutionsByCompetency = (solutions) => {
    const groups = {};
    
    if (!dimension || !dimension.competencies || !Array.isArray(dimension.competencies)) {
      return groups;
    }
    
    dimension.competencies.forEach(competency => {
      const competencySolutions = solutions.filter(solution => 
        solution && 
        solution.competencies && 
        Array.isArray(solution.competencies) && 
        solution.competencies.includes(competency.id)
      );
      
      if (competencySolutions.length > 0) {
        groups[competency.id] = {
          competency,
          solutions: competencySolutions
        };
      }
    });
    
    return groups;
  };

  const solutionGroups = groupSolutionsByCompetency(safeSolutions);
  const hasGroups = Object.keys(solutionGroups).length > 0;

  console.log('SolutionsSection render:', {
    safeSolutions: safeSolutions.length,
    hasGroups,
    dimension: dimension?.title
  });

  return (
    <section className="py-3 px-6">
      <div className="max-w-7xl mx-auto">
        {hasGroups ? (
          Object.values(solutionGroups).map((group) => (
            <div key={group.competency.id} className="mb-6" id={group.competency.id}>
              {/* Competency Header - Very compact */}
              <div className="mb-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold mb-1 font-quicksand text-gray-800">
                  {group.competency.title || 'Sin título'}
                </h2>
                <p className="text-muted-foreground text-xs max-w-3xl font-quicksand">
                  {group.competency.description || 'Sin descripción'}
                </p>
              </div>
              
              {/* Solutions Grid - Compact spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.solutions.map((solution, solutionIndex) => (
                  <SolutionCard 
                    key={solution.id || `solution-${solutionIndex}`} 
                    solution={solution} 
                    index={solutionIndex}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 bg-secondary/30 rounded-lg">
            <p className="text-lg mb-4 font-quicksand">
              No encontramos soluciones con estos filtros. Intenta ajustar tu búsqueda.
            </p>
            <Button
              variant="guay-primary"
              size="grande"
              onClick={() => {
                const emptyFilters = {
                  solutionTypes: [],
                  modalities: [],
                  durations: [],
                  audiences: [],
                  benefits: [],
                  categories: []
                };
                if (typeof setFilters === 'function') {
                  setFilters(emptyFilters);
                  filterEventBus.publish('filtersChanged', emptyFilters);
                }
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;
