
import React from 'react';
import { 
  ChartBar, 
  ShoppingBag, 
  FileText, 
  Star, 
  Badge 
} from 'lucide-react';
import { MenuItem } from './types';

// Merchant Resources
export const merchantResources: MenuItem[] = [
  {
    icon: <ChartBar className="h-5 w-5 text-red-500" />,
    name: "সেলস এনালিটিক্স",
    path: "/merchant/analytics"
  },
  {
    icon: <ShoppingBag className="h-5 w-5 text-red-500" />,
    name: "অর্ডার ম্যানেজমেন্ট",
    path: "/merchant/orders"
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "সেলস রিপোর্ট",
    path: "/merchant/sales-report"
  },
  {
    icon: <Star className="h-5 w-5 text-red-500" />,
    name: "রেটিং এবং রিভিউ",
    path: "/merchant/ratings"
  },
  {
    icon: <Badge className="h-5 w-5 text-red-500" />,
    name: "ভেরিফিকেশন স্ট্যাটাস",
    path: "/merchant/verification"
  }
];
