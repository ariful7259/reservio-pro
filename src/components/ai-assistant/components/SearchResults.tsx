
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, MapPin, Star } from 'lucide-react';

interface SearchResultItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
  category: string;
  location?: string;
  rating?: number;
  type: 'product' | 'service' | 'rental';
}

interface SearchResultsProps {
  query: string;
  results: SearchResultItem[];
  relatedItems: SearchResultItem[];
  onItemClick: (item: SearchResultItem) => void;
  onBookmark: (item: SearchResultItem) => void;
  onShare: (item: SearchResultItem) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  relatedItems,
  onItemClick,
  onBookmark,
  onShare
}) => {
  const renderItem = (item: SearchResultItem, isRelated = false) => (
    <Card 
      key={item.id} 
      className={`cursor-pointer hover:shadow-lg transition-shadow ${isRelated ? 'w-full' : 'w-full'}`}
      onClick={() => onItemClick(item)}
    >
      <CardContent className="p-3">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
        )}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
            <div className="flex gap-1 ml-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(item);
                }}
                className="h-6 w-6 p-0"
              >
                <Heart className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(item);
                }}
                className="h-6 w-6 p-0"
              >
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary text-sm">{item.price}</span>
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
          </div>
          
          {item.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              {item.location}
            </div>
          )}
          
          {item.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{item.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (results.length === 0 && relatedItems.length === 0) {
    return null;
  }

  return (
    <div className="p-3 border-t bg-gray-50/50 max-h-80 overflow-y-auto">
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          "{query}" এর জন্য ফলাফল
        </h4>
        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {results.slice(0, 3).map(item => renderItem(item))}
          </div>
        )}
        
        {relatedItems.length > 0 && (
          <>
            <h5 className="text-sm font-medium text-gray-600 mb-2">সম্পর্কিত আইটেম</h5>
            <div className="grid grid-cols-2 gap-2">
              {relatedItems.slice(0, 4).map(item => renderItem(item, true))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
