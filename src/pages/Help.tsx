
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Help = () => {
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">হেল্প এন্ড সাপোর্ট</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">সাধারণ প্রশ্নোত্তর</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>কিভাবে অ্যাকাউন্ট তৈরি করব?</AccordionTrigger>
              <AccordionContent>
                উপরের ডান দিকে "সাইন আপ" বাটনে ক্লিক করে আপনার নাম, ইমেইল এবং পাসওয়ার্ড দিয়ে অ্যাকাউন্ট তৈরি করতে পারেন।
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>কিভাবে সার্ভিস বুক করব?</AccordionTrigger>
              <AccordionContent>
                আপনার পছন্দের সার্ভিসটি বেছে নিন, তারপর "বুক করুন" বাটনে ক্লিক করুন। এরপর প্রয়োজনীয় তথ্য দিয়ে আপনার বুকিং সম্পন্ন করুন।
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>পেমেন্ট পদ্ধতি কি কি?</AccordionTrigger>
              <AccordionContent>
                আমরা ওয়ালেট, মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট), এবং ক্রেডিট/ডেবিট কার্ড গ্রহণ করি।
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>কিভাবে রিফান্ড পাব?</AccordionTrigger>
              <AccordionContent>
                যদি আপনি কোন সার্ভিস বাতিল করেন, আমাদের রিফান্ড পলিসি অনুযায়ী আপনি রিফান্ড পাবেন। রিফান্ড প্রসেস সম্পর্কে বিস্তারিত জানতে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">যোগাযোগ করুন</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">নাম</label>
              <Input id="name" placeholder="আপনার নাম" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">ইমেইল</label>
              <Input id="email" placeholder="আপনার ইমেইল" type="email" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">মেসেজ</label>
              <Textarea id="message" placeholder="আপনার মেসেজ লিখুন" rows={4} />
            </div>
            <Button type="submit" className="w-full">পাঠিয়ে দিন</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
