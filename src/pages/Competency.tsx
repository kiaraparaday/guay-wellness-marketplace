
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SolutionCard, { SolutionType } from "@/components/SolutionCard";
import { ArrowLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

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
};

type CompetencyDataType = typeof competenciesData[keyof typeof competenciesData];

// Sample solutions data
const solutionsData: SolutionType[] = [
  {
    id: "solution-1",
    title: "Taller de Gestión del Estrés y Carga Mental",
    type: "workshop",
    modality: "in-person",
    duration: "4 horas",
    audience: "Todos los colaboradores",
    description: "Aprende técnicas prácticas para identificar y manejar el estrés laboral y distribuir mejor las cargas cognitivas.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    competencies: ["mental-workload"],
  },
  {
    id: "solution-2",
    title: "Curso Online de Comunicación Efectiva",
    type: "course",
    modality: "virtual",
    duration: "6 semanas",
    audience: "Líderes",
    description: "Desarrolla habilidades para transmitir mensajes claros, escuchar activamente y gestionar conversaciones difíciles en entornos laborales.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    competencies: ["communication"],
  },
  {
    id: "solution-3",
    title: "Programa de Desarrollo de Capacidades de Liderazgo",
    type: "coaching",
    modality: "hybrid",
    duration: "3 meses",
    audience: "Gerentes y directivos",
    description: "Fortalece tus habilidades de liderazgo con un programa personalizado que combina sesiones individuales y grupales.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    competencies: ["capability-development"],
  },
  {
    id: "solution-4",
    title: "Webinar: Diversidad e Inclusión en el Trabajo",
    type: "webinar",
    modality: "virtual",
    duration: "90 minutos",
    audience: "Toda la organización",
    description: "Comprende la importancia de la diversidad en el lugar de trabajo y cómo crear un entorno inclusivo para todos.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    competencies: ["diversity"],
  },
  {
    id: "solution-5",
    title: "Evaluación de Factores Psicosociales",
    type: "assessment",
    modality: "virtual",
    duration: "2 semanas",
    audience: "Todos los colaboradores",
    description: "Diagnostica los factores de riesgo psicosocial en tu organización para desarrollar estrategias efectivas de prevención.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    competencies: ["mental-workload"],
  },
  {
    id: "solution-6",
    title: "Taller de Comunicación Asertiva",
    type: "workshop",
    modality: "in-person",
    duration: "8 horas",
    audience: "Todos los niveles",
    description: "Aprende a comunicarte con claridad y respeto, defendiendo tus ideas mientras respetas las de los demás.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    competencies: ["communication"],
  },
];

// Filter types
const filterOptions = {
  type: [
    { id: "workshop", label: "Taller" },
    { id: "course", label: "Curso" },
    { id: "webinar", label: "Webinar" },
    { id: "coaching", label: "Coaching" },
    { id: "assessment", label: "Evaluación" },
  ],
  modality: [
    { id: "in-person", label: "Presencial" },
    { id: "virtual", label: "Virtual" },
    { id: "hybrid", label: "Híbrido" },
  ],
};

const CompetencyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const competency = id ? competenciesData[id as keyof typeof competenciesData] : null;
  
  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [filters, setFilters] = useState({
    type: [] as string[],
    modality: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter solutions for this competency
    if (id) {
      const filtered = solutionsData.filter(solution => 
        solution.competencies.includes(id)
      );
      setSolutions(filtered);
    }
  }, [id]);

  const toggleFilter = (filterType: 'type' | 'modality', filterId: string) => {
    setFilters(prev => {
      const current = [...prev[filterType]];
      const index = current.indexOf(filterId);
      
      if (index === -1) {
        current.push(filterId);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [filterType]: current,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      modality: [],
    });
  };

  // Apply filters
  const filteredSolutions = solutions.filter(solution => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(solution.type);
    const modalityMatch = filters.modality.length === 0 || filters.modality.includes(solution.modality);
    return typeMatch && modalityMatch;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-6 bg-white border-b border-border">
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
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all-200",
                    showFilters 
                      ? "bg-primary text-white"
                      : "bg-secondary hover:bg-secondary/70"
                  )}
                >
                  <Filter className="w-3.5 h-3.5 mr-1.5" />
                  Filtros
                  {(filters.type.length > 0 || filters.modality.length > 0) && (
                    <span className="ml-1.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {filters.type.length + filters.modality.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters Section (Collapsible) */}
      <div 
        className={cn(
          "bg-white border-b border-border transition-all duration-300 overflow-hidden",
          showFilters ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Tipo de solución</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.type.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter('type', option.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-all-200",
                      filters.type.includes(option.id)
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/70"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Modalidad</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.modality.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter('modality', option.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-all-200",
                      filters.modality.includes(option.id)
                        ? "bg-primary text-white"
                        : "bg-secondary hover:bg-secondary/70"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-muted-foreground hover:text-primary transition-all-200"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Solutions Section */}
      <section className="py-12 px-6">
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
                onClick={clearFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-200"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
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

export default CompetencyPage;
