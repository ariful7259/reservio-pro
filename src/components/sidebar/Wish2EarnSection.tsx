
import React from "react";
import { Heart, ListChecks, MapPin, Globe, Star, View, Clock, Lock, Camera, Video, Package, Wrench, Upload, BarChart2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ওয়িশ-টু-আর্ন ফ্যাসিলিটি সেকশন
export const Wish2EarnSection: React.FC = () => {
  return (
    <div className="space-y-2 p-4 border rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200 animate-fade-in shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 flex items-center justify-center shadow-md">
          <Heart className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-pink-700 flex items-center gap-2">
            Wish2Earn 🔥
            <Badge variant="secondary" className="text-xs">নতুন!</Badge>
          </h3>
          <p className="text-[13px] text-gray-700 font-medium">ইচ্ছা পূরণ, টাস্কে আয়, সার্ভিস ও রেন্ট!</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* 1. Wishlist → Task Unlock System */}
        <div className="bg-white/70 rounded-lg p-3 border border-blue-100 shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <ListChecks className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-700 text-sm">🛍️ Wishlist → Task Unlock System</h4>
              <p className="text-xs text-gray-600 leading-tight">ইউজার যেকোনো প্রোডাক্ট বা সার্ভিস Wishlist করবে</p>
              <p className="text-xs text-blue-600 mt-1">নির্দিষ্ট সময়ের মধ্যে Earn Goal পূরণ করতে হবে</p>
            </div>
          </div>
        </div>

        {/* 2. Task Based Earning Options */}
        <div className="bg-white/70 rounded-lg p-3 border border-green-100 shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <Star className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-green-700 text-sm">🎯 Task Based Earning Options</h4>
              
              {/* Location-Based Task */}
              <div className="mt-2 pl-2 border-l-2 border-orange-200">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-700">📍 Location-Based Task</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">লোকেশন অনুযায়ী ফিল্টার করা Task শো করবে</p>
                <div className="text-xs text-orange-600 space-y-0.5">
                  <p>"আপনার এলাকায় একজনকে খাবার পৌঁছে দিন = ৳১০০"</p>
                  <p>"একজনের মোবাইল সারাতে হবে = ৳৩০০"</p>
                </div>
              </div>

              {/* Global Digital Task */}
              <div className="mt-2 pl-2 border-l-2 border-sky-200">
                <div className="flex items-center gap-1 mb-1">
                  <Globe className="h-4 w-4 text-sky-500" />
                  <span className="text-xs font-semibold text-sky-700">🌍 Global Digital Task</span>
                </div>
                <p className="text-xs text-gray-600">রেফারেল, ভিডিও শেয়ার, ডিজিটাল সার্ভিস — যেটা সবাই করতে পারবে</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Own Service / Product Rent */}
        <div className="bg-white/70 rounded-lg p-3 border border-purple-100 shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <Package className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-purple-700 text-sm">💸 Own Service / Product Rent দিয়ে Earn</h4>
              <p className="text-xs text-gray-600 mb-2">ইউজার চাইলে নিচের জিনিস অফার করতে পারবে:</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <Wrench className="h-3 w-3 text-amber-500" />
                  <span className="text-amber-700">🛠️ সার্ভিস (জমি পরিস্কার, ডেলিভারি, ঘর মোছা, ডিজাইন)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3 text-blue-500" />
                  <span className="text-blue-700">📦 প্রোডাক্ট (মোবাইল, ক্যামেরা, বাইক, স্পিকার ইত্যাদি ভাড়া)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="h-3 w-3 text-pink-500" />
                  <span className="text-pink-700">📁 ডিজিটাল কনটেন্ট (ডিজাইন, কোর্স, ফাইল ইত্যাদি)</span>
                </div>
              </div>
              <p className="text-xs text-purple-600 mt-2">Earn করা টাকা Use করে নিজের Wishlist Unlock করা যাবে</p>
            </div>
          </div>
        </div>

        {/* 4. Task & Service Nearby Map */}
        <div className="bg-white/70 rounded-lg p-3 border border-rose-100 shadow-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-rose-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-700 text-sm">📍 Task & Service Nearby Map</h4>
              <p className="text-xs text-gray-600">অ্যাপের হোম পেইজে "Nearby Opportunity" নামে একটা ম্যাপ থাকবে</p>
              <p className="text-xs text-rose-600 mt-1">লোকেশন ভিত্তিক কাজ / রেন্ট চাহিদা দেখাবে</p>
            </div>
          </div>
        </div>

        {/* 5. In-app Product Upload System */}
        <div className="bg-white/70 rounded-lg p-3 border border-indigo-100 shadow-sm">
          <div className="flex items-start gap-2">
            <Upload className="h-5 w-5 text-indigo-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-indigo-700 text-sm">📲 In-app Product Upload System</h4>
              <div className="text-xs text-gray-600 space-y-1 mt-1">
                <p>নিজের সার্ভিস বা প্রোডাক্ট রেজিস্টার করতে পারবে</p>
                <p>রেন্টের মূল্য, সময়, লোকেশন ইত্যাদি দিবে</p>
                <p className="text-indigo-600">ইচ্ছা হলে প্রাইভেট (বন্ধুদের জন্য) বা পাবলিক রাখতে পারবে</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Wishlist Countdown + Earn Meter */}
        <div className="bg-white/70 rounded-lg p-3 border border-cyan-100 shadow-sm">
          <div className="flex items-start gap-2">
            <BarChart2 className="h-5 w-5 text-cyan-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-cyan-700 text-sm">⏱️ Wishlist Countdown + Earn Meter</h4>
              <div className="text-xs text-gray-600 space-y-1 mt-1">
                <p>সময় সীমা অনুযায়ী Earn করতে হবে</p>
                <p className="text-cyan-600">Earn এর পরিমাণ, বাকি টাকার পরিমাণ ও কন্ট্রোল সব থাকবে</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Partial Unlock + Retry Option */}
        <div className="bg-white/70 rounded-lg p-3 border border-amber-100 shadow-sm">
          <div className="flex items-start gap-2">
            <Lock className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-700 text-sm">🔐 Partial Unlock + Retry Option</h4>
              <div className="text-xs text-gray-600 space-y-1 mt-1">
                <p>টার্গেট Fulfill না হলে আংশিক টাকা দিয়ে Unlock</p>
                <p className="text-amber-600">ব্যর্থ হলে আবার Wishlist করা যাবে (কম বোনাসে)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Video Link Earn + Custom Player */}
        <div className="bg-white/70 rounded-lg p-3 border border-emerald-100 shadow-sm">
          <div className="flex items-start gap-2">
            <Video className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-700 text-sm">📺 Video Link Earn + Custom Player</h4>
              <div className="text-xs text-gray-600 space-y-1 mt-1">
                <p>ভিডিও/ফাইল শেয়ার করে ইনকাম</p>
                <p>ভিউ/ডাউনলোডের উপর ইনকাম হবে</p>
                <p className="text-emerald-600">ভিডিও প্লেয়ার থাকবে যাতে লিংক ফাঁস না হয়</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-pink-200">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-md" variant="default">
          <Heart className="h-4 w-4 mr-2" />
          Wish2Earn শুরু করুন
        </Button>
      </div>
    </div>
  );
};

export default Wish2EarnSection;
