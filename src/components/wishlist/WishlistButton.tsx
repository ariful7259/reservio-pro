import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEnhancedWishlist } from '@/hooks/useEnhancedWishlist';

interface WishlistButtonProps {
  productId?: string;
  serviceId?: string;
  itemType: 'product' | 'service';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  metadata?: any;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  serviceId,
  itemType,
  className,
  size = 'md',
  variant = 'ghost',
  metadata
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, wishlistItems } = useEnhancedWishlist();

  const inWishlist = isInWishlist(productId, serviceId);
  
  const wishlistItem = wishlistItems.find(item => 
    (productId && item.product_id === productId) || 
    (serviceId && item.service_id === serviceId)
  );

  const handleToggle = async () => {
    if (inWishlist && wishlistItem) {
      await removeFromWishlist(wishlistItem.id);
    } else {
      await addToWishlist({
        product_id: productId,
        service_id: serviceId,
        item_type: itemType,
        metadata
      });
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <Button
      variant={variant}
      size="icon"
      className={cn(
        sizeClasses[size],
        'transition-all duration-200',
        inWishlist && 'text-red-500 hover:text-red-600',
        className
      )}
      onClick={handleToggle}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          'transition-all duration-200',
          inWishlist && 'fill-current'
        )} 
      />
    </Button>
  );
};