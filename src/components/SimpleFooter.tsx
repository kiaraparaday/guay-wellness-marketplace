
import React from "react";
import { Link } from "react-router-dom";

const SimpleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 bg-[#131f36] relative overflow-hidden">
      {/* Decorative circles */}
      {/* Top left corner circles */}
      <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-guay-purple opacity-80 blur-sm"></div>
      <div className="absolute top-4 left-8 w-14 h-14 rounded-full bg-guay-blue opacity-70"></div>
      <div className="absolute top-16 left-20 w-8 h-8 rounded-full bg-guay-green opacity-80"></div>
      <div className="absolute top-28 left-10 w-5 h-5 rounded-full bg-guay-orange opacity-90"></div>
      
      {/* Bottom right corner circles */}
      <div className="absolute -bottom-24 -right-20 w-48 h-48 rounded-full bg-guay-orange opacity-80 blur-sm"></div>
      <div className="absolute bottom-10 right-8 w-16 h-16 rounded-full bg-guay-purple opacity-70"></div>
      <div className="absolute bottom-4 right-32 w-10 h-10 rounded-full bg-guay-blue opacity-80"></div>
      <div className="absolute bottom-20 right-16 w-6 h-6 rounded-full bg-guay-green opacity-90"></div>
      <div className="absolute bottom-28 right-28 w-4 h-4 rounded-full bg-guay-purple opacity-70"></div>
      
      {/* Middle left circles */}
      <div className="absolute top-1/2 -left-10 w-20 h-20 rounded-full bg-guay-green opacity-60 blur-sm"></div>
      <div className="absolute top-1/3 -left-4 w-8 h-8 rounded-full bg-guay-blue opacity-50"></div>
      
      {/* Middle right circles */}
      <div className="absolute top-1/3 -right-8 w-16 h-16 rounded-full bg-guay-purple opacity-60 blur-sm"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold bg-clip-text text-white">
                GUAY
              </span>
              <span className="ml-2 text-sm text-white/80">
                Wellness Marketplace
              </span>
            </div>
            <p className="body-copy text-white/70 mb-4">
              Soluciones de bienestar personalizadas para organizaciones que buscan potenciar el desarrollo humano.
            </p>
          </div>
          
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-[16px] font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="body-copy text-white/70 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/solutions" className="body-copy text-white/70 hover:text-white transition-colors">Soluciones</Link></li>
              <li><Link to="/testimonials" className="body-copy text-white/70 hover:text-white transition-colors">Testimonios</Link></li>
            </ul>
          </div>
          
          {/* Servicios */}
          <div>
            <h3 className="text-[16px] font-bold mb-4 text-white">Servicios</h3>
            <ul className="space-y-2">
              <li><Link to="/appointment" className="body-copy text-white/70 hover:text-white transition-colors">Agendar Cita</Link></li>
              <li><Link to="/request-solution" className="body-copy text-white/70 hover:text-white transition-colors">Solicitar Solución</Link></li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-[16px] font-bold mb-4 text-white">Contacto</h3>
            <p className="body-copy text-white/70">info@guay.mx</p>
            <p className="body-copy text-white/70">+52 55 1234 5678</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="small-copy text-white/60 mb-2 md:mb-0">
            © {currentYear} Guay. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="small-copy text-white/60 hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="/terms" className="small-copy text-white/60 hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
