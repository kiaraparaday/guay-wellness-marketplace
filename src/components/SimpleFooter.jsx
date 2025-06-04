
import React from "react";

const SimpleFooter = () => {
  return (
    <footer className="py-8 px-6 bg-white border-t border-gray-200 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-blue-600">GUAY</h2>
        </div>
        
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} guay. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
