
import React, { useState } from 'react';
import { Search, Filter, X, Check, SlidersHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';

export interface SearchFilters {
  query: string;
  category?: string;
  priceRange: [number, number];
  sortBy?: string;
  location?: string;
  rating?: number;
  availability?: boolean;
  tags: string[];
}

interface AdvancedSearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  categories?: string[];
  sortOptions?: string[];
  maxPrice?: number;
  showTags?: boolean;
  availableTags?: string[];
  initialFilters?: Partial<SearchFilters>;
  className?: string;
}

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  onSearch,
  categories = [],
  sortOptions = [],
  maxPrice = 10000,
  showTags = true,
  availableTags = [],
  initialFilters = {},
  className
}) => {
  const { language } = useApp();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialFilters.query || '',
    category: initialFilters.category || undefined,
    priceRange: initialFilters.priceRange || [0, maxPrice],
    sortBy: initialFilters.sortBy || undefined,
    location: initialFilters.location || undefined,
    rating: initialFilters.rating || undefined,
    availability: initialFilters.availability || false,
    tags: initialFilters.tags || [],
  });
  
  // Calculate active filters count (excluding query)
  React.useEffect(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (filters.sortBy) count++;
    if (filters.location) count++;
    if (filters.rating) count++;
    if (filters.availability) count++;
    if (filters.tags.length > 0) count++;
    setActiveFiltersCount(count);
  }, [filters, maxPrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, query: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value });
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sortBy: value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleRatingChange = (value: string) => {
    setFilters({ ...filters, rating: parseInt(value) });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilters({ ...filters, priceRange: [values[0], values[1]] });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFilters({ ...filters, availability: checked });
  };

  const toggleTag = (tag: string) => {
    if (filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: filters.tags.filter(t => t !== tag),
      });
    } else {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag],
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: undefined,
      priceRange: [0, maxPrice],
      sortBy: undefined,
      location: undefined,
      rating: undefined,
      availability: false,
      tags: [],
    });
  };

  const handleSearch = () => {
    onSearch(filters);
    setIsFilterSheetOpen(false);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={language === 'bn' ? "সার্চ করুন..." : "Search..."}
            value={filters.query}
            onChange={handleInputChange}
            className="pl-9 pr-12"
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setFilters({ ...filters, query: '' })}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {language === 'bn' ? 'উন্নত অনুসন্ধান ফিল্টার' : 'Advanced Search Filters'}
              </SheetTitle>
            </SheetHeader>
            
            <div className="py-4 space-y-5">
              {/* Category Selection */}
              {categories.length > 0 && (
                <div className="space-y-2">
                  <Label>
                    {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </Label>
                  <Select 
                    value={filters.category} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'bn' ? "ক্যাটাগরি নির্বাচন করুন" : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>
                    {language === 'bn' ? 'মূল্য পরিসীমা' : 'Price Range'}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    ৳{filters.priceRange[0]} - ৳{filters.priceRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
              </div>
              
              {/* Location Filter */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  {language === 'bn' ? 'লোকেশন' : 'Location'}
                </Label>
                <Input
                  id="location"
                  placeholder={language === 'bn' ? "লোকেশন টাইপ করুন" : "Enter location"}
                  value={filters.location || ''}
                  onChange={handleLocationChange}
                />
              </div>
              
              {/* Rating Filter */}
              <div className="space-y-2">
                <Label>
                  {language === 'bn' ? 'নূন্যতম রেটিং' : 'Minimum Rating'}
                </Label>
                <Select 
                  value={filters.rating?.toString()} 
                  onValueChange={handleRatingChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'bn' ? "রেটিং নির্বাচন করুন" : "Select rating"} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating}⭐{language === 'bn' ? ' এবং উপরে' : ' and above'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Availability Toggle */}
              <div className="flex items-center justify-between">
                <Label>
                  {language === 'bn' ? 'শুধুমাত্র উপলব্ধ আইটেম' : 'Only Available Items'}
                </Label>
                <Switch
                  checked={filters.availability}
                  onCheckedChange={handleAvailabilityChange}
                />
              </div>
              
              {/* Sort By */}
              {sortOptions.length > 0 && (
                <div className="space-y-2">
                  <Label>
                    {language === 'bn' ? 'সাজানোর ক্রম' : 'Sort By'}
                  </Label>
                  <Select 
                    value={filters.sortBy} 
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'bn' ? "সাজানোর ক্রম নির্বাচন করুন" : "Select sort order"} />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Tags Selection */}
              {showTags && availableTags.length > 0 && (
                <div className="space-y-2">
                  <Label>
                    {language === 'bn' ? 'ট্যাগ' : 'Tags'}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => {
                      const isSelected = filters.tags.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {isSelected && <Check className="h-3 w-3 mr-1" />}
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <SheetFooter className="mt-2">
              <Button variant="outline" onClick={clearFilters}>
                {language === 'bn' ? 'সাফ করুন' : 'Clear'}
              </Button>
              <Button onClick={handleSearch}>
                {language === 'bn' ? 'খুঁজুন' : 'Search'}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* Sort By Popover for quick access */}
        {sortOptions.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {language === 'bn' ? 'সাজানোর ক্রম' : 'Sort By'}
                </p>
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      filters.sortBy === option ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => {
                      setFilters({ ...filters, sortBy: option });
                      onSearch({ ...filters, sortBy: option });
                    }}
                  >
                    <span className="text-sm">{option}</span>
                    {filters.sortBy === option && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}: {filters.category}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, category: undefined })}
              />
            </Badge>
          )}
          
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'মূল্য' : 'Price'}: ৳{filters.priceRange[0]}-৳{filters.priceRange[1]}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, priceRange: [0, maxPrice] })}
              />
            </Badge>
          )}
          
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'লোকেশন' : 'Location'}: {filters.location}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, location: undefined })}
              />
            </Badge>
          )}
          
          {filters.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'রেটিং' : 'Rating'}: {filters.rating}⭐+
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, rating: undefined })}
              />
            </Badge>
          )}
          
          {filters.availability && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'শুধু উপলব্ধ' : 'Only Available'}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, availability: false })}
              />
            </Badge>
          )}
          
          {filters.sortBy && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {language === 'bn' ? 'সাজানো' : 'Sorted'}: {filters.sortBy}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setFilters({ ...filters, sortBy: undefined })}
              />
            </Badge>
          )}
          
          {filters.tags.length > 0 && filters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
          
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
            {language === 'bn' ? 'সব মুছুন' : 'Clear all'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilters;
