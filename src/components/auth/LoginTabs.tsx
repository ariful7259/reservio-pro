
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Store } from "lucide-react";

interface LoginTabsProps {
  loginType: "user" | "admin" | "seller";
  setLoginType: (type: "user" | "admin" | "seller") => void;
}

export const LoginTabs: React.FC<LoginTabsProps> = ({ loginType, setLoginType }) => {
  return (
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
  );
};
