
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { usePostStore, Post } from '@/store/usePostStore';
import { 
  Building, 
  ShoppingBag, 
  Search, 
  Upload,
  MapPin,
  DollarSign,
  Calendar,
  Tag
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

  const rentalCategories = [
    'বাসা-বাড়ি', 'অফিস স্পেস', 'দোকান', 'গাড়ি', 'বাইক', 'ইভেন্ট হল', 'যন্ত্রপাতি'
  ];

  const serviceCategories = [
    'ঘর পরিষ্কার', 'AC সার্ভিসিং', 'প্লাম্বিং', 'ইলেকট্রিশিয়ান', 'পেইন্টিং', 'কার সার্ভিস', 'ডেলিভারি'
  ];

  const marketplaceCategories = [
    'ইলেকট্রনিক্স', 'ফ্যাশন', 'ঘর সাজানো', 'বই', 'কম্পিউটার', 'ক্যামেরা', 'গেমিং'
  ];

  const getCategories = () => {
    switch (postType) {
      case 'rental': return rentalCategories;
      case 'service': return serviceCategories;
      case 'marketplace': return marketplaceCategories;
      default: return rentalCategories;
    }
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
      images: [],
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
                      onValueChange={(value) => setFormData({...formData, category: value})}
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

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      এলাকা
                    </label>
                    <Input
                      placeholder="এলাকার নাম"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
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
