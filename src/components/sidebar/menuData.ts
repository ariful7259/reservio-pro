
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, User, MessageSquare, 
  Wallet, ShieldCheck, Fingerprint, Lightbulb, HelpCircle, 
  Book, Calendar, Heart, MapPin, List, ShoppingBag, Star, 
  Store, File, Gavel, UserCheck, Building, DollarSign, 
  FileText, Calculator, Share2, MessageCircle, Info, Briefcase
} from 'lucide-react';
import React from 'react';

// Profile Menu Items
export const getProfileMenuItems = (isAdmin: boolean) => [
  {
    icon: <User className="h-5 w-5" />,
    name: "ব্যক্তিগত তথ্য",
    path: "/profile-management"
  }, {
    icon: <MessageSquare className="h-5 w-5" />,
    name: "নোটিফিকেশন",
    path: "/notifications",
    badge: 2
  }, {
    icon: <Wallet className="h-5 w-5" />,
    name: "ওয়ালেট",
    path: "/wallet"
  }, {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "সিকিউরিটি",
    path: "/security"
  }, {
    icon: <Fingerprint className="h-5 w-5" />,
    name: "KYC ভেরিফিকেশন",
    path: "/kyc-verification"
  }, {
    icon: <Lightbulb className="h-5 w-5" />,
    name: "ইউটিলিটিস",
    path: "/utilities"
  }, {
    icon: <HelpCircle className="h-5 w-5" />,
    name: "হেল্প এন্ড সাপোর্ট",
    path: "/help"
  }, {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "অ্যাডমিন ড্যাশবোর্ড",
    path: "/admin-dashboard",
    show: isAdmin
  }
];

// Legal Assistance Menu Items
export const legalAssistanceMenuItems = [
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

// Utilities Menu Items
export const utilitiesMenuItems = [
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
  }
];

// Help And Support Menu Items
export const helpAndSupportMenuItems = [
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
  }
];

// Collapsible Menu Icons
export const collapsibleMenuIcons = {
  legal: <Briefcase className="h-5 w-5 text-red-500 mr-2" />,
  utilities: <Wrench className="h-5 w-5 text-red-500 mr-2" />,
  help: <HelpCircle className="h-5 w-5 text-red-500 mr-2" />
};
