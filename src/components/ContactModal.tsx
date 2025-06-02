
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const handleDirectAppointment = () => {
    window.open(
      'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
      '_blank',
      'noopener,noreferrer'
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold font-quicksand mb-4">
            💬 ¿Deseas compartirnos más información sobre lo que estás buscando?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <Link
            to="/request-solution"
            onClick={onClose}
            className="block"
          >
            <div className="p-4 border border-gray-200 rounded-xl hover:border-[#A2C73F] hover:bg-[#A2C73F]/5 transition-all cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#A2C73F]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium font-quicksand text-gray-900 group-hover:text-[#A2C73F] transition-colors">
                    Sí, quiero compartir más información
                  </h3>
                  <p className="text-sm text-gray-600 font-quicksand">
                    Cuéntanos sobre tus necesidades específicas
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div 
            onClick={handleDirectAppointment}
            className="p-4 border border-gray-200 rounded-xl hover:border-[#131F36] hover:bg-[#131F36]/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#131F36]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium font-quicksand text-gray-900 group-hover:text-[#131F36] transition-colors">
                  No, ir directo a agendar cita
                </h3>
                <p className="text-sm text-gray-600 font-quicksand">
                  Programa una reunión directamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
