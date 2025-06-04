
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">GUAY</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Inicio
            </a>
            <a href="/solutions" className="text-gray-700 hover:text-blue-600 transition-colors">
              Soluciones
            </a>
            <a href="/nosotras" className="text-gray-700 hover:text-blue-600 transition-colors">
              Nosotras
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
