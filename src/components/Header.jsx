
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import GuayLogo from "./GuayLogo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <GuayLogo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/solutions" 
              className="text-gray-700 hover:text-guay-blue transition-colors"
            >
              Soluciones
            </Link>
            <Link 
              to="/nosotras" 
              className="text-gray-700 hover:text-guay-blue transition-colors"
            >
              Nosotras
            </Link>
            <Link 
              to="/testimonials" 
              className="text-gray-700 hover:text-guay-blue transition-colors"
            >
              Testimonios
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-guay-blue transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/appointment"
              className="bg-guay-blue text-white px-4 py-2 rounded-lg hover:bg-guay-blue/90 transition-colors"
            >
              Agendar cita
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-guay-blue"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/solutions" 
                className="text-gray-700 hover:text-guay-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Soluciones
              </Link>
              <Link 
                to="/nosotras" 
                className="text-gray-700 hover:text-guay-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotras
              </Link>
              <Link 
                to="/testimonials" 
                className="text-gray-700 hover:text-guay-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonios
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/appointment"
                  className="inline-block bg-guay-blue text-white px-4 py-2 rounded-lg hover:bg-guay-blue/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar cita
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
          <div className="max-w-5xl mx-auto py-4 px-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar soluciones..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-guay-blue/20 focus:border-guay-blue"
                autoFocus
              />
              <Search className="absolute top-3.5 left-4 text-gray-400" />
              <button
                onClick={toggleSearch}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
