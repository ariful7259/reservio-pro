
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description?: string;
  image?: string;
  provider?: string;
  imageUrl?: string;
  rating: number;
  price: string | number;
  discount?: number;
  duration?: string;
  tags?: string[];
  buttonLabel?: string;
  location?: string;
  onClick: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  provider,
  image,
  imageUrl,
  rating,
  price,
  discount,
  duration,
  tags = [],
  buttonLabel = "বুক করুন",
  location,
  onClick,
}) => {
  // Use either image or imageUrl prop
  const imageSource = image || imageUrl;
  
  // Handle price as either string or number
  const priceDisplay = typeof price === 'string' ? price : `৳${price}`;
  
  // Calculate discounted price if applicable
  const discountedPrice = discount && typeof price === 'number' ? 
    price - (price * discount) / 100 : price;

  return (
    <Card className="overflow-hidden border service-card transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div className="h-48 overflow-hidden">
        <img
          src={imageSource}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {provider && <p className="text-muted-foreground text-sm">{provider}</p>}
            {description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>}
          </div>
          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold">
              {typeof discountedPrice === 'number' ? `৳${discountedPrice}` : discountedPrice}
            </span>
            {discount && typeof price === 'number' && (
              <span className="text-muted-foreground text-sm line-through">
                ৳{price}
              </span>
            )}
            {duration && (
              <span className="text-xs text-muted-foreground ml-auto">
                {duration}
              </span>
            )}
          </div>
          
          {location && (
            <div className="text-xs text-muted-foreground">
              {location}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="default"
          className="w-full"
          onClick={() => onClick(id)}
        >
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
