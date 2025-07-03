
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SubcategorySelectorProps {
  category: any;
  selectedSubcategory: string;
  onSubcategoryChange: (value: string) => void;
}

const SubcategorySelector: React.FC<SubcategorySelectorProps> = ({
  category,
  selectedSubcategory,
  onSubcategoryChange
}) => {
  // Use subcategories from category data or fallback to default
  const subcategories = category?.subcategories || [];

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        সাব-ক্যাটাগরি নির্বাচন করুন
      </label>
      <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">সব সাব-ক্যাটাগরি</SelectItem>
          {subcategories.map((subcategory: any, index: number) => (
            <SelectItem key={index} value={subcategory.name}>
              <div className="flex items-center gap-2">
                <span>{subcategory.name}</span>
                <Badge variant="outline" className="ml-auto">{subcategory.count}টি</Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubcategorySelector;
