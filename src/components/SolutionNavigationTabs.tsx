
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SolutionNavigationTabsProps {
  activeTab: 'dimensions' | 'catalog';
  onTabChange: (tab: 'dimensions' | 'catalog') => void;
}

const SolutionNavigationTabs: React.FC<SolutionNavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">🔍</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            ¿Cómo deseas explorar las soluciones?
          </h2>
        </div>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Elige la forma que mejor se adapte a tus necesidades organizacionales
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => onTabChange('dimensions')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'dimensions'
                ? 'bg-white text-gray-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Explorar por dimensión
          </button>
          
          <Button
            asChild
            variant="guay-action-primary"
            size="action-primary"
            className="px-6 py-3 text-sm"
          >
            <Link to="/solutions">
              Ver catálogo completo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolutionNavigationTabs;
