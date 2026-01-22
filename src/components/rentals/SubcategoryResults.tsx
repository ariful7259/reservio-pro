
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import RentalCard from './RentalCard';

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((item, index) => (
          <RentalCard
            key={index}
            listing={{
              id: item.id,
              title: item.title,
              location: item.location,
              price: item.price,
              image: item.image || `https://images.unsplash.com/photo-${1560448204 + index}?q=80&w=400&h=300&auto=format&fit=crop`,
              rating: item.rating,
              reviews: item.reviews,
              featured: item.featured,
              availability: item.availability
            }}
            variant="compact"
            onBookmark={onBookmark}
            onShare={onShare}
            onClick={() => onItemClick(item)}
            showActions={true}
          />
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
