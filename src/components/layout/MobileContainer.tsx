import React from 'react';
import { cn } from '@/lib/utils';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
}

const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  fullHeight = false
}) => {
  const getMaxWidthClass = () => {
    const widths = {
      sm: 'max-w-sm',
      md: 'max-w-md', 
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full'
    };
    return widths[maxWidth];
  };

  const getPaddingClass = () => {
    const paddings = {
      none: '',
      sm: 'px-3 py-2 sm:px-4 sm:py-3',
      md: 'px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6',
      lg: 'px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8'
    };
    return paddings[padding];
  };

  return (
    <div 
      className={cn(
        'w-full mx-auto',
        getMaxWidthClass(),
        getPaddingClass(),
        fullHeight && 'min-h-screen',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MobileContainer;