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

const SolutionsPage = () => {
  const { solutions: allSolutions, loading, error, refetch } = useSolutions();
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: [],
  });
  
  const [filteredSolutions, setFilteredSolutions] = useState(allSolutions);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters) => {
      console.log('Solutions page received filters:', newFilters);
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setFilteredSolutions(allSolutions);
  }, [allSolutions]);

  useEffect(() => {
    console.log('Filtering solutions with:', filters);
    console.log('Total solutions:', allSolutions.length);
    
    const filtered = allSolutions.filter(solution => {
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
      
      // Map audience strings to categories
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
      } else if (audienceString.includes("ejecutiv")) {
        audienceCategory = "executives";
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
      
      // Categories filter - check if solution competencies include any of the selected categories
      const categoriesMatch = filters.categories.length === 0 || 
        filters.categories.some(category => {
          if (!solution.competencies) return false;
          return solution.competencies.includes(category);
        });
      
      return typeMatch && modalityMatch && durationMatch && audienceMatch && benefitsMatch && categoriesMatch;
    });
    
    console.log('Filtered solutions count:', filtered.length);
    setFilteredSolutions(filtered);
  }, [filters, allSolutions]);

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length +
    filters.benefits.length +
    filters.categories.length;
    
  const handleExportSolutions = async () => {
    try {
      await exportSolutionsToCSV();
      toast.success("Soluciones exportadas correctamente");
    } catch (error) {
      console.error("Error al exportar soluciones:", error);
      toast.error("Ha ocurrido un error al exportar las soluciones");
    }
  };
  
  const handleExportAllData = async () => {
    try {
      await exportAllMarketplaceData();
      toast.success("Datos del marketplace exportados correctamente");
    } catch (error) {
      console.error("Error al exportar todos los datos:", error);
      toast.error("Ha ocurrido un error al exportar los datos del marketplace");
    }
  };

  const handleRetryLoad = () => {
    refetch();
    toast.info("Recargando soluciones...");
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
              </h1>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                Explora nuestra amplia gama de servicios de bienestar organizacional
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 justify-end items-start">
              <Button 
                onClick={handleExportSolutions} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar Soluciones
              </Button>
              <Button 
                onClick={handleExportAllData} 
                variant="default"
                className="flex items-center gap-2"
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
              Todas nuestras soluciones
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
              <p className="text-lg mb-4">No se encontraron soluciones con los filtros aplicados.</p>
              <button
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
