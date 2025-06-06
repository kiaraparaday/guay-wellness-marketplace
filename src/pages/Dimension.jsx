
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSolutions } from "../hooks/useSolutions";
import { useDimensionFilters } from "../hooks/useDimensionFilters";
import { filterEventBus } from "../services/eventBus";
import { getDimensionById } from "../data/dimensionsData";
import Header from "../components/Header";
import CompetencyFilterBar from "../components/CompetencyFilterBar";
import CallToActionSection from "../components/CallToActionSection";
import SimpleFooter from "../components/SimpleFooter";
import DimensionHero from "../components/dimension/DimensionHero";
import SolutionsSection from "../components/dimension/SolutionsSection";
import { Button } from "../components/ui/button";

const DimensionPage = () => {
  const { id } = useParams();
  const dimension = getDimensionById(id || "");
  const { solutions: allSolutions, loading, error } = useSolutions();
  
  const [allDimensionSolutions, setAllDimensionSolutions] = useState([]);
  
  const { filters, setFilters, filteredSolutions, totalActiveFilters } = useDimensionFilters(allDimensionSolutions);

  // Set up solutions for this dimension
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (dimension && allSolutions.length > 0) {
      console.log('Setting up solutions for dimension:', dimension.title);
      console.log('All solutions:', allSolutions.length);
      
      // Get competencies for this dimension
      const dimensionCompetencies = dimension.competencies || [];
      const competencyIds = dimensionCompetencies.map(comp => comp.id);
      console.log('Dimension competency IDs:', competencyIds);
      
      // Filter solutions that belong to any competency in this dimension
      const relatedSolutions = allSolutions.filter(solution => {
        const hasCompetency = solution.competencies && solution.competencies.some(compId => 
          competencyIds.includes(compId)
        );
        if (hasCompetency) {
          console.log('Solution matches dimension:', solution.title, solution.competencies);
        }
        return hasCompetency;
      });
      
      console.log('Related solutions found:', relatedSolutions.length);
      setAllDimensionSolutions(relatedSolutions);
    }
  }, [dimension, allSolutions]);

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
      
      <DimensionHero dimension={dimension} />

      {/* Filters Section - Minimal spacing */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <CompetencyFilterBar 
            initialFilters={filters}
            onApplyFilters={(newFilters) => {
              console.log('Applying filters from filter bar:', newFilters);
              setFilters(newFilters);
              filterEventBus.publish('filtersChanged', newFilters);
            }}
            isSticky={true}
          />
        </div>
      </div>

      <SolutionsSection 
        filteredSolutions={filteredSolutions}
        totalActiveFilters={totalActiveFilters}
        setFilters={setFilters}
        dimension={dimension}
      />

      <CallToActionSection competencyTitle={dimension.title} />
      <SimpleFooter />
    </div>
  );
};

export default DimensionPage;
