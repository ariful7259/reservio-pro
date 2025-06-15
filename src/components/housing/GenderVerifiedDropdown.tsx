
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface GenderVerifiedDropdownProps {
  gender: "any" | "male" | "female" | "couple";
  onChange: (key: "gender", value: any) => void;
}

const GenderVerifiedDropdown: React.FC<GenderVerifiedDropdownProps> = ({
  gender,
  onChange,
}) => {
  // For display label
  const getLabel = () => {
    if (gender === "male") return "ছেলে";
    if (gender === "female") return "মেয়ে";
    if (gender === "couple") return "কাপল";
    return "জনপ্রকার";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center border rounded-md px-3 py-2 bg-gray-50 text-sm gap-1 hover:bg-gray-100 focus:outline-none"
          type="button"
        >
          {getLabel()}
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[145px] z-50 bg-white">
        <DropdownMenuLabel>জনপ্রকার বাছাই করুন</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onChange("gender", "male")}
        >
          <input
            type="radio"
            name="dropdown-gender"
            checked={gender === "male"}
            onChange={() => onChange("gender", "male")}
            className="accent-blue-600"
          />
          <span className="text-xs">ছেলে</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onChange("gender", "female")}
        >
          <input
            type="radio"
            name="dropdown-gender"
            checked={gender === "female"}
            onChange={() => onChange("gender", "female")}
            className="accent-pink-500"
          />
          <span className="text-xs">মেয়ে</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onChange("gender", "couple")}
        >
          <input
            type="radio"
            name="dropdown-gender"
            checked={gender === "couple"}
            onChange={() => onChange("gender", "couple")}
            className="accent-green-600"
          />
          <span className="text-xs">কাপল</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => onChange("gender", "any")}
        >
          <input
            type="radio"
            name="dropdown-gender"
            checked={gender === "any"}
            onChange={() => onChange("gender", "any")}
            className="accent-gray-400"
          />
          <span className="text-xs">সব</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenderVerifiedDropdown;
