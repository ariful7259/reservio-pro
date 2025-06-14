
import React, { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialOffers = [{ name: "ক্যামেরা ভাড়া", type: "রেন্ট" }];

export const ProductServiceOfferFeature: React.FC = () => {
  const [offers, setOffers] = useState(initialOffers);
  const [input, setInput] = useState("");
  const handleAdd = () => {
    if (input.trim()) {
      setOffers([...offers, { name: input, type: "অন্য" }]);
      setInput("");
    }
  };
  const handleRemove = (i: number) => setOffers(offers.filter((_, idx) => idx !== i));

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold text-purple-700 mb-2">নিজের প্রোডাক্ট/সার্ভিস অফার</h2>
      <div className="flex items-center gap-1 mb-2">
        <input className="border rounded px-2 py-1 text-sm w-full" value={input} onChange={e => setInput(e.target.value)} placeholder="নতুন অফার দিন"/>
        <Button size="sm" onClick={handleAdd}><Plus className="h-4 w-4" /></Button>
      </div>
      <ul className="space-y-2 max-h-40 overflow-auto">
        {offers.map((off, i)=>(
          <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded border">
            <span>{off.name} <span className="text-xs text-gray-400">({off.type})</span></span>
            <Button type="button" variant="ghost" size="icon" onClick={()=>handleRemove(i)}><Trash className="h-4 w-4 text-rose-400" /></Button>
          </li>
        ))}
        {offers.length === 0 && <li className="text-xs text-gray-400">কোনো অফার নেই</li>}
      </ul>
    </div>
  );
};

