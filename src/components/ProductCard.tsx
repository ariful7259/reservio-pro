import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Share2, Star } from 'lucide-react';

export type ProductCardVariant = 'default' | 'compact';

export interface ProductCardProduct {
  id: number | string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  location: string;
  rating?: number;
  reviews?: number;
  isSponsored?: boolean;
}

interface ProductCardProps {
  product: ProductCardProduct;
  onClick?: () => void;
  onBookmark?: (e: React.MouseEvent, id: number | string) => void;
  onShare?: (e: React.MouseEvent, product: ProductCardProduct) => void;
  variant?: ProductCardVariant;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onBookmark,
  onShare,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact';

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(e, product.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(e, product);
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative"
      onClick={onClick}
    >
      {product.isSponsored && (
        <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">
          স্পন্সর্ড
        </Badge>
      )}

      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className={
              isCompact
                ? 'bg-white h-7 w-7 rounded-full sm:h-8 sm:w-8'
                : 'bg-white h-8 w-8 rounded-full'
            }
            onClick={handleBookmarkClick}
          >
            <Heart className={isCompact ? 'h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600' : 'h-4 w-4 text-gray-600'} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={
              isCompact
                ? 'bg-white h-7 w-7 rounded-full sm:h-8 sm:w-8'
                : 'bg-white h-8 w-8 rounded-full'
            }
            onClick={handleShareClick}
          >
            <Share2 className={isCompact ? 'h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600' : 'h-4 w-4 text-gray-600'} />
          </Button>
        </div>
      </div>

      <CardContent className={isCompact ? 'p-2 sm:p-3' : 'p-3'}>
        <h3 className={isCompact ? 'font-medium text-[13px] sm:text-sm line-clamp-1' : 'font-medium text-sm line-clamp-1'}>
          {product.name}
        </h3>

        <div className={isCompact ? 'flex items-center text-[11px] sm:text-xs text-muted-foreground my-1' : 'flex items-center text-xs text-muted-foreground my-1'}>
          <MapPin className={isCompact ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-1'} /> {product.location}
        </div>

        {typeof product.rating === 'number' && (
          <div className={isCompact ? 'flex items-center text-[11px] sm:text-xs text-muted-foreground mb-1' : 'flex items-center text-xs text-muted-foreground mb-1'}>
            <div className="flex items-center">
              <Star className={isCompact ? 'h-3 w-3 fill-yellow-400 text-yellow-400' : 'h-3 w-3 fill-yellow-400 text-yellow-400'} />
              <span className="ml-1">{product.rating}</span>
            </div>
            {typeof product.reviews === 'number' && (
              <>
                <span className="mx-1">•</span>
                <span>{product.reviews} রিভিউ</span>
              </>
            )}
          </div>
        )}

        <div className="flex items-center">
          <span className={isCompact ? 'text-sm sm:text-sm font-bold text-primary' : 'text-sm font-bold text-primary'}>
            {product.price}
          </span>
          {product.originalPrice && (
            <span className={isCompact ? 'text-[11px] sm:text-xs text-muted-foreground line-through ml-2' : 'text-xs text-muted-foreground line-through ml-2'}>
              {product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
