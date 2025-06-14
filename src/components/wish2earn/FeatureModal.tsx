
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface FeatureModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children: React.ReactNode;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ open, onOpenChange, children }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md w-[98vw] p-0 rounded-2xl overflow-hidden !gap-0">
      {children}
    </DialogContent>
  </Dialog>
);
