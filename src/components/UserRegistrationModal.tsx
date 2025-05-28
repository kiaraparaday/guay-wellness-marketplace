
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { registerUser, signInWithGoogle } from "@/services/firebaseService";
import { useAuth } from "@/contexts/AuthContext";

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

// Form validation schema
const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  empresa: z.string().optional(),
  rol: z.string().min(1, "Selecciona un rol"),
  terminos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones"
  }),
});

type FormData = z.infer<typeof formSchema>;

const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccess,
  onLoginClick
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { refreshUserData } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      empresa: "",
      rol: "",
      terminos: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting to register user with email:", data.email);
      await registerUser({
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        empresa: data.empresa || "",
        rol: data.rol,
        fechaRegistro: new Date(),
      });
      
      // Refresh user data after successful registration
      await refreshUserData();
      
      toast.success("¡Cuenta creada exitosamente!", {
        description: "Bienvenido/a a Guay",
      });
      
      onSuccess?.();
      onClose();
      
      // Reset form
      form.reset();
    } catch (error: any) {
      console.error("Error registering user:", error);
      
      let errorMessage = "Error al crear la cuenta. Intenta nuevamente.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este correo electrónico ya está registrado";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña es muy débil";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Correo electrónico no válido";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    try {
      console.log("Attempting Google sign-in for registration...");
      await signInWithGoogle();
      
      // Refresh user data after successful login
      await refreshUserData();
      
      toast.success("¡Cuenta creada exitosamente!", {
        description: "Bienvenido/a a Guay",
      });
      
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Error signing up with Google:", error);
      
      let errorMessage = "Error al registrarse con Google";
      
      if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "Dominio no autorizado. El administrador debe agregar este dominio en Firebase Console → Authentication → Settings → Authorized domains";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Registro cancelado";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup bloqueado. Permite popups para continuar.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = "Ya existe una cuenta con este correo";
      }
      
      toast.error(errorMessage, {
        duration: 6000, // Show longer for unauthorized domain error
      });
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Crea tu cuenta en Guay
          </DialogTitle>
        </DialogHeader>
        
        {/* Google Sign-In Button */}
        <div className="py-2">
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isGoogleLoading ? "Registrando..." : "Continuar con Google"}
          </Button>
        </div>

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">O regístrate con</span>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                    <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol o tipo de usuario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="colaborador">Colaborador</SelectItem>
                      <SelectItem value="lider">Líder / Directivo</SelectItem>
                      <SelectItem value="equipo">Equipo de trabajo</SelectItem>
                      <SelectItem value="operativo">Personal operativo</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="terminos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Acepto los términos y condiciones
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex-col gap-3 mt-6">
              <Button 
                type="submit" 
                className="w-full bg-guay-green hover:bg-guay-green/90" 
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
              
              <div className="text-center w-full text-sm mt-1">
                <span className="text-gray-600">¿Ya tienes una cuenta? </span>
                <button 
                  type="button" 
                  onClick={() => {
                    handleClose();
                    onLoginClick?.();
                  }}
                  className="text-guay-green hover:underline font-medium"
                >
                  Inicia sesión
                </button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationModal;
