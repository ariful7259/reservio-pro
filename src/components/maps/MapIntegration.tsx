import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star,
  Bookmark,
  Share2,
  X
} from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  isOpen: boolean;
  coordinates: { lat: number; lng: number };
  distance: string;
  estimatedTime: string;
  description: string;
}

interface MapIntegrationProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
  userLocation?: { lat: number; lng: number };
}

export const MapIntegration: React.FC<MapIntegrationProps> = ({
  isOpen,
  onClose,
  vendor,
  userLocation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && vendor && mapRef.current) {
      // Initialize map (using Mapbox as example)
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, vendor]);

  const initializeMap = async () => {
    if (!vendor || !mapRef.current) return;

    try {
      // This would be replaced with actual Mapbox implementation
      // For now, showing a placeholder
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div class="text-center p-4">
            <div class="text-2xl mb-2">🗺️</div>
            <p class="text-sm text-gray-600">Map showing route to ${vendor.name}</p>
            <p class="text-xs text-gray-500 mt-1">Mapbox integration required</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleGetDirections = () => {
    if (!vendor) return;
    
    // Open in default maps app
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${vendor.coordinates.lat},${vendor.coordinates.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCallVendor = () => {
    if (vendor?.phone) {
      window.open(`tel:${vendor.phone}`, '_self');
    }
  };

  const handleBookmark = () => {
    // Add to favorites functionality
    console.log('Bookmark vendor:', vendor);
  };

  const handleShare = () => {
    if (vendor && navigator.share) {
      navigator.share({
        title: vendor.name,
        text: `${vendor.description}`,
        url: window.location.href
      });
    }
  };

  if (!vendor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {vendor.name} এর দিকনির্দেশনা
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 flex">
            {/* Map Area */}
            <div className="flex-1 p-4">
              <div 
                ref={mapRef}
                className="w-full h-full rounded-lg border shadow-sm"
              />
            </div>

            {/* Vendor Info Sidebar */}
            <div className="w-80 border-l bg-muted/30 p-4 overflow-y-auto">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{vendor.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{vendor.rating}</span>
                        </div>
                        <Badge variant={vendor.isOpen ? "default" : "secondary"}>
                          {vendor.isOpen ? "খোলা" : "বন্ধ"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={handleBookmark}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">ঠিকানা</p>
                      <p className="text-sm text-muted-foreground">{vendor.address}</p>
                    </div>
                  </div>

                  {/* Distance & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">দূরত্ব</p>
                        <p className="text-sm font-medium">{vendor.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">সময়</p>
                        <p className="text-sm font-medium">{vendor.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm font-medium mb-2">বিবরণ</p>
                    <p className="text-sm text-muted-foreground">{vendor.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4 border-t">
                    <Button 
                      onClick={handleGetDirections}
                      className="w-full"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      দিকনির্দেশনা পান
                    </Button>
                    
                    {vendor.phone && (
                      <Button 
                        variant="outline" 
                        onClick={handleCallVendor}
                        className="w-full"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        কল করুন
                      </Button>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                    <p className="font-medium mb-1">💡 টিপস:</p>
                    <ul className="space-y-1">
                      <li>• যাওয়ার আগে কল করে নিশ্চিত হন</li>
                      <li>• ট্রাফিক অনুযায়ী সময় বাড়তে পারে</li>
                      <li>• GPS চালু রাখুন সঠিক দিকনির্দেশনার জন্য</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};