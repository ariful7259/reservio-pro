
import { 
  Store, 
  Palette, 
  Code, 
  BookOpen, 
  Video, 
  Calendar,
  CreditCard,
  Link,
  Shield,
  Users,
  Bell,
  Settings,
  BarChart3,
  Wallet
} from 'lucide-react';

export const creatorSolutionsData = [
  {
    name: 'অনলাইন স্টোর তৈরি',
    description: 'আপনার পণ্য বিক্রির জন্য সুন্দর অনলাইন স্টোর',
    icon: <Store className="h-4 w-4" />,
    path: '/create-store'
  },
  {
    name: 'ডিজিটাল পেমেন্ট গেটওয়ে',
    description: 'নিরাপদ পেমেন্ট সিস্টেম ও Escrow protection',
    icon: <CreditCard className="h-4 w-4" />,
    path: '/payment-gateway'
  },
  {
    name: 'Creator Payment Gateway',
    description: 'ক্রিয়েটরদের জন্য বিশেষ পেমেন্ট সিস্টেম',
    icon: <Wallet className="h-4 w-4" />,
    path: '/creator-payment-gateway'
  },
  {
    name: 'পেমেন্ট লিংক জেনারেটর',
    description: 'দ্রুত পেমেন্ট লিংক তৈরি করুন',
    icon: <Link className="h-4 w-4" />,
    path: '/payment-gateway?tab=creator-system'
  },
  {
    name: 'Escrow ম্যানেজমেন্ট',
    description: 'নিরাপদ payment escrow সিস্টেম',
    icon: <Shield className="h-4 w-4" />,
    path: '/payment-gateway?tab=escrow'
  },
  {
    name: 'Creator ড্যাশবোর্ড',
    description: 'আপনার আয় ও অর্ডার ট্র্যাক করুন',
    icon: <BarChart3 className="h-4 w-4" />,
    path: '/payment-gateway?tab=creator-dashboard'
  },
  {
    name: 'পেমেন্ট এনালিটিক্স',
    description: 'বিস্তারিত পেমেন্ট রিপোর্ট ও পরিসংখ্যান',
    icon: <BarChart3 className="h-4 w-4" />,
    path: '/payment-gateway?tab=analytics'
  },
  {
    name: 'KYC ভেরিফিকেশন',
    description: 'পরিচয় যাচাইকরণ ও নিরাপত্তা',
    icon: <Users className="h-4 w-4" />,
    path: '/payment-gateway?tab=kyc'
  },
  {
    name: 'ডিজাইন টেমপ্লেট',
    description: 'প্রো ডিজাইন টেমপ্লেট ও কাস্টমাইজেশন',
    icon: <Palette className="h-4 w-4" />,
    path: '/digital-creator/store-templates'
  },
  {
    name: 'API ইন্টিগ্রেশন',
    description: 'পেমেন্ট API ও ওয়েবহুক সেটআপ',
    icon: <Code className="h-4 w-4" />,
    path: '/payment-gateway?tab=api'
  },
  {
    name: 'লিংক ইন বায়ো',
    description: 'সোশ্যাল মিডিয়ার জন্য লিংক পেজ',
    icon: <Link className="h-4 w-4" />,
    path: '/create-linkinbio'
  },
  {
    name: 'অনলাইন কোর্স তৈরি',
    description: 'ইন্টারেক্টিভ অনলাইন কোর্স প্ল্যাটফর্ম',
    icon: <BookOpen className="h-4 w-4" />,
    path: '/digital-products'
  },
  {
    name: 'ভিডিও কন্টেন্ট স্টুডিও',
    description: 'ভিডিও আপলোড ও মনিটাইজেশন',
    icon: <Video className="h-4 w-4" />,
    path: '/digital-products'
  },
  {
    name: 'বুকিং ক্যালেন্ডার',
    description: 'অ্যাপয়েন্টমেন্ট ও কনসালটেশন বুকিং',
    icon: <Calendar className="h-4 w-4" />,
    path: '/payment-gateway?tab=creator-dashboard'
  },
  {
    name: 'নোটিফিকেশন সেন্টার',
    description: 'পেমেন্ট ও অর্ডার নোটিফিকেশন',
    icon: <Bell className="h-4 w-4" />,
    path: '/payment-gateway?tab=notifications'
  },
  {
    name: 'অ্যাডমিন ড্যাশবোর্ড',
    description: 'সম্পূর্ণ সিস্টেম ম্যানেজমেন্ট',
    icon: <Settings className="h-4 w-4" />,
    path: '/payment-gateway?tab=admin'
  }
];
