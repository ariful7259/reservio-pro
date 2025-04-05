
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ProductAttribute } from '@/utils/categoryData';

interface ProductFilterSidebarProps {
  attributes: ProductAttribute[];
  priceRange: [number, number];
  onFilterChange: (filters: any) => void;
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  attributes,
  priceRange,
  onFilterChange
}) => {
  const { language } = useApp();
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>(priceRange);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setCurrentPriceRange(newRange);
  };
  
  const handleAttributeChange = (attributeId: string, optionId: string, checked: boolean) => {
    setSelectedAttributes(prev => {
      const current = prev[attributeId] || [];
      let updated: string[];
      
      if (checked) {
        updated = [...current, optionId];
      } else {
        updated = current.filter(id => id !== optionId);
      }
      
      return {
        ...prev,
        [attributeId]: updated
      };
    });
  };
  
  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange: currentPriceRange,
      attributes: selectedAttributes,
      rating: selectedRating
    });
  };
  
  const resetFilters = () => {
    setCurrentPriceRange(priceRange);
    setSelectedAttributes({});
    setSelectedRating(null);
    onFilterChange({
      priceRange: priceRange,
      attributes: {},
      rating: null
    });
  };
  
  return (
    <Card className="p-4 h-full">
      <h3 className="font-medium mb-4">
        {language === 'bn' ? 'ফিল্টার করুন' : 'Filter Products'}
      </h3>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">
          {language === 'bn' ? 'মূল্য সীমা' : 'Price Range'}
        </h4>
        <Slider
          defaultValue={currentPriceRange}
          min={priceRange[0]}
          max={priceRange[1]}
          step={100}
          value={currentPriceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>৳{currentPriceRange[0]}</span>
          <span>৳{currentPriceRange[1]}</span>
        </div>
      </div>
      
      <Separator className="mb-4" />
      
      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">
          {language === 'bn' ? 'রেটিং' : 'Rating'}
        </h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox 
                id={`rating-${rating}`} 
                checked={selectedRating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="ml-2 text-xs">
                  {language === 'bn' ? 'এবং উপরে' : '& up'}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="mb-4" />
      
      {/* Attribute Filters */}
      {attributes.map(attribute => (
        <div key={attribute.id} className="mb-6">
          <h4 className="text-sm font-medium mb-3">
            {language === 'bn' ? attribute.nameBN : attribute.name}
          </h4>
          <div className="space-y-2">
            {attribute.options.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox 
                  id={`${attribute.id}-${option.id}`}
                  checked={selectedAttributes[attribute.id]?.includes(option.id) || false}
                  onCheckedChange={(checked) => 
                    handleAttributeChange(attribute.id, option.id, checked as boolean)
                  }
                />
                <Label htmlFor={`${attribute.id}-${option.id}`}>
                  {language === 'bn' ? option.valueBN : option.value}
                </Label>
              </div>
            ))}
          </div>
          <Separator className="mt-4 mb-4" />
        </div>
      ))}
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          {language === 'bn' ? 'রিসেট করুন' : 'Reset'}
        </Button>
        <Button size="sm" onClick={applyFilters}>
          {language === 'bn' ? 'ফিল্টার করুন' : 'Apply Filters'}
        </Button>
      </div>
    </Card>
  );
};

export default ProductFilterSidebar;
