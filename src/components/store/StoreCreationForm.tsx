
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type SellerType = 'marketplace' | 'rental' | 'service' | 'content';

// ফর্ম ভ্যালিডেশন স্কিমা
const formSchema = z.object({
  businessName: z.string({
    required_error: "ব্যবসার নাম আবশ্যক"
  }).min(3, {
    message: "ব্যবসার নাম কমপক্ষে ৩ অক্ষর হতে হবে"
  }),
  sellerType: z.enum(['marketplace', 'rental', 'service', 'content'], {
    required_error: "ব্যবসার ধরন নির্বাচন করুন"
  }),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({
    message: "সঠিক ইমেইল ঠিকানা দিন"
  }).optional(),
  bio: z.string().optional(),
  termsConditions: z.string().optional(),
  // বিভিন্ন ব্যবসা ধরনের সেটিংস
  marketplaceSettings: z.object({
    categories: z.array(z.string()).optional(),
    deliveryOptions: z.array(z.string()).optional()
  }).optional(),
  rentalSettings: z.object({
    propertyTypes: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    reservationPolicy: z.string().optional()
  }).optional(),
  serviceSettings: z.object({
    serviceTypes: z.array(z.string()).optional(),
    scheduleSettings: z.record(z.any()).optional()
  }).optional(),
  contentSettings: z.object({
    contentTypes: z.array(z.string()).optional(),
    publicationSchedule: z.record(z.any()).optional()
  }).optional()
});

export type FormValues = z.infer<typeof formSchema>;

interface StoreCreationFormProps {
  onNextTab: () => void;
  onPreviousTab: () => void;
}

const StoreCreationForm: React.FC<StoreCreationFormProps> = ({ onNextTab, onPreviousTab }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ফর্ম ইনিশিয়ালাইজেশন
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      sellerType: "marketplace",
      address: "",
      phone: "",
      email: "",
      bio: "",
      termsConditions: "",
      marketplaceSettings: {
        categories: [],
        deliveryOptions: []
      },
      rentalSettings: {
        propertyTypes: [],
        amenities: [],
        reservationPolicy: ""
      },
      serviceSettings: {
        serviceTypes: [],
        scheduleSettings: {}
      },
      contentSettings: {
        contentTypes: [],
        publicationSchedule: {}
      }
    }
  });

  const onSubmit = async (data: FormValues) => {
    if (!isAuthenticated || !user || !user.id) {
      toast({
        title: "লগইন করুন",
        description: "দয়া করে প্রথমে লগইন করুন",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // JSONB ফিল্ডের জন্য ডাটা প্রস্তুত করা
      const marketplaceSettings = {
        categories: data.marketplaceSettings?.categories || [],
        delivery_options: data.marketplaceSettings?.deliveryOptions || []
      };
      const rentalSettings = {
        property_types: data.rentalSettings?.propertyTypes || [],
        amenities: data.rentalSettings?.amenities || [],
        reservation_policy: data.rentalSettings?.reservationPolicy || ""
      };
      const serviceSettings = {
        service_types: data.serviceSettings?.serviceTypes || [],
        schedule_settings: data.serviceSettings?.scheduleSettings || {}
      };
      const contentSettings = {
        content_types: data.contentSettings?.contentTypes || [],
        publication_schedule: data.contentSettings?.publicationSchedule || {}
      };

      // সুপাবেস-এ ডাটা জমা দেওয়া
      const { data: insertedData, error } = await supabase.from('seller_profiles').insert({
        id: user.id,
        seller_type: data.sellerType,
        business_name: data.businessName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        bio: data.bio,
        terms_conditions: data.termsConditions,
        marketplace_settings: marketplaceSettings,
        rental_settings: rentalSettings,
        service_settings: serviceSettings,
        content_settings: contentSettings
      }).select();
      
      if (error) {
        console.error('ব্যবসা তৈরি ব্যর্থ:', error);
        throw error;
      }
      
      toast({
        title: "সফল",
        description: "আপনার ব্যবসা সফলভাবে তৈরি হয়েছে",
        variant: "default"
      });

      // ব্যবসার ধরন অনুযায়ী ড্যাশবোর্ডে পরিচালিত করা
      navigate(`/seller-dashboard/${data.sellerType}`);
    } catch (error: any) {
      console.error('ব্যবসা তৈরি ব্যর্থ:', error);
      toast({
        title: "ত্রুটি",
        description: error.message || "ব্যবসা তৈরিতে সমস্যা হয়েছে",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center gap-1.5">
                    ব্যবসার নাম
                    <span className="text-red-500">*</span>
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="আপনার ব্যবসার নাম লিখুন" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center gap-1.5">
                    ব্যবসার ধরন
                    <span className="text-red-500">*</span>
                  </span>
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ব্যবসার ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                    <SelectItem value="rental">রেন্টাল</SelectItem>
                    <SelectItem value="service">সার্ভিস</SelectItem>
                    <SelectItem value="content">ডিজিটাল কন্টেন্ট</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ব্যবসার ইমেইল</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>যোগাযোগের নম্বর</FormLabel>
                <FormControl>
                  <Input placeholder="+880 1XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ব্যবসার ঠিকানা</FormLabel>
              <FormControl>
                <Input placeholder="আপনার ব্যবসার ঠিকানা লিখুন" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ব্যবসার বিবরণ</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="আপনার ব্যবসা সম্পর্কে সংক্ষেপে লিখুন" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onPreviousTab} type="button">
            আগের ধাপ
          </Button>
          <Button onClick={onNextTab} type="button">
            পরবর্তী ধাপ
          </Button>
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isSubmitting}
            className="flex items-center gap-2"
            type="button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> 
                ব্যবসা তৈরি হচ্ছে...
              </>
            ) : (
              <>আপনার স্টোর তৈরি করুন</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreCreationForm;
export { formSchema };
