import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Book } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface VideoAd {
  thumbnail: string;
  title: string;
  description: string;
  videoUrl: string;
}

export const VideoCarousel = () => {
  const videoAds: VideoAd[] = [
    {
      thumbnail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      title: "নতুন সার্ভিস উপলব্ধ",
      description: "আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }, 
    {
      thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
      title: "সাপ্তাহিক অফার",
      description: "সাপ্তাহিক অফার শেষ হতে আর ২ দিন বাকি",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }, 
    {
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      title: "ইলেক্ট্রনিক্স সেল",
      description: "সকল ইলেক্ট্রনিক্স পণ্যে ২০% ছাড়",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];
  const navigate = useNavigate();

  const handleBook = (ad: VideoAd) => {
    toast({
      title: "বুকিং কনফার্ম হয়েছে",
      description: `আপনি "${ad.title}" ভিডিওর জন্য বুকিং করেছেন!`,
    });
    // Redirect as needed (for demo to a booking page)
    setTimeout(() => {
      navigate('/services');
    }, 1000);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">নতুন ভিডিও</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {videoAds.map((ad, index) => (
            <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden border">
                <div className="aspect-video bg-black flex items-center justify-center relative">
                  <video className="w-full h-full object-cover" poster={ad.thumbnail} controls>
                    <source src={ad.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Play toggle button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-black/30 text-white border-white hover:bg-black/50 hover:text-white pointer-events-auto"
                      onClick={e => {
                        e.stopPropagation();
                        const video = e.currentTarget.closest('.aspect-video')?.querySelector('video');
                        if (video) {
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }
                      }}
                      aria-label="ভিডিও চালান/বন্ধ করুন"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  {/* Book button: placed at bottom right over video */}
                  <div className="absolute bottom-2 right-2 flex pointer-events-none">
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="shadow-lg pointer-events-auto"
                      onClick={() => handleBook(ad)}
                      aria-label={`${ad.title} বুক করুন`}
                    >
                      <span className="flex items-center gap-1">
                        <Book className="h-4 w-4 mr-1" />
                        বুক করুন
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium mb-2">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
                  {/* Keep existing booking button for redundancy, or remove if not needed */}
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full md:hidden"
                    onClick={() => handleBook(ad)}
                  >
                    বুক করুন
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 h-8 w-8" />
        <CarouselNext className="right-1 h-8 w-8" />
      </Carousel>
    </div>
  );
};
