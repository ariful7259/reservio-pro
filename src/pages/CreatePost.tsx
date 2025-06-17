
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usePostStore, Post } from '@/store/usePostStore';
import { 
  Building, 
  ShoppingBag, 
  Search, 
  Upload,
  MapPin,
  DollarSign,
  Calendar,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon,
  Navigation
} from 'lucide-react';

const CreatePost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPost } = usePostStore();
  
  const postType = searchParams.get('type') || 'rental';
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    location: '',
    price: '',
    period: '', // for rental
    duration: '', // for service
    timeUnit: 'ঘণ্টা', // for service
    discountPrice: '', // for marketplace
    tags: '' // for marketplace
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const rentalCategories = [
    'বাসা-বাড়ি', 'অফিস স্পেস', 'দোকান', 'গাড়ি', 'বাইক', 'ইভেন্ট হল', 'যন্ত্রপাতি'
  ];

  const serviceCategories = [
    'ঘর পরিষ্কার', 'AC সার্ভিসিং', 'প্লাম্বিং', 'ইলেকট্রিশিয়ান', 'পেইন্টিং', 'কার সার্ভিস', 'ডেলিভারি'
  ];

  const marketplaceCategories = [
    'ইলেকট্রনিক্স', 'ফ্যাশন', 'ঘর সাজানো', 'বই', 'কম্পিউটার', 'ক্যামেরা', 'গেমিং'
  ];

  const subcategoriesMap: { [key: string]: string[] } = {
    'বাসা-বাড়ি': ['ফ্ল্যাট', 'বাসা', 'রুম', 'মেস'],
    'অফিস স্পেস': ['ছোট অফিস', 'বড় অফিস', 'কো-ওর্কিং'],
    'দোকান': ['খুচরা দোকান', 'পাইকারি দোকান', 'শোরুম'],
    'গাড়ি': ['প্রাইভেট কার', 'মাইক্রোবাস', 'ট্রাক'],
    'বাইক': ['স্কুটার', 'মোটরসাইকেল', 'সাইকেল'],
    'ইভেন্ট হল': ['বিয়ে হল', 'কনফারেন্স হল', 'পার্টি হল'],
    'যন্ত্রপাতি': ['নির্মাণ যন্ত্র', 'রান্নার যন্ত্র', 'পরিষ্কারের যন্ত্র'],
    'ঘর পরিষ্কার': ['সাধারণ পরিষ্কার', 'গভীর পরিষ্কার', 'কার্পেট পরিষ্কার'],
    'AC সার্ভিসিং': ['ইনস্টলেশন', 'মেরামত', 'রক্ষণাবেক্ষণ'],
    'প্লাম্বিং': ['পাইপ মেরামত', 'বাথরুম ফিক্সিং', 'কিচেন প্লাম্বিং'],
    'ইলেকট্রিশিয়ান': ['ওয়্যারিং', 'ফ্যান ইনস্টল', 'লাইট ফিক্সিং'],
    'পেইন্টিং': ['দেয়াল পেইন্টিং', 'ছাদ পেইন্টিং', 'ডেকোরেটিভ পেইন্টিং'],
    'কার সার্ভিস': ['কার ওয়াশ', 'ইঞ্জিন সার্ভিস', 'টায়ার সার্ভিস'],
    'ডেলিভারি': ['ফুড ডেলিভারি', 'প্যাকেজ ডেলিভারি', 'ডকুমেন্ট ডেলিভারি'],
    'ইলেকট্রনিক্স': ['মোবাইল', 'ল্যাপটপ', 'টিভি', 'এসি'],
    'ফ্যাশন': ['পুরুষদের পোশাক', 'মহিলাদের পোশাক', 'জুতা', 'ব্যাগ'],
    'ঘর সাজানো': ['আসবাবপত্র', 'কার্পেট', 'পর্দা', 'লাইট'],
    'বই': ['গল্প', 'উপন্যাস', 'পাঠ্যবই', 'রেফারেন্স বই'],
    'কম্পিউটার': ['ডেস্কটপ', 'ল্যাপটপ', 'প্রিন্টার', 'স্ক্যানার'],
    'ক্যামেরা': ['DSLR', 'মিররলেস', 'পয়েন্ট এন্ড শুট', 'ভিডিও ক্যামেরা'],
    'গেমিং': ['কনসোল', 'গেম', 'গেমিং চেয়ার', 'হেডফোন']
  };

  const getCategories = () => {
    switch (postType) {
      case 'rental': return rentalCategories;
      case 'service': return serviceCategories;
      case 'marketplace': return marketplaceCategories;
      default: return rentalCategories;
    }
  };

  const getSubcategories = () => {
    return subcategoriesMap[formData.category] || [];
  };

  const getIcon = () => {
    switch (postType) {
      case 'rental': return <Building className="h-6 w-6" />;
      case 'service': return <Search className="h-6 w-6" />;
      case 'marketplace': return <ShoppingBag className="h-6 w-6" />;
      default: return <Building className="h-6 w-6" />;
    }
  };

  const getTitle = () => {
    switch (postType) {
      case 'rental': return 'রেন্টাল পোস্ট করুন';
      case 'service': return 'সার্ভিস পোস্ট করুন';
      case 'marketplace': return 'প্রোডাক্ট পোস্ট করুন';
      default: return 'পোস্ট করুন';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedVideos(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index));
    if (currentVideoIndex >= uploadedVideos.length - 1) {
      setCurrentVideoIndex(0);
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex(prev => (prev + 1) % uploadedVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex(prev => (prev - 1 + uploadedVideos.length) % uploadedVideos.length);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setFormData({
            ...formData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
          setIsGettingLocation(false);
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: "আপনার বর্তমান লোকেশন সংরক্ষিত হয়েছে"
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: "ত্রুটি",
            description: "লোকেশন পেতে সমস্যা হয়েছে। অনুমতি দিন বা ম্যানুয়ালি এলাকার নাম লিখুন",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "সমর্থিত নয়",
        description: "আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    const basePost = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      location: formData.location,
      price: formData.price,
      images: uploadedImages.map(img => URL.createObjectURL(img)),
      videos: uploadedVideos.map(video => URL.createObjectURL(video)),
      createdAt: new Date()
    };

    let newPost: Post;

    switch (postType) {
      case 'rental':
        newPost = {
          ...basePost,
          type: 'rent',
          period: formData.period
        };
        break;
      case 'service':
        newPost = {
          ...basePost,
          type: 'service',
          duration: formData.duration,
          timeUnit: formData.timeUnit
        };
        break;
      case 'marketplace':
        newPost = {
          ...basePost,
          type: 'marketplace',
          discountPrice: formData.discountPrice,
          tags: formData.tags
        };
        break;
      default:
        newPost = {
          ...basePost,
          type: 'rent',
          period: formData.period
        };
    }

    addPost(newPost);

    toast({
      title: "সফল",
      description: `আপনার ${postType === 'rental' ? 'রেন্টাল' : postType === 'service' ? 'সার্ভিস' : 'প্রোডাক্ট'} পোস্ট সফলভাবে যুক্ত হয়েছে`,
      variant: "default"
    });

    // Navigate to appropriate page
    switch (postType) {
      case 'rental':
        navigate('/rentals');
        break;
      case 'service':
        navigate('/services');
        break;
      case 'marketplace':
        navigate('/marketplace');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getIcon()}
              {getTitle()}
            </CardTitle>
            <p className="text-muted-foreground">
              আপনার {postType === 'rental' ? 'প্রোপার্টি' : postType === 'service' ? 'সেবা' : 'প্রোডাক্ট'} এর বিস্তারিত তথ্য দিন
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="আকর্ষণীয় শিরোনাম লিখুন"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="বিস্তারিত বিবরণ লিখুন"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      ক্যাটাগরি <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value, subcategory: ''})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCategories().map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.category && getSubcategories().length > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        সাব-ক্যাটাগরি
                      </label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) => setFormData({...formData, subcategory: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSubcategories().map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    এলাকা
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="এলাকার নাম"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="whitespace-nowrap"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      {isGettingLocation ? 'খোঁজা হচ্ছে...' : 'লাইভ লোকেশন'}
                    </Button>
                  </div>
                  {currentLocation && (
                    <p className="text-xs text-muted-foreground mt-1">
                      লোকেশন: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <DollarSign className="h-4 w-4 inline mr-1" />
                      মূল্য <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="৳ ১,০০০"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>

                  {postType === 'rental' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        সময়কাল
                      </label>
                      <Select
                        value={formData.period}
                        onValueChange={(value) => setFormData({...formData, period: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="দৈনিক">দৈনিক</SelectItem>
                          <SelectItem value="সাপ্তাহিক">সাপ্তাহিক</SelectItem>
                          <SelectItem value="মাসিক">মাসিক</SelectItem>
                          <SelectItem value="বার্ষিক">বার্ষিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {postType === 'service' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        সেবার সময়
                      </label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="২"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="flex-1"
                        />
                        <Select
                          value={formData.timeUnit}
                          onValueChange={(value) => setFormData({...formData, timeUnit: value})}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ঘণ্টা">ঘণ্টা</SelectItem>
                            <SelectItem value="দিন">দিন</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {postType === 'marketplace' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        ছাড়ের মূল্য
                      </label>
                      <Input
                        placeholder="৳ ৮০০"
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                      />
                    </div>
                  )}
                </div>

                {postType === 'marketplace' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <Tag className="h-4 w-4 inline mr-1" />
                      ট্যাগ
                    </label>
                    <Input
                      placeholder="নতুন, ভাল অবস্থা, দ্রুত ডেলিভারি"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                  </div>
                )}

                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <ImageIcon className="h-4 w-4 inline mr-1" />
                      ছবি আপলোড করুন
                    </label>
                    <div className="mt-2">
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">একাধিক ছবি নির্বাচন করুন</span>
                      </label>
                    </div>
                    
                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Upload Section */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <Video className="h-4 w-4 inline mr-1" />
                      ভিডিও আপলোড করুন
                    </label>
                    <div className="mt-2">
                      <input
                        id="videos"
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="videos"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Video className="h-8 w-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">একাধিক ভিডিও নির্বাচন করুন</span>
                      </label>
                    </div>

                    {/* Video Player with Navigation */}
                    {uploadedVideos.length > 0 && (
                      <div className="mt-3">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          <video
                            src={URL.createObjectURL(uploadedVideos[currentVideoIndex])}
                            className="w-full h-48 object-cover"
                            controls
                          />
                          
                          {/* Video Navigation */}
                          {uploadedVideos.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={prevVideo}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={nextVideo}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          {/* Video Counter */}
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            {currentVideoIndex + 1}/{uploadedVideos.length}
                          </div>

                          {/* Remove Video Button */}
                          <button
                            type="button"
                            onClick={() => removeVideo(currentVideoIndex)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  বাতিল
                </Button>
                <Button type="submit" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  পোস্ট প্রকাশ করুন
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
