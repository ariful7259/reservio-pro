
import React from "react";
import { BarChart2, Heart, ShoppingBag, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CARDS = [
  {
    icon: ShoppingBag,
    color: "bg-yellow-100 text-yellow-700",
    title: "Wishlist গুলো",
    value: 3,
    extra: "চলছে ১টি",
  },
  {
    icon: BarChart2,
    color: "bg-green-100 text-green-700",
    title: "পূর্ণ টাস্ক",
    value: 22,
    extra: "সর্বমোট ইনকাম ৳৪৫৬",
  },
  {
    icon: Users,
    color: "bg-blue-100 text-blue-700",
    title: "রেফারেল ইনকাম",
    value: 6,
    extra: "৳৮৮",
  },
  {
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    title: "ভিডিও শেয়ার",
    value: 9,
    extra: "নতুন ১টি টাস্ক",
  },
];

export const DashboardStatsCards: React.FC = () => (
  <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
    {CARDS.map((card, i) => (
      <div key={i} className="rounded-xl px-2 py-3 flex flex-col items-center bg-gradient-to-br from-white via-gray-50 to-pink-50 shadow">
        <span className={`mb-1 p-2 rounded-full ${card.color} shadow`}>
          <card.icon className="h-6 w-6" />
        </span>
        <div className="font-bold text-lg text-gray-700">{card.value}</div>
        <div className="text-xs text-gray-500 font-medium">{card.title}</div>
        <div className="text-[11px] text-pink-600 mt-1">{card.extra}</div>
      </div>
    ))}
  </div>
);
