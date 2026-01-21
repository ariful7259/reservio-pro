import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSellerProfile } from '@/hooks/useSellerProfile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUploader from './ImageUploader';
import ProductBulkImportExportDialog from './ProductBulkImportExportDialog';
import { 
  Plus, 
  Package, 
  Pencil, 
  Trash2, 
  Loader2,
  ImagePlus,
  X,
  Upload,
  Link as LinkIcon,
  Eye,
  ExternalLink
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[] | null;
  category: string | null;
  stock: number | null;
  created_at: string | null;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  images: string[];
}

const defaultFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  images: []
};

const categories = [
  'ইলেকট্রনিক্স',
  'ফ্যাশন',
  'হোম & লিভিং',
  'বিউটি & হেলথ',
  'খাবার',
  'বই',
  'খেলনা',
  'অন্যান্য'
];

const ProductManager = () => {
  const { user } = useAuth();
  const { profile } = useSellerProfile();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [imageUrl, setImageUrl] = useState('');
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock' | 'outOfStock'>('all');
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);

  // Get store slug for preview
  const storeSlug = React.useMemo(() => {
    if (profile?.marketplace_settings) {
      const settings = profile.marketplace_settings as any;
      return settings.storeSlug || profile.business_name?.toLowerCase().replace(/\s+/g, '-') || '';
    }
    return profile?.business_name?.toLowerCase().replace(/\s+/g, '-') || '';
  }, [profile]);

  const handlePreviewStore = () => {
    if (storeSlug) {
      window.open(`/store/${storeSlug}`, '_blank');
    } else {
      toast({
        title: "স্টোর সেটআপ প্রয়োজন",
        description: "প্রথমে স্টোর সেটিংস থেকে স্টোর তৈরি করুন।",
        variant: "destructive"
      });
    }
  };
  // Fetch products
  const fetchProducts = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "প্রোডাক্ট লোড করতে সমস্যা",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user?.id]);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category || '',
        stock: product.stock?.toString() || '',
        images: product.images || []
      });
    } else {
      setEditingProduct(null);
      setFormData(defaultFormData);
    }
    setIsDialogOpen(true);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    if (!formData.name.trim() || !formData.price) {
      toast({
        title: "ফর্ম অসম্পূর্ণ",
        description: "নাম এবং মূল্য দিতে হবে",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        category: formData.category || null,
        stock: formData.stock ? parseInt(formData.stock) : null,
        images: formData.images.length > 0 ? formData.images : null,
        created_by: user.id
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast({ title: "প্রোডাক্ট আপডেট হয়েছে!" });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast({ title: "নতুন প্রোডাক্ট যোগ হয়েছে!" });
      }

      setIsDialogOpen(false);
      setFormData(defaultFormData);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: "সমস্যা হয়েছে",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('আপনি কি এই প্রোডাক্টটি মুছতে চান?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      toast({ title: "প্রোডাক্ট মুছে ফেলা হয়েছে" });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "মুছতে সমস্যা",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Get unique categories from products
  const productCategories = React.useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean) as string[];
    return [...new Set(cats)];
  }, [products]);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      // Stock filter
      let matchesStock = true;
      if (stockFilter === 'inStock') {
        matchesStock = (product.stock || 0) > 10;
      } else if (stockFilter === 'lowStock') {
        matchesStock = (product.stock || 0) > 0 && (product.stock || 0) <= 10;
      } else if (stockFilter === 'outOfStock') {
        matchesStock = (product.stock || 0) === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <Skeleton className="h-40 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">প্রোডাক্ট ম্যানেজমেন্ট</h2>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length === products.length 
              ? `মোট ${products.length} টি প্রোডাক্ট`
              : `${filteredProducts.length} / ${products.length} টি প্রোডাক্ট`
            }
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Store Preview Button */}
          <Button 
            variant="outline" 
            onClick={handlePreviewStore}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            স্টোর প্রিভিউ
            <ExternalLink className="h-3 w-3" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsBulkDialogOpen(true)}
            className="gap-2"
            disabled={!user?.id}
          >
            <Upload className="h-4 w-4" />
            বাল্ক ইমপোর্ট/এক্সপোর্ট
          </Button>

          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            নতুন প্রোডাক্ট
          </Button>
          
        </div>
      </div>

      {user?.id && (
        <ProductBulkImportExportDialog
          open={isBulkDialogOpen}
          onOpenChange={setIsBulkDialogOpen}
          userId={user.id}
          products={products}
          onImported={() => fetchProducts()}
        />
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="প্রোডাক্ট নাম দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="সব ক্যাটাগরি" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
            {productCategories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={(v) => setStockFilter(v as any)}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="স্টক ফিল্টার" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব স্টক</SelectItem>
            <SelectItem value="inStock">স্টকে আছে (১০+)</SelectItem>
            <SelectItem value="lowStock">কম স্টক (১-১০)</SelectItem>
            <SelectItem value="outOfStock">স্টক শেষ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(searchQuery || categoryFilter !== 'all' || stockFilter !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">ফিল্টার:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categoryFilter}
              <button onClick={() => setCategoryFilter('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {stockFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {stockFilter === 'inStock' ? 'স্টকে আছে' : stockFilter === 'lowStock' ? 'কম স্টক' : 'স্টক শেষ'}
              <button onClick={() => setStockFilter('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStockFilter('all');
            }}
          >
            সব ফিল্টার মুছুন
          </Button>
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যোগ করুন'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">প্রোডাক্টের নাম *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="প্রোডাক্টের নাম লিখুন"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">বিবরণ</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="প্রোডাক্টের বিবরণ লিখুন"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">মূল্য (৳) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">স্টক</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>ক্যাটাগরি</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ছবি</Label>
                <Tabs value={imageInputMode} onValueChange={(v) => setImageInputMode(v as 'upload' | 'url')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      আপলোড
                    </TabsTrigger>
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      URL
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-3">
                    <ImageUploader
                      images={formData.images}
                      onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                      maxImages={5}
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-3 space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="ছবির URL দিন"
                      />
                      <Button type="button" variant="outline" onClick={handleAddImage}>
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={img} 
                              alt={`Image ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      সেভ হচ্ছে...
                    </>
                  ) : (
                    editingProduct ? 'আপডেট করুন' : 'যোগ করুন'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  বাতিল
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">কোনো প্রোডাক্ট নেই</h3>
            <p className="text-sm text-muted-foreground mb-4">
              আপনার স্টোরে প্রোডাক্ট যোগ করুন
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              প্রথম প্রোডাক্ট যোগ করুন
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                {product.stock !== null && product.stock <= 0 && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    স্টক শেষ
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    {product.category && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        {product.category}
                      </Badge>
                    )}
                  </div>
                  <p className="font-bold text-primary shrink-0 ml-2">
                    {formatPrice(product.price)}
                  </p>
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    স্টক: {product.stock ?? 'N/A'}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;