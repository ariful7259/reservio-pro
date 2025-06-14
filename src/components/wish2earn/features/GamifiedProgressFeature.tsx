
import React from "react";
import { Star, Award } from "lucide-react";

export const GamifiedProgressFeature: React.FC = () => (
  <div className="p-3">
    <h2 className="text-lg font-bold text-yellow-700 mb-3 flex items-center gap-2"><Star className="h-5 w-5" />Gamified Progress</h2>
    <div className="flex flex-col items-center gap-1 animate-fade-in">
      <span className="relative bg-yellow-300 p-2 rounded-full shadow-lg">
        <Star className="w-9 h-9 text-yellow-500 drop-shadow pulse animate-pulse-effect" />
        <span className="absolute -top-2 -right-3 rounded-full bg-pink-500 text-white px-2 py-0.5 text-xs font-bold shadow">Level 3</span>
      </span>
      <span className="font-semibold text-xs text-gray-700">"Goal Getter" ব্যাজ</span>
      <span className="text-xs text-blue-900 mt-2 bg-blue-50 px-2 py-0.5 rounded">Unlock 2 more level to get Platinum!</span>
      <Award className="mt-2 text-purple-600" />
    </div>
  </div>
);
