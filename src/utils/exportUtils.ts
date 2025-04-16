
/**
 * Utilidades para exportar datos en diferentes formatos
 */

import { AppointmentData, getAllAppointments, getAllSolutionsFromFirebase, syncAllMarketplaceData } from "@/services/firebaseService";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { solutionsArray } from "@/data/solutions";

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
    // Obtener citas de Firebase
    const result = await getAllAppointments();
    
    if (!result.success || !result.appointments) {
      throw new Error("Error al obtener citas de Firebase");
    }
    
    const appointments = result.appointments;
    
    // Formatear los datos para que sean más legibles en el CSV
    const formattedAppointments = appointments.map(appointment => {
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
    // Obtener soluciones de Firebase
    const result = await getAllSolutionsFromFirebase();
    
    if (!result.success || !result.solutions) {
      throw new Error("Error al obtener soluciones de Firebase");
    }
    
    const solutions = result.solutions;
    
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
        // Eliminamos las referencias a la propiedad pricing que no existe en el tipo SolutionType
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
    // Primero sincronizar todos los datos con Firebase
    await syncAllMarketplaceData();
    
    // Exportar soluciones
    await exportSolutionsToCSV();
    
    // Exportar citas
    await exportAppointmentsToCSV();
    
    // Podríamos añadir más exportaciones aquí según sea necesario
    // Por ejemplo, testimonios, dimensiones, competencias, etc.
    
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
