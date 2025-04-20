
import React, { useState } from "react";
import { MessageSquare, Video, Image as ImageIcon } from "lucide-react";
import { NotificationChatModal } from "./NotificationChatModal";
import { Button } from "@/components/ui/button";

const dummyNotifications = [
  {
    id: 1,
    type: "chat",
    title: "নতুন মেসেজ",
    subtitle: "আনন্দ: আপনাকে একটি মেসেজ পাঠিয়েছে",
  },
  {
    id: 2,
    type: "video",
    title: "নতুন ভিডিও শেয়ার",
    subtitle: "রিয়া আপনার সাথে ভিডিও শেয়ার করেছে",
  },
  {
    id: 3,
    type: "image",
    title: "ছবি পেয়েছেন",
    subtitle: "নাসিমঃ একটি ছবি শেয়ার করেছে",
  },
];

export const NotificationList = () => {
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-3">
      {dummyNotifications.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 px-2 py-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
          onClick={() => setOpenChatId(item.id)}
        >
          <div>{getIcon(item.type)}</div>
          <div className="flex-1">
            <div className="text-sm font-medium">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.subtitle}</div>
          </div>
          <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); setOpenChatId(item.id); }}>
            চ্যাট ওপেন
          </Button>
        </div>
      ))}
      <NotificationChatModal open={!!openChatId} onOpenChange={() => setOpenChatId(null)} />
    </div>
  );
};
