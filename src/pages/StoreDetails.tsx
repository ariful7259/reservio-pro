
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  MapPin,
  Star,
  Building,
  Package,
  Heart,
  Share2,
  CircleDollarSign,
  Clock,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import SocialShareModal from '@/components/SocialShareModal';

const StoreDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock store data
  const storeData = {
    id: 1,
    name: "টপটেক ইলেকট্রনিক্স",
    verified: true,
    rating: 4.8,
    reviews: 1250,
    location: "মিরপুর-১০, ঢাকা",
    joinedDate: "জানুয়ারী ২০২২",
    totalSales: 3500,
    products: [
      {
        id: 1,
        name: "ওয়ায়ারলেস হেডফোন",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        price: "৳ 2,500",
        originalPrice: "৳ 3,200",
        rating: 4.8,
        reviews: 245,
      },
      {
        id: 2,
        name: "স্মার্ট ওয়াচ",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
        price: "৳ 4,500",
        originalPrice: "৳ 5,000",
        rating: 4.7,
        reviews: 189,
      },
      {
        id: 3,
        name: "ব্লুটুথ স্পিকার",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
        price: "৳ 1,800",
        originalPrice: "৳ 2,200",
        rating: 4.6,
        reviews: 210,
      },
    ]
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleBookmark = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "প্রোডাক্টটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setShareItem({
      ...product,
      type: 'product',
    });
    setShowShareModal(true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "অনুসন্ধান করা হচ্ছে",
      description: `"${searchTerm}" এর জন্য ফলাফল দেখানো হচ্ছে`,
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{storeData.name}</h1>
        {storeData.verified && (
          <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">
            ভেরিফাইড
          </Badge>
        )}
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-medium">{storeData.name}</h2>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {storeData.location}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{storeData.rating}</span>
                  <span className="text-muted-foreground ml-1">({storeData.reviews} রিভিউ)</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  <span>{storeData.totalSales}+ অর্ডার</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Input 
            placeholder="দোকানের প্রোডাক্ট খুঁজুন" 
            className="pl-4 pr-16" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit"
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </form>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">সকল প্রোডাক্ট</h2>
          <div className="flex items-center text-sm gap-2">
            <span className="text-muted-foreground">সর্ট করুন:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
                <SelectItem value="price_low">
                  <div className="flex items-center">
                    <CircleDollarSign className="h-3 w-3 mr-1" />
                    <ArrowUp className="h-3 w-3 mr-1" />
                    দাম (কম থেকে বেশি)
                  </div>
                </SelectItem>
                <SelectItem value="price_high">
                  <div className="flex items-center">
                    <CircleDollarSign className="h-3 w-3 mr-1" />
                    <ArrowDown className="h-3 w-3 mr-1" />
                    দাম (বেশি থেকে কম)
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    রেটিং
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    নতুন
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {storeData.products.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                    onClick={(e) => handleBookmark(e, product.id)}>
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                    onClick={(e) => handleShare(e, product)}>
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground my-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{product.rating}</span>
                  </div>
                  <span className="mx-1">•</span>
                  <span>{product.reviews} রিভিউ</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default StoreDetails;
