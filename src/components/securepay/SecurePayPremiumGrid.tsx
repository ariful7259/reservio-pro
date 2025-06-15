
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const premiumTemplates = [
  {
    title: "Facebook Ads Campaign",
    type: "মার্কেটিং",
    desc: "Facebook বিজ্ঞাপন ক্যাম্পেইন সেটআপ ও পরিচালনার জন্য প্রিমিয়াম সার্ভিস।",
    action: "অর্ডার করুন"
  },
  {
    title: "Google Ads Expert",
    type: "মার্কেটিং",
    desc: "Google Ads সার্ভিসের জন্য বিশেষজ্ঞদের দ্বারা কনফিগারেশন।",
    action: "অর্ডার করুন"
  },
  {
    title: "Logo Design Service",
    type: "ডিজাইন",
    desc: "প্রফেশনাল লোগো ডিজাইনের জন্য নির্ভরযোগ্য শিল্পী।",
    action: "অর্ডার করুন"
  },
  {
    title: "Web Development",
    type: "ডেভেলপমেন্ট",
    desc: "ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট সার্ভিস দ্রুত ডেলিভারিতে।",
    action: "অর্ডার করুন"
  },
  {
    title: "Content Writing",
    type: "মার্কেটিং",
    desc: "ব্লগ, ওয়েব ও সোশ্যাল মিডিয়ার জন্য কনটেন্ট রাইটিং সার্ভিস।",
    action: "অর্ডার করুন"
  },
  {
    title: "SEO Service",
    type: "মার্কেটিং",
    desc: "SEO অপটিমাইজড কনটেন্ট ও টেকনিক্যাল অপ্টিমাইজেশন সার্ভিস।",
    action: "অর্ডার করুন"
  },
  {
    title: "Video Editing",
    type: "ডিজাইন",
    desc: "ভিডিও এডিটিং, রিলস বানানো এবং প্রোমো ভিডিও সার্ভিস।",
    action: "অর্ডার করুন"
  },
  {
    title: "Social Media Management",
    type: "মার্কেটিং",
    desc: "সোশ্যাল মিডিয়া হ্যান্ডেল ও কন্টেন্ট প্ল্যানিং।",
    action: "অর্ডার করুন"
  }
];

const SecurePayPremiumGrid: React.FC = () => (
  <section className="bg-white pt-8 pb-14 px-2">
    {/* CTA Card Row */}
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      <div className="rounded-xl border border-gray-200 shadow bg-gradient-to-r from-[#F7F6FF] to-[#EAF6FF] flex items-center justify-center p-6 hover:scale-105 transition-all">
        <div>
          <div className="text-md font-semibold mb-2 text-slate-700">ক্রিয়েটর হিসেবে শুরু করুন</div>
          <p className="text-sm text-gray-600 mb-2">নিজের সার্ভিস টেম্প্লেট তৈরি করুন</p>
          <Button className="bg-blue-600 text-white rounded-full px-5 py-2 text-base">টেম্প্লেট তৈরি করুন</Button>
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 shadow bg-gradient-to-r from-[#EAF6FF] to-[#F7F6FF] flex items-center justify-center p-6 hover:scale-105 transition-all">
        <div>
          <div className="text-md font-semibold mb-2 text-slate-700">বায়ার হিসেবে যোগ দিন</div>
          <p className="text-sm text-gray-600 mb-2">নিরাপদে সার্ভিস নিন</p>
          <Button variant="outline" className="rounded-full px-5 py-2 text-base border-blue-600 text-blue-600">টেম্পলেট ব্রাউজ করুন</Button>
        </div>
      </div>
    </div>
    {/* Premium Card Grid */}
    <div className="max-w-6xl mx-auto">
      <div className="font-bold text-lg text-slate-800 mb-5">৮+ প্রিমিয়াম ক্যাটিগরি পেমেন্ট টেম্পলেট</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {premiumTemplates.map((pt, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-gradient-to-t from-[#f8faff] to-white shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-all h-full">
            <div className="w-10 h-10 mb-2">
              <img src="/lovable-uploads/af26b593-49f2-496d-9d36-e1176ad4c8cc.png" alt="icon" className="h-10 w-10 object-contain rounded-full mx-auto" />
            </div>
            <div className="text-base font-bold mb-1 text-slate-800">{pt.title}</div>
            <Badge className="mb-2 bg-blue-100 text-blue-700 rounded-full">{pt.type}</Badge>
            <div className="text-xs text-gray-600 mb-3">{pt.desc}</div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full px-3 py-1 text-xs">ডিটেইল</Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs">{pt.action}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SecurePayPremiumGrid;
