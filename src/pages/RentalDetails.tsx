
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import SocialShareModal from '@/components/SocialShareModal';

// Sample rental data - in real app this would come from API
const rentalListings = [
  {
    id: "1",
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530629013299-6cb10d168419?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "apartment",
    description: "এই চমৎকার ৩ বেডরুম অ্যাপার্টমেন্টে রয়েছে আধুনিক সুবিধা, বিশাল খোলা জায়গা এবং দক্ষিণমুখী বারান্দা। অ্যাপার্টমেন্টটি সম্পূর্ণ আসবাবযুক্ত এবং তাৎক্ষণিক ব্যবহারের জন্য প্রস্তুত।",
    features: [
      "৩ বেডরুম", "২ বাথরুম", "১৮০০ বর্গফুট", "লিফট", "জেনারেটর", "২৪/৭ সিকিউরিটি", "পার্কিং", "গ্যাস সংযোগ"
    ],
    owner: {
      name: "কামাল হোসেন",
      phone: "+৮৮০১৭১১২৩৪৫৬৭",
      rating: 4.8,
      reviews: 34,
      verified: true
    },
    availability: "অবিলম্বে",
    createdAt: "২০২৫-০৪-০১",
    viewCount: 1256,
    rentDeposit: "৳৫০,০০০",
    latitude: 23.7937,
    longitude: 90.4137
  },
  {
    id: "2",
    title: "অফিস স্পেস",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "office",
    description: "বনানীর প্রধান সড়কের পাশে অবস্থিত এই অফিস স্পেসটি আপনার ব্যবসার জন্য আদর্শ।",
    features: [
      "১২০০ বর্গফুট", "সেন্ট্রাল এসি", "গ্লাস পার্টিশন", "কনফারেন্স রুম"
    ],
    owner: {
      name: "রশিদ আহমেদ",
      phone: "+৮৮০১৮১১২৩৪৫৬৭",
      rating: 4.6,
      reviews: 27,
      verified: true
    },
    availability: "অবিলম্বে",
    createdAt: "২০২৫-০৪-০২",
    viewCount: 980,
    rentDeposit: "৳১,০০,০০০"
  }
];

const RentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rental, setRental] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchRental = () => {
      setLoading(true);
      try {
        const foundRental = rentalListings.find(item => item.id === id);
        if (foundRental) {
          setRental(foundRental);
        } else {
          toast({
            title: "রেন্টাল পাওয়া যায়নি",
            description: "আপনার অনুরোধকৃত রেন্টাল আইটেম খুঁজে পাওয়া যায়নি।",
            variant: "destructive"
          });
          navigate('/rentals');
        }
      } catch (error) {
        toast({
          title: "একটি সমস্যা হয়েছে",
          description: "ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRental();
    }
  }, [id, toast, navigate]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "বুকমার্ক থেকে সরানো হয়েছে" : "বুকমার্ক করা হয়েছে",
      description: bookmarked 
        ? "রেন্টাল আইটেমটি আপনার বুকমার্ক থেকে সরানো হয়েছে।" 
        : "রেন্টাল আইটেমটি আপনার বুকমার্ক লিস্টে যোগ করা হয়েছে।",
    });
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleRentNow = () => {
    if (id && rental) {
      navigate(`/rental-booking/${id}`, { 
        state: { 
          rental: rental 
        } 
      });
    }
  };

  const handleContact = () => {
    if (id && rental && rental.owner) {
      navigate(`/contact-owner/${id}`, { 
        state: { 
          ownerInfo: rental.owner,
          rentalInfo: {
            id: rental.id,
            title: rental.title,
            image: rental.images[0]
          }
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <X className="h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">রেন্টাল পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">আপনার অনুরোধকৃত রেন্টাল আইটেম খুঁজে পাওয়া যায়নি।</p>
          <Button onClick={() => navigate('/rentals')}>রেন্টাল পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-20 pb-10">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">রেন্টাল বিবরণ</h1>
      </div>

      {/* Image Gallery */}
      <div className="mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {rental.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/9] md:aspect-[21/9] w-full">
                    <img 
                      src={image} 
                      alt={`${rental.title} ছবি ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Title and Actions */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{rental.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{rental.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmark}
            className={bookmarked ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${bookmarked ? "fill-red-500" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">বিবরণ</TabsTrigger>
              <TabsTrigger value="features">বৈশিষ্ট্য</TabsTrigger>
              <TabsTrigger value="location">অবস্থান</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">বিবরণ</h3>
                  <p className="text-muted-foreground">{rental.description}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">ক্যাটাগরি</h4>
                      <p className="text-sm text-muted-foreground">{rental.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">পোস্ট করা হয়েছে</h4>
                      <p className="text-sm text-muted-foreground">{rental.createdAt}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">জামানত</h4>
                      <p className="text-sm text-muted-foreground">{rental.rentDeposit}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">লভ্যতা</h4>
                      <p className="text-sm text-muted-foreground">{rental.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">বৈশিষ্ট্য</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    {rental.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">অবস্থান</h3>
                  <div className="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">ম্যাপ লোড হচ্ছে...</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">ঠিকানা</h4>
                    <p className="text-sm text-muted-foreground">{rental.location}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{rental.price}</h3>
                  <Badge variant="secondary">{rental.category}</Badge>
                </div>
                <p className="text-xs opacity-90 mt-1">জামানত: {rental.rentDeposit}</p>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{rental.owner.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{rental.owner.rating} ({rental.owner.reviews} রিভিউ)</span>
                      {rental.owner.verified && (
                        <Badge variant="outline" className="h-5 text-xs border-green-500 text-green-600">
                          <Check className="h-3 w-3 mr-1" /> যাচাইকৃত
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleRentNow}>
                    ভাড়া নিন
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleContact}>
                    যোগাযোগ করুন
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center text-xs text-muted-foreground">
                  <p>{rental.viewCount} জন দেখেছেন</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Social Share Modal */}
      {rental && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={{
            ...rental,
            type: 'rental',
          }}
        />
      )}
    </div>
  );
};

export default RentalDetails;
