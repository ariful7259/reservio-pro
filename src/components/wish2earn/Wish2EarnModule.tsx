
import React, { useState } from "react";
import {
  ShoppingBag,
  BadgeDollarSign,
  Award,
  MapPin,
  BarChart2,
  Star,
  Heart
} from "lucide-react";
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

// Features config & Short name (Bangla, concise, 7 char max)
const wishFeatures = [
  {
    key: "wishlist",
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    gradient: "from-blue-100 via-pink-50 to-yellow-50",
    title: "Wishlist Goal System",
    short: "উইশলিস্ট",
    desc: "ইউজার তাদের পছন্দের প্রোডাক্ট বা সার্ভিস অ্যাপে Wishlist করবে। নির্দিষ্ট সময়ের ভিতরে টার্গেট ইনকাম দেখাবে (যেমন: ৭ দিনে ২৫০০ টাকা)।",
    component: <WishlistGoalFeature />
  },
  {
    key: "task",
    icon: BadgeDollarSign,
    iconColor: "text-green-500",
    gradient: "from-green-100 via-white to-pink-50",
    title: "টাস্ক কমপ্লিশন দিয়ে আয়",
    short: "টাস্ক",
    desc: "ডিজিটাল টাস্ক: ভিডিও শেয়ার, রেফারেল, অ্যাপ ডাউনলোড এবং লোকেশন ভিত্তিক কাজ: ডেলিভারি, পরিচ্ছন্নতা, গৃহশিক্ষক ইত্যাদি।",
    component: <TaskCompletionFeature />
  },
  {
    key: "offer",
    icon: Award,
    iconColor: "text-purple-500",
    gradient: "from-purple-100 via-white to-yellow-50",
    title: "নিজের প্রোডাক্ট/সার্ভিস অফার দিয়ে আয়",
    short: "অফার",
    desc: "ইউজার পারবে তার প্রোডাক্ট ভাড়া দিতে বা সার্ভিস অফার করতে। উদাহরণ: ক্যামেরা ভাড়া, হেল্পিং সার্ভিস, ফ্রিল্যান্স ডিজাইন।",
    component: <ProductServiceOfferFeature />
  },
  {
    key: "location",
    icon: MapPin,
    iconColor: "text-orange-500",
    gradient: "from-orange-100 via-white to-pink-50",
    title: "লোকেশন ভিত্তিক Task ও Rent Map",
    short: "ম্যাপ",
    desc: "আশেপাশে কি কাজ বা রেন্ট অপশন আছে ম্যাপে দেখা যাবে, লোকেশন অনুযায়ী ফিল্টার করা যাবে।",
    component: <LocationBasedTaskFeature />
  },
  {
    key: "earnMeter",
    icon: BarChart2,
    iconColor: "text-indigo-500",
    gradient: "from-indigo-100 via-yellow-50 to-green-50",
    title: "Earn Meter + Countdown",
    short: "আয়",
    desc: "প্রতিটি উইশলিস্ট-এর জন্য ইনকাম কতটুকু হলো ট্র্যাক, সময়সীমার ভিতরে না পারলে Retry/Partial Unlock।",
    component: <EarnMeterCountdownFeature />
  },
  {
    key: "video",
    icon: Heart,
    iconColor: "text-rose-500",
    gradient: "from-rose-100 via-white to-yellow-50",
    title: "ভিডিও/লিংক শেয়ার ইনকাম",
    short: "শেয়ার",
    desc: "ইউজার ভিডিও বা ফাইল লিঙ্ক শেয়ার করলে ইনকাম করবে, ইন-অ্যাপ প্লেয়ারেই দেখা যাবে।",
    component: <VideoShareEarnFeature />
  },
  {
    key: "gamified",
    icon: Star,
    iconColor: "text-yellow-500",
    gradient: "from-yellow-100 via-blue-50 to-white",
    title: "Gamified Progress (ব্যাজ, লেভেল)",
    short: "গেমি",
    desc: "ব্যাজ, লেভেল, র্যাংক, মিশন ও টাস্ক রিওয়ার্ডসহ গেমিফিকেশনের পূর্ণ অভিজ্ঞতা।",
    component: <GamifiedProgressFeature />
  },
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
        <BanglaTip tip="প্রত্যেক ছোট কাজ আপনাকে এগিয়ে নিয়ে যাবে স্বপ্নের দিকে। আয় বাড়ান, ব্যাজ আর রিওয়ার্ড অর্জন করুন!" />
      </div>

      {/* Feature Icon Grid: always 4 columns, scrollable on xs/sm */}
      <div
        className={`
          grid grid-cols-4
          gap-y-6 gap-x-3
          justify-items-center
          px-2 sm:px-0
          mb-2
          overflow-x-auto
          w-full
        `}
        style={{ minWidth: 340 }}
      >
        {wishFeatures.map((feat) => {
          const isSelected = modal === feat.key;
          const IconCmp = feat.icon;
          return (
            <button
              key={feat.key}
              type="button"
              aria-label={feat.title}
              onClick={() => setModal(feat.key)}
              className={`
                group w-16 h-20 sm:w-20 sm:h-24
                flex flex-col items-center justify-center
                rounded-xl
                border
                bg-white shadow-card card-hover-effect hover:border-primary/70
                focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
                outline-none cursor-pointer relative transition-all duration-200
                ${isSelected ? 'border-primary shadow-lg scale-105 ring-2 ring-primary/50' : 'border-gray-200'}
              `}
              tabIndex={0}
            >
              <span
                className={`
                  flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 via-white to-pink-50 shadow-md
                  transition-all mb-1
                  ${isSelected ? 'ring-2 ring-primary/50 scale-110' : ''}
                  h-9 w-9 sm:h-10 sm:w-10
                `}
              >
                <IconCmp className={`w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] ${feat.iconColor} transition-all`} />
              </span>
              <span className="block text-[11px] font-bold text-zinc-600 mt-1 mb-[1px] leading-tight drop-shadow-sm">
                {feat.short}
              </span>
              <span className={`block text-[10px] sm:text-xs text-center font-medium text-gray-400 leading-tight truncate max-w-[56px] sm:max-w-[80px] mt-[2px] ${isSelected ? 'text-primary' : ''}`}>
                {feat.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Show only the selected feature modal */}
      {modal && (() => {
        const feat = wishFeatures.find(f => f.key === modal);
        return feat ? (
          <FeatureModal open={true} onOpenChange={v => v ? setModal(feat.key) : setModal(null)} title={feat.title}>
            <div className="p-2">
              <div className="mb-2 text-sm text-gray-700">{feat.desc}</div>
              {feat.component}
            </div>
          </FeatureModal>
        ) : null;
      })()}

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
