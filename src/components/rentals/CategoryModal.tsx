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

          {/* Category Description */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{category.name} সম্পর্কে</h3>
            <p className="text-sm text-muted-foreground">
              এই বিভাগে {category.count}টি আইটেম রয়েছে। আপনার প্রয়োজন অনুযায়ী সঠিক আইটেম খুঁজে নিন।
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
