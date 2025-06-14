
import React, { useState } from "react";
import { Heart, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const initialWishes = [
  { name: "নতুন স্মার্টফোন", progress: 60 },
  { name: "ক্যামেরা লেন্স", progress: 30 },
];

export const WishlistGoalFeature: React.FC = () => {
  const [wishes, setWishes] = useState(initialWishes);
  const [input, setInput] = useState("");
  const handleAdd = () => {
    if (input.trim()) {
      setWishes([...wishes, { name: input, progress: 0 }]);
      setInput("");
    }
  };
  const handleRemove = (i: number) => setWishes(wishes.filter((_, idx) => idx !== i));

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold text-pink-600 mb-2 flex items-center gap-1"><Heart className="h-5 w-5" />Wishlist+</h2>
      <div className="flex items-center mb-3 gap-2">
        <input
          className="border rounded px-2 py-1 w-full text-sm"
          placeholder="নতুন ইচ্ছা লিখুন"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <Button size="sm" onClick={handleAdd} className="gap-1"><Plus className="h-4 w-4" />Add</Button>
      </div>
      <div className="space-y-3 max-h-56 overflow-auto">
        {wishes.length === 0 && <span className="text-xs text-gray-500">কোনো ইচ্ছা যুক্ত হয়নি</span>}
        {wishes.map((wish, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded shadow-sm bg-stone-50 border">
            <div className="flex flex-col w-full">
              <span className="font-medium text-sm truncate">{wish.name}</span>
              <Progress value={wish.progress} className="h-2 my-1" />
              <span className="text-[11px] text-gray-500">{wish.progress}% অর্জিত</span>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={()=>handleRemove(i)}><Trash className="h-4 w-4 text-rose-500" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};
