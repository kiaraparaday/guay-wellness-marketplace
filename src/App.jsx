
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { setupGlobalButtonHandler, setupAgendarCitaRedirection } from "./utils/googleCalendarButton";
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
import { AuthProvider } from "./contexts/AuthContext";

// Initialize Firebase in App.jsx for global availability
import "./services/firebaseService";

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
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dimension/:id" element={<Dimension />} />
              <Route path="/competency/:id" element={<Competency />} />
              <Route path="/solution/:id" element={<Solution />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/resultados" element={<ResultadosPage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/request-solution" element={<RequestSolution />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/controls" element={<ControlDemo />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/nosotras" element={<AboutUs />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/agenda" element={<Appointment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
