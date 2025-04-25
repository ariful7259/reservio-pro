
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarouselCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  category: string;
  rating?: number;
  onClick?: () => void;
  className?: string;
  index?: number;
}

const CarouselCard = ({
  image,
  title,
  location,
  price,
  category,
  rating = 4.8,
  onClick,
  className,
  index = 0
}: CarouselCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card 
        className={cn(
          "overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 bg-card hover:bg-card/90 border border-border/50",
          className
        )}
        onClick={onClick}
      >
        <div className="relative aspect-square">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground">
            {category}
          </Badge>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-bold text-primary">{price}</p>
            <div className="flex items-center text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CarouselCard;
