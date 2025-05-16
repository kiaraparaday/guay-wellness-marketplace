
// Sample competencies mapping
export const competenciesData = {
  "mental-workload": {
    id: "mental-workload",
    title: "Gestión de Cargas Mentales",
    description: "Estrategias para manejar y distribuir las demandas cognitivas y emocionales en el entorno laboral, previniendo el agotamiento y mejorando la productividad.",
    dimensionId: "psychosocial",
    dimensionTitle: "Factores Psicosociales",
    color: "#4f46e5",
  },
  "work-autonomy": {
    id: "work-autonomy",
    title: "Autonomía Laboral",
    description: "Desarrollo de entornos donde los colaboradores tengan control sobre sus tareas, métodos y tiempos de trabajo, fomentando responsabilidad e iniciativa.",
    dimensionId: "psychosocial",
    dimensionTitle: "Factores Psicosociales",
    color: "#4f46e5",
  },
  "work-life-balance": {
    id: "work-life-balance",
    title: "Relación Vida-Trabajo",
    description: "Prácticas y políticas para equilibrar las responsabilidades profesionales y personales, mejorando la calidad de vida y reduciendo el estrés.",
    dimensionId: "psychosocial",
    dimensionTitle: "Factores Psicosociales",
    color: "#4f46e5",
  },
  "communication": {
    id: "communication",
    title: "Comunicación",
    description: "Desarrollo de habilidades para transmitir información de manera clara, eficiente y respetuosa, mejorando la colaboración y reduciendo conflictos en el entorno laboral.",
    dimensionId: "climate",
    dimensionTitle: "Clima Laboral",
    color: "#f59e0b",
  },
  "capability-development": {
    id: "capability-development",
    title: "Desarrollo de Capacidades",
    description: "Fortalecimiento de las competencias y habilidades de los colaboradores para aumentar su efectividad y satisfacción laboral.",
    dimensionId: "culture",
    dimensionTitle: "Cultura Organizacional",
    color: "#10b981",
  },
  "diversity": {
    id: "diversity",
    title: "Diversidad",
    description: "Promoción y valoración de la diversidad en todas sus formas, creando una fuerza laboral que refleje la sociedad y aporte diferentes perspectivas.",
    dimensionId: "dei",
    dimensionTitle: "Diversidad, Equidad e Inclusión",
    color: "#ec4899",
  },
  "leadership": {
    id: "leadership",
    title: "Liderazgo",
    description: "Desarrollo de líderes efectivos que inspiren, guíen y potencien a sus equipos para alcanzar objetivos compartidos.",
    dimensionId: "culture",
    dimensionTitle: "Cultura Organizacional",
    color: "#10b981",
  },
  "teamwork": {
    id: "teamwork",
    title: "Trabajo en Equipo",
    description: "Fomento de la colaboración, comunicación y sinergia entre los miembros de un equipo para lograr resultados superiores.",
    dimensionId: "climate",
    dimensionTitle: "Clima Laboral",
    color: "#f59e0b",
  },
  "innovation": {
    id: "innovation",
    title: "Innovación",
    description: "Creación de entornos que estimulen la creatividad, el pensamiento disruptivo y la implementación de nuevas ideas.",
    dimensionId: "culture",
    dimensionTitle: "Cultura Organizacional",
    color: "#10b981",
  },
  "integrity": {
    id: "integrity",
    title: "Integridad",
    description: "Promoción de valores éticos y comportamientos que reflejen honestidad, transparencia y coherencia en todas las acciones.",
    dimensionId: "culture",
    dimensionTitle: "Cultura Organizacional",
    color: "#10b981",
  }
};

export type CompetencyDataType = typeof competenciesData[keyof typeof competenciesData];

export const getCompetencyById = (id: string): CompetencyDataType | null => {
  return id ? competenciesData[id as keyof typeof competenciesData] || null : null;
};
