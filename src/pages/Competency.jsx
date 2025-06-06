
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCompetencyById } from "@/services/competenciesDataService";
import { useCompetencySolutions } from "@/hooks/useCompetencySolutions";
import Header from "@/components/Header";
import CompetencyHeader from "@/components/CompetencyHeader";
import CompetencyFilterBar from "@/components/CompetencyFilterBar";
import SolutionsSection from "@/components/SolutionsSection";
import CallToActionSection from "@/components/CallToActionSection";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CompetencyPage = () => {
  const { id } = useParams();
  const competency = getCompetencyById(id || "");
  
  const { 
    filteredSolutions, 
    filters, 
    setFilters 
  } = useCompetencySolutions(id);

  if (!competency) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">Competencia no encontrada</h2>
          <Button asChild variant="guay-primary" size="grande">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      <CompetencyHeader competency={competency} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CompetencyFilterBar initialFilters={filters} />
      </div>
      <SolutionsSection 
        filteredSolutions={filteredSolutions} 
        setFilters={setFilters} 
      />
      <CallToActionSection competencyTitle={competency.title} />
      <SimpleFooter />
    </div>
  );
};

export default CompetencyPage;
