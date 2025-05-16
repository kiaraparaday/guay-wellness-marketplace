
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { getCompetencyById } from "@/services/competenciesDataService";
import { useCompetencySolutions } from "@/hooks/useCompetencySolutions";
import CompetencyHeader from "@/components/CompetencyHeader";
import SolutionsSection from "@/components/SolutionsSection";
import CallToActionSection from "@/components/CallToActionSection";
import SimpleFooter from "@/components/SimpleFooter";

const CompetencyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
          <Link to="/" className="text-primary hover:underline body-copy">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      <CompetencyHeader competency={competency} />
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
