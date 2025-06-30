
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceCategoryFilterFormProps {
  category: any;
  selectedSubcategory: string;
  selectedLocation: string;
  priceRange: { min: string; max: string };
  onSubcategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
}

const ServiceCategoryFilterForm: React.FC<ServiceCategoryFilterFormProps> = ({
  category,
  selectedSubcategory,
  selectedLocation,
  priceRange,
  onSubcategoryChange,
  onLocationChange,
  onPriceRangeChange
}) => {
  const { toast } = useToast();

  // Sample subcategories for different service categories
  const getSubcategories = (categoryId: string) => {
    const subcategoryData: { [key: string]: any[] } = {
      'home-services': [
        { name: 'এসি সার্ভিস', count: 25 },
        { name: 'প্লাম্বিং', count: 18 },
        { name: 'ইলেকট্রিক্যাল', count: 20 },
        { name: 'ক্লিনিং', count: 15 },
        { name: 'পেইন্টিং', count: 12 }
      ],
      'education': [
        { name: 'টিউটরিং', count: 35 },
        { name: 'ল্যাঙ্গুয়েজ', count: 20 },
        { name: 'প্রোগ্রামিং', count: 15 },
        { name: 'মিউজিক', count: 12 },
        { name: 'আর্ট', count: 8 }
      ],
      'health': [
        { name: 'ফিজিওথেরাপি', count: 15 },
        { name: 'নার্সিং', count: 12 },
        { name: 'ম্যাসাজ', count: 10 },
        { name: 'ইয়োগা', count: 8 },
        { name: 'ডায়েট', count: 6 }
      ]
    };

    return subcategoryData[categoryId] || [];
  };

  const subcategories = getSubcategories(category?.id);

  const handleApplyFilter = () => {
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: selectedSubcategory !== 'all' ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Subcategory Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">সাব-ক্যাটাগরি</label>
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

      {/* Location Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">এলাকা</label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="এলাকা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব এলাকা</SelectItem>
            <SelectItem value="gulshan">গুলশান</SelectItem>
            <SelectItem value="banani">বনানী</SelectItem>
            <SelectItem value="dhanmondi">ধানমন্ডি</SelectItem>
            <SelectItem value="uttara">উত্তরা</SelectItem>
            <SelectItem value="mohammadpur">মোহাম্মদপুর</SelectItem>
            <SelectItem value="mirpur">মিরপুর</SelectItem>
            <SelectItem value="wari">ওয়ারী</SelectItem>
            <SelectItem value="old-dhaka">পুরান ঢাকা</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">মূল্য পরিসীমা</label>
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

export default ServiceCategoryFilterForm;
