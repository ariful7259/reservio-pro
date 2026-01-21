
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';

interface RentalCardProps {
  listing: {
    id: number | string;
    title: string;
    location: string;
    price: string;
    image: string;
    category?: string;
    rating?: number;
    reviews?: number;
    featured?: boolean;
    availability?: boolean;
  };
  onBookmark?: (e: React.MouseEvent, id: number | string) => void;
  onShare?: (e: React.MouseEvent, listing: any) => void;
  onClick?: () => void;
  showActions?: boolean;
}

const RentalCard: React.FC<RentalCardProps> = ({
  listing,
  onBookmark,
  onShare,
  onClick,
  showActions = true
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useShoppingState();

  const handleRentNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/rental-booking/${listing.id}`, {
      state: {
        rental: {
          id: listing.id,
          title: listing.title,
          location: listing.location,
          price: listing.price,
          image: listing.image,
          category: listing.category
        }
      }
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: listing.id.toString(),
      title: listing.title,
      price: listing.price,
      image: listing.image,
    });
    toast({
      title: "কার্টে যোগ হয়েছে",
      description: `${listing.title} কার্টে যোগ করা হয়েছে`,
    });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(e, listing.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(e, listing);
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img 
            src={listing.image} 
            alt={listing.title} 
            className="w-full h-full object-cover" 
          />
          {listing.category && (
            <Badge className="absolute top-2 left-2">{listing.category}</Badge>
          )}
          {listing.featured && (
            <Badge className="absolute top-2 left-2" variant="default">ফিচার্ড</Badge>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white h-8 w-8 rounded-full" 
              onClick={handleBookmarkClick}
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white h-8 w-8 rounded-full" 
              onClick={handleShareClick}
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{listing.location}</p>
          </div>
          
          {listing.rating && (
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{listing.rating}</span>
              {listing.reviews && (
                <span className="text-xs text-muted-foreground">({listing.reviews})</span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-primary">{listing.price}</p>
            {listing.availability && (
              <Badge variant="outline" className="text-xs text-green-600">
                উপলব্ধ
              </Badge>
            )}
          </div>
          
          {showActions && (
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                className="flex-1 text-xs h-8"
                onClick={handleRentNow}
              >
                ভাড়া দিন
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 px-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalCard;
