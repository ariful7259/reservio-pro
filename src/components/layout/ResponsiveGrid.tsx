import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  minItemWidth?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  columns = { mobile: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  minItemWidth
}) => {
  const getGridColumns = () => {
    if (minItemWidth) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }

    const { mobile = 1, sm = 2, md = 3, lg = 4, xl = lg } = columns;
    
    let classes = [`grid-cols-${mobile}`];
    
    if (sm !== mobile) classes.push(`sm:grid-cols-${sm}`);
    if (md !== sm) classes.push(`md:grid-cols-${md}`);
    if (lg !== md) classes.push(`lg:grid-cols-${lg}`);
    if (xl !== lg) classes.push(`xl:grid-cols-${xl}`);
    
    return classes.join(' ');
  };

  const getGapClass = () => {
    const gaps = {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4 sm:gap-6',
      lg: 'gap-6 sm:gap-8',
      xl: 'gap-8 sm:gap-10'
    };
    return gaps[gap];
  };

  return (
    <div 
      className={cn(
        'grid w-full',
        getGridColumns(),
        getGapClass(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;