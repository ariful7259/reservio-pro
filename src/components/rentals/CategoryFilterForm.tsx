
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SubcategorySelector from './SubcategorySelector';
import LocationSelector from './LocationSelector';
import PriceRangeFilter from './PriceRangeFilter';

interface CategoryFilterFormProps {
  category: any;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  isGettingLocation: boolean;
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  onGetCurrentLocation: () => void;
}

const CategoryFilterForm: React.FC<CategoryFilterFormProps> = ({
  category,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  isGettingLocation,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange,
  onGetCurrentLocation
}) => {
  const { toast } = useToast();

  const handleApplyFilter = () => {
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: selectedSubcategory ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      {category && (
        <SubcategorySelector
          category={category}
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChange={onSubcategoryChange}
        />
      )}

      <LocationSelector
        selectedLocation={selectedLocation}
        onLocationChange={onLocationChange}
        onGetCurrentLocation={onGetCurrentLocation}
        isGettingLocation={isGettingLocation}
      />

      <PriceRangeFilter
        priceRange={priceRange}
        onPriceRangeChange={onPriceRangeChange}
      />

      <div className="flex items-end">
        <Button className="w-full" onClick={handleApplyFilter}>
          ফিল্টার প্রয়োগ করুন
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilterForm;
