
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ServiceProviderCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  availability: string;
  onClick: (id: string) => void;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  id,
  name,
  specialty,
  imageUrl,
  rating,
  reviewCount,
  availability,
  onClick,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAppointmentClick = () => {
    // First call the original onClick handler
    onClick(id);
    
    // Show toast
    toast({
      title: "অ্যাপয়েন্টমেন্ট",
      description: `${name} এর সাথে অ্যাপয়েন্টমেন্টের জন্য অনুরোধ করা হচ্ছে...`,
    });
    
    // Navigate to appointment booking page
    setTimeout(() => {
      navigate(`/book-appointment/${id}`);
    }, 500);
  };

  return (
    <Card className="border overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-sm ml-1">{rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {availability}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAppointmentClick}
          >
            অ্যাপয়েন্টমেন্ট নিন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderCard;
