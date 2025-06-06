
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const CompetencyCard = ({ competency, index }) => {
  return (
    <Link 
      to={`/competency/${competency.id}`}
      className={cn(
        "group flex flex-col h-full items-center rounded-xl bg-white hover-scale shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-in overflow-hidden",
        "opacity-0 border border-transparent hover:border-guay-blue/20 font-quicksand"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards" 
      }}
    >
      {competency.image ? (
        <div className="w-full h-44 overflow-hidden relative">
          <img 
            src={competency.image} 
            alt={competency.title} 
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          {competency.dimensionTitle && (
            <div className="absolute top-3 left-3">
              <span className="inline-block px-3 py-1.5 bg-guay-purple/10 text-guay-purple rounded-full text-xs font-normal font-quicksand">
                {competency.dimensionTitle}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div 
          className="w-20 h-20 mt-6 mb-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" 
          style={{ backgroundColor: `${competency.color}20` }}
        >
          <img 
            src={competency.icon} 
            alt={competency.title} 
            className="w-10 h-10"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-quicksand font-medium text-center group-hover:text-guay-blue transition-colors duration-300">
          {competency.title}
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground text-center line-clamp-3 mb-4">
          {competency.description}
        </p>
        
        <div className="flex justify-center">
          <div className="flex items-center px-4 py-1.5 rounded-full transition-all duration-300 group-hover:translate-x-1"
               style={{ 
                  backgroundColor: `${competency.color}10`, 
                  color: competency.color,
                  borderColor: `${competency.color}30`,
                  borderWidth: '1px'
               }}>
            <span className="text-xs font-medium">Ver soluciones</span>
            <ArrowRight className="ml-1 w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompetencyCard;
