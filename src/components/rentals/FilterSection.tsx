
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Navigation, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FilterSectionProps {
  filterVisible: boolean;
  toggleFilter: () => void;
  selectedCategory?: any;
  onSubcategorySelect?: (subcategory: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  filterVisible, 
  toggleFilter, 
  selectedCategory,
  onSubcategorySelect 
}) => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsGettingLocation(false);
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: "আপনার বর্তমান লোকেশন সংরক্ষিত হয়েছে"
          });
        },
        (error) => {
          setIsGettingLocation(false);
          toast({
            title: "ত্রুটি",
            description: "লোকেশন পেতে সমস্যা হয়েছে",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    if (selectedCategory && onSubcategorySelect) {
      const subcategory = selectedCategory.subcategories?.find((sub: any) => sub.name === value);
      if (subcategory) {
        onSubcategorySelect(subcategory);
      }
    }
  };

  return (
    <div className="mb-6">
      {/* Search Bar with Subcategory Dropdown */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="রেন্টাল আইটেম খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Subcategory Dropdown */}
        {selectedCategory?.subcategories && (
          <Select value={selectedSubcategory} onValueChange={handleSubcategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory.subcategories.map((subcategory: any, index: number) => (
                <SelectItem key={index} value={subcategory.name}>
                  <div className="flex items-center gap-2">
                    {subcategory.icon && <span>{subcategory.icon}</span>}
                    <span>{subcategory.name}</span>
                    <span className="text-xs text-muted-foreground">({subcategory.count}টি)</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button variant="outline" onClick={toggleFilter}>
          <Filter className="h-4 w-4 mr-2" />
          ফিল্টার
          {filterVisible ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
      </div>

      {/* Advanced Filter Section */}
      {filterVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg animate-in slide-in-from-top-2">
          <div>
            <label className="text-sm font-medium mb-2 block">
              <MapPin className="h-4 w-4 inline mr-1" />
              এলাকা
            </label>
            <div className="flex gap-2">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">ঢাকা</SelectItem>
                  <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                  <SelectItem value="khulna">খুলনা</SelectItem>
                  <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                  <SelectItem value="sylhet">সিলেট</SelectItem>
                  <SelectItem value="barisal">বরিশাল</SelectItem>
                  <SelectItem value="rangpur">রংপুর</SelectItem>
                  <SelectItem value="mymensingh">ময়মনসিংহ</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                title="লাইভ লোকেশন"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              মূল্য সীমা
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="সর্বনিম্ন"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                type="number"
              />
              <Input
                placeholder="সর্বোচ্চ"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                type="number"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "ফিল্টার প্রয়োগ করা হয়েছে",
                  description: "নতুন ফিল্টার অনুযায়ী ফলাফল দেখানো হচ্ছে"
                });
              }}
            >
              ফিল্টার প্রয়োগ করুন
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
