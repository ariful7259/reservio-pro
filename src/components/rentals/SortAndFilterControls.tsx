
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface SortAndFilterControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  itemCount: number;
}

const SortAndFilterControls: React.FC<SortAndFilterControlsProps> = ({
  sortBy,
  onSortChange,
  itemCount
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-muted-foreground">
        <span>{itemCount} আইটেম পাওয়া গেছে</span>
      </div>
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={onSortChange}>
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
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SortAndFilterControls;
