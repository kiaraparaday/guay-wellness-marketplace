
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
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
  
  // Set initial date to first available date
  useEffect(() => {
    const firstAvailableDate = getFirstAvailableDate();
    if (firstAvailableDate) {
      setDate(firstAvailableDate);
    }
  }, []);
  
  // Update time slots when date changes
  useEffect(() => {
    if (date) {
      const slots = getTimeSlots(date);
      setTimeSlots(slots);
      setSelectedTime(null); // Clear selected time when date changes
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !date || !selectedTime) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    
    // Format appointment information for confirmation message
    const appointmentDate = formatAppointmentDate(date, selectedTime);
    
    // In a real app, you would send this data to your backend
    console.log("Form data:", {
      ...formData,
      date: format(date, "yyyy-MM-dd"),
      time: selectedTime
    });
    
    // Confirm submission
    toast.success(`Su cita ha sido agendada exitosamente para el ${appointmentDate}`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setSelectedTime(null);
    
    // Don't reset date to allow booking another slot easily
  };

  // Function to determine if a day should be disabled
  const disabledDays = (date: Date) => {
    // Get all available dates
    const availableDates = getAvailableDates();
    
    // Check if the current date is in the list of available dates and has at least one available slot
    return !availableDates.some(availableDate => 
      isSameDay(availableDate, date) && getTimeSlots(availableDate).some(slot => slot.available)
    );
  };
  
  // Helper function to check if date is same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-subtle border border-border">
      <h2 className="text-2xl font-medium mb-6">Agende una cita con nosotros</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nombre completo *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Correo electrónico *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
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
            className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Seleccione una fecha y hora *
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-card rounded-lg border border-border p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate as any}
                disabled={disabledDays}
                locale={es}
                className="rounded-md border"
              />
            </div>
            
            {/* Time slots */}
            <div>
              <div className="mb-2 flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                  {date ? format(date, "EEEE, d 'de' MMMM", { locale: es }) : "Seleccione una fecha"}
                </span>
              </div>
              
              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto p-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={cn(
                        "flex items-center justify-center py-2 px-3 rounded-md border text-sm transition-colors",
                        slot.available 
                          ? selectedTime === slot.time
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background hover:bg-muted"
                          : "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : date ? (
                <p className="text-muted-foreground text-sm p-4 text-center">
                  No hay horarios disponibles para esta fecha. Por favor seleccione otra fecha.
                </p>
              ) : (
                <p className="text-muted-foreground text-sm p-4 text-center">
                  Seleccione una fecha para ver los horarios disponibles.
                </p>
              )}
              
              {selectedTime && date && (
                <div className="mt-4 p-3 bg-muted/30 rounded-md border border-border">
                  <p className="text-sm font-medium">Cita seleccionada:</p>
                  <p className="text-sm text-muted-foreground">
                    {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })} a las {selectedTime}
                  </p>
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
            className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
            placeholder="Cuéntenos sobre sus necesidades específicas..."
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all-200"
        >
          Agendar cita
        </button>
        
        <p className="text-xs text-muted-foreground text-center">
          Nos pondremos en contacto con usted para confirmar su cita.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
