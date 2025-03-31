
import React, { useState } from 'react';
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
  Info
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

  // Form data states for different post types
  const [rentForm, setRentForm] = useState({
    title: '',
    category: '',
    location: '',
    price: '',
    period: 'month',
    description: '',
    images: [] as File[]
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: '',
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
    price: '',
    discountPrice: '',
    tags: '',
    description: '',
    images: [] as File[]
  });

  // Handle file upload
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

  // Handle form submission
  const handleSubmit = (type: 'rent' | 'service' | 'marketplace') => {
    setIsSubmitting(true);
    
    // Simulate API call to create post
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "পোস্ট সফলভাবে তৈরি হয়েছে",
        description: "আপনার পোস্ট এখন প্রদর্শিত হবে",
      });
      
      // Navigate to the appropriate listing page based on post type
      if (type === 'rent') {
        navigate('/rentals');
      } else if (type === 'service') {
        navigate('/services');
      } else {
        navigate('/shopping');
      }
    }, 1500);
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
            <Building className="h-4 w-4" /> রেন্ট
          </TabsTrigger>
          <TabsTrigger value="service" className="flex items-center gap-2">
            <Search className="h-4 w-4" /> সার্ভিস
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> মার্কেটপ্লেস
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
                    onValueChange={(value) => setRentForm({...rentForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                      <SelectItem value="house">বাসা</SelectItem>
                      <SelectItem value="car">গাড়ি</SelectItem>
                      <SelectItem value="office">অফিস স্পেস</SelectItem>
                      <SelectItem value="event">ইভেন্ট স্পেস</SelectItem>
                      <SelectItem value="equipment">ইকুইপমেন্ট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
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
                    onValueChange={(value) => setServiceForm({...serviceForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">মেডিকেল</SelectItem>
                      <SelectItem value="dental">ডেন্টাল</SelectItem>
                      <SelectItem value="mental">মেন্টাল হেলথ</SelectItem>
                      <SelectItem value="legal">লিগ্যাল</SelectItem>
                      <SelectItem value="cleaning">ক্লিনিং</SelectItem>
                      <SelectItem value="repair">রিপেয়ার</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
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
                    onValueChange={(value) => setMarketplaceForm({...marketplaceForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">হেলথ</SelectItem>
                      <SelectItem value="fitness">ফিটনেস</SelectItem>
                      <SelectItem value="medicine">মেডিসিন</SelectItem>
                      <SelectItem value="electronics">ইলেক্ট্রনিক্স</SelectItem>
                      <SelectItem value="beauty">বিউটি</SelectItem>
                      <SelectItem value="accessories">এক্সেসরিজ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
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
