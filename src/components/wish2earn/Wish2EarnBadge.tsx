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