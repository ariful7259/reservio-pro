
import React from 'react';
import { MessageCircle, Youtube, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CommunitySupport = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium mb-2">সাপোর্ট ক্যাটাগরি</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium">লাইভ চ্যাট</h4>
              <p className="text-xs text-muted-foreground mt-1">
                একজন স্পেশালিস্টের সাথে কথা বলুন
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-medium">টিউটোরিয়াল ভিডিও</h4>
              <p className="text-xs text-muted-foreground mt-1">
                স্টেপ-বাই-স্টেপ গাইড
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-medium">ডকুমেন্টেশন</h4>
              <p className="text-xs text-muted-foreground mt-1">
                বিস্তারিত গাইড এবং টিপস
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <HelpCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium">FAQ</h4>
              <p className="text-xs text-muted-foreground mt-1">
                সাধারণ প্রশ্ন ও উত্তর
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="border-t border-b py-6">
        <h3 className="font-medium mb-4">সাধারণ সমস্যা</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <h4 className="font-medium mb-1">কিভাবে ডোমেইন সেটআপ করব?</h4>
            <p className="text-sm text-muted-foreground">ডোমেইন রেজিস্টার ও DNS কনফিগারেশন করার নিয়ম।</p>
          </div>
          
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <h4 className="font-medium mb-1">পেমেন্ট গেটওয়ে কিভাবে যোগ করব?</h4>
            <p className="text-sm text-muted-foreground">বিভিন্ন পেমেন্ট গেটওয়ে ইন্টিগ্রেশন করার নিয়ম।</p>
          </div>
          
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <h4 className="font-medium mb-1">বাল্ক প্রোডাক্ট কিভাবে আপলোড করব?</h4>
            <p className="text-sm text-muted-foreground">CSV ব্যবহার করে একসাথে অনেক প্রোডাক্ট আপলোড করার নিয়ম।</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">সরাসরি যোগাযোগ</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input placeholder="আপনার প্রশ্ন লিখুন..." />
          </div>
          
          <Button className="w-full">প্রশ্ন পাঠান</Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          সাধারণত ২৪ ঘন্টার মধ্যে উত্তর দেওয়া হয়
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
          <MessageCircle className="h-4 w-4" />
          কমিউনিটি সাপোর্ট
        </h3>
        <p className="text-sm text-blue-700 mb-4">
          আমাদের অনলাইন কমিউনিটিতে যোগ দিন, যেখানে অন্যান্য ব্যবহারকারীরা এবং বিশেষজ্ঞরা প্রশ্নের উত্তর দেন এবং টিপস শেয়ার করেন।
        </p>
        <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
          কমিউনিটিতে যোগ দিন
        </Button>
      </div>
    </div>
  );
};

export default CommunitySupport;
