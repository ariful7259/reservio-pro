
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/auth/AppHeader";
import { LoginTabs } from "@/components/auth/LoginTabs";
import { BiometricLogin } from "@/components/auth/BiometricLogin";
import { LoginForm } from "@/components/auth/LoginForm";
import { DemoAccounts } from "@/components/auth/DemoAccounts";

const formSchema = z.object({
  email: z.string().email("ইমেইল অবৈধ"),
  password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
});

const Login = () => {
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

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto">
        <AppHeader />

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">লগইন</CardTitle>
            <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginTabs loginType={loginType} setLoginType={setLoginType} />
            <BiometricLogin biometricAvailable={biometricAvailable} />
            <LoginForm onSubmit={onSubmit} loginType={loginType} />
            <DemoAccounts form={form} setLoginType={setLoginType} onSubmit={onSubmit} />
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
