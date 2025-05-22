
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { loginUser } from "@/services/firebaseService";
import { useNavigate } from "react-router-dom";

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onSuccess: () => void;
}

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type FormData = z.infer<typeof formSchema>;

const UserLoginModal: React.FC<UserLoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onRegisterClick,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Login user with Firebase Authentication
      await loginUser(data.email, data.password);
      
      toast.success("¡Inicio de sesión exitoso!", {
        description: "Bienvenido/a de nuevo a Guay",
      });
      
      // Call the success callback
      onSuccess();
      
      // Close the modal
      onClose();
      
      // Navigate to home or dashboard if needed
      // navigate("/");
    } catch (error: any) {
      console.error("Error logging in:", error);
      
      let errorMessage = "Error al iniciar sesión. Verifica tus credenciales.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Correo o contraseña incorrectos";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Demasiados intentos fallidos. Intenta más tarde.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Iniciar sesión
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu.correo@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Tu contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex-col gap-3 mt-6">
              <Button 
                type="submit" 
                className="w-full bg-guay-green hover:bg-guay-green/90" 
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
              
              <div className="text-center w-full text-sm mt-1">
                <span className="text-gray-600">¿No tienes una cuenta? </span>
                <button 
                  type="button" 
                  onClick={() => {
                    onClose();
                    onRegisterClick();
                  }}
                  className="text-guay-green hover:underline font-medium"
                >
                  Regístrate
                </button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserLoginModal;
