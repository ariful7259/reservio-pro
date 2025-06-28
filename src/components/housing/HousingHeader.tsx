
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HousingHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  language?: string;
  filterVisible?: boolean;
  onSubcategorySelect?: (subcategory: string) => void;
}

const HousingHeader: React.FC<HousingHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  language = 'bn',
  filterVisible = false,
  onSubcategorySelect
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const housingSubcategories = [
    { value: 'apartment', label: 'অ্যাপার্টমেন্ট' },
    { value: 'house', label: 'বাড়ি' },
    { value: 'flat', label: 'ফ্ল্যাট' },
    { value: 'single', label: 'সিঙ্গেল রুম' },
    { value: 'shared', label: 'শেয়ার্ড রুম' },
    { value: 'mess', label: 'মেস' },
    { value: 'hostel', label: 'হোস্টেল' }
  ];

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    if (onSubcategorySelect) {
      onSubcategorySelect(value);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'bn' ? 'বাসা খুঁজুন...' : 'Search homes...'}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Housing Type Dropdown */}
        <Select value={selectedSubcategory} onValueChange={handleSubcategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="বাসার ধরন নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {housingSubcategories.map((subcategory) => (
              <SelectItem key={subcategory.value} value={subcategory.value}>
                {subcategory.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onFilterClick}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {language === 'bn' ? 'ফিল্টার' : 'Filter'}
          {filterVisible ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default HousingHeader;
