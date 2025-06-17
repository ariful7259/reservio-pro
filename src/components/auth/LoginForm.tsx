
import React, { useState } from 'react';
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("ইমেইল অবৈধ"),
  password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
});

interface LoginFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  loginType: "user" | "admin" | "seller";
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loginType }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const isSubmitting = form.formState.isSubmitting;

  return (
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
  );
};
