
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Menu, User, Heart, ChevronRight, Star, ArrowRight } from 'lucide-react';

interface StorePreviewProps {
  theme: string;
  storeName: string;
}

const StorePreview: React.FC<StorePreviewProps> = ({ theme, storeName }) => {
  // হেডার স্টাইল
  const getHeaderStyle = () => {
    switch (theme) {
      case 'fashion':
        return 'bg-pink-600 text-white';
      case 'electronics':
        return 'bg-blue-600 text-white';
      case 'food':
        return 'bg-amber-500 text-white';
      case 'artisan':
        return 'bg-emerald-600 text-white';
      case 'digital':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  // বডি স্টাইল
  const getBodyStyle = () => {
    switch (theme) {
      case 'fashion':
        return 'bg-pink-50';
      case 'electronics':
        return 'bg-blue-50';
      case 'food':
        return 'bg-amber-50';
      case 'artisan':
        return 'bg-emerald-50';
      case 'digital':
        return 'bg-purple-50';
      default:
        return 'bg-white';
    }
  };

  // বাটন স্টাইল
  const getButtonStyle = () => {
    switch (theme) {
      case 'fashion':
        return 'bg-pink-600 hover:bg-pink-700 text-white';
      case 'electronics':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'food':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'artisan':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'digital':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-gray-800 hover:bg-gray-900 text-white';
    }
  };

  // প্রোডাক্ট কার্ড স্টাইল
  const getCardStyle = () => {
    switch (theme) {
      case 'fashion':
        return 'border-pink-200 hover:border-pink-400';
      case 'electronics':
        return 'border-blue-200 hover:border-blue-400';
      case 'food':
        return 'border-amber-200 hover:border-amber-400';
      case 'artisan':
        return 'border-emerald-200 hover:border-emerald-400';
      case 'digital':
        return 'border-purple-200 hover:border-purple-400';
      default:
        return 'border-gray-200 hover:border-gray-400';
    }
  };

  // অ্যাক্সেন্ট টেক্সট কালার
  const getAccentTextColor = () => {
    switch (theme) {
      case 'fashion':
        return 'text-pink-600';
      case 'electronics':
        return 'text-blue-600';
      case 'food':
        return 'text-amber-500';
      case 'artisan':
        return 'text-emerald-600';
      case 'digital':
        return 'text-purple-600';
      default:
        return 'text-gray-800';
    }
  };

  // প্রোডাক্ট লিস্ট ডাটা
  const getProductData = () => {
    switch (theme) {
      case 'fashion':
        return [
          { name: 'ডিজাইনার শাড়ি', price: '২৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1610030469668-8e4e83fe8be4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'পাঞ্জাবি', price: '১৫৯৯ টাকা', image: 'https://images.unsplash.com/photo-1620115245646-7201de2e8c6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'লেডিস ব্যাগ', price: '১২৯৯ টাকা', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
      case 'electronics':
        return [
          { name: 'স্মার্ট ওয়াচ', price: '৫৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'হেডফোন', price: '২৪৯৯ টাকা', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'ওয়্যারলেস চার্জার', price: '১৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1622118897013-0226214ab592?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
      case 'food':
        return [
          { name: 'অরগানিক হানি', price: '৮৫০ টাকা', image: 'https://images.unsplash.com/photo-1585997031886-01faa86be441?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'স্পেশাল কেক', price: '১২০০ টাকা', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'হোমমেড জাম', price: '৪৫০ টাকা', image: 'https://images.unsplash.com/photo-1590590614673-5dddcb29215f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
      case 'artisan':
        return [
          { name: 'হাতের কাজের শো-পিস', price: '৭৯৯ টাকা', image: 'https://images.unsplash.com/photo-1597612830436-c05230da3048?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'হ্যান্ডমেড জুয়েলারি', price: '১২৯৯ টাকা', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'ক্লে পট', price: '৫৯৯ টাকা', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
      case 'digital':
        return [
          { name: 'ই-বুক সাবস্ক্রিপশন', price: '৩৯৯ টাকা/মাস', image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'প্রিমিয়াম কোর্স', price: '৪৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'ফটো টেমপ্লেট', price: '১৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
      default:
        return [
          { name: 'প্রোডাক্ট ১', price: '১২০০ টাকা', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'প্রোডাক্ট ২', price: '১৫০০ টাকা', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
          { name: 'প্রোডাক্ট ৩', price: '৯৯৯ টাকা', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
        ];
    }
  };

  // থিম অনুযায়ী হিরো ইমেজ
  const getHeroImage = () => {
    switch (theme) {
      case 'fashion':
        return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      case 'electronics':
        return 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      case 'food':
        return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      case 'artisan':
        return 'https://images.unsplash.com/photo-1464022914313-050b597bb287?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      case 'digital':
        return 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      default:
        return 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
  };

  // থিম অনুযায়ী হিরো টেক্সট
  const getHeroText = () => {
    switch (theme) {
      case 'fashion':
        return 'আধুনিক ফ্যাশন ট্রেন্ড এখন আপনার হাতের মুঠোয়';
      case 'electronics':
        return 'সর্বাধুনিক গ্যাজেটস সহজেই কিনুন';
      case 'food':
        return 'খাঁটি স্বাদে ভরপুর হোম মেইড আইটেম';
      case 'artisan':
        return 'বাংলাদেশের সেরা হস্তশিল্পীদের অনন্য সৃষ্টি';
      case 'digital':
        return 'ডিজিটাল প্রোডাক্টের সর্বোত্তম মার্কেটপ্লেস';
      default:
        return 'আপনার প্রয়োজনীয় সকল পণ্য একসাথে';
    }
  };

  return (
    <div className={cn("min-h-[600px] max-w-full overflow-hidden", getBodyStyle())}>
      {/* হেডার */}
      <header className={cn("w-full", getHeaderStyle())}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Menu className="h-5 w-5 md:hidden" />
              <h1 className="text-lg sm:text-xl font-bold">{storeName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex relative">
                <input 
                  type="text" 
                  placeholder="কি খুঁজছেন?" 
                  className="pl-3 pr-10 py-1.5 rounded-md text-gray-800 text-sm w-40 lg:w-60"
                />
                <Search className="absolute right-3 top-1.5 h-4 w-4 text-gray-500" />
              </div>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-white text-primary text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* হিরো সেকশন */}
      <section className="relative overflow-hidden">
        <div className="h-52 sm:h-80 relative overflow-hidden">
          <img 
            src={getHeroImage()} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-md">
                <h2 className="text-white text-xl sm:text-3xl font-bold mb-2">{getHeroText()}</h2>
                <p className="text-white text-sm sm:text-base mb-4 opacity-90">
                  {storeName} - এর সাথে আপনার শপিং অভিজ্ঞতা হোক অনন্য
                </p>
                <Button className={cn("text-sm", getButtonStyle())}>
                  প্রোডাক্ট দেখুন <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* প্রোডাক্ট সেকশন */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">জনপ্রিয় পণ্যসমূহ</h2>
            <Button variant="link" className={cn("font-medium", getAccentTextColor())}>
              সব দেখুন <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {getProductData().map((product, idx) => (
              <div key={idx} className={cn("border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow", getCardStyle())}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-gray-500">(১৫৪)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn("font-bold", getAccentTextColor())}>{product.price}</p>
                    <Button size="sm" className={cn("text-xs", getButtonStyle())}>
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> কার্টে যোগ করুন
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ক্যাটেগরি সেকশন */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">ক্যাটেগরি</h2>
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-32 text-center">
                <div className={cn("h-16 w-16 rounded-full mx-auto mb-2 flex items-center justify-center", getHeaderStyle())}>
                  {i === 1 && <ShoppingCart className="h-6 w-6" />}
                  {i === 2 && <Heart className="h-6 w-6" />}
                  {i === 3 && <Star className="h-6 w-6" />}
                  {i === 4 && <Search className="h-6 w-6" />}
                  {i === 5 && <User className="h-6 w-6" />}
                </div>
                <p className="text-sm">ক্যাটেগরি {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* নিউজলেটার */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-2">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</h3>
              <p className="text-sm text-gray-600 mb-4">
                নতুন প্রোডাক্ট এবং অফার সম্পর্কে প্রথমেই জানতে সাবস্ক্রাইব করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল দিন" 
                  className="flex-grow px-4 py-2 border rounded-md text-sm"
                />
                <Button className={getButtonStyle()}>
                  সাবস্ক্রাইব
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ফুটার */}
      <footer className={cn("py-6", getHeaderStyle())}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold mb-3">দোকান সম্পর্কে</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>আমাদের সম্পর্কে</li>
                <li>শর্তাবলী</li>
                <li>প্রাইভেসি পলিসি</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">গ্রাহক সেবা</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>সাহায্য</li>
                <li>অর্ডার ট্র্যাকিং</li>
                <li>রিফান্ড পলিসি</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">যোগাযোগ</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>ঠিকানা</li>
                <li>ইমেইল</li>
                <li>ফোন</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">আমাদের ফলো করুন</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <i className="fab fa-instagram"></i>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <i className="fab fa-youtube"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 pt-4 text-sm text-center opacity-80">
            &copy; {new Date().getFullYear()} {storeName}। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePreview;
