
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Star,
  Share2,
  Heart,
  Phone
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RentalItem {
  id: string;
  title: string;
  provider?: string;
  location: string;
  price: string;
  image?: string;
  images?: string[];
  category: string;
  rating?: number;
  reviews?: number;
  subcategory?: string;
}

interface RentalCardProps {
  rental: RentalItem;
  onShare?: (e: React.MouseEvent, rental: RentalItem) => void;
}

const RentalCard: React.FC<RentalCardProps> = ({ rental, onShare }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRentalClick = () => {
    navigate(`/rental-details/${rental.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টালটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleRentNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/rental-booking/${rental.id}`, {
      state: { rental: rental }
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    if (onShare) {
      onShare(e, rental);
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={handleRentalClick}
    >
      <div className="relative aspect-square">
        <img 
          src={rental.image || rental.images?.[0] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop"} 
          alt={rental.title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 left-2">{rental.subcategory || rental.category}</Badge>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white h-8 w-8 rounded-full"
            onClick={handleBookmark}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white h-8 w-8 rounded-full"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{rental.title}</h3>
        {rental.provider && (
          <p className="text-xs text-muted-foreground mb-1">{rental.provider}</p>
        )}
        <div className="flex items-center text-xs text-muted-foreground my-1">
          <MapPin className="h-3 w-3 mr-1" /> 
          <span>{rental.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-primary">{rental.price}</p>
          {rental.rating && (
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{rental.rating}</span>
              {rental.reviews && (
                <span className="text-xs text-muted-foreground ml-1">({rental.reviews})</span>
              )}
            </div>
          )}
        </div>
        <Button 
          className="w-full mt-3"
          size="sm"
          onClick={handleRentNow}
        >
          <Phone className="h-4 w-4 mr-2" /> ভাড়া নিন
        </Button>
      </CardContent>
    </Card>
  );
};

export default RentalCard;
