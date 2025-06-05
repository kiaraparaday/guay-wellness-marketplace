
import React from "react";

const SimpleFooter = () => {
  return (
    <footer className="py-8 px-6 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-blue-400">GUAY</h2>
        </div>
        
        <div className="text-sm text-gray-300">
          © {new Date().getFullYear()} guay. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
