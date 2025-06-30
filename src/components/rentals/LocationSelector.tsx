
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

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
        এলাকা নির্বাচন করুন
      </label>
      <div className="flex gap-2">
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="এলাকা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব এলাকা</SelectItem>
            <SelectItem value="gulshan">গুলশান</SelectItem>
            <SelectItem value="banani">বনানী</SelectItem>
            <SelectItem value="dhanmondi">ধানমন্ডি</SelectItem>
            <SelectItem value="uttara">উত্তরা</SelectItem>
            <SelectItem value="mohammadpur">মোহাম্মদপুর</SelectItem>
            <SelectItem value="mirpur">মিরপুর</SelectItem>
            <SelectItem value="wari">ওয়ারী</SelectItem>
            <SelectItem value="old-dhaka">পুরান ঢাকা</SelectItem>
            <SelectItem value="tejgaon">তেজগাঁও</SelectItem>
            <SelectItem value="motijheel">মতিঝিল</SelectItem>
            <SelectItem value="ramna">রমনা</SelectItem>
            <SelectItem value="farmgate">ফার্মগেট</SelectItem>
            <SelectItem value="newmarket">নিউমার্কেট</SelectItem>
            <SelectItem value="baridhara">বারিধারা</SelectItem>
            <SelectItem value="bashundhara">বসুন্ধরা</SelectItem>
            <SelectItem value="savar">সাভার</SelectItem>
            <SelectItem value="gazipur">গাজীপুর</SelectItem>
            <SelectItem value="keraniganj">কেরানীগঞ্জ</SelectItem>
            <SelectItem value="tongi">টঙ্গী</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation}
          className="shrink-0"
        >
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
