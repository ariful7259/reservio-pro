
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, Bell, Percent, Clock, Navigation,
  Store, Zap, Gift, Target, Settings
} from 'lucide-react';

interface LocationOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  location: string;
  distance: string;
  category: string;
  validUntil: string;
  image: string;
  isUrgent?: boolean;
}

const LocationBasedOffers = () => {
  const { toast } = useToast();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [nearbyOffers, setNearbyOffers] = useState<LocationOffer[]>([]);

  const mockOffers: LocationOffer[] = [
    {
      id: '1',
      title: 'হোম ক্লিনিং স্পেশাল',
      description: 'সম্পূর্ণ বাড়ি পরিষ্কার করুন মাত্র ১২০০ টাকায়',
      discount: '৪০% ছাড়',
      location: 'ধানমন্ডি',
      distance: '০.৫ কিমি',
      category: 'ক্লিনিং',
      validUntil: '২ ঘন্টা বাকি',
      image: '/placeholder.svg',
      isUrgent: true
    },
    {
      id: '2',
      title: 'AC সার্ভিসিং অফার',
      description: 'যেকোনো AC সার্ভিসিং এবং গ্যাস চার্জ',
      discount: '২৫% ছাড়',
      location: 'গুলশান',
      distance: '১.২ কিমি',
      category: 'মেইনটেইনেন্স',
      validUntil: 'আজ মধ্যরাত পর্যন্ত',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'ইলেকট্রিক্যাল ওয়ার্ক',
      description: 'সব ধরনের ইলেকট্রিক কাজ বিশেষ দামে',
      discount: 'ফ্রি চেকআপ',
      location: 'বনানী',
      distance: '২.০ কিমি',
      category: 'ইলেকট্রিক্যাল',
      validUntil: 'কাল সন্ধ্যা পর্যন্ত',
      image: '/placeholder.svg'
    }
  ];

  useEffect(() => {
    if (locationEnabled) {
      // Simulate getting user location
      setCurrentLocation('ধানমন্ডি, ঢাকা');
      setNearbyOffers(mockOffers);
      
      toast({
        title: "লোকেশন সক্রিয় হয়েছে",
        description: "আপনার এলাকার অফারগুলো দেখাচ্ছি",
      });
    }
  }, [locationEnabled]);

  const requestLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationEnabled(true);
          console.log('Location granted:', position.coords);
        },
        (error) => {
          console.error('Location error:', error);
          toast({
            title: "লোকেশন অ্যাক্সেস প্রয়োজন",
            description: "আপনার কাছাকাছি অফার দেখতে লোকেশন অন করুন",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleOfferClick = (offer: LocationOffer) => {
    toast({
      title: "অফার সংরক্ষিত",
      description: `${offer.title} আপনার সেভ লিস্টে যোগ হয়েছে`,
    });
  };

  const handleBookNow = (offer: LocationOffer) => {
    toast({
      title: "বুকিং শুরু হয়েছে",
      description: `${offer.title} এর জন্য বুকিং প্রক্রিয়া শুরু`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-blue-600" />
            লোকেশন-ভিত্তিক অফার
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="location-toggle">লোকেশন অ্যাক্সেস</Label>
              <p className="text-sm text-muted-foreground">
                আপনার কাছাকাছি বিশেষ অফার পেতে
              </p>
            </div>
            <Switch
              id="location-toggle"
              checked={locationEnabled}
              onCheckedChange={requestLocationPermission}
            />
          </div>
          
          {currentLocation && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">বর্তমান অবস্থান: {currentLocation}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearby Offers */}
      {locationEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-600" />
              আপনার এলাকার বিশেষ অফার
              <Badge variant="outline">{nearbyOffers.length} টি অফার</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-32 object-cover"
                    />
                    {offer.isUrgent && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        <Zap className="h-3 w-3 mr-1" />
                        জরুরি
                      </Badge>
                    )}
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      {offer.discount}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{offer.title}</h3>
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span>{offer.location} • {offer.distance}</span>
                        </div>
                        <Badge variant="outline">{offer.category}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="h-3 w-3" />
                        <span>{offer.validUntil}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleOfferClick(offer)}
                          className="flex-1"
                        >
                          সেভ করুন
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookNow(offer)}
                          className="flex-1"
                        >
                          বুক করুন
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            নোটিফিকেশন সেটিংস
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>নতুন অফার নোটিফিকেশন</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>জরুরি অফার এলার্ট</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>প্রিয় ক্যাটাগরির অফার</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>অফার মেয়াদ শেষের রিমাইন্ডার</Label>
              <Switch />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              বিস্তারিত সেটিংস
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationBasedOffers;
