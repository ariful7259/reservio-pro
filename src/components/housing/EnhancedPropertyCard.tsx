
import React, { useState } from 'react';
import { 
  MapPin, Bed, Bath, Square, Heart, Share2, Phone, MessageCircle, 
  Star, Wifi, Car, Shield, Zap, Camera, Eye, CheckCircle 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { EnhancedProperty } from '@/data/enhanced-property-data';

interface EnhancedPropertyCardProps {
  property: EnhancedProperty;
  language: 'bn' | 'en';
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const EnhancedPropertyCard: React.FC<EnhancedPropertyCardProps> = ({ 
  property, 
  language, 
  onFavorite, 
  isFavorite = false 
}) => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(property.id);
    toast({
      title: isFavorite ? "পছন্দের তালিকা থেকে সরানো হয়েছে" : "পছন্দের তালিকায় যোগ করা হয়েছে",
      description: property.title
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.price} টাকা/মাস`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "লিংক কপি করা হয়েছে",
        description: "আপনি এখন এটি শেয়ার করতে পারেন"
      });
    }
  };

  const handleContact = (type: 'call' | 'whatsapp') => {
    const phone = property.contactPhone;
    if (type === 'call') {
      window.open(`tel:${phone}`);
    } else {
      window.open(`https://wa.me/88${phone.replace(/[^0-9]/g, '')}`);
    }
  };

  const getAvailabilityBadge = () => {
    switch (property.availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">এখনই উপলব্ধ</Badge>;
      case 'soon':
        return <Badge className="bg-yellow-100 text-yellow-800">শীঘ্রই</Badge>;
      case 'booked':
        return <Badge className="bg-red-100 text-red-800">বুকড</Badge>;
      default:
        return null;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'ওয়াইফাই': <Wifi className="h-3 w-3" />,
      'পার্কিং': <Car className="h-3 w-3" />,
      'নিরাপত্তা': <Shield className="h-3 w-3" />,
      'জেনারেটর': <Zap className="h-3 w-3" />
    };
    return iconMap[amenity] || <CheckCircle className="h-3 w-3" />;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {property.images.length > 1 ? (
            <Carousel className="w-full h-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img 
                      src={image} 
                      alt={`${property.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/80" />
              <CarouselNext className="right-2 bg-white/80" />
            </Carousel>
          ) : (
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Overlay Content */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {property.featured && (
            <Badge className="bg-primary text-white">বিশেষ প্রস্তাব</Badge>
          )}
          {getAvailabilityBadge()}
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Virtual Tour Badge */}
        {property.virtualTour && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-white/90 text-gray-700">
              <Camera className="h-3 w-3 mr-1" />
              ভার্চুয়াল ট্যুর
            </Badge>
          </div>
        )}

        {/* Image Counter */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="outline" className="bg-white/90 text-gray-700">
              <Eye className="h-3 w-3 mr-1" />
              {property.images.length} ছবি
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title and Verification */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 flex-1">{property.title}</h3>
          {property.verified && (
            <CheckCircle className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" />
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{property.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({property.reviewCount} রিভিউ)</span>
          <Badge variant="outline" className="text-xs">{property.furnishing}</Badge>
        </div>

        {/* Property Details */}
        <div className="flex flex-wrap gap-3 mb-3 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.bedrooms} বেড
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.bathrooms} বাথ
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {property.area} বর্গফুট
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 4).map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 4} আরও
            </Badge>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            ৳ {property.price.toLocaleString()}/{language === 'bn' ? 'মাস' : 'month'}
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex gap-2 mt-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => handleContact('call')}
          >
            <Phone className="h-4 w-4 mr-1" />
            কল করুন
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleContact('whatsapp')}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            হোয়াটসঅ্যাপ
          </Button>
        </div>

        {/* Details Button */}
        <Button className="w-full mt-2" variant="outline">
          বিস্তারিত দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedPropertyCard;
