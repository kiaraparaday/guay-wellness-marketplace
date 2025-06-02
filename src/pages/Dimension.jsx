import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import FilterBar from "@/components/FilterBar";
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

// Competencies grouped by dimension with their related solutions
const competenciesByDimension = {
  "psychosocial": ["mental-workload", "work-autonomy", "work-life-balance", "stress-management"],
  "climate": ["communication", "motivation", "equity", "integration"],
  "culture": ["capability-development", "coordination-integration", "organizational-learning", "values"],
  "dei": ["diversity", "equity-inclusion", "accessibility", "belonging"],
};

const DimensionPage = () => {
  const { id } = useParams();
  const dimension = id ? dimensions[id] : null;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    solutionTypes: [],
    modalities: [],
    durations: [],
    audiences: [],
    competencies: [],
    benefits: [],
    categories: [],
  });
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (dimension) {
      // Get all solutions for this dimension
      const dimensionCompetencies = competenciesByDimension[dimension.id] || [];
      const dimensionSolutions = solutionsArray.filter(solution => 
        solution.competencies.some(comp => dimensionCompetencies.includes(comp))
      );
      
      // Apply filters
      const filtered = dimensionSolutions.filter(solution => {
        const typeMatch = filters.solutionTypes.length === 0 || filters.solutionTypes.includes(solution.type);
        const modalityMatch = filters.modalities.length === 0 || filters.modalities.includes(solution.modality);
        const competencyMatch = filters.competencies.length === 0 || 
          filters.competencies.some(comp => solution.competencies.includes(comp));
        const categoryMatch = filters.categories.length === 0 || 
          filters.categories.some(category => solution.competencies.includes(category));
        
        return typeMatch && modalityMatch && competencyMatch && categoryMatch;
      });
      
      setFilteredSolutions(filtered);
    }
  }, [dimension, filters]);

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
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <div className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filtrar soluciones</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isFilterOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>
          {isFilterOpen && (
            <FilterBar 
              onClose={() => setIsFilterOpen(false)}
              initialFilters={filters}
              onApplyFilters={setFilters}
            />
          )}
        </div>
      </div>
      
      {/* Solutions Section */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 font-quicksand text-gray-800">
              Soluciones para {dimension.title}
              <span className="ml-2 text-lg text-muted-foreground font-normal">
                ({filteredSolutions.length})
              </span>
            </h2>
          </div>
          
          {filteredSolutions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((solution, solutionIndex) => (
                <SolutionCard 
                  key={solution.id} 
                  solution={solution} 
                  index={solutionIndex}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/30 rounded-lg">
              <p className="text-lg mb-4 font-quicksand">No se encontraron soluciones con los filtros aplicados.</p>
              <button
                onClick={() => setFilters({
                  solutionTypes: [],
                  modalities: [],
                  durations: [],
                  audiences: [],
                  competencies: [],
                  benefits: [],
                  categories: [],
                })}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-quicksand"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
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
