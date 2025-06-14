
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export const CustomFeatureDialog: React.FC<Props> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>কাস্টম ফিচার অনুরোধ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            আপনার বিশেষ প্রয়োজনের জন্য কাস্টম ফিচার তৈরি করতে আমাদের সাথে যোগাযোগ করুন।
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              বাতিল
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                navigate("/help");
                toast({
                  title: "অনুরোধ পাঠানো হয়েছে",
                  description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব",
                });
              }}
              className="flex-1"
            >
              অনুরোধ পাঠান
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
