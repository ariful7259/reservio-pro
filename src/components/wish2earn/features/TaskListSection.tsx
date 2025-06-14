
import React from "react";
import { MapPin, Play, UserCheck, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const locationTasks = [
  {
    name: "খাবার ডেলিভারি",
    location: "ধানমন্ডি",
    reward: 100,
    icon: MapPin,
    expires: "আজ",
    type: "লোকেশনভিত্তিক",
  },
  {
    name: "মোবাইল সার্ভিসিং",
    location: "মিরপুর",
    reward: 300,
    icon: MapPin,
    expires: "৪ ঘণ্টা",
    type: "লোকেশনভিত্তিক",
  },
];

const digitalTasks = [
  {
    name: "ভিডিও শেয়ার",
    reward: 50,
    icon: Play,
    expires: "৩ দিন",
    type: "ডিজিটাল",
  },
  {
    name: "রেফারেল",
    reward: 40,
    icon: UserCheck,
    expires: "২ দিন",
    type: "ডিজিটাল",
  },
  {
    name: "লিংক শেয়ার",
    reward: 20,
    icon: LinkIcon,
    expires: "আজ",
    type: "ডিজিটাল",
  },
];

export const TaskListSection: React.FC = () => (
  <div>
    <div className="mb-1 font-bold text-sm text-pink-700">লোকেশন ভিত্তিক কাজ</div>
    <div className="grid gap-2 sm:grid-cols-2 mb-3">
      {locationTasks.map((t, i) => (
        <div key={i} className="bg-pink-50 rounded-lg p-3 shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <t.icon className="h-8 w-8 text-pink-600" />
            <div>
              <div className="font-bold text-gray-700">{t.name}</div>
              <div className="text-xs text-gray-400">{t.location}, <span>{t.expires} বাকি</span></div>
              <Badge className="text-white text-xs bg-pink-400">{t.type}</Badge>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-pink-600 font-extrabold text-lg">৳{t.reward}</span>
            <Button size="sm" className="mt-1">শুরু করুন</Button>
          </div>
        </div>
      ))}
    </div>
    <div className="mb-1 mt-4 font-bold text-sm text-blue-700">ডিজিটাল টাস্ক</div>
    <div className="grid gap-2 sm:grid-cols-3">
      {digitalTasks.map((t, i) => (
        <div key={i} className="bg-blue-50 rounded-lg p-3 flex flex-col items-center shadow gap-2">
          <t.icon className="h-7 w-7 text-blue-500" />
          <div className="font-bold text-gray-700 text-center">{t.name}</div>
          <Badge className="bg-blue-400 text-white text-xs">{t.type}</Badge>
          <div className="text-xs text-gray-400">Valid: {t.expires}</div>
          <span className="font-bold text-blue-600">৳{t.reward}</span>
          <Button size="sm" className="mt-1 w-full">কমপ্লিট করুন</Button>
        </div>
      ))}
    </div>
  </div>
);
