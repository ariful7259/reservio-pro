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
        <DialogOverlay className="fixed inset-0 z-[9998] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent className={
      // Completely fill the screen
      "fixed left-0 top-0 z-[9999] w-screen h-screen max-w-none max-h-none grid gap-0 border-0 bg-white p-0 shadow-2xl rounded-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"} style={{
        backgroundColor: "#ffffff",
        padding: 0,
        zIndex: 9999
      }}>
          <div className="w-full h-full min-h-screen min-w-screen flex flex-col animate-fade-in overflow-y-auto bg-gradient-to-b from-pink-50/50 via-white to-blue-50/20">
            <Wish2EarnModule />
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Wish2EarnBadge;