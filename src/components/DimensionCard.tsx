
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DimensionType {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface DimensionCardProps {
  dimension: DimensionType;
  index: number;
}

const DimensionCard: React.FC<DimensionCardProps> = ({ dimension, index }) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-subtle hover:shadow-md transition-all duration-500 animate-fade-in",
        "opacity-0"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards"
      }}
    >
      <Link to={`/dimension/${dimension.id}`} className="block">
        <div className="relative">
          <img 
            src={dimension.image} 
            alt={dimension.title} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          {/* Semi-transparent overlay that gradually transitions to the dimension color */}
          <div 
            className="absolute inset-0 opacity-60 group-hover:opacity-70 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom, transparent 30%, ${dimension.color} 100%)`
            }}
          />
        </div>
        
        {/* Text content box unified with the image */}
        <div className="p-4 bg-white shadow-sm border-t border-gray-100 group-hover:bg-gray-50 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {dimension.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {dimension.description}
          </p>
          
          <div className="inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 bg-primary/10 text-primary rounded-full group-hover:bg-primary/20 transition-all duration-300">
            Explorar soluciones 
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DimensionCard;
