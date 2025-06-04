
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupGlobalButtonHandler, setupAgendarCitaRedirection } from "./utils/googleCalendarButton";

// Import pages
import Index from "./pages/Index";
import Dimension from "./pages/Dimension";
import Competency from "./pages/Competency";
import Solution from "./pages/Solution";
import Solutions from "./pages/Solutions";
import CatalogoPage from "./pages/Catalogo";
import SearchResults from "./pages/SearchResults";
import ResultadosPage from "./pages/ResultadosPage";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import RequestSolution from "./pages/RequestSolution";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import ControlDemo from "./pages/ControlDemo";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import QuienesSomos from "./pages/QuienesSomos";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup global button handler when app mounts
    setupGlobalButtonHandler();
    // Setup direct redirection for "Agendar cita" buttons
    setupAgendarCitaRedirection();
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
          {/* Decorative circles for the main layout */}
          <div className="fixed -top-32 -left-32 w-64 h-64 bg-green-200 rounded-full opacity-30 pointer-events-none"></div>
          <div className="fixed -top-24 -right-24 w-48 h-48 bg-blue-200 rounded-full opacity-40 pointer-events-none"></div>
          <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-25 pointer-events-none"></div>
          <div className="fixed -bottom-32 -right-32 w-56 h-56 bg-orange-200 rounded-full opacity-35 pointer-events-none"></div>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dimension/:id" element={<Dimension />} />
            <Route path="/competency/:id" element={<Competency />} />
            <Route path="/solution/:id" element={<Solution />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/resultados" element={<ResultadosPage />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/request-solution" element={<RequestSolution />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/controls" element={<ControlDemo />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
