
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { filterEventBus } from "@/services/eventBus";
import TopicsFiltersSection from "./filters/TopicsFiltersSection";
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
  const [benefits, setBenefits] = useState(initialFilters.benefits || []);
  const [categories, setCategories] = useState(initialFilters.categories || []);

  // Apply filters in real-time whenever any filter changes
  useEffect(() => {
    const currentFilters = {
      solutionTypes,
      modalities,
      durations,
      audiences,
      benefits,
      categories,
    };
    
    console.log('Publishing filters in real-time:', currentFilters);
    filterEventBus.publish('filtersChanged', currentFilters);
  }, [solutionTypes, modalities, durations, audiences, benefits, categories]);

  const clearAllFilters = () => {
    console.log('Clearing all filters');
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
    setBenefits([]);
    setCategories([]);
  };

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length +
    benefits.length +
    categories.length;

  return (
    <div className={cn(
      "w-full py-4 px-6 font-poppins bg-white",
      isSticky && "shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto">
        <TopicsFiltersSection
          categories={categories}
          setCategories={setCategories}
          benefits={benefits}
          setBenefits={setBenefits}
        />

        {/* Línea divisoria sutil */}
        <div className="border-t border-gray-200 mb-8"></div>

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
