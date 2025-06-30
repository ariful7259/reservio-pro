
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import ServiceCategoryFilterForm from './ServiceCategoryFilterForm';

interface ServiceCategoryFiltersProps {
  categoryTitle: string;
  categoryId: string | undefined;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const ServiceCategoryFilters: React.FC<ServiceCategoryFiltersProps> = ({
  categoryTitle,
  categoryId,
  showFilters,
  setShowFilters,
  sortBy,
  setSortBy,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange
}) => {
  return (
    <>
      {/* Filter Section */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4"
        >
          <Filter className="h-4 w-4 mr-2" />
          ফিল্টার {showFilters ? 'লুকান' : 'দেখান'}
        </Button>
        
        {showFilters && (
          <ServiceCategoryFilterForm
            category={{ title: categoryTitle, id: categoryId }}
            selectedSubcategory={selectedSubcategory}
            selectedLocation={selectedLocation}
            priceRange={priceRange}
            onSubcategoryChange={onSubcategoryChange}
            onLocationChange={onLocationChange}
            onPriceRangeChange={onPriceRangeChange}
          />
        )}
      </div>
      
      {/* Sort Section */}
      <div className="flex justify-end mb-6">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="সর্ট করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
            <SelectItem value="price_low">দাম (কম থেকে বেশি)</SelectItem>
            <SelectItem value="price_high">দাম (বেশি থেকে কম)</SelectItem>
            <SelectItem value="rating">রেটিং</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ServiceCategoryFilters;
