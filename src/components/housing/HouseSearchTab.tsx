
import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

// Types
interface Property {
  id: string;
  title: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  address: string;
  image: string;
  featured: boolean;
}

interface HouseSearchTabProps {
  language: 'bn' | 'en';
}

const HouseSearchTab: React.FC<HouseSearchTabProps> = ({ language }) => {
  const isMobile = useIsMobile();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [budget, setBudget] = useState('all');

  // Sample property data
  const properties: Property[] = [
    {
      id: '1',
      title: 'সুন্দর আবাসিক অ্যাপার্টমেন্ট',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      price: 20000,
      address: 'গুলশান, ঢাকা',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: true,
    },
    {
      id: '2',
      title: 'ফ্যামিলি হোম উত্তরা সেক্টর-১১',
      type: 'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      price: 35000,
      address: 'উত্তরা, ঢাকা',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: true,
    },
    {
      id: '3',
      title: 'সুন্দর সিঙ্গেল রুম ভাড়া হবে',
      type: 'room',
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      price: 8000,
      address: 'মিরপুর, ঢাকা',
      image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: false,
    },
    {
      id: '4',
      title: 'নিউ মার্কেট এলাকায় শেয়ার্ড রুম',
      type: 'room',
      bedrooms: 1,
      bathrooms: 1,
      area: 200,
      price: 6000,
      address: 'নিউ মার্কেট, ঢাকা',
      image: 'https://images.unsplash.com/photo-1523688471150-efdd09f0f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: false,
    },
    {
      id: '5',
      title: 'ছাত্রদের জন্য আদর্শ মেস',
      type: 'mess',
      bedrooms: 1,
      bathrooms: 1,
      area: 180,
      price: 7500,
      address: 'শাহবাগ, ঢাকা',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: false,
    },
    {
      id: '6',
      title: 'মডার্ন ফ্ল্যাট - আরামদায়ক জীবনযাপন',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      price: 18000,
      address: 'মোহাম্মদপুর, ঢাকা',
      image: 'https://images.unsplash.com/photo-1534595038511-9f219fe0c979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      featured: true,
    },
  ];

  const handleSearch = () => {
    // Implement actual search functionality
    console.log('Searching with filters:', { location, propertyType, budget });
  };

  const featuredProperties = properties.filter(property => property.featured);
  
  return (
    <div>
      {/* Search Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder={language === 'bn' ? "অবস্থান" : "Location"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "সম্পত্তির ধরণ" : "Property Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="apartment">{language === 'bn' ? "অ্যাপার্টমেন্ট" : "Apartment"}</SelectItem>
              <SelectItem value="house">{language === 'bn' ? "বাসা/বাড়ি" : "House"}</SelectItem>
              <SelectItem value="mess">{language === 'bn' ? "মেস" : "Mess"}</SelectItem>
              <SelectItem value="room">{language === 'bn' ? "রুম" : "Room"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "বাজেট" : "Budget"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
              <SelectItem value="0-5000">{language === 'bn' ? "৫,০০০ টাকা পর্যন্ত" : "Up to 5,000 BDT"}</SelectItem>
              <SelectItem value="5000-10000">{language === 'bn' ? "৫,০০০-১০,০০০ টাকা" : "5,000-10,000 BDT"}</SelectItem>
              <SelectItem value="10000-20000">{language === 'bn' ? "১০,০০০-২০,০০০ টাকা" : "10,000-20,000 BDT"}</SelectItem>
              <SelectItem value="20000+">{language === 'bn' ? "২০,০০০+ টাকা" : "20,000+ BDT"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            {language === 'bn' ? "খুঁজুন" : "Search"}
          </Button>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{language === 'bn' ? "বিশেষ প্রস্তাব" : "Special Offers"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} language={language} featured={true} />
          ))}
        </div>
      </div>

      {/* All Properties Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{language === 'bn' ? "সব সম্পত্তি" : "All Properties"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} language={language} featured={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  language: 'bn' | 'en';
  featured: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, language, featured }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
      <div className="relative">
        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {language === 'bn' ? "বিশেষ" : "Special"}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-1 inline-block" /> {property.address}
        </p>
        
        <div className="flex justify-between mb-4">
          <span className="text-primary font-bold text-lg">৳ {property.price.toLocaleString()}/{language === 'bn' ? "মাস" : "month"}</span>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center"><Bed className="h-4 w-4 mr-1" /> {property.bedrooms}</span>
          <span className="flex items-center"><Bath className="h-4 w-4 mr-1" /> {property.bathrooms}</span>
          <span className="flex items-center"><Square className="h-4 w-4 mr-1" /> {property.area} {language === 'bn' ? "বর্গফুট" : "sqft"}</span>
        </div>
        
        <Button className="w-full">
          {language === 'bn' ? "বিস্তারিত দেখুন" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HouseSearchTab;
