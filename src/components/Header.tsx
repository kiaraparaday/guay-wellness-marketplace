
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Filter, X, Menu, X as Close } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isFilterOpen) setIsFilterOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isFilterOpen) setIsFilterOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-subtle"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="group flex items-center space-x-2">
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400 transition-all duration-300 group-hover:from-guay-700 group-hover:to-guay-500">
              GUAY
            </span>
            <span className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary">
              Wellness Marketplace
            </span>
          </Link>

          {/* Navigation Menu - Desktop */}
          {isHomePage && (
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("soluciones")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Soluciones
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("destacadas")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Destacadas
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("casos-exito")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Casos de Éxito
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      onClick={() => scrollToSection("contacto")} 
                      variant="ghost" 
                      className="text-foreground font-medium"
                    >
                      Contacto
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Mobile Menu Toggle */}
            {isHomePage && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 md:hidden rounded-full hover:bg-accent"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={toggleSearch}
              className={cn(
                "p-2 rounded-full transition-all-200",
                isSearchOpen
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              )}
              aria-label="Search"
            >
              {isSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleFilter}
              className={cn(
                "p-2 rounded-full transition-all-200",
                isFilterOpen
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              )}
              aria-label="Filter"
            >
              {isFilterOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/appointment"
              className="hidden sm:flex items-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all-200"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isHomePage && (
        <div
          className={cn(
            "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform md:hidden",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
          )}
        >
          <div className="p-4 space-y-3">
            <Button 
              onClick={() => scrollToSection("soluciones")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Soluciones
            </Button>
            <Button 
              onClick={() => scrollToSection("destacadas")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Destacadas
            </Button>
            <Button 
              onClick={() => scrollToSection("casos-exito")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Casos de Éxito
            </Button>
            <Button 
              onClick={() => scrollToSection("contacto")} 
              variant="ghost" 
              className="text-foreground w-full justify-start font-medium"
            >
              Contacto
            </Button>
            <Link
              to="/appointment"
              className="flex w-full items-center justify-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all-200"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      )}

      {/* Expandable Search Area */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      </div>

      {/* Expandable Filter Area */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isFilterOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <FilterBar onClose={() => setIsFilterOpen(false)} />
      </div>

      {/* Header Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
