
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// লাইফস্টাইল অপশন (বাংলা নামসহ)
const lifestyleOptions = [
  "নিরব",
  "সামাজিক",
  "পেশাদার",
  "ছাত্র",
  "নিয়মানুবর্তিক",
  "ধুমপানমুক্ত"
];

// লোকেশন অপশন (উদাহরণস্বরূপ কিছু শহর)
const locationOptions = [
  "যেকোনো এলাকা",
  "মিরপুর",
  "ধানমন্ডি",
  "গুলশান",
  "বনানী",
  "মোহাম্মদপুর"
];

interface RoommateAdvancedFilterProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: { lifestyle: string[]; location: string; }) => void;
}

const RoommateAdvancedFilter: React.FC<RoommateAdvancedFilterProps> = ({
  open,
  onClose,
  onApply,
}) => {
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("যেকোনো এলাকা");

  if (!open) return null;

  const handleLifestyleToggle = (lifestyle: string) => {
    setSelectedLifestyle((prev) =>
      prev.includes(lifestyle)
        ? prev.filter((l) => l !== lifestyle)
        : [...prev, lifestyle]
    );
  };

  const handleApply = () => {
    onApply({
      lifestyle: selectedLifestyle,
      location: selectedLocation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-40 flex items-center justify-center">
      <Card className="w-full max-w-lg p-6 relative rounded-xl shadow-xl">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="বন্ধ করুন"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg font-bold mb-1">অ্যাডভান্সড ফিল্টার</h2>
        <p className="text-gray-500 text-sm mb-4">আপনার প্রয়োজনে অনুসারী রুমমেট ফিল্টার করুন</p>

        <div className="mb-4">
          <div className="font-semibold text-base mb-2">লাইফস্টাইল</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-2">
            {lifestyleOptions.map(option => (
              <label key={option} className="flex items-center gap-2 cursor-pointer text-[15px]">
                <Checkbox
                  checked={selectedLifestyle.includes(option)}
                  onCheckedChange={() => handleLifestyleToggle(option)}
                  id={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-semibold text-base mb-2">অবস্থান</div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full rounded-md border h-10">
              <SelectValue placeholder="যেকোনো এলাকা" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-[#0397D3] hover:bg-[#0285bb] text-white mt-2 rounded"
          onClick={handleApply}
        >
          ফিল্টার প্রয়োগ করুন
        </Button>
      </Card>
    </div>
  );
};

export default RoommateAdvancedFilter;
