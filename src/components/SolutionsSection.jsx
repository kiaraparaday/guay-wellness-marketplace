
import React from "react";
import SolutionCard from "@/components/SolutionCard";
import { filterEventBus } from "@/services/eventBus";
import { Button } from "@/components/ui/button";
import CollapsibleFilters from "@/components/CollapsibleFilters";
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

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    filterEventBus.publish('filtersChanged', newFilters);
  };

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-quicksand">Cargando soluciones desde Firebase...</p>
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
            <p className="text-lg text-red-600 font-quicksand mb-4">Error al cargar desde Firebase</p>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" />
              Reintentar conexión con Firebase
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Posicionar filtros en la izquierda arriba del título */}
        <div className="mb-6">
          <CollapsibleFilters 
            filters={{
              solutionTypes: [],
              modalities: [],
              durations: [],
              audiences: [],
              benefits: [],
            }}
            onFiltersChange={handleFiltersChange}
          />
        </div>
        
        <div className="mb-8">
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
