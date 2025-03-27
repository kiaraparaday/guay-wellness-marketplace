
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
}

interface SolutionCardProps {
  solution: SolutionType;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index }) => {
  // Get appropriate tag color based on solution type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-guay-blue/10 text-guay-blue border border-guay-blue/20";
      case "course":
        return "bg-guay-purple/10 text-guay-purple border border-guay-purple/20";
      case "webinar":
        return "bg-guay-green/10 text-guay-green border border-guay-green/20";
      case "coaching":
        return "bg-guay-orange/10 text-guay-orange border border-guay-orange/20";
      case "assessment":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Map solution type to Spanish
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

  // Map modality to Spanish
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

  return (
    <Link 
      to={`/solution/${solution.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-white border border-border hover:border-primary/20 shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-in",
        "opacity-0"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards"
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn("px-2 py-1 rounded-md text-xs font-medium", getTypeColor(solution.type))}>
            {typeToSpanish(solution.type)}
          </span>
          <span className="px-2 py-1 bg-guay-dark/70 text-white rounded-md text-xs font-medium">
            {modalityToSpanish(solution.modality)}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-playfair font-medium mb-2 line-clamp-2 group-hover:text-guay-blue transition-colors duration-300">
          {solution.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {solution.description}
        </p>
        
        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {getCategoryLabels().map((category, idx) => (
            <Badge 
              key={idx} 
              variant="outline" 
              className="text-xs bg-guay-purple/5 hover:bg-guay-purple/10 text-guay-purple border-guay-purple/20"
            >
              {category}
            </Badge>
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
