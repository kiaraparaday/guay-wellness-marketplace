
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { setupGlobalButtonHandler, setupAgendarCitaRedirection } from "./utils/googleCalendarButton";
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
import QuienesSomos from "./pages/QuienesSomos";
import { AuthProvider } from "./contexts/AuthContext";

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
              <div className="fixed -top-32 -left-32 w-64 h-64 rounded-full bg-guay-green opacity-90 z-0"></div>
              {/* Small mustard circle - repositioned to not be inside the green circle */}
              <div className="fixed top-48 left-12 w-8 h-8 rounded-full bg-guay-orange opacity-90 z-0"></div>
              
              {/* Right side magenta circle */}
              <div className="fixed top-1/2 -right-32 transform -translate-y-1/2 w-64 h-64 rounded-full bg-guay-purple opacity-90 z-0"></div>
              
              <Header />
              <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route path="/dimension/:id" component={Dimension} />
                  <Route path="/competency/:id" component={Competency} />
                  <Route path="/solution/:id" component={Solution} />
                  <Route path="/solutions" component={Solutions} />
                  <Route path="/search" component={SearchResults} />
                  <Route path="/resultados" component={ResultadosPage} />
                  <Route path="/appointment" component={Appointment} />
                  <Route path="/my-appointments" component={MyAppointments} />
                  <Route path="/request-solution" component={RequestSolution} />
                  <Route path="/testimonials" component={Testimonials} />
                  <Route path="/controls" component={ControlDemo} />
                  <Route path="/categorias" component={Categories} />
                  <Route path="/nosotras" component={AboutUs} />
                  <Route path="/quienes-somos" component={QuienesSomos} />
                  <Route path="/agenda" component={Appointment} />
                  <Route component={NotFound} />
                </Switch>
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
