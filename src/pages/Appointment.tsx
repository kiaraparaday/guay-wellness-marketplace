
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AppointmentForm from "@/components/AppointmentForm";
import { ArrowLeft } from "lucide-react";

const AppointmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
          
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-semibold mb-4">Agenda una cita con Guay</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro equipo de expertos en bienestar organizacional está listo para ayudarte 
              a encontrar las soluciones ideales para tu organización.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <AppointmentForm />
            </div>
            
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="bg-white p-6 rounded-xl shadow-subtle border border-border sticky top-24">
                <h2 className="text-xl font-semibold mb-4">¿Qué esperar de esta cita?</h2>
                
                <ul className="space-y-4 mb-6">
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="block text-foreground">Evaluación de necesidades</strong>
                      <span className="text-sm text-muted-foreground">Analizaremos juntos los resultados de tus diagnósticos y las áreas prioritarias a abordar.</span>
                    </span>
                  </li>
                  
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="block text-foreground">Soluciones personalizadas</strong>
                      <span className="text-sm text-muted-foreground">Te presentaremos opciones adaptadas a tus objetivos, presupuesto y contexto organizacional.</span>
                    </span>
                  </li>
                  
                  <li className="flex">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="block text-foreground">Plan de acción</strong>
                      <span className="text-sm text-muted-foreground">Definiremos juntos los próximos pasos y un cronograma para implementar las soluciones seleccionadas.</span>
                    </span>
                  </li>
                </ul>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm mb-2">
                    <strong>Esta cita no tiene costo ni compromiso.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Nuestro objetivo es entender tus necesidades y ofrecerte las mejores soluciones para mejorar el bienestar en tu organización.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-border mt-8">
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

export default AppointmentPage;
