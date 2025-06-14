
import React, { useState } from "react";
import { Tabs } from "./features/TabbedDashboard";

const pageBg = "bg-gradient-to-b from-pink-50/50 via-white to-blue-50/20";

export const Wish2EarnModule: React.FC = () => {
  return (
    <div className={`w-full max-w-3xl mx-auto ${pageBg} rounded-2xl shadow-xl py-2 pb-20`}>
      <div className="flex flex-col items-center pt-7 pb-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-yellow-400 to-sky-500 bg-clip-text text-transparent drop-shadow">
          Wish2Earn — ছোট টাস্কে আয়, আপন ইচ্ছা পূরণ!
        </h1>
        <p className="text-sm text-center max-w-xl mt-1 text-gray-600 font-medium">
          যেকোনো প্রোডাক্ট/সার্ভিস Wishlist করুন, Earn করুন টাস্ক কমপ্লিশন, সার্ভিস রেন্ট, ভিডিও শেয়ার অথবা লোকেশন টাস্ক থেকে!
        </p>
      </div>
      <div className="mt-3">
        <Tabs />
      </div>
    </div>
  );
};

export default Wish2EarnModule;
