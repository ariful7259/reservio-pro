
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  ShoppingBag, 
  Coffee, 
  Home, 
  Calendar, 
  Building, 
  PaintBucket, 
  Wrench, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WalletNearbyServices = () => {
  const [expanded, setExpanded] = useState(false);
  const [radius, setRadius] = useState("3");

  const nearbyServices = [
    { 
      id: '1', 
      name: 'শাহ্ রেস্টুরেন্ট', 
      type: 'restaurant',
      distance: '0.3 কিমি',
      icon: <Coffee className="h-4 w-4" />,
      rating: 4.5,
      hasOffer: true
    },
    { 
      id: '2', 
      name: 'মেডিল ফার্মেসি', 
      type: 'pharmacy',
      distance: '0.5 কিমি',
      icon: <ShoppingBag className="h-4 w-4" />,
      rating: 4.2,
      hasOffer: false
    },
    { 
      id: '3', 
      name: 'আজিমপুর আবাসন', 
      type: 'housing',
      distance: '1.2 কিমি',
      icon: <Home className="h-4 w-4" />,
      rating: 4.7,
      hasOffer: true
    },
    { 
      id: '4', 
      name: 'ডাঃ আহমেদ ক্লিনিক', 
      type: 'medical',
      distance: '1.5 কিমি',
      icon: <Calendar className="h-4 w-4" />,
      rating: 4.8,
      hasOffer: false
    },
    { 
      id: '5', 
      name: 'এসি রিপেয়ার সার্ভিস', 
      type: 'repair',
      distance: '1.7 কিমি',
      icon: <Wrench className="h-4 w-4" />,
      rating: 4.3,
      hasOffer: true
    },
    { 
      id: '6', 
      name: 'হোম পেইন্টিং', 
      type: 'painting',
      distance: '2.0 কিমি',
      icon: <PaintBucket className="h-4 w-4" />,
      rating: 4.1,
      hasOffer: false
    },
    { 
      id: '7', 
      name: 'রকি মুভার্স পরিবহন', 
      type: 'movers',
      distance: '2.3 কিমি',
      icon: <Building className="h-4 w-4" />,
      rating: 4.6,
      hasOffer: true
    },
  ];

  const displayedServices = expanded ? nearbyServices : nearbyServices.slice(0, 4);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(e.target.value);
    // In a real app, this would trigger a new search with the updated radius
  };

  return (
    <Card className="border mb-6">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">আপনার কাছাকাছি সার্ভিস</h3>
          <div className="flex items-center gap-2">
            <select 
              value={radius} 
              onChange={handleRadiusChange}
              className="text-sm px-2 py-1 border rounded bg-background"
            >
              <option value="1">১ কিমি</option>
              <option value="3">৩ কিমি</option>
              <option value="5">৫ কিমি</option>
              <option value="10">১০ কিমি</option>
            </select>
            <Button variant="link" className="p-0 text-sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? "কম দেখুন" : "সব দেখুন"}
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {displayedServices.map(service => (
            <div key={service.id} className="flex items-center justify-between p-3 hover:bg-secondary/30 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {service.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-medium">{service.name}</h4>
                    {service.hasOffer && <Badge className="text-xs bg-red-500">অফার</Badge>}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{service.distance}</span>
                    </div>
                    <div className="flex items-center ml-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{service.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">বিস্তারিত</Button>
            </div>
          ))}
        </div>
        
        {nearbyServices.length > 4 && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 flex items-center justify-center" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> সংক্ষিপ্ত করুন
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> আরও {nearbyServices.length - 4} টি দেখুন
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletNearbyServices;
