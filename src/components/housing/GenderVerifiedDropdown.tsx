
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface GenderVerifiedDropdownProps {
  gender: "any" | "male" | "female" | "couple";
  verified: boolean;
  premium: boolean;
  onChange: (key: "gender" | "verified" | "premium", value: any) => void;
}

const GenderVerifiedDropdown: React.FC<GenderVerifiedDropdownProps> = ({
  gender,
  verified,
  premium,
  onChange,
}) => {
  // For display label
  const getLabel = () => {
    if (gender === "male") return "ছেলে";
    if (gender === "female") return "মেয়ে";
    if (gender === "couple") return "কাপল";
    return "জনপ্রকার";
  };

  // Count active
  const extra = [verified, premium].filter(Boolean).length;
  const badge = extra > 0 ? `+${extra}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center border rounded-md px-3 py-2 bg-gray-50 text-sm gap-1 hover:bg-gray-100 focus:outline-none"
          type="button"
        >
          {getLabel()} {badge && <span className="ml-1 text-xs text-muted-foreground">{badge}</span>}
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] z-50">
        <DropdownMenuLabel>ফিল্টার</DropdownMenuLabel>
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
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={verified}
          onCheckedChange={(v) => onChange("verified", !!v)}
          className="gap-2"
        >
          <span className="text-xs">Verified</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={premium}
          onCheckedChange={(v) => onChange("premium", !!v)}
          className="gap-2"
        >
          <span className="text-xs">Premium</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenderVerifiedDropdown;
