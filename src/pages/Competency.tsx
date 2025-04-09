
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header, { filterEventBus } from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { solutionsArray } from "@/data/solutions";

// Sample competencies mapping
const competenciesData = {
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

type CompetencyDataType = typeof competenciesData[keyof typeof competenciesData];

const CompetencyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const competency = id ? competenciesData[id as keyof typeof competenciesData] : null;
  
  const [solutions, setSolutions] = useState(solutionsArray);
  const [filteredSolutions, setFilteredSolutions] = useState(solutionsArray);
  const [filters, setFilters] = useState({
    solutionTypes: [] as string[],
    modalities: [] as string[],
    durations: [] as string[],
    audiences: [] as string[],
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const relatedSolutions = solutionsArray.filter(solution => 
        solution.competencies.includes(id)
      );
      setSolutions(relatedSolutions);
      setFilteredSolutions(relatedSolutions);
    }
    
    const unsubscribe = filterEventBus.subscribe('filtersChanged', (newFilters: typeof filters) => {
      setFilters(newFilters);
    });
    
    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    const filtered = solutions.filter(solution => {
      const typeMatch = filters.solutionTypes.length === 0 || filters.solutionTypes.includes(solution.type);
      const modalityMatch = filters.modalities.length === 0 || filters.modalities.includes(solution.modality);
      
      return typeMatch && modalityMatch;
    });
    
    setFilteredSolutions(filtered);
  }, [filters, solutions]);

  if (!competency) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Competencia no encontrada</h2>
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalActiveFilters = 
    filters.solutionTypes.length + 
    filters.modalities.length + 
    filters.durations.length + 
    filters.audiences.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      
      <section className="pt-20 pb-12 px-6 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Link 
            to={`/dimension/${competency.dimensionId}`} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a {competency.dimensionTitle}
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4 animate-fade-in">
                {competency.title}
              </h1>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
                {competency.description}
              </p>
              
              <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${competency.color}20`, color: competency.color }}
                >
                  {competency.dimensionTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              Soluciones disponibles 
              <span className="ml-2 text-lg text-muted-foreground font-normal">
                ({filteredSolutions.length})
              </span>
            </h2>
          </div>
          
          {filteredSolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((solution, index) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/30 rounded-lg">
              <p className="text-lg mb-4">No se encontraron soluciones con los filtros aplicados.</p>
              <button
                onClick={() => {
                  const emptyFilters = {
                    solutionTypes: [],
                    modalities: [],
                    durations: [],
                    audiences: []
                  };
                  setFilters(emptyFilters);
                  filterEventBus.publish('filtersChanged', emptyFilters);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl overflow-hidden shadow-md">
            <div className="p-8 sm:p-12 text-white">
              <h2 className="text-3xl font-semibold mb-4">
                ¿Necesitas una solución personalizada?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl">
                Si no encuentras la solución que buscas, nuestro equipo puede diseñar
                un programa a medida para desarrollar la competencia de {competency.title} en tu organización.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/appointment" 
                  className="inline-block px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-opacity-90 transition-all-200"
                >
                  Agendar una cita
                </Link>
                <Link 
                  to="/request-solution" 
                  className="inline-block px-6 py-3 bg-transparent text-white rounded-lg font-medium border border-white/30 hover:bg-white/10 transition-all-200"
                >
                  Solicitar una solución
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

export default CompetencyPage;
