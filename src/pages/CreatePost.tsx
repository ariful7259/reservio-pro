
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Power, // Replaced Generator with Power icon
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
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [postType, setPostType] = useState<'rent' | 'service' | 'marketplace'>('rent');
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

  const rentCategories = [
    { 
      name: 'অ্যাপার্টমেন্ট', 
      value: 'apartment',
      icon: <Building className="h-4 w-4 text-amber-500" />,
      subcategories: [
        { name: 'ফ্যামিলি ফ্ল্যাট', value: 'family-flat', icon: <Home className="h-4 w-4 text-amber-500" /> },
        { name: 'বেচেলর ফ্ল্যাট', value: 'bachelor-flat', icon: <User className="h-4 w-4 text-amber-500" /> }
      ]
    },
    { 
      name: 'বাসা', 
      value: 'house',
      icon: <Home className="h-4 w-4 text-green-500" />,
      subcategories: [
        { name: 'ফ্যামিলি হাউস', value: 'family-house', icon: <Home className="h-4 w-4 text-green-500" /> },
        { name: 'বেচেলর মেস', value: 'bachelor-mess', icon: <User className="h-4 w-4 text-green-500" /> }
      ]
    },
    { 
      name: 'গাড়ি', 
      value: 'car',
      icon: <Car className="h-4 w-4 text-blue-500" />,
      subcategories: [
        { name: 'ব্যক্তিগত কার', value: 'personal-car', icon: <Car className="h-4 w-4 text-blue-500" /> },
        { name: 'কমার্শিয়াল', value: 'commercial-car', icon: <Car className="h-4 w-4 text-blue-500" /> }
      ]
    },
    { 
      name: 'অফিস স্পেস', 
      value: 'office',
      icon: <Briefcase className="h-4 w-4 text-indigo-500" />,
      subcategories: [
        { name: 'পূর্ণ অফিস', value: 'full-office', icon: <Building className="h-4 w-4 text-indigo-500" /> },
        { name: 'কো-ওয়ার্কিং', value: 'co-working', icon: <Briefcase className="h-4 w-4 text-indigo-500" /> }
      ]
    },
    { 
      name: 'ই��ুইপমেন্ট', 
      value: 'equipment',
      icon: <Wrench className="h-4 w-4 text-purple-500" />,
      subcategories: [
        { name: 'ইলেকট্রনিক্স', value: 'electronic-equipment', icon: <Smartphone className="h-4 w-4 text-purple-500" /> },
        { name: 'টুলস', value: 'tools-equipment', icon: <Wrench className="h-4 w-4 text-purple-500" /> }
      ]
    }
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
        { name: 'জিম ইকুইপমেন্ট', value: 'gym-equipment', icon: <User className="h-4 w-4 text-green-500" /> },
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

  useEffect(() => {
    if (postType === 'rent' && rentForm.category) {
      const category = rentCategories.find(c => c.value === rentForm.category);
      setSubcategories(category?.subcategories || []);
    } else if (postType === 'service' && serviceForm.category) {
      const category = serviceCategories.find(c => c.value === serviceForm.category);
      setSubcategories(category?.subcategories || []);
    } else if (postType === 'marketplace' && marketplaceForm.category) {
      const category = marketplaceCategories.find(c => c.value === marketplaceForm.category);
      setSubcategories(category?.subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [rentForm.category, serviceForm.category, marketplaceForm.category, postType]);

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
    
    setTimeout(() => {
      setIsSubmitting(false);
      
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

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">পোস্ট করুন</h1>
      </div>

      <Tabs defaultValue="rent" onValueChange={(value) => setPostType(value as any)} className="mb-6">
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
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">রেন্ট ফিচারস</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="font-medium">লং এবং শর্ট টার্ম</h3>
                    <p className="text-sm text-muted-foreground mt-1">দৈনিক, মাসিক, বা বার্ষিক ভিত্তিতে ভাড়া দিন</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="h-10 w-10 text-green-500 mb-2" />
                    <h3 className="font-medium">ভেরিফাইড পেমেন্ট</h3>
                    <p className="text-sm text-muted-foreground mt-1">সুরক্ষিত লেনদেন নিশ্চিত করুন</p>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-all">
                  <div className="flex flex-col items-center text-center">
                    <Book className="h-10 w-10 text-blue-500 mb-2" />
                    <h3 className="font-medium">চুক্তি তৈরি</h3>
                    <p className="text-sm text-muted-foreground mt-1">অটোমেটিক রেন্টাল এগ্রিমেন্ট তৈরি করুন</p>
                  </div>
                </Card>
              </div>
            </div>
            
            <Button 
              className="w-full" 
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
              className="w-full" 
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
              className="w-full" 
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
