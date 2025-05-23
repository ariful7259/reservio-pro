
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wrench, BadgeCheck, Sparkles } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './StoreCreationForm';

interface ServiceSettingsProps {
  form: UseFormReturn<FormValues>;
}

const ServiceSettings: React.FC<ServiceSettingsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">সার্ভিস সেটিংস</h3>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Wrench className="h-3 w-3 mr-1" /> সার্ভিস
        </Badge>
      </div>
      <Form {...form}>
        <FormField control={form.control} name="serviceSettings.serviceTypes" render={({
          field
        }) => <FormItem>
                <FormLabel>সেবার ধরন</FormLabel>
                <Select onValueChange={value => {
            const currentTypes = form.getValues("serviceSettings.serviceTypes") || [];
            if (!currentTypes.includes(value)) {
              form.setValue("serviceSettings.serviceTypes", [...currentTypes, value]);
            }
          }}>
                  <SelectTrigger>
                    <SelectValue placeholder="সেবার ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleaning">পরিষ্কার</SelectItem>
                    <SelectItem value="plumbing">প্লাম্বিং</SelectItem>
                    <SelectItem value="electrician">ইলেকট্রিশিয়ান</SelectItem>
                    <SelectItem value="food_delivery">ফুড ডেলিভারি</SelectItem>
                    <SelectItem value="beauty">বিউটি ট্রিটমেন্ট</SelectItem>
                    <SelectItem value="consultant">পরামর্শক</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("serviceSettings.serviceTypes")?.map((type, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{type}</span>
                      <button type="button" onClick={() => {
                        const currentTypes = form.getValues("serviceSettings.serviceTypes") || [];
                        form.setValue("serviceSettings.serviceTypes", currentTypes.filter(t => t !== type));
                      }} className="text-xs text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>} />
      </Form>

      <div className="mt-6 bg-amber-50 rounded-md p-4 border border-amber-100">
        <p className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-amber-600 mr-2" />
          প্রিমিয়াম সার্ভিস ফিচার
        </p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-600" />
            <span>অ্যাপয়েন্টমেন্ট বুকিং</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-600" />
            <span>সময় ও তারিখ সিলেক্টর</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-600" />
            <span>সেবা প্রদানকারী প্রোফাইল</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-amber-600" />
            <span>কাস্টমার রেটিং</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSettings;
