
import React from "react";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: <Shield className="h-7 w-7 text-green-500 mx-auto mb-2" />,
    title: "SSL Encryption",
    desc: "সমস্ত ডেটা 256-bit SSL এনক্রিপশানে সুরক্ষিত"
  },
  {
    icon: <Lock className="h-7 w-7 text-blue-600 mx-auto mb-2" />,
    title: "2FA Authentication",
    desc: "টু-ফ্যাক্টর অথেন্টিকেশন অতিরিক্ত নিরাপত্তার জন্য"
  },
  {
    icon: <Eye className="h-7 w-7 text-violet-500 mx-auto mb-2" />,
    title: "Real-time Monitoring",
    desc: "24/7 সিস্টেম মনিটরিং এবং fraud detection"
  },
  {
    icon: <UserCheck className="h-7 w-7 text-teal-500 mx-auto mb-2" />,
    title: "KYC Verification",
    desc: "সম্পূর্ণ KYC প্রক্রিয়া trust এবং security এর জন্য"
  },
];

const stats = [
  { label: "99.9% Uptime", value: "99.9%" },
  { label: "256-bit Encryption", value: "256-bit" },
  { label: "24/7 Monitoring", value: "24/7" },
  { label: "0 Data Breach", value: "0" },
];

const SecurePayBankSecurity: React.FC = () => (
  <section className="bg-[#1a2352] text-white py-14 px-2">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="bg-green-500/20 rounded-full px-4 py-1 text-green-300 text-xs font-medium mb-2 inline-block">নিরাপত্তা</span>
        <h2 className="text-2xl md:text-3xl font-bold my-2">Bank-Level নিরাপত্তা</h2>
        <p className="text-base text-slate-200 mb-4">আমরা ব্যাংকের মতো একই স্তরের নিরাপত্তা নিশ্চিত করি</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {securityFeatures.map((feature, i) => (
          <div key={i} className="bg-[#142046] rounded-xl text-center py-8 px-4 shadow">
            {feature.icon}
            <div className="font-bold mt-2 mb-1 text-white">{feature.title}</div>
            <div className="text-sm text-gray-300">{feature.desc}</div>
          </div>
        ))}
      </div>
      {/* Stats segment */}
      <div className="bg-[#ffffff15] rounded-xl text-center p-6 mb-10">
        <div className="flex justify-center gap-10 flex-wrap text-white text-lg font-semibold">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center min-w-[100px]">
              <div className="text-2xl">{stat.value}</div>
              <div className="text-xs text-slate-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-[#223178] pt-8 mt-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-bold flex items-center gap-1">
            <Shield className="h-5 w-5 inline text-[#7f32fd]" />
            SecurePay
          </div>
          <p className="text-sm text-gray-300 mt-1">বাংলাদেশের সবচেয়ে নিরাপদ এবং বিশ্বস্ত escrow payment platform। আপনার প্রতিটি লেনদেন 100% secure and guaranteed!</p>
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" aria-label="Facebook" className="text-white hover:text-primary"></a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-pink-400"></a>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Quick Links</div>
          <ul className="text-gray-200 space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Creator Dashboard</a></li>
            <li><a href="#" className="hover:underline">Buyer Dashboard</a></li>
            <li><a href="#" className="hover:underline">Admin Panel</a></li>
            <li><a href="#" className="hover:underline">API Documentation</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">সাপোর্ট</div>
          <ul className="text-gray-200 space-y-1 text-sm">
            <li><a href="mailto:support@securepay.com" className="hover:underline">support@securepay.com</a></li>
            <li><a href="tel:+8801700000000" className="hover:underline">+880 1700 000 000</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Live Chat</a></li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-slate-400 text-center pt-8">© 2024 SecurePay. All rights reserved. Made with <span className="text-red-400">♥</span> in Bangladesh</div>
    </div>
  </section>
);

export default SecurePayBankSecurity;
