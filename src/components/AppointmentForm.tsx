
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { 
  getAvailableDates, 
  getTimeSlots, 
  getFirstAvailableDate,
  formatAppointmentDate
} from "@/services/appointmentService";
import { saveAppointment } from "@/services/firebaseService";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<{ time: string, available: boolean }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const firstAvailableDate = getFirstAvailableDate();
    if (firstAvailableDate) {
      setDate(firstAvailableDate);
    }
  }, []);
  
  useEffect(() => {
    if (date) {
      const slots = getTimeSlots(date);
      setTimeSlots(slots);
      setSelectedTime(null);
    }
  }, [date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !date || !selectedTime) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointmentDate = formatAppointmentDate(date, selectedTime);
      
      const result = await saveAppointment({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message || undefined,
        date: date,
        time: selectedTime
      });
      
      if (result.success) {
        toast.success(`Su cita ha sido agendada exitosamente para el ${appointmentDate}`);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        setSelectedTime(null);
      } else {
        toast.error("Ha ocurrido un error al agendar su cita. Por favor intente nuevamente.");
        console.error("Error al guardar la cita:", result.error);
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al agendar su cita. Por favor intente nuevamente.");
      console.error("Error al procesar la cita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = (date: Date) => {
    const availableDates = getAvailableDates();
    return !availableDates.some(availableDate => 
      isSameDay(availableDate, date) && getTimeSlots(availableDate).some(slot => slot.available)
    );
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-subtle border border-border">
      <h2 className="text-2xl font-semibold mb-6 text-center text-guay-dark">Agende una cita con nosotros</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nombre completo <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Correo electrónico <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-foreground">
            Nombre de la empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground mb-2">
            Seleccione una fecha y hora <span className="text-primary">*</span>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-primary/5 p-3 border-b border-border">
                <div className="flex items-center space-x-2 text-primary font-medium">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Seleccione una fecha</span>
                </div>
              </div>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate as any}
                  disabled={disabledDays}
                  locale={es}
                  className="rounded-md border border-border overflow-hidden"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-primary/5 p-3 border-b border-border">
                <div className="flex items-center space-x-2">
                  {date ? (
                    <div className="flex items-center text-primary font-medium">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      <span>
                        {format(date, "EEEE, d 'de' MMMM", { locale: es })}
                      </span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <span>Seleccione una fecha para ver horarios</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 h-[290px] overflow-y-auto">
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={cn(
                          "relative flex items-center justify-center p-3 rounded-md border transition-colors",
                          slot.available 
                            ? selectedTime === slot.time
                              ? "bg-primary/10 text-primary border-primary/50 ring-1 ring-primary/20"
                              : "bg-white hover:bg-muted/30"
                            : "bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{slot.time}</span>
                        {selectedTime === slot.time && (
                          <CheckCircle className="absolute right-2 h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : date ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-sm p-4 text-center">
                      No hay horarios disponibles para esta fecha. <br />
                      Por favor seleccione otra fecha.
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground text-sm p-4 text-center">
                      Seleccione una fecha para ver <br />
                      los horarios disponibles.
                    </p>
                  </div>
                )}
              </div>
              
              {selectedTime && date && (
                <div className="p-3 border-t border-border bg-primary/5">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Cita seleccionada:</p>
                      <p className="text-sm text-muted-foreground">
                        {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })} a las {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Mensaje (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
            placeholder="Cuéntenos sobre sus necesidades específicas..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-3 bg-primary text-white rounded-lg font-medium transition-all-200 shadow-sm hover:shadow flex items-center justify-center",
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CalendarIcon className="mr-2 h-5 w-5" />
              Agendar cita
            </>
          )}
        </button>
        
        <p className="text-xs text-muted-foreground text-center">
          Nos pondremos en contacto con usted para confirmar su cita.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
