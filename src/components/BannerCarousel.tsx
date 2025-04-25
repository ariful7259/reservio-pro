
import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface BannerCarouselProps {
  images: string[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-full">
              <motion.div 
                className="overflow-hidden rounded-xl aspect-[16/6] w-full shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
              >
                <img 
                  src={image} 
                  alt={`Banner ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm border-none hover:bg-background" />
        <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm border-none hover:bg-background" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
