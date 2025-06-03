
import React from "react";
import FilterGroup from "./FilterGroup";

const CharacteristicsFiltersSection = ({
  solutionTypes,
  setSolutionTypes,
  modalities,
  setModalities,
  durations,
  setDurations,
  audiences,
  setAudiences,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 font-poppins text-gray-900">
        Filtra por características específicas de la solución
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <FilterGroup
          title="Tipo de solución"
          options={[
            { id: "workshop", label: "Taller" },
            { id: "course", label: "Curso" },
            { id: "webinar", label: "Webinar" },
            { id: "coaching", label: "Coaching" },
            { id: "assessment", label: "Evaluación" },
          ]}
          selectedOptions={solutionTypes}
          onChange={setSolutionTypes}
          collapse={true}
        />

        <FilterGroup
          title="Modalidad"
          options={[
            { id: "in-person", label: "Presencial" },
            { id: "virtual", label: "Virtual" },
            { id: "hybrid", label: "Híbrido" },
          ]}
          selectedOptions={modalities}
          onChange={setModalities}
          collapse={true}
        />

        <FilterGroup
          title="Duración"
          options={[
            { id: "short", label: "Menos de 2 horas" },
            { id: "medium", label: "2-6 horas" },
            { id: "long", label: "Más de 6 horas" },
            { id: "multi-session", label: "Varias sesiones" },
          ]}
          selectedOptions={durations}
          onChange={setDurations}
          collapse={true}
        />

        <FilterGroup
          title="Audiencia objetivo"
          options={[
            { id: "leaders", label: "Líderes" },
            { id: "employees", label: "Colaboradores" },
            { id: "executives", label: "Ejecutivos" },
            { id: "hr", label: "Recursos Humanos" },
          ]}
          selectedOptions={audiences}
          onChange={setAudiences}
          collapse={true}
        />
      </div>
    </div>
  );
};

export default CharacteristicsFiltersSection;
