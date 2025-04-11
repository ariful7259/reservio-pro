
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Filter, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  ShoppingBag,
  Tag,
  Percent,
  Star,
  Store,
  Grid3x3,
  EyeIcon,
  FileText,
  Upload,
  Image,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

// Mock product data
const mockProducts = [
  { 
    id: 1, 
    name: 'স্মার্টফোন ১২৮জিবি', 
    category: 'ইলেকট্রনিক্স', 
    subcategory: 'মোবাইল', 
    seller: 'টেক স্টোর', 
    price: '৳ ২৪,৯৯৯', 
    status: 'অনুমোদিত',
    listed: '১০ মার্চ, ২০২৩',
    stock: 45,
    rating: 4.5
  },
  { 
    id: 2, 
    name: 'ওয়্যারলেস হেডফোন', 
    category: 'ইলেকট্রনিক্স', 
    subcategory: 'অডিও', 
    seller: 'সাউন্ড হাব', 
    price: '৳ ৩,৫০০', 
    status: 'পর্যালোচনা হচ্ছে',
    listed: '১৫ মে, ২০২৩',
    stock: 28,
    rating: 4.2
  },
  { 
    id: 3, 
    name: 'জিন্স প্যান্ট (পুরুষ)', 
    category: 'ফ্যাশন', 
    subcategory: 'পুরুষদের পোশাক', 
    seller: 'ফ্যাশন হাউস', 
    price: '৳ ১,৮০০', 
    status: 'প্রত্যাখ্যাত',
    listed: '৫ জুলাই, ২০২৩',
    stock: 60,
    rating: 3.8
  },
  { 
    id: 4, 
    name: 'শিশুদের খেলনা সেট', 
    category: 'শিশুদের', 
    subcategory: 'খেলনা', 
    seller: 'কিডস জোন', 
    price: '৳ ১,২০০', 
    status: 'অনুমোদিত',
    listed: '২০ জুন, ২০২৩',
    stock: 35,
    rating: 4.7
  },
  { 
    id: 5, 
    name: 'আইরন ফ্রাইং প্যান', 
    category: 'হোম অ্যাপ্লায়েন্স', 
    subcategory: 'কিচেন', 
    seller: 'হোম সেন্টার', 
    price: '৳ ৯৯৯', 
    status: 'অনুমোদিত',
    listed: '১২ আগস্ট, ২০২৩',
    stock: 50,
    rating: 4.3
  },
];

// Mock categories
const categories = [
  { id: 1, name: 'ইলেকট্রনিক্স', subcategories: 25, products: 450 },
  { id: 2, name: 'ফ্যাশন', subcategories: 18, products: 380 },
  { id: 3, name: 'হোম অ্যাপ্লায়েন্স', subcategories: 12, products: 245 },
  { id: 4, name: 'শিশুদের', subcategories: 8, products: 120 },
  { id: 5, name: 'স্পোর্টস', subcategories: 10, products: 95 },
];

// Mock subcategories
const subcategories = [
  { id: 1, name: 'মোবাইল', category: 'ইলেকট্রনিক্স', products: 120 },
  { id: 2, name: 'ল্যাপটপ', category: 'ইলেকট্রনিক্স', products: 85 },
  { id: 3, name: 'অডিও', category: 'ইলেকট্রনিক্স', products: 65 },
  { id: 4, name: 'পুরুষদের পোশাক', category: 'ফ্যাশন', products: 110 },
  { id: 5, name: 'মহিলাদের পোশাক', category: 'ফ্যাশন', products: 145 },
];

// Mock offers
const offers = [
  { id: 1, name: 'ঈদ মেগা অফার', discount: '৩০%', start: '১৫ মে, ২০২৩', end: '২৫ মে, ২০২৩', status: 'সক্রিয়', products: 120 },
  { id: 2, name: 'গ্রীষ্মকালীন সেল', discount: '২৫%', start: '১ জুন, ২০২৩', end: '১৫ জুন, ২০২৩', status: 'সমাপ্ত', products: 85 },
  { id: 3, name: 'শীতকালীন অফার', discount: '২০%', start: '১ ডিসেম্বর, ২০২৩', end: '১৫ ডিসেম্বর, ২০২৩', status: 'আসন্ন', products: 0 },
];

// Mock sellers
const sellers = [
  { id: 1, name: 'টেক স্টোর', products: 45, rating: 4.8, status: 'যাচাইকৃত', since: '১০ জানুয়ারি, ২০২৩' },
  { id: 2, name: 'ফ্যাশন হাউস', products: 68, rating: 4.5, status: 'যাচাইকৃত', since: '১৫ ফেব্রুয়ারি, ২০২৩' },
  { id: 3, name: 'কিডস জোন', products: 32, rating: 4.7, status: 'পর্যালোচনা হচ্ছে', since: '৫ মার্চ, ২০২৩' },
  { id: 4, name: 'হোম সেন্টার', products: 25, rating: 4.2, status: 'যাচাইকৃত', since: '২০ এপ্রিল, ২০২৩' },
  { id: 5, name: 'সাউন্ড হাব', products: 15, rating: 4.0, status: 'প্রত্যাখ্যাত', since: '১২ মে, ২০২৩' },
];

// Mock reviews
const reviews = [
  { id: 1, product: 'স্মার্টফোন ১২৮জিবি', user: 'আব্দুল্লাহ খান', rating: 5, comment: 'খুবই ভালো প্রোডাক্ট, দ্রুত ডেলিভারি পেয়েছি', status: 'অনুমোদিত', date: '১১ মার্চ, ২০২৩' },
  { id: 2, product: 'ওয়্যারলেস হেডফোন', user: 'ফারিয়া রহমান', rating: 2, comment: 'সাউন্ড কোয়ালিটি ভালো না, ব্যাটারি লাইফও কম', status: 'পর্যালোচনা হচ্ছে', date: '১৬ মে, ২০২৩' },
  { id: 3, product: 'শিশুদের খেলনা সেট', user: 'রাকিব হাসান', rating: 4, comment: 'আমার বাচ্চা খুবই পছন্দ করেছে, ভালো প্রোডাক্ট', status: 'অনুমোদিত', date: '২১ জুন, ২০২৩' },
  { id: 4, product: 'আইরন ফ্রাইং প্যান', user: 'সাবরিনা আক্তার', rating: 1, comment: 'খুবই খারাপ প্রোডাক্ট, ২ দিন ব্যবহারের পরেই নষ্ট হয়ে গেছে', status: 'প্রত্যাখ্যাত', date: '১৩ আগস্ট, ২০২৩' },
];

// Product images
const productImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97" },
  { id: 2, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 3, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
];

// Verification documents
const verificationDocs = {
  nidFront: "https://example.com/nid-front.jpg",
  nidBack: "https://example.com/nid-back.jpg",
  tradeLicense: "https://example.com/trade-license.jpg",
  storePhoto: "https://example.com/store.jpg",
  ownerInfo: {
    name: "রহিম উদ্দিন",
    nidNumber: "12345678901",
    address: "বাড়ি #৫, রোড #৭, মোহাম্মদপুর, ঢাকা",
    phone: "01712345678",
    email: "rahim@example.com"
  }
};

const MarketplaceManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('সব');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewingSeller, setViewingSeller] = useState(false);
  const [viewingReview, setViewingReview] = useState(false);
  
  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'সব' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'সব' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleProductAction = (action: string, productId: number) => {
    // In a real app, we would call an API to update the product status
    const product = mockProducts.find(p => p.id === productId);
    
    if (action === 'approve') {
      toast({
        title: "প্রোডাক্ট অনুমোদিত হয়েছে",
        description: `${product?.name} সফলভাবে অনুমোদিত হয়েছে।`,
      });
    } else if (action === 'reject') {
      toast({
        title: "প্রোডাক্ট প্রত্যাখ্যাত হয়েছে",
        description: `${product?.name} প্রত্যাখ্যাত করা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleCategoryAction = (action: string, categoryId: number) => {
    // Handle category actions (edit, delete)
    const category = categories.find(c => c.id === categoryId);
    
    if (action === 'edit') {
      setSelectedCategory(category);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "ক্যাটাগরি মুছে ফেলা হয়েছে",
        description: `${category?.name} ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleSubcategoryAction = (action: string, subcategoryId: number) => {
    // Handle subcategory actions (edit, delete)
    const subcategory = subcategories.find(sc => sc.id === subcategoryId);
    
    if (action === 'edit') {
      setSelectedSubcategory(subcategory);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "সাবক্যাটাগরি মুছে ফেলা হয়েছে",
        description: `${subcategory?.name} সাবক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleOfferAction = (action: string, offerId: number) => {
    // Handle offer actions (edit, delete, activate, deactivate)
    const offer = offers.find(o => o.id === offerId);
    
    if (action === 'edit') {
      setSelectedOffer(offer);
      setEditMode(true);
    } else if (action === 'delete') {
      toast({
        title: "অফার মুছে ফেলা হয়েছে",
        description: `${offer?.name} অফার সফলভাবে মুছে ফেলা হয়েছে।`,
        variant: "destructive",
      });
    } else if (action === 'activate') {
      toast({
        title: "অফার সক্রিয় করা হয়েছে",
        description: `${offer?.name} অফার সক্রিয় করা হয়েছে।`,
      });
    } else if (action === 'deactivate') {
      toast({
        title: "অফার নিষ্ক্রিয় করা হয়েছে",
        description: `${offer?.name} অফার নিষ্ক্রিয় করা হয়েছে।`,
        variant: "warning",
      });
    }
  };

  const handleSellerAction = (action: string, sellerId: number) => {
    // Handle seller actions (view, verify, reject)
    const seller = sellers.find(s => s.id === sellerId);
    
    if (action === 'view') {
      setSelectedSeller(seller);
      setViewingSeller(true);
    } else if (action === 'verify') {
      toast({
        title: "বিক্রেতা যাচাই করা হয়েছে",
        description: `${seller?.name} বিক্রেতা সফলভাবে যাচাই করা হয়েছে।`,
      });
    } else if (action === 'reject') {
      toast({
        title: "বিক্রেতা প্রত্যাখ্যাত হয়েছে",
        description: `${seller?.name} বিক্রেতা প্রত্যাখ্যাত করা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleReviewAction = (action: string, reviewId: number) => {
    // Handle review actions (approve, reject)
    const review = reviews.find(r => r.id === reviewId);
    
    if (action === 'view') {
      setSelectedReview(review);
      setViewingReview(true);
    } else if (action === 'approve') {
      toast({
        title: "রিভিউ অনুমোদিত হয়েছে",
        description: `রিভিউটি সফলভাবে অনুমোদিত হয়েছে।`,
      });
    } else if (action === 'reject') {
      toast({
        title: "রিভিউ প্রত্যাখ্যাত হয়েছে",
        description: `রিভিউটি প্রত্যাখ্যাত করা হয়েছে।`,
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding category would go here
    toast({
      title: "নতুন ক্যাটাগরি যোগ করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding subcategory would go here
    toast({
      title: "নতুন সাবক্যাটাগরি যোগ করা হয়েছে",
      description: "সাবক্যাটাগরি সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding offer would go here
    toast({
      title: "নতুন অফার যোগ করা হয়েছে",
      description: "অফার সফলভাবে যোগ করা হয়েছে।",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস ম্যানেজমেন্ট</h1>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="sellers">বিক্রেতা</TabsTrigger>
          <TabsTrigger value="offers">অফার</TabsTrigger>
          <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
        </TabsList>
        
        {/* প্রোডাক্ট ট্যাব */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="প্রোডাক্ট খুঁজুন"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সকল স্ট্যাটাস</SelectItem>
                      <SelectItem value="অনুমোদিত">অনুমোদিত</SelectItem>
                      <SelectItem value="পর্যালোচনা হচ্ছে">পর্যালোচনা হচ্ছে</SelectItem>
                      <SelectItem value="প্রত্যাখ্যাত">প্রত্যাখ্যাত</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="ক্যাটাগরি ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সকল ক্যাটাগরি</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>প্রোডাক্ট</TableHead>
                      <TableHead>ক্যাটাগরি</TableHead>
                      <TableHead>বিক্রেতা</TableHead>
                      <TableHead>মূল্য</TableHead>
                      <TableHead>স্টক</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{product.category}</div>
                            <div className="text-xs text-muted-foreground">{product.subcategory}</div>
                          </TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant={
                              product.status === 'অনুমোদিত' ? 'default' : 
                              product.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                              'destructive'
                            }>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setViewingDetails(true);
                                }}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              
                              {product.status === 'পর্যালোচনা হচ্ছে' && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleProductAction('approve', product.id)}
                                    className="text-green-600"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleProductAction('reject', product.id)}
                                    className="text-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          কোন প্রোডাক্ট পাওয়া যায়নি
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* প্রোডাক্ট বিস্তারিত মোডাল */}
          <Dialog open={viewingDetails} onOpenChange={setViewingDetails}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>প্রোডাক্ট বিস্তারিত</DialogTitle>
                <DialogDescription>
                  {selectedProduct?.name} এর বিস্তারিত তথ্য।
                </DialogDescription>
              </DialogHeader>
              {selectedProduct && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {productImages.map((img, i) => (
                      <div key={i} className="border rounded overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={`প্রোডাক্ট ইমেজ ${i+1}`} 
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>প্রোডাক্টের নাম</Label>
                      <Input value={selectedProduct.name} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>মূল্য</Label>
                      <Input value={selectedProduct.price} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>ক্যাটাগরি</Label>
                      <Input value={selectedProduct.category} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>সাবক্যাটাগরি</Label>
                      <Input value={selectedProduct.subcategory} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>বিক্রেতা</Label>
                      <Input value={selectedProduct.seller} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>স্টক</Label>
                      <Input value={selectedProduct.stock} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>তালিকাভুক্তির তারিখ</Label>
                      <Input value={selectedProduct.listed} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>রেটিং</Label>
                      <div className="flex items-center mt-2 text-yellow-500">
                        <Star className="fill-yellow-500 h-4 w-4" />
                        <span className="ml-1">{selectedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>বিবরণ</Label>
                    <Textarea 
                      value="এটি একটি উচ্চ মানের প্রোডাক্ট যা দীর্ঘদিন ব্যবহার করা যাবে। এর মান ও কার্যকারিতা অত্যন্ত ভালো।" 
                      readOnly 
                      className="mt-1 h-24"
                    />
                  </div>
                </div>
              )}
              <DialogFooter className="gap-2 sm:gap-0">
                {selectedProduct?.status === 'পর্যালোচনা হচ্ছে' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleProductAction('reject', selectedProduct.id);
                        setViewingDetails(false);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      প্রত্যাখ্যান করুন
                    </Button>
                    <Button
                      onClick={() => {
                        handleProductAction('approve', selectedProduct.id);
                        setViewingDetails(false);
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      অনুমোদন করুন
                    </Button>
                  </>
                )}
                {selectedProduct?.status !== 'পর্যালোচনা হচ্ছে' && (
                  <Button onClick={() => setViewingDetails(false)}>
                    বন্ধ করুন
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* ক্যাটাগরি ট্যাব */}
        <TabsContent value="categories" className="space-y-4">
          <Tabs defaultValue="main-categories">
            <TabsList>
              <TabsTrigger value="main-categories">মূল ক্যাটাগরি</TabsTrigger>
              <TabsTrigger value="subcategories">সাবক্যাটাগরি</TabsTrigger>
            </TabsList>
            
            {/* মূল ক্যাটাগরি ট্যাব */}
            <TabsContent value="main-categories">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">ক্যাটাগরি সমূহ</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        নতুন ক্যাটাগরি
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>নতুন ক্যাটাগরি যোগ করুন</DialogTitle>
                        <DialogDescription>
                          ক্যাটাগরির বিবরণ দিন। ক্যাটাগরি নাম অবশ্যই অনন্য হতে হবে।
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCategory}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category-name" className="text-right">
                              ক্যাটাগরি নাম
                            </Label>
                            <Input
                              id="category-name"
                              placeholder="ক্যাটাগরি নাম লিখুন"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category-icon" className="text-right">
                              আইকন
                            </Label>
                            <div className="col-span-3">
                              <Button variant="outline" className="w-full" type="button">
                                <Upload className="h-4 w-4 mr-2" />
                                আইকন আপলোড করুন
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="category-desc" className="text-right pt-2">
                              বিবরণ
                            </Label>
                            <Textarea
                              id="category-desc"
                              placeholder="ক্যাটাগরির বিবরণ লিখুন"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                              অ্যাকটিভ
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Switch id="category-active" defaultChecked />
                              <Label htmlFor="category-active" className="text-sm font-normal">
                                এই ক্যাটাগরি অ্যাকটিভ রাখুন
                              </Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              বাতিল
                            </Button>
                          </DialogClose>
                          <Button type="submit">সংরক্ষণ করুন</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ক্যাটাগরি নাম</TableHead>
                          <TableHead>সাবক্যাটাগরি</TableHead>
                          <TableHead>প্রোডাক্ট</TableHead>
                          <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.subcategories}</TableCell>
                            <TableCell>{category.products}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleCategoryAction('edit', category.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleCategoryAction('delete', category.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* সাবক্যাটাগরি ট্যাব */}
            <TabsContent value="subcategories">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">সাবক্যাটাগরি সমূহ</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        নতুন সাবক্যাটাগরি
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>নতুন সাবক্যাটাগরি যোগ করুন</DialogTitle>
                        <DialogDescription>
                          সাবক্যাটাগরির বিবরণ দিন। প্রথমে পেরেন্ট ক্যাটাগরি নির্বাচন করুন।
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddSubcategory}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="parent-category" className="text-right">
                              পেরেন্ট ক্যাটাগরি
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="পেরেন্ট ক্যাটাগরি নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.name}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subcategory-name" className="text-right">
                              সাবক্যাটাগরি নাম
                            </Label>
                            <Input
                              id="subcategory-name"
                              placeholder="সাবক্যাটাগরি নাম লিখুন"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subcategory-icon" className="text-right">
                              আইকন
                            </Label>
                            <div className="col-span-3">
                              <Button variant="outline" className="w-full" type="button">
                                <Upload className="h-4 w-4 mr-2" />
                                আইকন আপলোড করুন
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="subcategory-desc" className="text-right pt-2">
                              বিবরণ
                            </Label>
                            <Textarea
                              id="subcategory-desc"
                              placeholder="সাবক্যাটাগরির বিবরণ লিখুন"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                              অ্যাকটিভ
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Switch id="subcategory-active" defaultChecked />
                              <Label htmlFor="subcategory-active" className="text-sm font-normal">
                                এই সাবক্যাটাগরি অ্যাকটিভ রাখুন
                              </Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              বাতিল
                            </Button>
                          </DialogClose>
                          <Button type="submit">সংরক্ষণ করুন</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>সাবক্যাটাগরি নাম</TableHead>
                          <TableHead>পেরেন্ট ক্যাটাগরি</TableHead>
                          <TableHead>প্রোডাক্ট</TableHead>
                          <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subcategories.map((subcategory) => (
                          <TableRow key={subcategory.id}>
                            <TableCell className="font-medium">{subcategory.name}</TableCell>
                            <TableCell>{subcategory.category}</TableCell>
                            <TableCell>{subcategory.products}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleSubcategoryAction('edit', subcategory.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleSubcategoryAction('delete', subcategory.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* বিক্রেতা ট্যাব */}
        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="বিক্রেতা খুঁজুন"
                    className="pl-8"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
                      <SelectItem value="verified">যাচাইকৃত</SelectItem>
                      <SelectItem value="pending">পর্যালোচনা হচ্ছে</SelectItem>
                      <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>বিক্রেতা</TableHead>
                      <TableHead>যোগদানের তারিখ</TableHead>
                      <TableHead>মোট প্রোডাক্ট</TableHead>
                      <TableHead>রেটিং</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell className="font-medium">{seller.name}</TableCell>
                        <TableCell>{seller.since}</TableCell>
                        <TableCell>{seller.products}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="fill-yellow-500 text-yellow-500 h-4 w-4 mr-1" />
                            <span>{seller.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            seller.status === 'যাচাইকৃত' ? 'default' : 
                            seller.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                            'destructive'
                          }>
                            {seller.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSellerAction('view', seller.id)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            
                            {seller.status === 'পর্যালোচনা হচ্ছে' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleSellerAction('verify', seller.id)}
                                  className="text-green-600"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleSellerAction('reject', seller.id)}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* বিক্রেতা ভেরিফিকেশন মোডাল */}
          <Dialog open={viewingSeller} onOpenChange={setViewingSeller}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>বিক্রেতা ভেরিফিকেশন</DialogTitle>
                <DialogDescription>
                  {selectedSeller?.name} এর ভেরিফিকেশন তথ্য পর্যালোচনা করুন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-2">
                    <Label>এনআইডি (সামনে)</Label>
                    <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                      <FileText size={48} className="text-slate-400" />
                    </div>
                  </div>
                  <div className="border rounded-md p-2">
                    <Label>এনআইডি (পিছনে)</Label>
                    <div className="mt-1 bg-slate-100 h-48 flex items-center justify-center">
                      <FileText size={48} className="text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-2">
                  <Label>ট্রেড লাইসেন্স</Label>
                  <div className="mt-1 bg-slate-100 h-32 flex items-center justify-center">
                    <FileText size={48} className="text-slate-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label>মালিকের নাম</Label>
                      <Input value={verificationDocs.ownerInfo.name} readOnly />
                    </div>
                    <div className="space-y-1">
                      <Label>এনআইডি নম্বর</Label>
                      <Input value={verificationDocs.ownerInfo.nidNumber} readOnly />
                    </div>
                    <div className="space-y-1">
                      <Label>ফোন নম্বর</Label>
                      <Input value={verificationDocs.ownerInfo.phone} readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label>ইমেইল</Label>
                      <Input value={verificationDocs.ownerInfo.email} readOnly />
                    </div>
                    <div className="space-y-1">
                      <Label>ঠিকানা</Label>
                      <Textarea value={verificationDocs.ownerInfo.address} readOnly />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    বন্ধ করুন
                  </Button>
                </DialogClose>
                {selectedSeller?.status === 'পর্যালোচনা হচ্ছে' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleSellerAction('reject', selectedSeller.id);
                        setViewingSeller(false);
                      }}
                    >
                      প্রত্যাখ্যান করুন
                    </Button>
                    <Button
                      onClick={() => {
                        handleSellerAction('verify', selectedSeller.id);
                        setViewingSeller(false);
                      }}
                    >
                      যাচাই করুন
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* অফার ট্যাব */}
        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">স্পেশাল অফার</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    নতুন অফার
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>নতুন অফার যোগ করুন</DialogTitle>
                    <DialogDescription>
                      অফারের বিবরণ দিন। অফারের নাম, ডিসকাউন্ট এবং সময়সীমা নির্ধারণ করুন।
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddOffer}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-name" className="text-right">
                          অফারের নাম
                        </Label>
                        <Input
                          id="offer-name"
                          placeholder="অফারের নাম লিখুন"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-discount" className="text-right">
                          ডিসকাউন্ট (%)
                        </Label>
                        <Input
                          id="offer-discount"
                          type="number"
                          placeholder="ডিসকাউন্ট শতাংশ"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-banner" className="text-right">
                          ব্যানার
                        </Label>
                        <div className="col-span-3">
                          <Button variant="outline" className="w-full" type="button">
                            <Upload className="h-4 w-4 mr-2" />
                            ব্যানার আপলোড করুন
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-start" className="text-right">
                          শুরুর তারিখ
                        </Label>
                        <Input
                          id="offer-start"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-end" className="text-right">
                          শেষের তারিখ
                        </Label>
                        <Input
                          id="offer-end"
                          type="date"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="offer-desc" className="text-right pt-2">
                          বিবরণ
                        </Label>
                        <Textarea
                          id="offer-desc"
                          placeholder="অফারের বিবরণ লিখুন"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          বাতিল
                        </Button>
                      </DialogClose>
                      <Button type="submit">সংরক্ষণ করুন</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>অফারের নাম</TableHead>
                      <TableHead>ডিসকাউন্ট</TableHead>
                      <TableHead>সময়সীমা</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>প্রোডাক্ট</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.name}</TableCell>
                        <TableCell>{offer.discount}</TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground">
                            <div>শুরু: {offer.start}</div>
                            <div>শেষ: {offer.end}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            offer.status === 'সক্রিয়' ? 'default' : 
                            offer.status === 'আসন্ন' ? 'warning' : 
                            'outline'
                          }>
                            {offer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{offer.products}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOfferAction('edit', offer.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            {offer.status === 'সক্রিয়' ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOfferAction('deactivate', offer.id)}
                                className="text-amber-600"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            ) : offer.status === 'আসন্ন' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOfferAction('activate', offer.id)}
                                className="text-green-600"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOfferAction('delete', offer.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* রিভিউ ট্যাব */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="রিভিউ খুঁজুন"
                    className="pl-8"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল স্ট্যাটাস</SelectItem>
                      <SelectItem value="approved">অনুমোদিত</SelectItem>
                      <SelectItem value="pending">পর্যালোচনা হচ্ছে</SelectItem>
                      <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="রেটিং ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল রেটিং</SelectItem>
                      <SelectItem value="5">5 স্টার</SelectItem>
                      <SelectItem value="4">4 স্টার</SelectItem>
                      <SelectItem value="3">3 স্টার</SelectItem>
                      <SelectItem value="2">2 স্টার</SelectItem>
                      <SelectItem value="1">1 স্টার</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>প্রোডাক্ট</TableHead>
                      <TableHead>ব্যবহারকারী</TableHead>
                      <TableHead>রেটিং</TableHead>
                      <TableHead>তারিখ</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.product}</TableCell>
                        <TableCell>{review.user}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="fill-yellow-500 text-yellow-500 h-4 w-4 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{review.date}</TableCell>
                        <TableCell>
                          <Badge variant={
                            review.status === 'অনুমোদিত' ? 'default' : 
                            review.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                            'destructive'
                          }>
                            {review.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReviewAction('view', review.id)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            
                            {review.status === 'পর্যালোচনা হচ্ছে' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReviewAction('approve', review.id)}
                                  className="text-green-600"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReviewAction('reject', review.id)}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* রিভিউ বিস্তারিত মোডাল */}
          <Dialog open={viewingReview} onOpenChange={setViewingReview}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>রিভিউ বিস্তারিত</DialogTitle>
                <DialogDescription>
                  {selectedReview?.product} প্রোডাক্টের রিভিউ।
                </DialogDescription>
              </DialogHeader>
              {selectedReview && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedReview.user}</h3>
                      <p className="text-sm text-muted-foreground">{selectedReview.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < selectedReview.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p>{selectedReview.comment}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      selectedReview.status === 'অনুমোদিত' ? 'default' : 
                      selectedReview.status === 'পর্যালোচনা হচ্ছে' ? 'warning' : 
                      'destructive'
                    }>
                      {selectedReview.status}
                    </Badge>
                    
                    {selectedReview.status === 'প্রত্যাখ্যাত' && (
                      <p className="text-sm text-muted-foreground">অশালীন ভাষা ব্যবহারের কারণে প্রত্যাখ্যাত</p>
                    )}
                  </div>
                </div>
              )}
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    বন্ধ করুন
                  </Button>
                </DialogClose>
                {selectedReview?.status === 'পর্যালোচনা হচ্ছে' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleReviewAction('reject', selectedReview.id);
                        setViewingReview(false);
                      }}
                    >
                      প্রত্যাখ্যান করুন
                    </Button>
                    <Button
                      onClick={() => {
                        handleReviewAction('approve', selectedReview.id);
                        setViewingReview(false);
                      }}
                    >
                      অনুমোদন করুন
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceManagement;
