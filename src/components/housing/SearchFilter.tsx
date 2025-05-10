
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFilterProps {
  location: string;
  propertyType: string;
  budget: string;
  onLocationChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onSearch: () => void;
  language: 'bn' | 'en';
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  location,
  propertyType,
  budget,
  onLocationChange,
  onPropertyTypeChange,
  onBudgetChange,
  onSearch,
  language
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder={language === 'bn' ? "অবস্থান" : "Location"}
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
        
        <Select value={propertyType} onValueChange={onPropertyTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'bn' ? "সম্পত্তির ধরণ" : "Property Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
            <SelectItem value="apartment">{language === 'bn' ? "অ্যাপার্টমেন্ট" : "Apartment"}</SelectItem>
            <SelectItem value="house">{language === 'bn' ? "বাসা/বাড়ি" : "House"}</SelectItem>
            <SelectItem value="mess">{language === 'bn' ? "মেস" : "Mess"}</SelectItem>
            <SelectItem value="room">{language === 'bn' ? "রুম" : "Room"}</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={budget} onValueChange={onBudgetChange}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'bn' ? "বাজেট" : "Budget"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === 'bn' ? "সব" : "All"}</SelectItem>
            <SelectItem value="0-5000">{language === 'bn' ? "৫,০০০ টাকা পর্যন্ত" : "Up to 5,000 BDT"}</SelectItem>
            <SelectItem value="5000-10000">{language === 'bn' ? "৫,০০০-১০,০০০ টাকা" : "5,000-10,000 BDT"}</SelectItem>
            <SelectItem value="10000-20000">{language === 'bn' ? "১০,০০০-২০,০০০ টাকা" : "10,000-20,000 BDT"}</SelectItem>
            <SelectItem value="20000+">{language === 'bn' ? "২০,০০০+ টাকা" : "20,000+ BDT"}</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={onSearch} className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          {language === 'bn' ? "খুঁজুন" : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
