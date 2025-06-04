
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SolutionCard from "@/components/SolutionCard";
import { solutionsArray } from "@/data/solutions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ResultadosPage = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  
  const [filteredSolutions, setFilteredSolutions] = useState(solutionsArray);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Filter solutions based on search query
    if (query) {
      console.log(`Filtering solutions for query: ${query}`);
      const lowerQuery = query.toLowerCase();
      
      const filtered = solutionsArray.filter(solution => {
        // Check if the query matches the solution title, description, type, or competencies
        const titleMatch = solution.title.toLowerCase().includes(lowerQuery);
        const descMatch = solution.description.toLowerCase().includes(lowerQuery);
        const typeMatch = solution.type.toLowerCase().includes(lowerQuery);
        const categoryMatch = solution.categories && solution.categories.some(cat => 
          cat.toLowerCase().includes(lowerQuery)
        );
        const competencyMatch = solution.competencies.some(comp => {
          // Map competency ID to name for searching
          const competencyMap: Record<string, string> = {
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
        });
        
        return titleMatch || descMatch || typeMatch || categoryMatch || competencyMatch;
      });
      
      console.log(`Found ${filtered.length} matching solutions`);
      setFilteredSolutions(filtered);
    } else {
      setFilteredSolutions([]);
    }
  }, [query]);

  // Function to highlight the search term in a text
  const highlightSearchTerm = (text: string) => {
    if (!query || !text) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 text-primary-800 font-medium">{part}</span> : 
        part
    );
  };
  
  return (
    <div className="container py-8 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => history.goBack()}
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" /> Filtrar resultados
        </Button>
      </div>
      
      <Card className="bg-white/70 backdrop-blur-sm mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl sm:text-4xl font-semibold animate-fade-in">
            Resultados de búsqueda
          </CardTitle>
          <CardDescription className="text-lg">
            Mostrando resultados para: <span className="font-medium text-primary">{query}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSolutions.length > 0 && (
            <p className="text-sm">
              Se encontraron <span className="font-medium">{filteredSolutions.length}</span> soluciones
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* Filter area would go here - can be implemented in the future */}
      
      {filteredSolutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-secondary/30 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No se encontraron resultados</h2>
          <p className="text-muted-foreground mb-6">
            No hemos encontrado soluciones que coincidan con "{query}".
            <br />
            Intenta con otro término como: liderazgo, estrés, comunicación, trabajo en equipo, inclusión, mindfulness...
          </p>
          <Button 
            onClick={() => history.push("/solutions")}
            variant="guay-primary"
            size="grande"
          >
            Ver todas las soluciones
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultadosPage;
