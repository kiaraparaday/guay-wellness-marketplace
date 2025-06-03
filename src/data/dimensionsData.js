
// Local dimension data
export const dimensionsData = {
  "psychosocial": {
    id: "psychosocial",
    title: "Factores Psicosociales",
    description: "Aborda los elementos que afectan el bienestar mental y emocional de los colaboradores, mejorando la calidad de vida laboral.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
    competencies: [
      {
        id: "mental-workload",
        title: "Gestión de Cargas Mentales",
        description: "Estrategias para manejar y distribuir las demandas cognitivas y emocionales en el entorno laboral."
      },
      {
        id: "work-autonomy",
        title: "Autonomía Laboral",
        description: "Desarrollo de entornos donde los colaboradores tengan control sobre sus tareas, métodos y tiempos de trabajo."
      },
      {
        id: "work-life-balance",
        title: "Relación Vida-Trabajo",
        description: "Prácticas y políticas para equilibrar las responsabilidades profesionales y personales."
      }
    ]
  },
  "climate": {
    id: "climate",
    title: "Clima Laboral",
    description: "Mejora el ambiente de trabajo enfocándose en la comunicación, motivación, equidad e integración entre los miembros del equipo.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    competencies: [
      {
        id: "communication",
        title: "Comunicación",
        description: "Desarrollo de habilidades para transmitir información de manera clara, eficiente y respetuosa."
      },
      {
        id: "teamwork",
        title: "Trabajo en Equipo",
        description: "Fomento de la colaboración, comunicación y sinergia entre los miembros de un equipo."
      }
    ]
  },
  "culture": {
    id: "culture",
    title: "Cultura Organizacional",
    description: "Fortalece los valores y comportamientos compartidos en la organización.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    competencies: [
      {
        id: "capability-development",
        title: "Desarrollo de Capacidades",
        description: "Fortalecimiento de las competencias y habilidades de los colaboradores."
      },
      {
        id: "leadership",
        title: "Liderazgo",
        description: "Desarrollo de líderes efectivos que inspiren, guíen y potencien a sus equipos."
      },
      {
        id: "innovation",
        title: "Innovación",
        description: "Creación de entornos que estimulen la creatividad y el pensamiento disruptivo."
      },
      {
        id: "integrity",
        title: "Integridad",
        description: "Promoción de valores éticos y comportamientos que reflejen honestidad y transparencia."
      }
    ]
  },
  "dei": {
    id: "dei",
    title: "Diversidad, Equidad e Inclusión",
    description: "Promueve un entorno laboral donde todas las personas son valoradas y respetadas.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    competencies: [
      {
        id: "diversity",
        title: "Diversidad",
        description: "Promoción y valoración de la diversidad en todas sus formas."
      }
    ]
  }
};

export const getDimensionById = (id) => {
  return dimensionsData[id] || null;
};
