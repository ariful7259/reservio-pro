
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const PaymentDemo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <h3 className="font-medium text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          পেমেন্ট গেটওয়ে সম্পর্কে
        </h3>
        <p className="text-green-700 mt-1">
          আমাদের প্ল্যাটফর্ম বিকাশ, নগদ, এবং অন্যান্য জনপ্রিয় পেমেন্ট গেটওয়ে সাপোর্ট করে।
          আপনার স্টোর একাধিক পেমেন্ট পদ্ধতি গ্রহণ করতে সক্ষম হবে।
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">পেমেন্ট অপশন সিলেক্ট করুন</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-12 bg-pink-100 rounded flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 0H3C1.35 0 0 1.35 0 3V27C0 28.65 1.35 30 3 30H48C49.65 30 51 28.65 51 27V3C51 1.35 49.65 0 48 0Z" fill="#E2136E" />
                  <path d="M25.5 25C31.0228 25 35.5 20.5228 35.5 15C35.5 9.47715 31.0228 5 25.5 5C19.9772 5 15.5 9.47715 15.5 15C15.5 20.5228 19.9772 25 25.5 25Z" fill="#FFCF00" />
                </svg>
              </div>
              <div>
                <div className="font-medium">বিকাশ</div>
                <div className="text-sm text-muted-foreground">সাধারণ এবং মার্চেন্ট অ্যাকাউন্ট সাপোর্ট করে</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-12 bg-red-100 rounded flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47 0H3C1.35 0 0 1.35 0 3V27C0 28.65 1.35 30 3 30H47C48.65 30 50 28.65 50 27V3C50 1.35 48.65 0 47 0Z" fill="#E43147" />
                  <path d="M24 23C28.9706 23 33 18.9706 33 14C33 9.02944 28.9706 5 24 5C19.0294 5 15 9.02944 15 14C15 18.9706 19.0294 23 24 23Z" fill="#FFFFFF" />
                </svg>
              </div>
              <div>
                <div className="font-medium">নগদ</div>
                <div className="text-sm text-muted-foreground">নগদ সার্ভিস প্রোভাইডার</div>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-12 bg-blue-100 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-medium">ক্যাশ অন ডেলিভারি</div>
                <div className="text-sm text-muted-foreground">গ্রাহক পণ্য হাতে পেয়ে পেমেন্ট করবেন</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-3">বিকাশ পেমেন্ট সেটআপ</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bkashNumber">বিকাশ নাম্বার</Label>
            <Input id="bkashNumber" placeholder="01XXXXXXXXX" />
          </div>
          <div>
            <Label htmlFor="bkashType">অ্যাকাউন্ট টাইপ</Label>
            <Input id="bkashType" defaultValue="মার্চেন্ট" />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button>পেমেন্ট অ্যাকাউন্ট ভেরিফাই করুন</Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentDemo;
