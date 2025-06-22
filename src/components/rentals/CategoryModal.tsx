
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Filter, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSubcategoryClick = (subcategory: any) => {
    const filterData = {
      location: selectedLocation,
      priceRange,
      searchTerm
    };
    onSubcategoryClick({ ...subcategory, filters: filterData });
    onClose();
  };

  const filteredSubcategories = category?.subcategories?.filter((sub: any) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
                <Search className="h-4 w-4 inline mr-1" />
                খুঁজুন
              </label>
              <Input
                placeholder="সাব-ক্যাটাগরি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                    description: `${filteredSubcategories.length}টি ফলাফল পাওয়া গেছে`
                  });
                }}
              >
                ফিল্টার প্রয়োগ করুন
              </Button>
            </div>
          </div>

          {/* Subcategories Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">সাব-ক্যাটাগরি সমূহ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubcategories.map((subcategory: any, index: number) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:scale-105"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {subcategory.icon && <span className="text-lg">{subcategory.icon}</span>}
                      <h4 className="font-medium">{subcategory.name}</h4>
                    </div>
                    <Badge variant="outline">{subcategory.count}টি</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    এই ক্যাটাগরিতে {subcategory.count}টি আইটেম রয়েছে
                  </p>
                </div>
              ))}
            </div>

            {filteredSubcategories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>কোন সাব-ক্যাটাগরি পাওয়া যায়নি</p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setSearchTerm('')}
                  >
                    সব দেখুন
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
