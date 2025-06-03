
import React from "react";
import CompetencyCard from "@/components/CompetencyCard";

const CompetenciesSection = ({ dimension }) => {
  if (!dimension.competencies || dimension.competencies.length === 0) {
    return null;
  }

  return (
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
  );
};

export default CompetenciesSection;
