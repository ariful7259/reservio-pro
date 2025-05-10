
import React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Property {
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

export default PropertyCard;
