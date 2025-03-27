
import React from "react";
import Header from "@/components/Header";
import DimensionCard, { DimensionType } from "@/components/DimensionCard";
import { Link } from "react-router-dom";

const dimensions: DimensionType[] = [
  {
    id: "psychosocial",
    title: "Factores Psicosociales",
    description: "Aborda los elementos que afectan el bienestar mental y emocional de los colaboradores, como la gestión de cargas mentales, autonomía laboral y equilibrio vida-trabajo.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
    color: "rgba(79, 70, 229, 0.8)",
  },
  {
    id: "climate",
    title: "Clima Laboral",
    description: "Mejora el ambiente de trabajo enfocándose en la comunicación, motivación, equidad e integración entre los miembros del equipo.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    color: "rgba(245, 158, 11, 0.8)",
  },
  {
    id: "culture",
    title: "Cultura Organizacional",
    description: "Fortalece los valores y comportamientos compartidos en la organización, desarrollando capacidades, coordinación e integración, y aprendizaje organizacional.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    color: "rgba(16, 185, 129, 0.8)",
  },
  {
    id: "dei",
    title: "Diversidad, Equidad e Inclusión",
    description: "Promueve un entorno laboral donde todas las personas son valoradas y respetadas, independientemente de sus diferencias, creando espacios seguros y equitativos.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    color: "rgba(236, 72, 153, 0.8)",
  },
];

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            Marketplace de Bienestar Organizacional
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
            Soluciones para el bienestar <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
              de tu organización
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Encuentra las herramientas que necesitas para mejorar el bienestar organizacional
            a través de diagnósticos específicos y soluciones adaptadas a tus necesidades.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Link 
              to="/appointment" 
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:shadow-md hover:bg-primary/90 transition-all-200"
            >
              Agendar una cita
            </Link>
            <a 
              href="#dimensions" 
              className="px-6 py-3 bg-white text-foreground rounded-full font-medium border border-border hover:border-primary/20 hover:bg-primary/5 transition-all-200"
            >
              Explorar soluciones
            </a>
          </div>
        </div>
      </section>
      
      {/* Dimensions Section */}
      <section id="dimensions" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-6 bg-accent text-primary rounded-full text-sm font-medium">
              Dimensiones
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Explora por dimensiones de bienestar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Selecciona una dimensión para conocer las competencias específicas 
              y las soluciones disponibles para mejorar el bienestar en tu organización.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dimensions.map((dimension, index) => (
              <DimensionCard 
                key={dimension.id} 
                dimension={dimension} 
                index={index}
              />
            ))}
          </div>
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
