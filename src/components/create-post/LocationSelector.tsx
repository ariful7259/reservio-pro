
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  location: string;
  onLocationChange: (location: string) => void;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  onLocationChange,
  onCoordinatesChange
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
          
          // Pass coordinates to parent
          if (onCoordinatesChange) {
            onCoordinatesChange(latitude, longitude);
          }
          
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

  // Calculate marker position on map (percentage based)
  const getMarkerPosition = (lat: number, lng: number) => {
    const centerLat = 23.8103;
    const centerLng = 90.4125;
    const latRange = 0.15;
    const lngRange = 0.2;
    
    const x = Math.min(85, Math.max(15, 50 + ((lng - centerLng) / lngRange) * 50));
    const y = Math.min(85, Math.max(15, 50 - ((lat - centerLat) / latRange) * 50));
    return { x, y };
  };

  return (
    <div className="space-y-3">
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
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4 mr-1" />
          )}
          {isGettingLocation ? 'খোঁজা হচ্ছে...' : 'লাইভ লোকেশন'}
        </Button>
      </div>
      
      {/* Map Preview */}
      {currentLocation && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            লোকেশন: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </p>
          
          {/* Mini Map Preview */}
          <div className="relative w-full h-[150px] rounded-lg overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-blue-100 dark:from-muted dark:via-muted/80 dark:to-muted border">
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border border-muted-foreground/30" />
                ))}
              </div>
            </div>
            
            {/* Simulated roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/30" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-muted-foreground/20" />
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-muted-foreground/20" />
            </div>
            
            {/* User location marker */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ 
                left: `${getMarkerPosition(currentLocation.lat, currentLocation.lng).x}%`, 
                top: `${getMarkerPosition(currentLocation.lat, currentLocation.lng).y}%` 
              }}
            >
              {/* Pulse effect */}
              <div className="absolute inset-0 w-10 h-10 -ml-3 -mt-3">
                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
              </div>
              
              {/* Marker */}
              <div className="relative w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center">
                <User className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            
            {/* Coordinates display */}
            <div className="absolute bottom-2 left-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded shadow">
              <MapPin className="w-3 h-3 inline mr-1" />
              {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </div>
            
            {/* Compass */}
            <div className="absolute top-2 right-2 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center text-xs font-bold shadow">
              N
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            ✓ আপনার লোকেশন পোস্টের সাথে সংরক্ষিত হবে
          </p>
        </div>
      )}
    </div>
  );
};
