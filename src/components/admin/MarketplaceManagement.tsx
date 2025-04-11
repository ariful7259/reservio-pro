
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
import { 
  Input 
} from '@/components/ui/input';
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
  Layers,
  Star,
  Percent,
  UserCheck,
  AlertTriangle,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Textarea } from '@/components/ui/textarea';

// Mock data - products
const products = [
  { 
    id: 1, 
    name: 'স্মার্টফোন প্রো ম্যাক্স', 
    seller: 'গ্যাজেট ওয়ার্ল্ড', 
    category: 'ইলেকট্রনিক্স', 
    price: '৳৪৫,০০০', 
    stock: 25, 
    status: 'পেন্ডিং',
    date: '১৮ জুলাই, ২০২৩',
    image: '/placeholder.svg',
  },
  { 
    id: 2, 
    name: 'লেদার ল্যাপটপ ব্যাগ', 
    seller: 'ফ্যাশন হাব', 
    category: 'ফ্যাশন', 
    price: '৳২,৮০০', 
    stock: 15, 
    status: 'অনুমোদিত',
    date: '২৫ জুন, ২০২৩',
    image: '/placeholder.svg',
  },
  { 
    id: 3, 
    name: 'ওয়্যারলেস হেডফোন', 
    seller: 'সাউন্ড মাস্টার', 
    category: 'ইলেকট্রনিক্স', 
    price: '৳৩,৫০০', 
    stock: 30, 
    status: 'অনুমোদিত',
    date: '১০ জুন, ২০২৩',
    image: '/placeholder.svg',
  },
  { 
    id: 4, 
    name: 'চামড়ার বেল্ট', 
    seller: 'ফ্যাশন হাব', 
    category: 'ফ্যাশন', 
    price: '৳৮৫০', 
    stock: 40, 
    status: 'বাতিল',
    date: '০৫ জুলাই, ২০২৩',
    image: '/placeholder.svg',
  },
  { 
    id: 5, 
    name: 'স্মার্ট ওয়াচ প্রো', 
    seller: 'গ্যাজেট ওয়ার্ল্ড', 
    category: 'ইলেকট্রনিক্স', 
    price: '৳১২,০০০', 
    stock: 10, 
    status: 'পেন্ডিং',
    date: '০১ আগস্ট, ২০২৩',
    image: '/placeholder.svg',
  },
];

// Mock data - categories
const categories = [
  { 
    id: 1, 
    name: 'ইলেকট্রনিক্স', 
    slug: 'electronics', 
    totalProducts: 425, 
    subcategories: ['স্মার্টফোন', 'ল্যাপটপ', 'অডিও'], 
    icon: 'smartphone'
  },
  { 
    id: 2, 
    name: 'ফ্যাশন', 
    slug: 'fashion', 
    totalProducts: 320, 
    subcategories: ['পুরুষদের', 'মহিলাদের', 'শিশুদের'], 
    icon: 'shirt'
  },
  { 
    id: 3, 
    name: 'হোম অ্যাপ্লায়েন্স', 
    slug: 'home-appliances', 
    totalProducts: 150, 
    subcategories: ['কিচেন', 'ওয়াশিং', 'এসি'], 
    icon: 'home'
  },
  { 
    id: 4, 
    name: 'কসমেটিক্স', 
    slug: 'cosmetics', 
    totalProducts: 210, 
    subcategories: ['মেকআপ', 'স্কিন কেয়ার', 'হেয়ার কেয়ার'], 
    icon: 'sparkles'
  },
  { 
    id: 5, 
    name: 'বইপত্র', 
    slug: 'books', 
    totalProducts: 180, 
    subcategories: ['বাংলা', 'ইংরেজি', 'অনুবাদ'], 
    icon: 'book'
  },
];

// Mock data - sellers
const sellers = [
  { 
    id: 1, 
    name: 'গ্যাজেট ওয়ার্ল্ড', 
    owner: 'আরিফ খান', 
    phone: '01712345678', 
    location: 'ঢাকা', 
    status: 'যাচাইকৃত', 
    products: 45, 
    rating: 4.8
  },
  { 
    id: 2, 
    name: 'ফ্যাশন হাব', 
    owner: 'সাবরিনা আক্তার', 
    phone: '01812345678', 
    location: 'চট্টগ্রাম', 
    status: 'পেন্ডিং', 
    products: 32, 
    rating: 4.5
  },
  { 
    id: 3, 
    name: 'সাউন্ড মাস্টার', 
    owner: 'রাকিব হাসান', 
    phone: '01912345678', 
    location: 'ঢাকা', 
    status: 'যাচাইকৃত', 
    products: 28, 
    rating: 4.7
  },
  { 
    id: 4, 
    name: 'হোম ডেকর', 
    owner: 'নাসিমা বেগম', 
    phone: '01612345678', 
    location: 'খুলনা', 
    status: 'অযাচাইকৃত', 
    products: 15, 
    rating: 3.9
  },
  { 
    id: 5, 
    name: 'বুক হাউস', 
    owner: 'মাহমুদুল হাসান', 
    phone: '01512345678', 
    location: 'রাজশাহী', 
    status: 'যাচাইকৃত', 
    products: 56, 
    rating: 4.2
  },
];

// Mock data - offers
const offers = [
  { 
    id: 1, 
    title: 'ইলেকট্রনিক্স সেল', 
    discount: '২০%', 
    startDate: '১৫ জুলাই, ২০২৩', 
    endDate: '৩০ জুলাই, ২০২৩', 
    status: 'চলমান',
    categories: ['ইলেকট্রনিক্স'],
    totalProducts: 45
  },
  { 
    id: 2, 
    title: 'ফ্যাশন উইক', 
    discount: '২৫%', 
    startDate: '০১ আগস্ট, ২০২৩', 
    endDate: '০৭ আগস্ট, ২০২৩', 
    status: 'আসন্ন',
    categories: ['ফ্যাশন'],
    totalProducts: 78
  },
  { 
    id: 3, 
    title: 'বই মেলা', 
    discount: '১৫%', 
    startDate: '১০ জুন, ২০২৩', 
    endDate: '২০ জুন, ২০২৩', 
    status: 'সম্পন্ন',
    categories: ['বইপত্র'],
    totalProducts: 35
  },
  { 
    id: 4, 
    title: 'ফ্লাশ সেল', 
    discount: '৩০%', 
    startDate: '২৫ জুলাই, ২০২৩', 
    endDate: '২৬ জুলাই, ২০২৩', 
    status: 'সম্পন্ন',
    categories: ['ইলেকট্রনিক্স', 'হোম অ্যাপ্লায়েন্স'],
    totalProducts: 25
  },
];

// Mock data - reviews
const reviews = [
  { 
    id: 1, 
    product: 'স্মার্টফোন প্রো ম্যাক্স', 
    customer: 'আব্দুল্লাহ খান', 
    rating: 4, 
    comment: 'দারুণ প্রোডাক্ট, ভালো ব্যাটারি লাইফ এবং ক্যামেরা।', 
    date: '১৮ জুলাই, ২০২৩', 
    status: 'অনুমোদিত'
  },
  { 
    id: 2, 
    product: 'লেদার ল্যাপটপ ব্যাগ', 
    customer: 'ফারিয়া রহমান', 
    rating: 5, 
    comment: 'খুব ভালো কোয়ালিটির ব্যাগ। আমি সন্তুষ্ট।', 
    date: '২৫ জুন, ২০২৩', 
    status: 'অনুমোদিত'
  },
  { 
    id: 3, 
    product: 'ওয়্যারলেস হেডফোন', 
    customer: 'রাকিব হাসান', 
    rating: 2, 
    comment: 'সাউন্ড কোয়ালিটি ভালো নয়, ব্যাটারি দ্রুত শেষ হয়ে যায়।', 
    date: '১০ জুন, ২০২৩', 
    status: 'পেন্ডিং'
  },
  { 
    id: 4, 
    product: 'স্মার্ট ওয়াচ প্রো', 
    customer: 'সাবরিনা আক্তার', 
    rating: 3, 
    comment: 'ভালো ফিচারস আছে কিন্তু ব্যাটারি লাইফ ভালো নয়।', 
    date: '০১ আগস্ট, ২০২৩', 
    status: 'পেন্ডিং'
  },
  { 
    id: 5, 
    product: 'চামড়ার বেল্ট', 
    customer: 'মাহফুজুর রহমান', 
    rating: 1, 
    comment: 'আসল চামড়া নয়, একদম খারাপ কোয়ালিটি।', 
    date: '০৫ জুলাই, ২০২৩', 
    status: 'বাতিল'
  },
];

const MarketplaceManagement = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [statusFilter, setStatusFilter] = useState('সব');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [viewModeEdit, setViewModeEdit] = useState(false);

  // Filter products based on search term, category, and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'সব' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'সব' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApproveProduct = (productId: number) => {
    toast({
      title: "প্রোডাক্ট অনুমোদিত হয়েছে",
      description: "প্রোডাক্টটি সফলভাবে অনুমোদিত হয়েছে এবং মার্কেটপ্লেসে প্রদর্শিত হবে।",
    });
  };

  const handleRejectProduct = (productId: number) => {
    toast({
      title: "প্রোডাক্ট বাতিল করা হয়েছে",
      description: "প্রোডাক্টটি বাতিল করা হয়েছে।",
      variant: "destructive",
    });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "নতুন ক্যাটাগরি যোগ করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "ক্যাটাগরি আপডেট করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    toast({
      title: "ক্যাটাগরি ডিলিট করা হয়েছে",
      description: "ক্যাটাগরি সফলভাবে ডিলিট করা হয়েছে।",
      variant: "destructive",
    });
  };

  const handleVerifySeller = (sellerId: number) => {
    toast({
      title: "বিক্রেতা যাচাইকরণ সম্পন্ন",
      description: "বিক্রেতা সফলভাবে যাচাইকৃত হয়েছে।",
    });
  };

  const handleRejectSeller = (sellerId: number) => {
    toast({
      title: "বিক্রেতা যাচাইকরণ বাতিল",
      description: "বিক্রেতার যাচাইকরণ বাতিল করা হয়েছে।",
      variant: "destructive",
    });
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "নতুন অফার যোগ করা হয়েছে",
      description: "অফার সফলভাবে যোগ করা হয়েছে।",
    });
  };

  const handleApproveReview = (reviewId: number) => {
    toast({
      title: "রিভিউ অনুমোদিত হয়েছে",
      description: "রিভিউটি সফলভাবে অনুমোদিত হয়েছে।",
    });
  };

  const handleRejectReview = (reviewId: number) => {
    toast({
      title: "রিভিউ বাতিল করা হয়েছে",
      description: "রিভিউটি সাইটে প্রদর্শিত হবে না।",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস ম্যানেজমেন্ট</h1>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">প্রোডাক্টস</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="sellers">বিক্রেতা</TabsTrigger>
          <TabsTrigger value="offers">স্পেশাল অফার</TabsTrigger>
          <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
        </TabsList>
        
        {/* প্রোডাক্ট অ্যাপ্রুভাল ম্যানেজমেন্ট ইন্টারফেস */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="প্রোডাক্ট বা বিক্রেতা খুঁজুন"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="ক্যাটাগরি" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সব ক্যাটাগরি</SelectItem>
                      <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                      <SelectItem value="ফ্যাশন">ফ্যাশন</SelectItem>
                      <SelectItem value="হোম অ্যাপ্লায়েন্স">হোম অ্যাপ্লায়েন্স</SelectItem>
                      <SelectItem value="কসমেটিক্স">কসমেটিক্স</SelectItem>
                      <SelectItem value="বইপত্র">বইপত্র</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সব">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="পেন্ডিং">পেন্ডিং</SelectItem>
                      <SelectItem value="অনুমোদিত">অনুমোদিত</SelectItem>
                      <SelectItem value="বাতিল">বাতিল</SelectItem>
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
                      <TableHead className="w-[80px]">ছবি</TableHead>
                      <TableHead>প্রোডাক্ট</TableHead>
                      <TableHead>বিক্রেতা</TableHead>
                      <TableHead>ক্যাটাগরি</TableHead>
                      <TableHead>মূল্য</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead className="text-right">অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                            <div className="text-xs text-muted-foreground">স্টক: {product.stock}</div>
                          </TableCell>
                          <TableCell>{product.seller}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <Badge variant={
                              product.status === 'অনুমোদিত' ? 'success' : 
                              product.status === 'পেন্ডিং' ? 'warning' : 
                              'destructive'
                            }>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => setSelectedProduct(product)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>প্রোডাক্ট বিবরণ</DialogTitle>
                                    <DialogDescription>
                                      প্রোডাক্টের বিস্তারিত তথ্য দেখুন এবং অনুমোদন দিন বা বাতিল করুন।
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedProduct && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-1">
                                          <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center overflow-hidden">
                                            <img src={selectedProduct.image} alt={selectedProduct.name} className="max-w-full max-h-full object-contain" />
                                          </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-3">
                                          <div>
                                            <Label>প্রোডাক্টের নাম</Label>
                                            <div className="font-medium text-lg">{selectedProduct.name}</div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-3">
                                            <div>
                                              <Label>বিক্রেতা</Label>
                                              <div>{selectedProduct.seller}</div>
                                            </div>
                                            <div>
                                              <Label>ক্যাটাগরি</Label>
                                              <div>{selectedProduct.category}</div>
                                            </div>
                                            <div>
                                              <Label>মূল্য</Label>
                                              <div className="font-semibold">{selectedProduct.price}</div>
                                            </div>
                                            <div>
                                              <Label>স্টক</Label>
                                              <div>{selectedProduct.stock} পিস</div>
                                            </div>
                                          </div>
                                          <div>
                                            <Label>স্ট্যাটাস</Label>
                                            <div>
                                              <Badge variant={
                                                selectedProduct.status === 'অনুমোদিত' ? 'success' : 
                                                selectedProduct.status === 'পেন্ডিং' ? 'warning' : 
                                                'destructive'
                                              }>
                                                {selectedProduct.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <Label>প্রোডাক্ট বিবরণ</Label>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                                          <p>এই {selectedProduct.name} অত্যন্ত উন্নত মানের এবং টেকসই। সর্বোচ্চ কোয়ালিটি নিশ্চিত করে তৈরি করা হয়েছে।</p>
                                          <ul className="list-disc ml-5 mt-2">
                                            <li>উন্নত মানের উপকরণ</li>
                                            <li>দীর্ঘস্থায়ী ব্যাটারি</li>
                                            <li>১ বছরের ওয়্যারেন্টি</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter className="gap-2 sm:gap-0">
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleRejectProduct(selectedProduct?.id)}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      বাতিল করুন
                                    </Button>
                                    
                                    <Button
                                      onClick={() => handleApproveProduct(selectedProduct?.id)}
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      অনুমোদন করুন
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              {product.status === 'পেন্ডিং' && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-red-500"
                                    onClick={() => handleRejectProduct(product.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-green-500"
                                    onClick={() => handleApproveProduct(product.id)}
                                  >
                                    <Check className="h-4 w-4" />
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
        </TabsContent>
        
        {/* ক্যাটাগরি ও সাবক্যাটাগরি ম্যানেজমেন্ট ফর্ম */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>ক্যাটাগরি ম্যানেজমেন্ট</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      নতুন ক্যাটাগরি
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>নতুন ক্যাটাগরি যোগ করুন</DialogTitle>
                      <DialogDescription>
                        ক্যাটাগরির বিবরণ দিন। প্রয়োজনীয় সকল তথ্য পূরণ করুন।
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddCategory}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category-name" className="text-right">
                            ক্যাটাগরি নাম
                          </Label>
                          <Input id="category-name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category-slug" className="text-right">
                            স্লাগ
                          </Label>
                          <Input id="category-slug" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category-icon" className="text-right">
                            আইকন
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="আইকন নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="smartphone">স্মার্টফোন</SelectItem>
                              <SelectItem value="laptop">ল্যাপটপ</SelectItem>
                              <SelectItem value="shirt">শার্ট</SelectItem>
                              <SelectItem value="home">হোম</SelectItem>
                              <SelectItem value="book">বই</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="subcategories" className="text-right pt-2">
                            সাবক্যাটাগরি
                          </Label>
                          <div className="col-span-3 space-y-2">
                            <div className="flex gap-2">
                              <Input placeholder="সাবক্যাটাগরি" />
                              <Button type="button" size="sm" variant="ghost">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge className="flex items-center gap-1">
                                সাবক্যাটাগরি ১
                                <X className="h-3 w-3 cursor-pointer" />
                              </Badge>
                              <Badge className="flex items-center gap-1">
                                সাবক্যাটাগরি ২
                                <X className="h-3 w-3 cursor-pointer" />
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right pt-2">
                            বিবরণ
                          </Label>
                          <Textarea id="description" className="col-span-3" rows={3} />
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">আইডি</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead>মোট পণ্য</TableHead>
                    <TableHead>সাবক্যাটাগরি</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                            <Layers className="h-4 w-4 text-primary" />
                          </div>
                          <span>{category.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{category.totalProducts}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.map((sub, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setViewModeEdit(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>ক্যাটাগরি সম্পাদনা</DialogTitle>
                                <DialogDescription>
                                  ক্যাটাগরির তথ্য সম্পাদনা করুন।
                                </DialogDescription>
                              </DialogHeader>
                              {selectedCategory && (
                                <form onSubmit={handleEditCategory}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-name" className="text-right">
                                        ক্যাটাগরি নাম
                                      </Label>
                                      <Input 
                                        id="edit-name" 
                                        className="col-span-3" 
                                        defaultValue={selectedCategory.name}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-slug" className="text-right">
                                        স্লাগ
                                      </Label>
                                      <Input 
                                        id="edit-slug" 
                                        className="col-span-3"
                                        defaultValue={selectedCategory.slug}
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-icon" className="text-right">
                                        আইকন
                                      </Label>
                                      <Select defaultValue={selectedCategory.icon}>
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="আইকন নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="smartphone">স্মার্টফোন</SelectItem>
                                          <SelectItem value="laptop">ল্যাপটপ</SelectItem>
                                          <SelectItem value="shirt">শার্ট</SelectItem>
                                          <SelectItem value="home">হোম</SelectItem>
                                          <SelectItem value="book">বই</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <Label htmlFor="edit-subcategories" className="text-right pt-2">
                                        সাবক্যাটাগরি
                                      </Label>
                                      <div className="col-span-3 space-y-2">
                                        <div className="flex gap-2">
                                          <Input placeholder="সাবক্যাটাগরি" />
                                          <Button type="button" size="sm" variant="ghost">
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {selectedCategory.subcategories.map((sub: string, idx: number) => (
                                            <Badge key={idx} className="flex items-center gap-1">
                                              {sub}
                                              <X className="h-3 w-3 cursor-pointer" />
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">
                                        বাতিল
                                      </Button>
                                    </DialogClose>
                                    <Button type="submit">আপডেট করুন</Button>
                                  </DialogFooter>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>ক্যাটাগরি ডিলিট</DialogTitle>
                                <DialogDescription>
                                  আপনি কি নিশ্চিতভাবে এই ক্যাটাগরি ডিলিট করতে চান? এর সাথে সম্পর্কিত সকল প্রোডাক্ট অবর্গীকৃত হবে।
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    বাতিল
                                  </Button>
                                </DialogClose>
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  ডিলিট করুন
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* বিক্রেতা ভেরিফিকেশন ইন্টারফেস */}
        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>বিক্রেতা ম্যানেজমেন্ট</span>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব</SelectItem>
                      <SelectItem value="verified">যাচাইকৃত</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="rejected">বাতিল</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative w-[180px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="বিক্রেতা খুঁজুন" className="pl-8 h-9" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>বিক্রেতা</TableHead>
                    <TableHead>মালিক</TableHead>
                    <TableHead>যোগাযোগ</TableHead>
                    <TableHead>প্রোডাক্ট</TableHead>
                    <TableHead>রেটিং</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-primary" />
                          </div>
                          <span>{seller.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{seller.owner}</TableCell>
                      <TableCell>
                        <div>{seller.phone}</div>
                        <div className="text-xs text-muted-foreground">{seller.location}</div>
                      </TableCell>
                      <TableCell>{seller.products}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
                          <span>{seller.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          seller.status === 'যাচাইকৃত' ? 'success' : 
                          seller.status === 'পেন্ডিং' ? 'warning' : 
                          'destructive'
                        }>
                          {seller.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSelectedSeller(seller)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>বিক্রেতা বিবরণ</DialogTitle>
                                <DialogDescription>
                                  বিক্রেতার বিস্তারিত তথ্য দেখুন ও যাচাই করুন।
                                </DialogDescription>
                              </DialogHeader>
                              {selectedSeller && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                      <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center">
                                        <ShoppingBag className="h-16 w-16 text-gray-400" />
                                      </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                      <div>
                                        <Label>দোকানের নাম</Label>
                                        <div className="font-medium text-lg">{selectedSeller.name}</div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <Label>মালিকের নাম</Label>
                                          <div>{selectedSeller.owner}</div>
                                        </div>
                                        <div>
                                          <Label>লোকেশন</Label>
                                          <div>{selectedSeller.location}</div>
                                        </div>
                                        <div>
                                          <Label>যোগাযোগ</Label>
                                          <div>{selectedSeller.phone}</div>
                                        </div>
                                        <div>
                                          <Label>প্রোডাক্ট</Label>
                                          <div>{selectedSeller.products} টি</div>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>স্ট্যাটাস</Label>
                                        <div>
                                          <Badge variant={
                                            selectedSeller.status === 'যাচাইকৃত' ? 'success' : 
                                            selectedSeller.status === 'পেন্ডিং' ? 'warning' : 
                                            'destructive'
                                          }>
                                            {selectedSeller.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label>ডকুমেন্টস</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                                      <div className="border p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                          <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                          <span>ট্রেড লাইসেন্স</span>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4 mr-1" />
                                          দেখুন
                                        </Button>
                                      </div>
                                      <div className="border p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                          <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                          <span>আইডি কার্ড</span>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4 mr-1" />
                                          দেখুন
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label>নোট</Label>
                                    <Textarea placeholder="বিক্রেতা সম্পর্কে নোট লিখুন..." />
                                  </div>
                                </div>
                              )}
                              {selectedSeller && selectedSeller.status === 'পেন্ডিং' && (
                                <DialogFooter className="gap-2 sm:gap-0">
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleRejectSeller(selectedSeller.id)}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    বাতিল করুন
                                  </Button>
                                  
                                  <Button
                                    onClick={() => handleVerifySeller(selectedSeller.id)}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    যাচাই করুন
                                  </Button>
                                </DialogFooter>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {seller.status === 'পেন্ডিং' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500"
                                onClick={() => handleRejectSeller(seller.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-green-500"
                                onClick={() => handleVerifySeller(seller.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* স্পেশাল অফার ম্যানেজমেন্ট */}
        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>স্পেশাল অফার ম্যানেজমেন্ট</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      নতুন অফার
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>নতুন অফার তৈরি করুন</DialogTitle>
                      <DialogDescription>
                        স্পেশাল অফারের বিবরণ দিন। প্রয়োজনীয় সকল তথ্য পূরণ করুন।
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddOffer}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="offer-title" className="text-right">
                            অফারের নাম
                          </Label>
                          <Input id="offer-title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="discount" className="text-right">
                            ডিসকাউন্ট
                          </Label>
                          <Input id="discount" className="col-span-3" placeholder="উদাহরণ: 20%" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="start-date" className="text-right">
                            শুরুর তারিখ
                          </Label>
                          <Input id="start-date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="end-date" className="text-right">
                            শেষের তারিখ
                          </Label>
                          <Input id="end-date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="categories" className="text-right pt-2">
                            ক্যাটাগরি
                          </Label>
                          <div className="col-span-3 space-y-2">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="electronics">ইলেকট্রনিক্স</SelectItem>
                                <SelectItem value="fashion">ফ্যাশন</SelectItem>
                                <SelectItem value="home">হোম অ্যাপ্লায়েন্স</SelectItem>
                                <SelectItem value="cosmetics">কসমেটিক্স</SelectItem>
                                <SelectItem value="books">বইপত্র</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge className="flex items-center gap-1">
                                ইলেকট্রনিক্স
                                <X className="h-3 w-3 cursor-pointer" />
                              </Badge>
                              <Badge className="flex items-center gap-1">
                                ফ্যাশন
                                <X className="h-3 w-3 cursor-pointer" />
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right pt-2">
                            বিবরণ
                          </Label>
                          <Textarea id="description" className="col-span-3" rows={3} />
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>অফার</TableHead>
                    <TableHead>ডিসকাউন্ট</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead>প্রোডাক্ট</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                            <Percent className="h-4 w-4 text-rose-600" />
                          </div>
                          <span>{offer.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-rose-600">{offer.discount}</TableCell>
                      <TableCell>
                        <div className="text-xs">শুরু: {offer.startDate}</div>
                        <div className="text-xs">শেষ: {offer.endDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {offer.categories.map((category, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{offer.totalProducts}</TableCell>
                      <TableCell>
                        <Badge variant={
                          offer.status === 'চলমান' ? 'success' : 
                          offer.status === 'আসন্ন' ? 'warning' : 
                          'outline'
                        }>
                          {offer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* প্রোডাক্ট রিভিউ মডারেশন সিস্টেম */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>রিভিউ মডারেশন</span>
                <div className="flex items-center gap-2">
                  <Select defaultValue="pending">
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="approved">অনুমোদিত</SelectItem>
                      <SelectItem value="rejected">বাতিল</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative w-[180px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="প্রোডাক্ট খুঁজুন" className="pl-8 h-9" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="border rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>প্রোডাক্ট</TableHead>
                    <TableHead>গ্রাহক</TableHead>
                    <TableHead>রেটিং</TableHead>
                    <TableHead>কমেন্ট</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.product}</TableCell>
                      <TableCell>{review.customer}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={review.comment}>
                          {review.comment}
                        </div>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          review.status === 'অনুমোদিত' ? 'success' : 
                          review.status === 'পেন্ডিং' ? 'warning' : 
                          'destructive'
                        }>
                          {review.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSelectedReview(review)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>রিভিউ পর্যালোচনা</DialogTitle>
                                <DialogDescription>
                                  গ্রাহকের রিভিউ সম্পর্কে মডারেশন সিদ্ধান্ত নিন।
                                </DialogDescription>
                              </DialogHeader>
                              {selectedReview && (
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <Label>প্রোডাক্ট</Label>
                                    <div className="font-medium">{selectedReview.product}</div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label>গ্রাহক</Label>
                                    <div>{selectedReview.customer}</div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label>রেটিং</Label>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                          key={star} 
                                          className={`h-5 w-5 ${
                                            star <= selectedReview.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                      <span className="ml-2 font-medium">{selectedReview.rating}/5</span>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label>কমেন্ট</Label>
                                    <div className="p-3 bg-gray-50 rounded-md">
                                      {selectedReview.comment}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label>জমা দেওয়ার তারিখ</Label>
                                    <div>{selectedReview.date}</div>
                                  </div>
                                  <div className="space-y-1">
                                    <Label>স্ট্যাটাস</Label>
                                    <Badge variant={
                                      selectedReview.status === 'অনুমোদিত' ? 'success' : 
                                      selectedReview.status === 'পেন্ডিং' ? 'warning' : 
                                      'destructive'
                                    }>
                                      {selectedReview.status}
                                    </Badge>
                                  </div>
                                  
                                  {selectedReview.status === 'পেন্ডিং' && (
                                    <div className="space-y-1">
                                      <Label>মন্তব্য</Label>
                                      <Textarea placeholder="এই রিভিউ সম্পর্কে আপনার মন্তব্য লিখুন..." />
                                    </div>
                                  )}
                                </div>
                              )}
                              {selectedReview && selectedReview.status === 'পেন্ডিং' && (
                                <DialogFooter className="gap-2 sm:gap-0">
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleRejectReview(selectedReview.id)}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    বাতিল করুন
                                  </Button>
                                  
                                  <Button
                                    onClick={() => handleApproveReview(selectedReview.id)}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    অনুমোদন করুন
                                  </Button>
                                </DialogFooter>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {review.status === 'পেন্ডিং' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500"
                                onClick={() => handleRejectReview(review.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-green-500"
                                onClick={() => handleApproveReview(review.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceManagement;
