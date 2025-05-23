
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter as FilterIcon, ChevronDown } from "lucide-react";
import { filterEventBus } from "@/services/eventBus";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

interface FilterOption {
  id: string;
  label: string;
}

interface CompetencyFilterBarProps {
  initialFilters?: {
    solutionTypes?: string[];
    modalities?: string[];
    durations?: string[];
    audiences?: string[];
  };
}

const CompetencyFilterBar: React.FC<CompetencyFilterBarProps> = ({ 
  initialFilters = {} 
}) => {
  const [open, setOpen] = useState(false);
  const [solutionTypes, setSolutionTypes] = useState<string[]>(initialFilters.solutionTypes || []);
  const [modalities, setModalities] = useState<string[]>(initialFilters.modalities || []);
  const [durations, setDurations] = useState<string[]>(initialFilters.durations || []);
  const [audiences, setAudiences] = useState<string[]>(initialFilters.audiences || []);

  const applyFilters = () => {
    filterEventBus.publish('filtersChanged', {
      solutionTypes,
      modalities,
      durations,
      audiences,
    });
    setOpen(false);
  };

  const clearFilters = () => {
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
    
    filterEventBus.publish('filtersChanged', {
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: [],
    });
  };

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length;

  // Apply filters when any filter value changes
  useEffect(() => {
    if (totalSelectedFilters > 0) {
      applyFilters();
    }
  }, [solutionTypes, modalities, durations, audiences]);

  const toggleOption = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, id: string) => {
    if (array.includes(id)) {
      setArray(array.filter(item => item !== id));
    } else {
      setArray([...array, id]);
    }
  };

  const FilterGroup = ({ 
    title, 
    options, 
    selectedOptions, 
    setSelectedOptions 
  }: { 
    title: string; 
    options: FilterOption[]; 
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 font-quicksand">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => toggleOption(selectedOptions, setSelectedOptions, option.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors font-quicksand",
              selectedOptions.includes(option.id)
                ? "bg-guay-purple text-white shadow-sm"
                : "bg-guay-purple/10 text-guay-purple hover:bg-guay-purple/20"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  const typeOptions = [
    { id: "workshop", label: "Taller" },
    { id: "course", label: "Curso" },
    { id: "webinar", label: "Webinar" },
    { id: "other", label: "Otro" },
  ];

  const modalityOptions = [
    { id: "in-person", label: "Presencial" },
    { id: "virtual", label: "Virtual" },
    { id: "hybrid", label: "Híbrido" },
  ];

  const audienceOptions = [
    { id: "all", label: "Todos los colaboradores" },
    { id: "teams", label: "Equipos de trabajo" },
    { id: "leaders", label: "Líderes / Directivos" },
    { id: "operational", label: "Personal operativo" },
  ];

  const durationOptions = [
    { id: "short", label: "< 2 horas" },
    { id: "medium", label: "2 a 6 horas" },
    { id: "day", label: "1 día" },
    { id: "week", label: "1 semana o más" },
    { id: "program", label: "Programas de 4-8 semanas" },
  ];

  return (
    <div className="mb-6 w-full font-quicksand">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex justify-between items-center gap-2 border-guay-blue/20 hover:border-guay-blue/40 hover:bg-guay-blue/5 text-guay-dark-blue"
          >
            <span className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              🔍 Filtrar soluciones
            </span>
            {totalSelectedFilters > 0 ? (
              <Badge variant="secondary" className="ml-2 bg-guay-blue text-white">
                {totalSelectedFilters}
              </Badge>
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
          <Card className="w-screen max-w-3xl border-guay-blue/10 shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 border-b pb-3 border-guay-blue/10">
                <h2 className="text-lg font-medium text-guay-dark-blue font-quicksand">Filtrar soluciones</h2>
                {totalSelectedFilters > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="flex items-center text-sm text-muted-foreground hover:text-guay-blue"
                  >
                    <X className="w-3 h-3 mr-1" /> 
                    Limpiar filtros ({totalSelectedFilters})
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FilterGroup
                    title="Tipo de solución"
                    options={typeOptions}
                    selectedOptions={solutionTypes}
                    setSelectedOptions={setSolutionTypes}
                  />
                  
                  <FilterGroup
                    title="Modalidad"
                    options={modalityOptions}
                    selectedOptions={modalities}
                    setSelectedOptions={setModalities}
                  />
                </div>
                
                <div>
                  <FilterGroup
                    title="Dirigido a"
                    options={audienceOptions}
                    selectedOptions={audiences}
                    setSelectedOptions={setAudiences}
                  />
                  
                  <FilterGroup
                    title="Duración"
                    options={durationOptions}
                    selectedOptions={durations}
                    setSelectedOptions={setDurations}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 pt-3 border-t border-guay-blue/10">
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-guay-green text-white hover:bg-guay-green/90 font-quicksand"
                >
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
      
      {/* Selected filters display */}
      {totalSelectedFilters > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {solutionTypes.map(type => {
            const label = typeOptions.find(opt => opt.id === type)?.label;
            return (
              <Badge 
                key={`type-${type}`} 
                className="py-1 px-3 bg-guay-purple/10 text-guay-purple hover:bg-guay-purple/20 cursor-pointer"
                onClick={() => toggleOption(solutionTypes, setSolutionTypes, type)}
              >
                {label} <X className="ml-1 w-3 h-3" />
              </Badge>
            );
          })}
          
          {modalities.map(modality => {
            const label = modalityOptions.find(opt => opt.id === modality)?.label;
            return (
              <Badge 
                key={`modality-${modality}`} 
                className="py-1 px-3 bg-guay-green/10 text-guay-green hover:bg-guay-green/20 cursor-pointer"
                onClick={() => toggleOption(modalities, setModalities, modality)}
              >
                {label} <X className="ml-1 w-3 h-3" />
              </Badge>
            );
          })}
          
          {audiences.map(audience => {
            const label = audienceOptions.find(opt => opt.id === audience)?.label;
            return (
              <Badge 
                key={`audience-${audience}`} 
                className="py-1 px-3 bg-guay-orange/10 text-guay-orange hover:bg-guay-orange/20 cursor-pointer"
                onClick={() => toggleOption(audiences, setAudiences, audience)}
              >
                {label} <X className="ml-1 w-3 h-3" />
              </Badge>
            );
          })}
          
          {durations.map(duration => {
            const label = durationOptions.find(opt => opt.id === duration)?.label;
            return (
              <Badge 
                key={`duration-${duration}`} 
                className="py-1 px-3 bg-guay-blue/10 text-guay-blue hover:bg-guay-blue/20 cursor-pointer"
                onClick={() => toggleOption(durations, setDurations, duration)}
              >
                {label} <X className="ml-1 w-3 h-3" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompetencyFilterBar;
