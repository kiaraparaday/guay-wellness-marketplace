
import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ContactModal = ({ isOpen, onClose }) => {
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
        <DialogHeader className="pb-6">
          <DialogTitle className="text-center text-lg font-semibold font-quicksand text-[#202020] leading-relaxed">
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
            <div className="p-6 bg-[#F6F6F6] border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer">
              <div>
                <h3 className="text-base font-bold font-quicksand text-[#202020] mb-2">
                  Sí, quiero compartir más información
                </h3>
                <p className="text-sm text-[#737373] font-quicksand">
                  Cuéntanos sobre tus necesidades específicas.
                </p>
              </div>
            </div>
          </Link>

          {/* Opción 2: No, solo quiero agendar una cita */}
          <div 
            onClick={handleDirectAppointment}
            className="group cursor-pointer"
          >
            <div className="p-6 bg-[#F6F6F6] border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <div>
                <h3 className="text-base font-bold font-quicksand text-[#202020] mb-2">
                  No, solo quiero agendar una cita
                </h3>
                <p className="text-sm text-[#737373] font-quicksand">
                  Programa una reunión directamente.
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
