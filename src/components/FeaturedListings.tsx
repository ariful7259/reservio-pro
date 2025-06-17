import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, MapPin, Star, Heart, Share2, Grid2X2, List, Phone, MessageCircle, Calendar, CreditCard, ShoppingCart, User, Clock, CheckCircle } from "lucide-react";
import CategoryTabs from "./CategoryTabs";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedListing, setSelectedListing] = useState<FeaturedListing | null>(null);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleListingClick = (listing: FeaturedListing) => {
    setSelectedListing(listing);
    setShowDetails(true);
  };

  const handleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toast({
      title: "পছন্দের তালিকায় যোগ",
      description: "আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  const handleShare = (e: React.MouseEvent, listing: FeaturedListing) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: `${listing.title} শেয়ার করা হচ্ছে`
    });
  };

  const handleBooking = (type: string) => {
    if (!selectedListing) return;
    
    if (type === 'rent') {
      navigate(`/rental-booking?id=${selectedListing.id}`);
    } else if (type === 'service') {
      navigate(`/service-booking?id=${selectedListing.id}`);
    } else if (type === 'buy') {
      navigate(`/product-order?id=${selectedListing.id}`);
    }
    
    toast({
      title: "বুকিং শুরু",
      description: `${selectedListing.title} এর জন্য বুকিং প্রক্রিয়া শুরু হয়েছে`
    });
    setShowDetails(false);
  };

  const renderListingCard = (listing: FeaturedListing, index: number) => {
    if (viewMode === "list") {
      return (
        <Card
          key={`${activeTab}-${listing.id}-${listing.category}-${index}`}
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] hover:border-primary duration-200"
          onClick={() => handleListingClick(listing)}
        >
          <div className="flex h-24">
            <div className="relative w-24 flex-shrink-0">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-1 left-1 text-xs px-1 py-0.5">{listing.category}</Badge>
            </div>
            <CardContent className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-sm line-clamp-1 mb-1">{listing.title}</h3>
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
            <div className="flex flex-col gap-1 p-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => handleFavorite(e, listing.id)}
              >
                <Heart className="h-3 w-3 text-gray-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => handleShare(e, listing)}
              >
                <Share2 className="h-3 w-3 text-gray-600" />
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    // Grid view (existing mobile/desktop logic)
    return (
      <Card
        key={`${activeTab}-${listing.id}-${listing.category}-${index}`}
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 hover:border-primary 
          active:scale-100 duration-200 card-hover-effect"
        onClick={() => handleListingClick(listing)}
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
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>ফিচার্ড লিস্টিং</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="flex items-center gap-1"
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
            {viewMode === "grid" ? "লিস্ট" : "গ্রিড"}
          </Button>
        </div>
      </div>
      
      <CategoryTabs active={activeTab} setActive={setActiveTab} />
      
      <div className="mt-4">
        {loading ? (
          <div className={`grid gap-3 ${
            viewMode === "list" 
              ? "grid-cols-1" 
              : isMobile 
                ? 'grid-cols-1' 
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {Array.from({ length: isMobile ? 3 : 4 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-gray-100">
                <Skeleton className={`w-full mb-3 ${
                  viewMode === "list" ? 'h-24' : isMobile ? 'h-48' : 'h-40'
                }`} />
                <div className="p-3">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-3 ${
            viewMode === "list" 
              ? "grid-cols-1" 
              : isMobile 
                ? 'grid-cols-1' 
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {getListings(activeTab).map((listing, index) => renderListingCard(listing, index))}
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

      {/* Enhanced Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{selectedListing.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={selectedListing.image} 
                    alt={selectedListing.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{selectedListing.category}</Badge>
                </div>

                <div className="space-y-4">
                  {/* Price and Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{selectedListing.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8 (২৪ রিভিউ)</span>
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">কামাল খাদেম</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.8 (২৪ রিভিউ)</span>
                          <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                          <span className="text-green-600">যাচাইকৃত</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3 border-b pb-2">বিবরণ</h4>
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        এটি চট্টগ্রামের ৩ বেডরুমের অ্যাপার্টমেন্ট রয়েছে আধুনিক সুবিধা, বিশাল খেলার জায়গা এবং দক্ষিণমুখী বারান্দা।
                        অ্যাপার্টমেন্টটি সম্পূর্ণ আসবাবযুক্ত এবং তাৎক্ষণিক ব্যবহারের জন্য প্রস্তুত, যা শিক্ষা প্রতিষ্ঠান, 
                        শপিং মল এবং হাসপাতালের কাছাকাছি।
                      </p>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">অবস্থা:</span>
                          <span className="font-medium">আবহবিক</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ভাড়ার মেয়াদ:</span>
                          <span className="font-medium">সর্বনিম্ন ৫ মাস</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">আমানত:</span>
                          <span className="font-medium">৫০,০০০</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">পোস্ট করা হয়েছে:</span>
                          <span className="font-medium">২০২৫-০৪-০১</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm">{selectedListing.location}</span>
                  </div>

                  {/* Live Location Map */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      লাইভ লোকেশন
                    </h4>
                    <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">ম্যাপ লোড হচ্ছে...</span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-800">যোগাযোগের তথ্য</h4>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>১২৫৬ জন দেখেছেন</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  {selectedListing.category === "রেন্ট" && (
                    <>
                      <Button 
                        onClick={() => handleBooking('rent')}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                      >
                        ভাড়া নিন
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "যোগাযোগ",
                            description: "মালিকের সাথে যোগাযোগ করা হচ্ছে"
                          });
                        }}
                        className="flex items-center gap-2 border-gray-300"
                      >
                        <Phone className="h-4 w-4" />
                        যোগাযোগ করুন
                      </Button>
                    </>
                  )}
                  
                  {selectedListing.category === "সার্ভিস" && (
                    <>
                      <Button 
                        onClick={() => handleBooking('service')}
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        বুক করুন
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "চ্যাট",
                            description: "সেবা প্রদানকারীর সাথে চ্যাট শুরু হয়েছে"
                          });
                        }}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        চ্যাট
                      </Button>
                    </>
                  )}
                  
                  {selectedListing.category === "মার্কেটপ্লেস" && (
                    <>
                      <Button 
                        onClick={() => handleBooking('buy')}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        কিনুন
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "পেমেন্ট",
                            description: "সিকিউর পেমেন্ট অপশন দেখানো হচ্ছে"
                          });
                        }}
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        পেমেন্ট
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeaturedListings;
