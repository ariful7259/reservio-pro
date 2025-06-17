
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Loader2, Shield, Store, Fingerprint, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  email: z.string().email("ইমেইল অবৈধ"),
  password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"user" | "admin" | "seller">("user");
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  
  // Check if biometric authentication is available
  useEffect(() => {
    if ('credentials' in navigator && 'create' in navigator.credentials) {
      setBiometricAvailable(true);
    }
  }, []);
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || "/profile";
      
      if (from.includes('/seller-dashboard')) {
        navigate(from);
        return;
      }
      
      if (isAdmin) {
        navigate("/admin-dashboard");
      } else if (loginType === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate(from);
      }
    }
  }, [isAuthenticated, isAdmin, navigate, location.state?.from, loginType]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const isSubmitting = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values.email, values.password);
      
      // লগইন সফল হলে বার্তা প্রদর্শন
      toast({
        title: "লগইন সফল",
        description: "আপনি সফলভাবে লগইন করেছেন",
      });
      
      // লগইন প্রকার অনুসারে রিডাইরেক্ট
      if (loginType === "admin") {
        if (values.email === "admin@example.com") {
          navigate("/admin-dashboard");
        } else {
          toast({
            title: "অ্যাডমিন লগইন ব্যর্থ",
            description: "আপনার অ্যাডমিন অ্যাকসেস নেই",
            variant: "destructive",
          });
        }
      } else if (loginType === "seller") {
        navigate("/seller-dashboard");
      } else {
        const from = location.state?.from || "/profile";
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "লগইন ব্যর্থ",
        description: "আপনার ইমেইল বা পাসওয়ার্ড ভুল",
        variant: "destructive",
      });
    }
  };

  const handleBiometricLogin = async () => {
    try {
      if (!biometricAvailable) {
        toast({
          title: "বায়োমেট্রিক অনুপলব্ধ",
          description: "আপনার ডিভাইসে বায়োমেট্রিক লগইন সাপোর্ট করে না",
          variant: "destructive",
        });
        return;
      }

      // Simulate biometric authentication
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: "required"
        }
      });

      if (credential) {
        // For demo purposes, auto-login as user
        await login("akash@example.com", "password123");
        toast({
          title: "বায়োমেট্রিক লগইন সফল",
          description: "আপনি সফলভাবে বায়োমেট্রিক দিয়ে লগইন করেছেন",
        });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Biometric login error:", error);
      toast({
        title: "বায়োমেট্রিক লগইন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন বা পাসওয়ার্ড ব্যবহার করুন",
        variant: "destructive",
      });
    }
  };

  // ডিমো ইউজার অ্যাকাউন্টস গুলো
  const demoAccounts = {
    user: { email: "akash@example.com", password: "password123" },
    seller: { email: "seller@example.com", password: "password123" },
    admin: { email: "admin@example.com", password: "admin123456" },
  };

  const handleDemoLogin = (type: string) => {
    if (type in demoAccounts) {
      const account = demoAccounts[type as keyof typeof demoAccounts];
      form.setValue("email", account.email);
      form.setValue("password", account.password);
      
      if (type === "admin") {
        setLoginType("admin");
      } else if (type === "seller") {
        setLoginType("seller");
      } else {
        setLoginType("user");
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto">
        {/* App Name Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
            রিজার্ভিও প্রো
          </h1>
          <p className="text-muted-foreground text-sm">
            আপনার ডিজিটাল জীবনের সহায়ক
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">লগইন</CardTitle>
            <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="user"
              value={loginType}
              onValueChange={(value) => setLoginType(value as "user" | "admin" | "seller")}
              className="mb-4"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="user">ব্যবহারকারী</TabsTrigger>
                <TabsTrigger value="seller">বিক্রেতা</TabsTrigger>
                <TabsTrigger value="admin">অ্যাডমিন</TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <p className="text-sm text-center text-muted-foreground mb-4">
                  সাধারণ ব্যবহারকারী হিসেবে লগইন করুন
                </p>
              </TabsContent>
              <TabsContent value="seller">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Store className="h-5 w-5 text-primary" />
                  <p className="text-sm text-center text-muted-foreground">
                    বিক্রেতা হিসেবে লগইন করতে আপনার বিক্রেতা শংসাপত্র ব্যবহার করুন
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="admin">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <p className="text-sm text-center text-muted-foreground">
                    অ্যাডমিন হিসেবে লগইন করতে আপনার প্রশাসনিক শংসাপত্র ব্যবহার করুন
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Biometric Login Section */}
            {biometricAvailable && (
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      অথবা
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4 border-primary/20 hover:bg-primary/5"
                  onClick={handleBiometricLogin}
                >
                  <Fingerprint className="mr-2 h-5 w-5 text-primary" />
                  বায়োমেট্রিক লগইন
                </Button>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ইমেইল</FormLabel>
                      <FormControl>
                        <Input placeholder="আপনার ইমেইল" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>পাসওয়ার্ড</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="আপনার পাসওয়ার্ড"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> অপেক্ষা করুন
                    </>
                  ) : (
                    loginType === "admin" 
                      ? "অ্যাডমিন লগইন" 
                      : loginType === "seller"
                        ? "বিক্রেতা লগইন"
                        : "লগইন করুন"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <p className="text-sm text-center mb-2 text-muted-foreground">ডেমো অ্যাকাউন্টস:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDemoLogin("user")}>
                  ব্যবহারকারী
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDemoLogin("seller")}>
                  বিক্রেতা
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDemoLogin("admin")}>
                  অ্যাডমিন
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="text-center text-sm">
              অ্যাকাউন্ট নেই?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                রেজিস্ট্রেশন করুন
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
