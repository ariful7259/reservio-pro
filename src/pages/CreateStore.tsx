
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Store, Building, Wrench, Video, Upload, 
  CheckCircle2, AlertCircle, Sparkles, Paintbrush,
  PanelTop, Wand2, Gift, Shield, CreditCard, MoveRight,
  BadgeCheck, Truck, BarChart3
} from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useSellerProfile } from '@/hooks/useSellerProfile';
import { StoreFeaturesList } from '@/components/store/StoreFeaturesList';
import DragDropEditor from '@/components/store/DragDropEditor';
import { useIsMobile } from '@/hooks/use-mobile';

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
type FormValues = z.infer<typeof formSchema>;

const CreateStore = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  const { profile } = useSellerProfile();
  const isMobile = useIsMobile();

  // যদি ব্যবহারকারীর একটি প্রোফাইল থাকে তবে ড্যাশবোর্ডে পরিচালিত করে
  useEffect(() => {
    if (profile) {
      navigate(`/seller-dashboard/${profile.seller_type}`);
    }
  }, [profile, navigate]);

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
  const selectedSellerType = form.watch("sellerType");
  const businessName = form.watch("businessName");

  // পরবর্তী ট্যাবে যাওয়ার জন্য হ্যান্ডলার
  const handleNextTab = () => {
    if (activeTab === "features") {
      setActiveTab("design");
    } else if (activeTab === "design") {
      setActiveTab("basic");
    } else if (activeTab === "basic") {
      // বেসিক ট্যাব থেকে ব্যবসার ধরন অনুযায়ী সেটিংস ট্যাবে যান
      setActiveTab("settings");
    } else if (activeTab === "settings") {
      // সেটিংস ট্যাব থেকে অতিরিক্ত ট্যাবে যান
      setActiveTab("additional");
    }
  };

  // আগের ট্যাবে যাওয়ার জন্য হ্যান্ডলার
  const handlePreviousTab = () => {
    if (activeTab === "additional") {
      setActiveTab("settings");
    } else if (activeTab === "settings") {
      setActiveTab("basic");
    } else if (activeTab === "basic") {
      setActiveTab("design");
    } else if (activeTab === "design") {
      setActiveTab("features");
    }
  };

  // ফর্ম জমা দেওয়ার হ্যান্ডলার
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
      console.log('ব্যবহারকারীর আইডি:', user.id);
      console.log('ডাটা ইনসার্ট করছি:', {
        id: user.id,
        seller_type: data.sellerType,
        business_name: data.businessName
        // ... বাকি ডাটা
      });

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

  // সেলার টাইপ অনুযায়ী আইকন রিটার্ন করে
  const getSellerTypeIcon = (type: SellerType) => {
    switch (type) {
      case 'marketplace':
        return <Store className="h-6 w-6" />;
      case 'rental':
        return <Building className="h-6 w-6" />;
      case 'service':
        return <Wrench className="h-6 w-6" />;
      case 'content':
        return <Video className="h-6 w-6" />;
      default:
        return <Store className="h-6 w-6" />;
    }
  };

  // ব্যবসার ধরন অনুযায়ী সেটিংস রেন্ডার করে
  const renderBusinessTypeSettings = () => {
    switch (selectedSellerType) {
      case 'marketplace':
        return <div className="space-y-4">
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
                      {form.getValues("marketplaceSettings.categories")?.map((category, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{category}</span>
                          <button type="button" onClick={() => {
                    const currentCategories = form.getValues("marketplaceSettings.categories") || [];
                    form.setValue("marketplaceSettings.categories", currentCategories.filter(c => c !== category));
                  }} className="text-xs text-red-500">
                            ✕
                          </button>
                        </div>)}
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
                        {form.getValues("marketplaceSettings.deliveryOptions")?.map((option, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <span>{option}</span>
                            <button type="button" onClick={() => {
                      const currentOptions = form.getValues("marketplaceSettings.deliveryOptions") || [];
                      form.setValue("marketplaceSettings.deliveryOptions", currentOptions.filter(o => o !== option));
                    }} className="text-xs text-red-500">
                              ✕
                            </button>
                          </div>)}
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
          </div>;
      case 'rental':
        return <div className="space-y-4">
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
                      {form.getValues("rentalSettings.propertyTypes")?.map((type, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{type}</span>
                          <button type="button" onClick={() => {
                    const currentTypes = form.getValues("rentalSettings.propertyTypes") || [];
                    form.setValue("rentalSettings.propertyTypes", currentTypes.filter(t => t !== type));
                  }} className="text-xs text-red-500">
                            ✕
                          </button>
                        </div>)}
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
                      {form.getValues("rentalSettings.amenities")?.map((amenity, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{amenity}</span>
                          <button type="button" onClick={() => {
                    const currentAmenities = form.getValues("rentalSettings.amenities") || [];
                    form.setValue("rentalSettings.amenities", currentAmenities.filter(a => a !== amenity));
                  }} className="text-xs text-red-500">
                            ✕
                          </button>
                        </div>)}
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
          </div>;
      case 'service':
        return <div className="space-y-4">
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
                      {form.getValues("serviceSettings.serviceTypes")?.map((type, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{type}</span>
                          <button type="button" onClick={() => {
                    const currentTypes = form.getValues("serviceSettings.serviceTypes") || [];
                    form.setValue("serviceSettings.serviceTypes", currentTypes.filter(t => t !== type));
                  }} className="text-xs text-red-500">
                            ✕
                          </button>
                        </div>)}
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
          </div>;
      case 'content':
        return <div className="space-y-4">
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
                      {form.getValues("contentSettings.contentTypes")?.map((type, index) => <div key={index} className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{type}</span>
                          <button type="button" onClick={() => {
                    const currentTypes = form.getValues("contentSettings.contentTypes") || [];
                    form.setValue("contentSettings.contentTypes", currentTypes.filter(t => t !== type));
                  }} className="text-xs text-red-500">
                            ✕
                          </button>
                        </div>)}
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
          </div>;
      default:
        return null;
    }
  };

  // লগইন না করা ব্যবহারকারীদের জন্য প্রম্পট
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>লগইন করুন</CardTitle>
            <CardDescription>
              ব্যবসা তৈরি করতে আগে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login', { state: { from: '/create-store' } })} className="w-full">
              লগইন পৃষ্ঠায় যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // প্রধান ট্যাব লিস্ট - রেসপন্সিভ
  const renderTabsList = () => {
    if (isMobile) {
      return (
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="features">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <Sparkles className="h-4 w-4" />
              <span>ফিচারস</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="design">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <Paintbrush className="h-4 w-4" />
              <span>ডিজাইন</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="basic">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <PanelTop className="h-4 w-4" />
              <span>বেসিক</span>
            </span>
          </TabsTrigger>
        </TabsList>
      );
    }

    return (
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="features">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>ফিচারস</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="design">
          <span className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            <span>ডিজাইন</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="basic">
          <span className="flex items-center gap-2">
            <PanelTop className="h-4 w-4" />
            <span>বেসিক তথ্য</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="settings">
          <span className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            <span>সেটিংস</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="additional">
          <span className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>অতিরিক্ত</span>
          </span>
        </TabsTrigger>
      </TabsList>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">আপনার অনলাইন স্টোর তৈরি করুন</CardTitle>
              <CardDescription className="max-w-2xl">
                সহজেই আপনার অনলাইন ব্যবসা শুরু করুন। কোন কোডিং জ্ঞান ছাড়াই আপনার ওয়েবসাইট বানান।
              </CardDescription>
            </div>
            <Badge className="self-start sm:self-auto bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" /> নতুন
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {renderTabsList()}

            <TabsContent value="features" className="space-y-6 animate-in fade-in-50">
              <StoreFeaturesList />
              <div className="flex justify-end mt-6">
                <Button onClick={handleNextTab} className="flex items-center gap-2">
                  পরবর্তী ধাপ <MoveRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="animate-in fade-in-50">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <Paintbrush className="h-6 w-6 text-primary shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-medium">স্টোর ডিজাইন</h3>
                    <p className="text-sm text-muted-foreground">
                      নিচের এডিটর ব্যবহার করে আপনার পছন্দ মত স্টোরের ডিজাইন তৈরি করুন। টেমপ্লেট থেকে শুরু করে ধাপে ধাপে কাস্টমাইজ করুন।
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 border-primary/20 text-sm">
                    <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" /> নতুন ফিচার
                  </Badge>
                </div>
                
                <div className="min-h-[600px] border rounded-md p-0.5">
                  <DragDropEditor storeName={businessName || "আমার দোকান"} />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousTab}>
                    আগের ধাপ
                  </Button>
                  <Button onClick={handleNextTab}>
                    পরবর্তী ধাপ <MoveRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="basic" className="animate-in fade-in-50">
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
                              <SelectItem value="marketplace">
                                <div className="flex items-center gap-2">
                                  <Store className="h-4 w-4" />
                                  <span>মার্কেটপ্লেস</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="rental">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  <span>রেন্টাল</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="service">
                                <div className="flex items-center gap-2">
                                  <Wrench className="h-4 w-4" />
                                  <span>সার্ভিস</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="content">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  <span>ডিজিটাল কন্টেন্ট</span>
                                </div>
                              </SelectItem>
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
                </form>
              </Form>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePreviousTab}>
                  আগের ধাপ
                </Button>
                <Button onClick={handleNextTab} className="flex items-center gap-2">
                  পরবর্তী ধাপ <MoveRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="animate-in fade-in-50">
              <div className="space-y-6">
                {renderBusinessTypeSettings()}
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousTab}>
                    আগের ধাপ
                  </Button>
                  <Button onClick={handleNextTab} className="flex items-center gap-2">
                    পরবর্তী ধাপ <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="animate-in fade-in-50">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      
                      <div className="mt-3 flex gap-2">
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
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handlePreviousTab}>
                      আগের ধাপ
                    </Button>
                    <Button 
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)} 
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStore;
