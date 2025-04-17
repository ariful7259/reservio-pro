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
import { Camera, Edit, Loader2, LogOut, ShieldCheck, User, Store, Building, Wrench, Video, BarChart3 } from "lucide-react";

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
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="general" className="flex gap-2 items-center">
                  <User className="h-4 w-4" /> প্রোফাইল তথ্য
                </TabsTrigger>
                <TabsTrigger value="security" className="flex gap-2 items-center">
                  <ShieldCheck className="h-4 w-4" /> সিকিউরিটি
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
                <Card>
                  <CardHeader>
                    <CardTitle>পাসওয়ার্ড পরিবর্তন</CardTitle>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
