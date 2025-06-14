
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, BellDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessTypeButtonProps } from "./types";

// Utility: getBadge
function getBadge({ pendingCount = 0, newCount = 0 }) {
  if (pendingCount > 0) {
    return <Badge variant="warning" className="ml-1">{pendingCount} pending</Badge>;
  }
  if (newCount > 0) {
    return <Badge variant="success" className="ml-1">New</Badge>;
  }
  return null;
}

export const BusinessTypeButton: React.FC<BusinessTypeButtonProps & {
  pendingCount?: number;
  newCount?: number;
}> = ({
  type,
  isActive,
  onClick,
  pendingCount = 0,
  newCount = 0,
}) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
      onClick={() => onClick(type.id)}
      aria-pressed={isActive}
      aria-label={type.name}
    >
      {type.icon}
      <span className="hidden sm:inline">{type.name}</span>
      {getBadge({ pendingCount, newCount })}
      {isActive ? (
        <ChevronUp className="h-3 w-3 ml-1" />
      ) : (
        <ChevronDown className="h-3 w-3 ml-1" />
      )}
    </Button>
  );
};
