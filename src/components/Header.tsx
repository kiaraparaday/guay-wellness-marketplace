
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import GuayLogo from "./GuayLogo";
import { Button } from "@/components/ui/button";
import { filterEventBus } from "@/services/eventBus";

export { filterEventBus };

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { label: "Sección menú", path: "/" },
    { label: "Sección menú", path: "/solutions" },
    { label: "Sección menú", path: "/testimonials" },
    { label: "Sección menú", path: "/appointment" },
    { label: "Sección menú", path: "/my-appointments" },
    { label: "Sección menú", path: "/request-solution" },
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#15253C] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 mr-2 rounded-full hover:bg-white/10"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <Link to="/" className="flex items-center">
              <GuayLogo variant="white" className="py-1" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleMenuClick(item.path)}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "text-white hover:bg-white/10",
                  location.pathname === item.path && "bg-white/20"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className={cn(
                "p-2 rounded-full transition-all-200",
                isSearchOpen
                  ? "bg-white text-[#15253C]"
                  : "hover:bg-white/10"
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Button
              className="bg-guay-green hover:bg-guay-green/90 text-white rounded-full"
            >
              Configuración
            </Button>
          </div>
        </div>
        
        {/* Navigation for secondary items if needed */}
        <nav className="hidden lg:block border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex">
              {location.pathname.includes('/rastro') && (
                <li className="flex items-center py-2 text-sm">
                  <span className="text-guay-green">Rastro</span>
                  <span className="mx-2">/</span>
                  <span className="text-guay-green">Rastro</span>
                  <span className="mx-2">/</span>
                  <span>Rastro</span>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-[#15253C] text-white shadow-md transition-all duration-300 transform lg:hidden",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-white hover:bg-white/10",
                location.pathname === item.path && "bg-white/20"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      </div>

      <div className="h-16"></div>
    </>
  );
};

export default Header;
