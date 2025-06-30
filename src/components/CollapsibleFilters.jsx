
import React, { useState } from "react";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FilterBar from "@/components/FilterBar";

const CollapsibleFilters = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const closeFilters = () => {
    setIsOpen(false);
  };

  // Contar filtros activos - solo características específicas
  const activeFiltersCount = Object.values(filters || {}).reduce((count, filterArray) => {
    return count + (Array.isArray(filterArray) ? filterArray.length : 0);
  }, 0);

  return (
    <div className="relative">
      {/* Botón de filtros */}
      <Button
        onClick={toggleFilters}
        variant="outline"
        className={cn(
          "flex items-center gap-2 h-12 px-4 border-2 font-quicksand transition-all duration-200 rounded-full",
          isOpen ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
        )}
      >
        <Filter className="h-4 w-4" />
        <span className="font-medium">
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-xs">
              {activeFiltersCount}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {/* Panel de filtros desplegable */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closeFilters}
          />
          
          {/* Panel de filtros */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto animate-fade-in min-w-[800px]">
            <div className="p-6">
              <FilterBar
                onClose={closeFilters}
                initialFilters={filters}
                isSticky={false}
                onFiltersChange={onFiltersChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapsibleFilters;
