
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { filterEventBus } from "@/services/eventBus";

interface SolutionsSectionProps {
  filteredSolutions: any[];
  setFilters: React.Dispatch<React.SetStateAction<{
    solutionTypes: string[];
    modalities: string[];
    durations: string[];
    audiences: string[];
  }>>;
}

const SolutionsSection: React.FC<SolutionsSectionProps> = ({ 
  filteredSolutions, 
  setFilters 
}) => {
  return (
    <section className="py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            Soluciones disponibles 
            <span className="ml-2 text-lg text-muted-foreground font-normal">
              ({filteredSolutions.length})
            </span>
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
            <p className="text-lg mb-4">No se encontraron soluciones con los filtros aplicados.</p>
            <button
              onClick={() => {
                const emptyFilters = {
                  solutionTypes: [],
                  modalities: [],
                  durations: [],
                  audiences: []
                };
                setFilters(emptyFilters);
                filterEventBus.publish('filtersChanged', emptyFilters);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;
