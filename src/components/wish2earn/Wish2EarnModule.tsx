
import React, { useState } from "react";
import { ShoppingBag, BadgeDollarSign, Award, MapPin, BarChart2, Star, Heart, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureModal } from "./FeatureModal";
import { WishlistGoalFeature } from "./features/WishlistGoalFeature";
import { TaskCompletionFeature } from "./features/TaskCompletionFeature";
import { ProductServiceOfferFeature } from "./features/ProductServiceOfferFeature";
import { LocationBasedTaskFeature } from "./features/LocationBasedTaskFeature";
import { EarnMeterCountdownFeature } from "./features/EarnMeterCountdownFeature";
import { GamifiedProgressFeature } from "./features/GamifiedProgressFeature";
import { VideoShareEarnFeature } from "./features/VideoShareEarnFeature";

// Bangla Tip Component
const BanglaTip: React.FC<{ tip: string }> = ({ tip }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 my-2 text-xs text-blue-900 shadow animate-fade-in">
    💡 <b>টিপস:</b> {tip}
  </div>
);

// Feature List/Config
const wishFeatures = [
  {
    key: "wishlist",
    icon: <ShoppingBag className="h-6 w-6 text-blue-500" />,
    title: "Wishlist Goal System",
    desc: "ইউজার তার পছন্দের প্রোডাক্ট বা সার্ভিস উইশলিস্টে যোগ করবে, বারবার টার্গেট ইনকাম ট্র্যাক হবে।",
    component: <WishlistGoalFeature />,
  },
  {
    key: "task",
    icon: <BadgeDollarSign className="h-6 w-6 text-green-500" />,
    title: "টাস্ক কমপ্লিশন দিয়ে আয়",
    desc: "ভিডিও শেয়ার, রেফারেল, লোকেশন ভিত্তিক কাজ, নানান সহজ টাস্ক সম্পূর্ণ করলেই ইনকাম।",
    component: <TaskCompletionFeature />,
  },
  {
    key: "offer",
    icon: <Award className="h-6 w-6 text-purple-500" />,
    title: "নিজের প্রোডাক্ট/সার্ভিস অফার দিয়ে আয়",
    desc: "ইউজার নিজের প্রোডাক্ট বা সার্ভিস অফার করবে, যেমন ক্যামেরা ভাড়া বা ফ্রিল্যান্স কাজ।",
    component: <ProductServiceOfferFeature />,
  },
  {
    key: "location",
    icon: <MapPin className="h-6 w-6 text-orange-500" />,
    title: "লোকেশন ভিত্তিক Task ও Rent Map",
    desc: "আশেপাশের কাজ বা রেন্ট-অপশন ম্যাপে দেখা যাবে, ফিল্টার করা যাবে।",
    component: <LocationBasedTaskFeature />,
  },
  {
    key: "earnMeter",
    icon: <BarChart2 className="h-6 w-6 text-indigo-500" />,
    title: "Earn Meter + Countdown",
    desc: "ইনকাম কীভাবে বাড়ছে তা গ্রাফে দেখা যাবে, নির্দিষ্ট সময়ের জন্য Countdown টাইমার।",
    component: <EarnMeterCountdownFeature />,
  },
  {
    key: "gamified",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Gamified Progress (ব্যাজ, লেভেল)",
    desc: "প্রতিটি অর্জনে ব্যাজ, লেভেল, মিশন ও রিওয়ার্ড দিয়ে উৎসাহ।",
    component: <GamifiedProgressFeature />,
  },
  {
    key: "video",
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    title: "ভিডিও/লিংক শেয়ার ইনকাম",
    desc: "ইউজার ভিডিও/ফাইল লিংক শেয়ার করে ইনকাম পাবেন, ইন-অ্যাপ প্লেয়ারেই দেখা যাবে।",
    component: <VideoShareEarnFeature />,
  }
];

export const Wish2EarnModule: React.FC = () => {
  const [modal, setModal] = useState<string | null>(null);

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
      </div>
      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 sm:px-0">
        {wishFeatures.map((feat, i) => (
          <button
            key={feat.key}
            type="button"
            onClick={() => setModal(feat.key)}
            className={`
              group w-full text-left focus:outline-none
              card-gradient-light
              rounded-2xl border border-stone-200 shadow-sm
              hover:shadow-lg hover:scale-[1.03] active:scale-100
              transition-all duration-200
              flex flex-row gap-4 sm:gap-5 items-center
              px-4 py-4 sm:py-5 
              relative
              focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
              aria-[current=true]:ring-2 aria-[current=true]:ring-primary
            `}
            tabIndex={0}
            aria-label={feat.title}
            aria-current={modal === feat.key}
          >
            <span className="
              flex items-center justify-center
              rounded-full bg-gradient-to-br from-pink-100 via-blue-100 to-amber-100
              shadow-md w-12 h-12 sm:w-14 sm:h-14
              mr-0.5
              group-hover:scale-110 group-active:scale-105 
              transition-all
            ">
              {feat.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-base sm:text-lg text-primary mb-1 leading-snug group-hover:text-pink-700 transition-all duration-150">
                {feat.title}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition">
                {feat.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Modal for Features */}
      {wishFeatures.map((feat) =>
        <FeatureModal key={feat.key} open={modal === feat.key} onOpenChange={v => v ? setModal(feat.key) : setModal(null)}>
          {feat.component}
        </FeatureModal>
      )}
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
