
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Image as ImageIcon, Send } from "lucide-react";

const DigitalCreatorModal = ({ open, onOpenChange } : { open: boolean, onOpenChange: (v: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Digital Creator 🎥</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-2">
          <Button className="w-full flex gap-2" variant="outline">
            <Video className="h-5 w-5" /> ভিডিও আপলোড করুন
          </Button>
          <Button className="w-full flex gap-2" variant="outline">
            <ImageIcon className="h-5 w-5" /> ছবি আপলোড করুন
          </Button>
          <Button className="w-full flex gap-2" variant="default">
            <Send className="h-5 w-5" /> পোস্ট সাবমিট করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DigitalCreatorModal;
