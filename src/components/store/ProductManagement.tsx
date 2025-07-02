
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, Plus, Upload, Image, Tag, DollarSign, 
  Trash2, Edit, Eye, FileSpreadsheet 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'স্যাম্পল পণ্য ১',
      price: 1500,
      category: 'ফ্যাশন',
      stock: 25,
      description: 'এটি একটি স্যাম্পল পণ্য'
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    description: ''
  });

  const [activeTab, setActiveTab] = useState('list');

  const addProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        ...newProduct,
        id: Date.now().toString()
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: ''
      });
      setActiveTab('list');
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">পণ্য ম্যানেজমেন্ট</h2>
        <p className="text-gray-600">আপনার স্টোরে পণ্য যোগ এবং পরিচালনা করুন</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">পণ্য তালিকা</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">নতুন পণ্য</span>
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">বাল্ক আপলোড</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">ক্যাটাগরি</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold">সকল পণ্য ({products.length})</h3>
            <Button onClick={() => setActiveTab('add')} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              নতুন পণ্য যোগ করুন
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">৳{product.price}</span>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      স্টক: {product.stock}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      এডিট
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {products.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">কোন পণ্য নেই</h3>
                <p className="text-gray-600 mb-4">আপনার প্রথম পণ্য যোগ করুন</p>
                <Button onClick={() => setActiveTab('add')}>
                  <Plus className="h-4 w-4 mr-2" />
                  পণ্য যোগ করুন
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <h3 className="text-lg font-semibold">নতুন পণ্য যোগ করুন</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">পণ্যের নাম *</Label>
                <Input
                  id="productName"
                  placeholder="পণ্যের নাম লিখুন"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="productPrice">মূল্য (৳) *</Label>
                <Input
                  id="productPrice"
                  type="number"
                  placeholder="0"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
              </div>

              <div>
                <Label htmlFor="productCategory">ক্যাটাগরি</Label>
                <Input
                  id="productCategory"
                  placeholder="যেমন: ফ্যাশন, ইলেকট্রনিক্স"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="productStock">স্টক সংখ্যা</Label>
                <Input
                  id="productStock"
                  type="number"
                  placeholder="0"
                  value={newProduct.stock || ''}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="productDescription">পণ্যের বিবরণ</Label>
                <Textarea
                  id="productDescription"
                  placeholder="পণ্য সম্পর্কে বিস্তারিত লিখুন"
                  rows={4}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>

              <div>
                <Label>পণ্যের ছবি</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">ছবি আপলোড করুন</p>
                  <Button variant="outline" size="sm">ফাইল নির্বাচন</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setActiveTab('list')}>
              বাতিল
            </Button>
            <Button onClick={addProduct} disabled={!newProduct.name || newProduct.price <= 0}>
              <Plus className="h-4 w-4 mr-2" />
              পণ্য যোগ করুন
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">বাল্ক পণ্য আপলোড</h3>
            <p className="text-gray-600 mb-6">একসাথে অনেক পণ্য আপলোড করুন CSV/Excel ফাইল ব্যবহার করে</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                CSV/Excel আপলোড
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-4">CSV বা Excel ফাইল আপলোড করুন</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline">নমুনা ফাইল ডাউনলোড</Button>
                  <Button>ফাইল আপলোড করুন</Button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">নির্দেশনা:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>প্রথমে নমুনা ফাইল ডাউনলোড করুন</li>
                  <li>আপনার পণ্যের তথ্য সঠিকভাবে পূরণ করুন</li>
                  <li>ফাইল আপলোড করুন এবং প্রসেস হওয়ার জন্য অপেক্ষা করুন</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <h3 className="text-lg font-semibold">পণ্যের ক্যাটাগরি</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['ফ্যাশন', 'ইলেকট্রনিক্স', 'হোম অ্যান্ড লিভিং', 'বুক অ্যান্ড স্টেশনারি', 'হেলথ অ্যান্ড বিউটি', 'খেলনা', 'খাবার', 'গিফট'].map((category) => (
              <Card key={category} className="p-4 text-center hover:shadow-md transition-shadow">
                <Tag className="h-8 w-8 mx-auto text-primary mb-2" />
                <h4 className="font-medium">{category}</h4>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>নতুন ক্যাটাগরি যোগ করুন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input placeholder="ক্যাটাগরির নাম" className="flex-1" />
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
