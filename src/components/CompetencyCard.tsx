
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface CompetencyType {
  id: string;
  dimensionId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string; // Added the image property
}

interface CompetencyCardProps {
  competency: CompetencyType;
  index: number;
}

const CompetencyCard: React.FC<CompetencyCardProps> = ({ competency, index }) => {
  return (
    <Link 
      to={`/competency/${competency.id}`}
      className={cn(
        "group flex flex-col h-full items-center rounded-xl bg-white hover-scale shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-in overflow-hidden",
        "opacity-0 border border-transparent hover:border-primary/10"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards" 
      }}
    >
      {competency.image ? (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={competency.image} 
            alt={competency.title} 
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div 
          className="w-16 h-16 mt-6 mb-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" 
          style={{ backgroundColor: `${competency.color}20` }}
        >
          <img 
            src={competency.icon} 
            alt={competency.title} 
            className="w-8 h-8"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-medium text-center group-hover:text-primary transition-colors duration-300">
          {competency.title}
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground text-center line-clamp-3 mb-4">
          {competency.description}
        </p>
        
        <span className="mt-1 px-3 py-1 text-xs bg-secondary rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
          Ver soluciones
        </span>
      </div>
    </Link>
  );
};

export default CompetencyCard;
