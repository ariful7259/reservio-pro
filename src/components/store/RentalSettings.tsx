
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building, BadgeCheck, Sparkles } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './StoreCreationForm';

interface RentalSettingsProps {
  form: UseFormReturn<FormValues>;
}

const RentalSettings: React.FC<RentalSettingsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">রেন্টাল সেটিংস</h3>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Building className="h-3 w-3 mr-1" /> রেন্টাল
        </Badge>
      </div>
      <Form {...form}>
        <FormField control={form.control} name="rentalSettings.propertyTypes" render={({
          field
        }) => <FormItem>
                <FormLabel>সম্পত্তির ধরন</FormLabel>
                <Select onValueChange={value => {
            const currentTypes = form.getValues("rentalSettings.propertyTypes") || [];
            if (!currentTypes.includes(value)) {
              form.setValue("rentalSettings.propertyTypes", [...currentTypes, value]);
            }
          }}>
                  <SelectTrigger>
                    <SelectValue placeholder="সম্পত্তির ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                    <SelectItem value="house">বাড়ি</SelectItem>
                    <SelectItem value="room">রুম</SelectItem>
                    <SelectItem value="office">অফিস</SelectItem>
                    <SelectItem value="car">গাড়ি</SelectItem>
                    <SelectItem value="equipment">উপকরণ</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("rentalSettings.propertyTypes")?.map((type, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{type}</span>
                      <button type="button" onClick={() => {
                        const currentTypes = form.getValues("rentalSettings.propertyTypes") || [];
                        form.setValue("rentalSettings.propertyTypes", currentTypes.filter(t => t !== type));
                      }} className="text-xs text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>} />
        <FormField control={form.control} name="rentalSettings.amenities" render={({
          field
        }) => <FormItem>
                <FormLabel>সুবিধাদি</FormLabel>
                <Select onValueChange={value => {
            const currentAmenities = form.getValues("rentalSettings.amenities") || [];
            if (!currentAmenities.includes(value)) {
              form.setValue("rentalSettings.amenities", [...currentAmenities, value]);
            }
          }}>
                  <SelectTrigger>
                    <SelectValue placeholder="সুবিধাদি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wifi">ওয়াইফাই</SelectItem>
                    <SelectItem value="ac">এসি</SelectItem>
                    <SelectItem value="parking">পার্কিং</SelectItem>
                    <SelectItem value="kitchen">কিচেন</SelectItem>
                    <SelectItem value="tv">টিভি</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("rentalSettings.amenities")?.map((amenity, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{amenity}</span>
                      <button type="button" onClick={() => {
                        const currentAmenities = form.getValues("rentalSettings.amenities") || [];
                        form.setValue("rentalSettings.amenities", currentAmenities.filter(a => a !== amenity));
                      }} className="text-xs text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>} />
        <FormField control={form.control} name="rentalSettings.reservationPolicy" render={({
          field
        }) => <FormItem>
                <FormLabel>রিজার্ভেশন পলিসি</FormLabel>
                <FormControl>
                  <Textarea placeholder="রিজার্ভেশন সম্পর্কিত নীতিমালা লিখুন" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
      </Form>

      <div className="mt-6 bg-green-50 rounded-md p-4 border border-green-100">
        <p className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-green-600 mr-2" />
          প্রিমিয়াম রেন্টাল ফিচার
        </p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span>বুকিং ক্যালেন্ডার</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span>অনলাইন পেমেন্ট</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span>রিভিউ সিস্টেম</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span>অটো ইনভয়েস</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalSettings;
