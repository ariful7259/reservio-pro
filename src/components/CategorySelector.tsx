
import React from "react";
import { Home, Laptop, Car, Tent, Armchair, BookOpen, Tractor, Store, Hammer, Briefcase, Hotel, Building2, Camera } from "lucide-react";

type Category = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const categories: Category[] = [
  { icon: <Home className="h-8 w-8 text-primary" />, label: "বাসা বাড়ি", value: "housing" },
  { icon: <Laptop className="h-8 w-8 text-blue-500" />, label: "ইলেকট্রনিক্স", value: "electronics" },
  { icon: <Car className="h-8 w-8 text-red-500" />, label: "পরিবহন", value: "transport" },
  { icon: <Tent className="h-8 w-8 text-green-500" />, label: "ইভেন্ট সামগ্রী", value: "event" },
  { icon: <Armchair className="h-8 w-8 text-purple-500" />, label: "ঘরোয়া সামগ্রী", value: "home" },
  { icon: <BookOpen className="h-8 w-8 text-orange-500" />, label: "শিক্ষা সামগ্রী", value: "education" },
  { icon: <Tractor className="h-8 w-8 text-yellow-500" />, label: "কৃষি যন্ত্রপাতি", value: "agriculture" },
  { icon: <Store className="h-8 w-8 text-pink-500" />, label: "ব্যবসায়িক সামগ্রী", value: "business" },
  { icon: <Hammer className="h-8 w-8 text-gray-500" />, label: "কারিগরি টুলস", value: "tools" },
  { icon: <Briefcase className="h-8 w-8 text-indigo-500" />, label: "কমার্শিয়াল স্পেস", value: "commercial" },
  { icon: <Hotel className="h-8 w-8 text-teal-500" />, label: "গেস্ট হাউস/স্বল্পমেয়াদী", value: "guesthouse" },
  { icon: <Building2 className="h-8 w-8 text-emerald-500" />, label: "গ্রামীণ বাসস্থান", value: "rural" },
  { icon: <Camera className="h-8 w-8 text-violet-500" />, label: "স্টুডিও/স্পেশাল স্পেস", value: "studio" },
];

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-2">ক্যাটাগরি বেছে নিন</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {categories.map(cat => (
          <button
            key={cat.value}
            type="button"
            className={`flex flex-col items-center justify-center rounded-xl border p-3 transition cursor-pointer gap-2
            ${selected === cat.value ? "border-primary bg-primary/10 ring-2 ring-primary" : "border-gray-200 bg-white"}
            hover:bg-primary/5`}
            onClick={() => onSelect(cat.value)}
          >
            {cat.icon}
            <span className="text-xs font-medium">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
