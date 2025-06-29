
import React from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PriceRangeFilterProps {
  priceRange: { min: string; max: string };
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  onPriceRangeChange
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        <Filter className="h-4 w-4 inline mr-1" />
        মূল্য সীমা
      </label>
      <div className="flex gap-2">
        <Input
          placeholder="সর্বনিম্ন"
          value={priceRange.min}
          onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
          type="number"
        />
        <Input
          placeholder="সর্বোচ্চ"
          value={priceRange.max}
          onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
          type="number"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
