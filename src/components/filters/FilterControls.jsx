
import React from "react";
import { cn } from "@/lib/utils";

const FilterControls = ({
  totalSelectedFilters,
  onClearFilters,
  onClose,
}) => {
  return (
    <div className="flex justify-between mt-6">
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
      <button
        onClick={onClose}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200 font-poppins"
      >
        Cerrar filtros
      </button>
    </div>
  );
};

export default FilterControls;
