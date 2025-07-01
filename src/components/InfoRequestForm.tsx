
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { X, Mail } from "lucide-react";

interface InfoRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  solutionTitle: string;
}

const InfoRequestForm: React.FC<InfoRequestFormProps> = ({
  isOpen,
  onClose,
  solutionTitle,
}) => {
  const { currentUser, userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: userData?.nombre || currentUser?.displayName || "",
    email: currentUser?.email || "",
    empresa: userData?.empresa || "",
    mensaje: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.email.trim()) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí se enviaría a Firebase/Firestore
      // Por ahora simulamos el envío
      const requestData = {
        ...formData,
        solucionInteres: solutionTitle,
        fechaSolicitud: new Date().toISOString(),
        userId: currentUser?.uid || null,
      };

      console.log("Solicitud de información enviada:", requestData);

      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.");
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Error al enviar la solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center mb-2">
            Solicita más información sobre esta solución
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Solución de interés (prellenada y no editable) */}
          <div>
            <Label htmlFor="solucion" className="text-sm font-medium">
              Solución de interés
            </Label>
            <Input
              id="solucion"
              value={solutionTitle}
              disabled
              className="bg-gray-50 cursor-not-allowed mt-1"
            />
          </div>

          {/* Nombre completo */}
          <div>
            <Label htmlFor="nombre" className="text-sm font-medium">
              Nombre completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              required
              className="mt-1"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
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
              className="mt-1"
            />
          </div>

          {/* Empresa */}
          <div>
            <Label htmlFor="empresa" className="text-sm font-medium">
              Empresa
            </Label>
            <Input
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              placeholder="Nombre de tu empresa"
              className="mt-1"
            />
          </div>

          {/* Mensaje adicional */}
          <div>
            <Label htmlFor="mensaje" className="text-sm font-medium">
              ¿Hay algo específico que te gustaría compartir o consultar?
            </Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Comparte detalles adicionales sobre lo que necesitas..."
              rows={4}
              className="mt-1"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="guay-primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar solicitud
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoRequestForm;
