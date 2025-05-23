
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dimension from "./pages/Dimension";
import Competency from "./pages/Competency";
import Solution from "./pages/Solution";
import Solutions from "./pages/Solutions";
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
import { AuthProvider } from "./contexts/AuthContext";

// Initialize Firebase in App.tsx for global availability
import "./services/firebaseService";

const queryClient = new QueryClient();

const App = () => {
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
              <div className="fixed -top-32 -left-32 w-64 h-64 rounded-full bg-guay-green opacity-90 z-0"></div>
              {/* Small mustard circle below */}
              <div className="fixed top-20 left-8 w-8 h-8 rounded-full bg-guay-orange opacity-90 z-0"></div>
              
              {/* Right side magenta circle */}
              <div className="fixed top-1/2 -right-32 transform -translate-y-1/2 w-64 h-64 rounded-full bg-guay-purple opacity-90 z-0"></div>
              
              <Header />
              <div className="pt-16 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
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
                  <Route path="/agenda" element={<Appointment />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <SimpleFooter />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
