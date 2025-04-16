
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectLabel
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Store, Building, Wrench, Video, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSellerProfile } from '@/hooks/useSellerProfile';

export type SellerType = 'marketplace' | 'rental' | 'service' | 'content';

// ফর্ম ভ্যালিডেশন স্কিমা
const formSchema = z.object({
  businessName: z.string({ required_error: "ব্যবসার নাম আবশ্যক" }).min(3, {
    message: "ব্যবসার নাম কমপক্ষে ৩ অক্ষর হতে হবে",
  }),
  sellerType: z.enum(['marketplace', 'rental', 'service', 'content'], {
    required_error: "ব্যবসার ধরন নির্বাচন করুন",
  }),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন" }).optional(),
  bio: z.string().optional(),
  termsConditions: z.string().optional(),
  // বিভিন্ন ব্যবসা ধরনের সেটিংস
  marketplaceSettings: z.object({
    categories: z.array(z.string()).optional(),
    deliveryOptions: z.array(z.string()).optional(),
  }).optional(),
  rentalSettings: z.object({
    propertyTypes: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    reservationPolicy: z.string().optional(),
  }).optional(),
  serviceSettings: z.object({
    serviceTypes: z.array(z.string()).optional(),
    scheduleSettings: z.record(z.any()).optional(),
  }).optional(),
  contentSettings: z.object({
    contentTypes: z.array(z.string()).optional(),
    publicationSchedule: z.record(z.any()).optional(),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateStore = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const { profile } = useSellerProfile();

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
        deliveryOptions: [],
      },
      rentalSettings: {
        propertyTypes: [],
        amenities: [],
        reservationPolicy: "",
      },
      serviceSettings: {
        serviceTypes: [],
        scheduleSettings: {},
      },
      contentSettings: {
        contentTypes: [],
        publicationSchedule: {},
      },
    },
  });

  const selectedSellerType = form.watch("sellerType");

  // পরবর্তী ট্যাবে যাওয়ার জন্য হ্যান্ডলার
  const handleNextTab = () => {
    if (activeTab === "basic") {
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
        delivery_options: data.marketplaceSettings?.deliveryOptions || [],
      };

      const rentalSettings = {
        property_types: data.rentalSettings?.propertyTypes || [],
        amenities: data.rentalSettings?.amenities || [],
        reservation_policy: data.rentalSettings?.reservationPolicy || "",
      };

      const serviceSettings = {
        service_types: data.serviceSettings?.serviceTypes || [],
        schedule_settings: data.serviceSettings?.scheduleSettings || {},
      };

      const contentSettings = {
        content_types: data.contentSettings?.contentTypes || [],
        publication_schedule: data.contentSettings?.publicationSchedule || {},
      };

      console.log('ব্যবহারকারীর আইডি:', user.id);
      console.log('ডাটা ইনসার্ট করছি:', {
        id: user.id,
        seller_type: data.sellerType,
        business_name: data.businessName,
        // ... বাকি ডাটা
      });

      // সুপাবেস-এ ডাটা জমা দেওয়া
      const { data: insertedData, error } = await supabase
        .from('seller_profiles')
        .insert({
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
          content_settings: contentSettings,
        })
        .select();

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
    switch(type) {
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
    switch(selectedSellerType) {
      case 'marketplace':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">মার্কেটপ্লেস সেটিংস</h3>
            <FormField
              control={form.control}
              name="marketplaceSettings.categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>পণ্য বিভাগ</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentCategories = form.getValues("marketplaceSettings.categories") || [];
                      if (!currentCategories.includes(value)) {
                        form.setValue("marketplaceSettings.categories", [...currentCategories, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentCategories = form.getValues("marketplaceSettings.categories") || [];
                            form.setValue(
                              "marketplaceSettings.categories", 
                              currentCategories.filter(c => c !== category)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketplaceSettings.deliveryOptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ডেলিভারি অপশন</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentOptions = form.getValues("marketplaceSettings.deliveryOptions") || [];
                      if (!currentOptions.includes(value)) {
                        form.setValue("marketplaceSettings.deliveryOptions", [...currentOptions, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentOptions = form.getValues("marketplaceSettings.deliveryOptions") || [];
                            form.setValue(
                              "marketplaceSettings.deliveryOptions", 
                              currentOptions.filter(o => o !== option)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 'rental':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">রেন্টাল সেটিংস</h3>
            <FormField
              control={form.control}
              name="rentalSettings.propertyTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সম্পত্তির ধরন</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentTypes = form.getValues("rentalSettings.propertyTypes") || [];
                      if (!currentTypes.includes(value)) {
                        form.setValue("rentalSettings.propertyTypes", [...currentTypes, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentTypes = form.getValues("rentalSettings.propertyTypes") || [];
                            form.setValue(
                              "rentalSettings.propertyTypes", 
                              currentTypes.filter(t => t !== type)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentalSettings.amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সুবিধাদি</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentAmenities = form.getValues("rentalSettings.amenities") || [];
                      if (!currentAmenities.includes(value)) {
                        form.setValue("rentalSettings.amenities", [...currentAmenities, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentAmenities = form.getValues("rentalSettings.amenities") || [];
                            form.setValue(
                              "rentalSettings.amenities", 
                              currentAmenities.filter(a => a !== amenity)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentalSettings.reservationPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>রিজার্ভেশন পলিসি</FormLabel>
                  <Textarea 
                    placeholder="রিজার্ভেশন সম্পর্কিত নীতিমালা লিখুন"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 'service':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">সার্ভিস সেটিংস</h3>
            <FormField
              control={form.control}
              name="serviceSettings.serviceTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সেবার ধরন</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentTypes = form.getValues("serviceSettings.serviceTypes") || [];
                      if (!currentTypes.includes(value)) {
                        form.setValue("serviceSettings.serviceTypes", [...currentTypes, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentTypes = form.getValues("serviceSettings.serviceTypes") || [];
                            form.setValue(
                              "serviceSettings.serviceTypes", 
                              currentTypes.filter(t => t !== type)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 'content':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">কনটেন্ট সেটিংস</h3>
            <FormField
              control={form.control}
              name="contentSettings.contentTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>কনটেন্টের ধরন</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const currentTypes = form.getValues("contentSettings.contentTypes") || [];
                      if (!currentTypes.includes(value)) {
                        form.setValue("contentSettings.contentTypes", [...currentTypes, value]);
                      }
                    }}
                  >
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
                        <button 
                          type="button"
                          onClick={() => {
                            const currentTypes = form.getValues("contentSettings.contentTypes") || [];
                            form.setValue(
                              "contentSettings.contentTypes", 
                              currentTypes.filter(t => t !== type)
                            );
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
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
            <Button 
              onClick={() => navigate('/login', { state: { from: '/create-store' } })} 
              className="w-full"
            >
              লগইন পৃষ্ঠায় যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>আপনার ব্যবসা তৈরি করুন</CardTitle>
          <CardDescription>
            আপনার ব্যবসা সম্পর্কিত তথ্য প্রদান করুন এবং সেবা শুরু করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">মৌলিক তথ্য</TabsTrigger>
                  <TabsTrigger value="settings">ব্যবসা সেটিংস</TabsTrigger>
                  <TabsTrigger value="additional">অতিরিক্ত তথ্য</TabsTrigger>
                </TabsList>
                
                {/* মৌলিক তথ্য ট্যাব */}
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ব্যবসার নাম <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="আপনার ব্যবসার নাম লিখুন" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="sellerType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ব্যবসার ধরন <span className="text-red-500">*</span></FormLabel>
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
                                  <SelectItem value="content">কনটেন্ট</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ফোন নম্বর</FormLabel>
                              <FormControl>
                                <Input placeholder="যোগাযোগের ফোন নম্বর" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ইমেইল</FormLabel>
                              <FormControl>
                                <Input placeholder="যোগাযোগের ইমেইল" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ব্যবসার বর্ণনা</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="আপনার ব্যবসা সম্পর্কে সংক্ষিপ্ত বর্ণনা দিন" 
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={handleNextTab}>
                      পরবর্তী
                    </Button>
                  </div>
                </TabsContent>
                
                {/* ব্যবসা সেটিংস ট্যাব */}
                <TabsContent value="settings" className="space-y-6 pt-4">
                  <div className="p-4 bg-primary/5 rounded-lg border flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      {getSellerTypeIcon(selectedSellerType as SellerType)}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {selectedSellerType === "marketplace" && "মার্কেটপ্লেস বিক্রেতা"}
                        {selectedSellerType === "rental" && "রেন্টাল ব্যবসা"}
                        {selectedSellerType === "service" && "সার্ভিস প্রদানকারী"}
                        {selectedSellerType === "content" && "কনটেন্ট ক্রিয়েটর"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedSellerType === "marketplace" && "মার্কেটপ্লেসে পণ্য বিক্রয় করুন"}
                        {selectedSellerType === "rental" && "সম্পত্তি বা সামগ্রী ভাড়া দিন"}
                        {selectedSellerType === "service" && "সার্ভিস এবং সেবা প্রদান করুন"}
                        {selectedSellerType === "content" && "ডিজিটাল কনটেন্ট বিক্রয় করুন"}
                      </p>
                    </div>
                  </div>
                  
                  {renderBusinessTypeSettings()}

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={handlePreviousTab}>
                      পূর্ববর্তী
                    </Button>
                    <Button type="button" onClick={handleNextTab}>
                      পরবর্তী
                    </Button>
                  </div>
                </TabsContent>
                
                {/* অতিরিক্ত তথ্য ট্যাব */}
                <TabsContent value="additional" className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="termsConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ব্যবসার শর্তাবলী</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="আপনার ব্যবসার শর্তাবলী এবং নীতিমালা" 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-6">
                    <h3 className="text-lg font-medium mb-4">সাফল্যের টিপস</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>সম্পূর্ণ প্রোফাইল তথ্য প্রদান করুন</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>আকর্ষণীয় ছবি এবং বিবরণ দিন</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>মূল্য প্রতিযোগিতামূলক রাখুন</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>গ্রাহকদের প্রশ্নের দ্রুত উত্তর দিন</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>নিয়মিত নতুন আইটেম যোগ করুন</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={handlePreviousTab}>
                      পূর্ববর্তী
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          প্রক্রিয়াকরণ হচ্ছে...
                        </>
                      ) : (
                        "ব্যবসা তৈরি করুন"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStore;
