
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, User, LogOut, LogIn, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import SearchBar from "./SearchBar";
import GuayLogo from "./GuayLogo";
import { Button } from "./ui/button";
import { filterEventBus } from "../services/eventBus";
import { logoutUser } from "../services/firebaseService";
import { useAuth } from "../contexts/AuthContext";
import UserRegistrationModal from "./UserRegistrationModal";
import UserLoginModal from "./UserLoginModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

export { filterEventBus };

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { label: "Inicio", path: "/" },
    { 
      label: "Soluciones", 
      path: "/solutions",
      isDropdown: true,
      subItems: [
        { 
          label: "Por dimensión", 
          path: "/#dimensiones",
          description: "Explora por tipo de necesidad de tu organización"
        },
        { 
          label: "Catálogo completo", 
          path: "/solutions",
          description: "Ve todas las soluciones con filtros"
        }
      ]
    },
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

  const handleMenuClick = (path) => {
    if (path.includes('#')) {
      // Handle anchor links
      const [route, anchor] = path.split('#');
      if (route === '/') {
        // If we're going to home page with anchor
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
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
      console.log("Logging out user...");
      await logoutUser();
      toast.success("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleAuthSuccess = () => {
    console.log("Authentication successful, user data will be refreshed automatically");
  };

  // Get display name for user
  const getUserDisplayName = () => {
    if (userData?.nombre) {
      return userData.nombre.split(' ')[0]; // First name only
    }
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'Usuario';
  };

  return (
    <>
      {/* Fixed Header - Azul marino institucional con logo centrado */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131F36] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 h-16">
          {/* Icono hamburguesa (solo mobile) */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Espacio vacío en desktop para centrar el logo */}
            <div className="hidden lg:block w-20"></div>
          </div>

          {/* Logo centrado */}
          <Link to="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
            <GuayLogo variant="white" className="py-1" />
          </Link>

          {/* Botones a la derecha */}
          <div className="flex items-center space-x-3">
            {/* Botón de búsqueda */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Botón Usuario - Verde institucional */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-[#A6B94C] hover:bg-[#A6B94C]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2 font-medium"
                  size="sm"
                  disabled={loading}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {loading ? 'Cargando...' : currentUser ? getUserDisplayName() : 'Usuario'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] bg-white">
                {currentUser ? (
                  <>
                    <DropdownMenuLabel className="font-medium">{getUserDisplayName()}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal">{currentUser.email}</DropdownMenuLabel>
                    {userData?.empresa && (
                      <DropdownMenuLabel className="text-sm text-gray-500">{userData.empresa}</DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
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

      {/* Barra de navegación - Separada debajo del header */}
      <nav className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center justify-center space-x-2 py-3">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.isDropdown ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 font-quicksand bg-transparent border-0",
                            (location.pathname === "/solutions" || location.pathname.startsWith("/solutions"))
                              ? "bg-[#131F36] text-white hover:bg-[#131F36]/90"
                              : "text-[#131F36] hover:bg-gray-100"
                          )}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-2 min-w-[300px]">
                          <div className="space-y-1">
                            {item.subItems?.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => handleMenuClick(subItem.path)}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-medium text-[#131F36] mb-1">{subItem.label}</div>
                                <div className="text-sm text-gray-600">{subItem.description}</div>
                              </button>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleMenuClick(item.path)}
                        variant="ghost"
                        className={cn(
                          "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 font-quicksand",
                          location.pathname === item.path
                            ? "bg-[#131F36] text-white hover:bg-[#131F36]/90"
                            : "text-[#131F36] hover:bg-gray-100"
                        )}
                      >
                        {item.label}
                      </Button>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-30 bg-white shadow-lg transition-all duration-300 transform lg:hidden border-b border-gray-200",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.isDropdown ? (
                <div className="space-y-1">
                  <div className="font-medium text-[#131F36] px-4 py-2 text-sm">{item.label}</div>
                  {item.subItems?.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      onClick={() => handleMenuClick(subItem.path)}
                      variant="ghost"
                      className="w-full justify-start rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 font-quicksand text-[#131F36] hover:bg-gray-100"
                    >
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <Button
                  onClick={() => handleMenuClick(item.path)}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 font-quicksand",
                    location.pathname === item.path
                      ? "bg-[#131F36] text-white hover:bg-[#131F36]/90"
                      : "text-[#131F36] hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-white shadow-lg transition-all duration-300 transform",
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
        onSuccess={handleAuthSuccess}
      />
      
      <UserRegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        onSuccess={handleAuthSuccess}
        onLoginClick={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Spacer for fixed headers - Ajustado para ambos headers */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;
