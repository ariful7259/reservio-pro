
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

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
  const { language } = useApp();

  const handleApplyFilter = () => {
    toast({
      title: language === 'bn' ? "ফিল্টার প্রয়োগ করা হয়েছে" : "Filter Applied",
      description: selectedSubcategory ? `${selectedSubcategory} ${language === 'bn' ? 'নির্বাচিত' : 'selected'}` : (language === 'bn' ? "ফিল্টার প্রয়োগ করা হয়েছে" : "Filter applied")
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
            <div className={category.iconColor}>
              {category.icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {language === 'bn' ? category.name : category.nameEn || category.name}
            </h3>
            <p className="text-sm text-muted-foreground">{category.count}{language === 'bn' ? 'টি সার্ভিস' : ' services'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Subcategory Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'bn' ? 'সাব-ক্যাটাগরি' : 'Subcategory'}
            </label>
            <Select value={selectedSubcategory} onValueChange={onSubcategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'সাব-ক্যাটাগরি নির্বাচন করুন' : 'Select subcategory'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'bn' ? 'সব সাব-ক্যাটাগরি' : 'All subcategories'}</SelectItem>
                {category?.subcategories?.map((sub: string, index: number) => (
                  <SelectItem key={index} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              {language === 'bn' ? 'এলাকা' : 'Location'}
            </label>
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'এলাকা নির্বাচন করুন' : 'Select location'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'bn' ? 'সব এলাকা' : 'All locations'}</SelectItem>
                <SelectItem value="gulshan">{language === 'bn' ? 'গুলশান' : 'Gulshan'}</SelectItem>
                <SelectItem value="banani">{language === 'bn' ? 'বনানী' : 'Banani'}</SelectItem>
                <SelectItem value="dhanmondi">{language === 'bn' ? 'ধানমন্ডি' : 'Dhanmondi'}</SelectItem>
                <SelectItem value="uttara">{language === 'bn' ? 'উত্তরা' : 'Uttara'}</SelectItem>
                <SelectItem value="mohammadpur">{language === 'bn' ? 'মোহাম্মদপুর' : 'Mohammadpur'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
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
            <Button className="w-full" onClick={handleApplyFilter}>
              {language === 'bn' ? 'ফিল্টার প্রয়োগ করুন' : 'Apply Filter'}
            </Button>
          </div>
        </div>

        {/* Booking Types */}
        <div className="mt-4">
          <h4 className="font-medium mb-2">
            {language === 'bn' ? 'বুকিং টাইপ:' : 'Booking Types:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.bookingTypes.map((type: string, index: number) => (
              <Badge key={index} variant="secondary">{type}</Badge>
            ))}
          </div>
        </div>

        {/* Monetization Info */}
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">{category.monetization}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryFilterForm;
