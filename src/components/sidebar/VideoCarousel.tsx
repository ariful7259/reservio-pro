
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ShoppingCart, Briefcase, Home, Wrench } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface VideoAd {
  thumbnail: string;
  title: string;
  description: string;
  videoUrl: string;
  type: 'service' | 'product' | 'rent' | 'hire';
  serviceId?: string;
  productId?: string;
  rentalId?: string;
}

export const VideoCarousel = () => {
  const videoAds: VideoAd[] = [{
    thumbnail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    title: "নতুন সার্ভিস উপলব্ধ",
    description: "আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "service",
    serviceId: "1"
  }, {
    thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    title: "সাপ্তাহিক অফার",
    description: "সাপ্তাহিক অফার শেষ হতে আর ২ দিন বাকি",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "product",
    productId: "1"
  }, {
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    title: "ইলেক্ট্রনিক্স সেল",
    description: "সকল ইলেক্ট্রনিক্স পণ্যে ২০% ছাড়",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "product",
    productId: "2"
  }, {
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    title: "বাসা ভাড়া",
    description: "গুলশানে সুন্দর বাসা ভাড়া দিন",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    type: "rent",
    rentalId: "1"
  }];

  const navigate = useNavigate();

  const getButtonConfig = (type: VideoAd['type']) => {
    switch (type) {
      case 'service':
        return {
          text: 'বুক করুন',
          mobileText: 'বুক',
          icon: Briefcase,
          className: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'product':
        return {
          text: 'কিনুন',
          mobileText: 'কিনুন',
          icon: ShoppingCart,
          className: 'bg-green-600 hover:bg-green-700'
        };
      case 'rent':
        return {
          text: 'ভাড়া নিন',
          mobileText: 'ভাড়া',
          icon: Home,
          className: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'hire':
        return {
          text: 'হায়ার করুন',
          mobileText: 'হায়ার',
          icon: Wrench,
          className: 'bg-orange-600 hover:bg-orange-700'
        };
      default:
        return {
          text: 'দেখুন',
          mobileText: 'দেখুন',
          icon: Briefcase,
          className: 'bg-primary hover:bg-primary/90'
        };
    }
  };

  const handleAdClick = (ad: VideoAd) => {
    const buttonConfig = getButtonConfig(ad.type);
    
    toast({
      title: "সফল!",
      description: `"${ad.title}" এর জন্য ${buttonConfig.text} ক্লিক করেছেন!`
    });

    // Navigate to specific page based on ad type
    setTimeout(() => {
      switch (ad.type) {
        case 'service':
          navigate(`/services/${ad.serviceId || '1'}`);
          break;
        case 'product':
          navigate(`/product/${ad.productId || '1'}`);
          break;
        case 'rent':
          navigate(`/rent-details/${ad.rentalId || '1'}`);
          break;
        case 'hire':
          navigate('/services');
          break;
        default:
          navigate('/services');
      }
    }, 1000);
  };

  return <div className="space-y-2">
      <h3 className="font-medium">নতুন ভিডিও</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {videoAds.map((ad, index) => {
            const buttonConfig = getButtonConfig(ad.type);
            const ButtonIcon = buttonConfig.icon;
            
            return <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden border shadow-card">
                <div className="aspect-video bg-black flex items-center justify-center relative">
                  <video className="w-full h-full object-cover" poster={ad.thumbnail} controls>
                    <source src={ad.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play toggle button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Button variant="outline" size="icon" className="bg-black/30 text-white border-white hover:bg-black/50 hover:text-white pointer-events-auto" onClick={e => {
                  e.stopPropagation();
                  const video = e.currentTarget.closest('.aspect-video')?.querySelector('video');
                  if (video) {
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }
                }} aria-label="ভিডিও চালান/বন্ধ করুন">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  {/* Professional Action Button - Fixed position */}
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <Button 
                      size="sm" 
                      onClick={() => handleAdClick(ad)} 
                      aria-label={`${ad.title} ${buttonConfig.text}`}
                      className={`pointer-events-auto ${buttonConfig.className} text-white font-semibold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 text-xs md:text-sm`}
                    >
                      <ButtonIcon className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden md:inline">{buttonConfig.text}</span>
                      <span className="md:hidden">{buttonConfig.mobileText}</span>
                    </Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium mb-2">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
                  
                  {/* Mobile Action Button */}
                  <Button 
                    size="sm"
                    className={`w-full mt-1 block md:hidden ${buttonConfig.className} text-white font-semibold py-2 rounded-md`} 
                    onClick={() => handleAdClick(ad)}
                  >
                    <ButtonIcon className="h-4 w-4 mr-2" />
                    {buttonConfig.text}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious className="left-1 h-8 w-8" />
        <CarouselNext className="right-1 h-8 w-8" />
      </Carousel>
    </div>;
};
