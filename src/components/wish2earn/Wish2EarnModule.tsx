
import React from 'react';
import { Heart, Star, BadgeDollarSign, CalendarDays, ShoppingBag, Award, Clock, BarChart2, MapPin } from 'lucide-react';

const wishFeatures = [
  {
    icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
    title: "Wishlist Goal System",
    desc: "ইউজার তার পছন্দের প্রোডাক্ট বা সার্ভিস উইশলিস্টে যোগ করবে, বারবার টার্গেট ইনকাম ট্র্যাক হবে।",
  },
  {
    icon: <BadgeDollarSign className="h-5 w-5 text-green-500" />,
    title: "টাস্ক কমপ্লিশন দিয়ে আয়",
    desc: "ভিডিও শেয়ার, রেফারেল, লোকেশন ভিত্তিক কাজ, নানান সহজ টাস্ক সম্পূর্ণ করলেই ইনকাম।",
  },
  {
    icon: <Award className="h-5 w-5 text-purple-500" />,
    title: "নিজের প্রোডাক্ট/সার্ভিস অফার দিয়ে আয়",
    desc: "ইউজার নিজের প্রোডাক্ট বা সার্ভিস অফার করবে, যেমন ক্যামেরা ভাড়া বা ফ্রিল্যান্স কাজ।",
  },
  {
    icon: <MapPin className="h-5 w-5 text-orange-500" />,
    title: "লোকেশন ভিত্তিক Task ও Rent Map",
    desc: "আশেপাশের কাজ বা রেন্ট-অপশন ম্যাপে দেখা যাবে, ফিল্টার করা যাবে।",
  },
  {
    icon: <BarChart2 className="h-5 w-5 text-indigo-500" />,
    title: "Earn Meter + Countdown",
    desc: "ইনকাম কীভাবে বাড়ছে তা গ্রাফে দেখা যাবে, নির্দিষ্ট সময়ের জন্য Countdown টাইমার।",
  },
  {
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    title: "Gamified Progress (ব্যাজ, লেভেল)",
    desc: "প্রতিটি অর্জনে ব্যাজ, লেভেল, মিশন ও রিওয়ার্ড দিয়ে উৎসাহ।",
  },
  {
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    title: "ভিডিও/লিংক শেয়ার ইনকাম",
    desc: "ইউজার ভিডিও/ফাইল লিংক শেয়ার করে ইনকাম পাবেন, ইন-অ্যাপ প্লেয়ারেই দেখা যাবে।",
  },
];

export const Wish2EarnModule = () => (
  <section className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl border py-7 px-5 md:p-8 animate-fade-in">
    <div className="flex flex-row items-center gap-4 mb-3">
      <Heart className="h-7 w-7 text-pink-500 drop-shadow" />
      <h2 className="font-bold text-xl md:text-2xl text-gray-900">
        Wish2Earn – ইচ্ছা পূরণ+ইনকাম, সম্মানের সাথে!
      </h2>
    </div>
    <p className="text-[15px] mb-6 text-muted-foreground">
      নিজের স্বপ্ন পূরণ করার জন্য ছোট ছোট টাস্কে ইনকাম করুন, লক্ষ্যে পৌঁছান—এতেই আত্মনির্ভরতা!
    </p>
    <div className="grid gap-3">
      {wishFeatures.map((f, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex-shrink-0">{f.icon}</div>
          <div>
            <div className="font-medium text-gray-800">{f.title}</div>
            <div className="text-gray-500 text-xs">{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-7 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
      <Star className="h-4 w-4 text-amber-500" />
      <span>Gamified Badge, Earn Meter, বাংলায় টিপস এবং টাস্ক Countdown!</span>
    </div>
  </section>
);
export default Wish2EarnModule;

