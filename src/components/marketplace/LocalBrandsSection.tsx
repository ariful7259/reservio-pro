
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Store, Verified, Star, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface LocalBrand {
  id: string;
  name: string;
  type: string;
  rating: number;
  products: number;
  image: string;
  isVerified: boolean;
  location: string;
  featuredProduct: {
    title: string;
    price: string;
    image: string;
  };
}

const LocalBrandsSection = () => {
  const { language } = useApp();

  const localBrands: LocalBrand[] = [
    {
      id: '1',
      name: 'ঢাকা হ্যান্ডিক্র্যাফট',
      type: 'Handicrafts',
      rating: 4.8,
      products: 45,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=300&fit=crop',
      isVerified: true,
      location: 'পুরান ঢাকা',
      featuredProduct: {
        title: 'হস্তনির্মিত কাঠের শো-পিস',
        price: '৳১,২০০',
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&h=200&fit=crop'
      }
    },
    {
      id: '2',
      name: 'গ্রামীণ ফ্যাশন',
      type: 'Local Clothing',
      rating: 4.6,
      products: 28,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop',
      isVerified: true,
      location: 'সিলেট',
      featuredProduct: {
        title: 'ঐতিহ্যবাহী কুর্তা',
        price: '৳৮৫০',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop'
      }
    }
  ];

  return (
    <Card className="mb-6 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-violet-600">
            <Store className="h-6 w-6" />
            {language === 'bn' ? 'লোকাল ব্র্যান্ড' : 'Local Brands'}
            <Badge className="bg-violet-100 text-violet-600 ml-2">
              {language === 'bn' ? 'স্থানীয় সাপোর্ট' : 'Support Local'}
            </Badge>
          </CardTitle>
          <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
            {language === 'bn' ? 'ব্র্যান্ড রেজিস্টার' : 'Register Brand'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localBrands.map((brand) => (
            <Card key={brand.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{brand.name}</h4>
                      {brand.isVerified && (
                        <Verified className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs mb-1">
                      {brand.type}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {brand.rating}
                      </div>
                      <span>•</span>
                      <span>{brand.products} পণ্য</span>
                    </div>
                  </div>
                </div>
                
                {/* Featured Product */}
                <div className="flex gap-3 bg-white/60 rounded-lg p-2">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={brand.featuredProduct.image} 
                      alt={brand.featuredProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-xs line-clamp-2 mb-1">
                      {brand.featuredProduct.title}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-violet-600 text-sm">
                        {brand.featuredProduct.price}
                      </span>
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        দেখুন
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalBrandsSection;
