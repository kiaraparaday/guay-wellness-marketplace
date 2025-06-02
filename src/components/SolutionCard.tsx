
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SolutionType {
  id: string;
  title: string;
  type: string; // workshop, course, webinar, etc.
  modality: string; // virtual, in-person, hybrid
  duration: string;
  audience: string;
  description: string;
  image: string;
  competencies: string[]; // ids of related competencies
  categories?: string[]; // New field for category tags
  tags?: string[]; // Add tags property for filtering
  detailedDescription?: string;
  benefits?: string[];
  includes?: string[];
  facilitator?: {
    name: string;
    position: string;
    image: string;
  };
  images?: string[];
}

interface SolutionCardProps {
  solution: SolutionType;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index }) => {
  const [imageError, setImageError] = useState(false);
  
  // Fallback image for broken/invalid images
  const fallbackImage = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80";
  
  // Use fallback if image is invalid or fails to load
  const imageUrl = imageError || !solution.image || solution.image === "Kiara y reduccion del estres" ? 
    fallbackImage : solution.image;

  // Map solution type to Spanish without icons
  const typeToSpanish = (type: string) => {
    const types: Record<string, string> = {
      workshop: "Taller",
      course: "Curso",
      webinar: "Webinar",
      coaching: "Coaching",
      assessment: "Evaluación",
    };
    return types[type] || type;
  };

  // Map modality to Spanish without icons
  const modalityToSpanish = (modality: string) => {
    const modalities: Record<string, string> = {
      "virtual": "Virtual",
      "in-person": "Presencial",
      "hybrid": "Híbrido",
    };
    return modalities[modality] || modality;
  };

  // Map competency IDs to readable names
  const competencyLabels: Record<string, string> = {
    "mental-workload": "Carga Mental",
    "work-autonomy": "Autonomía Laboral",
    "work-life-balance": "Equilibrio Vida-Trabajo",
    "communication": "Comunicación",
    "capability-development": "Desarrollo de Capacidades",
    "diversity": "Diversidad",
    "leadership": "Liderazgo",
    "teamwork": "Trabajo en Equipo",
    "innovation": "Innovación",
    "integrity": "Integridad"
  };

  // Get category labels to display
  const getCategoryLabels = () => {
    // First use categories if available
    if (solution.categories && solution.categories.length > 0) {
      return solution.categories;
    }
    
    // Fall back to competency names if no categories are specified
    return solution.competencies.map(id => competencyLabels[id] || id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link 
      to={`/solution/${solution.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-white border border-border hover:border-primary/20 shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-in font-quicksand",
        "opacity-0"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards"
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={solution.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={handleImageError}
        />
        {/* Nuevo contenedor de etiquetas con fondo semiopaco institucional */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 bg-[#0F1A30]/80 text-white rounded-full text-xs font-medium font-quicksand">
            {typeToSpanish(solution.type)}
          </span>
          <span className="px-2.5 py-1 bg-[#0F1A30]/80 text-white rounded-full text-xs font-medium font-quicksand">
            {modalityToSpanish(solution.modality)}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-quicksand font-medium mb-2 line-clamp-2 group-hover:text-guay-blue transition-colors duration-300">
          {solution.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {solution.description}
        </p>
        
        {/* Category tags - Nuevo estilo pill con magenta institucional */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getCategoryLabels().map((category, idx) => (
            <span 
              key={idx} 
              className="inline-block px-3 py-1.5 bg-guay-purple/10 text-guay-purple rounded-full text-xs font-normal font-quicksand"
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{solution.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>{solution.audience}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SolutionCard;
