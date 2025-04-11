
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Home, 
  Building, 
  CheckCircle, 
  XCircle, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search, 
  UserCheck, 
  Filter,
  MapPin,
  CalendarDays,
  Clock,
  Car,
  Briefcase,
  Camera,
  Laptop,
  Scissors,
  Users,
  CircleDollarSign,
  Gavel,
  FileText,
  BarChart,
  Eye,
  Settings
} from 'lucide-react';

// মক ডাটা 
const MOCK_LISTINGS = [
  { 
    id: 'rent-001', 
    name: 'গুলশানে মডার্ন আপার্টমেন্ট', 
    category: 'আপার্টমেন্ট', 
    location: 'গুলশান-২, ঢাকা',
    price: '৩৫,০০০ ৳/মাস', 
    owner: 'আমির খান', 
    ownerVerified: true,
    status: 'approved', 
    features: ['৩ বেডরুম', '২ বাথরুম', 'গাড়ি পার্কিং', 'লিফট'],
    bookedDates: ['২০২৫-০৪-১৫', '২০২৫-০৪-২০', '২০২৫-০৪-২১'],
    rating: 4.8,
    reviewCount: 12,
    listed: '১৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'rent-002', 
    name: 'ধানমন্ডি লেক ভিউ হাউস', 
    category: 'বাড়ি', 
    location: 'ধানমন্ডি-৮, ঢাকা',
    price: '৪৫,০০০ ৳/মাস', 
    owner: 'সাদিয়া রহমান', 
    ownerVerified: true,
    status: 'approved', 
    features: ['৪ বেডরুম', '৩ বাথরুম', 'গার্ডেন', 'রুফটপ'],
    bookedDates: [],
    rating: 4.5,
    reviewCount: 8,
    listed: '২০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'rent-003', 
    name: 'টয়োটা কামরি সেডান', 
    category: 'গাড়ি', 
    location: 'উত্তরা-১১, ঢাকা',
    price: '৫,০০০ ৳/দিন', 
    owner: 'রাকিবুল হক', 
    ownerVerified: true,
    status: 'approved', 
    features: ['অটোমেটিক', 'চামড়ার সিট', 'এয়ার কন্ডিশন', 'বিমা সহ'],
    bookedDates: ['২০২৫-০৪-১৮', '২০২৫-০৪-১৯'],
    rating: 4.7,
    reviewCount: 15,
    listed: '৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'rent-004', 
    name: 'উত্তরায় অফিস স্পেস', 
    category: 'অফিস', 
    location: 'উত্তরা সেক্টর-৫, ঢাকা',
    price: '২৫,০০০ ৳/মাস', 
    owner: 'শাফিন আহমেদ', 
    ownerVerified: false,
    status: 'pending', 
    features: ['১০০০ স্কয়ার ফিট', 'রিসেপশন', 'মিটিং রুম', 'ওয়াই-ফাই'],
    bookedDates: [],
    rating: 0,
    reviewCount: 0,
    listed: '২ দিন আগে',
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'rent-005', 
    name: 'ক্যানন DSLR ক্যামেরা সেট', 
    category: 'ইকুইপমেন্ট', 
    location: 'বনানী, ঢাকা',
    price: '২,০০০ ৳/দিন', 
    owner: 'নাফিসা জামান', 
    ownerVerified: false,
    status: 'rejected', 
    features: ['4K রেজোলিউশন', '৩ লেন্স', 'ট্রাইপড', 'মেমোরি কার্ড'],
    bookedDates: [],
    rating: 0,
    reviewCount: 0,
    listed: '৮ দিন আগে',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop'
  }
];

const MOCK_BOOKINGS = [
  {
    id: 'book-001',
    listingId: 'rent-001',
    listingName: 'গুলশানে মডার্ন আপার্টমেন্ট',
    customerName: 'তানভির আহমেদ',
    startDate: '২০২৫-০৪-১৫',
    endDate: '২০২৫-০৪-২০',
    totalAmount: '১৭,৫০০ ৳',
    status: 'confirmed',
    paymentStatus: 'paid'
  },
  {
    id: 'book-002',
    listingId: 'rent-003',
    listingName: 'টয়োটা কামরি সেডান',
    customerName: 'রাহুল হক',
    startDate: '২০২৫-০৪-১৮',
    endDate: '২০২৫-০৪-১৯',
    totalAmount: '১০,০০০ ৳',
    status: 'confirmed',
    paymentStatus: 'paid'
  },
  {
    id: 'book-003',
    listingId: 'rent-001',
    listingName: 'গুলশানে মডার্ন আপার্টমেন্ট',
    customerName: 'শারমিন আক্তার',
    startDate: '২০২৫-০৪-২১',
    endDate: '২০২৫-০৪-২৫',
    totalAmount: '১৭,৫০০ ৳',
    status: 'pending',
    paymentStatus: 'pending'
  }
];

const MOCK_CATEGORIES = [
  {
    id: 'rentcat-001',
    name: 'আপার্টমেন্ট',
    icon: Building,
    listingCount: 45
  },
  {
    id: 'rentcat-002',
    name: 'বাড়ি',
    icon: Home,
    listingCount: 32
  },
  {
    id: 'rentcat-003',
    name: 'গাড়ি',
    icon: Car,
    listingCount: 28
  },
  {
    id: 'rentcat-004',
    name: 'অফিস',
    icon: Briefcase,
    listingCount: 15
  },
  {
    id: 'rentcat-005',
    name: 'ইকুইপমেন্ট',
    icon: Camera,
    listingCount: 67
  }
];

const MOCK_DISPUTES = [
  {
    id: 'disp-001',
    bookingId: 'book-001',
    listingName: 'গুলশানে মডার্ন আপার্টমেন্ট',
    complainant: 'তানভির আহমেদ',
    defendantName: 'আমির খান',
    issue: 'লাইটিং সিস্টেম নিয়মিত কাজ করে না',
    status: 'pending',
    createdDate: '২ দিন আগে',
    priority: 'medium'
  },
  {
    id: 'disp-002',
    bookingId: 'book-002',
    listingName: 'টয়োটা কামরি সেডান',
    complainant: 'রাহুল হক',
    defendantName: 'রাকিবুল হক',
    issue: 'গাড়ি বুকিংয়ের সময় AC ঠিক করা ছিল কিন্তু ভাড়া নেওয়ার সময় AC কাজ করছিল না',
    status: 'resolved',
    createdDate: '৫ দিন আগে',
    priority: 'high'
  }
];

const MOCK_STATISTICS = {
  totalListings: 186,
  activeListings: 154,
  totalBookings: 432,
  pendingApprovals: 12,
  totalDisputes: 8,
  resolvedDisputes: 5,
  totalEarnings: '৫,৪৫,০০০ ৳',
  monthlyEarnings: '৯৫,০০০ ৳'
};

const MOCK_POLICIES = [
  {
    id: 'policy-001',
    name: 'ক্যানসেলেশন নীতি',
    description: 'ভাড়া শুরুর ৪৮ ঘন্টা আগে বাতিল করলে ১০০% রিফান্ড, ২৪ ঘন্টা আগে বাতিল করলে ৫০% রিফান্ড, এরপর কোন রিফান্ড নয়।',
    status: 'active'
  },
  {
    id: 'policy-002',
    name: 'ডিপোজিট নীতি',
    description: 'মোট ভাড়ার ৩০% ডিপোজিট হিসেবে রাখতে হবে, যা ভাড়া শেষে রিফান্ড করা হবে।',
    status: 'active'
  },
  {
    id: 'policy-003',
    name: 'ভেরিফিকেশন নীতি',
    description: 'সকল ভাড়া দেওয়া প্রপার্টি এবং আইটেমগুলো প্ল্যাটফর্ম দ্বারা যাচাই করা হবে। বাড়ি ও অফিস ভেরিফিকেশনের জন্য সাইট ভিজিট করা হবে।',
    status: 'active'
  }
];

const RentalManagement: React.FC = () => {
  const { toast } = useToast();
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [policies, setPolicies] = useState(MOCK_POLICIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });
  const [newPolicy, setNewPolicy] = useState({ name: '', description: '' });

  // লিস্টিং ফিল্টারিং
  const filteredListings = listings.filter(listing => {
    // সার্চ ফিল্টার
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      listing.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // ক্যাটাগরি ফিল্টার
    const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // লিস্টিং স্ট্যাটাস পরিবর্তন
  const handleListingStatusChange = (listingId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setListings(listings.map(listing => 
      listing.id === listingId ? { ...listing, status: newStatus } : listing
    ));
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `লিস্টিংয়ের স্ট্যাটাস ${newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // ওনার ভেরিফিকেশন স্ট্যাটাস পরিবর্তন
  const handleOwnerVerificationChange = (listingId: string, verified: boolean) => {
    setListings(listings.map(listing => 
      listing.id === listingId ? { ...listing, ownerVerified: verified } : listing
    ));
    
    toast({
      title: "মালিক ভেরিফিকেশন আপডেট হয়েছে",
      description: `মালিকের ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // বুকিং স্ট্যাটাস পরিবর্তন
  const handleBookingStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    
    toast({
      title: "বুকিং স্ট্যাটাস আপডেট হয়েছে",
      description: `বুকিং স্ট্যাটাস ${newStatus === 'confirmed' ? 'কনফার্মড' : newStatus === 'pending' ? 'পেন্ডিং' : 'বাতিল'} করা হয়েছে।`,
    });
  };

  // ডিসপিউট স্ট্যাটাস পরিবর্তন
  const handleDisputeStatusChange = (disputeId: string, newStatus: 'pending' | 'investigating' | 'resolved') => {
    setDisputes(disputes.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: newStatus } : dispute
    ));
    
    toast({
      title: "ডিসপিউট স্ট্যাটাস আপডেট হয়েছে",
      description: `ডিসপিউট স্ট্যাটাস ${newStatus === 'pending' ? 'পেন্ডিং' : newStatus === 'investigating' ? 'তদন্তাধীন' : 'সমাধানকৃত'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // নতুন ক্যাটাগরি যোগ করা
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: `rentcat-${categories.length + 1}`,
        name: newCategory.name,
        icon: Building,
        listingCount: 0
      };
      
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', icon: '' });
      setIsAddCategoryOpen(false);
      
      toast({
        title: "ক্যাটাগরি যোগ করা হয়েছে",
        description: `"${newCategory.name}" ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।`,
      });
    }
  };

  // নতুন পলিসি যোগ করা
  const handleAddPolicy = () => {
    if (newPolicy.name.trim() && newPolicy.description.trim()) {
      const newPol = {
        id: `policy-${policies.length + 1}`,
        name: newPolicy.name,
        description: newPolicy.description,
        status: 'active'
      };
      
      setPolicies([...policies, newPol]);
      setNewPolicy({ name: '', description: '' });
      setIsAddPolicyOpen(false);
      
      toast({
        title: "পলিসি যোগ করা হয়েছে",
        description: `"${newPolicy.name}" পলিসি সফলভাবে যোগ করা হয়েছে।`,
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

  // পলিসি স্ট্যাটাস পরিবর্তন
  const handlePolicyStatusChange = (policyId: string, newStatus: 'active' | 'inactive') => {
    setPolicies(policies.map(policy => 
      policy.id === policyId ? { ...policy, status: newStatus } : policy
    ));
    
    toast({
      title: "পলিসি স্ট্যাটাস আপডেট হয়েছে",
      description: `পলিসি স্ট্যাটাস ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে।`,
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
      case 'active':
      case 'paid':
      case 'resolved':
        return 'default';
      case 'pending':
      case 'investigating':
        return 'warning';
      case 'rejected':
      case 'cancelled':
      case 'inactive':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // প্রায়োরিটি ব্যাজের কালার
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">রেন্টাল ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সমস্ত রেন্টাল লিস্টিং, বুকিং, ক্যাটাগরি, এবং ডিসপিউট পরিচালনা করুন</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          নতুন লিস্টিং যোগ করুন
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট লিস্টিং</p>
              <p className="text-2xl font-bold">{MOCK_STATISTICS.totalListings}</p>
              <p className="text-xs text-green-600">সক্রিয়: {MOCK_STATISTICS.activeListings}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট বুকিং</p>
              <p className="text-2xl font-bold">{MOCK_STATISTICS.totalBookings}</p>
              <p className="text-xs text-amber-600">অনুমোদন বাকি: {MOCK_STATISTICS.pendingApprovals}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Gavel className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ডিসপিউট</p>
              <p className="text-2xl font-bold">{MOCK_STATISTICS.totalDisputes}</p>
              <p className="text-xs text-green-600">সমাধানকৃত: {MOCK_STATISTICS.resolvedDisputes}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <CircleDollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট আয়</p>
              <p className="text-2xl font-bold">{MOCK_STATISTICS.totalEarnings}</p>
              <p className="text-xs text-purple-600">মাসিক: {MOCK_STATISTICS.monthlyEarnings}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="listings">লিস্টিং</TabsTrigger>
          <TabsTrigger value="bookings">বুকিং</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="owners">মালিক</TabsTrigger>
          <TabsTrigger value="disputes">ডিসপিউট</TabsTrigger>
          <TabsTrigger value="policies">পলিসি</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>রেন্টাল লিস্টিং</CardTitle>
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
                  placeholder="লিস্টিং খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredListings.length > 0 ? filteredListings.map(listing => (
                  <div key={listing.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      {listing.image && (
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={listing.image} 
                            alt={listing.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{listing.name}</h3>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>ক্যাটাগরি: {listing.category}</span>
                              <span>অবস্থান: {listing.location}</span>
                              <span>মূল্য: {listing.price}</span>
                            </div>
                          </div>
                          
                          <Badge variant={getStatusBadgeVariant(listing.status)}>
                            {listing.status === 'approved' ? 'অনুমোদিত' : 
                             listing.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm">
                            মালিক: <span className="font-medium">{listing.owner}</span>
                            {listing.ownerVerified && (
                              <CheckCircle className="h-4 w-4 text-green-500 inline ml-1" />
                            )}
                          </div>
                          <Separator orientation="vertical" className="h-4 mx-1" />
                          <div className="text-sm flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {listing.location}
                          </div>
                          {listing.rating > 0 && (
                            <>
                              <Separator orientation="vertical" className="h-4 mx-1" />
                              <div className="text-sm flex items-center gap-1">
                                {listing.rating} ★ ({listing.reviewCount})
                              </div>
                            </>
                          )}
                        </div>
                        
                        {listing.features.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {listing.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        )}
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
                      
                      {listing.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleListingStatusChange(listing.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleListingStatusChange(listing.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান
                          </Button>
                        </>
                      )}
                      
                      {listing.status === 'approved' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleListingStatusChange(listing.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          বাতিল
                        </Button>
                      )}
                      
                      {listing.status === 'rejected' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleListingStatusChange(listing.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          পুনরায় অনুমোদন
                        </Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো লিস্টিং পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">বুকিং আইডি</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">রেন্টাল আইটেম</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">গ্রাহক</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">তারিখ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">মোট মূল্য</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">পেমেন্ট</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{booking.id}</td>
                        <td className="p-4 align-middle">{booking.listingName}</td>
                        <td className="p-4 align-middle">{booking.customerName}</td>
                        <td className="p-4 align-middle">
                          {booking.startDate} - {booking.endDate}
                        </td>
                        <td className="p-4 align-middle">{booking.totalAmount}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={getStatusBadgeVariant(booking.paymentStatus)}>
                            {booking.paymentStatus === 'paid' ? 'পরিশোধিত' : 'পেন্ডিং'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={getStatusBadgeVariant(booking.status)}>
                            {booking.status === 'confirmed' ? 'কনফার্মড' : 
                             booking.status === 'pending' ? 'পেন্ডিং' : 'বাতিল'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {booking.status === 'pending' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleBookingStatusChange(booking.id, 'confirmed')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleBookingStatusChange(booking.id, 'cancelled')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>বুকিং ক্যালেন্ডার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">নির্বাচিত তারিখের বুকিং</h3>
                  
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">গুলশানে মডার্ন আপার্টমেন্ট</div>
                        <Badge variant="default">কনফার্মড</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        গ্রাহক: তানভির আহমেদ
                      </div>
                      <div className="text-sm mt-2">
                        ১৭,৫০০ ৳ • ২০২৫-০৪-১৫ থেকে ২০২৫-০৪-২০
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">টয়োটা কামরি সেডান</div>
                        <Badge variant="default">কনফার্মড</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        গ্রাহক: রাহুল হক
                      </div>
                      <div className="text-sm mt-2">
                        ১০,০০০ ৳ • ২০২৫-০৪-১৮ থেকে ২০২৫-০৪-১৯
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>ক্যাটাগরি ম্যানেজমেন্ট</CardTitle>
              <Button size="sm" onClick={() => setIsAddCategoryOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন ক্যাটাগরি
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{category.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {category.listingCount} লিস্টিং
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
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
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন ক্যাটাগরি যোগ করুন</DialogTitle>
                <DialogDescription>
                  রেন্টাল আইটেমের জন্য নতুন ক্যাটাগরির বিবরণ দিন।
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
                  <Label htmlFor="category-description">বিবরণ (ঐচ্ছিক)</Label>
                  <Textarea 
                    id="category-description" 
                    placeholder="ক্যাটাগরির বিবরণ লিখুন"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  বাতিল করুন
                </Button>
                <Button onClick={handleAddCategory}>
                  ক্যাটাগরি যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="owners" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>রেন্টাল মালিক ম্যানেজমেন্ট</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="মালিক খুঁজুন..." 
                    className="w-[200px]"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="verified">ভেরিফাইড</SelectItem>
                      <SelectItem value="unverified">আনভেরিফাইড</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map(listing => (
                  <div key={listing.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{listing.owner}</h3>
                          {listing.ownerVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant={listing.ownerVerified ? 'default' : 'warning'}>
                            {listing.ownerVerified ? 'ভেরিফাইড' : 'আনভেরিফাইড'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>রেন্টাল আইটেম: {listing.name}</div>
                          <div>ক্যাটাগরি: {listing.category} • অবস্থান: {listing.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">লিস্টিং তারিখ: {listing.listed}</div>
                        {listing.rating > 0 && (
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <div className="flex">
                              {listing.rating} ★ ({listing.reviewCount} রিভিউ)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`verified-${listing.id}`}>ভেরিফিকেশন স্ট্যাটাস:</Label>
                        <Switch 
                          id={`verified-${listing.id}`} 
                          checked={listing.ownerVerified}
                          onCheckedChange={(checked) => handleOwnerVerificationChange(listing.id, checked)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          ডকুমেন্ট দেখুন
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          KYC তথ্য
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
                {disputes.length > 0 ? disputes.map(dispute => (
                  <div key={dispute.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">ডিসপিউট #{dispute.id}</h3>
                          <Badge variant={getStatusBadgeVariant(dispute.status)}>
                            {dispute.status === 'pending' ? 'পেন্ডিং' : 
                             dispute.status === 'investigating' ? 'তদন্তাধীন' : 'সমাধানকৃত'}
                          </Badge>
                          <Badge variant={getPriorityBadgeVariant(dispute.priority)}>
                            {dispute.priority === 'high' ? 'হাই' : 
                             dispute.priority === 'medium' ? 'মিডিয়াম' : 'লো'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>রেন্টাল আইটেম: {dispute.listingName}</div>
                          <div>অভিযোগকারী: {dispute.complainant} • বিরুদ্ধে: {dispute.defendantName}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">তারিখ: {dispute.createdDate}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-secondary/10 rounded-md">
                      <p className="text-sm">{dispute.issue}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        বিস্তারিত
                      </Button>
                      
                      {dispute.status !== 'resolved' && (
                        <>
                          {dispute.status === 'pending' && (
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleDisputeStatusChange(dispute.id, 'investigating')}
                            >
                              <Gavel className="h-4 w-4 mr-2" />
                              তদন্ত শুরু করুন
                            </Button>
                          )}
                          
                          {dispute.status === 'investigating' && (
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => handleDisputeStatusChange(dispute.id, 'resolved')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              সমাধান করুন
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Gavel className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো ডিসপিউট নেই</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>রেন্টাল পলিসি</CardTitle>
              <Button size="sm" onClick={() => setIsAddPolicyOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন পলিসি
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map(policy => (
                  <div key={policy.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{policy.name}</h3>
                          <Badge variant={policy.status === 'active' ? 'default' : 'outline'}>
                            {policy.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${policy.id}`}>সক্রিয়:</Label>
                        <Switch 
                          id={`active-${policy.id}`} 
                          checked={policy.status === 'active'}
                          onCheckedChange={(checked) => handlePolicyStatusChange(policy.id, checked ? 'active' : 'inactive')}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-secondary/10 rounded-md">
                      <p className="text-sm">{policy.description}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        সম্পাদনা
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন পলিসি যোগ করুন</DialogTitle>
                <DialogDescription>
                  রেন্টাল সিস্টেমের জন্য নতুন পলিসির বিবরণ দিন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="policy-name">পলিসি নাম</Label>
                  <Input 
                    id="policy-name" 
                    placeholder="পলিসি নাম লিখুন" 
                    value={newPolicy.name}
                    onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policy-description">বিবরণ</Label>
                  <Textarea 
                    id="policy-description" 
                    placeholder="পলিসির বিবরণ লিখুন"
                    value={newPolicy.description}
                    onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                  বাতিল করুন
                </Button>
                <Button onClick={handleAddPolicy}>
                  পলিসি যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RentalManagement;
