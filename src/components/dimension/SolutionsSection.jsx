
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { Button } from "@/components/ui/button";
import { filterEventBus } from "@/services/eventBus";

const SolutionsSection = ({ filteredSolutions, totalActiveFilters, setFilters }) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
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
