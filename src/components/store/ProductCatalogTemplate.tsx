
import React, { useState } from 'react';
import { Edit, Trash2, Plus, Image, Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';

// Product interface for better typing
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

const ProductCatalogTemplate = () => {
  const { language } = useApp();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Demo products data
  const demoProducts: Product[] = [
    {
      id: 1,
      name: language === 'bn' ? 'স্মার্ট ওয়াচ' : 'Smart Watch',
      category: language === 'bn' ? 'ইলেকট্রনিক্স' : 'Electronics',
      price: '৳২,৪৯৯',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      name: language === 'bn' ? 'সানগ্লাস' : 'Sunglasses',
      category: language === 'bn' ? 'ফ্যাশন' : 'Fashion',
      price: '৳৭৯৯',
      stock: 28,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      name: language === 'bn' ? 'ব্লুটুথ হেডফোন' : 'Bluetooth Headphones',
      category: language === 'bn' ? 'ইলেকট্রনিক্স' : 'Electronics',
      price: '৳১,৮৯৯',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      name: language === 'bn' ? 'লেদার ব্যাগ' : 'Leather Bag',
      category: language === 'bn' ? 'ফ্যাশন' : 'Fashion',
      price: '৳৩,২৯৯',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 5,
      name: language === 'bn' ? 'স্মার্টফোন' : 'Smartphone',
      category: language === 'bn' ? 'ইলেকট্রনিক্স' : 'Electronics',
      price: '৳১৮,৯৯৯',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];

  // Filter products based on search term and category
  const filteredProducts = demoProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || product.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });
  
  // Extract unique categories
  const categories = [...new Set(demoProducts.map(product => product.category))];
  
  // Product attributes for demo
  const productAttributes = [
    { id: 'color', name: language === 'bn' ? 'রং' : 'Color', values: ['Black', 'White', 'Red', 'Blue'] },
    { id: 'size', name: language === 'bn' ? 'সাইজ' : 'Size', values: ['S', 'M', 'L', 'XL'] },
    { id: 'material', name: language === 'bn' ? 'উপাদান' : 'Material', values: ['Leather', 'Cotton', 'Plastic', 'Metal'] }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="products">
            {language === 'bn' ? 'পণ্যসমূহ' : 'Products'}
          </TabsTrigger>
          <TabsTrigger value="categories">
            {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
          </TabsTrigger>
          <TabsTrigger value="attributes">
            {language === 'bn' ? 'অ্যাট্রিবিউট' : 'Attributes'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div className="flex items-center flex-wrap gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={language === 'bn' ? "প্রোডাক্ট সার্চ করুন..." : "Search products..."}
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterCategory || ''} onValueChange={(value) => setFilterCategory(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'bn' ? "সব ক্যাটাগরি" : "All Categories"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">
                    {language === 'bn' ? "সব ক্যাটাগরি" : "All Categories"}
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {language === 'bn' ? "সর্ট করুন" : "Sort"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption('name-asc')}>
                    {language === 'bn' ? "নাম (A-Z)" : "Name (A-Z)"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('name-desc')}>
                    {language === 'bn' ? "নাম (Z-A)" : "Name (Z-A)"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('stock-asc')}>
                    {language === 'bn' ? "স্টক (কম থেকে বেশি)" : "Stock (Low to High)"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption('stock-desc')}>
                    {language === 'bn' ? "স্টক (বেশি থেকে কম)" : "Stock (High to Low)"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode('list')}
                >
                  {language === 'bn' ? "তালিকা" : "List"}
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode('grid')}
                >
                  {language === 'bn' ? "গ্রিড" : "Grid"}
                </Button>
              </div>
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-1" /> 
              {language === 'bn' ? "নতুন প্রোডাক্ট" : "New Product"}
            </Button>
          </div>

          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg shadow-sm flex flex-col sm:flex-row overflow-hidden">
                  <div className="w-full sm:w-32 h-32">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {product.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {language === 'bn' ? "আইডি" : "ID"}: #{product.id}
                          </span>
                        </div>
                      </div>
                      <div className="font-semibold">{product.price}</div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'bn' ? "স্টক" : "Stock"}: 
                          <span className={product.stock > 10 ? "text-green-600" : "text-amber-600"}> {product.stock}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> 
                          {language === 'bn' ? "এডিট" : "Edit"}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-1" /> 
                          {language === 'bn' ? "ডিলিট" : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">
                      {language === 'bn' ? "স্টক" : "Stock"}: {product.stock}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {product.category}
                      </Badge>
                      <span className="font-semibold">{product.price}</span>
                    </div>
                    <div className="flex gap-1 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" /> 
                        {language === 'bn' ? "এডিট" : "Edit"}
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <Image className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 font-medium">
                {language === 'bn' ? "কোন প্রোডাক্ট পাওয়া যায়নি" : "No products found"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {language === 'bn' 
                  ? "আপনার সার্চ অনুযায়ী কোন প্রোডাক্ট পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে আবার চেষ্টা করুন।" 
                  : "No products found matching your search. Try with different keywords."
                }
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-1" /> 
                {language === 'bn' ? "নতুন প্রোডাক্ট যোগ করুন" : "Add New Product"}
              </Button>
            </div>
          )}

          <div className="border-t pt-4 text-center mt-8">
            <Button variant="outline" className="mb-2">
              <Plus className="h-4 w-4 mr-1" /> 
              {language === 'bn' ? "CSV আপলোড করুন" : "Upload CSV"}
            </Button>
            <p className="text-xs text-muted-foreground">
              {language === 'bn' 
                ? "CSV ফাইল ব্যবহার করে একসাথে অনেক প্রোডাক্ট আপলোড করুন" 
                : "Upload multiple products at once using a CSV file"
              }
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {language === 'bn' ? "ক্যাটাগরি ম্যানেজমেন্ট" : "Category Management"}
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> 
                {language === 'bn' ? "নতুন ক্যাটাগরি" : "New Category"}
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <span>{category}</span>
                      <Badge variant="outline">
                        {demoProducts.filter(p => p.category === category).length}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="attributes">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {language === 'bn' ? "প্রোডাক্ট অ্যাট্রিবিউট" : "Product Attributes"}
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> 
                {language === 'bn' ? "নতুন অ্যাট্রিবিউট" : "New Attribute"}
              </Button>
            </div>
            
            <div className="border rounded-md divide-y">
              {productAttributes.map(attribute => (
                <div key={attribute.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{attribute.name}</h4>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        {language === 'bn' ? "মান যোগ করুন" : "Add Value"}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {attribute.values.map((value, idx) => (
                      <Badge key={idx} variant="outline" className="px-3 py-1">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductCatalogTemplate;
