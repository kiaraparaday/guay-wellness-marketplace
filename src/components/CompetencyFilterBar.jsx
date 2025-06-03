
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { filterEventBus } from "@/services/eventBus";
import TopicsFiltersSection from "./filters/TopicsFiltersSection";
import CharacteristicsFiltersSection from "./filters/CharacteristicsFiltersSection";
import FilterControls from "./filters/FilterControls";

const CompetencyFilterBar = ({ 
  onClose, 
  onApplyFilters, 
  initialFilters = {},
  isSticky = false
}) => {
  const [solutionTypes, setSolutionTypes] = useState(initialFilters.solutionTypes || []);
  const [modalities, setModalities] = useState(initialFilters.modalities || []);
  const [durations, setDurations] = useState(initialFilters.durations || []);
  const [audiences, setAudiences] = useState(initialFilters.audiences || []);
  const [benefits, setBenefits] = useState(initialFilters.benefits || []);
  const [categories, setCategories] = useState(initialFilters.categories || []);

  // Apply filters in real-time whenever any filter changes
  useEffect(() => {
    const currentFilters = {
      solutionTypes,
      modalities,
      durations,
      audiences,
      benefits,
      categories,
    };
    
    console.log('CompetencyFilterBar: Publishing filters in real-time:', currentFilters);
    filterEventBus.publish('filtersChanged', currentFilters);
    
    // Also call the onApplyFilters callback if provided
    if (onApplyFilters) {
      onApplyFilters(currentFilters);
    }
  }, [solutionTypes, modalities, durations, audiences, benefits, categories, onApplyFilters]);

  const clearAllFilters = () => {
    console.log('CompetencyFilterBar: Clearing all filters');
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
    setBenefits([]);
    setCategories([]);
  };

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length +
    benefits.length +
    categories.length;

  // Generate chips for active filters
  const getActiveFilterChips = () => {
    const chips = [];
    
    // Solution types chips
    solutionTypes.forEach(type => {
      const label = {
        "workshop": "Taller",
        "course": "Curso", 
        "webinar": "Webinar",
        "coaching": "Coaching",
        "assessment": "Evaluación"
      }[type] || type;
      
      chips.push({
        id: `solutionType-${type}`,
        label,
        onRemove: () => {
          console.log('Removing solution type:', type);
          setSolutionTypes(prev => prev.filter(t => t !== type));
        }
      });
    });

    // Modalities chips
    modalities.forEach(modality => {
      const label = {
        "in-person": "Presencial",
        "virtual": "Virtual",
        "hybrid": "Híbrido"
      }[modality] || modality;
      
      chips.push({
        id: `modality-${modality}`,
        label,
        onRemove: () => {
          console.log('Removing modality:', modality);
          setModalities(prev => prev.filter(m => m !== modality));
        }
      });
    });

    // Durations chips
    durations.forEach(duration => {
      const label = {
        "short": "Menos de 2 horas",
        "medium": "2-6 horas",
        "long": "Más de 6 horas",
        "multi-session": "Varias sesiones"
      }[duration] || duration;
      
      chips.push({
        id: `duration-${duration}`,
        label,
        onRemove: () => {
          console.log('Removing duration:', duration);
          setDurations(prev => prev.filter(d => d !== duration));
        }
      });
    });

    // Audiences chips
    audiences.forEach(audience => {
      const label = {
        "leaders": "Líderes",
        "employees": "Colaboradores",
        "executives": "Ejecutivos",
        "hr": "Recursos Humanos"
      }[audience] || audience;
      
      chips.push({
        id: `audience-${audience}`,
        label,
        onRemove: () => {
          console.log('Removing audience:', audience);
          setAudiences(prev => prev.filter(a => a !== audience));
        }
      });
    });

    // Benefits chips
    benefits.forEach(benefit => {
      const label = {
        "stress": "Reducir estrés",
        "emotional-wellbeing": "Bienestar emocional",
        "mental-load": "Carga mental",
        "productivity": "Productividad",
        "leadership": "Liderazgo",
        "teamwork": "Trabajo en equipo",
        "work-life-balance": "Equilibrio vida-trabajo",
        "inclusion": "Inclusión"
      }[benefit] || benefit;
      
      chips.push({
        id: `benefit-${benefit}`,
        label,
        onRemove: () => {
          console.log('Removing benefit:', benefit);
          setBenefits(prev => prev.filter(b => b !== benefit));
        }
      });
    });

    // Categories chips
    categories.forEach(category => {
      const label = {
        "mental-workload": "Gestión de Cargas Mentales",
        "work-autonomy": "Autonomía Laboral",
        "work-life-balance": "Relación Vida-Trabajo",
        "stress-management": "Manejo del Estrés"
      }[category] || category;
      
      chips.push({
        id: `category-${category}`,
        label,
        onRemove: () => {
          console.log('Removing category:', category);
          setCategories(prev => prev.filter(c => c !== category));
        }
      });
    });

    return chips;
  };

  const activeChips = getActiveFilterChips();

  return (
    <div className={cn(
      "w-full py-4 px-6 font-poppins bg-white",
      isSticky && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto">
        <TopicsFiltersSection
          categories={categories}
          setCategories={(newCategories) => {
            console.log('Setting categories:', newCategories);
            setCategories(newCategories);
          }}
          benefits={benefits}
          setBenefits={(newBenefits) => {
            console.log('Setting benefits:', newBenefits);
            setBenefits(newBenefits);
          }}
        />

        {/* Línea divisoria sutil */}
        <div className="border-t border-gray-200 mb-8"></div>

        <CharacteristicsFiltersSection
          solutionTypes={solutionTypes}
          setSolutionTypes={(newTypes) => {
            console.log('Setting solution types:', newTypes);
            setSolutionTypes(newTypes);
          }}
          modalities={modalities}
          setModalities={(newModalities) => {
            console.log('Setting modalities:', newModalities);
            setModalities(newModalities);
          }}
          durations={durations}
          setDurations={(newDurations) => {
            console.log('Setting durations:', newDurations);
            setDurations(newDurations);
          }}
          audiences={audiences}
          setAudiences={(newAudiences) => {
            console.log('Setting audiences:', newAudiences);
            setAudiences(newAudiences);
          }}
        />

        {/* Active filters chips */}
        {activeChips.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium font-poppins"
                >
                  {chip.label}
                  <button
                    onClick={chip.onRemove}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <FilterControls
          totalSelectedFilters={totalSelectedFilters}
          onClearFilters={clearAllFilters}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CompetencyFilterBar;
