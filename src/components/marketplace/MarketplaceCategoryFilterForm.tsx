
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface MarketplaceCategoryFilterFormProps {
  category: any;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const MarketplaceCategoryFilterForm: React.FC<MarketplaceCategoryFilterFormProps> = ({
  category,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange
}) => {
  const { toast } = useToast();

  const handleApplyFilter = () => {
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: selectedSubcategory ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
    });
  };

  const subcategories = {
    electronics: ['মোবাইল ফোন', 'ল্যাপটপ', 'টিভি', 'ক্যামেরা', 'হেডফোন'],
    fashion: ['পুরুষদের পোশাক', 'মহিলাদের পোশাক', 'জুতা', 'ব্যাগ', 'অ্যাক্সেসরিজ'],
    home: ['আসবাবপত্র', 'হোম ডেকোর', 'কিচেন', 'বেডরুম', 'বাথরুম'],
    books: ['শিক্ষামূলক বই', 'উপন্যাস', 'ধর্মীয় বই', 'স্টেশনারি', 'নোটবুক']
  };

  return (
    // Note: The parent (category card) provides the container styling.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Subcategory Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">সাব-ক্যাটাগরি</Label>
        <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব সাব-ক্যাটাগরি</SelectItem>
            {subcategories[category?.id as keyof typeof subcategories]?.map((sub: string, index: number) => (
              <SelectItem key={index} value={sub}>{sub}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">এলাকা</Label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="এলাকা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব এলাকা</SelectItem>
            <SelectItem value="dhaka">ঢাকা</SelectItem>
            <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
            <SelectItem value="sylhet">সিলেট</SelectItem>
            <SelectItem value="rajshahi">রাজশাহী</SelectItem>
            <SelectItem value="khulna">খুলনা</SelectItem>
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
          />
          <Input
            type="number"
            placeholder="সর্বোচ্চ"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
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

export default MarketplaceCategoryFilterForm;
