import React from 'react';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEnhancedWishlist } from '@/hooks/useEnhancedWishlist';

interface WishlistCounterProps {
  className?: string;
  onClick?: () => void;
  showIcon?: boolean;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const WishlistCounter: React.FC<WishlistCounterProps> = ({
  className,
  onClick,
  showIcon = true,
  variant = 'secondary'
}) => {
  const { wishlistCount } = useEnhancedWishlist();

  if (wishlistCount === 0) return null;

  const content = (
    <div className={cn('flex items-center gap-1', className)}>
      {showIcon && <Heart className="h-4 w-4" />}
      <Badge variant={variant} className="animate-scale-in">
        {wishlistCount}
      </Badge>
    </div>
  );

  if (onClick) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="h-auto p-1"
      >
        {content}
      </Button>
    );
  }

  return content;
};