
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ShoppingBag, Coffee, Home, Calendar } from 'lucide-react';

const WalletNearbyServices = () => {
  const nearbyServices = [
    { 
      id: '1', 
      name: 'শাহ্ রেস্টুরেন্ট', 
      type: 'restaurant',
      distance: '0.3 কিমি',
      icon: <Coffee className="h-4 w-4" />
    },
    { 
      id: '2', 
      name: 'মেডিল ফার্মেসি', 
      type: 'pharmacy',
      distance: '0.5 কিমি',
      icon: <ShoppingBag className="h-4 w-4" />
    },
    { 
      id: '3', 
      name: 'আজিমপুর আবাসন', 
      type: 'housing',
      distance: '1.2 কিমি',
      icon: <Home className="h-4 w-4" />
    },
    { 
      id: '4', 
      name: 'ডাঃ আহমেদ ক্লিনিক', 
      type: 'medical',
      distance: '1.5 কিমি',
      icon: <Calendar className="h-4 w-4" />
    },
  ];

  return (
    <Card className="border mb-6">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">আপনার কাছাকাছি সার্ভিস</h3>
          <Button variant="link" className="p-0 text-sm">সব দেখুন</Button>
        </div>
        
        <div className="space-y-3">
          {nearbyServices.map(service => (
            <div key={service.id} className="flex items-center justify-between p-3 hover:bg-secondary/30 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.distance}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">বিস্তারিত</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletNearbyServices;
