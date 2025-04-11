
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  PackagePlus, 
  Layers, 
  CheckCircle, 
  XCircle, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search, 
  ShoppingBag, 
  Star, 
  MessageSquare, 
  UserCheck, 
  Tag, 
  Filter,
  Percent,
  Eye
} from 'lucide-react';

// মক ডাটা 
const MOCK_PRODUCTS = [
  { 
    id: 'prod-001', 
    name: 'আইফোন ১৩ প্রো', 
    category: 'ইলেকট্রনিক্স', 
    subCategory: 'মোবাইল ফোন',
    price: '৯৫,০০০ ৳', 
    seller: 'অফিসিয়াল অ্যাপল স্টোর', 
    sellerVerified: true,
    status: 'approved', 
    stock: 12,
    salesCount: 45,
    rating: 4.8,
    reviewCount: 32,
    listed: '১০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'prod-002', 
    name: 'ডেল XPS ১৫ ল্যাপটপ', 
    category: 'ইলেকট্রনিক্স', 
    subCategory: 'ল্যাপটপ',
    price: '১,২৫,০০০ ৳', 
    seller: 'ডিজিটাল ওয়ার্ল্ড', 
    sellerVerified: true,
    status: 'approved', 
    stock: 5,
    salesCount: 18,
    rating: 4.5,
    reviewCount: 20,
    listed: '১৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'prod-003', 
    name: 'স্যামসাং ৫৫ ইঞ্চি স্মার্ট টিভি', 
    category: 'ইলেকট্রনিক্স', 
    subCategory: 'টেলিভিশন',
    price: '৭৫,০০০ ৳', 
    seller: 'স্যামসাং বাংলাদেশ', 
    sellerVerified: true,
    status: 'approved', 
    stock: 8,
    salesCount: 12,
    rating: 4.2,
    reviewCount: 15,
    listed: '২০ দিন আগে',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'prod-004', 
    name: 'সোনি হেডফোন WH-1000XM4', 
    category: 'ইলেকট্রনিক্স', 
    subCategory: 'অডিও',
    price: '২৮,০০০ ৳', 
    seller: 'গ্যাজেট হাব', 
    sellerVerified: false,
    status: 'pending', 
    stock: 15,
    salesCount: 0,
    rating: 0,
    reviewCount: 0,
    listed: '২ দিন আগে',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'prod-005', 
    name: 'ক্যানন DSLR ক্যামেরা', 
    category: 'ইলেকট্রনিক্স', 
    subCategory: 'ক্যামেরা',
    price: '৬৫,০০০ ৳', 
    seller: "ফটোগ্রাফার'স হাব", 
    sellerVerified: false,
    status: 'rejected', 
    stock: 3,
    salesCount: 0,
    rating: 0,
    reviewCount: 0,
    listed: '৫ দিন আগে',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=300&auto=format&fit=crop'
  }
];

const MOCK_REVIEWS = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    productName: 'আইফোন ১৩ প্রো',
    userName: 'আসিফ আহমেদ',
    rating: 5,
    comment: 'খুব ভালো প্রোডাক্ট, দ্রুত ডেলিভারি পেয়েছি।',
    date: '২ দিন আগে',
    status: 'approved'
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    productName: 'আইফোন ১৩ প্রো',
    userName: 'সানজিদা খাতুন',
    rating: 4,
    comment: 'প্রোডাক্ট অরিজিনাল কিন্তু প্যাকেজিং একটু ভালো হতে পারত।',
    date: '৪ দিন আগে',
    status: 'approved'
  },
  {
    id: 'rev-003',
    productId: 'prod-002',
    productName: 'ডেল XPS ১৫ ল্যাপটপ',
    userName: 'রবিউল ইসলাম',
    rating: 1,
    comment: 'এই প্রোডাক্ট সম্পর্কে অনেক খারাপ অভিজ্ঞতা, একদমই কাজ করছে না, এবং কোম্পানি কোন সাপোর্ট দিচ্ছে না।',
    date: '১ দিন আগে',
    status: 'pending'
  },
  {
    id: 'rev-004',
    productId: 'prod-002',
    productName: 'ডেল XPS ১৫ ল্যাপটপ',
    userName: 'কবির হোসেন',
    rating: 5,
    comment: 'অসাধারণ ল্যাপটপ এবং দাম অনুযায়ী একদম ঠিক।',
    date: '৫ দিন আগে',
    status: 'approved'
  }
];

const MOCK_CATEGORIES = [
  {
    id: 'cat-001',
    name: 'ইলেকট্রনিক্স',
    subCategories: [
      { id: 'sub-001', name: 'মোবাইল ফোন' },
      { id: 'sub-002', name: 'ল্যাপটপ' },
      { id: 'sub-003', name: 'টেলিভিশন' },
      { id: 'sub-004', name: 'অডিও' },
      { id: 'sub-005', name: 'ক্যামেরা' }
    ],
    icon: Package,
    productCount: 156
  },
  {
    id: 'cat-002',
    name: 'ফ্যাশন',
    subCategories: [
      { id: 'sub-006', name: 'পুরুষদের পোশাক' },
      { id: 'sub-007', name: 'মহিলাদের পোশাক' },
      { id: 'sub-008', name: 'জুতা' },
      { id: 'sub-009', name: 'ব্যাগ' },
      { id: 'sub-010', name: 'গহনা' }
    ],
    icon: ShoppingBag,
    productCount: 245
  },
  {
    id: 'cat-003',
    name: 'হোম এপ্লায়েন্স',
    subCategories: [
      { id: 'sub-011', name: 'রেফ্রিজারেটর' },
      { id: 'sub-012', name: 'এয়ার কন্ডিশনার' },
      { id: 'sub-013', name: 'ওয়াশিং মেশিন' },
      { id: 'sub-014', name: 'মাইক্রোওয়েভ' },
      { id: 'sub-015', name: 'কুকার' }
    ],
    icon: Package,
    productCount: 87
  }
];

const MOCK_SELLERS = [
  {
    id: 'seller-001',
    name: 'অফিসিয়াল অ্যাপল স্টোর',
    email: 'apple@example.com',
    phone: '০১৭১২৩৪৫৬৭৮',
    address: 'গুলশান-১, ঢাকা',
    totalProducts: 45,
    totalSales: 456,
    rating: 4.8,
    verified: true,
    status: 'active',
    joinDate: '১ জানুয়ারি, ২০২৫'
  },
  {
    id: 'seller-002',
    name: 'ডিজিটাল ওয়ার্ল্ড',
    email: 'digital@example.com',
    phone: '০১৮১২৩৪৫৬৭৮',
    address: 'মিরপুর-১০, ঢাকা',
    totalProducts: 87,
    totalSales: 324,
    rating: 4.5,
    verified: true,
    status: 'active',
    joinDate: '১৫ ফেব্রুয়ারি, ২০২৫'
  },
  {
    id: 'seller-003',
    name: 'গ্যাজেট হাব',
    email: 'gadget@example.com',
    phone: '০১৯১২৩৪৫৬৭৮',
    address: 'বনানী, ঢাকা',
    totalProducts: 23,
    totalSales: 56,
    rating: 3.9,
    verified: false,
    status: 'pending',
    joinDate: '১০ মার্চ, ২০২৫'
  }
];

const MOCK_PROMOTIONS = [
  {
    id: 'promo-001',
    title: 'ইলেকট্রনিক্স সেল',
    category: 'ইলেকট্রনিক্স',
    discount: '২০%',
    startDate: '১ মে, ২০২৫',
    endDate: '৭ মে, ২০২৫',
    status: 'active'
  },
  {
    id: 'promo-002',
    title: 'মাদার্স ডে স্পেশাল',
    category: 'ফ্যাশন',
    discount: '১৫%',
    startDate: '১০ মে, ২০২৫',
    endDate: '১২ মে, ২০২৫',
    status: 'upcoming'
  }
];

const MarketplaceManagement: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [sellers, setSellers] = useState(MOCK_SELLERS);
  const [promotions, setPromotions] = useState(MOCK_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });

  // প্রোডাক্ট ফিল্টারিং
  const filteredProducts = products.filter(product => {
    // সার্চ ফিল্টার
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    // ক্যাটাগরি ফিল্টার
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // পেন্ডিং রিভিউ
  const pendingReviews = reviews.filter(review => review.status === 'pending');

  // প্রোডাক্ট স্ট্যাটাস পরিবর্তন
  const handleProductStatusChange = (productId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `প্রোডাক্টের স্ট্যাটাস ${newStatus === 'approved' ? 'অনুমোদিত' : newStatus === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // রিভিউ স্ট্যাটাস পরিবর্তন
  const handleReviewStatusChange = (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
    
    toast({
      title: "রিভিউ স্ট্যাটাস আপডেট হয়েছে",
      description: `রিভিউ ${newStatus === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // বিক্রেতা ভেরিফিকেশন স্ট্যাটাস পরিবর্তন
  const handleSellerVerificationChange = (sellerId: string, verified: boolean) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId ? { ...seller, verified, status: verified ? 'active' : 'pending' } : seller
    ));
    
    toast({
      title: "বিক্রেতা ভেরিফিকেশন আপডেট হয়েছে",
      description: `বিক্রেতার ভেরিফিকেশন স্ট্যাটাস ${verified ? 'ভেরিফাইড' : 'আনভেরিফাইড'} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // নতুন ক্যাটাগরি যোগ করা
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: `cat-${categories.length + 1}`,
        name: newCategory.name,
        subCategories: [],
        icon: Package,
        productCount: 0
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

  // ক্যাটাগরি ডিলিট করা
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    
    toast({
      title: "ক্যাটাগরি ডিলিট করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে ডিলিট করা হয়েছে।",
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'destructive';
      case 'active':
        return 'default';
      case 'upcoming':
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
          <h2 className="text-2xl font-bold">মার্কেটপ্লেস ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">প্রোডাক্ট, ক্যাটাগরি, বিক্রেতা এবং রিভিউ পরিচালনা করুন</p>
        </div>
        <Button>
          <PackagePlus className="h-4 w-4 mr-2" />
          নতুন প্রোডাক্ট
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="sellers">বিক্রেতা</TabsTrigger>
          <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
          <TabsTrigger value="promotions">প্রমোশন</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>প্রোডাক্ট লিস্টিং</CardTitle>
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
                  placeholder="প্রোডাক্ট খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      {product.image && (
                        <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>ক্যাটাগরি: {product.category}</span>
                              <span>সাবক্যাটাগরি: {product.subCategory}</span>
                              <span>মূল্য: {product.price}</span>
                              <span>স্টক: {product.stock}</span>
                            </div>
                          </div>
                          
                          <Badge variant={getStatusBadgeVariant(product.status)}>
                            {product.status === 'approved' ? 'অনুমোদিত' : 
                             product.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-sm">
                            বিক্রেতা: <span className="font-medium">{product.seller}</span>
                            {product.sellerVerified && (
                              <CheckCircle className="h-4 w-4 text-green-500 inline ml-1" />
                            )}
                          </div>
                          <Separator orientation="vertical" className="h-4 mx-1" />
                          {product.salesCount > 0 && (
                            <>
                              <div className="text-sm">
                                বিক্রয়: {product.salesCount}টি
                              </div>
                              <Separator orientation="vertical" className="h-4 mx-1" />
                            </>
                          )}
                          {product.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderRatingStars(product.rating)}
                              </div>
                              <span className="text-sm">({product.reviewCount})</span>
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
                      
                      {product.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleProductStatusChange(product.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleProductStatusChange(product.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান
                          </Button>
                        </>
                      )}
                      
                      {product.status === 'approved' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleProductStatusChange(product.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          ব্লক
                        </Button>
                      )}
                      
                      {product.status === 'rejected' && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleProductStatusChange(product.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          পুনরায় অনুমোদন
                        </Button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
                  </div>
                )}
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
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {category.productCount} প্রোডাক্ট • {category.subCategories.length} সাবক্যাটাগরি
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          সাবক্যাটাগরি
                        </Button>
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
                    
                    {category.subCategories.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">সাবক্যাটাগরি</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subCategories.map(sub => (
                            <Badge key={sub.id} variant="outline" className="flex items-center gap-1 py-1.5">
                              <span>{sub.name}</span>
                              <button className="ml-1 hover:text-destructive">
                                <XCircle className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
                  নতুন ক্যাটাগরির বিবরণ দিন। পরবর্তীতে এতে সাবক্যাটাগরি যোগ করতে পারবেন।
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
        
        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>বিক্রেতা ম্যানেজমেন্ট</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="বিক্রেতা খুঁজুন..." 
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
                {sellers.map(seller => (
                  <div key={seller.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{seller.name}</h3>
                          {seller.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant={getStatusBadgeVariant(seller.status)}>
                            {seller.status === 'active' ? 'সক্রিয়' : 
                             seller.status === 'pending' ? 'পেন্ডিং' : 'সাসপেন্ডেড'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>{seller.email} • {seller.phone}</div>
                          <div>ঠিকানা: {seller.address}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-right">যোগদান: {seller.joinDate}</div>
                        {seller.rating > 0 && (
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <div className="flex">
                              {renderRatingStars(seller.rating)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 bg-secondary/20 rounded-md p-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{seller.totalProducts}</div>
                        <div className="text-sm text-muted-foreground">টোটাল প্রোডাক্ট</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{seller.totalSales}</div>
                        <div className="text-sm text-muted-foreground">টোটাল বিক্রয়</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{seller.rating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">রেটিং</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`verified-${seller.id}`}>ভেরিফিকেশন স্ট্যাটাস:</Label>
                        <Switch 
                          id={`verified-${seller.id}`} 
                          checked={seller.verified}
                          onCheckedChange={(checked) => handleSellerVerificationChange(seller.id, checked)}
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
                          defaultValue={seller.status}
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
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>পেন্ডিং রিভিউ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.length > 0 ? pendingReviews.map(review => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          প্রোডাক্ট: <span className="font-medium">{review.productName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <h3 className="font-medium">{review.userName}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({review.date})</span>
                        </div>
                      </div>
                      
                      <Badge variant="warning">পেন্ডিং অনুমোদন</Badge>
                    </div>
                    
                    <div className="mt-2 p-3 bg-secondary/10 rounded-md">
                      <p>{review.comment}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleReviewStatusChange(review.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        অনুমোদন করুন
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReviewStatusChange(review.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        প্রত্যাখ্যান করুন
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো পেন্ডিং রিভিউ নেই</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>সমস্ত রিভিউ</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="রিভিউ খুঁজুন..." 
                    className="w-[200px]"
                  />
                  <Select defaultValue="all">
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">প্রোডাক্ট</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ব্যবহারকারী</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">রেটিং</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">কমেন্ট</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">তারিখ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map(review => (
                      <tr key={review.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{review.productName}</td>
                        <td className="p-4 align-middle">{review.userName}</td>
                        <td className="p-4 align-middle">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-4 align-middle max-w-[200px] truncate">{review.comment}</td>
                        <td className="p-4 align-middle">{review.date}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={getStatusBadgeVariant(review.status === 'pending' ? 'pending' : review.status === 'approved' ? 'approved' : 'rejected')}>
                            {review.status === 'approved' ? 'অনুমোদিত' : 
                             review.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
        
        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>প্রমোশন ও অফার</CardTitle>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন প্রমোশন
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map(promo => (
                  <div key={promo.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{promo.title}</h3>
                            <Badge variant={getStatusBadgeVariant(promo.status)}>
                              {promo.status === 'active' ? 'চলমান' : 'আসন্ন'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {promo.startDate} - {promo.endDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">ক্যাটাগরি</div>
                          <div>{promo.category}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">ডিসকাউন্ট</div>
                          <div className="font-bold text-primary">{promo.discount}</div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceManagement;
