
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  onLocationChange
}) => {
  const { toast } = useToast();
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          onLocationChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsGettingLocation(false);
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: "আপনার বর্তমান লোকেশন সংরক্ষিত হয়েছে"
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: "ত্রুটি",
            description: "লোকেশন পেতে সমস্যা হয়েছে। অনুমতি দিন বা ম্যানুয়ালি এলাকার নাম লিখুন",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "সমর্থিত নয়",
        description: "আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        <MapPin className="h-4 w-4 inline mr-1" />
        এলাকা
      </label>
      <div className="flex gap-2">
        <Input
          placeholder="এলাকার নাম"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="whitespace-nowrap"
        >
          <Navigation className="h-4 w-4 mr-1" />
          {isGettingLocation ? 'খোঁজা হচ্ছে...' : 'লাইভ লোকেশন'}
        </Button>
      </div>
      {currentLocation && (
        <p className="text-xs text-muted-foreground mt-1">
          লোকেশন: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};
