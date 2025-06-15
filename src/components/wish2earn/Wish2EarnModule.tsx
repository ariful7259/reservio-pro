
import React, { useState } from "react";
import { ArrowUp, List, Upload, Video, Home, Briefcase, User2, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Header stats – mock data
const stats = [{
  label: "মোট আয়",
  value: "৳70,650",
  color: "text-purple-500",
  bg: "bg-purple-50"
}, {
  label: "সক্রিয় ইচ্ছে",
  value: "2",
  color: "text-blue-500",
  bg: "bg-blue-50"
}, {
  label: "আবেদনের মাঝে",
  value: "0",
  color: "text-green-500",
  bg: "bg-green-50"
}, {
  label: "সম্পূর্ণতার হার",
  value: "85%",
  color: "text-orange-500",
  bg: "bg-orange-50"
}];
const wishlists = [{
  id: 1,
  title: "iPhone 15 Pro",
  progress: 38.0,
  current: 45650,
  target: 120000,
  left: 74350,
  leftRed: true,
  days: 11,
  status: "সক্রিয়",
  badge: "টপ লিস্ট",
  badgeColor: "bg-blue-100 text-blue-500"
}, {
  id: 2,
  title: "Gaming Laptop",
  progress: 30.2,
  current: 25650,
  target: 85000,
  left: 59350,
  leftRed: true,
  days: 7,
  status: "সক্রিয়",
  badge: "টপ লিস্ট",
  badgeColor: "bg-purple-100 text-purple-500"
}];
const quickActions = [{
  icon: <Upload className="h-8 w-8 mb-2 mx-auto" />,
  title: "সার্ভিস অফার করুন",
  subtitle: "আপনার দক্ষতা দিয়ে আয় করুন",
  btn: "শুরু করুন"
}, {
  icon: <Video className="h-8 w-8 mb-2 mx-auto" />,
  title: "ভিডিও শেয়ার করুন",
  subtitle: "ভিডিও থেকে আয় করুন",
  btn: "আপলোড করুন"
}, {
  icon: <Home className="h-8 w-8 mb-2 mx-auto" />,
  title: "রেফার করুন",
  subtitle: "বন্ধুদের রেফার করে আয় করুন",
  btn: "রেফার করুন"
}];

// Utility for currency formatting
const formatNumber = (v: number) => "৳" + v.toLocaleString("bn-BD");

export const Wish2EarnModule: React.FC = () => {
  const [tab, setTab] = useState<"play" | "wishlist">("play");
  // Minimal placeholder UI to satisfy React.FC return type
  return (
    <div className="p-6 min-w-[320px]">
      <h1 className="text-xl font-bold mb-4">Wish2Earn Module</h1>
      {/* এখানে পরবর্তীতে ড্যাশবোর্ড/কম্পোনেন্ট হিসেবে নির্মাণ করা যাবে */}
    </div>
  );
};

export default Wish2EarnModule;
