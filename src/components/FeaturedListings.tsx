
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MapPin, Star, Heart, Share2 } from "lucide-react";
import CategoryTabs from "./CategoryTabs";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedListing {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  category: string;
  path: string;
}

interface FeaturedListingsProps {
  allListings: FeaturedListing[];
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({ allListings }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const getListings = (cat: string) =>
    allListings.filter(item => {
      if (cat === "all") return true;
      if (cat === "rent") return item.category === "রেন্ট";
      if (cat === "services") return item.category === "সার্ভিস";
      if (cat === "marketplace") return item.category === "মার্কেটপ্লেস";
      return false;
    });

  const handleListingClick = (path: string) => navigate(path);

  const handleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Add to favorites logic
  };

  const handleShare = (e: React.MouseEvent, listing: FeaturedListing) => {
    e.stopPropagation();
    // Share functionality
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>ফিচার্ড লিস্টিং</h2>
      </div>
      
      <CategoryTabs active={activeTab} setActive={setActiveTab} />
      
      <div className="mt-4">
        {loading ? (
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
            {Array.from({ length: isMobile ? 3 : 4 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-gray-100">
                <Skeleton className={`w-full mb-3 ${isMobile ? 'h-48' : 'h-40'}`} />
                <div className="p-3">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
            {getListings(activeTab).map(listing => (
              <Card
                key={`${activeTab}-${listing.id}-${listing.category}`}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 hover:border-primary 
                  active:scale-100 duration-200 card-hover-effect"
                onClick={() => handleListingClick(listing.path)}
              >
                {isMobile ? (
                  // Mobile horizontal layout
                  <div className="flex h-32">
                    <div className="relative w-32 flex-shrink-0">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                      <Badge className="absolute top-1 left-1 text-xs px-1 py-0.5">{listing.category}</Badge>
                      <div className="absolute top-1 right-1 flex gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white/90 h-6 w-6 rounded-full shadow-sm"
                          onClick={(e) => handleFavorite(e, listing.id)}
                        >
                          <Heart className="h-3 w-3 text-gray-600" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white/90 h-6 w-6 rounded-full shadow-sm"
                          onClick={(e) => handleShare(e, listing)}
                        >
                          <Share2 className="h-3 w-3 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">{listing.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">{listing.price}</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                ) : (
                  // Desktop vertical layout
                  <>
                    <div className="relative aspect-square">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                      <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                      <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleFavorite(e, listing.id)}
                        >
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleShare(e, listing)}
                        >
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-bold text-primary">{listing.price}</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          className={`flex items-center gap-1 animate-pulse-soft shadow-button button-pop ${
            isMobile ? 'w-full' : ''
          }`}
          onClick={() => {
            if (activeTab === "all") navigate("/shopping");
            else if (activeTab === "rent") navigate("/rentals");
            else if (activeTab === "services") navigate("/services");
            else if (activeTab === "marketplace") navigate("/marketplace");
          }}
        >
          {activeTab === "all" ? "সব দেখুন" : "আরও দেখুন"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedListings;
