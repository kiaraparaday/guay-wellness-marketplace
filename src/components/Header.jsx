
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Search } from "lucide-react";
import GuayLogo from "./GuayLogo";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const isActiveRoute = (path) => location.pathname === path;

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Testimonios", path: "/testimonials" },
    { name: "Agenda una cita", path: "/appointment" },
    { name: "Sobre Guay", path: "/about" }
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 font-quicksand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <GuayLogo showText={true} className="h-8" />
            </Link>
          </div>

          {/* Desktop Navigation and Search */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActiveRoute(item.path) 
                      ? "text-primary border-b-2 border-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Icon */}
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* User button */}
          <div className="flex items-center">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Usuario</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="px-4 pt-4 pb-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-sm font-medium transition-colors hover:text-primary ${
                    isActiveRoute(item.path) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={toggleSearch}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border bg-white">
            <div className="px-4 py-4">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
