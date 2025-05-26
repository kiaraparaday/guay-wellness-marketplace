
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
  // Usar la nueva imagen del logo subida
  const logoSrc = '/lovable-uploads/43ea05ad-4bc5-42ff-ad25-53212843a9a7.png';

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
