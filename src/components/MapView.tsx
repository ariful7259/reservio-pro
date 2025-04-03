
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface MapViewProps {
  listings?: Array<{
    id: number | string;
    title: string;
    location: string;
    latitude?: number;
    longitude?: number;
  }>;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const MapView: React.FC<MapViewProps> = ({ listings = [], onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  // For the prototype, we'll display a placeholder map
  // In production, this would connect to a mapping API like Google Maps or Mapbox
  useEffect(() => {
    if (mapRef.current) {
      // This would initialize the map in a real application
      setMapLoaded(true);
    }
  }, []);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "লোকেশন অ্যাক্সেস করা হচ্ছে",
        description: "আপনার বর্তমান লোকেশন খুঁজে বের করা হচ্ছে...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (onLocationSelect) {
            onLocationSelect(latitude, longitude);
          }
          
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        (error) => {
          toast({
            title: "লোকেশন পাওয়া যায়নি",
            description: "আপনার লোকেশন অ্যাক্সেস করতে অনুমতি দিন",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "লোকেশন অ্যাক্সেস করা যায়নি",
        description: "আপনার ব্রাউজারে জিওলোকেশন সাপোর্ট নেই",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder for actual map */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=23.8103,90.4125&zoom=12&size=600x300&key=YOUR_API_KEY')] bg-cover bg-center"
      >
        {listings.length === 0 && !userLocation && (
          <div className="flex flex-col items-center justify-center h-full">
            <MapPin className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              লোকেশন নির্বাচন করতে মানচিত্রে ক্লিক করুন<br />অথবা আপনার বর্তমান লোকেশন ব্যবহার করুন
            </p>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white shadow-md"
          onClick={handleGetCurrentLocation}
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white shadow-md"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Location badge */}
      {userLocation && (
        <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-full shadow-md flex items-center">
          <MapPin className="h-4 w-4 text-primary mr-2" />
          <span className="text-xs font-medium">
            {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};

export default MapView;
