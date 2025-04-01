import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  ShoppingCart, 
  Star, 
  Gift, 
  Clock, 
  DollarSign,
  Users,
  ArrowRight,
  BookOpen,
  FileText,
  Globe,
  Video,
  Code,
  Palette,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Flame from './icons/Flame';

interface DigitalProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  salePrice?: string;
  image: string;
  category: string;
  type: 'course' | 'ebook' | 'template' | 'software' | 'graphics' | 'video';
  rating: number;
  sales: number;
  creator: {
    name: string;
    image: string;
  };
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

const DigitalProductsShowcase = () => {
  const navigate = useNavigate();

  const digitalProducts: DigitalProduct[] = [
    {
      id: "course-1",
      title: "ডিজিটাল মার্কেটিং মাস্টারক্লাস",
      description: "ডিজিটাল মার্কেটিং এর A-Z শিখুন এই প্রিমিয়াম কোর্সে",
      price: "৳৪,৯৯০",
      salePrice: "৳৩,৯৯০",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      category: "কোর্স",
      type: "course",
      rating: 4.8,
      sales: 1245,
      creator: {
        name: "আহমেদ হোসেন",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["মার্কেটিং", "ডিজিটাল"],
      featured: true
    },
    {
      id: "ebook-1",
      title: "ফ্রিল্যান্সিং সাকসেস গাইড",
      description: "ফ্রিল্যান্সিং এ সফল হওয়ার সম্পূর্ণ গাইডলাইন",
      price: "৳৯৯০",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
      category: "ইবুক",
      type: "ebook",
      rating: 4.7,
      sales: 857,
      creator: {
        name: "মারিয়া রহমান",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["ফ্রিল্যান্সিং", "ক্যারিয়ার"],
      trending: true
    },
    {
      id: "template-1",
      title: "প্রিমিয়াম ওয়েবসাইট টেমপ্লেট বান্ডল",
      description: "১০টি প্রফেশনাল ওয়েবসাইট টেমপ্লেট",
      price: "৳২,৫০০",
      salePrice: "৳১,৯০০",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop",
      category: "টেমপ্লেট",
      type: "template",
      rating: 4.6,
      sales: 632,
      creator: {
        name: "তারিক আলম",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["ওয়েব ডেভেলপমেন্ট", "ডিজাইন"],
      featured: true
    },
    {
      id: "software-1",
      title: "এসইও অ্যানালাইজার টুল",
      description: "আপনার ওয়েবসাইটের SEO স্কোর বাড়ানোর জন্য অ্যাডভান্��ড টুল",
      price: "৳৩,৪৯০",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
      category: "সফটওয়্যার",
      type: "software",
      rating: 4.5,
      sales: 421,
      creator: {
        name: "জাকির হোসেন",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["SEO", "ওয়েব টুল"],
      trending: true
    },
    {
      id: "graphics-1",
      title: "প্রিমিয়াম স্টক ফটো বান্ডল",
      description: "১০০+ হাই রেজোলিউশন স্টক ফটো কমার্শিয়াল ব্যবহারের জন্য",
      price: "৳১,৮০০",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1000&auto=format&fit=crop",
      category: "গ্রাফিক্স",
      type: "graphics",
      rating: 4.4,
      sales: 318,
      creator: {
        name: "সাবিনা আক্তার",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["ফটোগ্রাফি", "স্টক ফটো"],
      featured: true
    },
    {
      id: "video-1",
      title: "মোশন গ্রাফিক্স মাস্টারক্লাস",
      description: "প্রফেশনাল লেভেল মোশন গ্রাফিক্স শিখুন",
      price: "৳৫,৯৯০",
      salePrice: "৳৪,৫০০",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
      category: "ভিডিও কোর্স",
      type: "video",
      rating: 4.9,
      sales: 287,
      creator: {
        name: "মাহমুদুল হাসান",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop"
      },
      tags: ["মোশন গ্রাফিক্স", "ভিডিও এডিটিং"],
      trending: true
    },
  ];

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'ebook':
        return <FileText className="h-4 w-4" />;
      case 'template':
        return <Palette className="h-4 w-4" />;
      case 'software':
        return <Code className="h-4 w-4" />;
      case 'graphics':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">এক্সপ্লোর করুন</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/digital-products')}>
          সব দেখুন <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {digitalProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {product.featured && (
                      <Badge className="bg-blue-500">
                        <Star className="h-3 w-3 mr-1 fill-white" /> ফিচার্ড
                      </Badge>
                    )}
                    {product.trending && (
                      <Badge className="bg-orange-500">
                        <Flame className="h-3 w-3 mr-1" /> ট্রেন্ডিং
                      </Badge>
                    )}
                  </div>
                  <Badge className="absolute bottom-2 left-2 flex items-center gap-1">
                    {getCategoryIcon(product.type)}
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-base mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                      <img src={product.creator.image} alt={product.creator.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs">{product.creator.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {product.salePrice ? (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-primary">{product.salePrice}</span>
                          <span className="text-xs text-muted-foreground line-through">{product.price}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-primary">{product.price}</span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="mr-2">{product.rating}</span>
                      <Users className="h-3 w-3 mr-1" />
                      <span>{product.sales}+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default DigitalProductsShowcase;
