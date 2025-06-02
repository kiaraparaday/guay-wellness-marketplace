
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { filterEventBus } from "@/services/eventBus";
import { Button } from "@/components/ui/button";
import { useSolutions } from "@/hooks/useSolutions";
import { RefreshCw } from "lucide-react";

const SolutionsSection = ({ 
  filteredSolutions, 
  setFilters 
}) => {
  const { loading, error, refetch } = useSolutions();

  const handleRetryLoad = () => {
    refetch();
  };

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-quicksand">Cargando soluciones...</p>
            <p className="text-sm text-muted-foreground mt-2">Conectando con la base de datos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-lg text-red-600 font-quicksand mb-4">Error al cargar soluciones</p>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold font-quicksand">
            Soluciones destacadas
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
            <p className="text-lg mb-4 font-quicksand">No encontramos soluciones con estos filtros. Intenta ajustar tu búsqueda.</p>
            <Button
              variant="guay-primary"
              size="grande"
              onClick={() => {
                const emptyFilters = {
                  solutionTypes: [],
                  modalities: [],
                  durations: [],
                  audiences: [],
                  competencies: [],
                  benefits: [],
                  categories: []
                };
                setFilters(emptyFilters);
                filterEventBus.publish('filtersChanged', emptyFilters);
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
