import React from "react";
import Header from "@/components/Header";
import DimensionCard, { DimensionType } from "@/components/DimensionCard";
import SolutionCard, { SolutionType } from "@/components/SolutionCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const dimensions: DimensionType[] = [
  {
    id: "psychosocial",
    title: "Factores Psicosociales",
    description: "Mejora el bienestar mental y emocional de tu equipo.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
    color: "rgba(79, 70, 229, 0.8)",
  },
  {
    id: "climate",
    title: "Clima Laboral",
    description: "Transforma el ambiente de trabajo para potenciar la productividad.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    color: "rgba(245, 158, 11, 0.8)",
  },
  {
    id: "culture",
    title: "Cultura Organizacional",
    description: "Fortalece valores compartidos y desarrolla capacidades de equipo.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    color: "rgba(16, 185, 129, 0.8)",
  },
  {
    id: "dei",
    title: "Diversidad, Equidad e Inclusión",
    description: "Crea espacios donde cada persona pueda brillar siendo auténtica.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    color: "rgba(236, 72, 153, 0.8)",
  },
];

// Catálogo de soluciones destacadas
const topSolutions: SolutionType[] = [
  {
    id: "mindfulness-program",
    title: "Programa de mindfulness corporativo",
    type: "workshop",
    modality: "hybrid",
    duration: "8 semanas",
    audience: "Equipos",
    description: "Programa de 8 semanas para mejorar la concentración y reducir el estrés laboral en equipos de trabajo",
    image: "/lovable-uploads/4155b648-99dc-4b36-9b11-b2ce846309e6.png",
    competencies: ["mental-workload", "work-life-balance"],
    categories: ["Mindfulness", "Bienestar Mental"]
  },
  {
    id: "leadership-training",
    title: "Formación en liderazgo consciente",
    type: "course",
    modality: "virtual",
    duration: "12 horas",
    audience: "Directivos",
    description: "Desarrollo de habilidades de liderazgo empático y consciente para potenciar equipos de alto rendimiento",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
    competencies: ["leadership", "capability-development"],
    categories: ["Liderazgo", "Desarrollo"]
  },
  {
    id: "team-building",
    title: "Taller de construcción de equipos diversos",
    type: "workshop",
    modality: "in-person",
    duration: "1 día",
    audience: "Todos",
    description: "Experiencia inmersiva para fortalecer lazos de equipo y valorar la diversidad en entornos laborales",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    competencies: ["teamwork", "diversity"],
    categories: ["Trabajo en Equipo", "Diversidad"]
  },
  {
    id: "stress-management",
    title: "Gestión del estrés laboral",
    type: "course",
    modality: "virtual",
    duration: "6 horas",
    audience: "Todos",
    description: "Estrategias prácticas para identificar y gestionar el estrés en el entorno laboral actual",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
    competencies: ["mental-workload", "work-life-balance"],
    categories: ["Bienestar", "Equilibrio"]
  }
];

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      {/* Hero Section with Solutions CTA */}
      <section className="pt-8 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center md:text-left md:items-start mb-6">
            <div className="inline-block px-3 py-1 mb-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
              Marketplace de Bienestar Organizacional
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
              Soluciones para el bienestar <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
                de tu organización
              </span>
            </h1>
          </div>
          
          {/* SOLUTIONS SECTION - Prominently displayed first */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-12 border border-guay-blue/10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-guay-dark">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
                    SOLUCIONES
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Descubre herramientas específicas para mejorar el bienestar en tu organización
                </p>
              </div>
              
              <Link 
                to="/dimension/psychosocial" 
                className="hidden md:flex items-center mt-4 md:mt-0 px-6 py-3 bg-guay-blue text-white rounded-full font-medium hover:shadow-md hover:bg-guay-blue/90 transition-all-200 group"
              >
                Ver todas las soluciones
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {dimensions.map((dimension, index) => (
                <DimensionCard 
                  key={dimension.id}
                  dimension={dimension}
                  index={index}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-6 md:hidden">
              <Link 
                to="/dimension/psychosocial" 
                className="flex items-center px-6 py-3 bg-guay-blue text-white rounded-full font-medium hover:shadow-md hover:bg-guay-blue/90 transition-all-200 group"
              >
                Ver todas las soluciones
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Top Solutions Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-guay-dark">
                  <span className="text-guay-purple">
                    Soluciones Destacadas
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Descubre nuestras soluciones más populares y recomendadas
                </p>
              </div>
              
              <Link 
                to="/solution" 
                className="hidden md:flex items-center mt-4 md:mt-0 px-6 py-3 bg-guay-purple text-white rounded-full font-medium hover:shadow-md hover:bg-guay-purple/90 transition-all-200 group"
              >
                Ver todo el catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Top Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topSolutions.map((solution, index) => (
                <SolutionCard 
                  key={solution.id}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-6 md:hidden">
              <Link 
                to="/solution" 
                className="flex items-center px-6 py-3 bg-guay-purple text-white rounded-full font-medium hover:shadow-md hover:bg-guay-purple/90 transition-all-200 group"
              >
                Ver todo el catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-4">
                  ¿No encuentras lo que buscas?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Nuestro equipo de expertos en bienestar organizacional puede ayudarte a 
                  encontrar la solución ideal para tus necesidades específicas.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                  <Link 
                    to="/appointment" 
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all-200"
                  >
                    Agendar una cita
                  </Link>
                  <Link 
                    to="/request-solution" 
                    className="inline-block px-6 py-3 bg-white text-foreground rounded-lg font-medium border border-border hover:border-primary/20 transition-all-200"
                  >
                    Solicitar una solución
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                  alt="Equipo de trabajo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
              </div>
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

export default IndexPage;
