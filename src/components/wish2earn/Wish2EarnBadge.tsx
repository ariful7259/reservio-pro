import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative h-8 w-8 md:h-10 md:w-10" 
        onClick={handleOpen}
      >
        🎯
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative h-8 w-8 md:h-10 md:w-10" 
        onClick={handleOpen}
      >
        <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />
      </Button>
      
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