
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { setupGlobalButtonHandler, setupAgendarCitaRedirection } from "@/utils/googleCalendarButton";
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
import Header from "./components/Header";
import SimpleFooter from "./components/SimpleFooter";
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
            <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
              {/* Decorative circles for the main layout based on the reference image */}
              {/* Top left green circle */}
              <div className="fixed -top-32 -left-32 w-64 h-64 bg-guay-green/20 rounded-full opacity-30 pointer-events-none"></div>
              
              {/* Top right blue circle */}
              <div className="fixed -top-24 -right-24 w-48 h-48 bg-guay-blue/20 rounded-full opacity-40 pointer-events-none"></div>
              
              {/* Bottom left purple circle */}
              <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-guay-purple/15 rounded-full opacity-25 pointer-events-none"></div>
              
              {/* Bottom right orange circle */}
              <div className="fixed -bottom-32 -right-32 w-56 h-56 bg-guay-orange/20 rounded-full opacity-35 pointer-events-none"></div>
              
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
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
