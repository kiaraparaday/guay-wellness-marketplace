
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SolutionNavigationTabsProps {
  onTabChange: (tab: 'dimensions' | 'catalog') => void;
  activeTab: 'dimensions' | 'catalog';
}

const SolutionNavigationTabs: React.FC<SolutionNavigationTabsProps> = ({ 
  onTabChange, 
  activeTab 
}) => {
  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-700 font-quicksand mb-2">
            🔍 ¿Cómo deseas explorar las soluciones?
          </h3>
          <p className="text-sm text-gray-500">
            Elige la forma que mejor se adapte a tus necesidades organizacionales
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-full p-1 border border-gray-200">
            <button
              onClick={() => onTabChange('dimensions')}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 font-quicksand",
                activeTab === 'dimensions'
                  ? "bg-[#131F36] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#131F36] hover:bg-white/50"
              )}
            >
              Explorar por dimensión
            </button>
            <button
              onClick={() => onTabChange('catalog')}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 font-quicksand",
                activeTab === 'catalog'
                  ? "bg-[#131F36] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#131F36] hover:bg-white/50"
              )}
            >
              Ver catálogo completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionNavigationTabs;
