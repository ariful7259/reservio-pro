
import React from 'react';
import { 
  Store, BookOpen, Calendar, MessageSquare, Users, Globe, Briefcase, 
  FileText, Video, Cpu, DollarSign, Shield, LogOut, User, LogIn,
  FileIcon, CalendarIcon, MessageCircle, UsersRound, File, Gavel, 
  UserCheck, Home as HomeIcon, Calculator, Share2, HelpCircle as HelpIcon,
  Info, Book, Wrench, Building, CreditCard
} from 'lucide-react';

// Digital Creator Solutions
export const creatorSolutionsData = [
  {
    icon: <Store className="h-4 w-4 text-primary" />,
    name: "অনলাইন স্টোর",
    path: "/create-store",
    description: "নিজের ব্র্যান্ডের ওয়েবসাইট তৈরি করুন"
  },
  {
    icon: <Shield className="h-4 w-4 text-green-600" />,
    name: "সিকিউর পেমেন্ট (SecurePay)",
    path: "/securepay",
    description: "এসক্রো পেমেন্ট সিস্টেম দিয়ে নিরাপদ লেনদেন"
  },
  {
    icon: <BookOpen className="h-4 w-4 text-amber-500" />,
    name: "কোর্স বিল্ডার",
    path: "/course-builder",
    description: "আয় করুন অনলাইন শিক্ষা দিয়ে"
  },
  {
    icon: <Calendar className="h-4 w-4 text-red-500" />,
    name: "ইভেন্ট হোস্টিং",
    path: "/event-hosting",
    description: "অনলাইন ও অফলাইন ইভেন্ট ম্যানেজমেন্ট"
  },
  {
    icon: <MessageSquare className="h-4 w-4 text-orange-500" />,
    name: "১:১ সেশন",
    path: "/one-on-one",
    description: "পারসোনাল কনসালটেশন সেবা"
  },
  {
    icon: <DollarSign className="h-4 w-4 text-green-500" />,
    name: "ডিজিটাল প্রোডাক্ট",
    path: "/digital-products",
    description: "ইবুক, টেমপ্লেট, সফটওয়্যার বিক্রয়"
  },
  {
    icon: <Users className="h-4 w-4 text-yellow-500" />,
    name: "পেইড কমিউনিটি",
    path: "/paid-community",
    description: "মেম্বারশিপ কমিউনিটি তৈরি করুন"
  },
  {
    icon: <Globe className="h-4 w-4 text-cyan-500" />,
    name: "মাল্টি-চ্যানেল",
    path: "/multi-channel",
    description: "সব প্ল্যাটফর্ম থেকে বিক্রয় করুন"
  },
  {
    icon: <Briefcase className="h-4 w-4 text-indigo-500" />,
    name: "রিসেলার প্রোগ্রাম",
    path: "/reseller-program",
    description: "এফিলিয়েট নেটওয়ার্ক তৈরি করুন"
  },
  {
    icon: <FileText className="h-4 w-4 text-teal-500" />,
    name: "কন্টেন্ট প্ল্যানার",
    path: "/content-planner",
    description: "সোশ্যাল মিডিয়া ও কন্টেন্ট ম্যানেজমেন্ট"
  },
  {
    icon: <Cpu className="h-4 w-4 text-gray-500" />,
    name: "পেমেন্ট গেটওয়ে",
    path: "/payment-gateway",
    description: "সহজে পেমেন্ট কালেকশন করুন"
  },
  {
    icon: <Video className="h-4 w-4 text-rose-500" />,
    name: "ভিডিও হোস্টিং",
    path: "/video-hosting",
    description: "প্রোফেশনাল ভিডিও সার্ভিস"
  }
];

// Legal Assistance and Loan Menu
export const legalAssistanceMenuItems = [
  {
    icon: <File className="h-4 w-4 text-red-500" />,
    name: "রেন্টাল এগ্রিমেন্ট",
    path: "/services/rental-agreement",
    description: "রেন্টাল চুক্তি তৈরি করুন"
  },
  {
    icon: <Gavel className="h-4 w-4 text-red-500" />,
    name: "পুলিশ ইনটিমেশন",
    path: "/services/police-intimation",
    description: "পুলিশ স্টেশনে নোটিফিকেশন দিন"
  },
  {
    icon: <UserCheck className="h-4 w-4 text-red-500" />,
    name: "টেনান্ট ভেরিফিকেশন",
    path: "/services/tenant-verification",
    description: "ভাড়াটিয়া যাচাই করুন"
  },
  {
    icon: <Building className="h-4 w-4 text-red-500" />,
    name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
    path: "/services/property-legal-assistance",
    description: "আইনি সহায়তা পেতে"
  },
  {
    icon: <HomeIcon className="h-4 w-4 text-red-500" />,
    name: "হোম লোন",
    path: "/services/home-loan",
    description: "সহজ শর্তে ঋণ নিন"
  },
  {
    icon: <DollarSign className="h-4 w-4 text-red-500" />,
    name: "হোম ডিপোজিট লোন",
    path: "/services/home-deposit-loan",
    description: "জামানত জমার জন্য ঋণ নিন"
  }
];

// Utilities Menu
export const utilitiesMenuItems = [
  {
    icon: <Calculator className="h-4 w-4 text-red-500" />,
    name: "নো ইয়োর রেন্ট",
    path: "/utilities/know-your-rent",
    description: "উচিত ভাড়া নির্ধারণ করুন"
  },
  {
    icon: <FileText className="h-4 w-4 text-red-500" />,
    name: "ক্রিয়েট রেন্ট রিসিপ্টস",
    path: "/utilities/create-rent-receipts",
    description: "ভাড়ার রশিদ তৈরি করুন"
  },
  {
    icon: <Share2 className="h-4 w-4 text-red-500" />,
    name: "ক্লিক এন্ড আর্ন",
    path: "/utilities/click-and-earn",
    description: "শেয়ার করে আয় করুন"
  }
];

// Help and Support Menu
export const helpAndSupportMenuItems = [
  {
    icon: <HelpIcon className="h-4 w-4 text-red-500" />,
    name: "সাপোর্ট টপিকস",
    path: "/help/support-topics",
    description: "সাধারণ সমস্যার সমাধান"
  },
  {
    icon: <Book className="h-4 w-4 text-red-500" />,
    name: "ব্লগ",
    path: "/help/blog",
    description: "নিয়মিত আপডেট পান"
  },
  {
    icon: <MessageCircle className="h-4 w-4 text-red-500" />,
    name: "ফিডব্যাক",
    path: "/help/feedback",
    description: "আপনার মতামত জানান"
  },
  {
    icon: <Info className="h-4 w-4 text-red-500" />,
    name: "অ্যাবাউট আস",
    path: "/help/about-us",
    description: "আমাদের সম্পর্কে জানুন"
  }
];

// Service Categories
export const serviceCategories = [
  { name: "ডাক্তার", path: "/services/category/medical" },
  { name: "ডেন্টাল", path: "/services/category/dental" },
  { name: "মেন্টাল হেলথ", path: "/services/category/mental-health" },
  { name: "সেলুন", path: "/services/category/salon" },
  { name: "পার্লার", path: "/services/category/parlour" },
  { name: "ল", path: "/services/category/legal" },
  { name: "রিপেয়ার", path: "/services/category/repair" },
  { name: "হোম সার্ভিস", path: "/services/category/home-service" },
  { name: "বিউটি", path: "/services/category/beauty" },
  { name: "কনসালটেন্সি", path: "/services/category/consultancy" }
];
