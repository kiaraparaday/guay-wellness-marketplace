
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Users, Building, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Extended testimonials data
const testimonials = [
  {
    id: 1,
    quote: "Implementar el programa de mindfulness corporativo transformó la cultura de nuestro equipo. Notamos una mejora del 30% en productividad y satisfacción laboral.",
    author: "María Rodríguez",
    position: "Directora de Recursos Humanos",
    company: "TechSolutions S.A.",
    industry: "Tecnología",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    quote: "La formación en liderazgo consciente nos permitió desarrollar directivos más empáticos y efectivos. El resultado fue inmediato en la retención de talento.",
    author: "Carlos Mendoza",
    position: "CEO",
    company: "Innogreen",
    industry: "Energías Renovables",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    quote: "El taller de construcción de equipos diversos fue una inversión excelente. Logramos crear un ambiente donde todas las voces son escuchadas y valoradas.",
    author: "Ana Gómez",
    position: "Directora de Operaciones",
    company: "GlobalHealth",
    industry: "Salud",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    quote: "Desde que implementamos las estrategias de gestión del estrés, hemos visto una reducción del 40% en las ausencias laborales y un aumento notable en la satisfacción del equipo.",
    author: "Javier López",
    position: "Director de Talento",
    company: "Finanzas Globales",
    industry: "Sector Financiero",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    quote: "La consultoría en cultura organizacional que recibimos transformó nuestra empresa. Ahora tenemos valores claros y compartidos que guían todas nuestras decisiones.",
    author: "Laura Torres",
    position: "Fundadora",
    company: "Creativa Studio",
    industry: "Diseño y Publicidad",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    quote: "Las sesiones de coaching en bienestar ejecutivo mejoraron significativamente el desempeño de nuestro equipo directivo, creando un efecto cascada positivo en toda la organización.",
    author: "Sergio Martínez",
    position: "Director General",
    company: "Construye+",
    industry: "Construcción",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
  },
];

const TestimonialsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-guay-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver al inicio
            </Link>
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
                Testimonios y Casos de Éxito
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Descubre cómo nuestras soluciones han transformado organizaciones y mejorado el bienestar laboral de equipos diversos en diferentes industrias.
            </p>
          </div>
          
          {/* Featured Testimonial */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-guay-blue/10 relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-guay-purple/5 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                    alt="Equipo de trabajo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="mb-4 text-guay-blue">
                    <Quote className="w-12 h-12 opacity-50" />
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium mb-6 italic text-gray-700">
                    "Implementar un programa integral de bienestar organizacional fue la mejor decisión que tomamos. No solo mejoró la satisfacción de nuestros empleados, sino que también vimos un incremento del 25% en la productividad y una reducción significativa en la rotación de personal."
                  </blockquote>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900">Elena Sánchez</h3>
                    <p className="text-guay-purple font-medium">Directora de Personas</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      MultiTech Internacional
                      <span className="mx-3">•</span>
                      <Users className="w-4 h-4 mr-2" />
                      Tecnología y Servicios
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all-200 hover:border-guay-blue/30">
                <CardContent className="p-6">
                  <div className="mb-4 text-guay-blue">
                    <Quote className="w-8 h-8 opacity-70" />
                  </div>
                  <p className="mb-6 italic text-gray-700">{testimonial.quote}</p>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Building className="w-3 h-3 mr-1" />
                        {testimonial.company}
                        <span className="mx-1.5">•</span>
                        <Users className="w-3 h-3 mr-1" />
                        {testimonial.industry}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">¿Quieres ser nuestro próximo caso de éxito?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Descubre cómo nuestras soluciones de bienestar pueden transformar tu organización y mejorar la experiencia de tus equipos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/appointment" 
                className="px-6 py-3 bg-guay-blue text-white rounded-lg font-medium hover:bg-guay-blue/90 transition-all-200"
              >
                Agendar una consulta
              </Link>
              <Link 
                to="/request-solution" 
                className="px-6 py-3 bg-white text-foreground rounded-lg font-medium border border-border hover:border-guay-blue/20 transition-all-200"
              >
                Solicitar una propuesta
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

export default TestimonialsPage;
