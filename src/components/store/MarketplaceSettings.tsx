
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Store, BadgeCheck, Sparkles } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './StoreCreationForm';

interface MarketplaceSettingsProps {
  form: UseFormReturn<FormValues>;
}

const MarketplaceSettings: React.FC<MarketplaceSettingsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">মার্কেটপ্লেস সেটিংস</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Store className="h-3 w-3 mr-1" /> মার্কেটপ্লেস
        </Badge>
      </div>
      <Form {...form}>
        <FormField control={form.control} name="marketplaceSettings.categories" render={({
        field
      }) => <FormItem>
              <FormLabel>পণ্য বিভাগ</FormLabel>
              <Select onValueChange={value => {
          const currentCategories = form.getValues("marketplaceSettings.categories") || [];
          if (!currentCategories.includes(value)) {
            form.setValue("marketplaceSettings.categories", [...currentCategories, value]);
          }
        }}>
                <SelectTrigger>
                  <SelectValue placeholder="পণ্য বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">ইলেকট্রনিক্স</SelectItem>
                  <SelectItem value="clothing">পোশাক</SelectItem>
                  <SelectItem value="food">খাদ্য সামগ্রী</SelectItem>
                  <SelectItem value="home">গৃহসজ্জা</SelectItem>
                  <SelectItem value="beauty">সৌন্দর্য সামগ্রী</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.getValues("marketplaceSettings.categories")?.map((category, index) => (
                  <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{category}</span>
                    <button type="button" onClick={() => {
                      const currentCategories = form.getValues("marketplaceSettings.categories") || [];
                      form.setValue("marketplaceSettings.categories", currentCategories.filter(c => c !== category));
                    }} className="text-xs text-red-500">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>} />

        <div className="mt-4">
          <FormField control={form.control} name="marketplaceSettings.deliveryOptions" render={({
          field
        }) => <FormItem>
                <FormLabel>ডেলিভারি অপশন</FormLabel>
                <Select onValueChange={value => {
            const currentOptions = form.getValues("marketplaceSettings.deliveryOptions") || [];
            if (!currentOptions.includes(value)) {
              form.setValue("marketplaceSettings.deliveryOptions", [...currentOptions, value]);
            }
          }}>
                  <SelectTrigger>
                    <SelectValue placeholder="ডেলিভারি অপশন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home_delivery">হোম ডেলিভারি</SelectItem>
                    <SelectItem value="pickup">পিকআপ পয়েন্ট</SelectItem>
                    <SelectItem value="courier">কুরিয়ার সার্ভিস</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("marketplaceSettings.deliveryOptions")?.map((option, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{option}</span>
                      <button type="button" onClick={() => {
                        const currentOptions = form.getValues("marketplaceSettings.deliveryOptions") || [];
                        form.setValue("marketplaceSettings.deliveryOptions", currentOptions.filter(o => o !== option));
                      }} className="text-xs text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>} />
        </div>
      </Form>
      
      <div className="mt-6 bg-blue-50 rounded-md p-4 border border-blue-100">
        <p className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
          প্রিমিয়াম মার্কেটপ্লেস ফিচার
        </p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-blue-600" />
            <span>ফেসবুক শপ সিঙ্ক</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-blue-600" />
            <span>অটো SMS নোটিফিকেশন</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-blue-600" />
            <span>ইনভেন্টরি ম্যানেজমেন্ট</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-blue-600" />
            <span>কুরিয়ার API ইন্টিগ্রেশন</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSettings;
