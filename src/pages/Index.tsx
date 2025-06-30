import React, { useState } from "react";
import Header from "@/components/Header";
import DimensionCard, { DimensionType } from "@/components/DimensionCard";
import SolutionCard from "@/components/SolutionCard";
import GuayLogo from "@/components/GuayLogo";
import SolutionNavigationTabs from "@/components/SolutionNavigationTabs";
import SolutionsSection from "@/components/SolutionsSection";
import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSolutions } from "@/hooks/useSolutions";

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

const IndexPage: React.FC = () => {
  const { solutions: allSolutions, loading, error, isUsingFallback, refetch } = useSolutions();
  const [activeTab, setActiveTab] = useState<'dimensions' | 'catalog'>('dimensions');
  const [filters, setFilters] = useState({
    solutionTypes: [] as string[],
    modalities: [] as string[],
    durations: [] as string[],
    audiences: [] as string[],
    benefits: [] as string[],
  });
  
  // Display first 4 solutions
  const displaySolutions = allSolutions.slice(0, 4);

  const handleRetryLoad = () => {
    refetch();
  };

  const handleTabChange = (tab: 'dimensions' | 'catalog') => {
    setActiveTab(tab);
    // Scroll to the solutions section
    const solutionsElement = document.getElementById('soluciones');
    if (solutionsElement) {
      solutionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    window.open(
      'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      {/* Hero Section with new structure */}
      <section className="pt-8 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center md:text-left md:items-start mb-6">
            <div className="mb-2 text-sm font-medium text-[#91AFC7] animate-fade-in">
              Marketplace de Bienestar Organizacional
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
              Soluciones de <br className="hidden md:block" />
              <span className="text-black">
                bienestar organizacional
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl animate-fade-in" style={{ animationDelay: "200ms" }}>
              Selecciona una dimensión del bienestar según las necesidades de tu organización o explora el catálogo completo de soluciones.
            </p>
            
            {/* Solo mostrar errores si ocurren */}
            {error && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  {isUsingFallback ? 
                    "Mostrando datos locales - Firebase no disponible" : 
                    `Error de Firebase: ${error}`
                  }
                </p>
                <Button onClick={handleRetryLoad} variant="outline" size="sm" className="mt-2 flex items-center gap-2">
                  <RefreshCw className="h-3 w-3" />
                  Reintentar Firebase
                </Button>
              </div>
            )}
          </div>
          
          {/* SOLUTION NAVIGATION TABS */}
          <SolutionNavigationTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          
          {/* DIMENSIONS SECTION - Show when dimensions tab is active */}
          {activeTab === 'dimensions' && (
            <div id="dimensiones" className="bg-white rounded-2xl p-6 shadow-lg mb-12 border border-gray-blue/10">
              {/* Subtítulo de agrupación por dimensiones */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#6A6A6A] font-quicksand">
                  Dimensiones del bienestar organizacional
                </h2>
                <p className="text-[#6A6A6A] text-sm">
                  Descubre nuestras soluciones agrupadas por dimensión clave del bienestar, para responder a las distintas necesidades de tu equipo.
                </p>
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
            </div>
          )}

          {/* CATALOG SECTION - Show when catalog tab is active */}
          {activeTab === 'catalog' && (
            <div id="soluciones">
              <SolutionsSection 
                filteredSolutions={allSolutions}
                setFilters={setFilters}
              />
            </div>
          )}
          
          {/* Top Solutions Section */}
          <section id="destacadas" className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-quicksand font-semibold mb-2 text-black">
                  SOLUCIONES
                </h2>
                
                <p className="text-muted-foreground max-w-xl mt-2">
                  Seleccionadas por su alto impacto, relevancia y resultados comprobados en bienestar organizacional.
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-quicksand">Conectando con Firebase...</p>
              </div>
            ) : displaySolutions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displaySolutions.map((solution, index) => (
                  <SolutionCard 
                    key={solution.id}
                    solution={solution}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-yellow-50 rounded-lg">
                <p className="text-lg font-quicksand mb-4">No hay soluciones disponibles</p>
                <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
                  <RefreshCw className="h-4 w-4" />
                  Reintentar conexión
                </Button>
              </div>
            )}
          </section>
      
          {/* CTA Section - Updated with direct redirection */}
          <section id="contacto" className="py-20 px-6 bg-gradient-to-b from-white to-primary/5">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-4">
                      ¿No encuentras lo que estás buscando?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Nuestro equipo de expertos puede ayudarte a diseñar una solución personalizada según tus necesidades organizacionales.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                      <Button 
                        onClick={handleContactClick}
                        size="grande" 
                        variant="guay-cta-primary"
                        className="font-quicksand"
                      >
                        Contáctanos
                      </Button>
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
                <GuayLogo showText={true} className="h-6" />
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} guay. Todos los derechos reservados.
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
