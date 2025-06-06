
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSolutions } from "../hooks/useSolutions.js";
import { useDimensionFilters } from "../hooks/useDimensionFilters.js";
import { filterEventBus } from "../services/eventBus";
import { getDimensionById } from "../data/dimensionsData";
import Header from "../components/Header.jsx";
import CompetencyFilterBar from "../components/CompetencyFilterBar.jsx";
import CallToActionSection from "../components/CallToActionSection.jsx";
import SimpleFooter from "../components/SimpleFooter";
import DimensionHero from "../components/dimension/DimensionHero.jsx";
import SolutionsSection from "../components/dimension/SolutionsSection.jsx";
import { Button } from "../components/ui/button";

const DimensionPage = () => {
  const { id } = useParams();
  const [dimension, setDimension] = useState(null);
  const [allDimensionSolutions, setAllDimensionSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Always call hooks in the same order
  const { solutions: allSolutions, loading: solutionsLoading, error } = useSolutions();
  const { filters, setFilters, filteredSolutions, totalActiveFilters } = useDimensionFilters(allDimensionSolutions);

  // Initialize dimension data
  useEffect(() => {
    console.log('Dimension effect running for id:', id);
    if (id) {
      try {
        const dimensionData = getDimensionById(id);
        console.log('Dimension data found:', dimensionData);
        setDimension(dimensionData);
      } catch (err) {
        console.error('Error loading dimension:', err);
        setDimension(null);
      }
    } else {
      setDimension(null);
    }
    setLoading(false);
  }, [id]);

  // Set up solutions for this dimension
  useEffect(() => {
    console.log('Solutions effect running');
    window.scrollTo(0, 0);
    
    if (dimension && allSolutions && Array.isArray(allSolutions)) {
      console.log('Setting up solutions for dimension:', dimension.title);
      console.log('All solutions:', allSolutions.length);
      
      // Get competencies for this dimension
      const dimensionCompetencies = Array.isArray(dimension.competencies) ? dimension.competencies : [];
      const competencyIds = dimensionCompetencies.map(comp => comp.id);
      console.log('Dimension competency IDs:', competencyIds);
      
      // Filter solutions that belong to any competency in this dimension
      const relatedSolutions = allSolutions.filter(solution => {
        if (!solution || !Array.isArray(solution.competencies)) {
          return false;
        }
        
        const hasCompetency = solution.competencies.some(compId => 
          competencyIds.includes(compId)
        );
        if (hasCompetency) {
          console.log('Solution matches dimension:', solution.title, solution.competencies);
        }
        return hasCompetency;
      });
      
      console.log('Related solutions found:', relatedSolutions.length);
      setAllDimensionSolutions(relatedSolutions);
    } else {
      console.log('Clearing dimension solutions');
      setAllDimensionSolutions([]);
    }
  }, [dimension, allSolutions]);

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
