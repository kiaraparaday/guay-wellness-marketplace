
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
import ControlDemo from "./pages/ControlDemo";

// Initialize Firebase in App.tsx for global availability
import "./services/firebaseService";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-[#f0f2f8]">
            {/* Decorative elements */}
            <div className="fixed top-0 left-0 w-32 h-32 bg-guay-green rounded-br-full -z-10"></div>
            <div className="fixed bottom-0 right-0 w-64 h-64 bg-guay-purple rounded-tl-full -z-10"></div>
            <div className="fixed top-20 left-8 w-12 h-12 bg-guay-orange rounded-full -z-10"></div>
            
            <Header />
            <div className="pt-16 px-4 md:px-8 max-w-7xl mx-auto">
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
                <Route path="/categorias" element={<NotFound />} />
                <Route path="/nosotras" element={<NotFound />} />
                <Route path="/agenda" element={<Appointment />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
