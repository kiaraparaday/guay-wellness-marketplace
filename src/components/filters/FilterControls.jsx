
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FilterControls = ({ 
  totalSelectedFilters, 
  onClearFilters, 
  onClose 
}) => {
  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
      <button
        onClick={onClearFilters}
        className={cn(
          "text-sm text-muted-foreground hover:text-primary transition-all-200 font-poppins",
          totalSelectedFilters === 0 && "opacity-50 cursor-not-allowed"
        )}
        disabled={totalSelectedFilters === 0}
      >
        Limpiar filtros {totalSelectedFilters > 0 && `(${totalSelectedFilters})`}
      </button>
      
      <Button
        onClick={onClose}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200 font-poppins"
      >
        Cerrar filtros
      </Button>
    </div>
  );
};

export default FilterControls;
