
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  email: z.string().email("ইমেইল অবৈধ"),
  password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  
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
      
      if (loginType === "admin") {
        // অ্যাডমিন চেক করা
        if (values.email === "admin@example.com" && values.password === "admin123456") {
          toast({
            title: "অ্যাডমিন লগইন সফল",
            description: "আপনি সফলভাবে অ্যাডমিন হিসেবে লগইন করেছেন",
          });
          navigate("/admin-dashboard");
        } else {
          toast({
            title: "অ্যাডমিন লগইন ব্যর্থ",
            description: "আপনার ইমেইল বা পাসওয়ার্ড ভুল, অথবা আপনার অ্যাডমিন অ্যাকসেস নেই",
            variant: "destructive",
          });
        }
      } else {
        // সাধারণ ব্যবহারকারী লগইন
        toast({
          title: "লগইন সফল",
          description: "আপনি সফলভাবে লগইন করেছেন",
        });
        navigate("/profile");
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
    <div className="container px-4 pt-24 pb-24 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">লগইন</CardTitle>
          <CardDescription>আপনার অ্যাকাউন্টে প্রবেশ করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="user"
            value={loginType}
            onValueChange={(value) => setLoginType(value as "user" | "admin")}
            className="mb-4"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="user">ব্যবহারকারী</TabsTrigger>
              <TabsTrigger value="admin">অ্যাডমিন</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <p className="text-sm text-center text-muted-foreground mb-4">
                সাধারণ ব্যবহারকারী হিসেবে লগইন করুন
              </p>
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> অপেক্ষা করুন
                  </>
                ) : (
                  loginType === "admin" ? "অ্যাডমিন লগইন" : "লগইন করুন"
                )}
              </Button>
            </form>
          </Form>
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
  );
};

export default Login;
