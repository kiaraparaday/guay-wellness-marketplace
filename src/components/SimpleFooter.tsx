
import React from "react";

const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-8 px-6 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
            GUAY
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            Wellness Marketplace
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Guay. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
