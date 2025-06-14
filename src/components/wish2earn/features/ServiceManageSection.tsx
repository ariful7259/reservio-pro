
import React, { useState } from "react";
import { Plus, Trash, Camera, BookUser, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const demoServices = [
  { name: "জমি পরিস্কার", type: "সার্ভিস", icon: BookUser },
  { name: "ক্যামেরা ভাড়া", type: "প্রোডাক্ট", icon: Camera },
  { name: "ডিজাইন ফাইল", type: "ডিজিটাল", icon: File },
];

export const ServiceManageSection: React.FC = () => {
  const [services, setServices] = useState(demoServices);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("সব");
  const types = ["সব", "সার্ভিস", "প্রোডাক্ট", "ডিজিটাল"];

  const filtered = tab === "সব" ? services : services.filter(s => s.type === tab);

  const handleAdd = () => {
    if (input.trim()) {
      setServices([...services, { name: input, type: tab === "সব" ? "সার্ভিস" : tab, icon: Plus }]);
      setInput("");
    }
  };
  const handleRemove = (i: number) => setServices(services.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {types.map(t => (
          <button
            key={t}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              tab === t ? "bg-pink-500 text-white shadow" : "bg-white border-gray-300 text-gray-500"
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <input
          className="border rounded px-2 py-1 text-sm w-full"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="নতুন যুক্ত করুন…"
        />
        <Button size="sm" onClick={handleAdd}><Plus className="h-4 w-4" /></Button>
      </div>
      <ul className="space-y-2 max-h-44 overflow-auto">
        {filtered.map((s, i) => (
          <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border">
            <span className="flex items-center gap-2">
              <s.icon className="h-5 w-5" /> {s.name}
              <Badge className="ml-1 text-xs">{s.type}</Badge>
            </span>
            <Button type="button" variant="ghost" size="icon" onClick={()=>handleRemove(i)}><Trash className="h-4 w-4 text-rose-400" /></Button>
          </li>
        ))}
        {filtered.length === 0 && <li className="text-xs text-gray-400 py-3 text-center">কিছু নেই</li>}
      </ul>
    </div>
  );
};
