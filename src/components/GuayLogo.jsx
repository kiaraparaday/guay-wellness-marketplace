
import React from 'react';
import { cn } from '@/lib/utils';

const GuayLogo = ({ 
  variant = 'default', 
  className, 
  showText = false 
}) => {
  // Usar el nuevo logo correcto subido
  const logoSrc = '/lovable-uploads/a1d1e359-e962-4e52-b636-4798b8413045.png';

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoSrc} 
        alt="GUAY Logo" 
        className="h-6 md:h-8"
      />
      {showText && (
        <span className={cn(
          "ml-2 text-sm",
          variant === 'default' && "text-muted-foreground",
          variant === 'white' && "text-white",
          variant === 'dark' && "text-guay-dark-blue"
        )}>
          Wellness Marketplace
        </span>
      )}
    </div>
  );
};

export default GuayLogo;
