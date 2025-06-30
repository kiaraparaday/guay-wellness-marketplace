
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { filterEventBus } from "@/services/eventBus";
import CharacteristicsFiltersSection from "./filters/CharacteristicsFiltersSection";
import FilterControls from "./filters/FilterControls";

const FilterBar = ({ 
  onClose, 
  onApplyFilters, 
  initialFilters = {},
  isSticky = false
}) => {
  const [solutionTypes, setSolutionTypes] = useState(initialFilters.solutionTypes || []);
  const [modalities, setModalities] = useState(initialFilters.modalities || []);
  const [durations, setDurations] = useState(initialFilters.durations || []);
  const [audiences, setAudiences] = useState(initialFilters.audiences || []);

  // Apply filters in real-time whenever any filter changes
  useEffect(() => {
    const currentFilters = {
      solutionTypes,
      modalities,
      durations,
      audiences,
      benefits: [], // Keep empty for compatibility
      categories: [], // Keep empty for compatibility
    };
    
    console.log('Publishing filters in real-time:', currentFilters);
    filterEventBus.publish('filtersChanged', currentFilters);
  }, [solutionTypes, modalities, durations, audiences]);

  const clearAllFilters = () => {
    console.log('Clearing all filters');
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
  };

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length;

  return (
    <div className={cn(
      "w-full py-4 px-6 font-poppins bg-white",
      isSticky && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto">
        <CharacteristicsFiltersSection
          solutionTypes={solutionTypes}
          setSolutionTypes={setSolutionTypes}
          modalities={modalities}
          setModalities={setModalities}
          durations={durations}
          setDurations={setDurations}
          audiences={audiences}
          setAudiences={setAudiences}
        />

        <FilterControls
          totalSelectedFilters={totalSelectedFilters}
          onClearFilters={clearAllFilters}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default FilterBar;
