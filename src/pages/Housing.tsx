
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Home, ChevronRight, MapPin, Bed, Bath, Square, Heart, Wifi, WifiOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';

const Housing = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite, language, isOnline } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample housing listing data
  const housingListings = [
    {
      id: '1',
      title: 'সুন্দর আবাসিক অ্যাপার্টমেন্ট',
      location: 'গুলশান, ঢাকা',
      price: 20000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
    {
      id: '2',
      title: 'ফ্যামিলি হোম উত্তরা সেক্টর-১১',
      location: 'উত্তরা, ঢাকা',
      price: 35000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'house',
      isAvailable: true,
    },
    {
      id: '3',
      title: 'বাণিজ্যিক স্পেস ক্যান্টনমেন্ট',
      location: 'মিরপুর, ঢাকা',
      price: 15000,
      bedrooms: 2,
      bathrooms: 1,
      area: 1000,
      image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
  ];

  const handleToggleFavorite = (e: React.MouseEvent, listing: any) => {
    e.stopPropagation();
    
    if (isFavorite(listing.id)) {
      removeFromFavorites(listing.id);
    } else {
      addToFavorites({
        id: listing.id,
        type: 'housing',
        title: listing.title,
        image: listing.image,
        price: `${listing.price}/মাস`,
        location: listing.location
      });
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {!isOnline && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-center">
          <WifiOff className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">
              {language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode'}
            </p>
            <p className="text-xs">
              {language === 'bn' 
                ? 'আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে।' 
                : 'You are in offline mode. Some features may be limited.'}
            </p>
          </div>
        </div>
      )}
    
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? 'বাসা খুঁজুন' : 'Find Housing'}
        </h1>
        <p className="text-gray-500">
          {language === 'bn' 
            ? 'আপনার পছন্দের বাসা, ফ্ল্যাট এবং রুম'
            : 'Find your preferred house, flat or room'}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={language === 'bn' ? "লোকেশন, এলাকা খুঁজুন" : "Search location, area"}
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full bg-secondary/50 mb-4">
          <TabsTrigger value="all" className="flex-1">
            {language === 'bn' ? 'সব' : 'All'}
          </TabsTrigger>
          <TabsTrigger value="flat" className="flex-1">
            {language === 'bn' ? 'ফ্ল্যাট' : 'Flat'}
          </TabsTrigger>
          <TabsTrigger value="house" className="flex-1">
            {language === 'bn' ? 'বাড়ি' : 'House'}
          </TabsTrigger>
          <TabsTrigger value="room" className="flex-1">
            {language === 'bn' ? 'রুম' : 'Room'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <HousingList 
            listings={housingListings} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="flat">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'flat')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="house">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'house')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="room">
          <div className="text-center py-10 text-muted-foreground">
            {language === 'bn' ? 'কোনো রুম এখনো উপলব্ধ নেই' : 'No rooms available yet'}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface HousingListProps {
  listings: Array<{
    id: string;
    title: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: string;
    isAvailable: boolean;
  }>;
  handleToggleFavorite: (e: React.MouseEvent, listing: any) => void;
  isFavorite: (id: string) => boolean;
  language: 'bn' | 'en';
}

const HousingList: React.FC<HousingListProps> = ({ 
  listings,
  handleToggleFavorite,
  isFavorite,
  language
}) => {
  const navigate = useNavigate();

  if (listings.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {language === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি' : 'No results found'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 relative">
              <img 
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 sm:h-full object-cover"
                onClick={() => navigate(`/rent/${listing.id}`)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={(e) => handleToggleFavorite(e, listing)}
              >
                <Heart 
                  className={`h-4 w-4 ${isFavorite(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </Button>
            </div>
            <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-semibold text-lg cursor-pointer"
                    onClick={() => navigate(`/rent/${listing.id}`)}
                  >
                    {listing.title}
                  </h3>
                  <Badge variant={listing.isAvailable ? "default" : "secondary"}>
                    {listing.isAvailable 
                      ? language === 'bn' ? 'উপলব্ধ' : 'Available'
                      : language === 'bn' ? 'ভাড়া হয়ে গেছে' : 'Rented'}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  <div className="flex items-center text-sm">
                    <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} {language === 'bn' ? 'বেড' : 'Bed'}
                  </div>
                  <div className="flex items-center text-sm">
                    <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} {language === 'bn' ? 'বাথ' : 'Bath'}
                  </div>
                  <div className="flex items-center text-sm">
                    <Square className="h-4 w-4 mr-1" /> {listing.area} {language === 'bn' ? 'বর্গফুট' : 'sqft'}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-lg font-bold">৳ {listing.price.toLocaleString()}/{language === 'bn' ? 'মাস' : 'month'}</div>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={() => navigate(`/rent/${listing.id}`)}
                >
                  {language === 'bn' ? 'বিস্তারিত' : 'Details'} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Housing;
