
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  provider?: string;
  imageUrl: string;
  rating: number;
  price: number | string;
  discount?: number;
  duration?: string;
  location?: string;
  tags?: string[];
  buttonLabel?: string;
  onClick: (id: string | number) => void;
  service?: any; // For backwards compatibility
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  provider = "",
  imageUrl,
  rating,
  price,
  discount,
  duration,
  location,
  tags = [],
  buttonLabel = "বুক করুন",
  onClick,
  service, // For backwards compatibility
}) => {
  // For backwards compatibility with existing code
  if (service) {
    id = service.id || id;
    title = service.title || title;
    imageUrl = service.imageUrl || imageUrl;
    rating = service.rating || rating;
    price = service.price || price;
    location = service.location || location;
  }
  
  const discountedPrice = discount ? Number(price) - (Number(price) * discount) / 100 : price;

  return (
    <Card className="overflow-hidden border service-card transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {provider && <p className="text-muted-foreground text-sm">{provider}</p>}
            {location && (
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" /> 
                <span>{location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-primary font-semibold">
              ৳{discountedPrice}
            </span>
            {discount && (
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
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
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
