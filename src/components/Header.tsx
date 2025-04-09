
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Filter, X, Menu, X as Close, FilterX, Tag, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const filterEventBus = {
  handlers: new Map(),
  subscribe(event: string, handler: Function) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)?.push(handler);
    
    return () => {
      const handlers = this.handlers.get(event);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index !== -1) handlers.splice(index, 1);
      }
    };
  },
  publish(event: string, data: any) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompetencyFiltersOpen, setIsCompetencyFiltersOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCompetencyPage = location.pathname.includes('/competency/');
  
  const [activeFilters, setActiveFilters] = useState<{
    solutionTypes: string[];
    modalities: string[];
    durations: string[];
    audiences: string[];
  }>({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: []
  });
  
  const filterOptions = {
    type: [
      { id: "workshop", label: "Taller" },
      { id: "course", label: "Curso" },
      { id: "webinar", label: "Webinar" },
      { id: "coaching", label: "Coaching" },
      { id: "assessment", label: "Evaluación" },
    ],
    modality: [
      { id: "in-person", label: "Presencial" },
      { id: "virtual", label: "Virtual" },
      { id: "hybrid", label: "Híbrido" },
    ],
  };

  const totalActiveFilters = 
    activeFilters.solutionTypes.length + 
    activeFilters.modalities.length + 
    activeFilters.durations.length + 
    activeFilters.audiences.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveFilters({
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: []
    });
  }, [location.pathname]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isFilterOpen) setIsFilterOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isCompetencyFiltersOpen) setIsCompetencyFiltersOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isCompetencyFiltersOpen) setIsCompetencyFiltersOpen(false);
  };

  const toggleCompetencyFilters = () => {
    setIsCompetencyFiltersOpen(!isCompetencyFiltersOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isFilterOpen) setIsFilterOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isFilterOpen) setIsFilterOpen(false);
    if (isCompetencyFiltersOpen) setIsCompetencyFiltersOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const handleApplyFilters = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
    filterEventBus.publish('filtersChanged', filters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      solutionTypes: [],
      modalities: [],
      durations: [],
      audiences: []
    };
    setActiveFilters(emptyFilters);
    filterEventBus.publish('filtersChanged', emptyFilters);
    setIsCompetencyFiltersOpen(false);
  };

  const toggleTypeFilter = (filterId: string) => {
    setActiveFilters(prev => {
      if (prev.solutionTypes.includes(filterId)) {
        return {
          ...prev,
          solutionTypes: prev.solutionTypes.filter(id => id !== filterId)
        };
      } else {
        return {
          ...prev,
          solutionTypes: [...prev.solutionTypes, filterId]
        };
      }
    });
  };

  const toggleModalityFilter = (filterId: string) => {
    setActiveFilters(prev => {
      if (prev.modalities.includes(filterId)) {
        return {
          ...prev,
          modalities: prev.modalities.filter(id => id !== filterId)
        };
      } else {
        return {
          ...prev,
          modalities: [...prev.modalities, filterId]
        };
      }
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-subtle"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="group flex items-center space-x-2">
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400 transition-all duration-300 group-hover:from-guay-700 group-hover:to-guay-500">
              GUAY
            </span>
            <span className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary">
              Wellness Marketplace
            </span>
          </Link>

          {isHomePage && (
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("soluciones")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Soluciones
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("destacadas")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Destacadas
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("casos-exito")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Casos de Éxito
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("contacto")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Contacto
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          <div className="flex items-center space-x-1 sm:space-x-3">
            {isHomePage && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 md:hidden rounded-full hover:bg-accent"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {isCompetencyPage && (
              <Collapsible className="hidden sm:block">
                <CollapsibleTrigger 
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-poppins border",
                    totalActiveFilters > 0 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-secondary border-transparent hover:bg-secondary/70"
                  )}
                >
                  <Layers className="w-4 h-4" /> 
                  Filtros 
                  {totalActiveFilters > 0 && <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalActiveFilters}</span>}
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute top-full left-0 right-0 mt-2 p-4 bg-white shadow-lg border border-border rounded-lg z-50">
                  <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Tipo de solución</h4>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.type.map(option => (
                            <button
                              key={option.id}
                              onClick={() => {
                                toggleTypeFilter(option.id);
                                setTimeout(() => {
                                  filterEventBus.publish('filtersChanged', {
                                    ...activeFilters,
                                    solutionTypes: activeFilters.solutionTypes.includes(option.id)
                                      ? activeFilters.solutionTypes.filter(id => id !== option.id)
                                      : [...activeFilters.solutionTypes, option.id]
                                  });
                                }, 100);
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                                activeFilters.solutionTypes.includes(option.id)
                                  ? "bg-primary text-white"
                                  : "bg-secondary hover:bg-secondary/70"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Modalidad</h4>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.modality.map(option => (
                            <button
                              key={option.id}
                              onClick={() => {
                                toggleModalityFilter(option.id);
                                setTimeout(() => {
                                  filterEventBus.publish('filtersChanged', {
                                    ...activeFilters,
                                    modalities: activeFilters.modalities.includes(option.id)
                                      ? activeFilters.modalities.filter(id => id !== option.id)
                                      : [...activeFilters.modalities, option.id]
                                  });
                                }, 100);
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                                activeFilters.modalities.includes(option.id)
                                  ? "bg-primary text-white"
                                  : "bg-secondary hover:bg-secondary/70"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {totalActiveFilters > 0 && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-primary hover:text-primary/70 transition-all duration-200"
                        >
                          Limpiar filtros ({totalActiveFilters})
                        </button>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            <button
              onClick={toggleSearch}
              className={cn(
                "p-2 rounded-full transition-all-200",
                isSearchOpen
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              )}
              aria-label="Search"
            >
              {isSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {!isCompetencyPage && (
              <button
                onClick={toggleFilter}
                className={cn(
                  "flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-secondary font-poppins hover:bg-secondary/70",
                  isFilterOpen && "bg-primary text-white"
                )}
                aria-label="Filter"
              >
                <Filter className="w-4 h-4 mr-1" />
                <span>Filtros</span>
              </button>
            )}

            <Link
              to="/appointment"
              className="hidden sm:flex items-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all-200"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      </header>

      {isHomePage && (
        <div
          className={cn(
            "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform md:hidden",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
          )}
        >
          <div className="p-4 space-y-3">
            <Button 
              onClick={() => scrollToSection("soluciones")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Soluciones
            </Button>
            <Button 
              onClick={() => scrollToSection("destacadas")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Destacadas
            </Button>
            <Button 
              onClick={() => scrollToSection("casos-exito")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Casos de Éxito
            </Button>
            <Button 
              onClick={() => scrollToSection("contacto")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Contacto
            </Button>
            <Link
              to="/appointment"
              className="flex w-full items-center justify-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all-200"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      )}

      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      </div>

      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isFilterOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <FilterBar 
          onClose={() => setIsFilterOpen(false)} 
          onApplyFilters={handleApplyFilters}
          initialFilters={activeFilters}
          isSticky={true}
        />
      </div>

      {isCompetencyPage && (
        <div className="sticky top-16 z-30 w-full bg-white/90 backdrop-blur-lg border-b border-border shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Filtrar por:</span>
              
              <div className="flex flex-wrap gap-2">
                {filterOptions.type.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      toggleTypeFilter(option.id);
                      filterEventBus.publish('filtersChanged', {
                        ...activeFilters,
                        solutionTypes: activeFilters.solutionTypes.includes(option.id)
                          ? activeFilters.solutionTypes.filter(id => id !== option.id)
                          : [...activeFilters.solutionTypes, option.id]
                      });
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
                      activeFilters.solutionTypes.includes(option.id)
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/70"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              <div className="h-4 border-r border-border mx-1 hidden sm:block"></div>
              
              <div className="flex flex-wrap gap-2">
                {filterOptions.modality.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      toggleModalityFilter(option.id);
                      filterEventBus.publish('filtersChanged', {
                        ...activeFilters,
                        modalities: activeFilters.modalities.includes(option.id)
                          ? activeFilters.modalities.filter(id => id !== option.id)
                          : [...activeFilters.modalities, option.id]
                      });
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
                      activeFilters.modalities.includes(option.id)
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/70"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="ml-auto text-xs text-primary hover:text-primary/70 transition-all duration-200"
                >
                  Limpiar filtros ({totalActiveFilters})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16"></div>
    </>
  );
};

export default Header;
