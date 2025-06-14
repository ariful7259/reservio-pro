import React from "react";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
export const Wish2EarnBadge: React.FC<{
  onClick?: () => void;
}> = ({
  onClick
}) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return;
  }
  return <button type="button" onClick={onClick} className="group flex items-center rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-400 px-4 py-1.5 ml-2 shadow-md hover:scale-105 transition-all border-none ring-2 ring-primary/10" style={{
    fontWeight: 700
  }} aria-label="Wish2Earn">
      <Heart className="h-5 w-5 text-white drop-shadow mr-1 group-hover:animate-pulse" />
      <span className="text-white text-base font-bold mr-2 drop-shadow">Wish2Earn</span>
      <span className="bg-white bg-opacity-80 text-pink-600 text-xs font-semibold rounded px-2 py-0.5 ml-1">
        Goal-based Earning
      </span>
    </button>;
};
export default Wish2EarnBadge;