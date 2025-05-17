
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import StoreFeaturesList from '@/components/store/StoreFeaturesList';

const OnlineStoreFeatures = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">আপনার অনলাইন স্টোর তৈরি করুন</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          সহজে ব্যবহারযোগ্য এবং পাওয়ারফুল ফিচার সহ আপনার ব্যবসা অনলাইনে নিয়ে আসুন
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <Badge variant="outline" className="mb-4">নতুন ব্যবসায়ীদের জন্য উপযুক্ত</Badge>
            <h2 className="text-2xl font-bold mb-4">সমস্ত ফিচার একটি সহজ মূল্যে</h2>
            <p className="mb-4">
              আমাদের অনলাইন স্টোর সল্যুশন আপনাকে সম্পূর্ণ ব্যবসায়িক সমাধান প্রদান করে - টেমপ্লেট থেকে শুরু করে পেমেন্ট প্রসেসিং পর্যন্ত।
            </p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">৳১০,০০০/বছর</span>
              <span className="text-sm ml-2 text-muted-foreground">১৫ দিনের ফ্রি ট্রায়াল</span>
            </div>
            <div className="flex gap-3">
              <Button size="lg">ফ্রি ট্রায়াল শুরু করুন</Button>
              <Button variant="outline" size="lg">ডেমো দেখুন</Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://i.imgur.com/sZVqRWu.png" 
              alt="অনলাইন স্টোর টেমপ্লেট" 
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Ready-to-Create Features List */}
      <StoreFeaturesList />

      <Separator className="my-8" />

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">আপনার ব্যবসা অনলাইনে নিয়ে আসুন</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          কোনো প্রোগ্রামিং জ্ঞান ছাড়াই আপনার ব্যবসার জন্য একটি পেশাদার ওয়েবসাইট তৈরি করুন
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/create-store/new">
            <Button size="lg">
              আপনার স্টোর তৈরি করুন
            </Button>
          </Link>
          <Button variant="outline" size="lg">আরো জানুন</Button>
        </div>
      </div>
    </div>
  );
};

export default OnlineStoreFeatures;
