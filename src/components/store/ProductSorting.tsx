import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, TrendingUp, Clock, DollarSign } from 'lucide-react';

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'popular';

interface ProductSortingProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'newest', label: 'নতুন প্রথমে', icon: <Clock className="h-4 w-4" /> },
  { value: 'oldest', label: 'পুরাতন প্রথমে', icon: <Clock className="h-4 w-4" /> },
  { value: 'price-low', label: 'মূল্য: কম থেকে বেশি', icon: <DollarSign className="h-4 w-4" /> },
  { value: 'price-high', label: 'মূল্য: বেশি থেকে কম', icon: <DollarSign className="h-4 w-4" /> },
  { value: 'popular', label: 'জনপ্রিয়', icon: <TrendingUp className="h-4 w-4" /> },
];

const ProductSorting: React.FC<ProductSortingProps> = ({
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="সর্ট করুন" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSorting;
