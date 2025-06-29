
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  onGetCurrentLocation: () => void;
  isGettingLocation: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onLocationChange,
  onGetCurrentLocation,
  isGettingLocation
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        <MapPin className="h-4 w-4 inline mr-1" />
        এলাকা
      </label>
      <div className="flex gap-2">
        <Select value={selectedLocation} onValueChange={onLocationChange}>
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
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation}
          title="লাইভ লোকেশন"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
