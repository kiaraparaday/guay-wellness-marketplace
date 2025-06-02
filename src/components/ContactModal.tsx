
import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Calendar, Check, X } from "lucide-react";

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
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-center text-xl font-bold font-quicksand text-gray-800 leading-relaxed">
            <span className="text-2xl mr-2 drop-shadow-sm">💬</span>
            ¿Te gustaría compartirnos más información sobre lo que necesitas?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 px-2">
          {/* Opción 1: Sí, quiero compartir más información */}
          <Link
            to="/request-solution"
            onClick={onClose}
            className="block group"
          >
            <div className="relative p-6 bg-gradient-to-r from-purple-50 to-lavender-50 border-2 border-purple-100 rounded-2xl hover:border-[#A2C73F] hover:shadow-lg hover:shadow-green-100/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A2C73F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Check className="w-6 h-6 text-[#A2C73F] group-hover:animate-pulse" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-quicksand text-gray-900 group-hover:text-[#A2C73F] transition-colors duration-300 mb-2">
                    ✅ Sí, quiero compartir más información
                  </h3>
                  <p className="text-sm text-purple-700 font-quicksand font-medium">
                    🟣 Cuéntanos sobre tus necesidades específicas
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
            <div className="relative p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-2xl hover:border-[#131F36] hover:shadow-lg hover:shadow-gray-200/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#131F36]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:shadow-md group-hover:scale-110 transition-all duration-300 relative">
                    <Calendar className="w-5 h-5 text-[#131F36] group-hover:animate-pulse" />
                    <X className="w-3 h-3 text-red-500 absolute -top-1 -right-1 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-quicksand text-gray-900 group-hover:text-[#131F36] transition-colors duration-300 mb-2">
                    ❌ No, solo quiero agendar una cita
                  </h3>
                  <p className="text-sm text-gray-600 font-quicksand font-medium">
                    📅 Programa una reunión directamente
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
