
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';

interface FeaturedListingsProps {
  featuredListings: any[];
  viewMode: 'grid' | 'map';
  handleListingClick: (id: number) => void;
  handleBookmark: (e: React.MouseEvent, id: number) => void;
  handleShare: (e: React.MouseEvent, rental: any) => void;
  MapViewComponent: React.ElementType;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  featuredListings,
  viewMode,
  handleListingClick,
  handleBookmark,
  handleShare,
  MapViewComponent
}) => (
  <div className="mb-6">
    <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
    {viewMode === 'grid' && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featuredListings.map(listing => (
          <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleListingClick(listing.id)}>
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleBookmark(e, listing.id)}>
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleShare(e, listing)}>
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">{listing.location}</p>
                <p className="text-sm font-bold text-primary">{listing.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
    {viewMode === 'map' && (
      <div className="mb-4">
        <MapViewComponent listings={featuredListings.map(listing => ({
          id: listing.id,
          title: listing.title,
          location: listing.location,
          latitude: listing.latitude,
          longitude: listing.longitude
        }))} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {featuredListings.slice(0, 3).map(listing => (
            <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={() => handleListingClick(listing.id)}>
              <div className="flex h-24">
                <div className="w-1/3">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-2">
                  <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                  <p className="text-xs text-muted-foreground">{listing.location}</p>
                  <p className="text-sm font-bold text-primary mt-auto">{listing.price}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default FeaturedListings;
