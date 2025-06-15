
import React from "react";
import { Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: <Shield className="h-7 w-7 text-green-500" />, label: "১০০% নিরাপদ লেনদেন" },
  { icon: <Users className="h-7 w-7 text-blue-500" />, label: "10K+ সক্রিয় ব্যবহারকারী" },
  { icon: <TrendingUp className="h-7 w-7 text-fuchsia-500" />, label: "৫ কোটি+ সম্পন্ন লেনদেন" }
];

const features = [
  {
    title: "Escrow Protection",
    desc: "আপনার টাকা নির্ধারিত Escrow-তে থাকে যতক্ষন না কাজ সম্পূর্ণ হয়"
  },
  {
    title: "Dispute Management",
    desc: "কোনো সমস্যা হলে dispute raise করুন এবং admin সমাধান করবেন"
  },
  {
    title: "KYC Verification",
    desc: "NID/Passport এবং ফেস ভেরিফিকেশনসহ সম্পূর্ণ বিশ্বাসযোগ্য KYC"
  },
  {
    title: "Multiple Payment Methods",
    desc: "bKash, Nagad, Rocket, VISA, Mastercard, Stripe - সব সাপোর্ট"
  },
  {
    title: "Fraud Prevention",
    desc: "AI-powered fraud detection এবং সন্দেহজনক অ্যাক্টিভিটি মনিটরিং"
  },
  {
    title: "Smart Notifications",
    desc: "In-app, Email এবং SMS notification সঙ্গে সাথে"
  },
  {
    title: "Advanced Analytics",
    desc: "বিস্তারিত transaction analytics"
  },
  {
    title: "Mobile Optimized",
    desc: "সম্পূর্ণ mobile responsive এবং app-like experience"
  },
];

const SecurePayHero: React.FC = () => (
  <section className="bg-[#f3f5ff] pt-16 pb-12 px-2">
    {/* Main Hero */}
    <div className="max-w-3xl mx-auto text-center space-y-3">
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#7f32fd] leading-tight mb-2">নিরাপদ পেমেন্ট</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight text-slate-800">Escrow Hub</h2>
      <p className="max-w-2xl mx-auto mb-4 text-base md:text-lg text-gray-700">
        বাংলাদেশের প্রথম সম্পূর্ণ secure escrow payment platform। <br />
        আপনার প্রতিটি লেনদেন ১০০% নিরাপদ এবং সুরক্ষিত।
      </p>
      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <Button className="bg-primary text-white px-6 rounded-full text-base md:text-lg shadow" size="lg">পেমেন্ট লিংক তৈরি করুন</Button>
        <Button variant="outline" className="rounded-full border border-gray-300" size="lg">কিভাবে কাজ করে?</Button>
      </div>
      {/* Stats */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white px-6 py-4 rounded-xl shadow-sm flex flex-col items-center min-w-[160px]">
            {stat.icon}
            <div className="mt-2 font-semibold text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Why SecurePay section */}
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <div className="text-xs inline-block px-4 py-1 bg-blue-100 text-blue-600 font-semibold rounded-full mb-2">প্রধান ফিচারসমূহ</div>
      <h2 className="text-xl md:text-3xl font-bold mb-4">
        কেন <span className="text-[#7f32fd]">SecurePay</span> বেছে নিবেন?
      </h2>
      <p className="text-md text-gray-700 mb-6">আমাদের প্রোডাক্টে আছে সবচেয়ে আধুনিক নিরাপত্তার ব্যবস্থা এবং ব্যবহারকারী-বান্ধব ফিচার</p>
      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="bg-white border border-gray-100 p-5 rounded-xl h-full shadow transition hover:shadow-md">
            <div className="font-bold text-md mb-1">{feature.title}</div>
            <p className="text-xs text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SecurePayHero;
