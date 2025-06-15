
import React from "react";

const paymentGateways = [
  { name: "bKash", color: "bg-[#eae6ff]", logo: "💳", label: "মোবাইল পেমেন্ট" },
  { name: "Nagad", color: "bg-[#fff0ee]", logo: "🏦", label: "ডিজিটাল পেমেন্ট" },
  { name: "Rocket", color: "bg-[#f4e2ff]", logo: "🚀", label: "মোবাইল ব্যাঙ্কিং" },
  { name: "VISA", color: "bg-[#e6f6fd]", logo: "💎", label: "ক্রেডিট/ডেবিট কার্ড" },
  { name: "Mastercard", color: "bg-[#fdf7ee]", logo: "🏧", label: "ক্রেডিট/ডেবিট কার্ড" },
  { name: "Stripe", color: "bg-[#f5f7fa]", logo: "⚡", label: "ইন্টারন্যাশনাল পেমেন্ট" },
];

const steps = [
  {
    title: "পেমেন্ট লিংক তৈরি করুন",
    desc: "আপনার সার্ভিস/ডিজিটাল পণ্য, মূল্য এবং সংক্ষিপ্ত বিবরণ লিখে দ্রুত পেমেন্ট লিংক তৈরি করুন।"
  },
  {
    title: "ক্রেতা পেমেন্ট করে",
    desc: "ক্রেতা সরাসরি লিঙ্কে পেমেন্ট করে যা সাথে সাথে Escrow অ্যাকাউন্টে সংরক্ষিত হয়।"
  },
  {
    title: "কাজ সম্পন্ন করুন",
    desc: "আপনি ক্রেতার জন্য নির্ধারিত কাজ/পণ্য ডেলিভারি দিন এবং অর্ডার সম্পন্ন করুন।"
  },
  {
    title: "টাকা রিলিজ হয়",
    desc: "ক্রেতা সন্তুষ্ট হলে বা নির্ধারিত সময়ের মধ্যে চ্যালেঞ্জ না করলে Escrow থেকে টাকা পেয়ে যাবেন।"
  },
];

const SecurePayHowItWorks: React.FC = () => (
  <section className="bg-white py-14 px-2">
    {/* Payment Methods */}
    <div className="max-w-3xl mx-auto text-center mb-12">
      <span className="bg-green-100 text-green-600 rounded-full text-xs font-semibold px-3 py-1 mb-2 inline-block">পেমেন্ট মেথড</span>
      <h2 className="text-2xl md:text-3xl font-bold mb-2"><span className="text-green-600">সব পেমেন্ট মেথড</span> একসাথে</h2>
      <p className="text-gray-600 mb-8 text-base">দেশি-বৈদেশিক সব ধরণের পেমেন্ট অপশন এক প্ল্যাটফর্মেই</p>
      <div className="flex flex-wrap justify-center gap-4 mb-3">
        {paymentGateways.map(method => (
          <div
            key={method.name}
            className={`${method.color} px-7 py-5 rounded-xl flex flex-col items-center min-w-[140px] shadow hover:shadow-md`}
          >
            <div className="text-2xl mb-1">{method.logo}</div>
            <div className="font-semibold">{method.name}</div>
            <div className="text-xs text-gray-500 mt-1">{method.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">আরও পেমেন্ট মেথড শীঘ্রই আসবে... <span className="font-bold">24/7 পেমেন্ট সাপোর্ট</span></div>
    </div>
    {/* Steps Section */}
    <div className="max-w-2xl mx-auto text-center mt-10">
      <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold text-xs mb-2 inline-block">কিভাবে কাজ করে</span>
      <h2 className="text-2xl md:text-3xl font-bold my-2">
        মাত্র <span className="text-[#7f32fd]">৪ স্টেপ</span> নিরাপদ লেনদেন
      </h2>
      <p className="mb-6 text-gray-600">সহজ এবং নিরাপদ ক্রিয়ায় আপনার পেমেন্ট নিশ্চিত করুন</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow flex flex-col items-center h-full">
            <div className={`rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mb-2 ${["bg-blue-600", "bg-fuchsia-600", "bg-green-600", "bg-orange-500"][i]}`}>{i + 1}</div>
            <div className="font-bold mb-2">{step.title}</div>
            <p className="text-xs text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
      {/* Bank Guarantee */}
      <div className="mt-12 bg-green-50 border border-green-100 rounded-xl p-6 shadow text-center max-w-xl mx-auto">
        <div className="font-bold text-green-600">সর্বোচ্চ নিরাপত্তা গ্যারান্টি</div>
        <p className="mt-2 text-xs text-gray-700">আপনার প্রতিটি লেনদেন 256-bit SSL encrypted ব্যাংক-লেভেল security দিয়ে সুরক্ষিত</p>
        <div className="text-xs mt-3">
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-semibold">100% Money Back Guarantee</span>
        </div>
      </div>
    </div>
  </section>
);

export default SecurePayHowItWorks;
