
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
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-70 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${dimension.color})`
          }}
        />
        
        <img 
          src={dimension.image} 
          alt={dimension.title} 
          className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-2 transform group-hover:translate-y-0 transition-transform duration-500">
            {dimension.title}
          </h3>
          
          <p className="text-sm text-white/90 mb-3 line-clamp-2">
            {dimension.description}
          </p>
          
          <div className="inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-all duration-300">
            Explorar soluciones 
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DimensionCard;
