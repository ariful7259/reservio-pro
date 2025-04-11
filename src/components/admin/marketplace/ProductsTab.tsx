
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { 
  Filter, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star,
  EyeIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

// Mock categories for filter
const categories = [
  { id: 1, name: 'ইলেকট্রনিক্স', subcategories: 25, products: 450 },
  { id: 2, name: 'ফ্যাশন', subcategories: 18, products: 380 },
  { id: 3, name: 'হোম অ্যাপ্লায়েন্স', subcategories: 12, products: 245 },
  { id: 4, name: 'শিশুদের', subcategories: 8, products: 120 },
  { id: 5, name: 'স্পোর্টস', subcategories: 10, products: 95 },
];

// Product images
const productImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97" },
  { id: 2, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 3, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
];

const ProductsTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('সব');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewingDetails, setViewingDetails] = useState(false);

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

  return (
    <>
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
    </>
  );
};

export default ProductsTab;
