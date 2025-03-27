
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import CompetencyCard, { CompetencyType } from "@/components/CompetencyCard";
import { ArrowLeft } from "lucide-react";

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

// Sample competencies for each dimension
const competenciesByDimension: Record<string, CompetencyType[]> = {
  "psychosocial": [
    {
      id: "mental-workload",
      dimensionId: "psychosocial",
      title: "Gestión de Cargas Mentales",
      description: "Estrategias para distribuir y gestionar eficientemente las demandas cognitivas del trabajo, evitando el agotamiento mental.",
      icon: "/placeholder.svg",
      color: "#4f46e5",
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80", // Person with head in hands
    },
    {
      id: "work-autonomy",
      dimensionId: "psychosocial",
      title: "Autonomía Laboral",
      description: "Fortalecimiento de la capacidad de toma de decisiones, control del tiempo y métodos de trabajo para un mayor sentido de independencia.",
      icon: "/placeholder.svg",
      color: "#4f46e5",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80", // Person working independently
    },
    {
      id: "work-life-balance",
      dimensionId: "psychosocial",
      title: "Relación Vida-Trabajo",
      description: "Herramientas para armonizar las responsabilidades laborales y personales, mejorando la calidad de vida y reduciendo el estrés.",
      icon: "/placeholder.svg",
      color: "#4f46e5",
      image: "https://images.unsplash.com/photo-1684160083886-216a464462a6?auto=format&fit=crop&q=80", // Work-life balance concept
    },
    {
      id: "stress-management",
      dimensionId: "psychosocial",
      title: "Manejo del Estrés",
      description: "Técnicas efectivas para identificar, reducir y gestionar el estrés laboral, promoviendo el bienestar psicológico.",
      icon: "/placeholder.svg",
      color: "#4f46e5",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80", // Meditation/calm scene
    },
  ],
  "climate": [
    {
      id: "communication",
      dimensionId: "climate",
      title: "Comunicación",
      description: "Desarrollo de canales y estrategias para una comunicación clara, efectiva y transparente en todos los niveles organizacionales.",
      icon: "/placeholder.svg",
      color: "#f59e0b",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80", // Team communication
    },
    {
      id: "motivation",
      dimensionId: "climate",
      title: "Motivación",
      description: "Herramientas para impulsar la motivación intrínseca y extrínseca, fomentando el compromiso y satisfacción laboral.",
      icon: "/placeholder.svg",
      color: "#f59e0b",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", // Motivated team celebrating
    },
    {
      id: "equity",
      dimensionId: "climate",
      title: "Equidad",
      description: "Implementación de prácticas justas y equitativas en reconocimiento, compensación y oportunidades para todos los colaboradores.",
      icon: "/placeholder.svg",
      color: "#f59e0b",
      image: "https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?auto=format&fit=crop&q=80", // Equality concept
    },
    {
      id: "integration",
      dimensionId: "climate",
      title: "Integración",
      description: "Metodologías para fortalecer el sentido de pertenencia, cohesión y trabajo en equipo en toda la organización.",
      icon: "/placeholder.svg",
      color: "#f59e0b",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80", // Team building activity
    },
  ],
  "culture": [
    {
      id: "capability-development",
      dimensionId: "culture",
      title: "Desarrollo de Capacidades",
      description: "Programas para identificar, cultivar y potenciar las habilidades y competencias claves para el éxito organizacional.",
      icon: "/placeholder.svg",
      color: "#10b981",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80", // Learning/development scene
    },
    {
      id: "coordination-integration",
      dimensionId: "culture",
      title: "Coordinación e Integración",
      description: "Optimización de procesos internos para facilitar la colaboración entre áreas y alinear esfuerzos hacia objetivos comunes.",
      icon: "/placeholder.svg",
      color: "#10b981",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80", // Coordinated teamwork
    },
    {
      id: "organizational-learning",
      dimensionId: "culture",
      title: "Aprendizaje Organizacional",
      description: "Sistemas y prácticas para capturar, compartir y aplicar conocimientos, promoviendo la mejora continua y adaptabilidad.",
      icon: "/placeholder.svg",
      color: "#10b981",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80", // Learning environment
    },
    {
      id: "values",
      dimensionId: "culture",
      title: "Valores Organizacionales",
      description: "Estrategias para definir, comunicar y vivir los principios fundamentales que guían la conducta y decisiones en la empresa.",
      icon: "/placeholder.svg",
      color: "#10b981",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80", // Values concept
    },
  ],
  "dei": [
    {
      id: "diversity",
      dimensionId: "dei",
      title: "Diversidad",
      description: "Enfoques para valorar y aprovechar la variedad de perspectivas, experiencias y talentos en una fuerza laboral diversa.",
      icon: "/placeholder.svg",
      color: "#ec4899",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80", // Diverse team
    },
    {
      id: "equity-inclusion",
      dimensionId: "dei",
      title: "Equidad e Inclusión",
      description: "Prácticas para garantizar oportunidades justas y crear un ambiente donde todas las personas se sientan valoradas y respetadas.",
      icon: "/placeholder.svg",
      color: "#ec4899",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80", // Inclusion concept
    },
    {
      id: "accessibility",
      dimensionId: "dei",
      title: "Accesibilidad",
      description: "Soluciones para eliminar barreras físicas y digitales, asegurando que todos los colaboradores puedan participar plenamente.",
      icon: "/placeholder.svg",
      color: "#ec4899",
      image: "https://images.unsplash.com/photo-1624522004646-adee90cb6769?auto=format&fit=crop&q=80", // Accessibility features
    },
    {
      id: "belonging",
      dimensionId: "dei",
      title: "Sentido de Pertenencia",
      description: "Iniciativas para fortalecer la conexión emocional con la organización, donde todos se sienten parte integral del equipo.",
      icon: "/placeholder.svg",
      color: "#ec4899",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80", // Team togetherness
    },
  ],
};

const DimensionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dimension = id ? dimensions[id as keyof typeof dimensions] : null;
  const competencies = id ? competenciesByDimension[id] : [];

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
      
      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <img 
          src={dimension.image} 
          alt={dimension.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver a dimensiones
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 animate-fade-in">
              {dimension.title}
            </h1>
            <p className="text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              {dimension.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Competencies Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-block px-3 py-1 mb-6 rounded-full text-sm font-medium bg-gradient-to-r ${dimension.colorClass} text-white`}>
              Competencias
            </div>
            <h2 className="text-3xl font-semibold mb-4">
              Explora las competencias de {dimension.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selecciona una competencia para conocer las soluciones disponibles para mejorar esta dimensión en tu organización.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((competency, index) => (
              <CompetencyCard 
                key={competency.id} 
                competency={competency} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`bg-gradient-to-r ${dimension.colorClass} rounded-2xl overflow-hidden shadow-md`}>
            <div className="p-8 sm:p-12 text-white">
              <h2 className="text-3xl font-semibold mb-4">
                ¿Quieres mejorar esta dimensión en tu organización?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl">
                Nuestro equipo de expertos te puede ayudar a diseñar un plan personalizado
                para fortalecer las competencias de {dimension.title} en tu organización.
              </p>
              <Link 
                to="/appointment" 
                className="inline-block px-6 py-3 bg-white text-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all-200"
              >
                Agendar una cita
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DimensionPage;
