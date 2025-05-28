
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { StoreData } from './types';

interface StoreInfoFormProps {
  storeData: StoreData;
  setStoreData: React.Dispatch<React.SetStateAction<StoreData>>;
}

const StoreInfoForm: React.FC<StoreInfoFormProps> = ({ storeData, setStoreData }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="businessName">দোকানের নাম *</Label>
          <Input
            id="businessName"
            placeholder="যেমন: রহিম ফ্যাশন হাউস"
            value={storeData.businessName}
            onChange={(e) => setStoreData(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="ownerName">মালিকের নাম *</Label>
          <Input
            id="ownerName"
            placeholder="আপনার নাম"
            value={storeData.ownerName}
            onChange={(e) => setStoreData(prev => ({ ...prev, ownerName: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">মোবাইল নাম্বর *</Label>
          <Input
            id="phone"
            placeholder="01XXXXXXXXX"
            value={storeData.phone}
            onChange={(e) => setStoreData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={storeData.email}
            onChange={(e) => setStoreData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">দোকানের ঠিকানা *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            placeholder="সম্পূর্ণ ঠিকানা লিখুন"
            className="pl-10"
            value={storeData.address}
            onChange={(e) => setStoreData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">ব্যবসার বিবরণ (ঐচ্ছিক)</Label>
        <Textarea
          id="description"
          placeholder="আপনার ব্যবসা সম্পর্কে কিছু লিখুন..."
          value={storeData.description}
          onChange={(e) => setStoreData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </>
  );
};

export default StoreInfoForm;
