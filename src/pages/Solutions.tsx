
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import { Link } from "react-router-dom";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportSolutionsToCSV, exportAllMarketplaceData } from "@/utils/exportUtils";
import { toast } from "sonner";
import { filterEventBus } from "@/services/eventBus";
import { useSolutions } from "@/hooks/useSolutions";

const SolutionsPage: React.FC = () => {
  const { solutions: allSolutions, loading, error, refetch } = useSolutions();
  const [filters, setFilters] = useState({
    solutionTypes: [] as string[],
    modalities: [] as string[],
    durations: [] as string[],
    audiences: [] as string[],
  });
  
  const [filteredSolutions, setFilteredSolutions] = useState(allSolutions);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters: typeof filters) => {
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = allSolutions.filter(solution => {
      const typeMatch = filters.solutionTypes.length === 0 || filters.solutionTypes.includes(solution.type);
      const modalityMatch = filters.modalities.length === 0 || filters.modalities.includes(solution.modality);
      
      return typeMatch && modalityMatch;
    });
    
    setFilteredSolutions(filtered);
  }, [filters, allSolutions]);

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length;
    
  const handleExportSolutions = async () => {
    try {
      await exportSolutionsToCSV();
      toast.success("Soluciones exportadas correctamente desde Firebase");
    } catch (error) {
      console.error("Error al exportar soluciones:", error);
      toast.error("Ha ocurrido un error al exportar las soluciones");
    }
  };
  
  const handleExportAllData = async () => {
    try {
      await exportAllMarketplaceData();
      toast.success("Datos del marketplace exportados correctamente desde Firebase");
    } catch (error) {
      console.error("Error al exportar todos los datos:", error);
      toast.error("Ha ocurrido un error al exportar los datos del marketplace");
    }
  };

  const handleRetryLoad = () => {
    refetch();
    toast.info("Reintentando cargar datos desde Firebase...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      <section className="pt-20 pb-12 px-6 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4 animate-fade-in font-quicksand">
                Catálogo de Soluciones
                {loading && <span className="text-lg text-muted-foreground ml-2">(Cargando desde Firebase...)</span>}
              </h1>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                {error ? 
                  "Error al cargar desde Firebase. Verifica la conexión." :
                  "Explora nuestra amplia gama de servicios cargados directamente desde Firebase"
                }
              </p>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 mb-2">{error}</p>
                  <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reintentar
                  </Button>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 justify-end items-start">
              <Button 
                onClick={handleExportSolutions} 
                variant="outline"
                className="flex items-center gap-2"
                disabled={loading || error !== null}
              >
                <Download className="h-4 w-4" />
                Exportar Soluciones
              </Button>
              <Button 
                onClick={handleExportAllData} 
                variant="default"
                className="flex items-center gap-2"
                disabled={loading || error !== null}
              >
                <Download className="h-4 w-4" />
                Exportar Todos los Datos
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold font-quicksand">
              Soluciones desde Firebase
              <span className="ml-2 text-lg text-muted-foreground font-normal">
                ({loading ? "..." : filteredSolutions.length})
              </span>
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-quicksand">Cargando soluciones desde Firebase...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-lg text-red-600 font-quicksand mb-4">{error}</p>
              <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
                <RefreshCw className="h-4 w-4" />
                Reintentar carga
              </Button>
            </div>
          ) : filteredSolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((solution, index) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          ) : allSolutions.length === 0 ? (
            <div className="text-center py-12 bg-yellow-50 rounded-lg">
              <p className="text-lg mb-4 font-quicksand">No hay soluciones en Firebase</p>
              <p className="text-sm text-muted-foreground mb-4">
                Asegúrate de haber subido las soluciones a la colección 'solutions' en Firebase
              </p>
              <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
                <RefreshCw className="h-4 w-4" />
                Verificar Firebase
              </Button>
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
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200 font-quicksand"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl overflow-hidden shadow-md">
            <div className="p-8 sm:p-12 text-white">
              <h2 className="text-3xl font-semibold mb-4 font-quicksand">
                ¿Necesitas una solución personalizada?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl">
                Si no encuentras la solución que buscas, nuestro equipo puede diseñar
                un programa a medida para las necesidades específicas de tu organización.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="grande" 
                  variant="guay-cta-secondary"
                  className="bg-white/10 text-white border-2 border-white hover:bg-white/20 font-quicksand"
                >
                  <Link to="/request-solution">Solicitar una solución</Link>
                </Button>
                <Button 
                  asChild 
                  size="grande" 
                  variant="guay-cta-primary"
                  className="bg-[#A2C73F] text-white hover:bg-[#A2C73F]/90 font-quicksand"
                >
                  <Link to="/appointment">Agendar una cita</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-8 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SolutionsPage;
