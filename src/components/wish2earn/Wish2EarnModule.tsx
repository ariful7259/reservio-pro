import React, { useState } from "react";
import { ArrowUp, List, Upload, Video, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Header stats – mock data
const stats = [{
  label: "মোট আয়",
  value: "৳70,650",
  color: "text-purple-500",
  bg: "bg-purple-50"
}, {
  label: "সক্রিয় ইচ্ছে",
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
  status: "সক্রিয়",
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
  status: "সক্রিয়",
  badge: "টপ লিস্ট",
  badgeColor: "bg-purple-100 text-purple-500"
}];
const quickActions = [{
  icon: <Upload className="h-8 w-8 mb-2 mx-auto" />,
  title: "সার্ভিস অফার করুন",
  subtitle: "আপনার দক্ষতা দিয়ে আয় করুন",
  btn: "শুরু করুন"
}, {
  icon: <Video className="h-8 w-8 mb-2 mx-auto" />,
  title: "ভিডিও শেয়ার করুন",
  subtitle: "ভিডিও থেকে আয় করুন",
  btn: "আপলোড করুন"
}, {
  icon: <Home className="h-8 w-8 mb-2 mx-auto" />,
  title: "রেফার করুন",
  subtitle: "বন্ধুদের রেফার করে আয় করুন",
  btn: "রেফার করুন"
}];

// Utility for currency formatting
const formatNumber = (v: number) => "৳" + v.toLocaleString("bn-BD");
export const Wish2EarnModule: React.FC = () => {
  const [tab, setTab] = useState<"play" | "wishlist">("play");
  return <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-purple-50/50 via-white to-blue-50/10 rounded-2xl shadow-xl pb-16">
      {/* Top navigation/tab */}
      <nav className="flex items-center justify-between px-5 pt-6 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl bg-gradient-to-r from-purple-700 via-blue-600 to-fuchsia-500 bg-clip-text text-transparent">Wish2Earn</span>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-full shadow-inner">
          <button className={`text-sm px-4 py-1.5 font-bold rounded-full transition-all ${tab === "play" ? "bg-white shadow text-purple-600" : "text-gray-500 bg-transparent"}`} onClick={() => setTab("play")}>Home</button>
          <button className={`text-sm px-4 py-1.5 font-bold rounded-full transition-all ${tab === "wishlist" ? "bg-white shadow text-purple-600" : "text-gray-500 bg-transparent"}`} onClick={() => setTab("wishlist")}>ইচ্ছা তালিকা</button>
        </div>
        <div></div>
      </nav>

      {/* Subtitle */}
      <div className="text-center text-gray-500 mb-3 px-2 text-sm font-medium">
        আপনার স্বপ্ন পূরণ করুন, ছোট কাজ করে টাকা আয় করুন এবং ইচ্ছা পূরণ করুন!
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 mb-5">
        {stats.map((s, idx) => <div key={idx} className={`rounded-xl flex flex-col items-center py-3 ${s.bg} shadow group`}>
            <span className={`text-xl md:text-2xl font-extrabold ${s.color}`}>{s.value}</span>
            <div className="text-xs md:text-sm mt-1 text-gray-500 font-semibold">{s.label}</div>
          </div>)}
      </div>

      {/* সেকশান: সক্রিয় ইচ্ছা তালিকা */}
      <div className="px-4 mb-1">
        <h2 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
          <span>🎯</span>
          সক্রিয় ইচ্ছা তালিকা
          <span className="ml-auto">
            <Button size="sm" variant="outline" className="text-xs px-3 py-1">সব দেখুন</Button>
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          {wishlists.map(w => <div key={w.id} className="flex-1 bg-white shadow rounded-xl relative overflow-hidden px-4 py-4 min-w-[250px]">
              <div className="flex justify-between items-start mb-2">
                <Badge className={`text-xs px-2 ${w.badgeColor}`}>{w.badge}</Badge>
                <span className="text-xs text-gray-400">{w.days} দিন</span>
              </div>
              {/* Card center target cross mock */}
              <div className="w-full flex justify-center items-center mb-4">
                <div className="border border-dashed border-gray-200 rounded-full h-14 w-14 flex items-center justify-center opacity-40">
                  <List className="h-7 w-7 text-gray-200" />
                </div>
              </div>
              <div className="font-bold text-lg text-gray-700">{w.title}</div>
              {/* progress */}
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-400">অগ্রগতি: {w.progress}%</span>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full`} style={{
                width: `${w.progress}%`
              }} />
                </div>
              </div>
              {/* Numbers */}
              <div className="flex justify-between items-center mt-3 mb-1 text-sm font-semibold">
                <span className="text-green-600">{formatNumber(w.current)} জমা হয়েছে</span>
                <span className={`ml-2 ${w.leftRed ? "text-rose-500" : "text-gray-500"}`}>{formatNumber(w.left)} বাকি আছে</span>
              </div>
              <Button className={`w-full mt-2 ${w.id === 2 ? "bg-purple-600 hover:bg-purple-700" : ""}`}>কাজ বন্ধ করুন</Button>
            </div>)}
        </div>
      </div>

      {/* Application Opportunity */}
      <div className="px-4 mt-8">
        <h2 className="text-base font-bold text-pink-800 mb-2 flex items-center gap-1">
          <span>📍</span> আবেদনেশনের সুযোগ
        </h2>
        <div className="rounded-xl bg-gradient-to-tr from-blue-50/60 to-violet-100 p-7 shadow-lg flex flex-col items-center justify-center min-h-[160px] relative mb-1">
          <span className="mx-auto text-blue-500 text-lg">আপনার অবস্থান</span>
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <Button size="icon" variant="outline" className="p-1 h-7 w-7 rounded-full">+</Button>
            <Button size="icon" variant="outline" className="p-1 h-7 w-7 rounded-full">-</Button>
          </div>
        </div>
        <div className="text-xs text-gray-600 ml-1 flex items-center justify-between">
          <span>০টি কাজ আবেদনেশনে পাওয়া যাবে</span>
          <span className="text-[10px]">শেষ আপডেট: ১.২ মিনিট</span>
        </div>
      </div>

      {/* Quick actions section */}
      <div className="px-4 mt-8">
        <h2 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-1">⚡ দ্রুত কাজ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((a, idx) => <div key={idx} className={`rounded-xl bg-gradient-to-br ${idx === 0 ? "from-violet-100 to-purple-200" : idx === 1 ? "from-blue-100 to-blue-300" : "from-green-100 to-green-200"} p-5 shadow-md flex flex-col items-center`}>
              {a.icon}
              <div className="font-bold text-md text-center mb-1">{a.title}</div>
              <div className="text-xs text-center mb-3 text-gray-500">{a.subtitle}</div>
              <Button className="w-full">{a.btn}</Button>
            </div>)}
        </div>
      </div>
    </div>;
};
export default Wish2EarnModule;