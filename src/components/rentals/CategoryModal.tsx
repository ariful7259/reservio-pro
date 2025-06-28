
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
  onSubcategoryClick: (subcategory: any) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSubcategoryClick
}) => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
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

  const handleSubcategorySelect = (value: string) => {
    setSelectedSubcategory(value);
    const subcategory = category?.subcategories?.find((sub: any) => sub.name === value);
    if (subcategory) {
      const filterData = {
        location: selectedLocation,
        priceRange,
        selectedSubcategory: value
      };
      onSubcategoryClick({ ...subcategory, filters: filterData });
      onClose();
    }
  };

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {category.icon}
            <span>{category.name}</span>
            <Badge variant="secondary">{category.count}টি</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-2 block">
                সাব-ক্যাটাগরি নির্বাচন করুন
              </label>
              <Select value={selectedSubcategory} onValueChange={handleSubcategorySelect}>
                <SelectTrigger>
                  <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {category?.subcategories?.map((subcategory: any, index: number) => (
                    <SelectItem key={index} value={subcategory.name}>
                      <div className="flex items-center gap-2">
                        {subcategory.icon && <span>{subcategory.icon}</span>}
                        <span>{subcategory.name}</span>
                        <Badge variant="outline" className="ml-auto">{subcategory.count}টি</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
                <Filter className="h-4 w-4 inline mr-1" />
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
                    description: selectedSubcategory ? `${selectedSubcategory} নির্বাচিত` : "ফিল্টার প্রয়োগ করা হয়েছে"
                  });
                }}
              >
                ফিল্টার প্রয়োগ করুন
              </Button>
            </div>
          </div>

          {/* Show selected subcategory details */}
          {selectedSubcategory && (
            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold mb-2">নির্বাচিত সাব-ক্যাটাগরি</h3>
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedSubcategory}</span>
                <Badge variant="secondary">
                  {category?.subcategories?.find((sub: any) => sub.name === selectedSubcategory)?.count}টি আইটেম
                </Badge>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
