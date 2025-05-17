
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { toast } from "sonner";

export const ColorSchemeSelector: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>কালার স্কিম</CardTitle>
        <CardDescription>আপনার কোর্সের কালার থিম কাস্টমাইজ করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div 
              className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
              style={{ backgroundColor: '#7C3AED' }}
              onClick={() => toast.success("প্রাইমারি কালার সিলেক্ট করা হয়েছে")}
            >
              প্রাইমারি
            </div>
            <div 
              className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
              style={{ backgroundColor: '#EC4899' }}
              onClick={() => toast.success("সেকেন্ডারি কালার সিলেক্ট করা হয়েছে")}
            >
              সেকেন্ডারি
            </div>
            <div 
              className="rounded-md cursor-pointer h-16 flex justify-center items-center text-white" 
              style={{ backgroundColor: '#10B981' }}
              onClick={() => toast.success("একসেন্ট কালার সিলেক্ট করা হয়েছে")}
            >
              একসেন্ট
            </div>
            <div 
              className="rounded-md cursor-pointer h-16 flex justify-center items-center" 
              style={{ backgroundColor: '#F3F4F6', color: '#1F2937' }}
              onClick={() => toast.success("ব্যাকগ্রাউন্ড কালার সিলেক্ট করা হয়েছে")}
            >
              ব্যাকগ্রাউন্ড
            </div>
          </div>
          <div className="pt-4">
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              অ্যাডভান্সড কাস্টমাইজেশন
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
