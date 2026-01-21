
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Locate, Filter, Home, Bookmark, MapPinOff, Filter as FilterIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SavedLocations from './SavedLocations';
import { useGeolocation } from '@/hooks/useGeolocation';

interface MapViewProps {
  listings?: Array<{
    id: number | string;
    title: string;
    location: string;
    latitude?: number;
    longitude?: number;
    type?: string;
    price?: number;
    rating?: number;
  }>;
  onLocationSelect?: (lat: number, lng: number) => void;
  filterTypes?: string[];
}

const MapView: React.FC<MapViewProps> = ({ 
  listings = [], 
  onLocationSelect,
  filterTypes = ['apartment', 'house', 'car', 'office', 'event-space'] 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showSavedLocations, setShowSavedLocations] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [radius, setRadius] = useState([5]); // কিলোমিটার হিসাবে রেডিয়াস
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | number | null>(null);
  const [filters, setFilters] = useState({
    enableFilter: false,
    showOnlyHighRated: false,
    selectedTypes: [...filterTypes],
    priceRange: [0, 100000], // মূল্য পরিসর
  });
  
  const { toast } = useToast();
  const { calculateDistance, getDistanceLabel } = useGeolocation();

  // নেটওয়ার্ক স্টেটাস চেক করা
  useEffect(() => {
    const handleOffline = () => {
      setOfflineMode(true);
      toast({
        title: "অফলাইন মোড",
        description: "আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে।",
      });
    };

    const handleOnline = () => {
      setOfflineMode(false);
      toast({
        title: "অনলাইন মোড",
        description: "আপনি আবার অনলাইন হয়েছেন।",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // অফলাইন অবস্থা চেক করা
    if (!navigator.onLine) {
      setOfflineMode(true);
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [toast]);

  // ম্যাপ লোড করা
  useEffect(() => {
    if (mapRef.current) {
      // বাস্তব অ্যাপে এটি একটি ম্যাপ API ইনিশিয়ালাইজ করবে
      setMapLoaded(true);
      
      // অফলাইন মোডে ক্যাশে করা ম্যাপ তথ্য লোড করার লজিক
      if (offlineMode) {
        const cachedMapData = localStorage.getItem('cached-map-data');
        if (cachedMapData) {
          // ক্যাশে করা ম্যাপ ডাটা প্রসেস করা
          console.log("ক্যাশে করা ম্যাপ ডাটা লোড করা হয়েছে");
        }
      }
    }
  }, [offlineMode]);

  // বর্তমান লোকেশন পাওয়ার ফাংশন
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
          
          // অফলাইন মোডে ব্যবহারের জন্য ক্যাশ করা
          const locationData = { lat: latitude, lng: longitude, timestamp: Date.now() };
          localStorage.setItem('last-known-location', JSON.stringify(locationData));
          
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        (error) => {
          // অফলাইন মোডে আগের লোকেশন ব্যবহার করা
          if (offlineMode) {
            const lastLocation = localStorage.getItem('last-known-location');
            if (lastLocation) {
              try {
                const parsedLocation = JSON.parse(lastLocation);
                setUserLocation({ lat: parsedLocation.lat, lng: parsedLocation.lng });
                toast({
                  title: "সর্বশেষ জানা লোকেশন ব্যবহার করা হচ্ছে",
                  description: "বর্তমান লোকেশন পাওয়া যায়নি",
                });
              } catch (e) {
                console.error("লোকেশন পার্স করতে সমস্যা হচ্ছে", e);
              }
            }
          } else {
            toast({
              title: "লোকেশন পাওয়া যায়নি",
              description: "আপনার লোকেশন অ্যাক্সেস করতে অনুমতি দিন",
              variant: "destructive",
            });
          }
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

  // ফিল্টার পরিবর্তন হ্যান্ডলার
  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    
    // ফিল্টার অ্যাপ্লাই করা হচ্ছে এমন একটি টোস্ট দেখানো
    if (filterKey !== 'enableFilter' || value === true) {
      toast({
        title: "ফিল্টার অ্যাপ্লাই করা হয়েছে",
        description: "ম্যাপ আপডেট করা হচ্ছে...",
      });
    }
  };

  // সেভ করা লোকেশন হ্যান্ডলার
  const handleSavedLocationSelect = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    if (onLocationSelect) {
      onLocationSelect(lat, lng);
    }
  };

  // অফলাইন মোডে ডিসপ্লে
  if (offlineMode) {
    return (
      <div className="relative w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="absolute top-4 right-4 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-200 text-sm rounded-full px-3 py-1 flex items-center gap-2">
            <span>অফলাইন মোড</span>
          </div>
          
          {userLocation ? (
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />
              <p className="font-medium">অফলাইন ম্যাপ ভিউ</p>
              <p className="text-sm text-muted-foreground mb-3">আপনার শেষ জানা লোকেশন: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setShowSavedLocations(!showSavedLocations)}
              >
                {showSavedLocations ? "সেভ করা লোকেশন লুকান" : "সেভ করা লোকেশন দেখুন"}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <MapPinOff className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />
              <p className="font-medium">লোকেশন পাওয়া যায়নি</p>
              <p className="text-sm text-muted-foreground mb-3">আপনি অফলাইন। ক্যাশে করা ডেটা দেখুন</p>
              <Button 
                variant="outline" 
                onClick={handleGetCurrentLocation}
                className="mt-2"
              >
                <Locate className="h-4 w-4 mr-2" />
                লোকেশন খুঁজুন
              </Button>
            </div>
          )}
        </div>
        
        {showSavedLocations && (
          <div className="absolute inset-0 bg-background p-4 overflow-y-auto">
            <SavedLocations onSelectLocation={handleSavedLocationSelect} />
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4" 
              onClick={() => setShowSavedLocations(false)}
            >
              ফিরে যান
            </Button>
          </div>
        )}
      </div>
    );
  }


  // Calculate marker position on map (percentage based)
  const getMarkerPosition = (lat: number, lng: number) => {
    const centerLat = 23.8103;
    const centerLng = 90.4125;
    const latRange = 0.15;
    const lngRange = 0.2;
    
    const x = Math.min(90, Math.max(10, 50 + ((lng - centerLng) / lngRange) * 50));
    const y = Math.min(90, Math.max(10, 50 - ((lat - centerLat) / latRange) * 50));
    return { x, y };
  };

  return (
    <div className="relative w-full h-[300px] bg-muted rounded-lg overflow-hidden">
      {/* ম্যাপের প্লেসহোল্ডার */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gradient-to-br from-green-100 via-green-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
      >
        {/* Map grid lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-muted-foreground/30" />
            ))}
          </div>
        </div>
        
        {/* Simulated roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted-foreground/30" />
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-muted-foreground/20" />
          <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-muted-foreground/20" />
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-muted-foreground/20" />
          <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-muted-foreground/20" />
        </div>

        {/* User location marker (Blue) */}
        {userLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ 
              left: `${getMarkerPosition(userLocation.lat, userLocation.lng).x}%`, 
              top: `${getMarkerPosition(userLocation.lat, userLocation.lng).y}%` 
            }}
          >
            {/* Pulse effect */}
            <div className="absolute inset-0 w-12 h-12 -ml-4 -mt-4">
              <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
            </div>
            
            {/* Marker */}
            <div className="relative w-8 h-8 bg-primary rounded-full border-3 border-background shadow-lg flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            
            {/* Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full shadow">
              আপনি এখানে
            </div>
          </div>
        )}

        {/* Item markers (Red) */}
        {listings.filter(l => l.latitude && l.longitude).map((listing) => {
          const pos = getMarkerPosition(listing.latitude!, listing.longitude!);
          const isSelected = selectedMarkerId === listing.id;
          const distance = userLocation 
            ? getDistanceLabel(calculateDistance(userLocation.lat, userLocation.lng, listing.latitude!, listing.longitude!))
            : null;
          
          return (
            <div
              key={listing.id}
              className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 z-10 ${isSelected ? 'z-30 scale-110' : 'hover:scale-110'}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => setSelectedMarkerId(isSelected ? null : listing.id)}
            >
              {/* Marker icon */}
              <div className="relative flex flex-col items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-background bg-destructive text-destructive-foreground">
                  <MapPin className="w-4 h-4" />
                </div>
                
                {/* Pin point */}
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] -mt-1 border-l-transparent border-r-transparent border-t-destructive" />
                
                {/* Popup on select */}
                {isSelected && (
                  <div className="absolute bottom-full mb-2 bg-background rounded-lg shadow-xl p-2 min-w-[140px] border z-40">
                    <p className="text-sm font-medium truncate">{listing.title}</p>
                    {listing.price && (
                      <p className="text-xs text-primary font-semibold">৳{listing.price.toLocaleString('bn-BD')}</p>
                    )}
                    {distance && (
                      <p className="text-xs text-muted-foreground">{distance} দূরে</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {listings.length === 0 && !userLocation && (
          <div className="flex flex-col items-center justify-center h-full">
            <MapPin className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              লোকেশন নির্বাচন করতে মানচিত্রে ক্লিক করুন<br />অথবা আপনার বর্তমান লোকেশন ব্যবহার করুন
            </p>
          </div>
        )}
      </div>
      
      {/* ফিল্টার পপওভার */}
      <div className="absolute top-4 left-4 flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm"
              variant="secondary" 
              className="bg-white/90 dark:bg-gray-800/90 shadow-md flex items-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              <span>ফিল্টার</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">ম্যাপ ফিল্টার সেটিংস</h4>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-filter">ফিল্টার সক্রিয় করুন</Label>
                <Switch 
                  id="enable-filter" 
                  checked={filters.enableFilter}
                  onCheckedChange={(checked) => handleFilterChange('enableFilter', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>সার্চ রেডিয়াস: {radius[0]} কিমি</Label>
                <Slider 
                  defaultValue={radius} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setRadius(value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="high-rated">শুধু উচ্চ রেটিং (৪+)</Label>
                <Switch 
                  id="high-rated" 
                  checked={filters.showOnlyHighRated}
                  onCheckedChange={(checked) => handleFilterChange('showOnlyHighRated', checked)}
                  disabled={!filters.enableFilter}
                />
              </div>
              
              <div className="space-y-2">
                <Label>ধরন</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {filterTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Switch 
                        id={`filter-${type}`}
                        checked={filters.selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          const updatedTypes = checked 
                            ? [...filters.selectedTypes, type]
                            : filters.selectedTypes.filter(t => t !== type);
                          handleFilterChange('selectedTypes', updatedTypes);
                        }}
                        disabled={!filters.enableFilter}
                      />
                      <Label htmlFor={`filter-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button
          size="sm"
          variant="secondary"
          className="bg-white/90 dark:bg-gray-800/90 shadow-md"
          onClick={() => setShowSavedLocations(!showSavedLocations)}
        >
          <Bookmark className="h-4 w-4 mr-2" />
          <span>সেভ করা</span>
        </Button>
      </div>
      
      {/* কন্ট্রোল */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white dark:bg-gray-800 shadow-md"
          onClick={handleGetCurrentLocation}
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white dark:bg-gray-800 shadow-md"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
      
      {/* লোকেশন ব্যাজ */}
      {userLocation && (
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-md flex items-center">
          <MapPin className="h-4 w-4 text-primary mr-2" />
          <span className="text-xs font-medium">
            {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </span>
        </div>
      )}
      
      {/* সেভ করা লোকেশন প্যানেল */}
      {showSavedLocations && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm p-4 overflow-y-auto transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">সেভ করা লোকেশন</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSavedLocations(false)}
            >
              বন্ধ করুন
            </Button>
          </div>
          <SavedLocations onSelectLocation={handleSavedLocationSelect} />
        </div>
      )}
    </div>
  );
};

export default MapView;
