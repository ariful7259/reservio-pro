
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface BannerCarouselProps {
  bannerImages: string[];
}
const BannerCarousel: React.FC<BannerCarouselProps> = ({ bannerImages }) => (
  <div className="mb-6 overflow-hidden rounded-lg">
    <Carousel className="w-full">
      <CarouselContent>
        {bannerImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  </div>
);
export default BannerCarousel;
