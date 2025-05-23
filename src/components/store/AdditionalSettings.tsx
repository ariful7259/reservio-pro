
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, CreditCard } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './StoreCreationForm';

interface AdditionalSettingsProps {
  form: UseFormReturn<FormValues>;
}

const AdditionalSettings: React.FC<AdditionalSettingsProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="termsConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>শর্তাবলী ও নীতিমালা</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="আপনার ব্যবসার নীতিমালা এবং শর্তাবলী লিখুন" 
                {...field} 
                rows={6}
              />
            </FormControl>
            <FormDescription>
              এটি আপনার স্টোরের ফুটারে দেখানো হবে
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full shrink-0">
          <Shield className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-green-800">আপনার অনলাইন ব্যবসার সম্পূর্ণ সুরক্ষা</h3>
          <p className="text-sm text-green-700 mt-1">
            আমাদের সিস্টেমে আপনার ব্যবসার সমস্ত তথ্য সম্পূর্ণ সুরক্ষিত থাকবে। আপনি যেকোনো সময় আপনার পেমেন্ট গেটওয়ে সেটাপ করতে পারবেন, 
            এবং কাস্টমার ইনফরমেশন আমাদের সার্ভারে এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকবে।
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">SSL সার্টিফিকেট</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">ডাটা এনক্রিপশন</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">পেমেন্ট সিকিউরিটি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">24/7 মনিটরিং</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="px-3 py-1 flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              <span>SSL সিকিউর</span>
            </Badge>
            <Badge className="px-3 py-1 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>PCI Compliant</span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSettings;
