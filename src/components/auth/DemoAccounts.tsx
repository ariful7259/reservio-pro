
import React from 'react';
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface DemoAccountsProps {
  form: UseFormReturn<{
    email: string;
    password: string;
  }>;
  setLoginType: (type: "user" | "admin" | "seller") => void;
}

export const DemoAccounts: React.FC<DemoAccountsProps> = ({ form, setLoginType }) => {
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
  );
};
