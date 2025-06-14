
import React from "react";
import { MapPin } from "lucide-react";

export const LocationBasedTaskFeature: React.FC = () => {
  return (
    <div className="p-3">
      <h2 className="text-lg font-bold text-orange-700 mb-2"><MapPin className="h-5 w-5 inline" />লোকেশন ভিত্তিক Task / Rent</h2>
      <div className="rounded bg-stone-100 shadow-inner p-2 flex flex-col items-center">
        <span className="text-xs text-gray-600 mb-2">আপনার লোকেশনের কাছাকাছি নিচের Task ও Rent- অপশনস:</span>
        <div className="border w-full h-32 rounded bg-gradient-to-br from-pink-50 to-sky-50 flex items-center justify-center text-sm text-pink-400 animate-pulse-soft">
          <MapPin className="h-8 w-8 mr-2" /> <span>ম্যাপ ডেমো — শীঘ্রই আসছে!</span>
        </div>
      </div>
    </div>
  );
};
