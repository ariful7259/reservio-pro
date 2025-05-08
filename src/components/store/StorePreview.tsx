
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StorePreviewProps {
  currentStep: number;
  storeName: string;
}

const StorePreview = ({ currentStep, storeName }: StorePreviewProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="font-semibold">স্টোর প্রিভিউ</h3>
        <p className="text-sm text-muted-foreground">
          আপনার অনলাইন স্টোর এমন দেখাবে
        </p>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b flex items-center justify-between">
            <div className="font-medium">{storeName || "আপনার স্টোর"}</div>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="aspect-[4/3] bg-white flex items-center justify-center">
            {currentStep === 1 && (
              <div className="text-center px-4">
                <p className="text-gray-500">আপনার স্টোরের তথ্য প্রদান করুন</p>
              </div>
            )}
            {currentStep === 2 && (
              <div className="text-center p-4">
                <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                  <div className="aspect-video bg-gray-100 rounded"></div>
                  <div className="aspect-video bg-gray-100 rounded"></div>
                  <div className="aspect-video bg-gray-100 rounded"></div>
                  <div className="aspect-video bg-gray-100 rounded"></div>
                </div>
                <p className="text-gray-500 mt-2">টেমপ্লেট নির্বাচন করুন</p>
              </div>
            )}
            {currentStep === 3 && (
              <div className="text-center p-4">
                <div className="grid grid-cols-2 gap-3 mb-3 max-w-xs mx-auto">
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-500">প্রোডাক্ট ১</p>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-500">প্রোডাক্ট ২</p>
                  </div>
                </div>
                <p className="text-gray-500">আপনার প্রোডাক্ট যোগ করুন</p>
              </div>
            )}
            {currentStep === 4 && (
              <div className="text-center p-4 max-w-xs mx-auto">
                <div className="py-2 px-3 border rounded flex items-center justify-between mb-2">
                  <span className="text-sm">বিকাশ</span>
                  <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                </div>
                <div className="py-2 px-3 border rounded flex items-center justify-between mb-2">
                  <span className="text-sm">নগদ</span>
                  <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                </div>
                <div className="py-2 px-3 border rounded flex items-center justify-between">
                  <span className="text-sm">ক্যাশ অন ডেলিভারি</span>
                  <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                </div>
                <p className="text-gray-500 mt-3">পেমেন্ট অপশন সেটআপ করুন</p>
              </div>
            )}
            {currentStep === 5 && (
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-500">আপনার স্টোর লাইভ করতে প্রস্তুত!</p>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex items-center justify-between bg-gray-50">
            <div className="text-sm text-muted-foreground">
              {`ধাপ ${currentStep}/5`}
            </div>
            <Button size="sm" variant="outline">প্রিভিউ দেখুন</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorePreview;
