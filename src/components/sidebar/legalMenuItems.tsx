
import React from 'react';
import { 
  File, 
  Gavel, 
  UserCheck, 
  Building, 
  Home, 
  DollarSign 
} from 'lucide-react';
import { MenuItem } from './types';

// Legal Assistance Menu Items
export const legalAssistanceMenuItems: MenuItem[] = [
  {
    icon: <File className="h-5 w-5 text-red-500" />,
    name: "রেন্টাল এগ্রিমেন্ট",
    path: "/services/rental-agreement"
  },
  {
    icon: <Gavel className="h-5 w-5 text-red-500" />,
    name: "পুলিশ ইনটিমেশন",
    path: "/services/police-intimation"
  },
  {
    icon: <UserCheck className="h-5 w-5 text-red-500" />,
    name: "টেনান্ট ভেরিফিকেশন",
    path: "/services/tenant-verification"
  },
  {
    icon: <Building className="h-5 w-5 text-red-500" />,
    name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
    path: "/services/property-legal-assistance"
  },
  {
    icon: <Home className="h-5 w-5 text-red-500" />,
    name: "হোম লোন",
    path: "/services/home-loan"
  },
  {
    icon: <DollarSign className="h-5 w-5 text-red-500" />,
    name: "হোম ডিপোজিট লোন",
    path: "/services/home-deposit-loan"
  }
];
