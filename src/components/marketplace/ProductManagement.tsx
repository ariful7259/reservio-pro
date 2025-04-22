
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Package, 
  Search, 
  Plus, 
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import ProductList from './ProductList';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">পণ্য ব্যবস্থাপনা</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          নতুন পণ্য যোগ করুন
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="পণ্য খুঁজুন..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 sm:flex gap-2 w-full sm:w-auto">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('all')}
            className="justify-start"
          >
            <FileText className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">সব</span>
            <span className="ml-1">(৫৪)</span>
          </Button>
          <Button 
            variant={activeTab === 'active' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('active')}
            className="justify-start"
          >
            <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">অ্যাক্টিভ</span>
            <span className="ml-1">(৩৮)</span>
          </Button>
          <Button 
            variant={activeTab === 'draft' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('draft')}
            className="justify-start"
          >
            <Clock className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">ড্রাফট</span>
            <span className="ml-1">(১৬)</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">মোট ৫৪টি পণ্য</p>
          <TabsList>
            <TabsTrigger value="grid">গ্রিড</TabsTrigger>
            <TabsTrigger value="list">লিস্ট</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 space-y-2">
              <div className="bg-slate-100 rounded-md p-4 aspect-square flex items-center justify-center">
                <Package className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="font-medium">স্মার্টফোন</h3>
              <p className="text-sm text-muted-foreground">ইলেকট্রনিক্স</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">৳১২,৫০০</p>
                <Badge className="bg-green-100 text-green-800">অ্যাক্টিভ</Badge>
              </div>
            </div>
            {/* More grid items would go here... */}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <ProductList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;

// We need to add the Badge component which we're using above
import { Badge } from '@/components/ui/badge';
