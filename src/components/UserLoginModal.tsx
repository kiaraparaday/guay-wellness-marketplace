
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onSuccess?: () => void;
}

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { refreshUserData } = useAuth();
  
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
      console.log("Firebase service is disabled - login attempt with email:", data.email);
      
      toast.error("Servicio de autenticación no disponible", {
        description: "Firebase ha sido deshabilitado. Contacta al administrador.",
      });
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error("Error al iniciar sesión. Servicio no disponible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    try {
      console.log("Firebase service is disabled - Google sign-in not available");
      
      toast.error("Servicio de autenticación no disponible", {
        description: "Firebase ha sido deshabilitado. Contacta al administrador.",
      });
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast.error("Error al iniciar sesión con Google. Servicio no disponible.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Iniciar sesión
          </DialogTitle>
        </DialogHeader>
        
        {/* Google Sign-In Button */}
        <div className="py-2">
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 opacity-50"
            onClick={handleGoogleSignIn}
            disabled={true}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Servicio no disponible
          </Button>
        </div>

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">O continúa con</span>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu.correo@empresa.com" {...field} disabled />
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
                    <Input type="password" placeholder="Tu contraseña" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex-col gap-3 mt-6">
              <Button 
                type="submit" 
                className="w-full bg-guay-green hover:bg-guay-green/90 opacity-50" 
                disabled={true}
              >
                Servicio no disponible
              </Button>
              
              <div className="text-center w-full text-sm mt-1">
                <span className="text-gray-600">¿No tienes una cuenta? </span>
                <button 
                  type="button" 
                  onClick={() => {
                    handleClose();
                    onRegisterClick();
                  }}
                  className="text-guay-green hover:underline font-medium opacity-50"
                  disabled
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
