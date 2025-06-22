
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, Share2 } from 'lucide-react';

interface SubcategoryResultsProps {
  subcategory: any;
  results: any[];
  onItemClick: (item: any) => void;
  onBookmark: (e: React.MouseEvent, itemId: number) => void;
  onShare: (e: React.MouseEvent, item: any) => void;
}

const SubcategoryResults: React.FC<SubcategoryResultsProps> = ({
  subcategory,
  results,
  onItemClick,
  onBookmark,
  onShare
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {subcategory.icon && <span className="text-2xl">{subcategory.icon}</span>}
          <div>
            <h2 className="text-xl font-bold">{subcategory.name}</h2>
            <p className="text-muted-foreground">{results.length}টি ফলাফল পাওয়া গেছে</p>
          </div>
        </div>
        {subcategory.filters?.location && (
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {subcategory.filters.location}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item, index) => (
          <Card 
            key={index} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
            onClick={() => onItemClick(item)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img 
                  src={item.image || `https://images.unsplash.com/photo-${1560448204 + index}?q=80&w=400&h=300&auto=format&fit=crop`} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white h-8 w-8 rounded-full"
                    onClick={(e) => onBookmark(e, item.id)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white h-8 w-8 rounded-full"
                    onClick={(e) => onShare(e, item)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                {item.featured && (
                  <Badge className="absolute top-2 left-2">ফিচার্ড</Badge>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.location}</span>
                </div>
                
                {item.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                    {item.reviews && (
                      <span className="text-sm text-muted-foreground">({item.reviews})</span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{item.price}</span>
                  {item.availability && (
                    <Badge variant="outline" className="text-green-600">
                      উপলব্ধ
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">এই ক্যাটাগরিতে কোন আইটেম পাওয়া যায়নি</p>
          <Button variant="outline">অন্য ক্যাটাগরি দেখুন</Button>
        </div>
      )}
    </div>
  );
};

export default SubcategoryResults;
