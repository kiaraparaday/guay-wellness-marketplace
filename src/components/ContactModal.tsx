
import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

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
      <DialogContent className="sm:max-w-lg bg-white border-0 shadow-lg rounded-2xl">
        <DialogHeader className="pb-8">
          <DialogTitle className="text-center text-xl font-bold font-quicksand text-[#202020] leading-relaxed">
            ¿Te gustaría compartirnos más información sobre lo que necesitas?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 px-2">
          {/* Opción 1: Sí, quiero compartir más información */}
          <Link
            to="/request-solution"
            onClick={onClose}
            className="block group"
          >
            <div className="p-6 bg-[#F6F6F6] border border-gray-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-quicksand text-[#202020] mb-2">
                    Sí, quiero compartir más información
                  </h3>
                  <p className="text-sm text-[#737373] font-quicksand">
                    Cuéntanos sobre tus necesidades específicas
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Opción 2: No, solo quiero agendar una cita */}
          <div 
            onClick={handleDirectAppointment}
            className="group cursor-pointer"
          >
            <div className="p-6 bg-[#F6F6F6] border border-gray-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-quicksand text-[#202020] mb-2">
                    No, solo quiero agendar una cita
                  </h3>
                  <p className="text-sm text-[#737373] font-quicksand">
                    Programa una reunión directamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
