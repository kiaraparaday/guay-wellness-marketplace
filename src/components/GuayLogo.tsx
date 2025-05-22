
import React from 'react';
import { cn } from '@/lib/utils';

interface GuayLogoProps {
  variant?: 'default' | 'white' | 'dark';
  className?: string;
  showText?: boolean;
}

const GuayLogo: React.FC<GuayLogoProps> = ({ 
  variant = 'default', 
  className, 
  showText = false 
}) => {
  // Usar la ruta del logo actualizado
  const logoSrc = '/guay-logo.png';

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoSrc} 
        alt="GUAY Logo" 
        className={cn(
          "h-6 md:h-8",
          variant === 'white' && "brightness-100" // Mantener el logo original en lugar de invertirlo
        )}
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
