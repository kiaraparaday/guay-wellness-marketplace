
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, User, LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import GuayLogo from "./GuayLogo";
import { Button } from "@/components/ui/button";
import { filterEventBus } from "@/services/eventBus";
import { auth, logoutUser } from "@/services/firebaseService";
import { onAuthStateChanged } from "firebase/auth";
import UserRegistrationModal from "./UserRegistrationModal";
import UserLoginModal from "./UserLoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export { filterEventBus };

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || user.email?.split('@')[0] || "Usuario");
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);
  
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Soluciones", path: "/solutions" },
    { label: "Testimonios", path: "/testimonials" },
    { label: "Agenda una cita", path: "/appointment" },
    { label: "Sobre guay", path: "/nosotras" },
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

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegister = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleLoginSuccess = () => {
    // Refresh user data or perform any other necessary actions after successful login
  };

  return (
    <>
      {/* Fixed Header with Logo only */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#15253C] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-guay-green hover:bg-guay-green/90 text-white rounded-full flex items-center gap-1.5"
                  variant="accent"
                >
                  <User className="w-4 h-4" />
                  {isLoggedIn ? userName : 'Usuario'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] bg-white">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Iniciar sesión</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleRegister} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Registrarse</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Navigation Menu Bar - Separated below header */}
      <nav className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center space-x-1 py-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleMenuClick(item.path)}
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-[#15253C] text-white hover:bg-[#15253C]/90"
                    : "text-[#15253C] hover:bg-gray-100"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-[64px] left-0 right-0 z-30 bg-white shadow-md transition-all duration-300 transform lg:hidden border-b border-gray-200",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                location.pathname === item.path
                  ? "bg-[#15253C] text-white hover:bg-[#15253C]/90"
                  : "text-[#15253C] hover:bg-gray-100"
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
          "fixed top-[64px] left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 transform",
          isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      </div>

      {/* Modals */}
      <UserLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onRegisterClick={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
        onSuccess={handleLoginSuccess}
      />
      
      <UserRegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        onSuccess={handleLoginSuccess}
      />

      {/* Spacer for fixed headers */}
      <div className="h-[112px]"></div>
    </>
  );
};

export default Header;
