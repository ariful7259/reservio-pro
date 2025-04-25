
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
}

export const AnimatedCard = ({
  children,
  className,
  delay = 0,
  onClick,
  hoverEffect = 'lift'
}: AnimatedCardProps) => {
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'lift':
        return { y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)' };
      case 'scale':
        return { scale: 1.02 };
      case 'glow':
        return { boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300',
        hoverEffect !== 'none' && 'cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      whileHover={getHoverAnimation()}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredCardGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div 
      className={cn('grid', className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
