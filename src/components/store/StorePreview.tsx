import React from 'react';
import { ShoppingCart, Search, Menu, ChevronRight, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StorePreviewProps {
  theme: string;
  storeName: string;
}

const StorePreview: React.FC<StorePreviewProps> = ({ theme, storeName }) => {
  // Get theme specific colors
  const getThemeColors = () => {
    switch (theme) {
      case 'minimal':
        return { primary: 'bg-slate-900', secondary: 'bg-slate-100', text: 'text-slate-900' };
      case 'fashion':
        return { primary: 'bg-pink-600', secondary: 'bg-pink-100', text: 'text-pink-600' };
      case 'electronics':
        return { primary: 'bg-blue-600', secondary: 'bg-blue-100', text: 'text-blue-600' };
      case 'food':
        return { primary: 'bg-amber-600', secondary: 'bg-amber-100', text: 'text-amber-600' };
      default:
        return { primary: 'bg-slate-900', secondary: 'bg-slate-100', text: 'text-slate-900' };
    }
  };
  
  const colors = getThemeColors();

  const featuredProducts = [
    {
      name: 'প্রোডাক্ট ১',
      price: '৳১,২৯৯',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      name: 'প্রোডাক্ট ২',
      price: '৳৯৯৯',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      name: 'প্রোডাক্ট ৩',
      price: '৳১,৮৯৯',
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      name: 'প্রোডাক্ট ৪',
      price: '৳২,৪৯৯',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
  ];

  const categories = [
    'শীর্ষ বিক্রয়', 'নতুন', 'বিশেষ অফার', 'সকল প্রোডাক্ট'
  ];

  return (
    <div className="flex flex-col min-h-[600px]">
      {/* Header */}
      <header className={`${colors.primary} text-white p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{storeName}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-2">
          <Button variant="ghost" size="sm">
            <Menu className="h-4 w-4 mr-2" />
            ক্যাটাগরি
          </Button>
          <div className="flex items-center gap-4">
            {categories.map((cat, idx) => (
              <Button key={idx} variant="ghost" size="sm">{cat}</Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-72 bg-gray-200 w-full overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`}
          alt="Hero banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-start justify-center p-10">
          <h2 className="text-white text-4xl font-bold mb-4">নতুন কালেকশন</h2>
          <p className="text-white mb-6">সেরা মানের প্রোডাক্ট সেরা মূল্যে</p>
          <Button className={colors.primary}>এখনই কিনুন</Button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">জনপ্রিয় প্রোডাক্ট</h2>
            <Button variant="link" className={colors.text}>
              আরো দেখুন <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold">{product.price}</span>
                    <Button size="sm" className={colors.primary}>
                      <ShoppingCart className="h-4 w-4 mr-1" /> কার্টে যোগ করুন
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={`${colors.secondary} py-12`}>
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">আমাদের নিউজলেটার সাবস্ক্রাইব করুন</h3>
          <p className="text-gray-600 mb-6">সর্বশেষ অফার এবং আপডেট পেতে আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</p>
          <div className="flex max-w-md mx-auto">
            <Input placeholder="আপনার ইমেইল দিন" className="rounded-r-none" />
            <Button className={`${colors.primary} rounded-l-none`}>সাবস্ক্রাইব</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4">{storeName}</h4>
            <p className="text-gray-300">সেরা মানের প্রোডাক্ট আমাদের কাছে পাবেন। আমরা গ্রাহকের সন্তুষ্টিতে বিশ্বাসী।</p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">যোগাযোগ</h4>
            <p className="text-gray-300">ঠিকানা: ১২৩, মেইন স্ট্রীট, ঢাকা</p>
            <p className="text-gray-300">ফোন: +৮৮০১৭১২৩৪৫৬৭৮</p>
            <p className="text-gray-300">ইমেইল: info@store.com</p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">কুইক লিংক</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">হোম</a></li>
              <li><a href="#" className="hover:text-white">প্রোডাক্টস</a></li>
              <li><a href="#" className="hover:text-white">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-white">যোগাযোগ</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePreview;
