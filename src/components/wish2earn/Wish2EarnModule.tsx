
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "মোট আয়", value: "৳70,000", color: "text-purple-500", bg: "bg-purple-50" },
  { label: "সক্রিয় ইচ্ছে", value: "2", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "আবেদনের মাঝে", value: "2", color: "text-green-500", bg: "bg-green-50" },
  { label: "সম্পূর্ণতার হার", value: "85%", color: "text-orange-500", bg: "bg-orange-50" }
];

const wishlists = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    progress: 37.5,
    achieved: 45000,
    left: 75000,
    target: 120000,
    days: 11,
    badge: "টপ লিস্ট",
    badgeColor: "bg-blue-100 text-blue-500"
  },
  {
    id: 2,
    title: "Gaming Laptop",
    progress: 29.4,
    achieved: 25000,
    left: 60000,
    target: 85000,
    days: 7,
    badge: "টপ লিস্ট",
    badgeColor: "bg-purple-100 text-purple-500"
  }
];

const formatNumber = (v: number) => "৳" + v.toLocaleString("bn-BD");

export const Wish2EarnModule: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#f3e8ff]/30 via-white to-[#e0edfa]/30 min-w-[340px] max-w-[600px] w-full mx-auto rounded-xl animate-fade-in">
      <h1 className="text-3xl font-extrabold text-center text-purple-700 pt-6 pb-2">Wish2Earn</h1>
      <p className="text-center text-base text-slate-600 font-medium mb-6">
        আপনার স্বপ্ন পূরণ করুন, কাজ করে টাকা আয় করুন!
      </p>

      {/* Stats card section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-3 pb-5">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-lg shadow bg-white p-3 text-center border-b-4 ${s.bg} border-opacity-70`}>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs mt-1 text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Wishlist Header */}
      <div className="flex items-center justify-between px-4 mt-2 mb-2">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/899d1570-8e45-4b2e-9a80-a3a19fbe0165.png" alt="wishlist" className="h-6 w-6" />
          <span className="font-bold text-lg text-gray-700">সক্রিয় ইচ্ছে তালিকা</span>
        </div>
        <Button variant="outline" size="sm" className="!text-xs !px-3">
          সব দেখুন
        </Button>
      </div>

      {/* Wishlist Cards */}
      <div className="flex flex-col sm:flex-row gap-4 px-4 pb-7">
        {wishlists.map((wish) => (
          <div key={wish.id} className="flex-1 rounded-xl bg-white p-4 shadow relative min-w-[225px]">
            {/* Badge and days */}
            <div className="flex justify-between items-center mb-1">
              <Badge className={wish.badgeColor + " font-semibold px-2 py-0.5"}>{wish.badge}</Badge>
              <span className="text-xs text-gray-400">{wish.days} দিন</span>
            </div>
            {/* Title */}
            <div className="font-bold text-gray-700 mb-2">{wish.title}</div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                style={{ width: `${wish.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-600 font-semibold">{formatNumber(wish.achieved)} আয় হয়েছে</span>
              <span className="text-red-500 font-semibold">{formatNumber(wish.left)} বাকি</span>
            </div>
            <Button size="sm" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
              কাজ খুলুন
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wish2EarnModule;
