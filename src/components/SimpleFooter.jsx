
import React from "react";

const SimpleFooter = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © 2024 GUAY. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Términos de servicio
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Política de privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
