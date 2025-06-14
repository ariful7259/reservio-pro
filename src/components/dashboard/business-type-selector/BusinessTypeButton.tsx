
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessTypeButtonProps } from "./types";

export const BusinessTypeButton: React.FC<BusinessTypeButtonProps> = ({
  type,
  isActive,
  onClick,
  badgeCount = 0,
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
      {badgeCount > 0 ? (
        <Badge variant="warning" className="ml-1">{badgeCount}</Badge>
      ) : null}
      {isActive ? (
        <ChevronUp className="h-3 w-3 ml-1" />
      ) : (
        <ChevronDown className="h-3 w-3 ml-1" />
      )}
    </Button>
  );
};
