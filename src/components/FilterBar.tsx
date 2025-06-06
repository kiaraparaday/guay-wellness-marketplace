import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { filterEventBus } from "@/services/eventBus";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
  collapse?: boolean;
}

interface FilterBarProps {
  onClose: () => void;
  onApplyFilters?: (filters: {
    solutionTypes: string[];
    modalities: string[];
    durations: string[];
    audiences: string[];
  }) => void;
  initialFilters?: {
    solutionTypes?: string[];
    modalities?: string[];
    durations?: string[];
    audiences?: string[];
  };
  isSticky?: boolean;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
  collapse = false,
}) => {
  const [isOpen, setIsOpen] = useState(!collapse);

  const toggleOption = (id: string) => {
    const newSelected = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id];
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

const FilterBar: React.FC<FilterBarProps> = ({ 
  onClose, 
  onApplyFilters, 
  initialFilters = {},
  isSticky = false
}) => {
  const [solutionTypes, setSolutionTypes] = useState<string[]>(initialFilters.solutionTypes || []);
  const [modalities, setModalities] = useState<string[]>(initialFilters.modalities || []);
  const [durations, setDurations] = useState<string[]>(initialFilters.durations || []);
  const [audiences, setAudiences] = useState<string[]>(initialFilters.audiences || []);

  useEffect(() => {
    // Reset filters when initialFilters change
    setSolutionTypes(initialFilters.solutionTypes || []);
    setModalities(initialFilters.modalities || []);
    setDurations(initialFilters.durations || []);
    setAudiences(initialFilters.audiences || []);
  }, [initialFilters]);

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        solutionTypes,
        modalities,
        durations,
        audiences,
      });
    }
    // Use the filterEventBus to publish the filters
    filterEventBus.publish('filtersChanged', {
      solutionTypes,
      modalities,
      durations,
      audiences,
    });
    onClose();
  };

  const clearAllFilters = () => {
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
  };

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length;

  return (
    <div className={cn(
      "w-full py-4 px-6 font-poppins bg-white",
      isSticky && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
              { id: "medium", label: "2-4 horas" },
              { id: "long", label: "Más de 4 horas" },
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
              { id: "all", label: "Toda la organización" },
            ]}
            selectedOptions={audiences}
            onChange={setAudiences}
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
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200 font-poppins"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
