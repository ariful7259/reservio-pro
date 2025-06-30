
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, MessageCircle, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface UsedProduct {
  id: string;
  title: string;
  price: string;
  condition: string;
  location: string;
  image: string;
  seller: string;
  postedDate: string;
}

const UsedProductsSection = () => {
  const { language } = useApp();

  const usedProducts: UsedProduct[] = [
    {
      id: '1',
      title: 'iPhone 12 - Used (9/10 Condition)',
      price: '৳৪৫,০০০',
      condition: 'চমৎকার',
      location: 'ধানমন্ডি, ঢাকা',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      seller: 'আহমেদ ভাই',
      postedDate: '২ দিন আগে'
    },
    {
      id: '2',
      title: 'সেকেন্ড হ্যান্ড ফ্রিজ - Samsung',
      price: '৳১৮,০০০',
      condition: 'ভালো',
      location: 'মিরপুর, ঢাকা',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop',
      seller: 'রহিম সাহেব',
      postedDate: '১ সপ্তাহ আগে'
    }
  ];

  return (
    <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-emerald-600">
            <RefreshCw className="h-6 w-6" />
            {language === 'bn' ? 'পুরাতন পণ্য' : 'Used Products'}
          </CardTitle>
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="h-4 w-4 mr-1" />
            {language === 'bn' ? 'পোস্ট করুন' : 'Post Item'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-3">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-emerald-600">{product.price}</span>
                    <Badge variant="outline" className="text-xs">
                      {product.condition}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{product.postedDate}</span>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      চ্যাট
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsedProductsSection;
