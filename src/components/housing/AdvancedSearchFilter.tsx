import React, { useState } from 'react';
import { Search, MapPin, Filter, X, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { dhakaAreas, propertyTypes, budgetRanges, amenitiesList } from '@/data/enhanced-property-data';
import GenderVerifiedDropdown from "./GenderVerifiedDropdown";

interface SearchFilters {
  location: string;
  propertyType: string;
  budget: string;
  furnishing: string;
  amenities: string[];
  priceRange: [number, number];
  bedrooms: string;
  keywords: string;
  gender: 'any' | 'male' | 'female' | 'couple';
  verified: boolean;
  premium: boolean;
}

interface AdvancedSearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
  language: 'bn' | 'en';
  className?: string;
}

const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  onSearch,
  language,
  className = ''
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    propertyType: 'all',
    budget: 'all',
    furnishing: 'all',
    amenities: [],
    priceRange: [5000, 50000],
    bedrooms: 'all',
    keywords: '',
    gender: 'any',
    verified: false,
    premium: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateActiveFilters(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const updateActiveFilters = (currentFilters: SearchFilters) => {
    const active: string[] = [];
    
    if (currentFilters.location) active.push(`এলাকা: ${currentFilters.location}`);
    if (currentFilters.propertyType !== 'all') {
      const type = propertyTypes.find(t => t.value === currentFilters.propertyType);
      active.push(`ধরন: ${type?.label}`);
    }
    if (currentFilters.budget !== 'all') {
      const budget = budgetRanges.find(b => b.value === currentFilters.budget);
      active.push(`বাজেট: ${budget?.label}`);
    }
    if (currentFilters.furnishing !== 'all') {
      active.push(`ফার্নিশিং: ${currentFilters.furnishing}`);
    }
    if (currentFilters.bedrooms !== 'all') {
      active.push(`বেডরুম: ${currentFilters.bedrooms}`);
    }
    if (currentFilters.amenities.length > 0) {
      active.push(`সুবিধা: ${currentFilters.amenities.length}টি`);
    }
    if (currentFilters.gender && currentFilters.gender !== "any") {
      let bnGender = currentFilters.gender === "male" ? "ছেলে" : currentFilters.gender === "female" ? "মেয়ে" : "কাপল";
      active.push(`জনপ্রকার: ${bnGender}`);
    }
    if (currentFilters.verified) {
      active.push("Verified");
    }
    if (currentFilters.premium) {
      active.push("Premium");
    }

    setActiveFilters(active);
  };

  const clearFilter = (filterText: string) => {
    if (filterText.startsWith('এলাকা:')) {
      handleFilterChange('location', '');
    } else if (filterText.startsWith('ধরন:')) {
      handleFilterChange('propertyType', 'all');
    } else if (filterText.startsWith('বাজেট:')) {
      handleFilterChange('budget', 'all');
    } else if (filterText.startsWith('ফার্নিশিং:')) {
      handleFilterChange('furnishing', 'all');
    } else if (filterText.startsWith('বেডরুম:')) {
      handleFilterChange('bedrooms', 'all');
    } else if (filterText.startsWith('সুবিধা:')) {
      handleFilterChange('amenities', []);
    } else if (filterText.startsWith('জনপ্রকার:')) {
      handleFilterChange('gender', 'any');
    } else if (filterText === "Verified") {
      handleFilterChange('verified', false);
    } else if (filterText === "Premium") {
      handleFilterChange('premium', false);
    }
  };

  const clearAllFilters = () => {
    const defaultFilters: SearchFilters = {
      location: '',
      propertyType: 'all',
      budget: 'all',
      furnishing: 'all',
      amenities: [],
      priceRange: [5000, 50000],
      bedrooms: 'all',
      keywords: '',
      gender: 'any',
      verified: false,
      premium: false,
    };
    setFilters(defaultFilters);
    setActiveFilters([]);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'bn' ? "এলাকা, ঠিকানা বা কীওয়ার্ড খুঁজুন" : "Search area, address or keywords"}
            className="pl-9"
            value={filters.keywords}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            খুঁজুন
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Sliders className="h-4 w-4" />
            ফিল্টার
          </Button>
        </div>
      </div>

      {/* NEW: Combined Quick Filters (location/property/budget) + Dropdown */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 flex-1">
          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger className="w-auto min-w-[120px]">
              <SelectValue placeholder="এলাকা" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">সব এলাকা</SelectItem>
              {dhakaAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
            <SelectTrigger className="w-auto min-w-[120px]">
              <SelectValue placeholder="ধরন" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.budget} onValueChange={(value) => handleFilterChange('budget', value)}>
            <SelectTrigger className="w-auto min-w-[120px]">
              <SelectValue placeholder="বাজেট" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Gender & Verified/Premium as Dropdown -- to the right of budget */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <GenderVerifiedDropdown
            gender={filters.gender}
            verified={filters.verified}
            premium={filters.premium}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">সক্রিয় ফিল্টার:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => clearFilter(filter)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            সব মুছুন
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                বিস্তারিত ফিল্টার
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Furnishing */}
                <div>
                  <label className="text-sm font-medium mb-2 block">ফার্নিশিং</label>
                  <Select value={filters.furnishing} onValueChange={(value) => handleFilterChange('furnishing', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="ফার্নিশিং স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ধরন</SelectItem>
                      <SelectItem value="furnished">ফার্নিশড</SelectItem>
                      <SelectItem value="semi-furnished">সেমি-ফার্নিশড</SelectItem>
                      <SelectItem value="unfurnished">আনফার্নিশড</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-medium mb-2 block">বেডরুম</label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="বেডরুম সংখ্যা" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব</SelectItem>
                      <SelectItem value="1">১ বেডরুম</SelectItem>
                      <SelectItem value="2">২ বেডরুম</SelectItem>
                      <SelectItem value="3">৩ বেডরুম</SelectItem>
                      <SelectItem value="4+">৪+ বেডরুম</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    মূল্য সীমা: ৳{filters.priceRange[0].toLocaleString()} - ৳{filters.priceRange[1].toLocaleString()}
                  </label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                      max={100000}
                      min={3000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm font-medium mb-2 block">সুবিধাসমূহ</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <label htmlFor={amenity} className="text-sm cursor-pointer">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSearch} className="flex-1">
                  ফিল্টার প্রয়োগ করুন
                </Button>
                <Button variant="outline" onClick={clearAllFilters}>
                  রিসেট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedSearchFilter;
