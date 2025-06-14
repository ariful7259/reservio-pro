
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface FeatureModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({
  open,
  onOpenChange,
  children,
  title,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="max-w-md w-[98vw] p-0 rounded-2xl overflow-hidden !gap-0 bg-white relative"
      style={{backgroundColor: "#fff", zIndex: 1000}}
    >
      {title && <DialogTitle className="text-lg font-bold px-4 pt-4">{title}</DialogTitle>}
      <div>{children}</div>
    </DialogContent>
  </Dialog>
);
