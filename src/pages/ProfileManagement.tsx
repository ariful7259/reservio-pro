
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Camera, Edit, Loader2, LogOut, ShieldCheck, User, Store, Building, Wrench, Video, BarChart3, Lock, Key, Smartphone, AlertCircle, Badge } from "lucide-react";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const profileFormSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  email: z.string().email("ইমেইল অবৈধ").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "বর্তমান পাসওয়ার্ড দিন"),
  newPassword: z.string().min(8, "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
  confirmNewPassword: z.string().min(8, "পাসওয়ার্ড নিশ্চিত করুন"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "নতুন পাসওয়ার্ড মিলছে না",
  path: ["confirmNewPassword"],
});

const ProfileManagement = () => {
  const { user, isAuthenticated, logout, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isProfileSubmitting = profileForm.formState.isSubmitting;
  const isSecuritySubmitting = securityForm.formState.isSubmitting;

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      updateUserProfile(values);
      toast({
        title: "প্রোফাইল আপডেট সম্পন্ন",
        description: "আপনার প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "আপডেট ব্যর্থ",
        description: "প্রোফাইল আপডেট করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    }
  };

  const onSecuritySubmit = async (values: z.infer<typeof securityFormSchema>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "পাসওয়ার্ড আপডেট সম্পন্ন",
        description: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে",
      });
      securityForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Password update error:", error);
      toast({
        title: "পাসওয়ার্ড আপডেট ব্যর্থ",
        description: "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট করেছেন",
    });
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container px-4 pt-24 pb-24">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Card className="w-full sm:w-64">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" /> লগআউট
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general" className="flex gap-2 items-center">
                  <User className="h-4 w-4" /> প্রোফাইল তথ্য
                </TabsTrigger>
                <TabsTrigger value="security" className="flex gap-2 items-center">
                  <ShieldCheck className="h-4 w-4" /> সিকিউরিটি
                </TabsTrigger>
                <TabsTrigger value="kyc" className="flex gap-2 items-center">
                  <Badge className="h-4 w-4" /> KYC
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>প্রোফাইল তথ্য</CardTitle>
                    <CardDescription>
                      আপনার ব্যক্তিগত তথ্য আপডেট করুন
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>নাম</FormLabel>
                              <FormControl>
                                <Input placeholder="আপনার নাম" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ইমেইল</FormLabel>
                              <FormControl>
                                <Input placeholder="আপনার ইমেইল" type="email" disabled {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ফোন নাম্বার</FormLabel>
                              <FormControl>
                                <Input placeholder="আপনার ফোন নাম্বার" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ঠিকানা</FormLabel>
                              <FormControl>
                                <Textarea placeholder="আপনার ঠিকানা" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isProfileSubmitting}>
                          {isProfileSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> আপডেট হচ্ছে
                            </>
                          ) : (
                            <>
                              <Edit className="mr-2 h-4 w-4" /> আপডেট করুন
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="space-y-6">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">সিকিউরিটি স্কোর</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">সিকিউরিটি স্কোর</h3>
                          <UIBadge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">যাচাই করুন</UIBadge>
                        </div>
                        <Progress value={70} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">৭০% সুরক্ষিত</span>
                          <span className="text-amber-600">সুপারিশ</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">উন্নত নিরাপত্তার জন্য ২FA সক্রিয় করুন</p>
                      <Button variant="default" className="w-full" onClick={() => navigate('/security/2fa')}>
                        নিরাপত্তা বাড়ান
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">টু-ফ্যাক্টর অথেনটিকেশন (2FA)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-5">
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Smartphone className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">মোবাইল OTP</p>
                            <p className="text-sm text-muted-foreground">লগইন করতে মোবাইলে পাঠানো OTP ব্যবহার করুন</p>
                          </div>
                        </div>
                        <UIBadge className="bg-green-100 text-green-600 border-0">সক্রিয়</UIBadge>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Key className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">অথেনটিকেটর অ্যাপ</p>
                            <p className="text-sm text-muted-foreground">Google Authenticator বা অন্য 2FA অ্যাপ ব্যবহার করুন</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          সক্রিয় করুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">পাসওয়ার্ড পরিবর্তন</CardTitle>
                      <CardDescription>
                        আপনার অ্যাকাউন্টের সিকিউরিটি আপডেট করুন
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...securityForm}>
                        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                          <FormField
                            control={securityForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>বর্তমান পাসওয়ার্ড</FormLabel>
                                <FormControl>
                                  <Input placeholder="বর্তমান পাসওয়ার্ড" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={securityForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>নতুন পাসওয়ার্ড</FormLabel>
                                <FormControl>
                                  <Input placeholder="নতুন পাসওয়ার্ড" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={securityForm.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>নতুন পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                                <FormControl>
                                  <Input placeholder="নতুন পাসওয়ার্ড আবার লিখুন" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isSecuritySubmitting}>
                            {isSecuritySubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> আপডেট হচ্ছে
                              </>
                            ) : (
                              "পাসওয়ার্ড আপডেট করুন"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="kyc">
                <div className="space-y-6">
                  <Card className="border">
                    <CardContent className="p-5">
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">KYC সম্পূর্ণতা</h3>
                          <span className="text-sm font-medium">৫০%</span>
                        </div>
                        <Progress value={50} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">আরও ২টি ধাপ বাকি আছে</span>
                          <span className="text-amber-600">পেন্ডিং</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">আপনার KYC প্রক্রিয়া সম্পূর্ণ করতে বাকি স্টেপগুলো শেষ করুন</p>
                      <Button variant="default" className="w-full" onClick={() => navigate('/kyc-verification')}>
                        KYC সম্পূর্ণ করুন
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">KYC স্ট্যাটাস</CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">ব্যক্তিগত তথ্য</p>
                            <p className="text-sm text-muted-foreground">নাম, জন্ম তারিখ, এবং যোগাযোগের তথ্য</p>
                          </div>
                        </div>
                        <UIBadge className="bg-green-100 text-green-600 border-0">সম্পূর্ণ</UIBadge>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">NID যাচাইকরণ</p>
                            <p className="text-sm text-muted-foreground">জাতীয় পরিচয়পত্রের তথ্য যাচাইকরণ</p>
                          </div>
                        </div>
                        <UIBadge className="bg-amber-100 text-amber-600 border-0">পেন্ডিং</UIBadge>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <Smartphone className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">মোবাইল ভেরিফিকেশন</p>
                            <p className="text-sm text-muted-foreground">মোবাইল নম্বর যাচাইকরণ</p>
                          </div>
                        </div>
                        <UIBadge className="bg-red-100 text-red-600 border-0">অসম্পূর্ণ</UIBadge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
