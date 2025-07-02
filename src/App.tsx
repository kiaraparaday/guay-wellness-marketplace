
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Solution from "./pages/Solution";
import RequestSolution from "./pages/RequestSolution";
import Competency from "./pages/Competency";
import Appointment from "./pages/Appointment";
import QuienesSomos from "./pages/QuienesSomos";
import AboutUs from "./pages/AboutUs";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solution/:id" element={<Solution />} />
              <Route path="/request-info/:solutionId" element={<RequestSolution />} />
              <Route path="/competency/:id" element={<Competency />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
