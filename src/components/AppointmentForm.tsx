
import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    date: "",
    time: "",
    message: "",
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
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log("Form data:", formData);
    
    // Confirm submission
    toast.success("Su cita ha sido agendada exitosamente");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-subtle border border-border">
      <h2 className="text-2xl font-medium mb-6">Agende una cita con nosotros</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-foreground">
              Fecha preferida *
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 pl-10"
                required
              />
              <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-medium text-foreground">
              Hora preferida *
            </label>
            <div className="relative">
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200 pl-10 appearance-none"
                required
              >
                <option value="">Seleccionar hora</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
              <Clock className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
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
