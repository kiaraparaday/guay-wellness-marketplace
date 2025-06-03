
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDimensionById } from "@/services/competenciesDataService";
import { useSolutions } from "@/hooks/useSolutions";
import { filterEventBus } from "@/services/eventBus";
import Header from "@/components/Header";
import CompetencyCard from "@/components/CompetencyCard";
import SolutionCard from "@/components/SolutionCard";
import CompetencyFilterBar from "@/components/CompetencyFilterBar";
import CallToActionSection from "@/components/CallToActionSection";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DimensionPage = () => {
  const { id } = useParams();
  const dimension = getDimensionById(id || "");
  const { solutions: allSolutions, loading, error } = useSolutions();
  
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: [],
  });
  
  const [filteredSolutions, setFilteredSolutions] = useState([]);

  // Set up solutions for this dimension
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (dimension && allSolutions.length > 0) {
      // Get competencies for this dimension
      const dimensionCompetencies = dimension.competencies || [];
      const competencyIds = dimensionCompetencies.map(comp => comp.id);
      
      // Filter solutions that belong to any competency in this dimension
      const relatedSolutions = allSolutions.filter(solution => 
        solution.competencies && solution.competencies.some(compId => 
          competencyIds.includes(compId)
        )
      );
      
      setFilteredSolutions(relatedSolutions);
    }
    
    // Subscribe to filter changes
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters) => {
      console.log('Dimension page received filters:', newFilters);
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, [dimension, allSolutions]);

  // Apply filters when they change
  useEffect(() => {
    if (!dimension || allSolutions.length === 0) return;

    // Get competencies for this dimension
    const dimensionCompetencies = dimension.competencies || [];
    const competencyIds = dimensionCompetencies.map(comp => comp.id);
    
    // First filter by dimension
    let solutions = allSolutions.filter(solution => 
      solution.competencies && solution.competencies.some(compId => 
        competencyIds.includes(compId)
      )
    );

    // Then apply user filters
    const filtered = solutions.filter(solution => {
      // Type filter
      const typeMatch = filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      
      // Modality filter
      const modalityMatch = filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      
      // Duration filter
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
      
      // Audience filter
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
        audienceCategory = "employees";
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
      
      return typeMatch && modalityMatch && durationMatch && audienceMatch && benefitsMatch && categoriesMatch;
    });
    
    console.log('Dimension filtered solutions:', filtered.length);
    setFilteredSolutions(filtered);
  }, [filters, dimension, allSolutions]);

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length +
    filters.benefits.length +
    filters.categories.length;

  if (!dimension) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">Dimensión no encontrada</h2>
          <Button asChild variant="guay-primary" size="grande">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost" className="pl-0">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4 animate-fade-in">
                {dimension.title}
              </h1>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                {dimension.description}
              </p>
            </div>
            
            {dimension.image && (
              <div className="flex justify-center lg:justify-end">
                <img 
                  src={dimension.image} 
                  alt={dimension.title}
                  className="w-full max-w-md h-64 object-cover rounded-xl shadow-subtle animate-fade-in"
                  style={{ animationDelay: "200ms" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Competencies Section */}
      {dimension.competencies && dimension.competencies.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 font-quicksand">
              Competencias de {dimension.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dimension.competencies.map((competency, index) => (
                <CompetencyCard
                  key={competency.id}
                  competency={competency}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CompetencyFilterBar initialFilters={filters} />
      </div>

      {/* Solutions Section */}
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
              )}
            </div>
          )}
        </div>
      </section>

      <CallToActionSection competencyTitle={dimension.title} />
      <SimpleFooter />
    </div>
  );
};

export default DimensionPage;
