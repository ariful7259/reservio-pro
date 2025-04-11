
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  Calendar,
  MessageSquare,
  UserCheck,
  Settings,
  Shield,
  DollarSign,
  Star,
  CalendarPlus,
  Users,
  Eye,
  AlertTriangle,
  Filter,
  Truck
} from 'lucide-react';

// মক ডাটা
const MOCK_SERVICES = [
  {
    id: 'serv-001',
    name: 'হোম ক্লিনিং সার্ভিস',
    category: 'গৃহস্থালি',
    price: '১,৫০০ ৳',
    rating: 4.7,
    reviewCount: 28,
    provider: 'ক্লিন হোম বাংলাদেশ',
    providerVerified: true,
    status: 'approved',
    bookingCount: 45,
    listed: '১৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'serv-002',
    name: 'ইলেকট্রিক্যাল সার্ভিস',
    category: 'রিপেয়ার',
    price: '৮০০ ৳',
    rating: 4.5,
    reviewCount: 19,
    provider: 'ইলেকট্রো টেক',
    providerVerified: true,
    status: 'approved',
    bookingCount: 32,
    listed: '২০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'serv-003',
    name: 'ওয়েব ডিজাইন সার্ভিস',
    category: 'আইটি',
    price: '১৫,০০০ ৳',
    rating: 4.8,
    reviewCount: 34,
    provider: 'ডিজিটাল ক্রিয়েটিভস',
    providerVerified: true,
    status: 'approved',
    bookingCount: 27,
    listed: '১০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'serv-004',
    name: 'কুরিয়ার সার্ভিস',
    category: 'ডেলিভারি',
    price: '১০০ ৳',
    rating: 4.2,
    reviewCount: 56,
    provider: 'রেপিড ডেলিভারি',
    providerVerified: false,
    status: 'pending',
    bookingCount: 0,
    listed: '৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'serv-005',
    name: 'প্রফেশনাল ফটোগ্রাফি',
    category: 'মিডিয়া',
    price: '৩,০০০ ৳',
    rating: 0,
    reviewCount: 0,
    provider: 'লাইট ক্যাপচার',
    providerVerified: false,
    status: 'rejected',
    bookingCount: 0,
    listed: '২ দিন আগে',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300&auto=format&fit=crop'
  }
];

const MOCK_PROVIDERS = [
  {
    id: 'prov-001',
    name: 'ক্লিন হোম বাংলাদেশ',
    email: 'cleanhome@example.com',
    phone: '০১৭১২৩৪৫৬৭৮',
    category: 'গৃহস্থালি',
    services: 4,
    verified: true,
    rating: 4.7,
    status: 'active',
    joinDate: '১ জানুয়ারি, ২০২৫',
    documents: ['ট্রেড লাইসেন্স', 'এনআইডি', 'সার্টিফিকেট'],
    completedServices: 120
  },
  {
    id: 'prov-002',
    name: 'ইলেকট্রো টেক',
    email: 'electrotech@example.com',
    phone: '০১৮১২৩৪৫৬৭৮',
    category: 'রিপেয়ার',
    services: 3,
    verified: true,
    rating: 4.5,
    status: 'active',
    joinDate: '১৫ ফেব্রুয়ারি, ২০২৫',
    documents: ['ট্রেড লাইসেন্স', 'এনআইডি'],
    completedServices: 85
  },
  {
    id: 'prov-003',
    name: 'লাইট ক্যাপচার',
    email: 'lightcapture@example.com',
    phone: '০১৯১২৩৪৫৬৭৮',
    category: 'মিডিয়া',
    services: 1,
    verified: false,
    rating: 0,
    status: 'pending',
    joinDate: '১০ এপ্রিল, ২০২৫',
    documents: ['এনআইডি'],
    completedServices: 0
  }
];

const MOCK_CATEGORIES = [
  {
    id: 'cat-001',
    name: 'গৃহস্থালি',
    serviceCount: 8,
    providers: 4,
    commission: '১০%'
  },
  {
    id: 'cat-002',
    name: 'রিপেয়ার',
    serviceCount: 12,
    providers: 6,
    commission: '১২%'
  },
  {
    id: 'cat-003',
    name: 'আইটি',
    serviceCount: 15,
    providers: 8,
    commission: '১৫%'
  },
  {
    id: 'cat-004',
    name: 'ডেলিভারি',
    serviceCount: 5,
    providers: 3,
    commission: '৮%'
  },
  {
    id: 'cat-005',
    name: 'মিডিয়া',
    serviceCount: 7,
    providers: 5,
    commission: '১২%'
  }
];

const MOCK_BOOKINGS = [
  {
    id: 'book-001',
    service: 'হোম ক্লিনিং সার্ভিস',
    provider: 'ক্লিন হোম বাংলাদেশ',
    customer: 'আসিফ আহমেদ',
    price: '১,৫০০ ৳',
    date: '১০ মে, ২০২৫',
    timeSlot: '১০:০০ AM - ১২:০০ PM',
    status: 'confirmed',
    paymentStatus: 'paid'
  },
  {
    id: 'book-002',
    service: 'ইলেকট্রিক্যাল সার্ভিস',
    provider: 'ইলেকট্রো টেক',
    customer: 'রহিম খান',
    price: '৮০০ ৳',
    date: '১২ মে, ২০২৫',
    timeSlot: '০২:০০ PM - ০৪:০০ PM',
    status: 'pending',
    paymentStatus: 'pending'
  },
  {
    id: 'book-003',
    service: 'ওয়েব ডিজাইন সার্ভিস',
    provider: 'ডিজিটাল ক্রিয়েটিভস',
    customer: 'সানজিদা আক্তার',
    price: '১৫,০০০ ৳',
    date: '১৫ মে, ২০২৫',
    timeSlot: 'অনলাইন',
    status: 'completed',
    paymentStatus: 'paid'
  },
  {
    id: 'book-004',
    service: 'কুরিয়ার সার্ভিস',
    provider: 'রেপিড ডেলিভারি',
    customer: 'কামাল হোসেন',
    price: '১০০ ৳',
    date: '১১ মে, ২০২৫',
    timeSlot: '০৯:০০ AM - ১১:০০ AM',
    status: 'cancelled',
    paymentStatus: 'refunded'
  }
];

const MOCK_DISPUTES = [
  {
    id: 'disp-001',
    service: 'হোম ক্লিনিং সার্ভিস',
    provider: 'ক্লিন হোম বাংলাদেশ',
    customer: 'মাহমুদুল হাসান',
    booking: 'book-005',
    reason: 'সার্ভিস কোয়ালিটি নিয়ে অভিযোগ',
    description: 'বাথরুম ক্লিনিং ঠিকমতো করা হয়নি, অতিরিক্ত চার্জ নেওয়া হয়েছে।',
    status: 'pending',
    createdAt: '৫ মে, ২০২৫',
    amount: '১,৫০০ ৳'
  },
  {
    id: 'disp-002',
    service: 'ইলেকট্রিক্যাল সার্ভিস',
    provider: 'ইলেকট্রো টেক',
    customer: 'ফাহিম রেজা',
    booking: 'book-006',
    reason: 'সার্ভিস প্রোভাইডার যথাসময়ে আসেনি',
    description: 'নির্ধারিত সময়ের চেয়ে ২ ঘণ্টা দেরিতে এসেছে, কিন্তু পুরো চার্জ নিয়েছে।',
    status: 'resolved',
    createdAt: '৩ মে, ২০২৫',
    amount: '৮০০ ৳'
  }
];

const ServiceManagement: React.FC = () => {
  const { toast } = useToast();
  const [services, setServices] = useState(MOCK_SERVICES);
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', commission: '' });
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [pricingRules, setPricingRules] = useState({
    baseCommission: '10',
    minServiceCharge: '১০০',
    maxServiceCharge: '৫০,০০০',
    featuredListingFee: '৫০০',
    instantBookingFee: '১০০'
  });

  // সার্ভিস ফিল্টারিং
  const filteredServices = services.filter(service => {
    // সার্চ ফিল্টার
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    // ক্যাটাগরি ফিল্টার
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // সার্ভিস স্ট্যাটাস পরিবর্তন
  const handleServiceStatusChange = (serviceId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, status: newStatus } : service
    ));
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `সার্ভিসের স্ট্যাটাস ${newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // প্রোভাইডার ভেরিফিকেশন স্ট্যাটাস পরিবর্তন
  const handleProviderVerificationChange = (providerId: string, verified: boolean) => {
    setProviders(providers.map(provider => 
      provider.id === providerId ? { ...provider, verified, status: verified ? 'active' : 'pending' } : provider
    ));
    
    toast({
      title: "প্রোভাইডার ভেরিফিকেশন আপডেট হয়েছে",
      description: `প্রোভাইডারের ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // নতুন ক্যাটাগরি যোগ করা
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: `cat-${categories.length + 1}`,
        name: newCategory.name,
        serviceCount: 0,
        providers: 0,
        commission: newCategory.commission || '১০%'
      };
      
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', commission: '' });
      setIsAddCategoryOpen(false);
      
      toast({
        title: "ক্যাটাগরি যোগ করা হয়েছে",
        description: `"${newCategory.name}" ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।`,
      });
    }
  };

  // ক্যাটাগরি ডিলিট করা
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    
    toast({
      title: "ক্যাটাগরি ডিলিট করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে ডিলিট করা হয়েছে।",
    });
  };

  // বুকিং স্ট্যাটাস আপডেট
  const handleBookingStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    
    toast({
      title: "বুকিং স্ট্যাটাস আপডেট হয়েছে",
      description: `বুকিং স্ট্যাটাস ${newStatus} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // ডিসপিউট স্ট্যাটাস আপডেট
  const handleDisputeStatusChange = (disputeId: string, newStatus: string) => {
    setDisputes(disputes.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: newStatus } : dispute
    ));
    
    toast({
      title: "ডিসপিউট স্ট্যাটাস আপডেট হয়েছে",
      description: `ডিসপিউট স্ট্যাটাস ${newStatus} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // প্রাইসিং রুলস আপডেট
  const handlePricingRulesUpdate = () => {
    setIsPriceDialogOpen(false);
    
    toast({
      title: "প্রাইসিং নীতিমালা আপডেট হয়েছে",
      description: "সার্ভিস প্রাইসিং নীতিমালা সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
      case 'confirmed':
      case 'completed':
      case 'resolved':
      case 'paid':
        return 'default';
      case 'pending':
        return 'warning';
      case 'rejected':
      case 'cancelled':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // রেটিং স্টার রেন্ডারিং
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-primary text-primary" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">সার্ভিস ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সার্ভিস লিস্টিং, ক্যাটাগরি, প্রোভাইডার এবং বুকিং পরিচালনা করুন</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          নতুন সার্ভিস
        </Button>
      </div>

      <Tabs defaultValue="services">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="services">সার্ভিস</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="providers">প্রোভাইডার</TabsTrigger>
          <TabsTrigger value="bookings">বুকিং</TabsTrigger>
          <TabsTrigger value="disputes">ডিসপিউট</TabsTrigger>
          <TabsTrigger value="pricing">প্রাইসিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>সার্ভিস লিস্টিং</CardTitle>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব ক্যাটাগরি" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="approved">অনুমোদিত</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="সার্ভিস খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredServices.length > 0 ? filteredServices.map(service => (
                  <div key={service.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      {service.image && (
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={service.image} 
                            alt={service.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>ক্যাটাগরি: {service.category}</span>
                              <span>মূল্য: {service.price}</span>
                              <span>বুকিং: {service.bookingCount}টি</span>
                            </div>
                          </div>
                          
                          <Badge variant={getStatusBadgeVariant(service.status)}>
                            {service.status === 'approved' ? 'অনুমোদিত' : 
                             service.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm">
                            প্রোভাইডার: <span className="font-medium">{service.provider}</span>
                            {service.providerVerified && (
                              <CheckCircle className="h-4 w-4 text-green-500 inline ml-1" />
                            )}
                          </div>
                          <Separator orientation="vertical" className="h-4 mx-1" />
                          {service.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderRatingStars(service.rating)}
                              </div>
                              <span className="text-sm">({service.reviewCount})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        বিস্তারিত
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                      
                      {service.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleServiceStatusChange(service.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleServiceStatusChange(service.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান
                          </Button>
                        </>
                      )}
                      
                      {service.status === 'approved' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleServiceStatusChange(service.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          বাতিল
                        </Button>
                      )}
                      
                      {service.status === 'rejected' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleServiceStatusChange(service.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          পুনরায় অনুমোদন
                        </Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Truck className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো সার্ভিস পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>সার্ভিস ক্যাটাগরি</CardTitle>
              <Button size="sm" onClick={() => setIsAddCategoryOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন ক্যাটাগরি
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {category.serviceCount} সার্ভিস • {category.providers} প্রোভাইডার
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">কমিশন রেট</div>
                          <div className="font-bold text-primary">{category.commission}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন সার্ভিস ক্যাটাগরি যোগ করুন</DialogTitle>
                <DialogDescription>
                  নতুন সার্ভিস ক্যাটাগরির বিবরণ দিন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">ক্যাটাগরি নাম</Label>
                  <Input 
                    id="category-name" 
                    placeholder="ক্যাটাগরি নাম লিখুন" 
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">কমিশন রেট (%)</Label>
                  <Input 
                    id="commission-rate" 
                    placeholder="১০" 
                    value={newCategory.commission}
                    onChange={(e) => setNewCategory({ ...newCategory, commission: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleAddCategory}>
                  ক্যাটাগরি যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>সার্ভিস প্রোভাইডার</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="প্রোভাইডার খুঁজুন..." 
                    className="w-[200px]"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="active">সক্রিয়</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="suspended">সাসপেন্ডেড</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map(provider => (
                  <div key={provider.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{provider.name}</h3>
                          {provider.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant={getStatusBadgeVariant(provider.status)}>
                            {provider.status === 'active' ? 'সক্রিয়' : 
                             provider.status === 'pending' ? 'পেন্ডিং' : 'সাসপেন্ডেড'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>ইমেইল: {provider.email} • ফোন: {provider.phone}</div>
                          <div>ক্যাটাগরি: {provider.category} • সার্ভিস: {provider.services}টি</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">যোগদান: {provider.joinDate}</div>
                        {provider.rating > 0 && (
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <div className="flex">
                              {renderRatingStars(provider.rating)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-secondary/10 rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">দাখিলকৃত ডকুমেন্ট</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="px-2 py-1">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`verified-${provider.id}`}>ভেরিফিকেশন স্ট্যাটাস:</Label>
                        <Switch 
                          id={`verified-${provider.id}`} 
                          checked={provider.verified}
                          onCheckedChange={(checked) => handleProviderVerificationChange(provider.id, checked)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                        <Select 
                          defaultValue={provider.status}
                        >
                          <SelectTrigger className="h-9 w-[140px]">
                            <SelectValue placeholder="স্ট্যাটাস" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">সক্রিয়</SelectItem>
                            <SelectItem value="pending">পেন্ডিং</SelectItem>
                            <SelectItem value="suspended">সাসপেন্ড</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সার্ভিস বুকিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input placeholder="বুকিং খুঁজুন..." className="max-w-xs" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="সব স্ট্যাটাস" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                    <SelectItem value="confirmed">কনফার্মড</SelectItem>
                    <SelectItem value="pending">পেন্ডিং</SelectItem>
                    <SelectItem value="completed">সম্পন্ন</SelectItem>
                    <SelectItem value="cancelled">বাতিল</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">বুকিং আইডি</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">সার্ভিস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">প্রোভাইডার</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">কাস্টমার</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">তারিখ ও সময়</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">মূল্য</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{booking.id}</td>
                        <td className="p-4 align-middle">{booking.service}</td>
                        <td className="p-4 align-middle">{booking.provider}</td>
                        <td className="p-4 align-middle">{booking.customer}</td>
                        <td className="p-4 align-middle">{booking.date} <br /> {booking.timeSlot}</td>
                        <td className="p-4 align-middle">{booking.price}</td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col gap-1">
                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                              {booking.status === 'confirmed' ? 'কনফার্মড' : 
                               booking.status === 'pending' ? 'পেন্ডিং' :
                               booking.status === 'completed' ? 'সম্পন্ন' : 'বাতিল'}
                            </Badge>
                            <Badge variant={getStatusBadgeVariant(booking.paymentStatus)} className="mt-1">
                              {booking.paymentStatus === 'paid' ? 'পেইড' : 
                               booking.paymentStatus === 'pending' ? 'পেন্ডিং' : 'রিফান্ডেড'}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select 
                              defaultValue={booking.status}
                              onValueChange={(value) => handleBookingStatusChange(booking.id, value)}
                            >
                              <SelectTrigger className="h-9 w-[100px]">
                                <SelectValue placeholder="স্ট্যাটাস" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="confirmed">কনফার্ম</SelectItem>
                                <SelectItem value="completed">সম্পন্ন</SelectItem>
                                <SelectItem value="cancelled">বাতিল</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ডিসপিউট ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map(dispute => (
                  <div key={dispute.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{dispute.reason}</h3>
                          <Badge variant={getStatusBadgeVariant(dispute.status)}>
                            {dispute.status === 'pending' ? 'পেন্ডিং' : 
                             dispute.status === 'resolved' ? 'সমাধান করা হয়েছে' : 'বাতিল করা হয়েছে'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>সার্ভিস: {dispute.service}</div>
                          <div>প্রোভাইডার: {dispute.provider} • কাস্টমার: {dispute.customer}</div>
                          <div>বুকিং: {dispute.booking} • মূল্য: {dispute.amount}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">তারিখ: {dispute.createdAt}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-secondary/10 rounded-md">
                      <p className="text-sm">{dispute.description}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      {dispute.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDisputeStatusChange(dispute.id, 'resolved')}
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            রিফান্ড অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleDisputeStatusChange(dispute.id, 'resolved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            সমাধান করুন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDisputeStatusChange(dispute.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান করুন
                          </Button>
                        </>
                      )}
                      {dispute.status !== 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সার্ভিস প্রাইসিং নীতিমালা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">কমিশন স্ট্রাকচার</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">বেস কমিশন রেট</td>
                          <td className="py-2 text-right font-medium">{pricingRules.baseCommission}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">সর্বনিম্ন সার্ভিস চার্জ</td>
                          <td className="py-2 text-right font-medium">{pricingRules.minServiceCharge}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">সর্বোচ্চ সার্ভিস চার্জ</td>
                          <td className="py-2 text-right font-medium">{pricingRules.maxServiceCharge}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">ফিচার চার্জ</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">ফিচার্ড লিস্টিং ফি</td>
                          <td className="py-2 text-right font-medium">{pricingRules.featuredListingFee}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">ইনস্ট্যান্ট বুকিং ফি</td>
                          <td className="py-2 text-right font-medium">{pricingRules.instantBookingFee}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => setIsPriceDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    প্রাইসিং আপডেট
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">ক্যাটাগরি অনুসারে কমিশন রেট</h3>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium">ক্যাটাগরি নাম</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">সার্ভিস সংখ্যা</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">কমিশন রেট</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id} className="border-b">
                          <td className="p-4 align-middle font-medium">{category.name}</td>
                          <td className="p-4 align-middle">{category.serviceCount}</td>
                          <td className="p-4 align-middle">{category.commission}</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              এডিট
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>প্রাইসিং নীতিমালা আপডেট</DialogTitle>
                <DialogDescription>
                  সার্ভিসের প্রাইসিং নীতিমালা পরিবর্তন করুন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="base-commission">বেস কমিশন রেট (%)</Label>
                  <Input 
                    id="base-commission" 
                    value={pricingRules.baseCommission}
                    onChange={(e) => setPricingRules({ ...pricingRules, baseCommission: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-service-charge">সর্বনিম্ন সার্ভিস চার্জ</Label>
                  <Input 
                    id="min-service-charge" 
                    value={pricingRules.minServiceCharge}
                    onChange={(e) => setPricingRules({ ...pricingRules, minServiceCharge: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-service-charge">সর্বোচ্চ সার্ভিস চার্জ</Label>
                  <Input 
                    id="max-service-charge" 
                    value={pricingRules.maxServiceCharge}
                    onChange={(e) => setPricingRules({ ...pricingRules, maxServiceCharge: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured-listing-fee">ফিচার্ড লিস্টিং ফি</Label>
                  <Input 
                    id="featured-listing-fee" 
                    value={pricingRules.featuredListingFee}
                    onChange={(e) => setPricingRules({ ...pricingRules, featuredListingFee: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instant-booking-fee">ইনস্ট্যান্ট বুকিং ফি</Label>
                  <Input 
                    id="instant-booking-fee" 
                    value={pricingRules.instantBookingFee}
                    onChange={(e) => setPricingRules({ ...pricingRules, instantBookingFee: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPriceDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handlePricingRulesUpdate}>
                  আপডেট করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceManagement;
