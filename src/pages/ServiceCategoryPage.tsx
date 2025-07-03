import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, MapPin, Clock, Users, Share2, Bookmark, Heart, ArrowUpRight, CheckCircle } from 'lucide-react';
import SocialShareModal from '@/components/SocialShareModal';
import ServiceCategoryHeader from '@/components/services/ServiceCategoryHeader';
import ServiceCategoryFilterForm from '@/components/services/ServiceCategoryFilterForm';
import { useApp } from '@/context/AppContext';
import { Stethoscope, Scissors, Wrench, Smartphone, UtensilsCrossed, Brush, Hammer, Bug, GraduationCap, Camera, Package, Laptop, PartyPopper, Building, Car } from 'lucide-react';

const ServiceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();
  const [sortBy, setSortBy] = useState('recommended');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Service categories data - matching the structure from Services.tsx
  const serviceCategories = [{
    id: 'medical',
    name: 'ডাক্তার ও স্বাস্থ্য সেবা',
    nameEn: 'Medical & Health Services',
    icon: <Stethoscope className="h-7 w-7" />,
    color: 'bg-red-50',
    iconColor: 'text-red-500',
    count: 156,
    subcategories: language === 'bn' ? ['জেনারেল ডাক্তার', 'শিশু চিকিৎসক', 'গাইনী', 'চক্ষু চিকিৎসক', 'মানসিক স্বাস্থ্য'] : ['General Doctor', 'Pediatrician', 'Gynecologist', 'Eye Specialist', 'Mental Health'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ভিডিও কনসালটেশন', 'চেম্বার ভিজিট'] : ['Home Visit', 'Video Consultation', 'Chamber Visit']
  }, {
    id: 'dental',
    name: 'ডেন্টাল কেয়ার',
    nameEn: 'Dental Care',
    icon: <Users className="h-7 w-7" />,
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    count: 89,
    subcategories: language === 'bn' ? ['দাঁত ফিলিং', 'ব্রেসিং', 'স্কেলিং ও ক্লিনিং', 'রুট ক্যানাল'] : ['Tooth Filling', 'Bracing', 'Scaling & Cleaning', 'Root Canal'],
    bookingTypes: language === 'bn' ? ['চেম্বার ভিজিট', 'হোম সার্ভিস', 'ভিডিও কনসাল্ট'] : ['Chamber Visit', 'Home Service', 'Video Consult']
  }, {
    id: 'salon',
    name: 'সেলুন ও বিউটি সার্ভিস',
    nameEn: 'Salon & Beauty Services',
    icon: <Scissors className="h-7 w-7" />,
    color: 'bg-pink-50',
    iconColor: 'text-pink-500',
    count: 234,
    subcategories: language === 'bn' ? ['পুরুষ হেয়ার কাট', 'মহিলা হেয়ার কাট', 'ফেসিয়াল ও স্কিন কেয়ার', 'ওয়েডিং মেকআপ'] : ['Men\'s Haircut', 'Women\'s Haircut', 'Facial & Skin Care', 'Wedding Makeup'],
    bookingTypes: language === 'bn' ? ['হোম সার্ভিস', 'পার্লার ভিজিট'] : ['Home Service', 'Parlor Visit']
  }, {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স রিপেয়ার',
    nameEn: 'Electronics Repair',
    icon: <Wrench className="h-7 w-7" />,
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    count: 178,
    subcategories: language === 'bn' ? ['ফ্রিজ', 'এসি', 'টিভি', 'ওভেন'] : ['Refrigerator', 'AC', 'TV', 'Oven'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ডেলিভারি রিপেয়ার'] : ['Home Visit', 'Delivery Repair']
  }, {
    id: 'mobile',
    name: 'মোবাইল ও গ্যাজেট সার্ভিস',
    nameEn: 'Mobile & Gadget Services',
    icon: <Smartphone className="h-7 w-7" />,
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    count: 145,
    subcategories: language === 'bn' ? ['মোবাইল রিপেয়ার', 'ল্যাপটপ সার্ভিস', 'ডিসপ্লে রিপ্লেস', 'সফটওয়্যার ইনস্টল'] : ['Mobile Repair', 'Laptop Service', 'Display Replace', 'Software Install'],
    bookingTypes: language === 'bn' ? ['পিক-আপ সার্ভিস', 'হোম সার্ভিস', 'ভিডিও ডায়াগনসিস'] : ['Pick-up Service', 'Home Service', 'Video Diagnosis']
  }, {
    id: 'cooking',
    name: 'খাবার ও কুকিং সার্ভিস',
    nameEn: 'Food & Cooking Services',
    icon: <UtensilsCrossed className="h-7 w-7" />,
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    count: 67,
    subcategories: language === 'bn' ? ['হোম কুক', 'ক্যাটারিং', 'রান্নার সহকারী', 'হেলদি ফুড প্রিপারেশন'] : ['Home Cook', 'Catering', 'Cooking Assistant', 'Healthy Food Preparation'],
    bookingTypes: language === 'bn' ? ['সাপ্তাহিক সাবস্ক্রিপশন', 'নির্দিষ্ট তারিখে বুকিং'] : ['Weekly Subscription', 'Specific Date Booking']
  }, {
    id: 'cleaning',
    name: 'হাউজ ক্লিনিং সার্ভিস',
    nameEn: 'House Cleaning Services',
    icon: <Brush className="h-7 w-7" />,
    color: 'bg-green-50',
    iconColor: 'text-green-500',
    count: 198,
    subcategories: language === 'bn' ? ['ঘর ঝাড়ু ও মপিং', 'বাথরুম ক্লিন', 'সোফা/কার্পেট ওয়াশ', 'অফিস ক্লিনিং'] : ['Room Sweeping & Mopping', 'Bathroom Clean', 'Sofa/Carpet Wash', 'Office Cleaning'],
    bookingTypes: language === 'bn' ? ['One-Time', 'Weekly/Monthly Plan'] : ['One-Time', 'Weekly/Monthly Plan']
  }, {
    id: 'furniture',
    name: 'ফার্নিচার মেকিং/রিপেয়ার',
    nameEn: 'Furniture Making/Repair',
    icon: <Hammer className="h-7 w-7" />,
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    count: 76,
    subcategories: language === 'bn' ? ['কাঠের বিছানা তৈরি', 'সোফা ফোম চেঞ্জ', 'কাঠ মেরামত', 'ইন্টেরিয়র কাঠ কাজ'] : ['Wooden Bed Making', 'Sofa Foam Change', 'Wood Repair', 'Interior Wood Work'],
    bookingTypes: language === 'bn' ? ['কাস্টম কোট', 'ভিডিও কল কনসাল্ট'] : ['Custom Quote', 'Video Call Consult']
  }];

  // Sample services data for the selected category
  const allServices = [{
    id: 1,
    title: language === 'bn' ? 'হোম ভিজিট ডাক্তার' : 'Home Visit Doctor',
    provider: language === 'bn' ? 'ডা. আহমেদ হাসান' : 'Dr. Ahmed Hasan',
    category: 'medical',
    subcategory: language === 'bn' ? 'জেনারেল ডাক্তার' : 'General Doctor',
    location: language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka',
    price: '৳১,৫০০',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ভিডিও কনসালটেশন'] : ['Home Visit', 'Video Consultation'],
    responseTime: language === 'bn' ? '৩০ মিনিট' : '30 minutes'
  }, {
    id: 2,
    title: language === 'bn' ? 'ডেন্টাল চেকআপ' : 'Dental Checkup',
    provider: language === 'bn' ? 'ডা. ফারহানা আক্তার' : 'Dr. Farhana Akter',
    category: 'dental',
    subcategory: language === 'bn' ? 'দাঁত ফিলিং' : 'Tooth Filling',
    location: language === 'bn' ? 'বনানী, ঢাকা' : 'Banani, Dhaka',
    price: '৳১,২০০',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['চেম্বার ভিজিট', 'হোম সার্ভিস'] : ['Chamber Visit', 'Home Service'],
    responseTime: language === 'bn' ? '১ ঘণ্টা' : '1 hour'
  }];

  const category = serviceCategories.find(cat => cat.id === categoryId);
  
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

  const filteredServices = allServices.filter(service => {
    const matchesCategory = service.category === categoryId;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubcategory = selectedSubcategory === 'all' || service.subcategory === selectedSubcategory;
    const matchesLocation = selectedLocation === 'all' || service.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    // Price range filtering
    let matchesPrice = true;
    if (priceRange.min || priceRange.max) {
      const servicePrice = parseInt(service.price.replace(/[৳,]/g, ''));
      const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
      matchesPrice = servicePrice >= minPrice && servicePrice <= maxPrice;
    }
    
    return matchesCategory && matchesSearch && matchesSubcategory && matchesLocation && matchesPrice;
  });

  const handleShare = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    setShareItem({
      ...service,
      type: 'service',
    });
    setShowShareModal(true);
  };

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: language === 'bn' ? "সংরক্ষিত হয়েছে" : "Bookmarked",
      description: language === 'bn' ? "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে" : "Service added to your favorites list"
    });
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleBookService = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    navigate(`/services/${serviceId}/book`);
  };

  if (!category) {
    return null;
  }

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/services')}
          className="mb-4"
        >
          ← {language === 'bn' ? 'ফিরে যান' : 'Back'}
        </Button>
        
        <ServiceCategoryHeader 
          title={language === 'bn' ? category.name : category.nameEn}
          itemCount={filteredServices.length}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder={language === 'bn' ? 'সেবা খুঁজুন...' : 'Search services...'} 
            className="pl-10" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="mb-6">
          <ServiceCategoryFilterForm
            category={category}
            selectedSubcategory={selectedSubcategory}
            selectedLocation={selectedLocation}
            priceRange={priceRange}
            onSubcategoryChange={setSelectedSubcategory}
            onLocationChange={setSelectedLocation}
            onPriceRangeChange={setPriceRange}
            onApplyFilter={() => {
              toast({
                title: "ফিল্টার প্রয়োগ করা হয়েছে",
                description: `${filteredServices.length}টি সার্ভিস পাওয়া গেছে`
              });
              setShowFilters(false);
            }}
          />
        </div>
      )}

      {/* Category Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center shadow-lg border-2 border-white/20`}>
            <div className={category.iconColor}>
              {React.cloneElement(category.icon, { className: "h-8 w-8" })}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {language === 'bn' ? category.name : category.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.count} {language === 'bn' ? 'টি সার্ভিস উপলব্ধ' : 'services available'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">
              {language === 'bn' ? 'সাব-ক্যাটাগরি:' : 'Subcategories:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub, index) => (
                <Badge 
                  key={index} 
                  variant={selectedSubcategory === sub ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? 'all' : sub)}
                >
                  {sub}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">
              {language === 'bn' ? 'বুকিং টাইপ:' : 'Booking Types:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.bookingTypes.map((type, index) => (
                <Badge key={index} variant="secondary">{type}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Services List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {language === 'bn' ? 'উপলব্ধ সার্ভিস সমূহ' : 'Available Services'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredServices.length} {language === 'bn' ? 'টি সার্ভিস পাওয়া গেছে' : ' services found'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <Card 
              key={service.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" 
              onClick={() => handleServiceClick(service.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full" 
                      onClick={e => handleBookmark(e, service.id)}
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full" 
                      onClick={e => handleShare(e, service)}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {service.subcategory}
                    </Badge>
                    {service.isVerified && (
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <CheckCircle className="h-3 w-3" /> 
                        {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1 line-clamp-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                    <span>({service.reviews} {language === 'bn' ? 'রিভিউ' : 'reviews'})</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{service.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.bookingTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-lg">{service.price}</span>
                    <Button size="sm" className="gap-1" onClick={e => handleBookService(e, service.id)}>
                      {language === 'bn' ? 'বুক করুন' : 'Book Now'} <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
