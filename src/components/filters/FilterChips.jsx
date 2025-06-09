
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FilterChips = ({ 
  filters, 
  onRemoveFilter, 
  onClearAll 
}) => {
  const filterLabels = {
    // Categorías
    "mental-workload": "Gestión de Cargas Mentales",
    "work-autonomy": "Autonomía Laboral",
    "work-life-balance": "Relación Vida-Trabajo",
    "stress-management": "Manejo del Estrés",
    
    // Beneficios
    "stress": "Reducir estrés",
    "emotional-wellbeing": "Bienestar emocional",
    "mental-load": "Carga mental",
    "productivity": "Productividad",
    "leadership": "Liderazgo",
    "teamwork": "Trabajo en equipo",
    "work-life-balance": "Equilibrio vida-trabajo",
    "inclusion": "Inclusión",
    
    // Tipos de solución
    "workshop": "Taller",
    "course": "Curso",
    "webinar": "Webinar",
    "coaching": "Coaching",
    "assessment": "Evaluación",
    
    // Modalidades
    "in-person": "Presencial",
    "virtual": "Virtual",
    "hybrid": "Híbrido",
    
    // Duraciones
    "short": "Menos de 2 horas",
    "medium": "2-6 horas",
    "long": "Más de 6 horas",
    "multi-session": "Varias sesiones",
    
    // Audiencias
    "leaders": "Líderes",
    "employees": "Colaboradores",
    "executives": "Ejecutivos",
    "hr": "Recursos Humanos"
  };

  // Convertir filtros en array de chips
  const activeChips = [];
  
  Object.entries(filters).forEach(([filterType, values]) => {
    if (Array.isArray(values)) {
      values.forEach(value => {
        activeChips.push({
          type: filterType,
          value: value,
          label: filterLabels[value] || value
        });
      });
    }
  });

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {activeChips.map((chip, index) => (
        <div
          key={`${chip.type}-${chip.value}-${index}`}
          className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.type, chip.value)}
            className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {activeChips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-primary underline ml-2 font-quicksand"
        >
          Limpiar todos
        </button>
      )}
    </div>
  );
};

export default FilterChips;
