
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import FilterToggleButton from "@/components/filters/FilterToggleButton";
import CollapsibleFilterPanel from "@/components/filters/CollapsibleFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import { Button } from "@/components/ui/button";
import { useSolutions } from "@/hooks/useSolutions";
import { filterEventBus } from "@/services/eventBus";

const IndexPage: React.FC = () => {
  const { solutions: allSolutions, loading, error, refetch } = useSolutions();
  const [filters, setFilters] = useState({
    solutionTypes: [] as string[],
    modalities: [] as string[],
    durations: [] as string[],
    audiences: [] as string[],
  });
  
  const [filteredSolutions, setFilteredSolutions] = useState(allSolutions);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters: typeof filters) => {
      console.log('Received filters:', newFilters);
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setFilteredSolutions(allSolutions);
  }, [allSolutions]);

  useEffect(() => {
    console.log('Filtering solutions with:', filters);
    
    const filtered = allSolutions.filter(solution => {
      // Type filter
      const typeMatch = filters.solutionTypes.length === 0 || 
        filters.solutionTypes.includes(solution.type);
      
      // Modality filter
      const modalityMatch = filters.modalities.length === 0 || 
        filters.modalities.includes(solution.modality);
      
      // Duration filter - map duration strings to categories
      let durationCategory = "";
      const durationString = solution.duration?.toLowerCase() || "";
      
      if (durationString.includes("hora")) {
        const hours = parseInt(durationString);
        if (hours < 2) durationCategory = "short";
        else if (hours >= 2 && hours <= 6) durationCategory = "medium";
        else durationCategory = "long";
      } else if (durationString.includes("día") || durationString.includes("dia")) {
        durationCategory = "long";
      } else if (durationString.includes("semana")) {
        durationCategory = "multi-session";
      } else if (durationString.includes("sesion") || durationString.includes("módulo")) {
        durationCategory = "multi-session";
      }
      
      const durationMatch = filters.durations.length === 0 || 
        filters.durations.includes(durationCategory);
      
      // Audience filter - map audience strings to categories
      let audienceCategory = "";
      const audienceString = solution.audience?.toLowerCase() || "";
      
      if (audienceString.includes("todos") || audienceString.includes("colaboradores")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("equipo")) {
        audienceCategory = "employees";
      } else if (audienceString.includes("líder") || audienceString.includes("lider") || 
                audienceString.includes("directiv") || audienceString.includes("ejecutiv")) {
        audienceCategory = "leaders";
      } else if (audienceString.includes("recursos humanos") || audienceString.includes("rrhh")) {
        audienceCategory = "hr";
      } else if (audienceString.includes("ejecutiv")) {
        audienceCategory = "executives";
      } else {
        audienceCategory = "employees"; // Default fallback
      }
      
      const audienceMatch = filters.audiences.length === 0 || 
        filters.audiences.includes(audienceCategory);

      return typeMatch && modalityMatch && durationMatch && audienceMatch;
    });
    
    console.log('Filtered solutions count:', filtered.length);
    setFilteredSolutions(filtered);
  }, [filters, allSolutions]);

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length;

  const handleRemoveFilter = (filterType: string, value: string) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[filterType as keyof typeof filters])) {
      (newFilters[filterType as keyof typeof filters] as string[]) = 
        (newFilters[filterType as keyof typeof filters] as string[]).filter(item => item !== value);
      setFilters(newFilters);
      filterEventBus.publish('filtersChanged', newFilters);
    }
  };

  const handleClearAllFilters = () => {
    const emptyFilters = {
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: []
    };
    setFilters(emptyFilters);
    filterEventBus.publish('filtersChanged', emptyFilters);
  };

  const handleContactClick = () => {
    window.open(
      'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-8 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center md:text-left md:items-start mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight animate-fade-in">
              Soluciones de <br className="hidden md:block" />
              <span className="text-black">
                bienestar organizacional
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Explora todas las soluciones que tenemos disponibles para transformar el bienestar en tu organización.
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <FilterToggleButton 
                  isOpen={isFilterPanelOpen}
                  onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  activeFiltersCount={totalActiveFilters}
                />
                <span className="text-sm text-muted-foreground">
                  Mostrando {filteredSolutions.length} soluciones
                </span>
              </div>
            </div>

            {/* Collapsible Filter Panel */}
            <CollapsibleFilterPanel 
              isOpen={isFilterPanelOpen}
              onClose={() => setIsFilterPanelOpen(false)}
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Filter Chips */}
            <FilterChips 
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Solutions Grid */}
          <section className="mb-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-quicksand">Cargando soluciones...</p>
              </div>
            ) : filteredSolutions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSolutions.map((solution, index) => (
                  <SolutionCard 
                    key={solution.id}
                    solution={solution}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-yellow-50 rounded-lg">
                <p className="text-lg font-quicksand mb-4">No se encontraron soluciones con los filtros aplicados.</p>
                <Button onClick={handleClearAllFilters} variant="outline" className="mx-auto">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </section>
      
          {/* CTA Section */}
          <section id="contacto" className="py-20 px-6 bg-gradient-to-b from-white to-primary/5">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-4">
                      ¿No encuentras lo que estás buscando?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Nuestro equipo de expertos puede ayudarte a diseñar una solución personalizada según tus necesidades organizacionales.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                      <Button 
                        onClick={handleContactClick}
                        size="grande" 
                        variant="guay-cta-primary"
                        className="font-quicksand"
                      >
                        Contáctanos
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                      alt="Equipo de trabajo" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
