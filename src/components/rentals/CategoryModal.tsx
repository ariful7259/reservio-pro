
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import CategoryModalHeader from './CategoryModalHeader';
import CategoryFilterForm from './CategoryFilterForm';
import SelectedSubcategoryDisplay from './SelectedSubcategoryDisplay';

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
        <CategoryModalHeader category={category} />

        <div className="space-y-6">
          <CategoryFilterForm
            category={category}
            selectedSubcategory={selectedSubcategory}
            selectedLocation={selectedLocation}
            priceRange={priceRange}
            isGettingLocation={isGettingLocation}
            onSubcategoryChange={handleSubcategorySelect}
            onLocationChange={setSelectedLocation}
            onPriceRangeChange={setPriceRange}
            onGetCurrentLocation={getCurrentLocation}
          />

          <SelectedSubcategoryDisplay
            selectedSubcategory={selectedSubcategory}
            category={category}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
