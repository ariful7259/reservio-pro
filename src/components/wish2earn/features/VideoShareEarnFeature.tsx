
import React, { useState } from "react";
import { Play, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const VideoShareEarnFeature: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const videoUrl = "https://youtube.com/demo-video-link";
  const handleCopy = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(()=>setCopied(false), 1200);
  };

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold text-rose-700 mb-2 flex gap-1 items-center"><Play className="h-5 w-5" />ভিডিও/লিংক শেয়ার ইনকাম</h2>
      <div className="rounded bg-gray-50 p-2 mb-2">
        <div className="aspect-video bg-black flex items-center justify-center rounded mb-2">
          <Play className="text-white h-8 w-8 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleCopy} className="gap-1">
            <Copy className="h-4 w-4" />{copied ? "কপি হয়েছে!" : "Link কপি"}
          </Button>
          <Button size="sm" variant="outline" className="gap-1"><Share2 className="h-4 w-4" />শেয়ার</Button>
        </div>
      </div>
      <span className="text-xs text-gray-600">ভিডিও বা ফাইল লিঙ্ক শেয়ার করলে অর্জিত ইনকাম bar/progress এখানে দেখাবে।</span>
    </div>
  );
};
