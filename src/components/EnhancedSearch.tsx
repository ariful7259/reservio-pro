
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useApp } from '@/context/AppContext';
import VoiceSearch from '@/components/VoiceSearch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface EnhancedSearchProps {
  onSearch?: (searchParams: any) => void;
  className?: string;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ 
  onSearch = () => {}, 
  className = '' 
}) => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('relevance');

  // Selected category (for sub-categories)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'healthcare', name: language === 'bn' ? 'হেলথকেয়ার' : 'Healthcare' },
    { id: 'home', name: language === 'bn' ? 'হোম সার্ভিস' : 'Home Services' },
    { id: 'education', name: language === 'bn' ? 'শিক্ষা' : 'Education' },
    { id: 'beauty', name: language === 'bn' ? 'বিউটি' : 'Beauty' },
    { id: 'professional', name: language === 'bn' ? 'প্রফেশনাল' : 'Professional' },
    { id: 'legal', name: language === 'bn' ? 'লিগ্যাল' : 'Legal' },
    { id: 'tech', name: language === 'bn' ? 'টেক' : 'Tech' },
    { id: 'events', name: language === 'bn' ? 'ইভেন্টস' : 'Events' },
  ];

  const subCategories: Record<string, {id: string, name: string}[]> = {
    'healthcare': [
      { id: 'doctors', name: language === 'bn' ? 'ডাক্তার' : 'Doctors' },
      { id: 'diagnostics', name: language === 'bn' ? 'ডায়গনস্টিক' : 'Diagnostics' },
      { id: 'pharmacy', name: language === 'bn' ? 'ফার্মেসি' : 'Pharmacy' },
      { id: 'therapy', name: language === 'bn' ? 'থেরাপি' : 'Therapy' },
    ],
    'home': [
      { id: 'cleaning', name: language === 'bn' ? 'ক্লিনিং' : 'Cleaning' },
      { id: 'plumbing', name: language === 'bn' ? 'প্লাম্বিং' : 'Plumbing' },
      { id: 'electrical', name: language === 'bn' ? 'ইলেকট্রিক্যাল' : 'Electrical' },
      { id: 'gardening', name: language === 'bn' ? 'গার্ডেনিং' : 'Gardening' },
    ],
    // Add more subcategories for other categories
  };

  const handleVoiceSearch = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  const handleSearch = () => {
    onSearch({
      searchTerm,
      filters: selectedFilters,
      priceRange,
      sortBy,
      category: selectedCategory,
    });
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <VoiceSearch
            onSearch={handleVoiceSearch}
            placeholder={language === 'bn' ? 'সার্ভিস খুঁজুন...' : 'Search services...'}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={language === 'bn' ? 'সর্ট করুন' : 'Sort by'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">{language === 'bn' ? 'প্রাসঙ্গিকতা' : 'Relevance'}</SelectItem>
              <SelectItem value="price_low">{language === 'bn' ? 'দাম (কম থেকে বেশি)' : 'Price (Low to High)'}</SelectItem>
              <SelectItem value="price_high">{language === 'bn' ? 'দাম (বেশি থেকে কম)' : 'Price (High to Low)'}</SelectItem>
              <SelectItem value="rating">{language === 'bn' ? 'রেটিং' : 'Rating'}</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover open={advancedFilterOpen} onOpenChange={setAdvancedFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {language === 'bn' ? 'ক্যাটেগরি' : 'Categories'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {selectedCategory && subCategories[selectedCategory] && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {language === 'bn' ? 'সাব-ক্যাটেগরি' : 'Sub-Categories'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {subCategories[selectedCategory].map(subCategory => (
                        <Button
                          key={subCategory.id}
                          variant={selectedFilters.includes(subCategory.id) ? "default" : "outline"}
                          size="sm"
                          className="justify-start"
                          onClick={() => toggleFilter(subCategory.id)}
                        >
                          {subCategory.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2">
                    {language === 'bn' ? 'মূল্য পরিসীমা' : 'Price Range'}
                  </h4>
                  <Slider 
                    value={priceRange}
                    min={0}
                    max={10000}
                    step={500}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button onClick={() => {
                    handleSearch();
                    setAdvancedFilterOpen(false);
                  }}>
                    {language === 'bn' ? 'প্রয়োগ করুন' : 'Apply'}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map(filter => (
            <Badge key={filter} variant="secondary" className="cursor-pointer" onClick={() => toggleFilter(filter)}>
              {filter} ✕
            </Badge>
          ))}
          {selectedFilters.length > 0 && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedFilters([])}>
              {language === 'bn' ? 'সব মুছুন' : 'Clear all'}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
