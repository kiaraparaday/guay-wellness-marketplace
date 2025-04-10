
/**
 * Utilidades para exportar datos en diferentes formatos
 */

import { AppointmentData } from "@/services/firebaseService";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
export const exportAppointmentsToCSV = (appointments: AppointmentData[]): void => {
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
