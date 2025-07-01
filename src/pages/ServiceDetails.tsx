
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
import { serviceCategoryData } from '@/data/serviceCategoryData';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchService = () => {
      setLoading(true);
      try {
        // Find service from all categories
        let foundService = null;
        Object.values(serviceCategoryData).forEach((category: any) => {
          const serviceInCategory = category.items.find((item: any) => item.id === parseInt(id || '0'));
          if (serviceInCategory) {
            foundService = serviceInCategory;
          }
        });

        if (foundService) {
          setService(foundService);
        } else {
          toast({
            title: "সেবা পাওয়া যায়নি",
            description: "আপনার অনুরোধকৃত সেবা খুঁজে পাওয়া যায়নি।",
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

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "বুকমার্ক থেকে সরানো হয়েছে" : "বুকমার্ক করা হয়েছে",
      description: bookmarked 
        ? "সেবাটি আপনার বুকমার্ক থেকে সরানো হয়েছে।" 
        : "সেবাটি আপনার বুকমার্ক লিস্টে যোগ করা হয়েছে।",
    });
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleRentNow = () => {
    if (id && service) {
      navigate(`/service-booking/${id}`, { 
        state: { 
          service: service 
        } 
      });
    }
  };

  const handleContact = () => {
    if (id && service) {
      navigate(`/contact-owner/${id}`, { 
        state: { 
          ownerInfo: {
            name: service.provider,
            phone: "+৮৮০১৭১১২৩৪৫৬৷",
            rating: service.rating,
            reviews: service.reviews,
            verified: true
          },
          serviceInfo: {
            id: service.id,
            title: service.title,
            image: service.image
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

  if (!service) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <X className="h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">সেবা পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">আপনার অনুরোধকৃত সেবা খুঁজে পাওয়া যায়নি।</p>
          <Button onClick={() => navigate('/services')}>সেবা পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-20 pb-10">
      {/* ব্যাক বাটন */}
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">সেবার বিবরণ</h1>
      </div>

      {/* ছবি */}
      <div className="mb-6">
        <div className="overflow-hidden rounded-lg aspect-[16/9] w-full">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* শিরোনাম ও অ্যাকশন */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{service.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
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
                  <p className="text-muted-foreground">
                    {service.title} এর জন্য উন্নত মানের সেবা প্রদান করা হয়। আমাদের অভিজ্ঞ টিম আপনার প্রয়োজন অনুযায়ী সর্বোচ্চ মানের সেবা নিশ্চিত করে।
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">ক্যাটাগরি</h4>
                      <p className="text-sm text-muted-foreground">{service.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">সাব-ক্যাটাগরি</h4>
                      <p className="text-sm text-muted-foreground">{service.subcategory}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">রেটিং</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{service.rating} ({service.reviews} রিভিউ)</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">মূল্য</h4>
                      <p className="text-sm text-muted-foreground font-bold text-primary">{service.price}</p>
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
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>উন্নত মানের সেবা</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>অভিজ্ঞ পেশাদার</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>নির্ভরযোগ্য সময়</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>সাশ্রয়ী মূল্য</span>
                    </div>
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
                    <p className="text-sm text-muted-foreground">{service.location}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* সাইডবার */}
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{service.price}</h3>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{service.provider}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{service.rating} ({service.reviews} রিভিউ)</span>
                      <Badge variant="outline" className="h-5 text-xs border-green-500 text-green-600">
                        <Check className="h-3 w-3 mr-1" /> যাচাইকৃত
                      </Badge>
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

export default ServiceDetails;
