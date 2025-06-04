
/**
 * Utilidades para exportar datos en diferentes formatos
 */

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { solutionsArray } from "@/data/solutions";

// Mock interfaces since Firebase is disabled
interface AppointmentData {
  name: string;
  email: string;
  company?: string;
  date: Date;
  time: string;
  status: string;
  message?: string;
  createdAt: Date;
}

interface SolutionType {
  id: string;
  title: string;
  description: string;
  type: string;
  modality: string;
  duration?: string;
  audience?: string;
}

/**
 * Convierte un array de objetos a formato CSV
 */
export const objectsToCSV = (data: any[]): string => {
  if (data.length === 0) return "";
  
  // Obtener los encabezados (keys del primer objeto)
  const headers = Object.keys(data[0]);
  
  // Crear la línea de encabezados
  const headerRow = headers.join(",");
  
  // Crear las líneas de datos
  const rows = data.map(obj => {
    return headers.map(header => {
      // Convertir cada valor a string y escapar comas y comillas
      let value = obj[header] === null || obj[header] === undefined ? "" : obj[header];
      
      // Formatear fechas si es necesario
      if (value instanceof Date) {
        value = format(value, "yyyy-MM-dd");
      }
      
      // Convertir a string y escapar caracteres especiales
      const stringValue = String(value);
      // Escapar comillas y encerrar en comillas si contiene comas
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(",");
  }).join("\n");
  
  // Unir encabezados y filas
  return `${headerRow}\n${rows}`;
};

/**
 * Función para exportar citas a un archivo CSV
 */
export const exportAppointmentsToCSV = async (): Promise<void> => {
  try {
    console.log("Firebase service is disabled - using mock data for export");
    
    // Mock appointments data since Firebase is disabled
    const mockAppointments: AppointmentData[] = [];
    
    // Formatear los datos para que sean más legibles en el CSV
    const formattedAppointments = mockAppointments.map(appointment => {
      return {
        Nombre: appointment.name,
        Email: appointment.email,
        Empresa: appointment.company || "",
        Fecha: format(appointment.date, "yyyy-MM-dd"),
        Hora: appointment.time,
        Estado: getStatusText(appointment.status),
        Mensaje: appointment.message || "",
        FechaCreacion: format(appointment.createdAt, "yyyy-MM-dd HH:mm:ss")
      };
    });
    
    // Convertir a CSV
    const csv = objectsToCSV(formattedAppointments);
    
    // Crear un blob con el contenido CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    
    // Crear URL para el blob
    const url = URL.createObjectURL(blob);
    
    // Crear un elemento de enlace para descargar
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `mis_citas_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    
    // Agregar al DOM, hacer click y eliminar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al exportar citas:", error);
    throw error;
  }
};

/**
 * Función para exportar soluciones a un archivo CSV
 */
export const exportSolutionsToCSV = async (): Promise<void> => {
  try {
    console.log("Firebase service is disabled - using local solutions data for export");
    
    // Use local solutions data since Firebase is disabled
    const solutions = solutionsArray;
    
    // Formatear los datos para que sean más legibles en el CSV
    const formattedSolutions = solutions.map(solution => {
      return {
        ID: solution.id,
        Título: solution.title,
        Descripción: solution.description,
        Tipo: solution.type,
        Modalidad: solution.modality,
        Duración: solution.duration || "",
        Audiencia: solution.audience || "",
      };
    });
    
    // Convertir a CSV
    const csv = objectsToCSV(formattedSolutions);
    
    // Crear un blob con el contenido CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    
    // Crear URL para el blob
    const url = URL.createObjectURL(blob);
    
    // Crear un elemento de enlace para descargar
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `soluciones_guay_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    
    // Agregar al DOM, hacer click y eliminar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al exportar soluciones:", error);
    throw error;
  }
};

/**
 * Función para exportar todos los datos del marketplace a un archivo CSV
 */
export const exportAllMarketplaceData = async (): Promise<void> => {
  try {
    console.log("Firebase service is disabled - using local data for export");
    
    // Export solutions using local data
    await exportSolutionsToCSV();
    
    // Export appointments (will be empty since Firebase is disabled)
    await exportAppointmentsToCSV();
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error al exportar todos los datos:", error);
    return Promise.reject(error);
  }
};

/**
 * Función auxiliar para obtener el texto del estado
 */
const getStatusText = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return "Confirmada";
    case 'cancelled':
      return "Cancelada";
    default:
      return "Pendiente";
  }
};
