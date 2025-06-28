
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface HousingHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  language: 'bn' | 'en';
}

const HousingHeader: React.FC<HousingHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  language
}) => {
  const isMobile = useIsMobile();
  const [selectedHousingType, setSelectedHousingType] = useState('');

  const housingTypes = [
    { value: 'apartment', label: language === 'bn' ? 'অ্যাপার্টমেন্ট/ফ্ল্যাট' : 'Apartment/Flat' },
    { value: 'house', label: language === 'bn' ? 'বাসা/বাড়ি' : 'House' },
    { value: 'mess', label: language === 'bn' ? 'মেস/হোস্টেল' : 'Mess/Hostel' },
    { value: 'single', label: language === 'bn' ? 'সিঙ্গেল রুম' : 'Single Room' },
    { value: 'shared', label: language === 'bn' ? 'শেয়ারড রুম' : 'Shared Room' },
    { value: 'flat', label: language === 'bn' ? 'ফ্ল্যাট' : 'Flat' },
    { value: 'hostel', label: language === 'bn' ? 'হোস্টেল' : 'Hostel' }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? 'বাসা খুঁজুন' : 'Find Housing'}
        </h1>
        <p className="text-gray-500">
          {language === 'bn' 
            ? 'আপনার পছন্দের বাসা, ফ্ল্যাট এবং রুম'
            : 'Find your preferred house, flat or room'}
        </p>
      </div>

      <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex items-center gap-3'} mb-6`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={language === 'bn' ? "লোকেশন, এলাকা খুঁজুন" : "Search location, area"}
            className="pl-9"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className={isMobile ? "w-full" : "min-w-[200px]"}>
          <Select value={selectedHousingType} onValueChange={setSelectedHousingType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? "হাউজিং টাইপ" : "Housing Type"} />
            </SelectTrigger>
            <SelectContent>
              {housingTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          size="icon" 
          variant="outline"
          onClick={onFilterClick}
          className={isMobile ? "w-full justify-center" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          {isMobile && <span>{language === 'bn' ? 'ফিল্টার' : 'Filter'}</span>}
        </Button>
      </div>
    </>
  );
};

export default HousingHeader;
