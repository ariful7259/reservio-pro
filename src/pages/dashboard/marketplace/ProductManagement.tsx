
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown,
  Filter,
  Upload,
  X,
  Eye,
  Copy,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, "পণ্যের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  price: z.string().min(1, "মূল্য দিন"),
  category: z.string().min(1, "ক্যাটেগরি সিলেক্ট করুন"),
  description: z.string().min(10, "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে"),
  stock: z.string().min(1, "স্টক পরিমাণ দিন"),
  status: z.string().min(1, "স্ট্যাটাস সিলেক্ট করুন"),
});

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      status: "active",
    },
  });

  const mockProducts = [
    { id: '1', name: 'স্মার্টফোন', category: 'ইলেক্ট্রনিক্স', price: '১২,৫০০', stock: '২৫', status: 'active' },
    { id: '2', name: 'ল্যাপটপ', category: 'ইলেক্ট্রনিক্স', price: '৫৮,০০০', stock: '১০', status: 'active' },
    { id: '3', name: 'হেডফোন', category: 'ইলেক্ট্রনিক্স', price: '২,৫০০', stock: '৫০', status: 'active' },
    { id: '4', name: 'টি-শার্ট', category: 'ফ্যাশন', price: '৫৫০', stock: '১০০', status: 'active' },
    { id: '5', name: 'জিন্স', category: 'ফ্যাশন', price: '১,২০০', stock: '৭৫', status: 'active' },
    { id: '6', name: 'স্নিকার্স', category: 'ফ্যাশন', price: '২,৮০০', stock: '৩০', status: 'active' },
    { id: '7', name: 'চেয়ার', category: 'আসবাবপত্র', price: '৪,৫০০', stock: '১২', status: 'out-of-stock' },
    { id: '8', name: 'টেবিল', category: 'আসবাবপত্র', price: '৭,০০০', stock: '৮', status: 'out-of-stock' },
    { id: '9', name: 'বই', category: 'বই', price: '৩৫০', stock: '২০০', status: 'draft' },
    { id: '10', name: 'খেলনা', category: 'শিশুদের', price: '৬৫০', stock: '৬০', status: 'draft' },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && product.status === 'active';
    if (activeTab === 'out-of-stock') return matchesSearch && product.status === 'out-of-stock';
    if (activeTab === 'draft') return matchesSearch && product.status === 'draft';
    
    return false;
  });
  
  const toggleProductSelection = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically save the product to your database
    setIsAddProductOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">প্রোডাক্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">আপনার পণ্য যোগ করুন, সম্পাদনা করুন এবং ম্যানেজ করুন</p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন পণ্য যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>নতুন পণ্য যোগ করুন</DialogTitle>
              <DialogDescription>
                আপনার নতুন পণ্যের বিবরণ দিন। সবগুলো তথ্য পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>পণ্যের নাম</FormLabel>
                      <FormControl>
                        <Input placeholder="পণ্যের নাম লিখুন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>মূল্য (৳)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="৫০০" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্টক পরিমাণ</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="১০" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ক্যাটেগরি</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ক্যাটেগরি সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ইলেক্ট্রনিক্স">ইলেক্ট্রনিক্স</SelectItem>
                            <SelectItem value="ফ্যাশন">ফ্যাশন</SelectItem>
                            <SelectItem value="আসবাবপত্র">আসবাবপত্র</SelectItem>
                            <SelectItem value="বই">বই</SelectItem>
                            <SelectItem value="শিশুদের">শিশুদের</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্ট্যাটাস</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="স্ট্যাটাস সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">অ্যাকটিভ</SelectItem>
                            <SelectItem value="draft">ড্রাফট</SelectItem>
                            <SelectItem value="out-of-stock">স্টক নেই</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>বিবরণ</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন"
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-md p-4">
                  <FormLabel>পণ্যের ছবি</FormLabel>
                  <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF সাপোর্টেড (মাক্স. ১০MB)</p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)}>বাতিল</Button>
                  <Button type="submit">সেভ করুন</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="পণ্য খুঁজুন"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                ফিল্টার
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ক্যাটেগরি: ইলেক্ট্রনিক্স
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ক্যাটেগরি: ফ্যাশন
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                স্ট্যাটাস: অ্যাকটিভ
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                মূল্য: ১০০০ - ৫০০০
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">সব পণ্য ({mockProducts.length})</TabsTrigger>
          <TabsTrigger value="active">অ্যাকটিভ ({mockProducts.filter(p => p.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="out-of-stock">স্টক নেই ({mockProducts.filter(p => p.status === 'out-of-stock').length})</TabsTrigger>
          <TabsTrigger value="draft">ড্রাফট ({mockProducts.filter(p => p.status === 'draft').length})</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          {selectedProducts.length > 0 && (
            <div className="bg-muted p-2 mb-4 rounded-md flex items-center justify-between">
              <span>{selectedProducts.length} টি পণ্য সিলেক্টেড</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  এডিট
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  ডিলিট
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4"
                    />
                  </TableHead>
                  <TableHead>পণ্য</TableHead>
                  <TableHead>ক্যাটেগরি</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>স্টক</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Package className="h-8 w-8 mb-2" />
                        <p>কোন পণ্য পাওয়া যায়নি</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোন ফলাফল নেই</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="w-4 h-4"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>৳{product.price}</TableCell>
                      <TableCell>
                        {parseInt(product.stock) < 20 ? (
                          <div className="flex items-center">
                            <span>{product.stock}</span>
                            {parseInt(product.stock) < 10 && (
                              <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
                            )}
                          </div>
                        ) : (
                          product.stock
                        )}
                      </TableCell>
                      <TableCell>
                        {product.status === 'active' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                            অ্যাকটিভ
                          </Badge>
                        )}
                        {product.status === 'out-of-stock' && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                            স্টক নেই
                          </Badge>
                        )}
                        {product.status === 'draft' && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                            ড্রাফট
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
