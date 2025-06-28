
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { rentCategories } from '@/data/rentalCategoriesData';

interface FilterSectionProps {
  filterVisible: boolean;
  toggleFilter: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filterVisible, toggleFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const getSubcategories = () => {
    const category = rentCategories.find(cat => cat.name === selectedCategory);
    return category?.subcategories || [];
  };

  if (!filterVisible) return null;
  
  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="font-medium mb-3">ফিল্টার</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">লোকেশন</label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="dhaka">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="এলাকা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dhaka">ঢাকা</SelectItem>
                <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                <SelectItem value="khulna">খুলনা</SelectItem>
                <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                <SelectItem value="sylhet">সিলেট</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">ক্যাটাগরি</label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {rentCategories.map((category, index) => (
                <SelectItem key={index} value={category.name}>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory && getSubcategories().length > 0 && (
          <div>
            <label className="text-sm font-medium mb-1 block">সাব-ক্যাটাগরি</label>
            <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {getSubcategories().map((subcategory: any, index: number) => (
                  <SelectItem key={index} value={subcategory.name}>
                    <div className="flex items-center gap-2">
                      {subcategory.icon && <span>{subcategory.icon}</span>}
                      <span>{subcategory.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">({subcategory.count}টি)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
          <div className="px-2">
            <Slider defaultValue={[25000]} max={100000} step={1000} />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>৳১,০০০</span>
              <span>৳৫০,০০০</span>
              <span>৳১,০০,০০০</span>
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">দূরত্ব</label>
          <div className="px-2">
            <Slider defaultValue={[5]} max={20} step={1} />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>1 কিমি</span>
              <span>10 কিমি</span>
              <span>20 কিমি</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button className="flex-1">ফিল্টার করুন</Button>
        <Button variant="outline" onClick={toggleFilter}>বাতিল করুন</Button>
      </div>
    </div>
  );
};

export default FilterSection;
