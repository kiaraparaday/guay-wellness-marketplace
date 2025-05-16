
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface CompetencyHeaderProps {
  competency: {
    title: string;
    description: string;
    dimensionId: string;
    dimensionTitle: string;
    color: string;
  };
}

const CompetencyHeader: React.FC<CompetencyHeaderProps> = ({ competency }) => {
  return (
    <section className="pt-20 pb-12 px-6 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto">
        <Link 
          to={`/dimension/${competency.dimensionId}`} 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors small-copy"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a {competency.dimensionTitle}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-[48px] font-bold mb-4 animate-fade-in">
              {competency.title}
            </h1>
            <p className="subtitle text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              {competency.description}
            </p>
            
            <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <span 
                className="px-3 py-1 rounded-full pre-title"
                style={{ backgroundColor: `${competency.color}20`, color: competency.color }}
              >
                {competency.dimensionTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetencyHeader;
