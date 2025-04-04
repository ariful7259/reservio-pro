
import { useState, useEffect } from 'react';
import { MapPin, Star, Trash2, MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  timestamp: number;
}

interface SavedLocationsProps {
  onSelectLocation?: (lat: number, lng: number) => void;
}

export default function SavedLocations({ onSelectLocation }: SavedLocationsProps) {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const { toast } = useToast();

  // লোকাল স্টোরেজ থেকে সেভ করা লোকেশন লোড করা
  useEffect(() => {
    const storedLocations = localStorage.getItem('saved-locations');
    if (storedLocations) {
      try {
        const parsedLocations = JSON.parse(storedLocations);
        setSavedLocations(parsedLocations);
      } catch (error) {
        console.error('লোকেশন পার্স করতে সমস্যা হয়েছে:', error);
      }
    }
  }, []);

  // লোকেশন সেভ করার ফাংশন
  const saveCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // রিভার্স জিওকোডিং - একটি বাস্তব অ্যাপ্লিকেশনে এটি একটি API কল হবে
            const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} এর কাছাকাছি স্থান`;
            
            const newLocation: SavedLocation = {
              id: Date.now().toString(),
              name: `সেভ করা লোকেশন ${savedLocations.length + 1}`,
              latitude,
              longitude,
              address,
              timestamp: Date.now()
            };
            
            const updatedLocations = [...savedLocations, newLocation];
            setSavedLocations(updatedLocations);
            localStorage.setItem('saved-locations', JSON.stringify(updatedLocations));
            
            toast({
              title: "লোকেশন সেভ করা হয়েছে",
              description: `${newLocation.name} সফলভাবে সংরক্ষণ করা হয়েছে।`,
            });
          } catch (error) {
            toast({
              title: "লোকেশন সেভ করা যায়নি",
              description: "লোকেশন সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
              variant: "destructive",
            });
          }
        },
        (error) => {
          toast({
            title: "লোকেশন অ্যাক্সেস করা যায়নি",
            description: "আপনার লোকেশন অ্যাক্সেস করতে অনুমতি দিন।",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "লোকেশন অ্যাক্সেস করা যায়নি",
        description: "আপনার ব্রাউজারে জিওলোকেশন সাপোর্ট নেই।",
        variant: "destructive",
      });
    }
  };

  // লোকেশন ডিলিট করার ফাংশন
  const deleteLocation = (id: string) => {
    const updatedLocations = savedLocations.filter(location => location.id !== id);
    setSavedLocations(updatedLocations);
    localStorage.setItem('saved-locations', JSON.stringify(updatedLocations));
    
    toast({
      title: "লোকেশন মুছে ফেলা হয়েছে",
      description: "লোকেশন সফলভাবে মুছে ফেলা হয়েছে।",
    });
  };

  // লোকেশন নির্বাচন করার ফাংশন
  const selectLocation = (latitude: number, longitude: number) => {
    if (onSelectLocation) {
      onSelectLocation(latitude, longitude);
      toast({
        title: "লোকেশন নির্বাচিত",
        description: "সেভ করা লোকেশন ম্যাপে দেখানো হচ্ছে।",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">সেভ করা লোকেশনসমূহ</h3>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          onClick={saveCurrentLocation}
        >
          <MapPin className="h-4 w-4" />
          <span>বর্তমান লোকেশন সেভ করুন</span>
        </Button>
      </div>
      
      {savedLocations.length === 0 ? (
        <Card className="border border-dashed">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <MapPinOff className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">কোনো সেভ করা লোকেশন নেই</p>
            <p className="text-sm text-muted-foreground mt-2">আপনার বর্তমান লোকেশন সেভ করতে উপরের বাটনে ক্লিক করুন</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {savedLocations.map((location) => (
            <Card key={location.id} className="border">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(location.timestamp).toLocaleString('bn-BD')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => selectLocation(location.latitude, location.longitude)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => deleteLocation(location.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
