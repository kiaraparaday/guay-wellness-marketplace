
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
  // Update to use the new logo path
  const logoSrc = '/lovable-uploads/450a23d6-8055-47fd-b5f5-c9d28bbd23d8.png';

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
