
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  Star,
  Share2,
  Heart,
  Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ServiceItem {
  id: number;
  title: string;
  provider: string;
  location: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  subcategory?: string;
}

interface ServiceCategoryListProps {
  services: ServiceItem[];
  onShare: (e: React.MouseEvent, service: ServiceItem) => void;
}

const ServiceCategoryList: React.FC<ServiceCategoryListProps> = ({
  services,
  onShare
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('ServiceCategoryList rendering with services:', services);

  const handleServiceClick = (id: number) => {
    navigate(`/service-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সেবাটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleRentNow = (e: React.MouseEvent, service: ServiceItem) => {
    e.stopPropagation();
    navigate(`/rental-booking/${service.id}`, {
      state: { rental: service }
    });
  };

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">এই ক্যাটাগরিতে কোন সেবা পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
          onClick={() => handleServiceClick(service.id)}
        >
          <div className="relative aspect-square">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2">{service.subcategory || service.category}</Badge>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-8 w-8 rounded-full"
                onClick={(e) => handleBookmark(e, service.id)}
              >
                <Heart className="h-4 w-4 text-gray-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white h-8 w-8 rounded-full"
                onClick={(e) => onShare(e, service)}
              >
                <Share2 className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
          
          <CardContent className="p-3">
            <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
            <p className="text-xs text-muted-foreground mb-1">{service.provider}</p>
            <div className="flex items-center text-xs text-muted-foreground my-1">
              <MapPin className="h-3 w-3 mr-1" /> 
              <span>{service.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">{service.price}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs ml-1">{service.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">({service.reviews})</span>
              </div>
            </div>
            <Button 
              className="w-full mt-3"
              size="sm"
              onClick={(e) => handleRentNow(e, service)}
            >
              <Phone className="h-4 w-4 mr-2" /> ভাড়া নিন
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCategoryList;
