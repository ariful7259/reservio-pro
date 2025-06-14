
import React from "react";
import { Heart, ListChecks, MapPin, Globe, Star, View, Clock, Lock, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

// ওয়িশ-টু-আর্ন ফ্যাসিলিটি সেকশন
export const Wish2EarnSection: React.FC = () => {
  return (
    <div className="space-y-2 p-4 border rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200 animate-fade-in shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center">
          <Heart className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-pink-700">Wish2Earn 🔥</h3>
          <p className="text-[13px] text-gray-700">ইচ্ছা পূরণ, টাস্কে আয়, সার্ভিস ও রেন্ট!</p>
        </div>
      </div>
      <ul className="pl-1 mb-3 space-y-1 text-[15px] text-gray-900">
        <li className="flex items-start gap-2"><ListChecks className="h-5 w-5 text-blue-400 mt-1" /> <span className="font-bold">Wishlist → Task Unlock System</span> <span className="text-gray-600 block">ইউজার Wishlist করবে, Earn Goal পূরণ করতে হবে</span></li>
        <li>
          <span className="flex items-center gap-2 mb-0.5 font-bold"><Star className="h-5 w-5 text-green-400" />Task Based Earning Options</span>
          <ul className="ml-4 list-[circle] text-[14px] text-gray-800 gap-0.5 space-y-0.5">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-500" /><span>Location-Based Task: লোকেশন অনুযায়ী টাস্ক — যেমন “এলাকায় খাবার ডেলিভারি = ৳১০০”</span></li>
            <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-sky-500" /><span>Global Digital Task: সবাই করতে পারবে যেমন ভিডিও শেয়ার, রেফারেল, ডিজিটাল সার্ভিস</span></li>
          </ul>
        </li>
        <li>
          <span className="flex items-center gap-2 mb-0.5 font-bold"><Camera className="h-5 w-5 text-purple-400" />Own Service/Product Rent</span>
          <span className="block text-gray-700 ml-7">জিনিস/ডিজিটাল কনটেন্ট রেন্ট দিন—Earn হবে, Earn টাকা দিয়ে Wishlist Unlock হবে</span>
        </li>
        <li className="flex items-center gap-2"><MapPin className="h-5 w-5 text-rose-400" /> <span className="font-bold">Task & Service Nearby Map</span>
          <span className="text-gray-700 block">“Nearby Opportunity” ম্যাপ—চারপাশের ইনকামের সুযোগ</span>
        </li>
        <li>
          <span className="flex items-center gap-2 font-bold"><Video className="h-5 w-5 text-indigo-400" /> In-app Product Upload</span>
          <span className="block text-gray-700 ml-7">নিজের প্রোডাক্ট/সার্ভিস/রেন্ট সহজেই যুক্ত করুন</span>
        </li>
        <li>
          <span className="flex items-center gap-2 font-bold"><Clock className="h-5 w-5 text-pink-500" />Wishlist Countdown + Earn Meter</span>
          <span className="block text-gray-700 ml-7">Earn, বাকি টাকা, Countdown — সব ট্র্যাক করুন</span>
        </li>
        <li className="flex items-center gap-2"><Lock className="h-5 w-5 text-amber-500" /><span className="font-bold">Partial Unlock + Retry</span>
          <span className="text-gray-700 block">টার্গেট না হলে কিছু টাকা দিয়ে Unlock, অথবা আবার চেষ্টা করুন</span>
        </li>
        <li className="flex items-center gap-2"><View className="h-5 w-5 text-pink-400" /><span className="font-bold">Video Link Earn + Custom Player</span>
          <span className="text-gray-700 block">ভিডিও/ফাইল শেয়ার করে ইনকাম, ভিউ-ভিত্তিক আয় ও নিরাপদ প্লেয়ার</span>
        </li>
      </ul>
      <Button className="w-full" variant="default">শুরু করুন</Button>
    </div>
  );
};

export default Wish2EarnSection;
