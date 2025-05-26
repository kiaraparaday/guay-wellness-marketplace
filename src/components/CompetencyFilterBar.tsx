
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* Modalidad Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2 font-quicksand"
            >
              Modalidad 
              {filters.modalities.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {filters.modalities.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {modalityOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('modalities', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.modalities.includes(option.value) && (
                    <div className="w-2 h-2 bg-guay-purple rounded-full" />
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
              className="gap-2 font-quicksand"
            >
              Audiencia 
              {filters.audiences.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {filters.audiences.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {audienceOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('audiences', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.audiences.includes(option.value) && (
                    <div className="w-2 h-2 bg-guay-purple rounded-full" />
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
              className="gap-2 font-quicksand"
            >
              Duración 
              {filters.durations.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {filters.durations.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {durationOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleFilterChange('durations', option.value)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {filters.durations.includes(option.value) && (
                    <div className="w-2 h-2 bg-guay-purple rounded-full" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear filters button */}
        {totalActiveFilters > 0 && (
          <Button 
            variant="ghost" 
            onClick={clearAllFilters}
            className="text-sm text-muted-foreground hover:text-destructive font-quicksand"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
          {filters.modalities.map((modality) => (
            <Badge 
              key={`modality-${modality}`} 
              variant="secondary" 
              className="gap-1 font-quicksand bg-[#FCECF3] text-[#D14B8F] border border-[#D14B8F]/20"
            >
              {getFilterLabel('modalities', modality)}
              <button
                onClick={() => removeFilter('modalities', modality)}
                className="hover:bg-destructive/20 rounded-full p-0.5"
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
                className="hover:bg-destructive/20 rounded-full p-0.5"
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
                className="hover:bg-destructive/20 rounded-full p-0.5"
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
