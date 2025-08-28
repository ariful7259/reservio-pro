import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  interactive = false,
  header,
  footer,
  onClick
}) => {
  const getVariantClasses = () => {
    const variants = {
      default: 'border bg-card shadow-sm',
      elevated: 'border-0 bg-card shadow-lg',
      outlined: 'border-2 bg-card shadow-none',
      glass: 'glass-effect border border-white/20'
    };
    return variants[variant];
  };

  const getPaddingClasses = () => {
    const paddings = {
      sm: 'p-2 sm:p-3',
      md: 'p-3 sm:p-4 md:p-6',
      lg: 'p-4 sm:p-6 md:p-8'
    };
    return paddings[padding];
  };

  const interactiveClasses = interactive ? 
    'cursor-pointer hover-lift-mobile touch-manipulation tap-highlight-none transition-smooth' : 
    '';

  return (
    <Card 
      className={cn(
        'rounded-lg',
        getVariantClasses(),
        interactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {header && (
        <CardHeader className={getPaddingClasses()}>
          {header}
        </CardHeader>
      )}
      
      <CardContent className={cn(getPaddingClasses(), header && 'pt-0')}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className={cn(getPaddingClasses(), 'pt-0')}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default MobileOptimizedCard;