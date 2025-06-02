
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

const RequestSolutionPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    solutionType: "",
    needs: "",
    audienceSize: "",
    timeframe: "",
    budget: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (simple validation for demo)
    if (!formData.name || !formData.email || !formData.needs) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log("Form data:", formData);
    
    // Simulate sending email to contacto@guaywellness.com
    console.log("Sending form data to: contacto@guaywellness.com");
    
    // Confirm submission
    toast.success("Su solicitud ha sido enviada. Redirigiendo al calendario...");
    
    // Redirect to Google Calendar after a short delay
    setTimeout(() => {
      window.open(
        'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true',
        '_blank',
        'noopener,noreferrer'
      );
    }, 1500);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      position: "",
      solutionType: "",
      needs: "",
      audienceSize: "",
      timeframe: "",
      budget: "",
      additionalInfo: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
          
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-semibold mb-4 font-quicksand">Cuéntanos sobre tus necesidades</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-quicksand">
              Completa el formulario para que nuestro equipo pueda diseñar una solución a medida para tu organización.
              Al enviar, también podrás agendar una cita directamente.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-subtle border border-border animate-fade-in" style={{ animationDelay: "200ms" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-medium mb-4 font-quicksand">Información de contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground font-quicksand">
                      Nombre completo *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground font-quicksand">
                      Correo electrónico *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-foreground font-quicksand">
                      Empresa
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="position" className="block text-sm font-medium text-foreground font-quicksand">
                      Cargo
                    </label>
                    <input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                    />
                  </div>
                </div>
              </div>
              
              {/* Solution Requirements */}
              <div className="pt-4">
                <h2 className="text-xl font-medium mb-4 font-quicksand">Detalles de la solución requerida</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="solutionType" className="block text-sm font-medium text-foreground font-quicksand">
                      Tipo de solución que buscas
                    </label>
                    <select
                      id="solutionType"
                      name="solutionType"
                      value={formData.solutionType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="workshop">Taller</option>
                      <option value="course">Curso</option>
                      <option value="webinar">Webinar</option>
                      <option value="coaching">Coaching</option>
                      <option value="assessment">Evaluación</option>
                      <option value="consultancy">Consultoría</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="needs" className="block text-sm font-medium text-foreground font-quicksand">
                      Describe tus necesidades específicas *
                    </label>
                    <textarea
                      id="needs"
                      name="needs"
                      value={formData.needs}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      placeholder="Explica qué problema necesitas resolver o qué resultado esperas obtener"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="audienceSize" className="block text-sm font-medium text-foreground font-quicksand">
                        Tamaño de la audiencia
                      </label>
                      <select
                        id="audienceSize"
                        name="audienceSize"
                        value={formData.audienceSize}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="1-10">1-10 personas</option>
                        <option value="11-50">11-50 personas</option>
                        <option value="51-100">51-100 personas</option>
                        <option value="101-500">101-500 personas</option>
                        <option value="500+">Más de 500 personas</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="timeframe" className="block text-sm font-medium text-foreground font-quicksand">
                        Marco temporal
                      </label>
                      <select
                        id="timeframe"
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="immediate">Inmediato (próximo mes)</option>
                        <option value="short">Corto plazo (1-3 meses)</option>
                        <option value="medium">Mediano plazo (3-6 meses)</option>
                        <option value="long">Largo plazo (más de 6 meses)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground font-quicksand">
                        Presupuesto aproximado
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="low">Menos de $1,000</option>
                        <option value="medium">$1,000 - $5,000</option>
                        <option value="high">$5,000 - $10,000</option>
                        <option value="enterprise">Más de $10,000</option>
                        <option value="undefined">Por definir</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-foreground font-quicksand">
                      Información adicional
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 font-quicksand"
                      placeholder="Cualquier otra información relevante que nos ayude a entender mejor tu solicitud"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#A2C73F] text-white rounded-lg font-medium hover:bg-[#A2C73F]/90 transition-all-200 flex items-center justify-center font-quicksand text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  📩 Enviar solicitud y agendar cita
                </button>
                
                <p className="mt-4 text-xs text-muted-foreground font-quicksand">
                  Al enviar este formulario, recibirás confirmación por email y serás redirigido al calendario para agendar tu cita.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-border mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400 font-quicksand">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground font-quicksand">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground font-quicksand">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RequestSolutionPage;
