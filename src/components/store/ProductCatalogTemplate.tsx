
import React from 'react';
import { Edit, Trash2, Plus, Image, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ProductCatalogTemplate = () => {
  const demoProducts = [
    {
      id: 1,
      name: 'স্মার্ট ওয়াচ',
      category: 'ইলেকট্রনিক্স',
      price: '৳২,৪৯৯',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      name: 'সানগ্লাস',
      category: 'ফ্যাশন',
      price: '৳৭৯৯',
      stock: 28,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      name: 'ব্লুটুথ হেডফোন',
      category: 'ইলেকট্রনিক্স',
      price: '৳১,৮৯৯',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      name: 'লেদার ব্যাগ',
      category: 'ফ্যাশন',
      price: '৳৩,২৯৯',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 5,
      name: 'স্মার্টফোন',
      category: 'ইলেকট্রনিক্স',
      price: '৳১৮,৯৯৯',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="প্রোডাক্ট সার্চ করুন..."
              className="pl-9 w-full"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> নতুন প্রোডাক্ট
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {demoProducts.map(product => (
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
                    <span className="text-sm text-muted-foreground">আইডি: #{product.id}</span>
                  </div>
                </div>
                <div className="font-semibold">{product.price}</div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">স্টক: <span className={product.stock > 10 ? "text-green-600" : "text-amber-600"}>{product.stock}</span></div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> এডিট
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1" /> ডিলিট
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 text-center">
        <Button variant="outline" className="mb-2">
          <Plus className="h-4 w-4 mr-1" /> CSV আপলোড করুন
        </Button>
        <p className="text-xs text-muted-foreground">CSV ফাইল ব্যবহার করে একসাথে অনেক প্রোডাক্ট আপলোড করুন</p>
      </div>
    </div>
  );
};

export default ProductCatalogTemplate;
