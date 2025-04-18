import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
}) => {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookClick = () => {
    // First call the original onClick handler
    onClick(id);
    
    // Show toast
    toast({
      title: "বুকিং",
      description: `${title} বুক করা হচ্ছে...`,
    });
    
    // Navigate to booking page
    setTimeout(() => {
      navigate(`/service-booking/${id}`);
    }, 500);
  };

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

  return (
    <Card 
      className="overflow-hidden border service-card transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
      style={{
        borderRadius: 'var(--service-card-border-radius)',
        boxShadow: 'var(--service-card-shadow)',
        backgroundColor: 'var(--service-card-background)',
        transition: `all var(--service-card-transition-speed) ease-in-out`,
        ...cardStyle
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
        className="p-4"
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
            <p className="text-muted-foreground text-sm">{provider}</p>
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
      <CardFooter className="p-4 pt-0">
        <Button
          variant="default"
          className="w-full"
          onClick={handleBookClick}
        >
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
