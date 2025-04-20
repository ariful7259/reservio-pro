
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video as VideoIcon, Send } from "lucide-react";

export const NotificationChatModal = ({
  open,
  onOpenChange,
}: {
  open: boolean,
  onOpenChange: (open: boolean) => void;
}) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const inputVideo = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>ইন-অ্যাপ চ্যাট</DialogTitle>
        </DialogHeader>
        <div className="h-64 bg-gray-50 rounded-lg mb-3 overflow-y-auto p-2">
          <div className="text-sm text-gray-400 text-center mt-6">[ চ্যাট হিস্টোরি এখানে দেখাবে ]</div>
        </div>
        <div className="flex gap-2 items-center">
          <input
            ref={inputFile}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {}}
          />
          <input
            ref={inputVideo}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={() => {}}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => inputFile.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => inputVideo.current?.click()}
          >
            <VideoIcon className="h-5 w-5" />
          </Button>
          <input
            placeholder="বার্তা লিখুন"
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <Button variant="default" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
