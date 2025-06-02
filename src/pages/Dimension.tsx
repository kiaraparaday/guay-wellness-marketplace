
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import CompetencyFilterBar from "@/components/CompetencyFilterBar";
import ContactModal from "@/components/ContactModal";
import { ArrowLeft } from "lucide-react";
import { solutionsArray } from "@/data/solutions";

const dimensions = {
  "psychosocial": {
    id: "psychosocial",
    title: "Factores Psicosociales",
    description: "Aborda los elementos que afectan el bienestar mental y emocional de los colaboradores, mejorando la calidad de vida laboral.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
    color: "rgba(79, 70, 229, 0.8)",
    colorClass: "from-indigo-600 to-indigo-400",
  },
  "climate": {
    id: "climate",
    title: "Clima Laboral",
    description: "Mejora el ambiente de trabajo enfocándose en la comunicación, motivación, equidad e integración entre los miembros del equipo.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    color: "rgba(245, 158, 11, 0.8)",
    colorClass: "from-amber-600 to-amber-400",
  },
  "culture": {
    id: "culture",
    title: "Cultura Organizacional",
    description: "Fortalece los valores y comportamientos compartidos en la organización, desarrollando capacidades, coordinación e integración, y aprendizaje organizacional.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    color: "rgba(16, 185, 129, 0.8)",
    colorClass: "from-emerald-600 to-emerald-400",
  },
  "dei": {
    id: "dei",
    title: "Diversidad, Equidad e Inclusión",
    description: "Promueve un entorno laboral donde todas las personas son valoradas y respetadas, independientemente de sus diferencias, creando espacios seguros y equitativos.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    color: "rgba(236, 72, 153, 0.8)",
    colorClass: "from-pink-600 to-pink-400",
  },
};

// Placeholder solutions for competencies without content
const placeholderSolutions = {
  "mental-workload": [
    {
      id: "placeholder-mental-workload-1",
      title: "Taller de Gestión de Cargas Mentales",
      type: "workshop",
      modality: "hybrid",
      duration: "4 horas",
      audience: "Todos los colaboradores",
      description: "Aprende técnicas efectivas para gestionar y distribuir las demandas cognitivas del trabajo diario.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
      competencies: ["mental-workload"],
      categories: ["Bienestar Mental", "Productividad"],
    }
  ],
  "work-autonomy": [
    {
      id: "placeholder-work-autonomy-1",
      title: "Programa de Autonomía Laboral",
      type: "course",
      modality: "virtual",
      duration: "3 días",
      audience: "Equipos de trabajo",
      description: "Desarrolla habilidades para tomar decisiones independientes y gestionar tu trabajo de manera autónoma.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      competencies: ["work-autonomy"],
      categories: ["Liderazgo Personal", "Autogestión"],
    }
  ],
  "work-life-balance": [
    {
      id: "placeholder-work-life-balance-1",
      title: "Equilibrio Vida-Trabajo Saludable",
      type: "webinar",
      modality: "virtual",
      duration: "2 horas",
      audience: "Todos los colaboradores",
      description: "Estrategias prácticas para mantener un equilibrio saludable entre responsabilidades laborales y personales.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      competencies: ["work-life-balance"],
      categories: ["Bienestar Personal", "Equilibrio"],
    }
  ],
  "stress-management": [
    {
      id: "placeholder-stress-management-1",
      title: "Técnicas de Manejo del Estrés",
      type: "workshop",
      modality: "in-person",
      duration: "6 horas",
      audience: "Todos los colaboradores",
      description: "Herramientas efectivas para identificar, reducir y gestionar el estrés en el ambiente laboral.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      competencies: ["stress-management"],
      categories: ["Bienestar Mental", "Salud Emocional"],
    }
  ],
  "communication": [
    {
      id: "placeholder-communication-1",
      title: "Comunicación Efectiva en Equipos",
      type: "course",
      modality: "hybrid",
      duration: "2 días",
      audience: "Equipos de trabajo",
      description: "Desarrolla habilidades de comunicación clara y efectiva para mejorar la colaboración en el trabajo.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      competencies: ["communication"],
      categories: ["Comunicación", "Colaboración"],
    }
  ],
  "motivation": [
    {
      id: "placeholder-motivation-1",
      title: "Motivación y Engagement Laboral",
      type: "workshop",
      modality: "in-person",
      duration: "4 horas",
      audience: "Líderes y equipos",
      description: "Estrategias para mantener alta motivación y compromiso en el ambiente de trabajo.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      competencies: ["motivation"],
      categories: ["Motivación", "Engagement"],
    }
  ],
  "equity": [
    {
      id: "placeholder-equity-1",
      title: "Prácticas de Equidad Organizacional",
      type: "webinar",
      modality: "virtual",
      duration: "3 horas",
      audience: "Líderes y RRHH",
      description: "Implementación de prácticas justas en reconocimiento y oportunidades de desarrollo.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      competencies: ["equity"],
      categories: ["Equidad", "Justicia Organizacional"],
    }
  ],
  "integration": [
    {
      id: "placeholder-integration-1",
      title: "Integración y Trabajo en Equipo",
      type: "workshop",
      modality: "in-person",
      duration: "1 día",
      audience: "Equipos de trabajo",
      description: "Fortalece el sentido de pertenencia y mejora la colaboración entre miembros del equipo.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      competencies: ["integration"],
      categories: ["Integración", "Colaboración"],
    }
  ],
  "capability-development": [
    {
      id: "placeholder-capability-development-1",
      title: "Desarrollo de Capacidades Clave",
      type: "course",
      modality: "hybrid",
      duration: "5 días",
      audience: "Todos los colaboradores",
      description: "Programa integral para identificar y potenciar habilidades clave en la organización.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
      competencies: ["capability-development"],
      categories: ["Desarrollo Profesional", "Capacidades"],
    }
  ],
  "coordination-integration": [
    {
      id: "placeholder-coordination-integration-1",
      title: "Coordinación entre Áreas",
      type: "workshop",
      modality: "in-person",
      duration: "6 horas",
      audience: "Líderes de área",
      description: "Optimización de procesos para facilitar la colaboración efectiva entre diferentes áreas.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      competencies: ["coordination-integration"],
      categories: ["Coordinación", "Procesos"],
    }
  ],
  "organizational-learning": [
    {
      id: "placeholder-organizational-learning-1",
      title: "Aprendizaje Organizacional Continuo",
      type: "course",
      modality: "virtual",
      duration: "4 semanas",
      audience: "Líderes y equipos",
      description: "Sistemas para capturar, compartir y aplicar conocimientos en toda la organización.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      competencies: ["organizational-learning"],
      categories: ["Aprendizaje", "Conocimiento"],
    }
  ],
  "values": [
    {
      id: "placeholder-values-1",
      title: "Valores Organizacionales en Acción",
      type: "workshop",
      modality: "hybrid",
      duration: "3 horas",
      audience: "Todos los colaboradores",
      description: "Estrategias para definir, comunicar y vivir los principios fundamentales de la empresa.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      competencies: ["values"],
      categories: ["Valores", "Cultura"],
    }
  ],
  "diversity": [
    {
      id: "placeholder-diversity-1",
      title: "Celebrando la Diversidad",
      type: "webinar",
      modality: "virtual",
      duration: "2 horas",
      audience: "Todos los colaboradores",
      description: "Enfoques para valorar y aprovechar la variedad de perspectivas y talentos en el equipo.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
      competencies: ["diversity"],
      categories: ["Diversidad", "Inclusión"],
    }
  ],
  "equity-inclusion": [
    {
      id: "placeholder-equity-inclusion-1",
      title: "Equidad e Inclusión Práctica",
      type: "course",
      modality: "in-person",
      duration: "2 días",
      audience: "Líderes y RRHH",
      description: "Prácticas para garantizar oportunidades justas y crear ambientes verdaderamente inclusivos.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      competencies: ["equity-inclusion"],
      categories: ["Equidad", "Inclusión"],
    }
  ],
  "accessibility": [
    {
      id: "placeholder-accessibility-1",
      title: "Accesibilidad e Inclusión Total",
      type: "workshop",
      modality: "hybrid",
      duration: "4 horas",
      audience: "Equipos de trabajo",
      description: "Soluciones para eliminar barreras y asegurar la participación plena de todas las personas.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
      competencies: ["accessibility"],
      categories: ["Accesibilidad", "Inclusión"],
    }
  ],
  "belonging": [
    {
      id: "placeholder-belonging-1",
      title: "Construyendo Sentido de Pertenencia",
      type: "workshop",
      modality: "in-person",
      duration: "1 día",
      audience: "Todos los colaboradores",
      description: "Iniciativas para fortalecer la conexión emocional y el sentido de pertenencia con la organización.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      competencies: ["belonging"],
      categories: ["Pertenencia", "Conexión"],
    }
  ],
};

// Competencies grouped by dimension with their related solutions
const competenciesByDimension: Record<string, any[]> = {
  "psychosocial": [
    {
      id: "mental-workload",
      title: "🧠 Gestión de Cargas Mentales",
      description: "Estrategias para distribuir y gestionar eficientemente las demandas cognitivas del trabajo.",
      solutions: solutionsArray.filter(s => s.competencies.includes("mental-workload")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("mental-workload"))
        : placeholderSolutions["mental-workload"]
    },
    {
      id: "work-autonomy", 
      title: "✋ Autonomía Laboral",
      description: "Fortalecimiento de la capacidad de toma de decisiones y control del trabajo.",
      solutions: solutionsArray.filter(s => s.competencies.includes("work-autonomy")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("work-autonomy"))
        : placeholderSolutions["work-autonomy"]
    },
    {
      id: "work-life-balance",
      title: "💼 Relación Vida-Trabajo", 
      description: "Herramientas para armonizar responsabilidades laborales y personales.",
      solutions: solutionsArray.filter(s => s.competencies.includes("work-life-balance")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("work-life-balance"))
        : placeholderSolutions["work-life-balance"]
    },
    {
      id: "stress-management",
      title: "💨 Manejo del Estrés",
      description: "Técnicas efectivas para identificar, reducir y gestionar el estrés laboral.",
      solutions: solutionsArray.filter(s => s.competencies.includes("stress-management")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("stress-management"))
        : placeholderSolutions["stress-management"]
    },
  ],
  "climate": [
    {
      id: "communication",
      title: "💬 Comunicación",
      description: "Desarrollo de canales y estrategias para una comunicación clara y efectiva.",
      solutions: solutionsArray.filter(s => s.competencies.includes("communication")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("communication"))
        : placeholderSolutions["communication"]
    },
    {
      id: "motivation",
      title: "⚡ Motivación",
      description: "Herramientas para impulsar la motivación y el compromiso laboral.",
      solutions: solutionsArray.filter(s => s.competencies.includes("motivation")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("motivation"))
        : placeholderSolutions["motivation"]
    },
    {
      id: "equity",
      title: "⚖️ Equidad",
      description: "Implementación de prácticas justas en reconocimiento y oportunidades.",
      solutions: solutionsArray.filter(s => s.competencies.includes("equity")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("equity"))
        : placeholderSolutions["equity"]
    },
    {
      id: "integration",
      title: "🤝 Integración",
      description: "Metodologías para fortalecer el sentido de pertenencia y trabajo en equipo.",
      solutions: solutionsArray.filter(s => s.competencies.includes("integration")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("integration"))
        : placeholderSolutions["integration"]
    },
  ],
  "culture": [
    {
      id: "capability-development",
      title: "🎯 Desarrollo de Capacidades",
      description: "Programas para identificar y potenciar habilidades clave.",
      solutions: solutionsArray.filter(s => s.competencies.includes("capability-development")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("capability-development"))
        : placeholderSolutions["capability-development"]
    },
    {
      id: "coordination-integration",
      title: "🔗 Coordinación e Integración",
      description: "Optimización de procesos para facilitar la colaboración entre áreas.",
      solutions: solutionsArray.filter(s => s.competencies.includes("coordination-integration")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("coordination-integration"))
        : placeholderSolutions["coordination-integration"]
    },
    {
      id: "organizational-learning",
      title: "📚 Aprendizaje Organizacional",
      description: "Sistemas para capturar, compartir y aplicar conocimientos.",
      solutions: solutionsArray.filter(s => s.competencies.includes("organizational-learning")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("organizational-learning"))
        : placeholderSolutions["organizational-learning"]
    },
    {
      id: "values",
      title: "🌟 Valores Organizacionales",
      description: "Estrategias para definir y vivir los principios fundamentales de la empresa.",
      solutions: solutionsArray.filter(s => s.competencies.includes("values")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("values"))
        : placeholderSolutions["values"]
    },
  ],
  "dei": [
    {
      id: "diversity",
      title: "🌈 Diversidad",
      description: "Enfoques para valorar y aprovechar la variedad de perspectivas y talentos.",
      solutions: solutionsArray.filter(s => s.competencies.includes("diversity")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("diversity"))
        : placeholderSolutions["diversity"]
    },
    {
      id: "equity-inclusion",
      title: "🤗 Equidad e Inclusión",
      description: "Prácticas para garantizar oportunidades justas y crear ambientes inclusivos.",
      solutions: solutionsArray.filter(s => s.competencies.includes("equity-inclusion")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("equity-inclusion"))
        : placeholderSolutions["equity-inclusion"]
    },
    {
      id: "accessibility",
      title: "♿ Accesibilidad",
      description: "Soluciones para eliminar barreras y asegurar participación plena.",
      solutions: solutionsArray.filter(s => s.competencies.includes("accessibility")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("accessibility"))
        : placeholderSolutions["accessibility"]
    },
    {
      id: "belonging",
      title: "❤️ Sentido de Pertenencia",
      description: "Iniciativas para fortalecer la conexión emocional con la organización.",
      solutions: solutionsArray.filter(s => s.competencies.includes("belonging")).length > 0 
        ? solutionsArray.filter(s => s.competencies.includes("belonging"))
        : placeholderSolutions["belonging"]
    },
  ],
};

const DimensionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dimension = id ? dimensions[id as keyof typeof dimensions] : null;
  const competencies = id ? competenciesByDimension[id] : [];
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!dimension) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Dimensión no encontrada</h2>
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      {/* Reduced Hero Section */}
      <section className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        <img 
          src={dimension.image} 
          alt={dimension.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F1A30]/70" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center text-white/90 hover:text-white mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver a dimensiones
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 animate-fade-in font-quicksand">
              {dimension.title}
            </h1>
            <p className="text-white/90 max-w-2xl mb-4 animate-fade-in font-quicksand" style={{ animationDelay: "100ms" }}>
              {dimension.description}
            </p>
            
            {/* Quick navigation to competencies */}
            <div className="flex flex-wrap gap-2 mt-4">
              {competencies.slice(0, 4).map((competency) => (
                <a
                  key={competency.id}
                  href={`#${competency.id}`}
                  className="px-3 py-1.5 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors font-quicksand"
                >
                  {competency.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters Section - Now more prominent */}
      <div className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <CompetencyFilterBar />
        </div>
      </div>
      
      {/* Competencies and Solutions Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {competencies.map((competency, index) => (
            <div key={competency.id} className="mb-12" id={competency.id}>
              {/* Competency Header - Improved design */}
              <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-2 font-quicksand text-gray-800 flex items-center">
                  <span className="mr-3">{competency.title}</span>
                </h2>
                <p className="text-muted-foreground max-w-3xl font-quicksand">
                  {competency.description}
                </p>
              </div>
              
              {/* Solutions Grid - Now always shows solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {competency.solutions.map((solution: any, solutionIndex: number) => (
                  <SolutionCard 
                    key={solution.id} 
                    solution={solution} 
                    index={solutionIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section - Updated with new unified contact button */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`bg-gradient-to-r ${dimension.colorClass} rounded-2xl overflow-hidden shadow-sm`}>
            <div className="p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-semibold mb-3 font-quicksand">
                ¿Quieres mejorar esta dimensión en tu organización?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl font-quicksand">
                Nuestro equipo de expertos te puede ayudar a diseñar un plan personalizado
                para fortalecer las competencias de {dimension.title} en tu organización.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-block px-6 py-3 bg-[#F5F8FC] text-[#0F1A30] rounded-lg font-medium hover:bg-white transition-colors font-quicksand text-lg"
                >
                  Contáctanos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Footer */}
      <footer className="py-6 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground font-quicksand">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground font-quicksand">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DimensionPage;
