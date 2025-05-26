
import React, { useEffect } from "react";

const AppointmentPage: React.FC = () => {
  useEffect(() => {
    // Redirección automática a Google Calendar
    window.location.href = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold mb-2 text-guay-dark">
          Redirigiendo a Google Calendar...
        </h1>
        <p className="text-muted-foreground">
          Te estamos llevando a nuestra agenda para que puedas agendar tu cita.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Si no eres redirigido automáticamente, 
          <a 
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0CSfvvxue3MDVfGyXgfjnhXcsu6XkxEoXnnPXjb3J54puN0BGDnntVlpwPMihC6RTbeQ0j1gRZ?gv=true"
            className="text-primary hover:underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            haz clic aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default AppointmentPage;
