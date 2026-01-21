
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedWishlist } from '@/hooks/useEnhancedWishlist';
import { useToast } from '@/hooks/use-toast';
import RentalCard from './RentalCard';

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
}) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useEnhancedWishlist();
  const { toast } = useToast();

  const handleWishlistToggle = async (e: React.MouseEvent, listing: any) => {
    e.stopPropagation();
    
    const isCurrentlyInWishlist = isInWishlist(undefined, listing.id.toString());
    
    try {
      if (isCurrentlyInWishlist) {
        await removeFromWishlist(listing.id.toString());
        toast({
          title: "উইশলিস্ট থেকে সরানো হয়েছে",
          description: `${listing.title} উইশলিস্ট থেকে সরানো হয়েছে`,
          variant: "destructive",
        });
      } else {
        await addToWishlist({
          service_id: listing.id.toString(),
          item_type: 'service',
          metadata: {
            title: listing.title,
            price: listing.price,
            image: listing.image,
            location: listing.location,
            category: listing.category
          }
        });
        toast({
          title: "উইশলিস্ট যোগ করা হয়েছে",
          description: `${listing.title} উইশলিস্টে যোগ করা হয়েছে`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredListings.map(listing => (
            <RentalCard
              key={listing.id}
              listing={{
                ...listing,
                featured: true,
                availability: true
              }}
              onBookmark={(e) => handleWishlistToggle(e, listing)}
              onShare={handleShare}
              onClick={() => handleListingClick(listing.id)}
              showActions={true}
            />
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
              <RentalCard
                key={listing.id}
                listing={{
                  ...listing,
                  featured: true,
                  availability: true
                }}
                onBookmark={(e) => handleWishlistToggle(e, listing)}
                onShare={handleShare}
                onClick={() => handleListingClick(listing.id)}
                showActions={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedListings;
