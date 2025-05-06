
// If this file exists, import the MenuItem type from types.ts
import { MenuItem, ProfileMenuItem } from './types';
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  HelpCircle, 
  ShieldAlert, 
  FileText,
  Building,
  LucideIcon,
  Wallet,
  Percent,
  Headphones,
  MessageSquare,
  Mail,
  Phone,
  Home,  // Using Home instead of Stairs as it's a valid icon
  Scale,
  Banknote,
  Landmark,
  Lightbulb,
  BookOpenCheck,
  CreditCard,
  RefreshCcw
} from 'lucide-react';

// Define a type for the icon prop
interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}

// Utility function to create menu items
const createMenuItem = (
  icon: React.ReactNode, 
  name: string, 
  path?: string, 
  badge?: number, 
  show?: boolean
): MenuItem => ({
  icon,
  name,
  path,
  badge,
  show
});

// Profile Menu Items
export const getProfileMenuItems = (isAdmin: boolean): ProfileMenuItem[] => {
  const items: ProfileMenuItem[] = [
    {
      icon: <User className="h-5 w-5" />,
      name: "প্রোফাইল",
      path: "/profile"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      name: "সেটিংস",
      path: "/settings"
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      name: "সাহায্য",
      path: "/help"
    }
  ];

  if (isAdmin) {
    items.push({
      icon: <ShieldAlert className="h-5 w-5" />,
      name: "এডমিন প্যানেল",
      path: "/admin",
      badge: 5
    });
  }

  return items;
};

// Legal Assistance Menu Items
export const legalAssistanceMenuItems: MenuItem[] = [
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    name: "আইনগত পরামর্শ",
    path: "/legal-advice"
  },
  {
    icon: <Building className="h-5 w-5 text-red-500" />,
    name: "জমির দলিল",
    path: "/land-documents"
  },
  {
    icon: <Home className="h-5 w-5 text-red-500" />,  // Changed from Stairs to Home
    name: " বিল্ডিং প্ল্যান",
    path: "/building-plan"
  },
  {
    icon: <Scale className="h-5 w-5 text-red-500" />,
    name: "ভ্যাট ও ট্যাক্স",
    path: "/vat-tax"
  },
  {
   icon: <Banknote className="h-5 w-5 text-red-500" />,
    name: "লোন",
    path: "/loan"
  }
];

// Utilities Menu Items
export const utilitiesMenuItems: MenuItem[] = [
  {
    icon: <Landmark className="h-5 w-5 text-red-500" />,
    name: "বিদ্যুৎ বিল",
    path: "/electricity-bill"
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-red-500" />,
    name: "গ্যাস বিল",
    path: "/gas-bill"
  },
  {
    icon: <BookOpenCheck className="h-5 w-5 text-red-500" />,
    name: "পানির বিল",
    path: "/water-bill"
  },
  {
    icon: <CreditCard className="h-5 w-5 text-red-500" />,
    name: "ক্রেডিট কার্ড বিল",
    path: "/credit-card-bill"
  }
];

// Help and Support Menu Items
export const helpAndSupportMenuItems: MenuItem[] = [
  {
    icon: <MessageSquare className="h-5 w-5 text-red-500" />,
    name: "যোগাযোগ করুন",
    path: "/contact"
  },
  {
    icon: <Mail className="h-5 w-5 text-red-500" />,
    name: "আমাদের ইমেইল করুন",
    path: "/email-us"
  },
  {
    icon: <Phone className="h-5 w-5 text-red-500" />,
    name: "ফোন করুন",
    path: "/call-us"
  },
  {
    icon: <Headphones className="h-5 w-5 text-red-500" />,
    name: "হেল্পলাইন",
    path: "/helpline"
  }
];

// Collapsible Menu Icons
export const collapsibleMenuIcons = {
  legal: <FileText className="h-5 w-5 text-red-500 mr-2" />,
  utilities: <Lightbulb className="h-5 w-5 text-red-500 mr-2" />,
  help: <HelpCircle className="h-5 w-5 text-red-500 mr-2" />,
  payment: <CreditCard className="h-5 w-5 text-red-500 mr-2" />
};

// Payment Menu Items
export const paymentMenuItems: MenuItem[] = [
  {
    icon: <Wallet className="h-5 w-5 text-red-500" />,
    name: 'পেমেন্ট এনালিটিক্স',
    path: '/payment/analytics'
  },
  {
    icon: <Percent className="h-5 w-5 text-red-500" />,
    name: 'ট্রানজেকশন হিস্টরি',
    path: '/payment/transaction-history'
  },
  {
    icon: <CreditCard className="h-5 w-5 text-red-500" />,
    name: 'ইনভয়েস তৈরি করুন',
    path: '/payment/generate-invoice'
  }
];

// Merchant Resources
export const merchantResources: MenuItem[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5 text-red-500" />,
    name: "ড্যাশবোর্ড",
    path: "/merchant/dashboard"
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-red-500" />,
    name: "ড্যাশবোর্ড",
    path: "/merchant/dashboard"
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-red-500" />,
    name: "ড্যাশবোর্ড",
    path: "/merchant/dashboard"
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-red-500" />,
    name: "ড্যাশবোর্ড",
    path: "/merchant/dashboard"
  },
  {
    icon: <LayoutDashboard className="h-5 w-5 text-red-500" />,
    name: "ড্যাশবোর্ড",
    path: "/merchant/dashboard"
  }
];
