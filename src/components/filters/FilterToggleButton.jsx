
import React from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FilterToggleButton = ({ 
  isOpen, 
  onToggle, 
  activeFiltersCount = 0 
}) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      className={cn(
        "flex items-center gap-2 h-12 px-4 border-2 font-quicksand transition-all duration-200",
        isOpen ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
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
  );
};

export default FilterToggleButton;
