
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
  FileText,
  MessageSquare,
  UserCheck,
  Settings,
  Shield,
  DollarSign,
  Star,
  BookOpen,
  Users,
  Eye,
  AlertTriangle,
  Filter,
  Percent,
  Download,
  BarChart,
  BookOpenCheck,
  BadgeCheck,
  Copyright
} from 'lucide-react';

// মক ডাটা
const MOCK_DIGITAL_CONTENT = [
  {
    id: 'dc-001',
    title: 'ওয়েব ডেভেলপমেন্ট মাস্টারক্লাস',
    type: 'কোর্স',
    category: 'আইটি',
    price: '৫,০০০ ৳',
    creator: 'ডিজিটাল স্কিলস',
    creatorVerified: true,
    sales: 143,
    rating: 4.8,
    reviewCount: 52,
    status: 'approved',
    contentLength: '৩০ ঘণ্টা',
    listed: '২০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'dc-002',
    title: 'ফটোগ্রাফি ফান্ডামেন্টালস ই-বুক',
    type: 'ই-বুক',
    category: 'মিডিয়া',
    price: '৫০০ ৳',
    creator: 'ক্রিয়েটিভ আর্টস',
    creatorVerified: true,
    sales: 87,
    rating: 4.5,
    reviewCount: 23,
    status: 'approved',
    contentLength: '১০০ পৃষ্ঠা',
    listed: '৪৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'dc-003',
    title: 'মার্কেটিং স্ট্র্যাটেজি টেমপ্লেট',
    type: 'টেমপ্লেট',
    category: 'ব্যবসা',
    price: '৮০০ ৳',
    creator: 'বিজনেস হাব',
    creatorVerified: true,
    sales: 67,
    rating: 4.2,
    reviewCount: 18,
    status: 'approved',
    contentLength: '১৫ টেমপ্লেট',
    listed: '১০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'dc-004',
    title: 'ফ্রিল্যান্সিং কিভাবে শুরু করবেন',
    type: 'কোর্স',
    category: 'ক্যারিয়ার',
    price: '২,০০০ ৳',
    creator: 'ফ্রিল্যান্স মাস্টার',
    creatorVerified: false,
    sales: 0,
    rating: 0,
    reviewCount: 0,
    status: 'pending',
    contentLength: '১০ ঘণ্টা',
    listed: '৩ দিন আগে',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'dc-005',
    title: 'ফ্রিল্যান্স গ্রাফিক ডিজাইন পোর্টফোলিও',
    type: 'টেমপ্লেট',
    category: 'ডিজাইন',
    price: '৩০০ ৳',
    creator: 'ক্রিয়েটিভ আর্টস',
    creatorVerified: true,
    sales: 0,
    rating: 0,
    reviewCount: 0,
    status: 'rejected',
    contentLength: '৫ টেমপ্লেট',
    listed: '৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=300&auto=format&fit=crop'
  }
];

const MOCK_CREATORS = [
  {
    id: 'cr-001',
    name: 'ডিজিটাল স্কিলস',
    email: 'digitalskills@example.com',
    phone: '০১৭১২৩৪৫৬৭৮',
    category: 'আইটি',
    content: 3,
    verified: true,
    rating: 4.8,
    status: 'active',
    joinDate: '১ জানুয়ারি, ২০২৫',
    documents: ['পাসপোর্ট কপি', 'এনআইডি', 'সার্টিফিকেট'],
    totalRevenue: '১৫,৫৫,০০০ ৳',
    followers: 1250
  },
  {
    id: 'cr-002',
    name: 'ক্রিয়েটিভ আর্টস',
    email: 'creativearts@example.com',
    phone: '০১৮১২৩৪৫৬৭৮',
    category: 'মিডিয়া',
    content: 5,
    verified: true,
    rating: 4.5,
    status: 'active',
    joinDate: '১৫ ফেব্রুয়ারি, ২০২৫',
    documents: ['পাসপোর্ট কপি', 'এনআইডি'],
    totalRevenue: '৮,২৫,০০০ ৳',
    followers: 890
  },
  {
    id: 'cr-003',
    name: 'ফ্রিল্যান্স মাস্টার',
    email: 'freelancemaster@example.com',
    phone: '০১৯১২৩৪৫৬৭৮',
    category: 'ক্যারিয়ার',
    content: 1,
    verified: false,
    rating: 0,
    status: 'pending',
    joinDate: '১০ এপ্রিল, ২০২৫',
    documents: ['এনআইডি'],
    totalRevenue: '০ ৳',
    followers: 120
  }
];

const MOCK_CONTENT_CATEGORIES = [
  {
    id: 'dcat-001',
    name: 'আইটি',
    contentCount: 15,
    creators: 3,
    royaltyRate: '৭০%'
  },
  {
    id: 'dcat-002',
    name: 'মিডিয়া',
    contentCount: 8,
    creators: 4,
    royaltyRate: '৬৫%'
  },
  {
    id: 'dcat-003',
    name: 'ব্যবসা',
    contentCount: 12,
    creators: 5,
    royaltyRate: '৬০%'
  },
  {
    id: 'dcat-004',
    name: 'ক্যারিয়ার',
    contentCount: 9,
    creators: 2,
    royaltyRate: '৬৫%'
  },
  {
    id: 'dcat-005',
    name: 'ডিজাইন',
    contentCount: 11,
    creators: 6,
    royaltyRate: '৭০%'
  }
];

const MOCK_ROYALTY_TRANSACTIONS = [
  {
    id: 'rt-001',
    creator: 'ডিজিটাল স্কিলস',
    content: 'ওয়েব ডেভেলপমেন্ট মাস্টারক্লাস',
    sales: 12,
    amount: '৩৬,০০০ ৳',
    royaltyAmount: '২৫,২০০ ৳',
    platformFee: '১০,৮০০ ৳',
    period: 'এপ্রিল, ২০২৫',
    status: 'paid',
    paymentDate: '৫ মে, ২০২৫'
  },
  {
    id: 'rt-002',
    creator: 'ক্রিয়েটিভ আর্টস',
    content: 'ফটোগ্রাফি ফান্ডামেন্টালস ই-বুক',
    sales: 8,
    amount: '৪,০০০ ৳',
    royaltyAmount: '২,৬০০ ৳',
    platformFee: '১,৪০০ ৳',
    period: 'এপ্রিল, ২০২৫',
    status: 'pending',
    paymentDate: '-'
  }
];

const MOCK_CONTENT_STATS = [
  {
    id: 'stat-001',
    content: 'ওয়েব ডেভেলপমেন্ট মাস্টারক্লাস',
    views: 3546,
    downloads: 143,
    completionRate: '68%',
    averageRating: 4.8,
    revenue: '৭,১৫,০০০ ৳',
    lastUpdated: '৫ এপ্রিল, ২০২৫'
  },
  {
    id: 'stat-002',
    content: 'ফটোগ্রাফি ফান্ডামেন্টালস ই-বুক',
    views: 2356,
    downloads: 87,
    completionRate: '92%',
    averageRating: 4.5,
    revenue: '৪৩,৫০০ ৳',
    lastUpdated: '৮ এপ্রিল, ২০২৫'
  },
  {
    id: 'stat-003',
    content: 'মার্কেটিং স্ট্র্যাটেজি টেমপ্লেট',
    views: 1987,
    downloads: 67,
    completionRate: '100%',
    averageRating: 4.2,
    revenue: '৫৩,৬০০ ৳',
    lastUpdated: '১০ এপ্রিল, ২০২৫'
  }
];

const DigitalContentManagement: React.FC = () => {
  const { toast } = useToast();
  const [digitalContent, setDigitalContent] = useState(MOCK_DIGITAL_CONTENT);
  const [creators, setCreators] = useState(MOCK_CREATORS);
  const [categories, setCategories] = useState(MOCK_CONTENT_CATEGORIES);
  const [royaltyTransactions, setRoyaltyTransactions] = useState(MOCK_ROYALTY_TRANSACTIONS);
  const [contentStats, setContentStats] = useState(MOCK_CONTENT_STATS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', royaltyRate: '' });
  const [isRoyaltyDialogOpen, setIsRoyaltyDialogOpen] = useState(false);
  const [royaltySettings, setRoyaltySettings] = useState({
    defaultRoyaltyRate: '65',
    premiumCreatorRate: '75',
    platformFeePercent: '35',
    minimumPayoutAmount: '৫,০০০'
  });

  // ডিজিটাল কন্টেন্ট ফিল্টারিং
  const filteredContent = digitalContent.filter(content => {
    // সার্চ ফিল্টার
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      content.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    // ক্যাটাগরি ফিল্টার
    const matchesCategory = categoryFilter === 'all' || content.category === categoryFilter;
    
    // টাইপ ফিল্টার
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // কন্টেন্ট স্ট্যাটাস পরিবর্তন
  const handleContentStatusChange = (contentId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setDigitalContent(digitalContent.map(content => 
      content.id === contentId ? { ...content, status: newStatus } : content
    ));
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `কন্টেন্টের স্ট্যাটাস ${newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // ক্রিয়েটর ভেরিফিকেশন স্ট্যাটাস পরিবর্তন
  const handleCreatorVerificationChange = (creatorId: string, verified: boolean) => {
    setCreators(creators.map(creator => 
      creator.id === creatorId ? { ...creator, verified, status: verified ? 'active' : 'pending' } : creator
    ));
    
    toast({
      title: "ক্রিয়েটর ভেরিফিকেশন আপডেট হয়েছে",
      description: `ক্রিয়েটরের ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // নতুন ক্যাটাগরি যোগ করা
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: `dcat-${categories.length + 1}`,
        name: newCategory.name,
        contentCount: 0,
        creators: 0,
        royaltyRate: newCategory.royaltyRate || '৬৫%'
      };
      
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', royaltyRate: '' });
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

  // রয়্যালটি পেমেন্ট স্ট্যাটাস আপডেট
  const handleRoyaltyPaymentStatusChange = (transactionId: string, newStatus: string) => {
    setRoyaltyTransactions(royaltyTransactions.map(transaction => 
      transaction.id === transactionId ? { ...transaction, status: newStatus, paymentDate: '১১ মে, ২০২৫' } : transaction
    ));
    
    toast({
      title: "পেমেন্ট স্ট্যাটাস আপডেট হয়েছে",
      description: `রয়্যালটি পেমেন্ট স্ট্যাটাস ${newStatus} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // রয়্যালটি সেটিংস আপডেট
  const handleRoyaltySettingsUpdate = () => {
    setIsRoyaltyDialogOpen(false);
    
    toast({
      title: "রয়্যালটি সেটিংস আপডেট হয়েছে",
      description: "ডিজিটাল কন্টেন্ট রয়্যালটি সেটিংস সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
      case 'paid':
        return 'default';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'destructive';
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
          <h2 className="text-2xl font-bold">ডিজিটাল কন্টেন্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">ডিজিটাল কন্টেন্ট, ক্যাটাগরি, ক্রিয়েটর এবং রয়্যালটি পরিচালনা করুন</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          নতুন কন্টেন্ট
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="content">কন্টেন্ট</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="creators">ক্রিয়েটর</TabsTrigger>
          <TabsTrigger value="royalty">রয়্যালটি</TabsTrigger>
          <TabsTrigger value="statistics">স্ট্যাটিসটিক্স</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>ডিজিটাল কন্টেন্ট লিস্টিং</CardTitle>
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
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব টাইপ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব টাইপ</SelectItem>
                      <SelectItem value="কোর্স">কোর্স</SelectItem>
                      <SelectItem value="ই-বুক">ই-বুক</SelectItem>
                      <SelectItem value="টেমপ্লেট">টেমপ্লেট</SelectItem>
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
                  placeholder="কন্টেন্ট খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.length > 0 ? filteredContent.map(content => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      {content.image && (
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={content.image} 
                            alt={content.title} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{content.title}</h3>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>টাইপ: {content.type}</span>
                              <span>ক্যাটাগরি: {content.category}</span>
                              <span>মূল্য: {content.price}</span>
                              <span>কন্টেন্ট: {content.contentLength}</span>
                            </div>
                          </div>
                          
                          <Badge variant={getStatusBadgeVariant(content.status)}>
                            {content.status === 'approved' ? 'অনুমোদিত' : 
                             content.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm">
                            ক্রিয়েটর: <span className="font-medium">{content.creator}</span>
                            {content.creatorVerified && (
                              <CheckCircle className="h-4 w-4 text-green-500 inline ml-1" />
                            )}
                          </div>
                          <Separator orientation="vertical" className="h-4 mx-1" />
                          {content.sales > 0 && (
                            <>
                              <div className="text-sm">
                                বিক্রয়: {content.sales}টি
                              </div>
                              <Separator orientation="vertical" className="h-4 mx-1" />
                            </>
                          )}
                          {content.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderRatingStars(content.rating)}
                              </div>
                              <span className="text-sm">({content.reviewCount})</span>
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
                        <Copyright className="h-4 w-4 mr-2" />
                        কপিরাইট চেক
                      </Button>
                      
                      {content.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleContentStatusChange(content.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleContentStatusChange(content.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান
                          </Button>
                        </>
                      )}
                      
                      {content.status === 'approved' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleContentStatusChange(content.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          বাতিল
                        </Button>
                      )}
                      
                      {content.status === 'rejected' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleContentStatusChange(content.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          পুনরায় অনুমোদন
                        </Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো কন্টেন্ট পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>কন্টেন্ট ক্যাটাগরি</CardTitle>
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
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {category.contentCount} কন্টেন্ট • {category.creators} ক্রিয়েটর
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">রয়্যালটি রেট</div>
                          <div className="font-bold text-primary">{category.royaltyRate}</div>
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
                <DialogTitle>নতুন কন্টেন্ট ক্যাটাগরি যোগ করুন</DialogTitle>
                <DialogDescription>
                  নতুন ডিজিটাল কন্টেন্ট ক্যাটাগরির বিবরণ দিন।
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
                  <Label htmlFor="royalty-rate">রয়্যালটি রেট (%)</Label>
                  <Input 
                    id="royalty-rate" 
                    placeholder="৬৫" 
                    value={newCategory.royaltyRate}
                    onChange={(e) => setNewCategory({ ...newCategory, royaltyRate: e.target.value })}
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
        
        <TabsContent value="creators" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>কন্টেন্ট ক্রিয়েটর</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="ক্রিয়েটর খুঁজুন..." 
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
                {creators.map(creator => (
                  <div key={creator.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{creator.name}</h3>
                          {creator.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant={getStatusBadgeVariant(creator.status)}>
                            {creator.status === 'active' ? 'সক্রিয়' : 
                             creator.status === 'pending' ? 'পেন্ডিং' : 'সাসপেন্ডেড'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>ইমেইল: {creator.email} • ফোন: {creator.phone}</div>
                          <div>ক্যাটাগরি: {creator.category} • কন্টেন্ট: {creator.content}টি</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">যোগদান: {creator.joinDate}</div>
                        {creator.rating > 0 && (
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <div className="flex">
                              {renderRatingStars(creator.rating)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 bg-secondary/10 rounded-md p-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{creator.content}</div>
                        <div className="text-sm text-muted-foreground">কন্টেন্ট</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{creator.followers}</div>
                        <div className="text-sm text-muted-foreground">ফলোয়ার</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{creator.totalRevenue}</div>
                        <div className="text-sm text-muted-foreground">মোট আয়</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-secondary/10 rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">দাখিলকৃত ডকুমেন্ট</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="px-2 py-1">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`verified-${creator.id}`}>ভেরিফিকেশন স্ট্যাটাস:</Label>
                        <Switch 
                          id={`verified-${creator.id}`} 
                          checked={creator.verified}
                          onCheckedChange={(checked) => handleCreatorVerificationChange(creator.id, checked)}
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
                          defaultValue={creator.status}
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
        
        <TabsContent value="royalty" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>রয়্যালটি ম্যানেজমেন্ট</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => setIsRoyaltyDialogOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  রয়্যালটি সেটিংস
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  পেমেন্ট জেনারেট
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">রয়্যালটি ডিস্ট্রিবিউশন সেটিংস</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">ডিফল্ট রয়্যালটি রেট</td>
                          <td className="py-2 text-right font-medium">{royaltySettings.defaultRoyaltyRate}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">প্রিমিয়াম ক্রিয়েটর রেট</td>
                          <td className="py-2 text-right font-medium">{royaltySettings.premiumCreatorRate}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">প্ল্যাটফর্ম ফি</td>
                          <td className="py-2 text-right font-medium">{royaltySettings.platformFeePercent}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">ন্যূনতম পেআউট পরিমাণ</td>
                          <td className="py-2 text-right font-medium">{royaltySettings.minimumPayoutAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">রয়্যালটি পেমেন্ট স্ট্যাটাস</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">মে, ২০২৫</div>
                          <div className="font-medium">পেন্ডিং পেমেন্ট</div>
                        </div>
                        <div className="font-bold text-lg">৪৫,৫০০ ৳</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">এপ্রিল, ২০২৫</div>
                          <div className="font-medium">সম্পন্ন পেমেন্ট</div>
                        </div>
                        <div className="font-bold text-lg">৬৮,২০০ ৳</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">রয়্যালটি ট্রানজেকশন</h3>
                  <div className="rounded-md border">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr>
                          <th className="h-12 px-4 text-left align-middle font-medium">ক্রিয়েটর</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">কন্টেন্ট</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">পিরিয়ড</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">বিক্রয়</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">মোট আয়</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">রয়্যালটি</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {royaltyTransactions.map(transaction => (
                          <tr key={transaction.id} className="border-b">
                            <td className="p-4 align-middle font-medium">{transaction.creator}</td>
                            <td className="p-4 align-middle">{transaction.content}</td>
                            <td className="p-4 align-middle">{transaction.period}</td>
                            <td className="p-4 align-middle">{transaction.sales}টি</td>
                            <td className="p-4 align-middle">{transaction.amount}</td>
                            <td className="p-4 align-middle">{transaction.royaltyAmount}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={getStatusBadgeVariant(transaction.status)}>
                                {transaction.status === 'paid' ? 'পেইড' : 'পেন্ডিং'}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              {transaction.status === 'pending' ? (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleRoyaltyPaymentStatusChange(transaction.id, 'paid')}
                                >
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  পে
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  দেখুন
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isRoyaltyDialogOpen} onOpenChange={setIsRoyaltyDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>রয়্যালটি সেটিংস আপডেট</DialogTitle>
                <DialogDescription>
                  ডিজিটাল কন্টেন্ট রয়্যালটি সেটিংস পরিবর্তন করুন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="default-royalty">ডিফল্ট রয়্যালটি রেট (%)</Label>
                  <Input 
                    id="default-royalty" 
                    value={royaltySettings.defaultRoyaltyRate}
                    onChange={(e) => setRoyaltySettings({ ...royaltySettings, defaultRoyaltyRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium-rate">প্রিমিয়াম ক্রিয়েটর রেট (%)</Label>
                  <Input 
                    id="premium-rate" 
                    value={royaltySettings.premiumCreatorRate}
                    onChange={(e) => setRoyaltySettings({ ...royaltySettings, premiumCreatorRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">প্ল্যাটফর্ম ফি (%)</Label>
                  <Input 
                    id="platform-fee" 
                    value={royaltySettings.platformFeePercent}
                    onChange={(e) => setRoyaltySettings({ ...royaltySettings, platformFeePercent: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum-payout">ন্যূনতম পেআউট পরিমাণ</Label>
                  <Input 
                    id="minimum-payout" 
                    value={royaltySettings.minimumPayoutAmount}
                    onChange={(e) => setRoyaltySettings({ ...royaltySettings, minimumPayoutAmount: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRoyaltyDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleRoyaltySettingsUpdate}>
                  আপডেট করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ডিজিটাল কন্টেন্ট পরিসংখ্যান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* সামারি স্ট্যাটস */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary">{digitalContent.length}</div>
                    <div className="text-sm text-muted-foreground">মোট কন্টেন্ট</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary">{creators.length}</div>
                    <div className="text-sm text-muted-foreground">মোট ক্রিয়েটর</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary">৮,১২,৩০০ ৳</div>
                    <div className="text-sm text-muted-foreground">মোট রেভিনিউ</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary">২৯৭</div>
                    <div className="text-sm text-muted-foreground">মোট বিক্রয়</div>
                  </div>
                </div>
                
                {/* কন্টেন্ট ওয়াইজ স্ট্যাটিসটিক্স */}
                <div>
                  <h3 className="text-lg font-medium mb-4">কন্টেন্ট পারফর্মেন্স</h3>
                  <div className="rounded-md border">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr>
                          <th className="h-12 px-4 text-left align-middle font-medium">কন্টেন্ট</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">ভিউ</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">ডাউনলোড</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">কমপ্লিশন রেট</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">রেটিং</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">রেভিনিউ</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">আপডেট</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentStats.map(stat => (
                          <tr key={stat.id} className="border-b">
                            <td className="p-4 align-middle font-medium">{stat.content}</td>
                            <td className="p-4 align-middle">{stat.views}</td>
                            <td className="p-4 align-middle">{stat.downloads}</td>
                            <td className="p-4 align-middle">{stat.completionRate}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center">
                                {renderRatingStars(stat.averageRating)}
                                <span className="ml-1">({stat.averageRating})</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle font-medium">{stat.revenue}</td>
                            <td className="p-4 align-middle">{stat.lastUpdated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">কন্টেন্ট টাইপ ডিস্ট্রিবিউশন</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                      <BarChart className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4">মাসিক ডাউনলোড ট্রেন্ড</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                      <BarChart className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">এখানে লাইন চার্ট দেখানো হবে</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    PDF রিপোর্ট
                  </Button>
                  <Button variant="outline">
                    CSV ডাউনলোড
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalContentManagement;
