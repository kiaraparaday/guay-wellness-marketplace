
import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Menu, Search, User, LogOut, LogIn } from "lucide-react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Soluciones", path: "/solutions" },
    { label: "Testimonios", path: "/testimonials" },
    { label: "Agenda una cita", path: "/appointment" },
    { label: "Sobre guay", path: "/quienes-somos" },
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuClick = (path) => {
    history.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131F36] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block w-20"></div>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
            <span className="text-2xl font-bold text-white">GUAY</span>
          </Link>

          {/* Right buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="bg-[#A6B94C] hover:bg-[#A6B94C]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2 font-medium"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Usuario</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center justify-center space-x-2 py-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.path)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-[#131F36] text-white hover:bg-[#131F36]/90"
                    : "text-[#131F36] hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 z-30 bg-white shadow-lg transition-all duration-300 transform lg:hidden border-b border-gray-200 ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full justify-start rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-[#131F36] text-white hover:bg-[#131F36]/90"
                  : "text-[#131F36] hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white shadow-lg transition-all duration-300 transform ${
          isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar soluciones..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;
