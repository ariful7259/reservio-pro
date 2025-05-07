import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, User, MessageSquare, 
  Wallet, ShieldCheck, Fingerprint, Lightbulb, HelpCircle, 
  Book, Calendar, Heart, MapPin, List, ShoppingBag, Star,
  Store, File, Gavel, UserCheck, Building, DollarSign, 
  FileText, Calculator, Share2, MessageCircle, Info, Briefcase,
  ChartBar, Badge, ArrowDownToLine, Currency, Award, Link,
  BarChart3, ShoppingCart, Package, Grid, Settings, TrendingUp, Layout,
  Video, Users
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
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "ডিসপিউট সেন্টার",
    path: "/help/dispute-center"
  }
];

// Collapsible Menu Icons
export const collapsibleMenuIcons = {
  legal: <Briefcase className="h-5 w-5 text-red-500 mr-2" />,
  utilities: <Wrench className="h-5 w-5 text-red-500 mr-2" />,
  help: <HelpCircle className="h-5 w-5 text-red-500 mr-2" />,
  payment: <Wallet className="h-5 w-5 text-red-500 mr-2" />
};

// Payment Menu Items
export const paymentMenuItems = [
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

// Merchant Resources
export const merchantResources = [
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

// Seller Dashboard Menu Items
export const sellerDashboardMenuItems = [
  {
    icon: <Layout className="h-5 w-5 text-purple-500" />,
    name: "সমন্বিত ড্যাশবোর্ড",
    path: "/seller-dashboard"
  },
  {
    icon: <Store className="h-5 w-5 text-blue-500" />,
    name: "মার্কেটপ্লেস ম্যানেজমেন্ট",
    path: "/seller-dashboard/marketplace"
  },
  {
    icon: <Building className="h-5 w-5 text-green-500" />,
    name: "রেন্টাল ম্যানেজমেন্ট",
    path: "/seller-dashboard/rental"
  },
  {
    icon: <Wrench className="h-5 w-5 text-amber-500" />,
    name: "সার্ভিস ম্যানেজমেন্ট",
    path: "/seller-dashboard/services"
  },
  {
    icon: <Video className="h-5 w-5 text-indigo-500" />,
    name: "কন্টেন্ট ম্যানেজমেন্ট",
    path: "/seller-dashboard/content"
  },
  {
    icon: <ShoppingCart className="h-5 w-5 text-red-500" />,
    name: "অর্ডার ট্র্যাকিং",
    path: "/seller-dashboard/orders"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
    name: "রেভিনিউ রিপোর্টস",
    path: "/seller-dashboard/reports"
  },
  {
    icon: <Users className="h-5 w-5 text-fuchsia-500" />,
    name: "গ্রাহক ম্যানেজমেন্ট",
    path: "/seller-dashboard/customers"
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-sky-500" />,
    name: "বিজনেস এনালিটিক্স",
    path: "/seller-dashboard/analytics"
  }
];
