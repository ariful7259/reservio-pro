
import React from 'react';
import { 
  ChartBar, 
  Wallet, 
  ShieldCheck, 
  FileText, 
  Calculator, 
  ArrowDownToLine, 
  Currency 
} from 'lucide-react';
import { MenuItem } from './types';

// Payment Menu Items
export const paymentMenuItems: MenuItem[] = [
  {
    icon: <ChartBar className="h-5 w-5 text-red-500" />,
    name: "পেমেন্ট এনালিটিক্স",
    path: "/payment/analytics"
  },
  {
    icon: <Wallet className="h-5 w-5 text-red-500" />,
    name: "পেমেন্ট মেথড",
    path: "/payment/payment-methods"
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-red-500" />,
    name: "এসক্রো স্ট্যাটাস",
    path: "/payment/escrow-status"
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "ইনভয়েস জেনারেট",
    path: "/payment/generate-invoice"
  },
  {
    icon: <Calculator className="h-5 w-5 text-red-500" />,
    name: "কমিশন ক্যালকুলেটর",
    path: "/payment/commission-calculator"
  },
  {
    icon: <ArrowDownToLine className="h-5 w-5 text-red-500" />,
    name: "অটোমেটিক রিফান্ড",
    path: "/payment/auto-refund"
  },
  {
    icon: <Currency className="h-5 w-5 text-red-500" />,
    name: "মাল্টি-কারেন্সি সাপোর্ট",
    path: "/payment/multi-currency"
  }
];
