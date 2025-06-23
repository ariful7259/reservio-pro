
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Trash2,
  Bell,
  Filter
} from 'lucide-react';

const BuyerWishlistTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceAlerts, setPriceAlerts] = useState<number[]>([]);

  const wishlistItems = [
    {
      id: 1,
      title: 'প্রফেশনাল লোগো ডিজাইন',
      creator: 'ডিজাইন এক্সপার্ট',
      category: 'Graphics Design',
      currentPrice: '৳২,৫০০',
      originalPrice: '৳৩,৫০০',
      lastPrice: '৳২,৮০০',
      priceDropped: true,
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      addedDate: '২৫ ডিসেম্বর',
      available: true
    },
    {
      id: 2,
      title: 'ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট',
      creator: 'ওয়েব মাস্টার',
      category: 'Web Development',
      currentPrice: '৳১৫,০০০',
      originalPrice: '৳২০,০০০',
      lastPrice: '৳১৫,০০০',
      priceDropped: false,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      addedDate: '২০ ডিসেম্বর',
      available: true
    },
    {
      id: 3,
      title: 'ভিডিও এডিটিং সার্ভিস',
      creator: 'ভিডিও প্রো',
      category: 'Video Editing',
      currentPrice: 'বিক্রয় বন্ধ',
      originalPrice: '৳৮,০০০',
      lastPrice: '৳৮,০০০',
      priceDropped: false,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      addedDate: '১৮ ডিসেম্বর',
      available: false
    }
  ];

  const categories = ['all', 'Graphics Design', 'Web Development', 'Video Editing', 'Content Creation'];

  const filteredItems = wishlistItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const togglePriceAlert = (itemId: number) => {
    setPriceAlerts(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const removeFromWishlist = (itemId: number) => {
    console.log('Remove from wishlist:', itemId);
  };

  const shareWishlist = () => {
    console.log('Share wishlist');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">উইশলিস্ট</h2>
          <p className="text-muted-foreground">{wishlistItems.length} টি সার্ভিস সংরক্ষিত</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={shareWishlist}>
            <Share2 className="h-4 w-4 mr-2" />
            শেয়ার করুন
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'সব ক্যাটাগরি' : category}
          </Button>
        ))}
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden relative group">
            {/* Price Drop Badge */}
            {item.priceDropped && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-red-600 text-white">
                  দাম কমেছে!
                </Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm h-8 w-8"
                onClick={() => togglePriceAlert(item.id)}
              >
                <Bell className={`h-4 w-4 ${priceAlerts.includes(item.id) ? 'text-blue-600' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 backdrop-blur-sm h-8 w-8 text-red-600"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className={`relative ${!item.available ? 'opacity-60' : ''}`}>
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white">
                    বিক্রয় বন্ধ
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.creator}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({item.reviews} রিভিউ)</span>
              </div>

              {/* Price Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    {item.available ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{item.currentPrice}</span>
                        {item.priceDropped && (
                          <span className="text-sm text-muted-foreground line-through">
                            {item.lastPrice}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600 font-medium">{item.currentPrice}</span>
                    )}
                  </div>
                </div>

                {item.priceDropped && (
                  <div className="text-xs text-green-600 font-medium">
                    ৳{parseInt(item.lastPrice.replace('৳', '').replace(',', '')) - 
                        parseInt(item.currentPrice.replace('৳', '').replace(',', ''))} সাশ্রয়!
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>যোগ করা হয়েছে: {item.addedDate}</span>
                {priceAlerts.includes(item.id) && (
                  <Badge variant="outline" className="text-xs">
                    দাম অ্যালার্ট চালু
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {item.available ? (
                  <Button className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    অর্ডার করুন
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1" disabled>
                    বিক্রয় বন্ধ
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">কোনো সার্ভিস পাওয়া যায়নি</h3>
          <p className="text-muted-foreground mb-4">
            এই ক্যাটাগরিতে আপনার কোনো পছন্দের সার্ভিস নেই
          </p>
          <Button>সার্ভিস ব্রাউজ করুন</Button>
        </div>
      )}

      {/* Wishlist Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{wishlistItems.length}</div>
            <div className="text-sm text-muted-foreground">মোট সার্ভিস</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {wishlistItems.filter(item => item.priceDropped).length}
            </div>
            <div className="text-sm text-muted-foreground">দাম কমেছে</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{priceAlerts.length}</div>
            <div className="text-sm text-muted-foreground">প্রাইস অ্যালার্ট</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {wishlistItems.filter(item => item.available).length}
            </div>
            <div className="text-sm text-muted-foreground">বিক্রয়ে আছে</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerWishlistTab;
