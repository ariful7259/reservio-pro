
import React from 'react';
import { 
  Calculator, 
  FileText, 
  Share2, 
  DollarSign, 
  Star, 
  Link, 
  Award 
} from 'lucide-react';
import { MenuItem } from './types';

// Utilities Menu Items
export const utilitiesMenuItems: MenuItem[] = [
  {
    icon: <Calculator className="h-5 w-5 text-red-500" />,
    name: "নো ইয়োর রেন্ট",
    path: "/utilities/know-your-rent"
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "ক্রিয়েট রেন্ট রিসিপ্টস",
    path: "/utilities/create-rent-receipts"
  },
  {
    icon: <Share2 className="h-5 w-5 text-red-500" />,
    name: "ক্লিক এন্ড আর্ন",
    path: "/utilities/click-and-earn"
  },
  {
    icon: <DollarSign className="h-5 w-5 text-red-500" />,
    name: "ট্রানজেকশন হিস্টরি",
    path: "/payment/transaction-history"
  },
  {
    icon: <Star className="h-5 w-5 text-red-500" />,
    name: "রেটিং এবং রিভিউ",
    path: "/ratings-reviews"
  },
  {
    icon: <Link className="h-5 w-5 text-red-500" />,
    name: "পেমেন্ট লিংক জেনারেটর",
    path: "/payment/payment-links"
  },
  {
    icon: <Award className="h-5 w-5 text-red-500" />,
    name: "লয়ালটি প্রোগ্রাম",
    path: "/loyalty-program"
  }
];
