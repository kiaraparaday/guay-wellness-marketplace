
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { filterEventBus } from "@/services/eventBus";

const FilterGroup = ({
  title,
  options,
  selectedOptions,
  onChange,
  collapse = false,
}) => {
  const [isOpen, setIsOpen] = useState(!collapse);

  const toggleOption = (id) => {
    const newSelected = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id];
    console.log(`Filter ${title} changed:`, newSelected);
    onChange(newSelected);
  };

  return (
    <div className="mb-4">
      {collapse ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-poppins text-sm font-medium">
            <span>{title}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 font-poppins",
                    selectedOptions.includes(option.id)
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary hover:bg-primary/10"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <h3 className="font-poppins font-medium mb-2 text-sm">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 font-poppins",
                  selectedOptions.includes(option.id)
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary hover:bg-primary/10"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const FilterBar = ({ 
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
    
    console.log('Publishing filters in real-time:', currentFilters);
    filterEventBus.publish('filtersChanged', currentFilters);
  }, [solutionTypes, modalities, durations, audiences, benefits, categories]);

  const clearAllFilters = () => {
    console.log('Clearing all filters');
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

  return (
    <div className={cn(
      "w-full py-4 px-6 font-poppins bg-white",
      isSticky && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
          <FilterGroup
            title="Tipo de solución"
            options={[
              { id: "workshop", label: "Taller" },
              { id: "course", label: "Curso" },
              { id: "webinar", label: "Webinar" },
              { id: "coaching", label: "Coaching" },
              { id: "assessment", label: "Evaluación" },
            ]}
            selectedOptions={solutionTypes}
            onChange={setSolutionTypes}
          />

          <FilterGroup
            title="Modalidad"
            options={[
              { id: "in-person", label: "Presencial" },
              { id: "virtual", label: "Virtual" },
              { id: "hybrid", label: "Híbrido" },
            ]}
            selectedOptions={modalities}
            onChange={setModalities}
          />

          <FilterGroup
            title="Duración"
            options={[
              { id: "short", label: "Menos de 2 horas" },
              { id: "medium", label: "2-6 horas" },
              { id: "long", label: "Más de 6 horas" },
              { id: "multi-session", label: "Varias sesiones" },
            ]}
            selectedOptions={durations}
            onChange={setDurations}
            collapse={true}
          />

          <FilterGroup
            title="Audiencia objetivo"
            options={[
              { id: "leaders", label: "Líderes" },
              { id: "employees", label: "Colaboradores" },
              { id: "executives", label: "Ejecutivos" },
              { id: "hr", label: "Recursos Humanos" },
            ]}
            selectedOptions={audiences}
            onChange={setAudiences}
            collapse={true}
          />

          <FilterGroup
            title="¿Qué deseas mejorar?"
            options={[
              { id: "stress", label: "Reducir estrés" },
              { id: "emotional-wellbeing", label: "Bienestar emocional" },
              { id: "mental-load", label: "Carga mental" },
              { id: "productivity", label: "Productividad" },
              { id: "leadership", label: "Liderazgo" },
              { id: "teamwork", label: "Trabajo en equipo" },
              { id: "work-life-balance", label: "Equilibrio vida-trabajo" },
              { id: "inclusion", label: "Inclusión" },
            ]}
            selectedOptions={benefits}
            onChange={setBenefits}
            collapse={true}
          />

          <FilterGroup
            title="Categorías"
            options={[
              { id: "mental-workload", label: "Gestión de Cargas Mentales" },
              { id: "work-autonomy", label: "Autonomía Laboral" },
              { id: "work-life-balance", label: "Relación Vida-Trabajo" },
              { id: "stress-management", label: "Manejo del Estrés" },
            ]}
            selectedOptions={categories}
            onChange={setCategories}
            collapse={true}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={clearAllFilters}
            className={cn(
              "text-sm text-muted-foreground hover:text-primary transition-all-200 font-poppins",
              totalSelectedFilters === 0 && "opacity-50 cursor-not-allowed"
            )}
            disabled={totalSelectedFilters === 0}
          >
            Limpiar filtros {totalSelectedFilters > 0 && `(${totalSelectedFilters})`}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200 font-poppins"
          >
            Cerrar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
