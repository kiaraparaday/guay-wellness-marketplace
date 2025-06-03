
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { Button } from "@/components/ui/button";
import { filterEventBus } from "@/services/eventBus";

const SolutionsSection = ({ filteredSolutions, totalActiveFilters, setFilters, dimension }) => {
  const handleClearFilters = () => {
    const emptyFilters = {
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: [],
      benefits: [],
      categories: []
    };
    setFilters(emptyFilters);
    filterEventBus.publish('filtersChanged', emptyFilters);
  };

  // Check if this is the psychosocial dimension to show grouped structure
  const isPsychosocialDimension = dimension?.id === "psychosocial";
  
  // Group solutions by category for psychosocial dimension
  const groupSolutionsByCategory = () => {
    if (!isPsychosocialDimension || !dimension?.competencies) {
      return null;
    }

    const grouped = {};
    
    // Initialize groups for each competency
    dimension.competencies.forEach(competency => {
      grouped[competency.id] = {
        competency,
        solutions: []
      };
    });

    // Distribute solutions into their respective categories
    filteredSolutions.forEach(solution => {
      if (solution.competencies && solution.competencies.length > 0) {
        solution.competencies.forEach(compId => {
          if (grouped[compId]) {
            grouped[compId].solutions.push(solution);
          }
        });
      }
    });

    return grouped;
  };

  const groupedSolutions = groupSolutionsByCategory();

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold font-quicksand">
            Soluciones disponibles
            <span className="ml-2 text-lg text-muted-foreground font-normal">
              ({filteredSolutions.length})
            </span>
            {totalActiveFilters > 0 && (
              <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                {totalActiveFilters} filtro{totalActiveFilters > 1 ? 's' : ''} activo{totalActiveFilters > 1 ? 's' : ''}
              </span>
            )}
          </h2>
        </div>
        
        {filteredSolutions.length > 0 ? (
          <>
            {isPsychosocialDimension && groupedSolutions ? (
              // Render grouped by categories for psychosocial dimension
              <div className="space-y-12">
                {Object.entries(groupedSolutions).map(([categoryId, { competency, solutions }]) => {
                  // Only show categories that have solutions or no category filter is active
                  if (solutions.length === 0) return null;
                  
                  return (
                    <div key={categoryId} className="space-y-6">
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold font-quicksand text-primary mb-2">
                          {competency.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {competency.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((solution, index) => (
                          <SolutionCard
                            key={solution.id}
                            solution={solution}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Default grid layout for other dimensions
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSolutions.map((solution, index) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-lg">
            <p className="text-lg mb-4 font-quicksand">
              {totalActiveFilters > 0 
                ? "No se encontraron soluciones con los filtros aplicados."
                : "No hay soluciones disponibles para esta dimensión."
              }
            </p>
            {totalActiveFilters > 0 && (
              <Button
                variant="guay-primary"
                size="grande"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;
