
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Star,
  Filter,
  Share2,
  Heart,
  ArrowLeft,
  Calendar,
  Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import SocialShareModal from '@/components/SocialShareModal';
import ServiceCategoryFilterForm from '@/components/services/ServiceCategoryFilterForm';

const serviceCategoryData = {
  'home-services': {
    title: 'ঘরোয়া সেবা',
    items: [
      {
        id: 1,
        title: 'এসি মেরামত ও সার্ভিসিং',
        provider: 'আহমদ এসি সার্ভিস',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳৮০০ - ১,৫০০',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সেবা',
        rating: 4.8,
        reviews: 156
      },
      {
        id: 2,
        title: 'প্লাম্বিং সার্ভিস',
        provider: 'রহিম প্লাম্বার',
        location: 'গুলশান, ঢাকা',
        price: '৳৫০০ - ২,০০০',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1000&auto=format&fit=crop',
        category: 'ঘরোয়া সেবা',
        rating: 4.6,
        reviews: 89
      }
    ]
  },
  'education': {
    title: 'শিক্ষা সেবা',
    items: [
      {
        id: 3,
        title: 'গণিত টিউটরিং',
        provider: 'করিম স্যার',
        location: 'মিরপুর, ঢাকা',
        price: '৳২,০০০/মাস',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop',
        category: 'শিক্ষা সেবা',
        rating: 4.9,
        reviews: 234
      }
    ]
  },
  'health': {
    title: 'স্বাস্থ্য সেবা',
    items: [
      {
        id: 4,
        title: 'ফিজিওথেরাপি সেবা',
        provider: 'ডাঃ সালমা খাতুন',
        location: 'ধানমন্ডি, ঢাকা',
        price: '৳১,২০০/সেশন',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop',
        category: 'স্বাস্থ্য সেবা',
        rating: 4.7,
        reviews: 98
      }
    ]
  }
};

const ServiceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recommended');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

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

  const handleServiceClick = (id: number) => {
    navigate(`/service-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সেবাটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
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
    navigate(`/service-booking/${serviceId}`);
  };

  const handleApplyFilter = () => {
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: `${category?.title} এর জন্য ফিল্টার আপডেট হয়েছে`
    });
  };

  if (!category) {
    return null;
  }

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
        <h1 className="text-2xl font-bold">{category.title}</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4"
        >
          <Filter className="h-4 w-4 mr-2" />
          ফিল্টার {showFilters ? 'লুকান' : 'দেখান'}
        </Button>
        
        {showFilters && (
          <ServiceCategoryFilterForm
            category={{ title: category.title, id: categoryId }}
            selectedSubcategory={selectedSubcategory}
            selectedLocation={selectedLocation}
            priceRange={priceRange}
            onSubcategoryChange={setSelectedSubcategory}
            onLocationChange={setSelectedLocation}
            onPriceRangeChange={setPriceRange}
          />
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          <span>{category.items.length} সেবা পাওয়া গেছে</span>
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.items.map((service) => (
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
              <Badge className="absolute top-2 left-2">{service.category}</Badge>
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
              <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">{service.provider}</p>
              <div className="flex items-center text-xs text-muted-foreground my-1">
                <MapPin className="h-3 w-3 mr-1" /> 
                <span>{service.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">{service.price}</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">{service.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({service.reviews})</span>
                </div>
              </div>
              <Button 
                className="w-full mt-3"
                size="sm"
                onClick={(e) => handleBookNow(e, service.id)}
              >
                <Phone className="h-4 w-4 mr-2" /> বুকিং করুন
              </Button>
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
