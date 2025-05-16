
import React from "react";
import { Link } from "react-router-dom";

const SimpleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
                GUAY
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                Wellness Marketplace
              </span>
            </div>
            <p className="body-copy text-muted-foreground mb-4">
              Soluciones de bienestar personalizadas para organizaciones que buscan potenciar el desarrollo humano.
            </p>
          </div>
          
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-[16px] font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="body-copy text-muted-foreground hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/solutions" className="body-copy text-muted-foreground hover:text-primary transition-colors">Soluciones</Link></li>
              <li><Link to="/testimonials" className="body-copy text-muted-foreground hover:text-primary transition-colors">Testimonios</Link></li>
            </ul>
          </div>
          
          {/* Servicios */}
          <div>
            <h3 className="text-[16px] font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link to="/appointment" className="body-copy text-muted-foreground hover:text-primary transition-colors">Agendar Cita</Link></li>
              <li><Link to="/request-solution" className="body-copy text-muted-foreground hover:text-primary transition-colors">Solicitar Solución</Link></li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-[16px] font-bold mb-4">Contacto</h3>
            <p className="body-copy text-muted-foreground">info@guay.mx</p>
            <p className="body-copy text-muted-foreground">+52 55 1234 5678</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="small-copy text-muted-foreground mb-2 md:mb-0">
            © {currentYear} Guay. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="small-copy text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link to="/terms" className="small-copy text-muted-foreground hover:text-primary transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
