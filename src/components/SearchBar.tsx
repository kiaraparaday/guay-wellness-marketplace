
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();

    // Close search on escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Búsqueda vacía",
        description: "Por favor, escribe algo para buscar.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to search results page with the search term
    navigate(`/resultados?q=${encodeURIComponent(searchTerm.trim())}`);
    onClose();
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    // Navigate directly instead of using form submission
    navigate(`/resultados?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-6">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por palabra clave, tema o tipo de solución..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-200"
        />
        <Search className="absolute top-3.5 left-4 text-muted-foreground" />
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Búsquedas populares:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Estrés", "Comunicación", "Liderazgo", "Trabajo en equipo", "Inclusión", "Mindfulness"].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handlePopularSearch(term)}
                className="px-2.5 py-1 bg-secondary rounded-full hover:bg-primary/10 transition-all-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
