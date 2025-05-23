
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Video, BadgeCheck, Sparkles } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './StoreCreationForm';

interface ContentSettingsProps {
  form: UseFormReturn<FormValues>;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">কনটেন্ট সেটিংস</h3>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Video className="h-3 w-3 mr-1" /> ডিজিটাল কনটেন্ট
        </Badge>
      </div>
      <Form {...form}>
        <FormField control={form.control} name="contentSettings.contentTypes" render={({
          field
        }) => <FormItem>
                <FormLabel>কনটেন্টের ধরন</FormLabel>
                <Select onValueChange={value => {
            const currentTypes = form.getValues("contentSettings.contentTypes") || [];
            if (!currentTypes.includes(value)) {
              form.setValue("contentSettings.contentTypes", [...currentTypes, value]);
            }
          }}>
                  <SelectTrigger>
                    <SelectValue placeholder="কনটেন্টের ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course">কোর্স</SelectItem>
                    <SelectItem value="ebook">ই-বুক</SelectItem>
                    <SelectItem value="video">ভিডিও</SelectItem>
                    <SelectItem value="podcast">পডকাস্ট</SelectItem>
                    <SelectItem value="article">আর্টিকেল</SelectItem>
                    <SelectItem value="membership">মেম্বারশিপ</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("contentSettings.contentTypes")?.map((type, index) => (
                    <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{type}</span>
                      <button type="button" onClick={() => {
                        const currentTypes = form.getValues("contentSettings.contentTypes") || [];
                        form.setValue("contentSettings.contentTypes", currentTypes.filter(t => t !== type));
                      }} className="text-xs text-red-500">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>} />
      </Form>

      <div className="mt-6 bg-purple-50 rounded-md p-4 border border-purple-100">
        <p className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
          প্রিমিয়াম কনটেন্ট ফিচার
        </p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-purple-600" />
            <span>কনটেন্ট প্রোটেকশন</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-purple-600" />
            <span>সাবস্ক্রিপশন মডেল</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-purple-600" />
            <span>ক্লাউড স্টোরেজ</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-purple-600" />
            <span>অ্যানালিটিক্স</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSettings;
