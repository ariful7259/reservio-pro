
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Filter, ArrowRight, Scissors, MessageCircle, Clock, Star, Heart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Service categories
  const serviceCategories = [
    { name: "ডাক্তার", path: "/services/category/medical", count: 123 },
    { name: "ডেন্টাল", path: "/services/category/dental", count: 45 },
    { name: "মেন্টাল হেলথ", path: "/services/category/mental-health", count: 32 },
    { name: "সেলুন", path: "/services/category/salon", count: 67 },
    { name: "পার্লার", path: "/services/category/parlour", count: 53 },
    { name: "ল", path: "/services/category/legal", count: 28 },
    { name: "রিপেয়ার", path: "/services/category/repair", count: 74 },
    { name: "হোম সার্ভিস", path: "/services/category/home-service", count: 62 },
    { name: "বিউটি", path: "/services/category/beauty", count: 89 },
    { name: "কনসালটেন্সি", path: "/services/category/consultancy", count: 41 },
  ];
  
  // Sample professional services data
  const professionalServices = [
    {
      id: "1",
      title: "জেনারেল হেলথ কনসালটেশন",
      provider: "ডাঃ আহমেদ হাসান",
      imageUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      price: 1500,
      duration: "৩০ মিনিট",
      tags: ["জেনেরাল", "ফিজিক্যাল"],
      buttonLabel: "অ্যাপয়েন্টমেন্ট বুক করুন"
    },
    {
      id: "2",
      title: "ডেন্টাল চেকআপ",
      provider: "ডাঃ শাহিন আক্তার",
      imageUrl: "https://images.unsplash.com/photo-1606811842243-af7be28a43dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      price: 2000,
      discount: 10,
      duration: "৪৫ মিনিট",
      tags: ["দাঁত", "চেকআপ"],
      buttonLabel: "অ্যাপয়েন্টমেন্ট বুক করুন"
    },
    {
      id: "3",
      title: "সাইকোলজিক্যাল কাউন্সেলিং",
      provider: "ফারহানা জামান",
      imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      price: 3000,
      duration: "৬০ মিনিট",
      tags: ["মানসিক স্বাস্থ্য", "কাউন্সেলিং"],
      buttonLabel: "অ্যাপয়েন্টমেন্ট বুক করুন"
    },
    {
      id: "4",
      title: "জটিল রোগের কনসালটেশন",
      provider: "ডাঃ কামাল রেজা",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      price: 2500,
      duration: "৪৫ মিনিট",
      tags: ["বিশেষজ্ঞ", "জটিল রোগ"],
      buttonLabel: "অ্যাপয়েন্টমেন্ট বুক করুন"
    },
  ];
  
  // Sample non-professional services data
  const nonProfessionalServices = [
    {
      id: "5",
      title: "কাট এন্ড স্টাইল",
      provider: "স্টাইলিশ বিউটি সেলুন",
      imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      price: 500,
      duration: "৪৫ মিনিট",
      tags: ["হেয়ার", "স্টাইল"],
      buttonLabel: "বুক করুন"
    },
    {
      id: "6",
      title: "স্কিন কেয়ার ফেসিয়াল",
      provider: "গ্লো বিউটি পার্লার",
      imageUrl: "https://images.unsplash.com/photo-1596755471730-bc5166332a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      price: 1200,
      discount: 15,
      duration: "৬০ মিনিট",
      tags: ["স্কিন কেয়ার", "ফেসিয়াল"],
      buttonLabel: "বুক করুন"
    },
    {
      id: "7",
      title: "ইলেকট্রনিক্স রিপেয়ার",
      provider: "টেক সার্ভিস সেন্টার",
      imageUrl: "https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.3,
      price: 800,
      duration: "১-২ ঘণ্টা",
      tags: ["রিপেয়ার", "ইলেকট্রনিক্স"],
      buttonLabel: "বুক করুন"
    },
    {
      id: "8",
      title: "হোম ক্লিনিং",
      provider: "স্মার্ট ক্লিনার্স",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      price: 1500,
      duration: "৩ ঘণ্টা",
      tags: ["ক্লিনিং", "হোম সার্ভিস"],
      buttonLabel: "বুক করুন"
    },
  ];
  
  // Recommended services
  const recommendedServices = [
    professionalServices[0],
    nonProfessionalServices[0],
    professionalServices[1],
    nonProfessionalServices[1]
  ];
  
  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implementation for search functionality
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">সার্ভিস</h1>
      
      {/* Search and Filter */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="সার্ভিস খুঁজুন" 
            className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="default" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </form>
      </div>
      
      {/* Service Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">ক্যাটাগরি</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={() => navigate('/services/categories')}
          >
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {serviceCategories.slice(0, 5).map((category, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => navigate(category.path)}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {index === 3 ? (
                  <Scissors className="h-6 w-6" />
                ) : (
                  <Search className="h-6 w-6" />
                )}
              </div>
              <span className="text-xs font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-1 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>
      
      {/* Book and Hire Sections */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">সার্ভিস বুক করুন</h3>
              <p className="text-sm text-gray-600 mb-4">প্রফেশনাল সার্ভিস বুক করে সময় বাঁচান</p>
              <Button 
                variant="default" 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate('/services/book')}
              >
                বুক করুন
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden bg-gradient-to-r from-amber-50 to-orange-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <MessageCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">প্রফেশনাল হায়ার করুন</h3>
              <p className="text-sm text-gray-600 mb-4">প্রফেশনাল ব্যক্তিদের সাথে যোগাযোগ করুন</p>
              <Button 
                variant="default" 
                className="bg-amber-500 hover:bg-amber-600"
                onClick={() => navigate('/services/hire')}
              >
                হায়ার করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Services Tabs */}
      <div className="mb-8">
        <Tabs defaultValue="recommended">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="recommended">রেকমেন্ডেড</TabsTrigger>
            <TabsTrigger value="professional">প্রফেশনাল</TabsTrigger>
            <TabsTrigger value="non-professional">নন-প্রফেশনাল</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {recommendedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  provider={service.provider}
                  imageUrl={service.imageUrl}
                  rating={service.rating}
                  price={service.price}
                  discount={service.discount}
                  duration={service.duration}
                  tags={service.tags}
                  buttonLabel={service.buttonLabel}
                  onClick={handleServiceClick}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 mx-auto"
                onClick={() => navigate('/services/all')}
              >
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="professional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {professionalServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  provider={service.provider}
                  imageUrl={service.imageUrl}
                  rating={service.rating}
                  price={service.price}
                  discount={service.discount}
                  duration={service.duration}
                  tags={service.tags}
                  buttonLabel={service.buttonLabel}
                  onClick={handleServiceClick}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 mx-auto"
                onClick={() => navigate('/services/professional')}
              >
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="non-professional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {nonProfessionalServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  provider={service.provider}
                  imageUrl={service.imageUrl}
                  rating={service.rating}
                  price={service.price}
                  discount={service.discount}
                  duration={service.duration}
                  tags={service.tags}
                  buttonLabel={service.buttonLabel}
                  onClick={handleServiceClick}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-1 mx-auto"
                onClick={() => navigate('/services/non-professional')}
              >
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Highlighted Services */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">আজকের সেরা অফার</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={() => navigate('/services/offers')}
          >
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Card className="overflow-hidden border-orange-200">
            <div className="h-40 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1595745822695-859878c7bf1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Premium Service"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-orange-500">২৫% ছাড়</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">প্রিমিয়াম মেডিকেল চেকআপ</h3>
                <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-medium">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4" />
                <span>প্রিমিয়াম হসপিটাল, গুলশান</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                <Clock className="h-4 w-4" />
                <span>১২০ মিনিট</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-primary font-bold">৳৫,০০০</span>
                  <span className="text-muted-foreground text-sm line-through ml-2">৳৭,৫০০</span>
                </div>
                <Button 
                  variant="default"
                  onClick={() => navigate('/services/premium-checkup')}
                >
                  বুক করুন
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-blue-200">
            <div className="h-40 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dental Service"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-blue-500">২০% ছাড়</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">কমপ্লিট ডেন্টাল কেয়ার</h3>
                <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4" />
                <span>ডেন্টাল প্রো ক্লিনিক, বনানী</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                <Clock className="h-4 w-4" />
                <span>৯০ মিনিট</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-primary font-bold">৳৩,২০০</span>
                  <span className="text-muted-foreground text-sm line-through ml-2">৳৪,০০০</span>
                </div>
                <Button 
                  variant="default"
                  onClick={() => navigate('/services/dental-care')}
                >
                  বুক করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recently Viewed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">সাম্প্রতিক দেখা সার্ভিস</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={() => navigate('/services/recently-viewed')}
          >
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {professionalServices.slice(0, 2).map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              provider={service.provider}
              imageUrl={service.imageUrl}
              rating={service.rating}
              price={service.price}
              discount={service.discount}
              duration={service.duration}
              tags={service.tags}
              buttonLabel={service.buttonLabel}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
