
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
import RentalFeatures from '@/components/RentalFeatures';
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';

// মক ডেটা - একে সার্ভারে নিয়ে যাওয়া উচিত
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
    description: "এই চমৎকার ৩ বেডরুম অ্যাপার্টমেন্টে রয়েছে আধুনিক সুবিধা, বিশাল খোলা জায়গা এবং দক্ষিণমুখী বারান্দা। অ্যাপার্টমেন্টটি সম্পূর্ণ আসবাবযুক্ত এবং তাৎক্ষণিক ব্যবহারের জন্য প্রস্তুত। এটি গুলশানের একটি সুরক্ষিত এলাকায় অবস্থিত, যা শিক্ষা প্রতিষ্ঠান, শপিং মল এবং হাসপাতালের কাছাকাছি।",
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
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593526613712-7b4b8a844592?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "office",
    description: "বনানীর প্রধান সড়কের পাশে অবস্থিত এই অফিস স্পেসটি আপনার ব্যবসার জন্য আদর্শ। এটি পুরোপুরি কার্পেট করা, সেন্ট্রাল এসি, মডার্ন লাইটিং, এবং গ্লাস পার্টিশন সহ সজ্জিত। বিল্ডিংয়ে রয়েছে বিদ্যুৎ ব্যাকআপ, ২৪ ঘণ্টা সিকিউরিটি, লিফট এবং পর্যাপ্ত পার্কিং সুবিধা।",
    features: [
      "১২০০ বর্গফুট", "সেন্ট্রাল এসি", "গ্লাস পার্টিশন", "কনফারেন্স রুম", "ফ্রি ওয়াইফাই", "ব্যাকআপ জেনারেটর", "লিফট", "রিসেপশন এরিয়া"
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
    rentDeposit: "৳১,০০,০০০",
    latitude: 23.7937,
    longitude: 90.3938
  },
  {
    id: "3",
    title: "টয়োটা কোরোলা",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "car",
    description: "এই টয়োটা কোরোলা গাড়িটি ভ্রমণ, কর্পোরেট মিটিং, বা স্পেশাল ইভেন্টের জন্য ভাড়া করুন। গাড়িটি ২০২২ মডেল, পুরোপুরি এসি, অটোমেটিক, এবং সম্পূর্ণ সার্ভিসড। দীর্ঘ ভ্রমণের জন্য বিশেষ প্যাকেজ এবং প্রশিক্ষিত ড্রাইভার সুবিধা উপলব্ধ।",
    features: [
      "২০২২ মডেল", "অটোমেটিক", "এসি", "বুটুথ অডিও", "রিভার্স ক্যামেরা", "GPS", "লেদার সিট", "৫ আসন"
    ],
    owner: {
      name: "সাইফুল ইসলাম",
      phone: "+৮৮০১৯১১২৩৪৫৬৭",
      rating: 4.9,
      reviews: 56,
      verified: true
    },
    availability: "অবিলম্বে",
    createdAt: "২০২৫-০৪-০৩",
    viewCount: 1450,
    rentDeposit: "৳১০,০০০",
    latitude: 23.8103,
    longitude: 90.3420
  },
  {
    id: "4",
    title: "ডিএসএলআর ক্যামেরা",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586253634026-4661a2f4b945?q=80&w=1000&auto=format&fit=crop"
    ],
    category: "equipment",
    description: "ক্যানন ইওএস ৮০ডি ডিএসএলআর ক্যামেরা ভাড়া নিন। এর সাথে থাকছে ১৮-১৩৫mm লেন্স, ৫০mm প্রাইম লেন্স, ব্যাটারি, চার্জার, মেমোরি কার্ড, এবং ক্যামেরা ব্যাগ। ফটোগ্রাফি সেশন, ইভেন্ট কভারেজ, বা প্রোডাক্ট ফটোশুট এর জন্য আদর্শ।",
    features: [
      "ক্যানন ইওএস ৮০ডি", "২৪.২ মেগাপিক্সেল", "৪K ভিডিও", "দুটি লেন্স", "ট্রাইপড", "এক্সট্রা ব্যাটারি", "৬৪GB মেমোরি কার্ড", "ক্যামেরা ব্যাগ"
    ],
    owner: {
      name: "তানভীর আহমেদ",
      phone: "+৮৮০১৭২১২৩৪৫৬৭",
      rating: 4.7,
      reviews: 42,
      verified: true
    },
    availability: "অবিলম্বে",
    createdAt: "২০২৫-০৪-০৪",
    viewCount: 920,
    rentDeposit: "৳১০,০০০",
    latitude: 23.7465,
    longitude: 90.3751
  }
];

const RentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rental, setRental] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ডেটা লোড করা
  useEffect(() => {
    // আসল অ্যাপে এখানে API কল থাকবে
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

  // "ভাড়া দিন" বাটনের ক্লিক হ্যান্ডলার
  const handleRentNow = () => {
    console.log("Booking now for item ID:", id);
    if (id && rental) {
      navigate(`/rental-booking/${id}`, { 
        state: { 
          rental: rental 
        } 
      });
    }
  };

  // "যোগাযোগ করুন" বাটনের ক্লিক হ্যান্ডলার
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
      {/* ব্রেডক্রাম্ব */}
      <div className="flex items-center gap-1 text-sm mb-4">
        <Button 
          variant="link" 
          className="p-0 h-auto"
          onClick={() => navigate('/')}
        >
          হোম
        </Button>
        <ChevronRight className="h-3 w-3" />
        <Button 
          variant="link" 
          className="p-0 h-auto"
          onClick={() => navigate('/rentals')}
        >
          রেন্টাল
        </Button>
        <ChevronRight className="h-3 w-3" />
        <Button 
          variant="link" 
          className="p-0 h-auto font-medium"
          onClick={() => navigate(`/rentals?category=${rental.category}`)}
        >
          {rental.category}
        </Button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-muted-foreground">{rental.title}</span>
      </div>

      {/* ছবি গ্যালারি */}
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

      {/* প্রোডাক্ট শিরোনাম ও অ্যাকশন */}
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
        {/* মূল তথ্য */}
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
                      <h4 className="text-sm font-medium mb-1">অবস্থা</h4>
                      <p className="text-sm text-muted-foreground">ভালো</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">পোস্ট করা হয়েছে</h4>
                      <p className="text-sm text-muted-foreground">{rental.createdAt}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">ভাড়ার মেয়াদ</h4>
                      <p className="text-sm text-muted-foreground">সর্বনিম্ন ১ মাস</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">জামানত</h4>
                      <p className="text-sm text-muted-foreground">{rental.rentDeposit}</p>
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
              
              {/* রেন্টাল ফিচার কম্পোনেন্ট যোগ করা (আপনার কম্পোনেন্ট অনুযায়ী) */}
              <div className="mt-4">
                <RentalFeatures 
                  category={rental.category} 
                  featureList={rental.features} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">অবস্থান</h3>
                  <div className="bg-gray-100 rounded-lg h-[300px] overflow-hidden">
                    <MapView 
                      listings={[{
                        id: rental.id,
                        title: rental.title,
                        location: rental.location,
                        latitude: rental.latitude,
                        longitude: rental.longitude
                      }]}
                    />
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
        
        {/* সাইডবার - মূল্য ও ভাড়া দেওয়া */}
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
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>লভ্যতা: {rental.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>পোস্ট করা হয়েছে: {rental.createdAt}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleRentNow}>
                    ভাড়া দিন
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
      
      {/* সোশ্যাল শেয়ার মোডাল */}
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

export default RentDetail;
