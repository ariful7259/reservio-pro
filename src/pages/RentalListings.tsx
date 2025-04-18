
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const RentalListings = () => {
  const navigate = useNavigate();
  
  const rentals = [
    {
      id: "1",
      title: "৩ বেডরুম অ্যাপার্টমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳২৫,০০০/মাস",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      category: "আবাসিক",
    },
    {
      id: "2",
      title: "অফিস স্পেস",
      location: "বনানী, ঢাকা",
      price: "৳৫০,০০০/মাস",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      category: "বাণিজ্যিক",
    },
    {
      id: "3",
      title: "২ বেডরুম ফ্ল্যাট",
      location: "মিরপুর, ঢাকা",
      price: "৳১৮,০০০/মাস",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop",
      category: "আবাসিক",
    },
    {
      id: "4",
      title: "শো-রুম স্পেস",
      location: "উত্তরা, ঢাকা",
      price: "৳৩৫,০০০/মাস",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
      category: "বাণিজ্যিক",
    },
  ];

  return (
    <div className="container pt-20 pb-10 px-4">
      <h1 className="text-2xl font-bold mb-6">ভাড়ার তালিকা</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rentals.map((rental) => (
          <Card 
            key={rental.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => navigate(`/rentals/${rental.id}`)}
          >
            <div className="relative aspect-square">
              <img 
                src={rental.image} 
                alt={rental.title} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2">{rental.category}</Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-1">{rental.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{rental.location}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-bold text-primary">{rental.price}</p>
                <div className="flex items-center text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentalListings;
