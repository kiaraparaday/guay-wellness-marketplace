
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CallToActionSectionProps {
  competencyTitle: string;
  showControls?: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ 
  competencyTitle, 
  showControls = false
}) => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl overflow-hidden shadow-md">
          <div className="p-8 sm:p-12 text-white">
            <h2 className="text-[40px] font-bold mb-4 leading-tight">
              ¿Necesitas una solución personalizada?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl body-copy">
              Si no encuentras la solución que buscas, nuestro equipo puede diseñar
              un programa a medida para desarrollar la competencia de {competencyTitle} en tu organización.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="grande" 
                variant="white"
              >
                <Link to="/appointment">Agendar una cita</Link>
              </Button>
              <Button 
                asChild 
                size="grande" 
                variant="light"
              >
                <Link to="/request-solution">Solicitar una solución</Link>
              </Button>
            </div>
            
            {showControls && (
              <div className="mt-6 flex items-center space-x-2 p-2 bg-white/10 rounded-lg inline-block">
                <Switch id="newsletter" />
                <Label htmlFor="newsletter" className="text-white">Suscribirme al newsletter</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
