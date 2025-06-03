
import React from "react";
import FilterGroup from "./FilterGroup";

const TopicsFiltersSection = ({
  categories,
  setCategories,
  benefits,
  setBenefits,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 font-poppins text-gray-900">
        ¿Qué temas deseas que aborde la solución?
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <FilterGroup
          title="Categorías"
          options={[
            { id: "mental-workload", label: "Gestión de Cargas Mentales" },
            { id: "work-autonomy", label: "Autonomía Laboral" },
            { id: "work-life-balance", label: "Relación Vida-Trabajo" },
            { id: "stress-management", label: "Manejo del Estrés" },
          ]}
          selectedOptions={categories}
          onChange={setCategories}
          collapse={true}
        />

        <FilterGroup
          title="¿Qué deseas mejorar?"
          options={[
            { id: "stress", label: "Reducir estrés" },
            { id: "emotional-wellbeing", label: "Bienestar emocional" },
            { id: "mental-load", label: "Carga mental" },
            { id: "productivity", label: "Productividad" },
            { id: "leadership", label: "Liderazgo" },
            { id: "teamwork", label: "Trabajo en equipo" },
            { id: "work-life-balance", label: "Equilibrio vida-trabajo" },
            { id: "inclusion", label: "Inclusión" },
          ]}
          selectedOptions={benefits}
          onChange={setBenefits}
          collapse={true}
        />
      </div>
    </div>
  );
};

export default TopicsFiltersSection;
