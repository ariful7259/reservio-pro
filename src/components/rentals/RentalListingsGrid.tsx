
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Heart, Share2, Calendar } from 'lucide-react';

interface RentalItem {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  category: string;
  rating: number;
}

interface RentalListingsGridProps {
  listings: RentalItem[];
  onListingClick: (id: number) => void;
  onBookmark: (e: React.MouseEvent, id: number) => void;
  onShare: (e: React.MouseEvent, rental: RentalItem) => void;
  onBookNow: (e: React.MouseEvent, id: number) => void;
}

const RentalListingsGrid: React.FC<RentalListingsGridProps> = ({
  listings,
  onListingClick,
  onBookmark,
  onShare,
  onBookNow
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <Card 
          key={listing.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
          onClick={() => onListingClick(listing.id)}
        >
          <div className="relative aspect-square">
            <img 
              src={listing.image} 
              alt={listing.title} 
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2">{listing.category}</Badge>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-8 w-8 rounded-full"
                onClick={(e) => onBookmark(e, listing.id)}
              >
                <Heart className="h-4 w-4 text-gray-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-8 w-8 rounded-full"
                onClick={(e) => onShare(e, listing)}
              >
                <Share2 className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-3">
            <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
            <div className="flex items-center text-xs text-muted-foreground my-1">
              <MapPin className="h-3 w-3 mr-1" /> 
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">{listing.price}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs ml-1">{listing.rating}</span>
              </div>
            </div>
            <Button 
              className="w-full mt-3"
              size="sm"
              onClick={(e) => onBookNow(e, listing.id)}
            >
              <Calendar className="h-4 w-4 mr-2" /> বুকিং করুন
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RentalListingsGrid;
