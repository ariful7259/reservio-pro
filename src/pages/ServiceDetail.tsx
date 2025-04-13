
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Heart, 
  MessageSquare, 
  Check, 
  X, 
  Phone, 
  Mail,
  Info,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import SocialShareModal from '@/components/SocialShareModal';
import MapView from '@/components/MapView';
import TimeSlotPicker from '@/components/TimeSlotPicker';

// মক ডেটা - একে সার্ভারে নিয়ে যাওয়া উচিত
const services = [
  {
    id: "1",
    title: "ডাক্তার কনসাল্টেশন",
    location: "মেডিকেল সেন্টার, ঢাকা",
    price: "৳১,৫০০",
    discountPrice: "৳১,৮০০",
    discountPercent: "১৬%",
    images: [
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1631815587646-b84fb6e925b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
    ],
    category: "স্বাস্থ্যসেবা",
    description: "অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকের সাথে পূর্ণাঙ্গ কনসাল্টেশন সেবা। আমাদের চিকিৎসকগণ ১০+ বছরের অভিজ্ঞতা সম্পন্ন এবং বিভিন্ন আন্তর্জাতিক হাসপাতালে কাজের অভিজ্ঞতা আছে। সেবার মধ্যে রয়েছে সম্পূর্ণ শারীরিক পরীক্ষা, রোগ নির্ণয়, ঔষধ ও চিকিৎসা পরামর্শ, এবং প্রয়োজনে টেস্ট সুপারিশ।",
    inclusions: [
      "৩০ মিনিট কনসাল্টেশন",
      "মেডিকেল হিস্ট্রি রিভিউ",
      "প্রিসক্রিপশন",
      "ফলোআপ পরামর্শ (৭ দিন)"
    ],
    exclusions: [
      "ল্যাব টেস্ট",
      "ওষুধের খরচ"
    ],
    provider: {
      name: "ডাঃ আহমেদ হোসেন",
      title: "কার্ডিওলজিস্ট",
      education: "এমবিবিএস, এফসিপিএস (কার্ডিওলজি)",
      experience: "১২ বছর",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      rating: 4.8,
      reviews: 120,
      verified: true
    },
    availabilityDays: ["শনিবার", "রবিবার", "মঙ্গলবার", "বৃহস্পতিবার"],
    availabilityTime: "সকাল ১০টা - রাত ৮টা",
    latitude: 23.7937,
    longitude: 90.4137,
    duration: "৩০ মিনিট",
    createdAt: "২০২৫-০৩-২০",
    viewCount: 1350
  },
  {
    id: "2",
    title: "ডেন্টাল চেকআপ",
    location: "শাইন ডেন্টাল, ঢাকা",
    price: "৳২,০০০",
    discountPrice: "৳২,৫০০",
    discountPercent: "২০%",
    images: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1606811857731-c55f0c92fdd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
    ],
    category: "ডেন্টাল কেয়ার",
    description: "আমাদের ডেন্টাল চেকআপ প্যাকেজে রয়েছে পূর্ণাঙ্গ দাঁতের পরীক্ষা, প্রোফেশনাল ক্লিনিং, এবং ফ্লোরাইড ট্রিটমেন্ট। আমাদের অভিজ্ঞ দন্ত চিকিৎসকগণ আপনার দাঁতের স্বাস্থ্য পরীক্ষা করে প্রয়োজনীয় পরামর্শ দিবেন এবং সম্ভাব্য সমস্যাগুলি চিহ্নিত করবেন।",
    inclusions: [
      "সম্পূর্ণ দাঁতের পরীক্ষা",
      "স্কেলিং এবং পলিশিং",
      "ফ্লোরাইড ট্রিটমেন্ট",
      "দাঁতের এক্স-রে",
      "পরামর্শ সেশন"
    ],
    exclusions: [
      "দাঁত ফিলিং",
      "রুট ক্যানাল",
      "অন্যান্য প্রসিডিউর"
    ],
    provider: {
      name: "ডাঃ নাজনীন আক্তার",
      title: "ডেন্টাল সার্জন",
      education: "বিডিএস, এমএস (কনজারভেটিভ ডেন্টিস্ট্রি)",
      experience: "৮ বছর",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      rating: 4.7,
      reviews: 95,
      verified: true
    },
    availabilityDays: ["শনিবার", "সোমবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"],
    availabilityTime: "সকাল ১১টা - সন্ধ্যা ৭টা",
    latitude: 23.8103,
    longitude: 90.3420,
    duration: "৪৫ মিনিট",
    createdAt: "২০২৫-০৩-২৫",
    viewCount: 980
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ডেটা লোড করা
  useEffect(() => {
    // আসল অ্যাপে এখানে API কল থাকবে
    const fetchService = () => {
      setLoading(true);
      try {
        const foundService = services.find(item => item.id === id);
        if (foundService) {
          setService(foundService);
        } else {
          toast({
            title: "সার্ভিস পাওয়া যায়নি",
            description: "আপনার অনুরোধকৃত সার্ভিস খুঁজে পাওয়া যায়নি।",
            variant: "destructive"
          });
          navigate('/services');
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
      fetchService();
    }
  }, [id, toast, navigate]);

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "তারিখ এবং সময় নির্বাচন করুন",
        description: "অ্যাপয়েন্টমেন্ট বুক করতে তারিখ এবং সময় নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "অ্যাপয়েন্টমেন্ট বুক করা হয়েছে",
      description: `আপনার অ্যাপয়েন্টমেন্ট বুক করা হয়েছে: ${selectedDate.toLocaleDateString()} ${selectedTimeSlot}`,
    });
    // navigate('/appointments');
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "বুকমার্ক থেকে সরানো হয়েছে" : "বুকমার্ক করা হয়েছে",
      description: bookmarked 
        ? "সার্ভিসটি আপনার বুকমার্ক থেকে সরানো হয়েছে।" 
        : "সার্ভিসটি আপনার বুকমার্ক লিস্টে যোগ করা হয়েছে।",
    });
  };

  const handleShare = () => {
    setShowShareModal(true);
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

  if (!service) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <X className="h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">সার্ভিস পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">আপনার অনুরোধকৃত সার্ভিস খুঁজে পাওয়া যায়নি।</p>
          <Button onClick={() => navigate('/services')}>সার্ভিস পেজে ফিরে যান</Button>
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
          onClick={() => navigate('/services')}
        >
          সার্ভিস
        </Button>
        <ChevronRight className="h-3 w-3" />
        <Button 
          variant="link" 
          className="p-0 h-auto font-medium"
          onClick={() => navigate(`/services/category/${service.category}`)}
        >
          {service.category}
        </Button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-muted-foreground">{service.title}</span>
      </div>

      {/* ছবি গ্যালারি */}
      <div className="mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {service.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-video w-full">
                    <img 
                      src={image} 
                      alt={`${service.title} ছবি ${index + 1}`} 
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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{service.title}</h1>
            <Badge>{service.category}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{service.provider.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({service.provider.reviews} রিভিউ)</span>
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
              <TabsTrigger value="provider">সেবা প্রদানকারী</TabsTrigger>
              <TabsTrigger value="reviews">রিভিউসমূহ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">সার্ভিস বিবরণ</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="my-6">
                    <h4 className="text-sm font-medium mb-3">সার্ভিসে অন্তর্ভুক্ত</h4>
                    <ul className="space-y-2">
                      {service.inclusions.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {service.exclusions && service.exclusions.length > 0 && (
                    <div className="my-6">
                      <h4 className="text-sm font-medium mb-3">সার্ভিসে অন্তর্ভুক্ত নয়</h4>
                      <ul className="space-y-2">
                        {service.exclusions.map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <X className="h-4 w-4 text-red-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">সময়কাল</p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">উপলব্ধ দিন</p>
                        <p className="text-sm text-muted-foreground">{service.availabilityDays.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">উপলব্ধ সময়</p>
                        <p className="text-sm text-muted-foreground">{service.availabilityTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">অবস্থান</p>
                        <p className="text-sm text-muted-foreground">{service.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">অবস্থান</h4>
                    <div className="h-60 rounded-lg overflow-hidden">
                      <MapView 
                        listings={[{
                          id: service.id,
                          title: service.title,
                          location: service.location,
                          latitude: service.latitude,
                          longitude: service.longitude
                        }]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="provider" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={service.provider.photo} 
                        alt={service.provider.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{service.provider.name}</h3>
                        {service.provider.verified && (
                          <BadgeCheck className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{service.provider.title}</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{service.provider.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({service.provider.reviews} রিভিউ)</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">শিক্ষাগত যোগ্যতা</h4>
                      <p className="text-sm text-muted-foreground">{service.provider.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">অভিজ্ঞতা</h4>
                      <p className="text-sm text-muted-foreground">{service.provider.experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      যোগাযোগ করুন
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      মেসেজ পাঠান
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">রিভিউসমূহ</h3>
                    <Badge variant="outline">{service.provider.reviews} রিভিউ</Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{service.provider.rating}</div>
                      <div className="flex items-center justify-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= Math.floor(service.provider.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{service.provider.reviews} রিভিউ</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="text-xs w-2">{rating}</div>
                            <Star className="h-3 w-3 text-yellow-400" />
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ 
                                  width: `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` 
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-muted-foreground w-8">
                              {rating === 5 ? '65%' : rating === 4 ? '25%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-6">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-muted-foreground">সার্ভিসটি ব্যবহার করার পর এখানে আপনার রিভিউ দিতে পারবেন।</p>
                    <Button className="mt-4">রিভিউ দেখুন</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* সাইডবার - বুকিং ও মূল্য */}
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold">{service.price}</span>
                  {service.discountPrice && (
                    <>
                      <span className="text-sm line-through text-muted-foreground">{service.discountPrice}</span>
                      <Badge variant="outline" className="bg-red-50 border-red-200 text-red-600 text-xs">{service.discountPercent} ছাড়</Badge>
                    </>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">অ্যাপয়েন্টমেন্ট তারিখ নির্বাচন করুন</h4>
                <div className="border rounded-md p-4">
                  <TimeSlotPicker 
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    selectedTimeSlot={selectedTimeSlot}
                    onTimeSlotSelect={handleTimeSlotSelect}
                    availableDays={service.availabilityDays}
                  />
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>সার্ভিস চার্জ</span>
                  <span>{service.price}</span>
                </div>
                {service.discount && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>ডিসকাউন্ট</span>
                    <span>-৳{parseInt(service.discountPrice.replace(/[^\d]/g, '')) - parseInt(service.price.replace(/[^\d]/g, ''))}</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>মোট</span>
                  <span>{service.price}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleBookNow}
              >
                অ্যাপয়েন্টমেন্ট বুক করুন
              </Button>
              
              <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-md">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">গুরুত্বপূর্ণ তথ্য</p>
                  <p className="text-xs text-amber-700">অ্যাপয়েন্টমেন্ট বাতিল করতে ২৪ ঘণ্টা আগে জানাতে হবে। অন্যথায় ২০% চার্জ কাটা হবে।</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* সোশ্যাল শেয়ার মোডাল */}
      {service && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={{
            ...service,
            type: 'service',
          }}
        />
      )}
    </div>
  );
};

export default ServiceDetail;
