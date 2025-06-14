
import React from "react";
import { ShoppingBag, BadgeDollarSign, Award, MapPin, BarChart2, Star, Heart, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Demo EarnMeter
const EarnMeter: React.FC = () => {
  return (
    <div className="w-full py-4 flex flex-col items-center">
      <div className="w-full max-w-xs h-4 bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 rounded-full overflow-hidden shadow-inner relative mb-2 animate-fade-in">
        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: "68%" }} />
        <span className="absolute right-3 top-0 text-xs font-bold text-green-900">৳ ৩৪০ / ৫০০</span>
      </div>
      <span className="text-xs text-gray-700 mb-1">আপনার আয়: <span className="font-semibold text-green-700">৳৩৪০</span></span>
      <span className="text-[11px] text-gray-500">লক্ষ্য: ৳৫০০</span>
    </div>
  );
};

// Demo Countdown Timer
const CountdownTimer: React.FC<{ seconds?: number }> = ({ seconds = 7200 }) => {
  const [time, setTime] = React.useState(seconds);
  React.useEffect(() => {
    const timer = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return (
    <div className="px-3 py-1 text-xs rounded bg-gradient-to-r from-pink-200 to-sky-100 text-gray-700 font-mono">
      পরবর্তী টাস্ক রিসেট: {h}:{m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")}
    </div>
  );
};

// GamifiedBadge: just a pretty visual / static badge
const GamifiedBadge: React.FC = () => (
  <div className="flex flex-col items-center gap-1 animate-fade-in">
    <span className="relative bg-yellow-300 p-2 rounded-full shadow-lg">
      <Star className="w-8 h-8 text-yellow-500 drop-shadow pulse"/>
      <span className="absolute -top-2 -right-3 rounded-full bg-pink-500 text-white px-2 py-0.5 text-xs font-bold shadow">Level 3</span>
    </span>
    <span className="font-semibold text-xs text-gray-700">"Goal Getter" ব্যাজ</span>
  </div>
);

// Tip: friendly Bangla tip
const BanglaTip: React.FC<{ tip: string }> = ({ tip }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 my-2 text-xs text-blue-900 shadow animate-fade-in">
    💡 <b>টিপস:</b> {tip}
  </div>
);

// Feature Cards Config
const wishFeatures = [
  {
    icon: <ShoppingBag className="h-6 w-6 text-blue-500" />,
    title: "Wishlist Goal System",
    desc: "ইউজার তার পছন্দের প্রোডাক্ট বা সার্ভিস উইশলিস্টে যোগ করবে, বারবার টার্গেট ইনকাম ট্র্যাক হবে।"
  },
  {
    icon: <BadgeDollarSign className="h-6 w-6 text-green-500" />,
    title: "টাস্ক কমপ্লিশন দিয়ে আয়",
    desc: "ভিডিও শেয়ার, রেফারেল, লোকেশন ভিত্তিক কাজ, নানান সহজ টাস্ক সম্পূর্ণ করলেই ইনকাম।"
  },
  {
    icon: <Award className="h-6 w-6 text-purple-500" />,
    title: "নিজের প্রোডাক্ট/সার্ভিস অফার দিয়ে আয়",
    desc: "ইউজার নিজের প্রোডাক্ট বা সার্ভিস অফার করবে, যেমন ক্যামেরা ভাড়া বা ফ্রিল্যান্স কাজ।"
  },
  {
    icon: <MapPin className="h-6 w-6 text-orange-500" />,
    title: "লোকেশন ভিত্তিক Task ও Rent Map",
    desc: "আশেপাশের কাজ বা রেন্ট-অপশন ম্যাপে দেখা যাবে, ফিল্টার করা যাবে।"
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-indigo-500" />,
    title: "Earn Meter + Countdown",
    desc: "ইনকাম কীভাবে বাড়ছে তা গ্রাফে দেখা যাবে, নির্দিষ্ট সময়ের জন্য Countdown টাইমার।"
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Gamified Progress (ব্যাজ, লেভেল)",
    desc: "প্রতিটি অর্জনে ব্যাজ, লেভেল, মিশন ও রিওয়ার্ড দিয়ে উৎসাহ।"
  },
  {
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    title: "ভিডিও/লিংক শেয়ার ইনকাম",
    desc: "ইউজার ভিডিও/ফাইল লিংক শেয়ার করে ইনকাম পাবেন, ইন-অ্যাপ প্লেয়ারেই দেখা যাবে।"
  }
];

export const Wish2EarnModule: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 pt-4 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-sky-500 bg-clip-text text-transparent drop-shadow">
          Wish2Earn — ইচ্ছা পূরণ+ইনকাম, সম্মানের সাথে!
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-700 font-medium max-w-lg">
          নিজের স্বপ্ন পূরণের জন্য ছোট ছোট টাস্কে ইনকাম করুন, লক্ষ্যে পৌঁছান—এতেই আত্মনির্ভরতা!
        </p>
        <BanglaTip tip="প্রত্যেক ছোট কাজ আপনাকে এগিয়ে নিয়ে যাবে স্বপ্নের দিকে। আয় বাড়ান, ব্যাজ আর রিওয়ার্ড অর্জন করুন!" />
        <div className="flex gap-5 mt-3 flex-wrap justify-center w-full">
          <EarnMeter />
          <GamifiedBadge />
          <CountdownTimer />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 sm:px-0">
        {wishFeatures.map((feat, i) => (
          <Card key={i} className="flex flex-row gap-3 items-center border bg-white hover:shadow-lg transition-all animate-fade-in px-2 py-3">
            <div className="flex-shrink-0">
              {feat.icon}
            </div>
            <CardContent className="p-0 pl-2">
              <div className="font-bold text-md sm:text-lg text-sky-700 mb-0 flex gap-1 items-center">
                {feat.title}
              </div>
              <div className="text-xs text-gray-700 mt-0.5 leading-snug">{feat.desc}</div>
              {(feat.title === "Earn Meter + Countdown") && (
                <div className="mt-1"><EarnMeter /><CountdownTimer /></div>
              )}
              {(feat.title === "Gamified Progress (ব্যাজ, লেভেল)") && (
                <div className="mt-1"><GamifiedBadge /></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Bengali CTA Tip */}
      <div className="mt-9 flex justify-center">
        <Badge variant="premium" className="px-4 py-2 text-base shadow-md animate-fade-in">
          শুরু করুন - আজই স্বপ্ন পূরণের যাত্রা! 🚀
        </Badge>
      </div>
    </div>
  );
};

export default Wish2EarnModule;
