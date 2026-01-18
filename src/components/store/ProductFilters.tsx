import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  totalProducts: number;
  filteredCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalProducts,
  filteredCount
}) => {
  const hasFilters = searchQuery || selectedCategory;

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="প্রোডাক্ট খুঁজুন..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => onSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="সব ক্যাটাগরি" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters & Results Count */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {filteredCount === totalProducts 
            ? `${totalProducts} টি প্রোডাক্ট`
            : `${filteredCount} / ${totalProducts} টি প্রোডাক্ট`
          }
        </span>

        {hasFilters && (
          <>
            <span className="text-muted-foreground">•</span>
            
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                "{searchQuery}"
                <button onClick={() => onSearchChange('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button onClick={() => onCategoryChange('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={clearFilters}
            >
              সব ফিল্টার মুছুন
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;