import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, Building, Mail, MessageSquare, Download, RefreshCw } from "lucide-react";
import { getAppointmentsByEmail, getAllAppointments } from "@/services/firebaseService";
import type { AppointmentData } from "@/services/firebaseService";
import { exportAppointmentsToCSV } from "@/utils/exportUtils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MyAppointmentsPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor ingrese su correo electrónico");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await getAppointmentsByEmail(email);
      
      if (result.success) {
        setAppointments(result.appointments);
        setShowAppointments(true);
        
        if (result.appointments.length === 0) {
          toast.info("No se encontraron citas con este correo electrónico");
        }
      } else {
        toast.error("Ha ocurrido un error al buscar sus citas. Por favor intente nuevamente.");
        console.error("Error al buscar citas:", result.error);
      }
    } catch (error) {
      toast.error("Ha ocurrido un error al buscar sus citas. Por favor intente nuevamente.");
      console.error("Error al buscar citas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    if (appointments.length === 0) {
      toast.info("No hay citas para exportar");
      return;
    }
    
    try {
      setIsSyncing(true);
      await exportAppointmentsToCSV();
      toast.success("Citas exportadas correctamente desde Firebase");
    } catch (error) {
      console.error("Error al exportar citas:", error);
      toast.error("Ha ocurrido un error al exportar las citas");
    } finally {
      setIsSyncing(false);
    }
  };
  
  const handleSyncAllAppointments = async () => {
    try {
      setIsSyncing(true);
      const result = await getAllAppointments();
      
      if (result.success && result.appointments) {
        setAppointments(result.appointments);
        toast.success("Todas las citas sincronizadas correctamente desde Firebase");
      } else {
        toast.error("Error al sincronizar citas con Firebase");
      }
    } catch (error) {
      console.error("Error al sincronizar citas:", error);
      toast.error("Ha ocurrido un error al sincronizar citas");
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return "text-green-600 bg-green-50 border-green-200";
      case 'cancelled':
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-amber-600 bg-amber-50 border-amber-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return "Confirmada";
      case 'cancelled':
        return "Cancelada";
      default:
        return "Pendiente";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-semibold mb-4 text-guay-dark">Mis Citas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consulte el estado de sus citas programadas ingresando su correo electrónico o consulte todas las citas sincronizadas con Firebase.
            </p>
          </div>
          
          {!showAppointments ? (
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-subtle border border-border">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-medium">Buscar por email</h3>
                <Button
                  onClick={handleSyncAllAppointments}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={isSyncing}
                >
                  <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  Ver todas
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow flex items-center justify-center"
                >
                  {isLoading ? "Buscando..." : "Ver mis citas"}
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setShowAppointments(false)}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Buscar con otro correo
                </button>
                
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleSyncAllAppointments} 
                    variant="outline" 
                    size="sm"
                    disabled={isSyncing}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    Sincronizar
                  </Button>
                  
                  <Button 
                    onClick={handleExportCSV} 
                    variant="outline" 
                    size="sm"
                    disabled={appointments.length === 0 || isSyncing}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Exportar como CSV
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-subtle border border-border overflow-hidden">
                <div className="p-4 bg-primary/5 border-b border-border flex justify-between items-center">
                  <h2 className="font-medium">
                    {email ? `Citas asociadas a ${email}` : 'Todas las citas sincronizadas con Firebase'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {appointments.length} {appointments.length === 1 ? "cita encontrada" : "citas encontradas"}
                  </span>
                </div>
                
                {appointments.length === 0 ? (
                  <div className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No se encontraron citas</h3>
                    <p className="text-muted-foreground mb-4">
                      No hay citas programadas con este correo electrónico.
                    </p>
                    <Link
                      to="/appointment"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar una cita
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {appointments.map((appointment, index) => (
                      <div key={index} className="p-5 hover:bg-muted/5 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-lg">{appointment.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        
                        <div className="grid gap-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>
                              {format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>{appointment.time}</span>
                          </div>
                          
                          {appointment.company && (
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-primary" />
                              <span>{appointment.company}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-primary" />
                            <span>{appointment.email}</span>
                          </div>
                        </div>
                        
                        {appointment.message && (
                          <div className="bg-muted/10 p-3 rounded-lg border border-border mt-3">
                            <div className="flex items-start">
                              <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                              <div>
                                <p className="text-sm font-medium mb-1">Mensaje:</p>
                                <p className="text-sm text-muted-foreground">{appointment.message}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <footer className="py-8 px-6 bg-white border-t border-border mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyAppointmentsPage;
