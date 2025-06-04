
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SolutionCard from "../components/SolutionCard";
import { solutionsArray } from "../data/solutions";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  
  const [filteredSolutions, setFilteredSolutions] = useState(solutionsArray);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Filter solutions based on search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      
      const filtered = solutionsArray.filter(solution => {
        // Check if the query matches the solution title, description, type, or competencies
        return (
          solution.title.toLowerCase().includes(lowerQuery) ||
          solution.description.toLowerCase().includes(lowerQuery) ||
          solution.type.toLowerCase().includes(lowerQuery) ||
          (solution.categories && solution.categories.some(cat => cat.toLowerCase().includes(lowerQuery))) ||
          solution.competencies.some(comp => {
            // Map competency ID to name for searching
            const competencyMap = {
              "mental-workload": "carga mental estrés estres",
              "work-autonomy": "autonomía autonomia laboral",
              "work-life-balance": "equilibrio vida trabajo",
              "communication": "comunicación comunicacion",
              "capability-development": "desarrollo capacidades",
              "diversity": "diversidad inclusión inclusion",
              "leadership": "liderazgo",
              "teamwork": "trabajo equipo",
              "innovation": "innovación innovacion",
              "integrity": "integridad"
            };
            
            return competencyMap[comp]?.toLowerCase().includes(lowerQuery);
          })
        );
      });
      
      setFilteredSolutions(filtered);
    }
  }, [query]);
  
  return (
    <div className="container py-8 md:py-12">
      <Button 
        variant="outline" 
        className="mb-6 flex items-center gap-2"
        onClick={() => history.goBack()}
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </Button>
      
      <h1 className="text-3xl sm:text-4xl font-semibold mb-3 animate-fade-in">
        Resultados de búsqueda
      </h1>
      
      <p className="text-muted-foreground mb-8 animate-fade-in">
        Mostrando resultados para: <span className="font-medium text-primary">{query}</span>
      </p>
      
      {filteredSolutions.length > 0 ? (
        <>
          <p className="text-sm mb-6">
            Se encontraron <span className="font-medium">{filteredSolutions.length}</span> soluciones
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-secondary/30 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No se encontraron resultados</h2>
          <p className="text-muted-foreground mb-6">
            No hemos encontrado soluciones que coincidan con "{query}".
          </p>
          <Button 
            onClick={() => history.push("/solutions")}
            className="bg-primary hover:bg-primary/90"
          >
            Ver todas las soluciones
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
