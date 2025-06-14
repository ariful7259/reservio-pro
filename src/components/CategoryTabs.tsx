
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Home, Settings, User } from "lucide-react";

interface CategoryTabsProps {
  active: string;
  setActive: (cat: string) => void;
}
const categories = [
  { value: "all", label: "সব", icon: <Store className="h-4 w-4 text-primary" /> },
  { value: "rent", label: "রেন্ট", icon: <Home className="h-4 w-4 text-secondary" /> },
  { value: "services", label: "সার্ভিস", icon: <Settings className="h-4 w-4 text-accent" /> },
  { value: "marketplace", label: "মার্কেটপ্লেস", icon: <User className="h-4 w-4 text-amber-500" /> },
];
export default function CategoryTabs({ active, setActive }: CategoryTabsProps) {
  return (
    <Tabs value={active}>
      <TabsList className="flex w-full justify-between bg-secondary/30">
        {categories.map(cat => (
          <TabsTrigger
            key={cat.value}
            value={cat.value}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md transition-all
             ${active === cat.value ? "bg-white shadow text-primary font-bold ring-2 ring-primary" : "text-gray-600"}
             group hover:bg-primary/10`}
            onClick={() => setActive(cat.value)}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
