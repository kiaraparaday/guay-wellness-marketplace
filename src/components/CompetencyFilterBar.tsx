import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { filterEventBus } from "@/services/eventBus";

interface Filters {
  solutionTypes: string[];
  modalities: string[];
  durations: string[];
  audiences: string[];
}

interface CompetencyFilterBarProps {
  initialFilters?: Filters;
}

const CompetencyFilterBar: React.FC<CompetencyFilterBarProps> = ({ initialFilters }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters || {
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
  });

  const modalityOptions = [
    { value: "virtual", label: "Virtual" },
    { value: "in-person", label: "Presencial" },
    { value: "hybrid", label: "Híbrido" },
  ];

  const audienceOptions = [
    { value: "all", label: "Todos los colaboradores" },
    { value: "leaders", label: "Líderes" },
    { value: "teams", label: "Equipos" },
  ];

  const durationOptions = [
    { value: "short", label: "<2h" },
    { value: "medium", label: "2-6h" },
    { value: "day", label: "1 día" },
    { value: "week", label: "+1 semana" },
  ];

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    const newFilters = { ...filters };
    const currentValues = newFilters[filterType];
    
    if (currentValues.includes(value)) {
      newFilters[filterType] = currentValues.filter(v => v !== value);
    } else {
      newFilters[filterType] = [...currentValues, value];
    }
    
    setFilters(newFilters);
    filterEventBus.publish('filtersChanged', newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: []
    };
    setFilters(emptyFilters);
    filterEventBus.publish('filtersChanged', emptyFilters);
  };

  const removeFilter = (filterType: keyof Filters, value: string) => {
    handleFilterChange(filterType, value);
  };

  const totalActiveFilters = 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length;

  const getFilterLabel = (filterType: keyof Filters, value: string) => {
    const options = {
      modalities: modalityOptions,
      audiences: audienceOptions,
      durations: durationOptions,
      solutionTypes: []
    };
    
    const option = options[filterType].find(opt => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="w-full flex flex-col items-center mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Título y descripción centrados */}
      <h2 className="text-xl font-semibold mb-1 text-gray-800 font-quicksand">
        Filtros disponibles
      </h2>
      <p className="text-gray-500 text-base mb-6 font-quicksand">
        Filtra las soluciones según tus necesidades específicas
      </p>
      
      {/* Filtros centrados */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {/* Modalidad Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2 font-quicksand bg-[#F5F8FC] text-[#0F1A30] border-gray-200 rounded-full py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Modalidad 
              {filters.modalities.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs bg-[#0F1A30] text-white">
                  {filters.modalities.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {modalityOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('modalities', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.modalities.includes(option.value) && (
                    <div className="w-2 h-2 bg-[#0F1A30] rounded-full" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Audiencia Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2 font-quicksand bg-[#F5F8FC] text-[#0F1A30] border-gray-200 rounded-full py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Audiencia 
              {filters.audiences.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs bg-[#0F1A30] text-white">
                  {filters.audiences.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {audienceOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('audiences', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.audiences.includes(option.value) && (
                    <div className="w-2 h-2 bg-[#0F1A30] rounded-full" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Duración Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2 font-quicksand bg-[#F5F8FC] text-[#0F1A30] border-gray-200 rounded-full py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Duración 
              {filters.durations.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs bg-[#0F1A30] text-white">
                  {filters.durations.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {durationOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('durations', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.durations.includes(option.value) && (
                    <div className="w-2 h-2 bg-[#0F1A30] rounded-full" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Clear filters button - centrado */}
      {totalActiveFilters > 0 && (
        <Button 
          variant="ghost" 
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-red-500 font-quicksand transition-colors"
        >
          Limpiar filtros
        </Button>
      )}

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-gray-200 w-full">
          {filters.modalities.map((modality) => (
            <Badge 
              key={`modality-${modality}`} 
              variant="secondary" 
              className="gap-1 font-quicksand bg-[#FCECF3] text-[#D14B8F] border border-[#D14B8F]/20"
            >
              {getFilterLabel('modalities', modality)}
              <button
                onClick={() => removeFilter('modalities', modality)}
                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.audiences.map((audience) => (
            <Badge 
              key={`audience-${audience}`} 
              variant="secondary" 
              className="gap-1 font-quicksand bg-[#FCECF3] text-[#D14B8F] border border-[#D14B8F]/20"
            >
              {getFilterLabel('audiences', audience)}
              <button
                onClick={() => removeFilter('audiences', audience)}
                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.durations.map((duration) => (
            <Badge 
              key={`duration-${duration}`} 
              variant="secondary" 
              className="gap-1 font-quicksand bg-[#FCECF3] text-[#D14B8F] border border-[#D14B8F]/20"
            >
              {getFilterLabel('durations', duration)}
              <button
                onClick={() => removeFilter('durations', duration)}
                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetencyFilterBar;
