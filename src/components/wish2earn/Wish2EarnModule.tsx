
import React, { useState } from "react";
import {
  ShoppingBag,
  BadgeDollarSign,
  Award,
  MapPin,
  BarChart2,
  Star,
  Heart,
  Package,
  Upload,
  Clock,
  Lock,
  Video
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
import { WishlistGoalSystem } from "./features/WishlistGoalSystem";
import { TaskBasedEarning } from "./features/TaskBasedEarning";
import { ServiceProductRent } from "./features/ServiceProductRent";

// Bangla Tip Component
const BanglaTip: React.FC<{ tip: string }> = ({ tip }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 my-2 text-xs text-blue-900 shadow animate-fade-in">
    💡 <b>টিপস:</b> {tip}
  </div>
);

// Wish2Earn ফিচার কনফিগার
const wishFeatures = [
  {
    key: "wishlist",
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    gradient: "from-blue-100 via-pink-50 to-yellow-50",
    title: "🛍️ Wishlist Goal System",
    short: "উইশলিস্ট",
    desc: "ইউজার যেকোনো প্রোডাক্ট বা সার্ভিস Wishlist করবে। নির্দিষ্ট সময়ের মধ্যে Earn Goal পূরণ করতে হবে।",
    component: <WishlistGoalSystem />,
  },
  {
    key: "task",
    icon: BadgeDollarSign,
    iconColor: "text-green-500",
    gradient: "from-green-100 via-white to-pink-50",
    title: "🎯 Task Based Earning",
    short: "টাস্ক",
    desc: "Location-Based এবং Global Digital Task দিয়ে আয় করুন।",
    component: <TaskBasedEarning />,
  },
  {
    key: "rent",
    icon: Package,
    iconColor: "text-purple-500",
    gradient: "from-purple-100 via-white to-yellow-50",
    title: "💸 Service/Product Rent",
    short: "রেন্ট",
    desc: "নিজের Service, Product বা Digital Content ভাড়া দিয়ে আয় করুন।",
    component: <ServiceProductRent />,
  },
  {
    key: "map",
    icon: MapPin,
    iconColor: "text-orange-500",
    gradient: "from-orange-100 via-white to-pink-50",
    title: "📍 Nearby Opportunity Map",
    short: "ম্যাপ",
    desc: "আপনার আশেপাশের Task এবং Rent সুযোগ দেখুন।",
    component: <LocationBasedTaskFeature />,
  },
  {
    key: "upload",
    icon: Upload,
    iconColor: "text-indigo-500",
    gradient: "from-indigo-100 via-white to-green-50",
    title: "📲 Product Upload System",
    short: "আপলোড",
    desc: "নিজের Service বা Product সহজেই রেজিস্টার করুন।",
    component: <ProductServiceOfferFeature />,
  },
  {
    key: "meter",
    icon: BarChart2,
    iconColor: "text-cyan-500",
    gradient: "from-cyan-100 via-yellow-50 to-green-50",
    title: "⏱️ Earn Meter + Countdown",
    short: "মিটার",
    desc: "Earn ট্র্যাকিং এবং Countdown সিস্টেম।",
    component: <EarnMeterCountdownFeature />,
  },
  {
    key: "unlock",
    icon: Lock,
    iconColor: "text-amber-500",
    gradient: "from-amber-100 via-white to-pink-50",
    title: "🔐 Partial Unlock + Retry",
    short: "আনলক",
    desc: "আংশিক Payment দিয়ে Unlock বা আবার চেষ্টা করুন।",
    component: <GamifiedProgressFeature />,
  },
  {
    key: "video",
    icon: Video,
    iconColor: "text-emerald-500",
    gradient: "from-emerald-100 via-white to-blue-50",
    title: "📺 Video Link Earn",
    short: "ভিডিও",
    desc: "ভিডিও/ফাইল শেয়ার করে আয় করুন।",
    component: <VideoShareEarnFeature />,
  },
];

export const Wish2EarnModule: React.FC = () => {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 pt-4 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-sky-500 bg-clip-text text-transparent drop-shadow text-center">
          Wish2Earn — ইচ্ছা পূরণ+ইনকাম, সম্মানের সাথে!
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-700 font-medium max-w-2xl px-4">
          নিজের স্বপ্ন পূরণের জন্য ছোট ছোট টাস্কে ইনকাম করুন, Service ও Product ভাড়া দিন, লক্ষ্যে পৌঁছান—এতেই আত্মনির্ভরতা!
        </p>
        <BanglaTip tip="প্রত্যেক ছোট কাজ আপনাকে এগিয়ে নিয়ে যাবে স্বপ্নের দিকে। আয় বাড়ান, নিজের Service দিন, Wishlist পূরণ করুন!" />
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-6">
        {wishFeatures.map((feat) => {
          const isSelected = modal === feat.key;
          const IconCmp = feat.icon;
          return (
            <button
              key={feat.key}
              type="button"
              onClick={() => setModal(feat.key)}
              className={`
                group p-4 rounded-xl border bg-white shadow-sm
                hover:shadow-md hover:border-primary/50 hover:scale-105
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                outline-none cursor-pointer transition-all duration-200
                ${isSelected ? 'border-primary shadow-lg scale-105 ring-2 ring-primary/50' : 'border-gray-200'}
              `}
            >
              {/* Icon */}
              <div className={`
                flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 via-white to-pink-50 shadow-sm
                transition-all mb-2
                ${isSelected ? 'ring-2 ring-primary/50 scale-110' : ''}
                h-12 w-12 mx-auto
              `}>
                <IconCmp className={`w-6 h-6 ${feat.iconColor} transition-all`} />
              </div>
              
              {/* Short Bangla name */}
              <div className="text-center">
                <div className="text-sm font-bold text-zinc-700 mb-1">
                  {feat.short}
                </div>
                {/* Feature title */}
                <div className={`text-xs text-gray-500 leading-tight ${isSelected ? 'text-primary' : ''}`}>
                  {feat.title.replace(/🛍️|🎯|💸|📍|📲|⏱️|🔐|📺/g, '').trim()}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feature Modal */}
      {modal && (() => {
        const feat = wishFeatures.find(f => f.key === modal);
        return feat ? (
          <FeatureModal 
            open={true} 
            onOpenChange={v => v ? setModal(feat.key) : setModal(null)} 
            title={feat.title}
          >
            <div className="p-4">
              <div className="mb-4 text-sm text-gray-700">{feat.desc}</div>
              {feat.component}
            </div>
          </FeatureModal>
        ) : null;
      })()}

      {/* Call to Action */}
      <div className="mt-8 flex justify-center px-4">
        <Badge variant="premium" className="px-6 py-3 text-base shadow-lg animate-fade-in bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <Heart className="h-4 w-4 mr-2" />
          শুরু করুন - আজই স্বপ্ন পূরণের যাত্রা! 🚀
        </Badge>
      </div>
    </div>
  );
};

export default Wish2EarnModule;
