
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Dimension from "./pages/Dimension";
import Competency from "./pages/Competency";
import Solution from "./pages/Solution";
import Solutions from "./pages/Solutions";
import SearchResults from "./pages/SearchResults";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import RequestSolution from "./pages/RequestSolution";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import SimpleFooter from "./components/SimpleFooter";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import QuienesSomos from "./pages/QuienesSomos";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup global functionality when app mounts
    console.log("App initialized with React 16.13.1");
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
            {/* Decorative circles */}
            <div className="fixed -top-32 -left-32 w-64 h-64 rounded-full bg-green-400 opacity-20 z-0"></div>
            <div className="fixed top-48 left-12 w-8 h-8 rounded-full bg-orange-400 opacity-30 z-0"></div>
            <div className="fixed top-1/2 -right-32 transform -translate-y-1/2 w-64 h-64 rounded-full bg-purple-400 opacity-20 z-0"></div>
            
            <Header />
            <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/dimension/:id" component={Dimension} />
                <Route path="/competency/:id" component={Competency} />
                <Route path="/solution/:id" component={Solution} />
                <Route path="/solutions" component={Solutions} />
                <Route path="/search" component={SearchResults} />
                <Route path="/appointment" component={Appointment} />
                <Route path="/my-appointments" component={MyAppointments} />
                <Route path="/request-solution" component={RequestSolution} />
                <Route path="/testimonials" component={Testimonials} />
                <Route path="/categorias" component={Categories} />
                <Route path="/nosotras" component={AboutUs} />
                <Route path="/quienes-somos" component={QuienesSomos} />
                <Route path="/agenda" component={Appointment} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <SimpleFooter />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
