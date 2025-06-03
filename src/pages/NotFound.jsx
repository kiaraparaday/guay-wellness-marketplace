
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-guay-purple/20 text-guay-purple mb-4">
            <span className="text-5xl font-bold">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-guay-dark-blue">Página no encontrada</h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o está en desarrollo.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-guay-dark-blue">¿Qué puedes hacer ahora?</h2>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <Home className="h-5 w-5 text-guay-green" />
              </div>
              <div>
                <Link to="/" className="text-guay-green font-medium hover:underline">
                  Ir a la página principal
                </Link>
                <p className="text-sm text-gray-500">Visita nuestra página de inicio para explorar Guay</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <Search className="h-5 w-5 text-guay-orange" />
              </div>
              <div>
                <Link to="/solutions" className="text-guay-orange font-medium hover:underline">
                  Explorar soluciones
                </Link>
                <p className="text-sm text-gray-500">Descubre todas nuestras soluciones de bienestar</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <ArrowLeft className="h-5 w-5 text-guay-purple" />
              </div>
              <div>
                <Button 
                  variant="ghost" 
                  className="text-guay-purple font-medium p-0 h-auto hover:bg-transparent hover:underline"
                  onClick={() => window.history.back()}
                >
                  Volver a la página anterior
                </Button>
                <p className="text-sm text-gray-500">Regresa a donde estabas antes</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-guay-green hover:bg-guay-green/90">
            <Link to="/">Página principal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/appointment">Agendar una cita</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
