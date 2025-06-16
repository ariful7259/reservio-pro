import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building, 
  Search, 
  ShoppingBag,
  ChevronLeft,
  Camera,
  MapPin,
  Tag,
  DollarSign,
  Clock,
  Info,
  Smartphone,
  Monitor,
  Headphones,
  Car,
  Home,
  Briefcase,
  Bike,
  Book,
  FileText,
  Code,
  Music,
  Video,
  Palette,
  ImageIcon,
  Scissors,
  User,
  Stethoscope,
  Wrench,
  Sparkles,
  BookOpen,
  Shield,
  Laptop,
  TabletSmartphone,
  Printer,
  Speaker,
  Bus,
  Truck,
  MountainSnow,
  Tent,
  Armchair,
  AirVent,
  ShoppingCart,
  Flame,
  Power,
  Tractor,
  Droplets,
  Wind,
  Store,
  BarChart4,
  ShoppingBag as ShoppingBagIcon,
  PencilRuler,
  Building2,
  Inspect,
  PenTool,
  Hotel,
  BedDouble,
  DoorOpen,
  ShieldAlert,
  Coffee,
  Users,
  Hammer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { usePostStore } from '@/store/usePostStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from '@/components/ui/slider';

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get postType from query string initially
  const getTypeFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'service' || type === 'marketplace') return type;
    return 'rent' as 'rent' | 'service' | 'marketplace';
  };

  // State for post type, synchronizing with query param
  const [postType, setPostType] = useState<'rent' | 'service' | 'marketplace'>(getTypeFromQuery());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<{name: string, value: string, icon?: JSX.Element}[]>([]);

  const [rentForm, setRentForm] = useState({
    title: '',
    category: '',
    subcategory: '',
    location: '',
    price: '',
    period: 'month',
    description: '',
    images: [] as File[]
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: '',
    subcategory: '',
    location: '',
    price: '',
    duration: '',
    timeUnit: 'minutes',
    description: '',
    images: [] as File[]
  });

  const [marketplaceForm, setMarketplaceForm] = useState({
    title: '',
    category: '',
    subcategory: '',
    price: '',
    discountPrice: '',
    tags: '',
    description: '',
    images: [] as File[]
  });

  const [housingFeatures, setHousingFeatures] = useState({
    furnishing: 'all',
    bedrooms: 'all',
    priceRange: [5000, 50000],
    amenities: [] as string[],
    peopleType: 'all', // নতুন key!
  });

  const amenityItems = [
    { value: "wifi", label: "ওয়াইফাই" },
    { value: "ac", label: "এসি" },
    { value: "lift", label: "লিফট" },
    { value: "generator", label: "জেনারেটর" },
    { value: "security", label: "নিরাপত্তা" },
    { value: "parking", label: "পার্কিং" },
    { value: "garden", label: "গার্ডেন" },
    { value: "roof", label: "ছাদ" },
    { value: "gym", label: "জিম" },
    { value: "gas", label: "গ্যাস" },
    { value: "swimming-pool", label: "সুইমিং পুল" },
    { value: "community-hall", label: "কমিউনিটি হল" },
  ];

  const rentCategories = [
    { 
      name: 'বাসা বাড়ি', 
      value: 'housing', 
      icon: <Home className="h-5 w-5 text-primary" />, 
      subcategories: [
        { name: 'সব ধরন', value: 'all' },
        { name: 'অ্যাপার্টমেন্ট', value: 'apartment' },
        { name: 'বাসা/বাড়ি', value: 'house' },
        { name: 'মেস', value: 'mess' },
        { name: 'শেয়ারড', value: 'shared' },
        { name: 'হোস্টেল', value: 'hostel' },
      ] 
    },
    { name: 'ইলেকট্রনিক্স', value: 'electronics', icon: <Laptop className="h-5 w-5 text-blue-500" />, subcategories: [] },
    { name: 'পরিবহন', value: 'transport', icon: <Car className="h-5 w-5 text-red-500" />, subcategories: [] },
    { name: 'ইভেন্ট সামগ্রী', value: 'event', icon: <Tent className="h-5 w-5 text-green-500" />, subcategories: [] },
    { name: 'ঘরোয়া সামগ্রী', value: 'home-items', icon: <Armchair className="h-5 w-5 text-purple-500" />, subcategories: [] },
    { name: 'শিক্ষা সামগ্রী', value: 'education', icon: <BookOpen className="h-5 w-5 text-orange-500" />, subcategories: [] },
    { name: 'কৃষি যন্ত্রপাতি', value: 'agriculture', icon: <Tractor className="h-5 w-5 text-yellow-500" />, subcategories: [] },
    { name: 'ব্যবসায়িক সামগ্রী', value: 'business', icon: <Store className="h-5 w-5 text-pink-500" />, subcategories: [] },
    { name: 'কারিগরি টুলস', value: 'tools', icon: <Hammer className="h-5 w-5 text-gray-500" />, subcategories: [] },
    { name: 'কমার্শিয়াল স্পেস', value: 'commercial', icon: <Briefcase className="h-5 w-5 text-indigo-500" />, subcategories: [] },
    { name: 'গ্রামীণ বাসস্থান', value: 'rural', icon: <Building2 className="h-5 w-5 text-emerald-500" />, subcategories: [] },
    { name: 'স্টুডিও/স্পেশাল স্পেস', value: 'studio', icon: <Camera className="h-5 w-5 text-violet-500" />, subcategories: [] },
  ];

  const serviceCategories = [
    { 
      name: 'মেডিকেল', 
      value: 'medical',
      icon: <Stethoscope className="h-4 w-4 text-red-500" />,
      subcategories: [
        { name: 'জেনারেল', value: 'general-medical', icon: <Stethoscope className="h-4 w-4 text-red-500" /> },
        { name: 'স্পেশালিস্ট', value: 'specialist', icon: <User className="h-4 w-4 text-red-500" /> }
      ]
    },
    { 
      name: 'ডেন্টাল', 
      value: 'dental',
      icon: <Sparkles className="h-4 w-4 text-blue-500" />,
      subcategories: [
        { name: 'জেনারেল ডেন্টাল', value: 'general-dental', icon: <Sparkles className="h-4 w-4 text-blue-500" /> },
        { name: 'সার্জারি', value: 'dental-surgery', icon: <Scissors className="h-4 w-4 text-blue-500" /> }
      ]
    },
    { 
      name: 'লিগ্যাল', 
      value: 'legal',
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      subcategories: [
        { name: 'আইনি পরামর্শ', value: 'legal-advice', icon: <FileText className="h-4 w-4 text-amber-500" /> },
        { name: 'ডকুমেন্ট প্রস্তুত', value: 'document-preparation', icon: <FileText className="h-4 w-4 text-amber-500" /> }
      ]
    },
    { 
      name: 'সেলুন', 
      value: 'salon',
      icon: <Scissors className="h-4 w-4 text-pink-500" />,
      subcategories: [
        { name: 'হেয়ার কাট', value: 'hair-cut', icon: <Scissors className="h-4 w-4 text-pink-500" /> },
        { name: 'ফেসিয়াল', value: 'facial', icon: <Sparkles className="h-4 w-4 text-pink-500" /> }
      ]
    },
    { 
      name: 'পার্লার', 
      value: 'parlor',
      icon: <Sparkles className="h-4 w-4 text-purple-500" />,
      subcategories: [
        { name: 'মেকাপ', value: 'makeup', icon: <Sparkles className="h-4 w-4 text-purple-500" /> },
        { name: 'স্কিন কেয়ার', value: 'skin-care', icon: <Sparkles className="h-4 w-4 text-purple-500" /> }
      ]
    },
    { 
      name: 'রিপেয়ার', 
      value: 'repair',
      icon: <Wrench className="h-4 w-4 text-gray-500" />,
      subcategories: [
        { name: 'ইলেকট্রনিক্স', value: 'electronics-repair', icon: <Smartphone className="h-4 w-4 text-gray-500" /> },
        { name: 'ভেহিকেল', value: 'vehicle-repair', icon: <Car className="h-4 w-4 text-gray-500" /> }
      ]
    }
  ];

  const marketplaceCategories = [
    { 
      name: 'হেলথ', 
      value: 'health',
      icon: <Stethoscope className="h-4 w-4 text-red-500" />,
      subcategories: [
        { name: 'ডায়েট সাপ্লিমেন্ট', value: 'diet-supplement', icon: <Stethoscope className="h-4 w-4 text-red-500" /> },
        { name: 'হেলথকেয়ার', value: 'healthcare', icon: <Stethoscope className="h-4 w-4 text-red-500" /> }
      ]
    },
    { 
      name: 'ফিটনেস', 
      value: 'fitness',
      icon: <User className="h-4 w-4 text-green-500" />,
      subcategories: [
        { name: 'জিম ইকুপমেন্ট', value: 'gym-equipment', icon: <User className="h-4 w-4 text-green-500" /> },
        { name: 'ফিটনেস ট্র্যাকার', value: 'fitness-tracker', icon: <Smartphone className="h-4 w-4 text-green-500" /> }
      ]
    },
    { 
      name: 'ডিজিটাল প্রোডাক্ট', 
      value: 'digital',
      icon: <Code className="h-4 w-4 text-blue-500" />,
      subcategories: [
        { name: 'কোর্স', value: 'course', icon: <BookOpen className="h-4 w-4 text-blue-500" /> },
        { name: 'ইবুক', value: 'ebook', icon: <FileText className="h-4 w-4 text-blue-500" /> },
        { name: 'টেমপ্লেট', value: 'template', icon: <Palette className="h-4 w-4 text-blue-500" /> },
        { name: 'সফটওয়্যার', value: 'software', icon: <Code className="h-4 w-4 text-blue-500" /> },
        { name: 'অডিও', value: 'audio', icon: <Music className="h-4 w-4 text-blue-500" /> },
        { name: 'ভিডিও', value: 'video', icon: <Video className="h-4 w-4 text-blue-500" /> },
      ]
    },
    { 
      name: 'ইলেক্ট্রনিক্স', 
      value: 'electronics',
      icon: <Smartphone className="h-4 w-4 text-indigo-500" />,
      subcategories: [
        { name: 'স্মার্টফোন', value: 'smartphone', icon: <Smartphone className="h-4 w-4 text-indigo-500" /> },
        { name: 'ল্যাপটপ', value: 'laptop', icon: <Monitor className="h-4 w-4 text-indigo-500" /> },
        { name: 'স্মার্ট ওয়াচ', value: 'smartwatch', icon: <Clock className="h-4 w-4 text-indigo-500" /> }
      ]
    }
  ];

  const addPost = usePostStore((state) => state.addPost);

  // --- NEW: Sync postType with URL query string ---
  useEffect(() => {
    const queryType = getTypeFromQuery();
    if (postType !== queryType) {
      setPostType(queryType);
    }
    // eslint-disable-next-line
  }, [location.search]);

  // Auto update subcategory list based on category select
  useEffect(() => {
    let categories;
    let catValue;

    if(postType === 'rent') {
      categories = rentCategories;
      catValue = rentForm.category;
    } else if(postType === 'service') {
      categories = serviceCategories;
      catValue = serviceForm.category;
    } else {
      categories = marketplaceCategories;
      catValue = marketplaceForm.category;
    }

    const catObj = categories.find(c => c.value === catValue);
    if(catObj && catObj.subcategories && catObj.subcategories.length > 0) {
      setSubcategories(catObj.subcategories);
    } else {
      setSubcategories([]);
    }
  // পোস্টটাইপ, এবং সংশ্লিষ্ট ফর্মের ক্যাটাগরি পরিবর্তনে চলবে:
  }, [postType, rentForm.category, serviceForm.category, marketplaceForm.category]);

  const handleFileUpload = (files: FileList | null, type: 'rent' | 'service' | 'marketplace') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    
    if (type === 'rent') {
      setRentForm({...rentForm, images: [...rentForm.images, ...fileArray]});
    } else if (type === 'service') {
      setServiceForm({...serviceForm, images: [...serviceForm.images, ...fileArray]});
    } else {
      setMarketplaceForm({...marketplaceForm, images: [...marketplaceForm.images, ...fileArray]});
    }
  };

  const handleSubmit = (type: 'rent' | 'service' | 'marketplace') => {
    setIsSubmitting(true);

    const uid = Date.now().toString() + Math.random().toString(36).substring(2);
    let newPost: any;
    if (type === 'rent') {
      newPost = {
        id: uid,
        type: 'rent',
        title: rentForm.title,
        description: rentForm.description,
        category: rentForm.category,
        subcategory: rentForm.subcategory,
        location: rentForm.location,
        price: rentForm.price,
        images: [],
        period: rentForm.period,
        createdAt: new Date()
      };
    } else if (type === 'service') {
      newPost = {
        id: uid,
        type: 'service',
        title: serviceForm.title,
        description: serviceForm.description,
        category: serviceForm.category,
        subcategory: serviceForm.subcategory,
        location: serviceForm.location,
        price: serviceForm.price,
        images: [],
        duration: serviceForm.duration,
        timeUnit: serviceForm.timeUnit,
        createdAt: new Date()
      };
    } else {
      newPost = {
        id: uid,
        type: 'marketplace',
        title: marketplaceForm.title,
        description: marketplaceForm.description,
        category: marketplaceForm.category,
        subcategory: marketplaceForm.subcategory,
        price: marketplaceForm.price,
        discountPrice: marketplaceForm.discountPrice,
        tags: marketplaceForm.tags,
        images: [],
        createdAt: new Date()
      };
    }

    setTimeout(() => {
      setIsSubmitting(false);
      addPost(newPost);

      toast({
        title: "পোস্ট সফলভাবে তৈরি হয়েছে",
        description: "আপনার পোস্ট এখন প্রদর্শিত হবে",
      });

      if (type === 'rent') {
        navigate('/rentals');
      } else if (type === 'service') {
        navigate('/services');
      } else {
        navigate('/shopping');
      }
    }, 1500);
  };

  const getCategoryIcon = (type: 'rent' | 'service' | 'marketplace', categoryValue: string) => {
    if (type === 'rent') {
      return rentCategories.find(c => c.value === categoryValue)?.icon;
    } else if (type === 'service') {
      return serviceCategories.find(c => c.value === categoryValue)?.icon;
    } else {
      return marketplaceCategories.find(c => c.value === categoryValue)?.icon;
    }
  };

  // On tab change, also update the URL (for deep linking)
  const handleTabChange = (value: string) => {
    let typeParam = '';
    if (value === 'service') typeParam = '?type=service';
    else if (value === 'marketplace') typeParam = '?type=marketplace';
    else typeParam = '';
    navigate('/create-post' + typeParam, { replace: true });
  };

  const rentFeatureDetails = [
    {
      title: "লং এবং শর্ট টার্ম",
      icon: <Clock className="h-8 w-8 md:h-10 md:w-10 text-amber-500 mb-2" />,
      desc: "দৈনিক, মাসিক, বা বার্ষিক ভিত্তিতে ভাড়া দিন",
      details: "এই ফিচারের মাধ্যমে আপনার প্রয়োজন অনুযায়ী সংক্ষিপ্ত/দীর্ঘ মেয়াদে ভাড়া দিতে পারবেন। কাস্টমার যেমন চায়, তেমন ফ্লেক্সিবিলিটি! যেমন: বাড়ি ৩ দিনের জন্য, গাড়ি ১ সপ্তাহের জন্য—সব সুযোগ।"
    },
    {
      title: "ভেরিফাইড পেমেন্ট",
      icon: <Shield className="h-8 w-8 md:h-10 md:w-10 text-green-500 mb-2" />,
      desc: "সুরক্ষিত লেনদেন নিশ্চিত করুন",
      details: "পেমেন্ট gateway ইন্টেগ্রেশনের মাধ্যমে লেনদেন সুরক্ষিত, ক্যাশ অন ডেলিভারি অথবা ডিজিটাল পেমেন্ট — যা নিয়েছেন, সব ডিল ট্র্যাক ও পেমেন্ট কনফার্মেশন পাবেন।"
    },
    {
      title: "চুক্তি তৈরি",
      icon: <Book className="h-8 w-8 md:h-10 md:w-10 text-blue-500 mb-2" />,
      desc: "অটোমেটিক রেন্টাল এগ্রিমেন্ট তৈরি করুন",
      details: "নির্বাচিত অর্ডার ও ব্যবহারকারীর তথ্য থেকে স্বয়ংক্রিয়ভাবে এগ্রিমেন্ট জেনারেশন—রেন্ট চালু হওয়ার সাথে সাথে কপি ডাউনলোডও নিশ্চিত।"
    },
  ];

  const RentFeatureCard: React.FC<{
    icon: React.ReactNode; title: string; desc: string; details: string;
  }> = ({ icon, title, desc, details }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="w-full rounded-lg bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm hover:from-white hover:to-white/90 shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 focus:ring-2 ring-primary/20 group px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 flex flex-col items-center text-center outline-none cursor-pointer active:scale-[0.98] hover:scale-[1.02] transform"
            aria-label={`${title} details`}
          >
            <div className="pointer-events-none transition-transform duration-200 group-hover:scale-110">{icon}</div>
            <h3 className="font-semibold text-sm sm:text-base md:text-base group-hover:text-primary transition-colors duration-200 mt-1">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
            <span className="mt-2 text-xs font-medium text-primary/80 group-hover:text-primary group-hover:underline transition-all duration-200">বিস্তারিত দেখুন</span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {details}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">পোস্ট করুন</h1>
      </div>

      <Tabs value={postType} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="rent" className="flex items-center gap-2">
            <Building className="h-4 w-4 text-amber-500" /> রেন্ট
          </TabsTrigger>
          <TabsTrigger value="service" className="flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-500" /> সার্ভিস
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-purple-500" /> মার্কেটপ্লেস
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rent" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>শিরোনাম</Label>
                  <Input 
                    placeholder="শিরোনাম লিখুন" 
                    value={rentForm.title}
                    onChange={(e) => setRentForm({...rentForm, title: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select 
                    value={rentForm.category}
                    onValueChange={(value) => setRentForm({...rentForm, category: value, subcategory: ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {rentCategories.map(category => (
                        <SelectItem key={category.value} value={category.value} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {rentForm.category && subcategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label>সাব-ক্যাটাগরি</Label>
                    <Select 
                      value={rentForm.subcategory}
                      onValueChange={(value) => setRentForm({...rentForm, subcategory: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map(sub => (
                          <SelectItem key={sub.value} value={sub.value}>
                            {sub.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <Label>লোকেশন</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      placeholder="লোকেশন লিখুন" 
                      value={rentForm.location}
                      onChange={(e) => setRentForm({...rentForm, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ভাড়া (প্রতি মাস/দিন)</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={rentForm.price}
                      onChange={(e) => setRentForm({...rentForm, price: e.target.value})}
                    />
                    <Select 
                      defaultValue="month"
                      value={rentForm.period}
                      onValueChange={(value) => setRentForm({...rentForm, period: value})}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="পিরিয়ড" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">ঘন্টা</SelectItem>
                        <SelectItem value="day">দিন</SelectItem>
                        <SelectItem value="month">মাস</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea 
                    placeholder="এখানে বিস্তারিত লিখুন..." 
                    className="min-h-[120px]"
                    value={rentForm.description}
                    onChange={(e) => setRentForm({...rentForm, description: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, 'rent')}
                    />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                  {rentForm.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">{rentForm.images.length} টি ছবি আপলোড করা হয়েছে</p>
                    </div>
                  )}
                </div>
                
                {/* --- New: Filter section, only for "housing" + subcategory selected --- */}
                {(rentForm.category === "housing" && rentForm.subcategory) && (
                  <div className="border rounded-lg p-4 bg-white/80 my-3 shadow-sm">
                    <h3 className="font-semibold flex items-center gap-2 text-base mb-2">
                      <svg width="18" height="18" className="inline-block"><path fill="currentColor" d="M3 8v2a6 6 0 1012 0V8" opacity=".2"/><path d="M9 3v4m0 0l-2-2m2 2l2-2M4 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      বিস্তারিত ফিল্টার
                    </h3>
                    <div className="flex flex-col gap-3 md:flex-row">
                      {/* Furnishing */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="text-sm font-medium mb-1 block">ফার্নিশিং</label>
                        <Select value={housingFeatures.furnishing} onValueChange={(value) => setHousingFeatures(f => ({...f, furnishing: value}))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="সব ধরন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">সব ধরন</SelectItem>
                            <SelectItem value="furnished">ফার্নিশড</SelectItem>
                            <SelectItem value="semi-furnished">সেমি-ফার্নিশড</SelectItem>
                            <SelectItem value="unfurnished">আনফার্নিশড</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Bedrooms */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="text-sm font-medium mb-1 block">বেডরুম</label>
                        <Select value={housingFeatures.bedrooms} onValueChange={(value) => setHousingFeatures(f => ({...f, bedrooms: value}))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="সব" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">সব</SelectItem>
                            <SelectItem value="1">১ বেডরুম</SelectItem>
                            <SelectItem value="2">২ বেডরুম</SelectItem>
                            <SelectItem value="3">৩ বেডরুম</SelectItem>
                            <SelectItem value="4+">৪+ বেডরুম</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Price slider */}
                      <div className="flex-1 min-w-[220px]">
                        <label className="text-sm font-medium mb-1 block text-end md:text-left md:mb-0">
                          <span>মূল্য সীমা: ৳{housingFeatures.priceRange[0].toLocaleString()} - ৳{housingFeatures.priceRange[1].toLocaleString()}</span>
                        </label>
                        <div className="px-0 pt-2">
                          <Slider
                            value={housingFeatures.priceRange}
                            onValueChange={value => setHousingFeatures(f => ({...f, priceRange: value as [number, number]}))}
                            max={50000}
                            min={5000}
                            step={500}
                            className="w-full"
                          />
                        </div>
                      </div>
                      {/* ======= New: People type ======= */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="text-sm font-medium mb-1 block">জন প্রকার</label>
                        <Select
                          value={housingFeatures.peopleType}
                          onValueChange={value => setHousingFeatures(f => ({ ...f, peopleType: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="সকল" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">সকল</SelectItem>
                            <SelectItem value="male">পুরুষ</SelectItem>
                            <SelectItem value="female">মহিলা</SelectItem>
                            <SelectItem value="family">ফ্যামিলি</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* ======= /People type ======= */}
                    </div>
                    {/* Amenities checkboxes */}
                    <div className="mt-4">
                      <label className="text-sm font-medium mb-2 block">সুবিধাসমূহ</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {amenityItems.map(item => (
                          <label key={item.value} className="flex items-center gap-2 text-sm font-normal cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={housingFeatures.amenities.includes(item.value)}
                              onChange={e => {
                                setHousingFeatures(f => ({
                                  ...f,
                                  amenities: e.target.checked
                                    ? [...f.amenities, item.value]
                                    : f.amenities.filter(a => a !== item.value)
                                }))
                              }}
                              className="accent-red-400 w-4 h-4 border-2 rounded"
                            />
                            {item.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">রেন্ট ফিচারস</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {rentFeatureDetails.map((f, i) => (
                  <RentFeatureCard key={i} {...f} />
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg focus:shadow-lg active:scale-[0.98] text-base" 
              onClick={() => handleSubmit('rent')} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'পোস্ট করুন'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>সার্ভিসের নাম</Label>
                  <Input 
                    placeholder="সার্ভিসের নাম লিখুন" 
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select 
                    value={serviceForm.category}
                    onValueChange={(value) => setServiceForm({...serviceForm, category: value, subcategory: ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(category => (
                        <SelectItem key={category.value} value={category.value} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {serviceForm.category && subcategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label>সাব-ক্যাটাগরি</Label>
                    <Select 
                      value={serviceForm.subcategory}
                      onValueChange={(value) => setServiceForm({...serviceForm, subcategory: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map(sub => (
                          <SelectItem key={sub.value} value={sub.value} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              {sub.icon}
                              <span>{sub.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <Label>লোকেশন</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      placeholder="লোকেশন লিখুন"
                      value={serviceForm.location}
                      onChange={(e) => setServiceForm({...serviceForm, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>মূল্য</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      type="number" 
                      placeholder="0"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>সময়কাল</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      type="number" 
                      placeholder="0"
                      value={serviceForm.duration}
                      onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    />
                    <Select 
                      defaultValue="minutes"
                      value={serviceForm.timeUnit}
                      onValueChange={(value) => setServiceForm({...serviceForm, timeUnit: value})}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="সময়" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">মিনিট</SelectItem>
                        <SelectItem value="hours">ঘন্টা</SelectItem>
                        <SelectItem value="days">দিন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea 
                    placeholder="এখানে বিস্তারিত লিখুন..." 
                    className="min-h-[120px]"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="service-upload" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, 'service')}
                    />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('service-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                  {serviceForm.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">{serviceForm.images.length} টি ছবি আপলোড করা হয়েছে</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg focus:shadow-lg active:scale-[0.98] text-base" 
              onClick={() => handleSubmit('service')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'পোস্ট করুন'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>পণ্যের নাম</Label>
                  <Input 
                    placeholder="পণ্যের নাম লিখুন"
                    value={marketplaceForm.title}
                    onChange={(e) => setMarketplaceForm({...marketplaceForm, title: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select
                    value={marketplaceForm.category}
                    onValueChange={(value) => setMarketplaceForm({...marketplaceForm, category: value, subcategory: ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketplaceCategories.map(category => (
                        <SelectItem key={category.value} value={category.value} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {marketplaceForm.category && subcategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label>সাব-ক্যাটাগরি</Label>
                    <Select 
                      value={marketplaceForm.subcategory}
                      onValueChange={(value) => setMarketplaceForm({...marketplaceForm, subcategory: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map(sub => (
                          <SelectItem key={sub.value} value={sub.value} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              {sub.icon}
                              <span>{sub.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  <Label>মূল্য</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      type="number" 
                      placeholder="মূল্য"
                      value={marketplaceForm.price}
                      onChange={(e) => setMarketplaceForm({...marketplaceForm, price: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ডিসকাউন্ট মূল্য (যদি থাকে)</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      type="number" 
                      placeholder="ডিসকাউন্ট মূল্য"
                      value={marketplaceForm.discountPrice}
                      onChange={(e) => setMarketplaceForm({...marketplaceForm, discountPrice: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ট্যাগ</Label>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input 
                      placeholder="কমা দিয়ে ট্যাগ আলাদা করুন"
                      value={marketplaceForm.tags}
                      onChange={(e) => setMarketplaceForm({...marketplaceForm, tags: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea 
                    placeholder="এখানে বিস্তারিত লিখুন..." 
                    className="min-h-[120px]"
                    value={marketplaceForm.description}
                    onChange={(e) => setMarketplaceForm({...marketplaceForm, description: e.target.value})}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="product-upload" 
                      multiple 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, 'marketplace')}
                    />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('product-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                  {marketplaceForm.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">{marketplaceForm.images.length} টি ছবি আপলোড করা হয়েছে</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg focus:shadow-lg active:scale-[0.98] text-base" 
              onClick={() => handleSubmit('marketplace')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'পোস্ট করুন'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatePost;
