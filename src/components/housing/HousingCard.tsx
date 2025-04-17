
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HousingCardProps {
  listing: {
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: string;
    isAvailable: boolean;
  };
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  language: 'bn' | 'en';
}

const HousingCard: React.FC<HousingCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  language
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'}`}>
        <div className={`${isMobile ? 'w-full h-48' : 'sm:w-1/3'} relative`}>
          <img 
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 sm:h-full object-cover"
            onClick={() => navigate(`/rent/${listing.id}`)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={onToggleFavorite}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        <CardContent className={`p-4 ${isMobile ? 'w-full' : 'sm:w-2/3'} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <h3 
                className="font-semibold text-lg cursor-pointer line-clamp-1"
                onClick={() => navigate(`/rent/${listing.id}`)}
              >
                {listing.title}
              </h3>
              <Badge variant={listing.isAvailable ? "default" : "secondary"}>
                {listing.isAvailable 
                  ? language === 'bn' ? 'উপলব্ধ' : 'Available'
                  : language === 'bn' ? 'ভাড়া হয়ে গেছে' : 'Rented'}
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" /> <span className="line-clamp-1">{listing.location}</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center text-sm">
                <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} {language === 'bn' ? 'বেড' : 'Bed'}
              </div>
              <div className="flex items-center text-sm">
                <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} {language === 'bn' ? 'বাথ' : 'Bath'}
              </div>
              <div className="flex items-center text-sm">
                <Square className="h-4 w-4 mr-1" /> {listing.area} {language === 'bn' ? 'বর্গফুট' : 'sqft'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-bold">৳ {listing.price.toLocaleString()}/{language === 'bn' ? 'মাস' : 'month'}</div>
            <Button 
              size="sm" 
              onClick={() => navigate(`/rent/${listing.id}`)}
              className="gap-1"
            >
              {language === 'bn' ? 'বিস্তারিত' : 'Details'}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default HousingCard;
