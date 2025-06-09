
import React from "react";
import { cn } from "@/lib/utils";
import FilterBar from "@/components/FilterBar";

const CollapsibleFilterPanel = ({ 
  isOpen, 
  onClose, 
  filters,
  onFiltersChange 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Panel de filtros */}
      <div className="relative z-50">
        <div className={cn(
          "absolute top-2 left-0 right-0 bg-white rounded-lg shadow-xl border border-gray-200",
          "max-h-[80vh] overflow-y-auto",
          "mx-4 md:mx-0",
          "animate-fade-in"
        )}>
          <FilterBar
            onClose={onClose}
            initialFilters={filters}
            isSticky={false}
          />
        </div>
      </div>
    </>
  );
};

export default CollapsibleFilterPanel;
