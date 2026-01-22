
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  rating: number;
  price: number;
  discount?: number;
  duration: string;
  tags?: string[];
  buttonLabel?: string;
  onClick: (id: string) => void;
  variant?: 'default' | 'compact';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  provider,
  imageUrl,
  rating,
  price,
  discount,
  duration,
  tags = [],
  buttonLabel = "বুক করুন",
  onClick,
  variant = 'default',
}) => {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const isCompact = variant === 'compact';

  // CSS ভেরিয়েবলগুলি থেকে স্টাইল পাবে - এই ভেরিয়েবলগুলি অ্যাডমিন প্যানেল থেকে সেট করা হবে
  const cardStyle = {
    '--service-card-border-radius': 'var(--service-card-border-radius, 0.75rem)',
    '--service-card-shadow': 'var(--service-card-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))',
    '--service-card-background': 'var(--service-card-background, white)',
    '--service-card-image-height': 'var(--service-card-image-height, 48%)',
    '--service-card-text-color': 'var(--service-card-text-color, inherit)',
    '--service-card-title-size': 'var(--service-card-title-size, 1.125rem)',
    '--service-card-transition-speed': 'var(--service-card-transition-speed, 300ms)',
    '--service-card-hover-scale': 'var(--service-card-hover-scale, 1.05)',
  } as React.CSSProperties;

  const compactOverrides = isCompact
    ? ({
        '--service-card-image-height': 'var(--service-card-image-height-compact, 10rem)',
        '--service-card-title-size': 'var(--service-card-title-size-compact, 1rem)',
        '--service-card-hover-scale': 'var(--service-card-hover-scale-compact, 1.02)',
      } as React.CSSProperties)
    : ({} as React.CSSProperties);

  return (
    <Card 
      className="overflow-hidden border service-card transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
      style={{
        borderRadius: 'var(--service-card-border-radius)',
        boxShadow: 'var(--service-card-shadow)',
        backgroundColor: 'var(--service-card-background)',
        transition: `all var(--service-card-transition-speed) ease-in-out`,
        ...cardStyle,
        ...compactOverrides
      }}
    >
      <div 
        className="overflow-hidden"
        style={{
          height: 'var(--service-card-image-height, 12rem)'
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent 
        className={isCompact ? "p-3 sm:p-4" : "p-4"}
        style={{
          color: 'var(--service-card-text-color)'
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 
              className="font-semibold"
              style={{
                fontSize: 'var(--service-card-title-size, 1.125rem)'
              }}
            >
              {title}
            </h3>
            <p className={isCompact ? "text-muted-foreground text-xs sm:text-sm" : "text-muted-foreground text-sm"}>{provider}</p>
          </div>
          <div className={isCompact ? "flex items-center gap-1 bg-amber-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-amber-700" : "flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700"}>
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
              <span className={isCompact ? "text-muted-foreground text-xs sm:text-sm line-through" : "text-muted-foreground text-sm line-through"}>
                ৳{price}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {duration}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className={isCompact ? "p-3 sm:p-4 pt-0" : "p-4 pt-0"}>
        <Button
          variant="default"
          className={isCompact ? "w-full h-8 sm:h-10 text-xs sm:text-sm" : "w-full"}
          onClick={() => onClick(id)}
        >
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
