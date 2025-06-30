
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Filter, Tag, MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MarketplaceCategoryFilterProps {
  category: any;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  language: string;
}

const MarketplaceCategoryFilter: React.FC<MarketplaceCategoryFilterProps> = ({
  category,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange,
  language
}) => {
  const { toast } = useToast();

  const handleApplyFilter = () => {
    toast({
      title: language === 'bn' ? "ফিল্টার প্রয়োগ করা হয়েছে" : "Filter Applied",
      description: selectedSubcategory ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
    });
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
          <div className={category.iconColor}>
            {category.icon}
          </div>
        </div>
        <h3 className="font-semibold">
          {language === 'bn' ? category.name : category.nameEn || category.name}
        </h3>
        <Badge variant="secondary">{category.count} {language === 'bn' ? 'পণ্য' : 'items'}</Badge>
        {category.isNew && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-600">নতুন</Badge>
        )}
        {category.isHot && (
          <Badge variant="secondary" className="bg-red-100 text-red-600">হট</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Subcategory Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'bn' ? 'সাব-ক্যাটাগরি' : 'Subcategory'}
          </label>
          <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? 'সাব-ক্যাটাগরি নির্বাচন করুন' : 'Select Subcategory'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব সাব-ক্যাটাগরি' : 'All Subcategories'}</SelectItem>
              {category?.subcategories?.map((sub: any, index: number) => (
                <SelectItem key={index} value={sub.name || sub}>{sub.name || sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'bn' ? 'এলাকা' : 'Location'}
          </label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? 'এলাকা নির্বাচন করুন' : 'Select Location'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব এলাকা' : 'All Areas'}</SelectItem>
              <SelectItem value="gulshan">গুলশান</SelectItem>
              <SelectItem value="banani">বনানী</SelectItem>
              <SelectItem value="dhanmondi">ধানমন্ডি</SelectItem>
              <SelectItem value="uttara">উত্তরা</SelectItem>
              <SelectItem value="mohammadpur">মোহাম্মদপুর</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'bn' ? 'মূল্য পরিসীমা' : 'Price Range'}
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={language === 'bn' ? 'সর্বনিম্ন' : 'Min'}
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            />
            <Input
              type="number"
              placeholder={language === 'bn' ? 'সর্বোচ্চ' : 'Max'}
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <div className="flex items-end">
          <Button className="w-full gap-2" onClick={handleApplyFilter}>
            <Filter className="h-4 w-4" />
            {language === 'bn' ? 'ফিল্টার প্রয়োগ করুন' : 'Apply Filter'}
          </Button>
        </div>
      </div>

      {/* Additional Category Info */}
      <div className="mt-4 text-sm text-muted-foreground">
        <p>{category.description || (language === 'bn' ? 'এই ক্যাটাগরিতে বিভিন্ন ধরনের পণ্য পাবেন' : 'Find various products in this category')}</p>
      </div>
    </div>
  );
};

export default MarketplaceCategoryFilter;
