import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter,
  Heart,
  Briefcase,
  ShoppingBag,
  User,
  Scissors,
  Sparkles,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  X,
  ArrowUpRight,
  ArrowRight,
  Award,
  Shield,
  Phone,
  Bookmark,
  Share2,
  Stethoscope,
  Wrench,
  FileText,
  BookOpen,
  Code,
  Music,
  Video,
  Rocket,
  Mail,
  Users,
  ChartBar,
  Globe,
  CreditCard,
  ImageIcon,
  Palette,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<{id: number, name: string, count: number}[]>([]);

  // Services categories with their subcategories
  const categories = [
    { 
      id: 1, 
      name: "মেডিকেল", 
      icon: <Stethoscope className="h-8 w-8 mb-2 text-red-500" />, 
      count: 124,
      subcategories: [
        { id: 101, name: "জেনারেল", count: 48 },
        { id: 102, name: "ডেন্টাল", count: 32 },
        { id: 103, name: "ফিজিওথেরাপি", count: 16 },
        { id: 104, name: "মেন্টাল হেলথ", count: 28 }
      ]
    },
    { 
      id: 2, 
      name: "সেলুন এবং পার্লার", 
      icon: <Scissors className="h-8 w-8 mb-2 text-pink-500" />, 
      count: 56,
      subcategories: [
        { id: 201, name: "হেয়ার কাট", count: 24 },
        { id: 202, name: "ফেসিয়াল", count: 18 },
        { id: 203, name: "মেকাপ", count: 14 }
      ]
    },
    { 
      id: 3, 
      name: "বিউটি", 
      icon: <Sparkles className="h-8 w-8 mb-2 text-purple-500" />, 
      count: 87,
      subcategories: [
        { id: 301, name: "ম্যাসাজ", count: 22 },
        { id: 302, name: "স্কিন কেয়ার", count: 35 },
        { id: 303, name: "মেকওভার", count: 30 }
      ]
    },
    { 
      id: 4, 
      name: "হোম সার্ভিস", 
      icon: <Wrench className="h-8 w-8 mb-2 text-amber-500" />, 
      count: 103,
      subcategories: [
        { id: 401, name: "ইলেকট্রিশিয়ান", count: 32 },
        { id: 402, name: "প্লাম্বার", count: 28 },
        { id: 403, name: "পেইন্টিং", count: 18 },
        { id: 404, name: "ক্লিনিং", count: 25 }
      ]
    },
    { 
      id: 5, 
      name: "পেশাদার সেবা", 
      icon: <Briefcase className="h-8 w-8 mb-2 text-blue-500" />, 
      count: 92,
      subcategories: [
        { id: 501, name: "লিগ্যাল", count: 24 },
        { id: 502, name: "আইটি কনসাল্টেন্ট", count: 35 },
        { id: 503, name: "অ্যাকাউন্টিং", count: 18 },
        { id: 504, name: "কন্সাল্টেন্সি", count: 15 }
      ]
    },
    { 
      id: 6, 
      name: "শিক্ষা", 
      icon: <BookOpen className="h-8 w-8 mb-2 text-green-500" />, 
      count: 78,
      subcategories: [
        { id: 601, name: "প্রাইভেট টিউটর", count: 30 },
        { id: 602, name: "কোচিং", count: 25 },
        { id: 603, name: "অনলাইন কোর্স", count: 23 }
      ]
    },
    { 
      id: 7, 
      name: "ডিজিটাল ক্রিয়েটর", 
      icon: <Code className="h-8 w-8 mb-2 text-indigo-500" />, 
      count: 65,
      subcategories: [
        { id: 701, name: "ওয়েব ডেভেলপমেন্ট", count: 22 },
        { id: 702, name: "গ্রাফিক ডিজাইন", count: 18 },
        { id: 703, name: "কন্টেন্ট রাইটিং", count: 15 },
        { id: 704, name: "ভিডিও এডিটিং", count: 10 }
      ]
    },
    { 
      id: 8, 
      name: "ইভেন্ট", 
      icon: <Calendar className="h-8 w-8 mb-2 text-orange-500" />, 
      count: 45,
      subcategories: [
        { id: 801, name: "ফটোগ্রাফি", count: 15 },
        { id: 802, name: "ডেকোরেশন", count: 12 },
        { id: 803, name: "ক্যাটারিং", count: 18 }
      ]
    },
  ];

  // Digital creator services
  const digitalCreatorServices = [
    { 
      id: 10,
      title: "অনলাইন স্টোর", 
      provider: "টেক ওয়েব সলিউশন",
      category: "ডিজিটাল ক্রিয়েটর",
      subcategory: "ওয়েব ডেভেলপমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳১৫,০০০+",
      rating: 4.8,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      icon: <Rocket className="h-4 w-4 text-blue-600" />,
      description: "নিজের ব্র্যান্ডের ওয়েবসাইট তৈরি করুন",
      isSponsored: false,
      isVerified: true,
      isBookable: true
    },
    { 
      id: 11,
      title: "ইমেইল অটোমেশন", 
      provider: "ডিজিটাল মার্কেটিং সার্ভিসেস",
      category: "ডিজিটাল ক্রিয়েটর",
      subcategory: "মার্কেটিং",
      location: "বনানী, ঢাকা",
      price: "৳৮,০০০+",
      rating: 4.6,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      icon: <Mail className="h-4 w-4 text-indigo-600" />,
      description: "গ্রাহকদের সাথে অটোমেটিক যোগাযোগ",
      isSponsored: true,
      isVerified: true,
      isBookable: true
    },
    { 
      id: 12,
      title: "কোর্স বিল্ডার", 
      provider: "এডুটেক সলিউশনস",
      category: "ডিজিটাল ক্রিয়েটর",
      subcategory: "শিক্ষা",
      location: "মিরপুর, ঢাকা",
      price: "৳১২,০০০+",
      rating: 4.7,
      reviews: 38,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      icon: <BookOpen className="h-4 w-4 text-amber-600" />,
      description: "আয় করুন অনলাইন শিক্ষা দিয়ে",
      isSponsored: false,
      isVerified: true,
      isBookable: true
    },
    { 
      id: 13,
      title: "ইভেন্ট হোস্টিং", 
      provider: "ইভেন্ট প্রোস",
      category: "ইভেন্ট",
      subcategory: "ইভেন্ট ম্যানেজমেন্ট",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳১৮,০০০+",
      rating: 4.5,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      icon: <Calendar className="h-4 w-4 text-red-600" />,
      description: "অনলাইন ও অফলাইন ইভেন্ট ম্যানেজমেন্ট",
      isSponsored: true,
      isVerified: false,
      isBookable: true
    },
    { 
      id: 14,
      title: "১:১ সেশন", 
      provider: "এক্সপার্ট কনেক্ট",
      category: "পেশাদার সেবা",
      subcategory: "কন্সাল্টেন্সি",
      location: "বারিধারা, ঢাকা",
      price: "৳২,০০০/ঘন্টা",
      rating: 4.9,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
      icon: <MessageSquare className="h-4 w-4 text-orange-600" />,
      description: "পারসোনাল কনসালটেশন সেবা",
      isSponsored: false,
      isVerified: true,
      isBookable: true
    },
    { 
      id: 15,
      title: "ডিজিটাল প্রোডাক্ট", 
      provider: "ক্রিয়েটিভ মার্কেট",
      category: "ডিজিটাল ক্রিয়েটর",
      subcategory: "গ্রাফিক ডিজাইন",
      location: "উত্তরা, ঢাকা",
      price: "৳৫,০০০+",
      rating: 4.7,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=1000&auto=format&fit=crop",
      icon: <ShoppingBag className="h-4 w-4 text-green-600" />,
      description: "ইবুক, টেমপ্লেট, সফটওয়্যার বিক্রয়",
      isSponsored: true,
      isVerified: false,
      isBookable: true
    },
  ];

  // Featured services
  const featuredServices = [
    {
      id: 1,
      title: "ডাক্তার কনসাল্টেশন",
      provider: "ডা. আহমেদ হাসান",
      category: "মেডিকেল",
      subcategory: "জেনারেল",
      location: "গুলশান, ঢাকা",
      price: "৳১,৫০০",
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isVerified: true,
      isBookable: true
    },
    {
      id: 2,
      title: "ডেন্টাল চেকআপ",
      provider: "ডা. ফারহানা আক্তার",
      category: "মেডিকেল",
      subcategory: "ডেন্টাল",
      location: "বনানী, ঢাকা",
      price: "৳১,২০০",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isVerified: true,
      isBookable: true
    },
    {
      id: 3,
      title: "সেলুন সার্ভিস",
      provider: "প্রি���িয়াম স্টাইল সেলুন",
      category: "সেলুন এবং পার্লার",
      subcategory: "হেয়ার কাট",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳৮০০+",
      rating: 4.5,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: true
    },
    {
      id: 4,
      title: "বিউটি ট্রিটমেন্ট",
      provider: "গ্ল্যামার পার্লার",
      category: "বিউটি",
      subcategory: "ম্যাসাজ",
      location: "মোহাম্মদপুর, ঢাকা",
      price: "৳১,৫০০+",
      rating: 4.6,
      reviews: 154,
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isBookable: true
    },
    {
      id: 5,
      title: "ফিজিওথেরা���ি",
      provider: "ডা. কামরুল হাসান",
      category: "মেডিকেল",
      subcategory: "ফিজিওথেরাপি",
      location: "মিরপুর, ঢাকা",
      price: "৳১,৮০০",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isVerified: true,
      isBookable: true
    },
    {
      id: 6,
      title: "ইলেকট্রিশিয়ান",
      provider: "রাসেল ইলেকট্রিক",
      category: "হোম সার্ভিস",
      subcategory: "ইলেকট্রিশিয়ান",
      location: "উত্তরা, ঢাকা",
      price: "৳৫০০+",
      rating: 4.5,
      reviews: 132,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: false
    },
    {
      id: 7,
      title: "ম্যাসাজ থেরাপি",
      provider: "রিলাক্স স্পা সেন্টার",
      category: "বিউটি",
      subcategory: "ম্যাসাজ",
      location: "বারিধারা, ঢাকা",
      price: "৳২,২০০",
      rating: 4.7,
      reviews: 176,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isBookable: true
    },
    {
      id: 8,
      title: "হেয়ার কালার",
      provider: "ট্রেন্ডি সেলুন",
      category: "সেলুন এবং পার্লার",
      subcategory: "হেয়ার কালার",
      location: "নিউ মার্কেট, ঢাকা",
      price: "৳১,২০০+",
      rating: 4.4,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: true
    },
  ];

  // Banner images for services
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      title: "পেশাদার সার্ভিস প্রভাইডারদের সাথে",
      description: "১০০০+ বেরিফাইড সার্ভিস প্রোভাইডার"
    },
    {
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      title: "ডেন্টাল সার্ভিস স্পেশাল অফার",
      description: "২০% ছাড় সকল ডেন্টাল সার্ভিসে"
    },
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      title: "প্রিমিয়াম স্পা এবং ওয়েলনেস",
      description: "সর্বোচ্চ মানের রিলাক্সেশন সার্ভিস"
    }
  ];

  // Effect to update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(c => c.id.toString() === selectedCategory);
      setSubcategories(category?.subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleServiceClick = (id: number) => {
    navigate(`/services/${id}`);
  };

  const handleCategoryClick = (id: number) => {
    navigate(`/services/category/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "সার্ভিসটি শেয়ার করার লিংক কপি করা হয়েছে",
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">সার্ভিস</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="সার্ভিস খুঁজুন" className="pl-9 pr-16" />
            <Button 
              variant="default" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              খুঁজুন
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={handleFilterToggle}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter panel - conditionally rendered */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ক্যাটেগরি</h3>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {subcategories.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-sm font-medium mb-2">সাব-ক্যাটেগরি</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {subcategories.map(sub => (
                      <Button key={sub.id} variant="outline" size="sm" className="justify-start">
                        {sub.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">মূল্য সীমা</h3>
              <Slider
                defaultValue={[500, 5000]}
                max={10000}
                step={100}
              />
              <div className="flex justify-between mt-2">
                <div className="text-sm">৳500</div>
                <div className="text-sm">৳10,000</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">রেটিং</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="rating5" className="mr-2" />
                  <label htmlFor="rating5" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating4" className="mr-2" />
                  <label htmlFor="rating4" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating3" className="mr-2" />
                  <label htmlFor="rating3" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={handleFilterToggle}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ক্যাটেগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon}
              <span className="text-xs text-center font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-3">
          {categories.slice(4).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon}
              <span className="text-xs text-center font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={banner.url} 
                    alt={banner.title}
                    className="w-full h-40 md:h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-bold">{banner.title}</h3>
                    <p className="text-white text-sm mt-1">{banner.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Featured Services */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">ফিচার্ড সার্ভিস</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => navigate('/services')}>
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...featuredServices, ...digitalCreatorServices].slice(0, 8).map((service) => (
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
                {service.isSponsored && (
                  <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">স্পন্সর্ড</Badge>
                )}
                {service.isVerified && (
                  <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                  </Badge>
                )}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button variant="outline" size="icon" className="h-7 w-7 bg-white rounded-full"
                    onClick={(e) => handleBookmark(e, service.id)}>
                    <Bookmark className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 bg-white rounded-full"
                    onClick={(e) => handleShare(e, service.id)}>
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">{service.category}</Badge>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{service.location}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold text-primary">{service.price}</p>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    বুক করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking & Hiring Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="book">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="book" className="flex-1">বুক করুন</TabsTrigger>
            <TabsTrigger value="hire" className="flex-1">হায়ার করুন</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredServices.filter((_, index) => index < 6).map((service, index) => (
                <Card 
                  key={service.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative h-full"
                  onClick={() => handleServiceClick(service.id)}
                >
                  {service.isSponsored && (
                    <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">স্পন্সর্ড</Badge>
                  )}
                  <div className="flex h-full flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover aspect-square md:aspect-auto"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleBookmark(e, service.id)}>
                          <Bookmark className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleShare(e, service.id)}>
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline">{service.category}</Badge>
                          {service.isVerified && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-center text-xs mb-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{service.rating}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span>{service.reviews} রিভিউ</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">{service.price}</span>
                        <Button size="sm" className="gap-1">
                          {service.isBookable ? 'বুক করুন' : 'যোগাযোগ করুন'} <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hire">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredServices.filter((_, index) => index >= 2 && index < 8).map((service) => (
                <Card 
                  key={service.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative h-full"
                  onClick={() => handleServiceClick(service.id)}
                >
                  {service.isSponsored && (
                    <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">স্পন্সর্ড</Badge>
                  )}
                  <div className="flex h-full flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover aspect-square md:aspect-auto"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleBookmark(e, service.id)}>
                          <Bookmark className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleShare(e, service.id)}>
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline">{service.category}</Badge>
                          {service.isVerified && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-center text-xs mb-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{service.rating}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span>{service.reviews} রিভিউ</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">{service.price}</span>
                        <Button size="sm" className="gap-1">
                          হায়ার করুন <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
