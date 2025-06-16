
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Wish2EarnModule } from "./Wish2EarnModule";

export const Wish2EarnBadge: React.FC<{
  onClick?: () => void;
}> = ({
  onClick
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  // Both mobile & desktop: open Dialog with Wish2EarnModule
  return <>
      <button 
        type="button" 
        onClick={handleOpen} 
        className={isMobile ? "flex items-center rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-400 px-2 py-1 shadow-md hover:scale-105 transition-all border-none ring-2 ring-primary/10 text-white text-xs font-bold mr-0 min-w-0" : "group flex items-center rounded-full bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-400 px-4 py-1.5 ml-2 shadow-md hover:scale-105 transition-all border-none ring-2 ring-primary/10"} 
        style={{
          fontWeight: 700
        }} 
        aria-label="Wish2Earn"
      >
        <Heart className={isMobile ? "h-4 w-4 text-white mr-1 group-hover:animate-pulse" : "h-5 w-5 text-white drop-shadow mr-1 group-hover:animate-pulse"} />
        <span className={isMobile ? "text-white text-xs font-bold mr-0" : "text-white text-base font-bold mr-2 drop-shadow"}>
          Wish2Earn
        </span>
        {!isMobile && <span className="bg-white bg-opacity-80 text-pink-600 text-xs font-semibold rounded px-2 py-0.5 ml-1">
            Goal-based Earning
          </span>}
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] max-h-[900px] p-0 overflow-hidden bg-gradient-to-b from-pink-100/50 via-white to-blue-100/20">
          <div className="w-full h-full overflow-auto">
            <Wish2EarnModule />
          </div>
        </DialogContent>
      </Dialog>
    </>;
};

export default Wish2EarnBadge;
