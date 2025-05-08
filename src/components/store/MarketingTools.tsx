
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MarketingTools = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <h3 className="font-semibold">মার্কেটিং টুলস</h3>
        <p className="text-sm text-muted-foreground">
          আপনার স্টোর প্রচার করতে মার্কেটিং টুলস ব্যবহার করুন
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">ফ্রি SMS মার্কেটিং</h4>
            <p className="text-xs text-muted-foreground">৫০টি ফ্রি SMS সহ শুরু করুন</p>
          </div>
          <Button size="sm" variant="outline">সেটআপ</Button>
        </div>

        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">ইমেইল মার্কেটিং</h4>
            <p className="text-xs text-muted-foreground">প্রো প্ল্যান সাবস্ক্রাইব করে এক্টিভেট করুন</p>
          </div>
          <Button size="sm" variant="outline">আনলক</Button>
        </div>

        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">সোশ্যাল মিডিয়া ইন্টিগ্রেশন</h4>
            <p className="text-xs text-muted-foreground">ফেসবুক, ইন্সটাগ্রাম এবং আরও অনেক কিছু</p>
          </div>
          <Button size="sm" variant="outline">কানেক্ট</Button>
        </div>

        <div className="p-3 border rounded-md bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            এই টুলগুলি দিয়ে আপনি আপনার ব্যবসা বাড়ানোর জন্য মার্কেটিং ক্যাম্পেইন চালাতে পারবেন।
            আরও জানতে <span className="text-primary cursor-pointer">হেল্প সেন্টার</span> দেখুন।
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingTools;
