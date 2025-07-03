
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceCategoryFilterFormProps {
  category: any;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  onApplyFilter?: () => void;
}

const ServiceCategoryFilterForm: React.FC<ServiceCategoryFilterFormProps> = ({
  category,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange,
  onApplyFilter
}) => {
  const { toast } = useToast();

  const handleApplyFilter = () => {
    if (onApplyFilter) {
      onApplyFilter();
    } else {
      toast({
        title: "ফিল্টার প্রয়োগ করা হয়েছে",
        description: selectedSubcategory !== 'all' ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
      });
    }
  };

  const dhakaCityAreas = [
    'গুলশান', 'বনানী', 'ধানমন্ডি', 'মোহাম্মদপুর', 'উত্তরা', 'মিরপুর', 
    'বারিধারা', 'বসুন্ধরা', 'ওয়ারী', 'পুরান ঢাকা', 'রমনা', 'তেজগাঁও'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Subcategory Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">সাব-ক্যাটাগরি</Label>
        <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব সাব-ক্যাটাগরি</SelectItem>
            {category?.subcategories?.map((subcategory: string, index: number) => (
              <SelectItem key={index} value={subcategory}>
                {subcategory}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Show selected subcategory as badges */}
        {selectedSubcategory !== 'all' && (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              variant="default" 
              className="cursor-pointer"
              onClick={() => onSubcategoryChange('all')}
            >
              {selectedSubcategory} ✕
            </Badge>
          </div>
        )}
      </div>

      {/* Location Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          এলাকা
        </Label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="এলাকা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব এলাকা</SelectItem>
            {dhakaCityAreas.map((area, index) => (
              <SelectItem key={index} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">মূল্য পরিসীমা</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="সর্বনিম্ন"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="সর্বোচ্চ"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      {/* Apply Filter Button */}
      <div className="flex items-end">
        <Button className="w-full" onClick={handleApplyFilter}>
          ফিল্টার প্রয়োগ করুন
        </Button>
      </div>
    </div>
  );
};

export default ServiceCategoryFilterForm;
