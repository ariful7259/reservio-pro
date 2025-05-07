
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ChevronDown, 
  ChevronUp,
  Clock,
  FileText,
  CheckCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/components/ui/use-toast';
import { useShoppingState } from '@/hooks/useShoppingState';

// Demo product data - this would typically come from an API
const getProductById = (productId: string) => {
  const demoProducts = [
    {
      id: '1',
      title: 'ফ্রিল্যান্সিং কোর্স - ওয়েব ডেভেলপমেন্ট',
      description: 'ওয়েব ডেভেলপমেন্ট শেখার মাধ্যমে ঘরে বসে আয় করুন। এই কোর্সে আপনি HTML, CSS, JavaScript, React, Node.js এবং MongoDB শিখবেন। প্রোজেক্ট ভিত্তিক শেখানো হবে যাতে আপনি প্র্যাকটিক্যাল নলেজ পান।',
      type: 'course',
      price: '৳৫,৯৯৯',
      rating: 4.8,
      author: 'মোঃ আমিনুল ইসলাম',
      image: 'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 2450,
      content: [
        { title: 'ওয়েব ডেভেলপমেন্ট ফান্ডামেন্টালস', duration: '২ ঘন্টা' },
        { title: 'HTML এবং CSS মাস্টারি', duration: '৫ ঘন্টা' },
        { title: 'জাভাস্ক্রিপ্ট এসেনশিয়ালস', duration: '৮ ঘন্টা' },
        { title: 'রিয়েক্ট ফ্রন্টএন্ড ফ্রেমওয়ার্ক', duration: '১২ ঘন্টা' },
        { title: 'নোড.জেএস ব্যাকএন্ড', duration: '১০ ঘন্টা' },
        { title: 'প্রোজেক্ট: পোর্টফোলিও ওয়েবসাইট', duration: '৪ ঘন্টা' },
        { title: 'প্রোজেক্ট: ই-কমার্স ওয়েবসাইট', duration: '৮ ঘন্টা' },
        { title: 'ফ্রিল্যান্সিং মার্কেটপ্লেস ব্যবহার', duration: '২ ঘন্টা' },
        { title: 'ক্লায়েন্ট আকর্ষণ এবং সম্পর্ক তৈরি', duration: '৩ ঘন্টা' }
      ],
      requirements: [
        'কম্পিউটার এবং ইন্টারনেট সংযোগ',
        'প্রোগ্রামিং এর প্রাথমিক ধারণা (অপশনাল)',
        'শেখার মানসিকতা',
        'প্রতিদিন কমপক্ষে ১-২ ঘন্টা সময় দেওয়ার প্রতিশ্রুতি'
      ]
    },
    {
      id: '2',
      title: 'ডিজিটাল মার্কেটিং - পূর্ণাঙ্গ গাইডবুক',
      description: 'আপনার ব্যবসা বা ফ্রিল্যান্সিং স্কিল বাড়ানোর জন্য সম্পূর্ণ গাইড। এই বইতে সোশ্যাল মিডিয়া মার্কেটিং, SEO, ইমেইল মার্কেটিং, কন্টেন্ট মার্কেটিং, এবং PPC বিজ্ঞাপন সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।',
      type: 'ebook',
      price: '৳৯৯৯',
      rating: 4.5,
      author: 'তানিয়া আক্তার',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1835,
      content: [
        { title: 'ডিজিটাল মার্কেটিং পরিচিতি', pages: '১৫' },
        { title: 'সোশ্যাল মিডিয়া মার্কেটিং', pages: '৪০' },
        { title: 'সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)', pages: '৫৫' },
        { title: 'ইমেইল মার্কেটিং', pages: '৩০' },
        { title: 'কন্টেন্ট মার্কেটিং', pages: '২৫' },
        { title: 'পেইড মিডিয়া এবং PPC', pages: '৩৫' },
        { title: 'অ্যানালিটিক্স এবং ডাটা ভিত্তিক সিদ্ধান্ত', pages: '২০' },
        { title: 'কেস স্টাডি', pages: '২৫' },
        { title: 'ভবিষ্যত ট্রেন্ড', pages: '১০' }
      ],
      requirements: [
        'ইন্টারনেট ব্যবহারের প্রাথমিক অভিজ্ঞতা',
        'সোশ্যাল মিডিয়া প্লাটফর্ম সম্পর্কে ধারণা',
        'ডিজিটাল মার্কেটিংয়ে আগ্রহ'
      ]
    },
    // Add more products as needed
  ];
  
  return demoProducts.find(product => product.id === productId);
};

const DigitalProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, isInWishlist } = useShoppingState();
  
  const [currentTab, setCurrentTab] = useState('overview');
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  
  // Fetch product details
  const product = productId ? getProductById(productId) : undefined;
  
  if (!product) {
    return (
      <div className="container pt-20 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-4">প্রোডাক্ট পাওয়া যায়নি</h1>
        <Button variant="outline" onClick={() => navigate('/digital-products')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> প্রোডাক্টস পেজে ফিরে যান
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: "প্রোডাক্টটি সফলভাবে কার্টে যোগ করা হয়েছে।",
    });
  };
  
  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    
    toast({
      title: isInWishlist(product.id) ? "উইশলিস্ট থেকে সরানো হয়েছে" : "উইশলিস্টে যোগ করা হয়েছে",
      description: isInWishlist(product.id)
        ? "প্রোডাক্টটি উইশলিস্ট থেকে সফলভাবে সরানো হয়েছে।"
        : "প্রোডাক্টটি উইশলিস্টে সফলভাবে যোগ করা হয়েছে।",
    });
  };
  
  const handleShare = () => {
    // Share functionality
    toast({
      title: "শেয়ার করুন",
      description: "শেয়ার করার অপশন খোলা হচ্ছে...",
    });
  };

  const renderProductContent = () => {
    switch (product.type) {
      case 'course':
        return (
          <>
            <h3 className="font-medium mb-4">কোর্স কন্টেন্ট</h3>
            <div className="space-y-3">
              {product.content?.slice(0, isContentExpanded ? undefined : 4).map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.duration}</span>
                </div>
              ))}
            </div>
            
            {(product.content?.length || 0) > 4 && (
              <Button 
                variant="ghost" 
                className="mt-3 w-full"
                onClick={() => setIsContentExpanded(!isContentExpanded)}
              >
                {isContentExpanded ? (
                  <>দেখান কম <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>আরও দেখুন <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            )}
          </>
        );
      
      case 'ebook':
        return (
          <>
            <h3 className="font-medium mb-4">বইয়ের বিষয়বস্তু</h3>
            <div className="space-y-3">
              {product.content?.slice(0, isContentExpanded ? undefined : 4).map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.pages} পৃষ্ঠা</span>
                </div>
              ))}
            </div>
            
            {(product.content?.length || 0) > 4 && (
              <Button 
                variant="ghost" 
                className="mt-3 w-full"
                onClick={() => setIsContentExpanded(!isContentExpanded)}
              >
                {isContentExpanded ? (
                  <>দেখান কম <ChevronUp className="h-4 w-4 ml-1" /></>
                ) : (
                  <>আরও দেখুন <ChevronDown className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            )}
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container pt-20 pb-16">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={() => navigate('/digital-products')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> ফিরে যান
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="lg:col-span-1">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
            <Badge 
              className="absolute top-2 right-2"
              variant="secondary"
            >
              {product.type === 'course' ? 'কোর্স' :
               product.type === 'ebook' ? 'ইবুক' :
               product.type === 'template' ? 'টেমপ্লেট' :
               product.type === 'software' ? 'সফটওয়্যার' :
               product.type === 'audio' ? 'অডিও' :
               product.type === 'video' ? 'ভিডিও' : ''}
            </Badge>
          </div>
        </div>
        
        {/* Product Information */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{product.rating}</span>
              <span className="ml-1 text-xs text-muted-foreground">({product.sales}+ বিক্রি)</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="ml-1 text-sm">{product.author}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{product.price}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <Button 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            কার্টে যোগ করুন
          </Button>
          
          <Separator className="my-4" />
          
          <Tabs defaultValue="overview" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
              <TabsTrigger value="content">কন্টেন্ট</TabsTrigger>
              <TabsTrigger value="requirements">প্রয়োজনীয়তা</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="py-4">
              <h3 className="font-medium mb-2">প্রোডাক্ট ওভারভিউ</h3>
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium">প্রোডাক্ট টাইপ</h4>
                  <p className="text-sm">{product.type === 'course' ? 'কোর্স' :
                    product.type === 'ebook' ? 'ইবুক' :
                    product.type === 'template' ? 'টেমপ্লেট' :
                    product.type === 'software' ? 'সফটওয়্যার' :
                    product.type === 'audio' ? 'অডিও' :
                    product.type === 'video' ? 'ভিডিও' : ''}
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium">প্রোডাক্ট দাম</h4>
                  <p className="text-sm">{product.price}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium">রেটিং</h4>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium">মোট বিক্রি</h4>
                  <p className="text-sm">{product.sales}+</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="py-4">
              {renderProductContent()}
            </TabsContent>
            
            <TabsContent value="requirements" className="py-4">
              <h3 className="font-medium mb-4">প্রয়োজনীয়তা</h3>
              <div className="space-y-2">
                {product.requirements?.map((req: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DigitalProductDetail;
