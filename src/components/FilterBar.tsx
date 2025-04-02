
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (options: string[]) => void;
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
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
}) => {
  const toggleOption = (id: string) => {
    const newSelected = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id];
    onChange(newSelected);
  };

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleOption(option.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all-200",
              selectedOptions.includes(option.id)
                ? "bg-primary text-white"
                : "bg-secondary hover:bg-primary/10"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterBar: React.FC<FilterBarProps> = ({ onClose, onApplyFilters, initialFilters = {} }) => {
  const [solutionTypes, setSolutionTypes] = useState<string[]>(initialFilters.solutionTypes || []);
  const [modalities, setModalities] = useState<string[]>(initialFilters.modalities || []);
  const [durations, setDurations] = useState<string[]>(initialFilters.durations || []);
  const [audiences, setAudiences] = useState<string[]>(initialFilters.audiences || []);

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        solutionTypes,
        modalities,
        durations,
        audiences,
      });
    }
    onClose();
  };

  const clearAllFilters = () => {
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={clearAllFilters}
          className="text-sm text-muted-foreground hover:text-primary transition-all-200"
        >
          Limpiar filtros
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
