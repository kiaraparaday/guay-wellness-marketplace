
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSolutions } from "../hooks/useSolutions.js";
import { getDimensionById } from "../data/dimensionsData";
import Header from "../components/Header.jsx";
import CompetencyFilterBar from "../components/CompetencyFilterBar.jsx";
import CallToActionSection from "../components/CallToActionSection.jsx";
import SimpleFooter from "../components/SimpleFooter";
import DimensionHero from "../components/dimension/DimensionHero.jsx";
import SolutionCard from "../components/SolutionCard.jsx";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const DimensionPage = () => {
  const { id } = useParams();
  const [dimension, setDimension] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    benefits: [],
    categories: []
  });

  const { solutions: allSolutions, loading: solutionsLoading } = useSolutions();

  // Initialize dimension data
  useEffect(() => {
    if (id) {
      try {
        const dimensionData = getDimensionById(id);
        setDimension(dimensionData);
      } catch (err) {
        console.error('Error loading dimension:', err);
        setDimension(null);
      }
    }
    setLoading(false);
  }, [id]);

  // Scroll to top when dimension changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Filter solutions for this dimension
  const getDimensionSolutions = () => {
    if (!dimension || !allSolutions || !Array.isArray(allSolutions)) {
      return [];
    }

    const dimensionCompetencies = dimension.competencies || [];
    const competencyIds = dimensionCompetencies.map(comp => comp.id);

    return allSolutions.filter(solution => {
      if (!solution || !Array.isArray(solution.competencies)) {
        return false;
      }
      return solution.competencies.some(compId => competencyIds.includes(compId));
    });
  };

  // Apply filters to solutions
  const getFilteredSolutions = () => {
    const dimensionSolutions = getDimensionSolutions();
    
    if (!filters || Object.values(filters).every(arr => !arr || arr.length === 0)) {
      return dimensionSolutions;
    }

    return dimensionSolutions.filter(solution => {
      // Type filter
      const typeMatch = !filters.solutionTypes || filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      
      // Modality filter
      const modalityMatch = !filters.modalities || filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      
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
      } else {
        audienceCategory = "employees";
      }
      
      const audienceMatch = !filters.audiences || filters.audiences.length === 0 || 
        filters.audiences.includes(audienceCategory);

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

      // Categories filter (competencies)
      const categoriesMatch = !filters.categories || filters.categories.length === 0 || 
        (Array.isArray(solution.competencies) && filters.categories.some(category => {
          return solution.competencies.includes(category);
        }));
      
      return typeMatch && modalityMatch && durationMatch && audienceMatch && benefitsMatch && categoriesMatch;
    });
  };

  // Group solutions by competency
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

  const filteredSolutions = getFilteredSolutions();
  const solutionGroups = groupSolutionsByCompetency(filteredSolutions);
  const hasGroups = Object.keys(solutionGroups).length > 0;

  const totalActiveFilters = 
    (filters.solutionTypes ? filters.solutionTypes.length : 0) + 
    (filters.modalities ? filters.modalities.length : 0) + 
    (filters.durations ? filters.durations.length : 0) + 
    (filters.audiences ? filters.audiences.length : 0) +
    (filters.benefits ? filters.benefits.length : 0) +
    (filters.categories ? filters.categories.length : 0);

  // Show loading state
  if (loading || solutionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Cargando dimensión...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (!dimension) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-[40px] font-bold mb-4">Dimensión no encontrada</h2>
            <Button asChild variant="guay-primary" size="grande">
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      <DimensionHero dimension={dimension} />

      {/* Filters Section */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <CompetencyFilterBar 
            initialFilters={filters}
            onApplyFilters={(newFilters) => {
              setFilters(newFilters);
            }}
            isSticky={true}
          />
        </div>
      </div>

      {/* Solutions Section */}
      <section className="py-3 px-6">
        <div className="max-w-7xl mx-auto">
          {hasGroups ? (
            Object.values(solutionGroups).map((group) => (
              <div key={group.competency.id} className="mb-6" id={group.competency.id}>
                {/* Competency Header */}
                <div className="mb-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-base font-semibold mb-1 font-quicksand text-gray-800">
                    {group.competency.title || 'Sin título'}
                  </h2>
                  <p className="text-muted-foreground text-xs max-w-3xl font-quicksand">
                    {group.competency.description || 'Sin descripción'}
                  </p>
                </div>
                
                {/* Solutions Grid */}
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
                  setFilters(emptyFilters);
                }}
              >
                Limpiar filtros
              </Button>
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
