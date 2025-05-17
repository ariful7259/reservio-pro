
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface PricingOption {
  id: string;
  name: string;
  description: string;
}

export const PricingModelSelector: React.FC = () => {
  const pricingOptions: PricingOption[] = [
    { id: 'one-time', name: 'ওয়ান-টাইম পেমেন্ট', description: 'একবার পেমেন্ট, লাইফটাইম অ্যাকসেস' },
    { id: 'subscription', name: 'সাবস্ক্রিপশন', description: 'মাসিক বা বার্ষিক সাবস্ক্রিপশন' },
    { id: 'tiered', name: 'টিয়ার্ড প্রাইসিং', description: 'বিভিন্ন প্রাইস পয়েন্ট, বিভিন্ন ফিচার' },
    { id: 'free', name: 'ফ্রি কোর্স', description: 'বিনামূল্যে, ইমেইল সংগ্রহের জন্য' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>প্রাইসিং মডেল</CardTitle>
        <CardDescription>আপনার কোর্সের প্রাইসিং মডেল নির্বাচন করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingOptions.map((option) => (
            <Card 
              key={option.id}
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => toast.success(`${option.name} প্রাইসিং মডেল সিলেক্ট করা হয়েছে!`)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <h3 className="font-medium text-base mb-1">{option.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{option.description}</p>
                  <div className="mt-auto">
                    <Button variant="outline" size="sm" className="w-full">
                      সিলেক্ট করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
