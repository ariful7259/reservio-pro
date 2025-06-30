
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Heart, Star, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface FlashDeal {
  id: string;
  title: string;
  originalPrice: string;
  discountPrice: string;
  discount: number;
  image: string;
  timeLeft: number; // in minutes
  sold: number;
  stock: number;
}

const FlashDealsSection = () => {
  const { language } = useApp();
  const [timeLeft, setTimeLeft] = useState(120); // 2 hours in minutes

  // Demo flash deals
  const flashDeals: FlashDeal[] = [
    {
      id: '1',
      title: 'স্মার্ট ওয়াচ - Flash Deal',
      originalPrice: '৳৩,৫০০',
      discountPrice: '৳১,৭৫০',
      discount: 50,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      timeLeft: 120,
      sold: 15,
      stock: 25
    },
    {
      id: '2',
      title: 'ব্লুটুথ স্পিকার',
      originalPrice: '৳২,০০০',
      discountPrice: '৳৯৯৯',
      discount: 50,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      timeLeft: 120,
      sold: 8,
      stock: 20
    }
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <Zap className="h-6 w-6" />
          {language === 'bn' ? 'ফ্ল্যাশ ডিল' : 'Flash Deals'}
          <Badge className="bg-red-100 text-red-600 ml-2">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashDeals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-all">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-32 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  -{deal.discount}%
                </Badge>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 h-8 w-8"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm line-clamp-2 mb-2">{deal.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-red-600">{deal.discountPrice}</span>
                  <span className="text-xs text-muted-foreground line-through">{deal.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{deal.sold} বিক্রিত</span>
                  <span>{deal.stock} স্টক</span>
                </div>
                <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                  {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashDealsSection;
