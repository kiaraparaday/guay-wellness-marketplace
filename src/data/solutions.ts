import { SolutionType } from "@/components/SolutionCard";

export const solutionsData: Record<string, SolutionType> = {
  "solution-1": {
    id: "solution-1",
    title: "Taller de Gestión del Estrés y Carga Mental",
    type: "workshop",
    modality: "in-person",
    duration: "4 horas",
    audience: "Todos los colaboradores",
    description: "Este taller práctico proporciona herramientas y técnicas concretas para identificar y manejar el estrés laboral y distribuir mejor las cargas cognitivas en el entorno de trabajo.",
    detailedDescription: `
      <p>El estrés y la sobrecarga mental son factores que afectan significativamente la productividad, satisfacción y bienestar de los colaboradores. Este taller intensivo está diseñado para dotar a los participantes con herramientas prácticas para:</p>
      
      <ul>
        <li>Identificar los signos tempranos de estrés laboral y sobrecarga mental</li>
        <li>Comprender cómo el cerebro procesa la información y las limitaciones cognitivas</li>
        <li>Aprender técnicas de priorización y gestión del tiempo</li>
        <li>Desarrollar estrategias de desconexión y recuperación</li>
        <li>Practicar técnicas de atención plena (mindfulness) aplicadas al entorno laboral</li>
        <li>Crear un plan personalizado de gestión de la carga mental</li>
      </ul>
      
      <p>La metodología del taller es eminentemente práctica, combinando exposiciones teóricas con ejercicios individuales y grupales, análisis de casos reales y sesiones de reflexión. Los participantes saldrán con un toolkit de recursos que podrán implementar inmediatamente en su día a día laboral.</p>
    `,
    benefits: [
      "Reducción de los niveles de estrés entre los colaboradores",
      "Mejora de la concentración y productividad",
      "Disminución del absentismo relacionado con la fatiga mental",
      "Mejora del clima laboral y las relaciones interpersonales",
      "Aumento de la satisfacción y compromiso de los colaboradores",
    ],
    includes: [
      "Material didáctico digital",
      "Evaluación previa y posterior al taller",
      "Sesión de seguimiento a las 4 semanas",
      "Certificado de participación",
    ],
    facilitator: {
      name: "Dra. María Rodríguez",
      position: "Psicóloga Organizacional especializada en estrés laboral",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    ],
    competencies: ["mental-workload"],
    categories: ["Carga Mental", "Bienestar", "Estrés"]
  },
  
  "solution-2": {
    id: "solution-2",
    title: "Curso Online de Comunicación Efectiva",
    type: "course",
    modality: "virtual",
    duration: "6 semanas",
    audience: "Líderes",
    description: "Desarrolla habilidades para transmitir mensajes claros, escuchar activamente y gestionar conversaciones difíciles en entornos laborales.",
    detailedDescription: `
      <p>La comunicación efectiva es una de las habilidades más valoradas en el entorno laboral moderno. Este curso completo aborda todos los aspectos necesarios para mejorar tus capacidades comunicativas como líder, incluyendo:</p>
      
      <ul>
        <li>Fundamentos de la comunicación interpersonal</li>
        <li>Técnicas avanzadas de escucha activa</li>
        <li>Comunicación asertiva y feedback constructivo</li>
        <li>Gestión de conversaciones difíciles</li>
        <li>Comunicación intercultural y en equipos diversos</li>
        <li>Presentaciones impactantes y storytelling</li>
      </ul>
      
      <p>El curso está estructurado en módulos semanales que combinan teoría, ejemplos prácticos, ejercicios, simulaciones y tareas para aplicar en el entorno real de trabajo. La plataforma interactiva permite conectar con otros participantes y recibir retroalimentación personalizada de los facilitadores.</p>
    `,
    benefits: [
      "Mayor claridad y efectividad en la comunicación del equipo",
      "Reducción de conflictos y malentendidos",
      "Mejora en la capacidad para influir e inspirar",
      "Aumento de la confianza al abordar conversaciones difíciles",
      "Fortalecimiento de la cohesión y colaboración en el equipo",
    ],
    includes: [
      "6 módulos con más de 30 lecciones en video",
      "Material descargable y herramientas prácticas",
      "Foros de discusión con facilitadores expertos",
      "2 sesiones grupales de coaching en vivo",
      "Certificado digital al completar el curso",
    ],
    facilitator: {
      name: "Carlos Méndez",
      position: "Especialista en Comunicación Organizacional",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
    ],
    competencies: ["communication"],
    categories: ["Comunicación", "Liderazgo", "Trabajo en Equipo"]
  },

  "solution-3": {
    id: "solution-3",
    title: "Taller de Comunicación Asertiva",
    type: "workshop",
    modality: "in-person",
    duration: "8 horas",
    audience: "Todos los niveles",
    description: "Aprende a comunicarte con claridad y respeto, defendiendo tus ideas mientras respetas las de los demás.",
    detailedDescription: `
      <p>La comunicación asertiva es una habilidad fundamental que permite expresar pensamientos, sentimientos y opiniones de manera clara y respetuosa, estableciendo límites saludables sin agredir ni someterse a los demás. Este taller intensivo está diseñado para desarrollar esta competencia crucial en el entorno laboral.</p>
      
      <ul>
        <li>Conocer los diferentes estilos de comunicación: pasivo, agresivo y asertivo</li>
        <li>Identificar patrones propios de comunicación y áreas de mejora</li>
        <li>Desarrollar técnicas para expresar opiniones y necesidades de forma clara y respetuosa</li>
        <li>Aprender a establecer límites saludables en el entorno profesional</li>
        <li>Practicar el manejo de críticas y conflictos de manera constructiva</li>
        <li>Implementar la asertividad en situaciones laborales reales</li>
      </ul>
      
      <p>El taller combina breves presentaciones teóricas con numerosos ejercicios prácticos, role-playing, análisis de casos y retroalimentación personalizada. Los participantes trabajarán con situaciones reales de su contexto laboral para aplicar inmediatamente lo aprendido.</p>
    `,
    benefits: [
      "Mejora en las relaciones interpersonales en el entorno laboral",
      "Resolución más efectiva de conflictos y prevención de malentendidos",
      "Mayor capacidad para expresar ideas y propuestas con impacto",
      "Reducción del estrés asociado a la comunicación en situaciones tensas",
      "Incremento de la autoconfianza y la autoestima profesional"
    ],
    includes: [
      "Manual completo de comunicación asertiva",
      "Tarjetas de referencia rápida con técnicas asertivas",
      "Acceso a plataforma digital con recursos complementarios",
      "Sesión de seguimiento a los 30 días",
      "Certificado de participación"
    ],
    facilitator: {
      name: "Laura Sánchez",
      position: "Consultora en Comunicación Organizacional",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520263115673-610416f52ab6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&q=80"
    ],
    competencies: ["communication"],
    categories: ["Comunicación", "Asertividad", "Resolución de Conflictos"]
  },

  "solution-4": {
    id: "solution-4",
    title: "Herramientas para el Trabajo Colaborativo Eficiente",
    type: "webinar",
    modality: "virtual",
    duration: "2 horas",
    audience: "Equipos de trabajo",
    description: "Optimiza la colaboración y comunicación en equipo mediante metodologías y herramientas digitales que reducen la carga mental.",
    detailedDescription: `
      <p>En el entorno laboral actual, la capacidad de colaborar eficientemente es clave para el éxito de los proyectos y el bienestar de los equipos. Este webinar práctico introduce metodologías y herramientas digitales que simplifican la colaboración y reducen la sobrecarga informativa.</p>
      
      <ul>
        <li>Principios fundamentales del trabajo colaborativo efectivo</li>
        <li>Metodologías ágiles simplificadas para equipos de cualquier sector</li>
        <li>Herramientas digitales para la gestión de proyectos colaborativos</li>
        <li>Técnicas para reuniones virtuales productivas y eficientes</li>
        <li>Estrategias para la documentación y gestión del conocimiento compartido</li>
        <li>Optimización de la comunicación asincrónica en equipos</li>
      </ul>
      
      <p>Este webinar interactivo incluye demostraciones en vivo de las herramientas más efectivas, ejemplos prácticos de implementación y un espacio para resolver dudas específicas de los participantes sobre sus propios desafíos de colaboración.</p>
    `,
    benefits: [
      "Reducción del tiempo dedicado a reuniones improductivas",
      "Mejora en la coordinación y seguimiento de proyectos colaborativos",
      "Disminución de la sobrecarga informativa y de comunicación",
      "Optimización de procesos de trabajo en equipo",
      "Incremento en la satisfacción de los miembros del equipo"
    ],
    includes: [
      "Acceso a la grabación del webinar",
      "Guía digital de herramientas colaborativas",
      "Plantillas para implementación inmediata",
      "Checklist de optimización de reuniones",
      "Recursos adicionales para profundizar en los temas"
    ],
    facilitator: {
      name: "Daniel Moreno",
      position: "Especialista en Productividad Digital",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
    ],
    competencies: ["mental-workload", "communication"],
    categories: ["Trabajo en Equipo", "Productividad", "Herramientas Digitales"]
  },

  "work-autonomy-workshop": {
    id: "work-autonomy-workshop",
    title: "Taller de Autonomía y Autogestión Laboral",
    type: "workshop",
    modality: "hybrid",
    duration: "6 horas",
    audience: "Todos los colaboradores",
    description: "Desarrolla habilidades para gestionar tu trabajo de manera autónoma, tomar decisiones efectivas y organizar tu tiempo de forma productiva.",
    detailedDescription: `
      <p>Este taller está diseñado para potenciar la autonomía laboral de los colaboradores, desarrollando competencias para la autogestión efectiva y la toma de decisiones independiente en el entorno de trabajo.</p>
      
      <ul>
        <li>Fundamentos de la autonomía laboral y sus beneficios</li>
        <li>Técnicas de planificación y organización personal</li>
        <li>Desarrollo de criterios para la toma de decisiones</li>
        <li>Gestión proactiva de recursos y tiempo</li>
        <li>Comunicación efectiva con supervisores y equipos</li>
        <li>Evaluación y mejora continua del desempeño</li>
      </ul>
    `,
    benefits: [
      "Mayor satisfacción y compromiso laboral",
      "Incremento de la productividad personal",
      "Desarrollo de competencias de liderazgo",
      "Reducción de la dependencia y microgestión",
      "Mejora de la confianza y autoestima profesional"
    ],
    includes: [
      "Manual de autogestión laboral",
      "Herramientas de planificación personal",
      "Sesión de coaching individual",
      "Evaluación de competencias pre y post taller",
      "Certificado de participación"
    ],
    facilitator: {
      name: "Ana García",
      position: "Consultora en Desarrollo Organizacional",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
    ],
    competencies: ["work-autonomy"],
    categories: ["Autonomía", "Autogestión", "Productividad"]
  },

  "work-life-balance-program": {
    id: "work-life-balance-program",
    title: "Programa de Equilibrio Vida-Trabajo",
    type: "course",
    modality: "virtual",
    duration: "4 semanas",
    audience: "Todos los colaboradores",
    description: "Estrategias prácticas para lograr un equilibrio saludable entre las responsabilidades laborales y la vida personal.",
    detailedDescription: `
      <p>Un programa integral que aborda los desafíos modernos del equilibrio entre vida laboral y personal, proporcionando herramientas concretas para gestionar ambas esferas de manera armoniosa.</p>
      
      <ul>
        <li>Identificación de factores que afectan el equilibrio vida-trabajo</li>
        <li>Establecimiento de límites saludables entre trabajo y vida personal</li>
        <li>Técnicas de desconexión digital y mental</li>
        <li>Gestión eficaz del tiempo y prioridades</li>
        <li>Estrategias para el cuidado personal y bienestar</li>
        <li>Comunicación asertiva sobre necesidades personales</li>
      </ul>
    `,
    benefits: [
      "Reducción del estrés y mejora del bienestar general",
      "Mayor satisfacción tanto laboral como personal",
      "Incremento de la productividad y concentración",
      "Mejora de las relaciones familiares y sociales",
      "Prevención del burnout y agotamiento"
    ],
    includes: [
      "4 módulos semanales con contenido interactivo",
      "Evaluación personalizada de equilibrio vida-trabajo",
      "Plantillas de planificación y organización",
      "Sesión grupal de seguimiento",
      "Recursos para el bienestar personal"
    ],
    facilitator: {
      name: "Dr. Roberto Silva",
      position: "Especialista en Bienestar Laboral",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80"
    ],
    competencies: ["work-life-balance"],
    categories: ["Equilibrio", "Bienestar", "Vida Personal"]
  },

  "mindfulness-program": {
    id: "mindfulness-program",
    title: "Programa de mindfulness corporativo",
    type: "workshop",
    modality: "hybrid",
    duration: "8 semanas",
    audience: "Equipos",
    description: "Programa de 8 semanas para mejorar la concentración y reducir el estrés laboral en equipos de trabajo",
    detailedDescription: `
      <p>El Programa de Mindfulness Corporativo es una intervención estructurada de 8 semanas diseñada específicamente para el entorno laboral. Basado en evidencia científica, este programa desarrolla la capacidad de atención plena para mejorar el bienestar, reducir el estrés y potenciar la productividad de los equipos.</p>
      
      <ul>
        <li>Fundamentos de la atención plena y su aplicación al contexto laboral</li>
        <li>Técnicas de meditación formal adaptadas al ritmo de trabajo</li>
        <li>Prácticas informales para integrar en la rutina diaria</li>
        <li>Gestión del estrés y prevención del burnout mediante mindfulness</li>
        <li>Estrategias para mejorar la concentración y reducir la multitarea</li>
        <li>Desarrollo de la resiliencia emocional en entornos de alta presión</li>
      </ul>
      
      <p>El programa combina sesiones grupales semanales (presenciales o virtuales) con prácticas diarias guiadas y material de apoyo. Se realiza un seguimiento personalizado del progreso de cada participante y se adaptan las prácticas a las necesidades específicas del equipo.</p>
    `,
    benefits: [
      "Reducción significativa de los niveles de estrés laboral",
      "Mejora de la capacidad de concentración y enfoque",
      "Incremento de la eficiencia y la productividad",
      "Desarrollo de habilidades de autorregulación emocional",
      "Mejora del clima laboral y la cohesión del equipo",
      "Reducción del absentismo relacionado con el estrés"
    ],
    includes: [
      "8 sesiones semanales de 1.5 horas",
      "App de meditaciones guiadas con acceso ilimitado",
      "Manual de práctica y bitácora de seguimiento",
      "Evaluación inicial y final con métricas de bienestar",
      "Sesión de integración post-programa",
      "Informe de impacto para la organización"
    ],
    facilitator: {
      name: "Dr. Javier López",
      position: "Instructor certificado en MBSR y Psicólogo Organizacional",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80"
    },
    image: "/lovable-uploads/4155b648-99dc-4b36-9b11-b2ce846309e6.png",
    images: [
      "/lovable-uploads/4155b648-99dc-4b36-9b11-b2ce846309e6.png",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80"
    ],
    competencies: ["mental-workload", "work-life-balance"],
    categories: ["Mindfulness", "Bienestar Mental"]
  },

  "leadership-training": {
    id: "leadership-training",
    title: "Formación en liderazgo consciente",
    type: "course",
    modality: "virtual",
    duration: "12 horas",
    audience: "Directivos",
    description: "Desarrollo de habilidades de liderazgo empático y consciente para potenciar equipos de alto rendimiento",
    detailedDescription: `
      <p>La Formación en Liderazgo Consciente es un programa intensivo que desarrolla un nuevo paradigma de liderazgo basado en la conciencia plena, la empatía y la inteligencia emocional. Este enfoque permite crear entornos de trabajo más humanos y a la vez más productivos.</p>
      
      <ul>
        <li>Fundamentos del liderazgo consciente y su impacto organizacional</li>
        <li>Desarrollo de la presencia plena como base del liderazgo efectivo</li>
        <li>Comunicación empática y escucha profunda</li>
        <li>Gestión emocional para decisiones más equilibradas</li>
        <li>Creación de culturas de feedback constructivo</li>
        <li>Facilitación de equipos desde la conciencia y el propósito</li>
      </ul>
      
      <p>El programa se imparte en 6 sesiones de 2 horas cada una, con un enfoque altamente participativo que combina conceptos teóricos con prácticas aplicadas, casos de estudio y ejercicios de autodescubrimiento. Entre sesiones, los participantes implementan lo aprendido en su contexto real de liderazgo.</p>
    `,
    benefits: [
      "Desarrollo de un estilo de liderazgo más auténtico y efectivo",
      "Mejora de la capacidad para inspirar y motivar equipos",
      "Reducción de conflictos y mejora del clima laboral",
      "Toma de decisiones más equilibrada y consciente",
      "Mayor capacidad para gestionar la complejidad y la incertidumbre",
      "Incremento del bienestar personal del líder y su equipo"
    ],
    includes: [
      "6 sesiones virtuales interactivas de 2 horas",
      "Evaluación de estilo de liderazgo pre y post programa",
      "Kit digital de herramientas de liderazgo consciente",
      "2 sesiones individuales de coaching ejecutivo",
      "Comunidad de práctica con otros líderes",
      "Certificación en Liderazgo Consciente"
    ],
    facilitator: {
      name: "Elena Martínez",
      position: "Coach Ejecutiva y Experta en Desarrollo de Liderazgo",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80"
    ],
    competencies: ["leadership", "capability-development"],
    categories: ["Liderazgo", "Desarrollo"]
  },

  "team-building": {
    id: "team-building",
    title: "Taller de construcción de equipos diversos",
    type: "workshop",
    modality: "in-person",
    duration: "1 día",
    audience: "Todos",
    description: "Experiencia inmersiva para fortalecer lazos de equipo y valorar la diversidad en entornos laborales",
    detailedDescription: `
      <p>El Taller de Construcción de Equipos Diversos es una experiencia inmersiva diseñada para fortalecer los lazos entre los miembros del equipo mientras se desarrolla una apreciación profunda de la diversidad como fuente de innovación y fortaleza organizacional.</p>
      
      <ul>
        <li>Actividades experienciales para construir confianza y cohesión</li>
        <li>Dinámicas para identificar y aprovechar la diversidad de perspectivas</li>
        <li>Ejercicios para mejorar la comunicación entre perfiles diversos</li>
        <li>Herramientas para la resolución colaborativa de problemas</li>
        <li>Prácticas para crear espacios de inclusión y pertenencia</li>
        <li>Desarrollo de acuerdos de equipo para una colaboración efectiva</li>
      </ul>
      
      <p>Este taller intensivo de un día combina actividades indoor y outdoor, diseñadas específicamente para sacar a los participantes de su zona de confort de manera segura y constructiva. A través de reflexiones guiadas, se conectan las experiencias vividas con los desafíos reales del equipo.</p>
    `,
    benefits: [
      "Fortalecimiento de la cohesión y confianza entre los miembros del equipo",
      "Mayor apreciación de la diversidad como ventaja competitiva",
      "Mejora de la comunicación y colaboración entre perfiles diversos",
      "Reducción de silos y aumento del trabajo interdepartamental",
      "Incremento del sentido de pertenencia e inclusión",
      "Desarrollo de un lenguaje común y acuerdos de colaboración"
    ],
    includes: [
      "Jornada completa de actividades experienciales",
      "Materiales y equipamiento especializado",
      "Comida y refrigerios durante la jornada",
      "Guía de implementación post-taller",
      "Sesión de seguimiento a los 30 días",
      "Reporte con observaciones y recomendaciones"
    ],
    facilitator: {
      name: "Miguel Torres",
      position: "Especialista en Desarrollo de Equipos y Diversidad",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
    ],
    competencies: ["teamwork", "diversity"],
    categories: ["Trabajo en Equipo", "Diversidad"]
  },

  "stress-management": {
    id: "stress-management",
    title: "Gestión del estrés laboral",
    type: "course",
    modality: "virtual",
    duration: "6 horas",
    audience: "Todos",
    description: "Estrategias prácticas para identificar y gestionar el estrés en el entorno laboral actual",
    detailedDescription: `
      <p>El curso de Gestión del Estrés Laboral proporciona herramientas concretas y basadas en evidencia para identificar, prevenir y manejar el estrés en el entorno profesional contemporáneo, caracterizado por su alta exigencia y constante cambio.</p>
      
      <ul>
        <li>Comprensión de los mecanismos biológicos y psicológicos del estrés</li>
        <li>Identificación de factores de riesgo personales y organizacionales</li>
        <li>Técnicas de respiración y relajación de aplicación inmediata</li>
        <li>Estrategias cognitivas para modificar patrones de pensamiento estresantes</li>
        <li>Organización del tiempo y establecimiento de límites saludables</li>
        <li>Desarrollo de un plan personalizado de gestión del estrés</li>
      </ul>
      
      <p>El curso se estructura en 3 módulos de 2 horas cada uno, impartidos en formato virtual interactivo. Cada módulo combina contenido teórico con prácticas guiadas, ejercicios de autoevaluación y espacios para compartir experiencias y resolver dudas específicas.</p>
    `,
    benefits: [
      "Reducción de los niveles de estrés percibido y sus síntomas físicos",
      "Mejora del equilibrio entre vida profesional y personal",
      "Aumento de la productividad y la concentración",
      "Desarrollo de mayor resiliencia frente a situaciones de presión",
      "Mejora de la calidad del sueño y la energía disponible",
      "Disminución de conductas compensatorias poco saludables"
    ],
    includes: [
      "3 sesiones virtuales interactivas de 2 horas",
      "Evaluación personalizada de niveles de estrés",
      "Manual digital con todas las técnicas aprendidas",
      "Audios guiados para prácticas diarias",
      "Acceso a biblioteca de recursos complementarios",
      "Certificado de participación"
    ],
    facilitator: {
      name: "Dra. Patricia Vega",
      position: "Psicóloga especializada en estrés laboral y burnout",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80"
    },
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80"
    ],
    competencies: ["mental-workload", "work-life-balance"],
    categories: ["Bienestar", "Equilibrio"]
  }
};

// Convert the solutions data record to an array for components that expect an array
export const solutionsArray = Object.values(solutionsData);
