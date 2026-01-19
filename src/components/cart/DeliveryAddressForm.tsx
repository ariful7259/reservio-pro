import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, User, Phone } from 'lucide-react';

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
}

interface DeliveryAddressFormProps {
  address: DeliveryAddress;
  onChange: (address: DeliveryAddress) => void;
}

const cities = [
  { id: 'dhaka', name: 'ঢাকা' },
  { id: 'chittagong', name: 'চট্টগ্রাম' },
  { id: 'sylhet', name: 'সিলেট' },
  { id: 'rajshahi', name: 'রাজশাহী' },
  { id: 'khulna', name: 'খুলনা' },
  { id: 'barishal', name: 'বরিশাল' },
  { id: 'rangpur', name: 'রংপুর' },
  { id: 'mymensingh', name: 'ময়মনসিংহ' },
];

const areasByCity: Record<string, string[]> = {
  'ঢাকা': ['ধানমন্ডি', 'মিরপুর', 'উত্তরা', 'গুলশান', 'বনানী', 'মোহাম্মদপুর', 'মতিঝিল', 'পুরান ঢাকা', 'তেজগাঁও', 'বাড্ডা', 'রামপুরা', 'খিলগাঁও', 'যাত্রাবাড়ী', 'শ্যামলী', 'আজিমপুর', 'লালবাগ', 'কামরাঙ্গীরচর'],
  'চট্টগ্রাম': ['আগ্রাবাদ', 'নাসিরাবাদ', 'জিইসি', 'খুলশী', 'পতেঙ্গা', 'হালিশহর', 'চান্দগাঁও'],
  'সিলেট': ['জিন্দাবাজার', 'আম্বরখানা', 'শাহজালাল', 'সুবিদবাজার', 'টিলাগড়'],
  'রাজশাহী': ['সদর', 'শাহমখদুম', 'বোয়ালিয়া', 'মতিহার'],
  'খুলনা': ['খালিশপুর', 'সোনাডাঙ্গা', 'বয়রা', 'দৌলতপুর'],
  'বরিশাল': ['সদর', 'বানারীপাড়া', 'কাউনিয়া'],
  'রংপুর': ['সদর', 'মাহিগঞ্জ', 'পীরগাছা'],
  'ময়মনসিংহ': ['সদর', 'গৌরীপুর', 'মুক্তাগাছা']
};

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ address, onChange }) => {
  const handleChange = (field: keyof DeliveryAddress, value: string) => {
    // If city changes, reset area
    if (field === 'city' && value !== address.city) {
      onChange({ ...address, [field]: value, area: '' });
    } else {
      onChange({ ...address, [field]: value });
    }
  };
  
  const availableAreas = address.city ? (areasByCity[address.city] || []) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          ডেলিভারি ঠিকানা
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              পুরো নাম *
            </Label>
            <Input
              id="fullName"
              placeholder="আপনার পুরো নাম"
              value={address.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              মোবাইল নম্বর *
            </Label>
            <Input
              id="phone"
              placeholder="01XXXXXXXXX"
              value={address.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">শহর *</Label>
            <Select 
              value={address.city} 
              onValueChange={(value) => handleChange('city', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="শহর নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">এলাকা *</Label>
            {availableAreas.length > 0 ? (
              <Select 
                value={address.area} 
                onValueChange={(value) => handleChange('area', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {availableAreas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="area"
                placeholder="আপনার এলাকা লিখুন"
                value={address.area}
                onChange={(e) => handleChange('area', e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
          <Textarea
            id="address"
            placeholder="বাড়ি নম্বর, রাস্তা, এলাকা"
            value={address.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">পোস্ট কোড (ঐচ্ছিক)</Label>
          <Input
            id="postalCode"
            placeholder="1205"
            value={address.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="w-32"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryAddressForm;
