
import React from 'react';
import { 
  User, 
  MessageSquare, 
  Wallet, 
  ShieldCheck, 
  Fingerprint, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';
import { ProfileMenuItem } from './types';

// Profile Menu Items
export const getProfileMenuItems = (isAdmin: boolean): ProfileMenuItem[] => [
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
