
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
  const logoSrc = 
    variant === 'white' ? '/guay-logo-white.png' : 
    variant === 'dark' ? '/guay-logo-dark.png' : 
    '/guay-logo.png';

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoSrc} 
        alt="GUAY Logo" 
        className="h-8" 
      />
      {showText && (
        <span className="ml-2 text-sm text-muted-foreground">
          Wellness Marketplace
        </span>
      )}
    </div>
  );
};

export default GuayLogo;
