
import React from 'react';
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("ইমেইল অবৈধ"),
  password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"),
});

interface DemoAccountsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  setLoginType: (type: "user" | "admin" | "seller") => void;
}

export const DemoAccounts: React.FC<DemoAccountsProps> = ({ form, setLoginType }) => {
  const demoAccounts = {
    user: { email: "akash@example.com", password: "password123" },
    seller: { email: "seller@example.com", password: "password123" },
    admin: { email: "admin@example.com", password: "admin123456" },
  };

  const handleDemoLogin = async (type: string) => {
    if (type in demoAccounts) {
      const account = demoAccounts[type as keyof typeof demoAccounts];
      
      // Set form values
      form.setValue("email", account.email);
      form.setValue("password", account.password);
      
      // Set login type
      if (type === "admin") {
        setLoginType("admin");
      } else if (type === "seller") {
        setLoginType("seller");
      } else {
        setLoginType("user");
      }

      // Wait a bit for form to update then submit
      setTimeout(() => {
        form.handleSubmit((data) => {
          // This will trigger the onSubmit function passed to LoginForm
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          const formElement = document.querySelector('form');
          if (formElement) {
            formElement.dispatchEvent(submitEvent);
          }
        })();
      }, 100);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-sm text-center mb-2 text-muted-foreground">ডেমো অ্যাকাউন্টস (ক্লিক করুন):</p>
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
