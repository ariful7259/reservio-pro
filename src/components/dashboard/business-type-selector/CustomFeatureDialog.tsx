
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export const CustomFeatureDialog: React.FC<Props> = ({
  open,
  onOpenChange,
}) => {
  const [feature, setFeature] = useState("");
  const [desc, setDesc] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = () => {
    // Fake send
    onOpenChange(false);
    toast({
      title: "ধন্যবাদ!",
      description: "আপনার অনুরোধ প্রাপ্ত হয়েছে। সাপোর্ট টিম দ্রুত যোগাযোগ করবে।",
    });
    setFeature("");
    setDesc("");
    setContact("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>কাস্টম ফিচার অনুরোধ</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-2"
          onSubmit={e => { e.preventDefault(); handleSubmit(); }}
          aria-label="কাস্টম ফিচার অনুরোধ ফর্ম"
        >
          <input
            className="w-full p-2 border rounded my-1"
            placeholder="আপনার প্রয়োজনীয় ফিচারের নাম"
            value={feature}
            onChange={e => setFeature(e.target.value)}
            required
            aria-label="ফিচারের নাম"
          />
          <textarea
            className="w-full p-2 border rounded my-1"
            placeholder="বিস্তারিত লিখুন (ঐচ্ছিক)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={3}
            aria-label="বিস্তারিত"
          />
          <input
            className="w-full p-2 border rounded my-1"
            placeholder="আপনার ইমেইল (ঐচ্ছিক, যোগাযোগের জন্য)"
            value={contact}
            onChange={e => setContact(e.target.value)}
            aria-label="যোগাযোগের ইমেইল"
          />
          <div className="flex gap-2 mt-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} className="flex-1">বাতিল</Button>
            <Button type="submit" className="flex-1">অনুরোধ পাঠান</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
