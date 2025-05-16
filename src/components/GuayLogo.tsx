
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
  // Use the direct path to the image in the public folder
  const logoSrc = '/lovable-uploads/ad18a7b7-67f7-4cf8-b003-e35fb2355a01.png';

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
