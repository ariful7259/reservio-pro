import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Wish2EarnModule } from "./Wish2EarnModule";
export const Wish2EarnBadge: React.FC<{
  onClick?: () => void;
}> = ({
  onClick
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  if (isMobile) {
    return <>
        <button type="button" onClick={() => setOpen(true)} className="
            flex items-center rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-400 px-2 py-1
            shadow-md hover:scale-105 transition-all border-none ring-2 ring-primary/10
            text-white text-xs font-bold mr-0
            min-w-0
          " style={{
        fontWeight: 700
      }} aria-label="Wish2Earn">
          <Heart className="h-4 w-4 text-white mr-1 group-hover:animate-pulse" />
          <span className="text-white text-xs font-bold mr-0">Wish2Earn</span>
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xs w-[95vw] p-0 rounded-2xl overflow-hidden !gap-0">
            
            
          </DialogContent>
        </Dialog>
      </>;
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