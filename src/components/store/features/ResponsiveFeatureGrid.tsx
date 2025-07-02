
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveFeatureGridProps {
  children: React.ReactNode;
  mobileColumns?: number;
  tabletColumns?: number;
  desktopColumns?: number;
  gap?: 'sm' | 'md' | 'lg';
}

const ResponsiveFeatureGrid: React.FC<ResponsiveFeatureGridProps> = ({
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'md'
}) => {
  const isMobile = useIsMobile();
  
  const getGapClass = () => {
    switch (gap) {
      case 'sm': return 'gap-3';
      case 'lg': return 'gap-8';
      default: return 'gap-4 md:gap-6';
    }
  };

  const getGridClass = () => {
    return `grid grid-cols-${mobileColumns} md:grid-cols-${tabletColumns} lg:grid-cols-${desktopColumns} ${getGapClass()}`;
  };

  return (
    <div className={getGridClass()}>
      {children}
    </div>
  );
};

export default ResponsiveFeatureGrid;
