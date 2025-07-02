
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail,
  Building,
  MessageSquare,
  CheckCircle,
  Target
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { solutionsData } from "@/data/solutions";
import { 
  getAvailableDates, 
  getTimeSlots, 
  isDateAvailable,
  getFirstAvailableDate,
  formatAppointmentDate
} from "@/services/appointmentService";
import { saveAppointment } from "@/services/firebaseService";

const RequestSolution: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const solution = solutionId ? solutionsData[solutionId] : null;

  // Form state
  const [formData, setFormData] = useState({
    name: userData?.nombre || currentUser?.displayName || "",
    email: currentUser?.email || "",
    company: userData?.empresa || "",
    message: "",
    motivation: "",
  });

  // Date and time state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<{time: string, available: boolean}[]>([]);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set first available date by default
    const firstAvailable = getFirstAvailableDate();
    if (firstAvailable) {
      setSelectedDate(firstAvailable);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const slots = getTimeSlots(selectedDate);
      setAvailableSlots(slots);
      setSelectedTime(""); // Reset time selection when date changes
    }
  }, [selectedDate]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Solución no encontrada</h2>
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    if (!selectedDate || !selectedTime) {
      toast.error("Por favor selecciona una fecha y hora para la cita");
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentData = {
        ...formData,
        date: selectedDate!,
        time: selectedTime,
        solutionId: solutionId!,
        solutionTitle: solution.title,
      };

      const result = await saveAppointment(appointmentData);
      
      if (result.success) {
        setShowConfirmation(true);
      } else {
        throw new Error("Error al guardar la cita");
      }

    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Error al enviar la solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableTimeSlots = () => {
    return availableSlots.filter(slot => slot.available);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
        <Header />
        <div className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-semibold mb-4">¡Listo! Tu cita fue agendada</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Tu cita fue agendada para el {selectedDate && selectedTime && formatAppointmentDate(selectedDate, selectedTime)}. Pronto nos pondremos en contacto contigo para confirmar los detalles.
            </p>
            <div className="bg-white p-6 rounded-xl border border-border shadow-subtle mb-8">
              <p className="font-medium text-lg mb-2">{solution.title}</p>
              {selectedDate && selectedTime && (
                <p className="text-muted-foreground">
                  {formatAppointmentDate(selectedDate, selectedTime)}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/")}
                variant="guay-primary"
                size="lg"
              >
                Volver al inicio
              </Button>
              <Button 
                onClick={() => navigate(`/solution/${solutionId}`)}
                variant="outline"
                size="lg"
              >
                Ver solución
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      
      <div className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link 
              to={`/solution/${solutionId}`}
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-3 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver a la solución
            </Link>
            
            <h1 className="text-2xl font-semibold mb-2">
              Solicita información personalizada
            </h1>
            <p className="text-muted-foreground">
              Agenda una llamada para conocer cómo esta solución puede adaptarse a tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Solution Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-xl border border-border shadow-subtle sticky top-6">
                <h2 className="text-lg font-medium mb-3">Solución seleccionada</h2>
                <div className="flex items-start gap-3">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-2 line-clamp-2">{solution.title}</h3>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {solution.duration}
                      </p>
                      <p className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {solution.audience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-border shadow-subtle">
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Información de contacto</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="flex items-center text-sm font-medium mb-2">
                          <User className="w-4 h-4 mr-2" />
                          Nombre <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="flex items-center text-sm font-medium mb-2">
                          <Mail className="w-4 h-4 mr-2" />
                          Correo electrónico <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="company" className="flex items-center text-sm font-medium mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        Empresa
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Agenda la llamada</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center text-sm font-medium mb-2">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Fecha <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                format(selectedDate, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona fecha</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => 
                                date < new Date() || !isDateAvailable(date)
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="flex items-center text-sm font-medium mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          Hora <span className="text-red-500">*</span>
                        </Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona hora" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTimeSlots().map((slot) => (
                              <SelectItem key={slot.time} value={slot.time}>
                                {slot.time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="motivation" className="flex items-center text-sm font-medium mb-2">
                          <Target className="w-4 h-4 mr-2" />
                          ¿Qué te motivó a interesarte en este taller?
                        </Label>
                        <Textarea
                          id="motivation"
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          placeholder="Comparte qué te llevó a considerar este taller..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="flex items-center text-sm font-medium mb-2">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mensaje adicional
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="¿Qué te gustaría lograr con este taller? ¿Hay algo que debamos saber antes de la llamada?"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t mt-6">
                  <Button
                    type="submit"
                    variant="guay-primary"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      "Enviar solicitud"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSolution;
