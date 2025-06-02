
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SolutionCard from "@/components/SolutionCard";
import { RefreshCw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSolutions } from "@/hooks/useSolutions";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CatalogoPage: React.FC = () => {
  const { solutions: allSolutions, loading, error, refetch } = useSolutions();
  const [filteredSolutions, setFilteredSolutions] = useState(allSolutions);
  const [filters, setFilters] = useState({
    type: "",
    modality: "",
    audience: "",
    duration: "",
    benefit: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilteredSolutions(allSolutions);
  }, [allSolutions]);

  useEffect(() => {
    const filtered = allSolutions.filter(solution => {
      const typeMatch = !filters.type || solution.type === filters.type;
      const modalityMatch = !filters.modality || solution.modality === filters.modality;
      
      // Map audience strings to categories
      let audienceMatch = true;
      if (filters.audience) {
        const audienceString = solution.audience?.toLowerCase() || "";
        switch (filters.audience) {
          case "all":
            audienceMatch = audienceString.includes("todos") || audienceString.includes("colaboradores");
            break;
          case "teams":
            audienceMatch = audienceString.includes("equipo");
            break;
          case "leaders":
            audienceMatch = audienceString.includes("líder") || audienceString.includes("lider") || 
                           audienceString.includes("directiv") || audienceString.includes("ejecutiv");
            break;
          case "operational":
            audienceMatch = audienceString.includes("operativ");
            break;
        }
      }

      // Map duration strings to categories
      let durationMatch = true;
      if (filters.duration) {
        const durationString = solution.duration?.toLowerCase() || "";
        switch (filters.duration) {
          case "short":
            durationMatch = durationString.includes("hora") && parseInt(durationString) < 2;
            break;
          case "medium":
            durationMatch = durationString.includes("hora") && parseInt(durationString) >= 2 && parseInt(durationString) <= 6;
            break;
          case "day":
            durationMatch = durationString.includes("día") || durationString.includes("dia");
            break;
          case "week":
            durationMatch = durationString.includes("semana") && !durationString.includes("4") && !durationString.includes("5") && !durationString.includes("6") && !durationString.includes("7") && !durationString.includes("8");
            break;
          case "program":
            durationMatch = durationString.includes("semana") && (durationString.includes("4") || durationString.includes("5") || durationString.includes("6") || durationString.includes("7") || durationString.includes("8"));
            break;
        }
      }

      // Benefits filter
      let benefitMatch = true;
      if (filters.benefit) {
        const solutionText = `${solution.title} ${solution.description} ${solution.tags?.join(" ") || ""}`.toLowerCase();
        switch (filters.benefit) {
          case "stress":
            benefitMatch = solutionText.includes("estrés");
            break;
          case "wellbeing":
            benefitMatch = solutionText.includes("bienestar");
            break;
          case "productivity":
            benefitMatch = solutionText.includes("productividad");
            break;
          case "leadership":
            benefitMatch = solutionText.includes("liderazgo");
            break;
          case "teamwork":
            benefitMatch = solutionText.includes("equipo");
            break;
          case "balance":
            benefitMatch = solutionText.includes("equilibrio");
            break;
          case "inclusion":
            benefitMatch = solutionText.includes("inclusión");
            break;
        }
      }

      return typeMatch && modalityMatch && audienceMatch && durationMatch && benefitMatch;
    });
    
    setFilteredSolutions(filtered);
  }, [filters, allSolutions]);

  const clearFilters = () => {
    setFilters({
      type: "",
      modality: "",
      audience: "",
      duration: "",
      benefit: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleRetryLoad = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      <Header />
      
      {/* Header Section */}
      <section className="pt-8 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 animate-fade-in font-quicksand">
              Catálogo completo de soluciones
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Explora todas nuestras soluciones activas, filtradas por lo que tu organización necesita.
            </p>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 min-w-fit">
                <Filter className="w-4 h-4" />
                Filtrar por:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 flex-1">
                {/* Tipo de solución */}
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de solución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Taller</SelectItem>
                    <SelectItem value="course">Curso</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="coaching">Coaching</SelectItem>
                    <SelectItem value="assessment">Evaluación</SelectItem>
                  </SelectContent>
                </Select>

                {/* Modalidad */}
                <Select value={filters.modality} onValueChange={(value) => setFilters(prev => ({ ...prev, modality: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Modalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="in-person">Presencial</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                  </SelectContent>
                </Select>

                {/* Audiencia */}
                <Select value={filters.audience} onValueChange={(value) => setFilters(prev => ({ ...prev, audience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Audiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los colaboradores</SelectItem>
                    <SelectItem value="teams">Equipos</SelectItem>
                    <SelectItem value="leaders">Líderes y directivos</SelectItem>
                    <SelectItem value="operational">Personal operativo</SelectItem>
                  </SelectContent>
                </Select>

                {/* Duración */}
                <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Menos de 2 horas</SelectItem>
                    <SelectItem value="medium">2-6 horas</SelectItem>
                    <SelectItem value="day">1 día completo</SelectItem>
                    <SelectItem value="week">1-3 semanas</SelectItem>
                    <SelectItem value="program">Programa largo (4+ semanas)</SelectItem>
                  </SelectContent>
                </Select>

                {/* ¿Qué deseas mejorar? */}
                <Select value={filters.benefit} onValueChange={(value) => setFilters(prev => ({ ...prev, benefit: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Qué deseas mejorar?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stress">Reducir estrés</SelectItem>
                    <SelectItem value="wellbeing">Bienestar general</SelectItem>
                    <SelectItem value="productivity">Productividad</SelectItem>
                    <SelectItem value="leadership">Liderazgo</SelectItem>
                    <SelectItem value="teamwork">Trabajo en equipo</SelectItem>
                    <SelectItem value="balance">Equilibrio vida-trabajo</SelectItem>
                    <SelectItem value="inclusion">Inclusión y diversidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Active filters and clear button */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filtros activos:</span>
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold font-quicksand">
                Soluciones encontradas
                <span className="ml-2 text-lg text-muted-foreground font-normal">
                  ({loading ? "..." : filteredSolutions.length})
                </span>
              </h2>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-quicksand">Cargando soluciones desde Firebase...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-red-50 rounded-lg">
                <p className="text-lg text-red-600 font-quicksand mb-4">{error}</p>
                <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
                  <RefreshCw className="h-4 w-4" />
                  Reintentar carga
                </Button>
              </div>
            ) : filteredSolutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSolutions.map((solution, index) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    index={index}
                  />
                ))}
              </div>
            ) : allSolutions.length === 0 ? (
              <div className="text-center py-12 bg-yellow-50 rounded-lg">
                <p className="text-lg mb-4 font-quicksand">No hay soluciones disponibles</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Asegúrate de haber subido las soluciones a la colección 'solutions' en Firebase
                </p>
                <Button onClick={handleRetryLoad} variant="outline" className="flex items-center gap-2 mx-auto">
                  <RefreshCw className="h-4 w-4" />
                  Verificar Firebase
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <p className="text-lg mb-4 font-quicksand">No se encontraron soluciones con los filtros aplicados.</p>
                <Button onClick={clearFilters} variant="guay-primary" size="grande">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-blue to-guay-purple">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CatalogoPage;
