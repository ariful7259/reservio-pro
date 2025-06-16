
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  BookOpen,
  FileText,
  ShoppingBag,
  Code,
  Video,
  Download,
  Film,
  Music,
  Palette,
  ImageIcon,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DigitalProductType {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  path: string;
}

const FeaturedDigitalProducts = () => {
  const navigate = useNavigate();

  // Digital product data with categories
  const digitalProducts: DigitalProductType[] = [
    {
      id: "course-1",
      title: "ডিজিটাল মার্কেটিং মাস্টার কোর্স",
      description: "সোশ্যাল মিডিয়া মার্কেটিং থেকে শুরু করে সম্পূর্ণ ডিজিটাল মার্কেটিং শিখুন",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      price: "৳৫,৯৯৯",
      category: "কোর্স",
      path: "/digital-products"
    },
    {
      id: "ebook-1",
      title: "বিজনেস স্টার্টাপ গাইড",
      description: "আধুনিক যুগে সফল ব্যবসা শুরু করার সম্পূর্ণ গাইড",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
      price: "৳৯৯৯",
      category: "ইবুক",
      path: "/digital-products"
    },
    {
      id: "template-1",
      title: "প্রিমিয়াম ওয়েবসাইট টেমপ্লেট",
      description: "ব্যবসা, ব্লগ এবং পোর্টফোলিও ওয়েবসাইট টেমপ্লেট",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop",
      price: "৳২,৫০০",
      category: "টেমপ্লেট",
      path: "/digital-products"
    },
    {
      id: "software-1",
      title: "বাংলা ইনভয়েস সফটওয়্যার",
      description: "ছোট ব্যবসার জন্য সম্পূর্ণ ইনভয়েস ও অ্যাকাউন্টিং সলিউশন",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop",
      price: "৳৩,৫০০",
      category: "সফটওয়্যার",
      path: "/digital-products"
    },
    {
      id: "video-1",
      title: "ভিডিও এডিটিং মাস্টারক্লাস",
      description: "প্রফেশনাল ভিডিও এডিটিং টেকনিক শিখুন",
      image: "https://images.unsplash.com/photo-1574717024453-354056aafa98?q=80&w=1000&auto=format&fit=crop",
      price: "৳৪,৫০০",
      category: "কোর্স",
      path: "/digital-products"
    },
    {
      id: "audio-1",
      title: "প্রিমিয়াম মিউজিক সাউন্ডস",
      description: "মিউজিক প্রোডাকশন ও কন্টেন্ট ক্রিয়েটরদের জন্য প্রিমিয়াম সাউন্ডস",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      price: "৳১,৯৯৯",
      category: "অডিও",
      path: "/digital-products"
    },
    {
      id: "graphics-1",
      title: "প্রিমিয়াম গ্রাফিক্স টেমপ্লেট",
      description: "সোশ্যাল মিডিয়া ও প্রিন্ট মার্কেটিং জন্য প্রিমিয়াম গ্রাফিক্স প্যাকেজ",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      price: "৳১,৮০০",
      category: "গ্রাফিক্স",
      path: "/digital-products"
    }
  ];

  const handleProductClick = (path: string) => {
    navigate(path);
  };

  // Category icons mapping with vibrant colors
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'কোর্স': return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'ইবুক': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'টেমপ্লেট': return <Palette className="h-4 w-4 text-pink-500" />;
      case 'সফটওয়্যার': return <Code className="h-4 w-4 text-green-500" />;
      case 'অডিও': return <Music className="h-4 w-4 text-amber-500" />;
      case 'ভিডিও': return <Video className="h-4 w-4 text-red-500" />;
      case 'গ্রাফিক্স': return <ImageIcon className="h-4 w-4 text-cyan-500" />;
      default: return <ShoppingBag className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">ডিজিটাল প্রোডাক্টস</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={() => navigate('/digital-products')}
        >
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {digitalProducts.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all h-full" 
                  onClick={() => handleProductClick(product.path)}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 flex items-center gap-1 bg-white text-black">
                      {getCategoryIcon(product.category)}
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{product.price}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(product.path);
                        }}
                      >
                        দেখুন <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default FeaturedDigitalProducts;
