
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import CharacteristicsFiltersSection from "./filters/CharacteristicsFiltersSection";
import FilterControls from "./filters/FilterControls";
import { filterEventBus } from "../services/eventBus";

const FilterBar = ({ onClose, initialFilters, isSticky = true }) => {
  const [solutionTypes, setSolutionTypes] = useState(initialFilters?.solutionTypes || []);
  const [modalities, setModalities] = useState(initialFilters?.modalities || []);
  const [durations, setDurations] = useState(initialFilters?.durations || []);
  const [audiences, setAudiences] = useState(initialFilters?.audiences || []);

  const totalSelectedFilters = 
    solutionTypes.length + 
    modalities.length + 
    durations.length + 
    audiences.length;

  const handleClearFilters = () => {
    setSolutionTypes([]);
    setModalities([]);
    setDurations([]);
    setAudiences([]);
  };

  useEffect(() => {
    const filters = {
      solutionTypes,
      modalities,
      durations,
      audiences
    };
    
    filterEventBus.publish('filtersChanged', filters);
  }, [solutionTypes, modalities, durations, audiences]);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${isSticky ? 'sticky top-32 z-30' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold font-poppins text-gray-900">
            Filtros
          </h2>
          {totalSelectedFilters > 0 && (
            <span className="bg-primary text-white rounded-full px-2 py-1 text-xs font-medium">
              {totalSelectedFilters}
            </span>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Cerrar filtros"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

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
        onClearFilters={handleClearFilters}
        onClose={onClose}
      />
    </div>
  );
};

export default FilterBar;
