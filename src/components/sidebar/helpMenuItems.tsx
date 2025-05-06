
import React from 'react';
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Info, 
  FileText 
} from 'lucide-react';
import { MenuItem } from './types';

// Help And Support Menu Items
export const helpAndSupportMenuItems: MenuItem[] = [
  {
    icon: <HelpCircle className="h-5 w-5 text-red-500" />,
    name: "সাপোর্ট টপিকস",
    path: "/help/support-topics"
  },
  {
    icon: <Book className="h-5 w-5 text-red-500" />,
    name: "ব্লগ",
    path: "/help/blog"
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-red-500" />,
    name: "ফিডব্যাক",
    path: "/help/feedback"
  },
  {
    icon: <Info className="h-5 w-5 text-red-500" />,
    name: "অ্যাবাউট আস",
    path: "/help/about-us"
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "ডিসপিউট সেন্টার",
    path: "/help/dispute-center"
  }
];
