
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin,
  Star,
  Filter,
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import SocialShareModal from '@/components/SocialShareModal';

// Service category data mapping
const serviceCategoryData = {
  'medical': {
    title: 'ডাক্তার ও স্বাস্থ্য সেবা',
    titleEn: 'Medical & Health Services',
    services: [
      {
        id: 1,
        title: 'হোম ভিজিট ডাক্তার',
        provider: 'ডা. আহমেদ হাসান',
        location: 'গুলশান, ঢাকা',
        price: '৳১,৫০০',
        rating: 4.8,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        isVerified: true,
        responseTime: '৩০ মিনিট',
        subcategory: 'জেনারেল ডাক্তার'
      },
      {
        id: 2,
        title: 'শিশু চিকিৎসক',
        provider: 'ডা. সাবিনা খাতুন',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳১,৮০০',
        rating: 4.9,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        isVerified: true,
        responseTime: '৪৫ মিনিট',
        subcategory: 'শিশু চিকিৎসক'
      }
    ]
  },
  'salon': {
    title: 'সেলুন ও বিউটি সার্ভিস',
    titleEn: 'Salon & Beauty Services',
    services: [
      {
        id: 3,
        title: 'প্রিমিয়াম হেয়ার কাট',
        provider: 'স্টাইল সেলুন',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳৮০০',
        rating: 4.5,
        reviews: 127,
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        isVerified: false,
        responseTime: '৪৫ মিনিট',
        subcategory: 'পুরুষ হেয়ার কাট'
      },
      {
        id: 4,
        title: 'ব্রাইডাল মেকআপ',
        provider: 'গ্ল্যাম বিউটি',
        location: 'গুলশান, ঢাকা',
        price: '৳৫,০০০',
        rating: 4.7,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        isVerified: true,
        responseTime: '২ ঘণ্টা',
        subcategory: 'ওয়েডিং মেকআপ'
      }
    ]
  },
  'electronics': {
    title: 'ইলেকট্রনিক্স রিপেয়ার',
    titleEn: 'Electronics Repair',
    services: [
      {
        id: 5,
        title: 'এসি সার্ভিসিং',
        provider: 'কুল টেক সার্ভিস',
        location: 'মোহাম্মদপুর, ঢাকা',
        price: '৳১,৮০০',
        rating: 4.6,
        reviews: 154,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
        isVerified: true,
        responseTime: '২ ঘণ্টা',
        subcategory: 'এসি'
      }
    ]
  },
  'mobile': {
    title: 'মোবাইল ও গ্যাজেট সার্ভিস',
    titleEn: 'Mobile & Gadget Services',
    services: [
      {
        id: 6,
        title: 'মোবাইল স্ক্রিন রিপেয়ার',
        provider: 'টেক ফিক্স',
        location: 'উত্তরা, ঢাকা',
        price: '৳২,৫০০',
        rating: 4.4,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
        isVerified: true,
        responseTime: '১ দিন',
        subcategory: 'মোবাইল রিপেয়ার'
      }
    ]
  },
  'cleaning': {
    title: 'হাউজ ক্লিনিং সার্ভিস',
    titleEn: 'House Cleaning Services',
    services: [
      {
        id: 7,
        title: 'হোম ক্লিনিং সার্ভিস',
        provider: 'ক্লিন হোম',
        location: 'গুলশান, ঢাকা',
        price: '৳১,২০০',
        rating: 4.8,
        reviews: 203,
        image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
        isVerified: true,
        responseTime: '৩ ঘণ্টা',
        subcategory: 'ঘর ঝাড়ু ও মপিং'
      }
    ]
  }
};

const ServiceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();
  const [sortBy, setSortBy] = useState('recommended');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Get category data
  const category = categoryId && serviceCategoryData[categoryId as keyof typeof serviceCategoryData];
  
  useEffect(() => {
    if (!categoryId) {
      toast({
        title: "ক্যাটাগরি আইডি পাওয়া যায়নি",
        description: "URL এ ক্যাটাগরি আইডি অনুপস্থিত। মূল পৃষ্ঠায় ফিরে যাচ্ছি।",
        variant: "destructive"
      });
      navigate('/services');
      return;
    }
    
    if (!category) {
      toast({
        title: "ক্যাটাগরি পাওয়া যায়নি",
        description: `দুঃখিত, "${categoryId}" ক্যাটাগরি পাওয়া যায়নি। মূল পৃষ্ঠায় ফিরে যাচ্ছি।`,
        variant: "destructive"
      });
      navigate('/services');
    }
  }, [category, categoryId, navigate, toast]);

  if (!category) {
    return null;
  }

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    setShareItem({
      ...service,
      type: 'service',
    });
    setShowShareModal(true);
  };

  const handleBookNow = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    navigate(`/services/${serviceId}/book`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/services')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? category.title : category.titleEn}
        </h1>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          <span>{category.services.length} সার্ভিস পাওয়া গেছে</span>
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="সর্ট করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
              <SelectItem value="price_low">দাম (কম থেকে বেশি)</SelectItem>
              <SelectItem value="price_high">দাম (বেশি থেকে কম)</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.services.map((service) => (
          <Card 
            key={service.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleServiceClick(service.id)}
          >
            <div className="relative aspect-square">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2">{service.subcategory}</Badge>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white h-8 w-8 rounded-full"
                  onClick={(e) => handleBookmark(e, service.id)}
                >
                  <Heart className="h-4 w-4 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white h-8 w-8 rounded-full"
                  onClick={(e) => handleShare(e, service)}
                >
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                {service.isVerified && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
              <div className="flex items-center text-xs text-muted-foreground my-1">
                <MapPin className="h-3 w-3 mr-1" /> 
                <span>{service.location}</span>
              </div>
              <div className="flex items-center gap-4 text-xs mb-2">
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{service.rating}</span>
                </div>
                <span>({service.reviews} রিভিউ)</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{service.responseTime}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{service.price}</p>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={(e) => handleBookNow(e, service.id)}
                >
                  বুক করুন <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default ServiceCategoryPage;
