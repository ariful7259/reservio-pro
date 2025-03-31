
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Utilities = () => {
  const utilities = [
    { name: 'গ্যাস বিল', icon: '🔥', color: 'bg-orange-100' },
    { name: 'বিদ্যুৎ বিল', icon: '⚡', color: 'bg-yellow-100' },
    { name: 'পানি বিল', icon: '💧', color: 'bg-blue-100' },
    { name: 'ইন্টারনেট বিল', icon: '🌐', color: 'bg-indigo-100' },
  ];

  // Banner images for utilities
  const bannerImages = [
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop"
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">ইউটিলিটিস</h1>
      
      {/* Banner */}
      <div className="mb-6">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img 
                      src={image} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {utilities.map((utility, index) => (
          <Card key={index} className="border hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className={`text-3xl h-16 w-16 rounded-full ${utility.color} flex items-center justify-center mb-3`}>
                {utility.icon}
              </div>
              <h3 className="font-medium text-center">{utility.name}</h3>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                পে করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Utilities;
