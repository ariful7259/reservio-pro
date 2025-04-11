import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, DollarSign, Tag, Shield, Users, CreditCard } from 'lucide-react';
import { useAdminConfig } from '@/context/AdminConfigContext'; // নতুন কনটেক্সট ইম্পোর্ট

interface RentalMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const RentalMonetization = ({ onSave, onEnable }: RentalMonetizationProps) => {
  const { monetizationSettings, updateRentalSettings } = useAdminConfig(); // কনটেক্সট থেকে ফাংশন ও সেটিংস নিচ্ছি
  const rentalSettings = monetizationSettings.rental;

  // লোকাল স্টেট - UI থেকে ভ্যালু কনট্রোল করার জন্য
  const [settings, setSettings] = useState({
    listingFee: rentalSettings.listingFee,
    premiumListing: rentalSettings.premiumListing,
    bookingCommission: rentalSettings.bookingCommission,
    subscriptionModel: rentalSettings.subscriptionModel,
    insuranceFee: rentalSettings.insuranceFee,
    rates: {
      listingFee: rentalSettings.rates.listingFee,
      premiumListing: rentalSettings.rates.premiumListing,
      bookingCommission: rentalSettings.rates.bookingCommission, 
      subscriptionModel: rentalSettings.rates.subscriptionModel,
      insuranceFee: rentalSettings.rates.insuranceFee,
    }
  });

  // কনটেক্সট থেকে সেটিংস পরিবর্তন হলে লোকাল স্টেট আপডেট করা
  useEffect(() => {
    setSettings({
      listingFee: rentalSettings.listingFee,
      premiumListing: rentalSettings.premiumListing,
      bookingCommission: rentalSettings.bookingCommission,
      subscriptionModel: rentalSettings.subscriptionModel,
      insuranceFee: rentalSettings.insuranceFee,
      rates: {
        listingFee: rentalSettings.rates.listingFee,
        premiumListing: rentalSettings.rates.premiumListing,
        bookingCommission: rentalSettings.rates.bookingCommission,
        subscriptionModel: rentalSettings.rates.subscriptionModel,
        insuranceFee: rentalSettings.rates.insuranceFee,
      }
    });
  }, [rentalSettings]);

  // UI থেকে স্টেট আপডেট হ্যান্ডলার
  const handleToggleChange = (feature: keyof typeof settings) => {
    if (typeof settings[feature] === 'boolean') {
      const newSettings = {
        ...settings,
        [feature]: !settings[feature],
      };
      setSettings(newSettings);
      
      // কনটেক্সট আপডেট করা
      updateRentalSettings({ [feature]: !settings[feature] });
      onEnable(`রেন্টাল ${feature}`);
    }
  };

  // রেট পরিবর্তন হ্যান্ডলার
  const handleRateChange = (rate: keyof typeof settings.rates, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSettings({
      ...settings,
      rates: {
        ...settings.rates,
        [rate]: numValue,
      },
    });
  };

  // সেভ বাটন হ্যান্ডলার
  const handleSaveRates = () => {
    // কনটেক্সট আপডেট করা
    updateRentalSettings({ rates: settings.rates });
    onSave();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="listingFee">লিস্টিং ফি</Label>
              <p className="text-sm text-muted-foreground">লিস্টিং করার জন্য ফি ধার্য করুন</p>
            </div>
            <Switch id="listingFee" checked={settings.listingFee} onCheckedChange={() => handleToggleChange('listingFee')} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="listingFeeRate">লিস্টিং ফি পরিমাণ</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                id="listingFeeRate" 
                value={String(settings.rates.listingFee)} 
                onChange={(e) => handleRateChange('listingFee', e.target.value)} 
              />
              <span className="text-gray-500">৳</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="premiumListing">প্রিমিয়াম লিস্টিং</Label>
              <p className="text-sm text-muted-foreground">প্রিমিয়াম লিস্টিং এর জন্য অতিরিক্ত ফি ধার্য করুন</p>
            </div>
            <Switch id="premiumListing" checked={settings.premiumListing} onCheckedChange={() => handleToggleChange('premiumListing')} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="premiumListingRate">প্রিমিয়াম লিস্টিং ফি</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                id="premiumListingRate" 
                value={String(settings.rates.premiumListing)} 
                onChange={(e) => handleRateChange('premiumListing', e.target.value)} 
              />
              <span className="text-gray-500">৳</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="bookingCommission">বুকিং কমিশন</Label>
              <p className="text-sm text-muted-foreground">প্রতি বুকিংয়ের উপর কমিশন ধার্য করুন</p>
            </div>
            <Switch id="bookingCommission" checked={settings.bookingCommission} onCheckedChange={() => handleToggleChange('bookingCommission')} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="bookingCommissionRate">বুকিং কমিশন হার</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                id="bookingCommissionRate" 
                value={String(settings.rates.bookingCommission)} 
                onChange={(e) => handleRateChange('bookingCommission', e.target.value)} 
              />
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="subscriptionModel">সাবস্ক্রিপশন মডেল</Label>
              <p className="text-sm text-muted-foreground">সাবস্ক্রিপশন মডেলের মাধ্যমে আয় করুন</p>
            </div>
            <Switch id="subscriptionModel" checked={settings.subscriptionModel} onCheckedChange={() => handleToggleChange('subscriptionModel')} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="subscriptionModelRate">মাসিক সাবস্ক্রিপশন ফি</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                id="subscriptionModelRate" 
                value={String(settings.rates.subscriptionModel)} 
                onChange={(e) => handleRateChange('subscriptionModel', e.target.value)} 
              />
              <span className="text-gray-500">৳</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="insuranceFee">বীমা ফি</Label>
              <p className="text-sm text-muted-foreground">বীমা ফি ধার্য করুন</p>
            </div>
            <Switch id="insuranceFee" checked={settings.insuranceFee} onCheckedChange={() => handleToggleChange('insuranceFee')} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="insuranceFeeRate">বীমা ফি হার</Label>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                id="insuranceFeeRate" 
                value={String(settings.rates.insuranceFee)} 
                onChange={(e) => handleRateChange('insuranceFee', e.target.value)} 
              />
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSaveRates}>
        <DollarSign className="mr-2 h-4 w-4" /> হারসমূহ সংরক্ষণ করুন
      </Button>
    </div>
  );
};

export default RentalMonetization;
