
import React from 'react';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, Building, User, 
  DoorOpen, Hotel
} from 'lucide-react';
import { Feature } from './types';

export const allFeatures: Feature[] = [
  { 
    id: 'feature-1', 
    name: 'পেইন্টিং',
    icon: <PaintBucket className="h-6 w-6 text-pink-500" />,
    description: 'বাড়ি/অফিসের পেইন্টিং সেবা',
    category: 'হোম সার্ভিস'
  },
  { 
    id: 'feature-2', 
    name: 'প্যাকিং & মুভিং',
    icon: <Truck className="h-6 w-6 text-blue-500" />,
    description: 'জিনিসপত্র প্যাকেজিং এবং স্থানান্তর সেবা',
    category: 'লজিস্টিকস'
  },
  { 
    id: 'feature-3', 
    name: 'হোম ক্লিনিং',
    icon: <Home className="h-6 w-6 text-green-500" />,
    description: 'বাড়ির সম্পূর্ণ পরিষ্কার পরিচ্ছন্নতা সেবা',
    category: 'ক্লিনিং'
  },
  { 
    id: 'feature-4', 
    name: 'এসি রিপেয়ার',
    icon: <AirVent className="h-6 w-6 text-purple-500" />,
    description: 'এয়ার কন্ডিশনার মেরামত এবং সার্ভিসিং',
    category: 'রিপেয়ার'
  },
  { 
    id: 'feature-5', 
    name: 'কার্পেন্ট্রি',
    icon: <Wrench className="h-6 w-6 text-amber-500" />,
    description: 'আসবাবপত্র নির্মাণ ও মেরামত',
    category: 'নির্মাণ'
  },
  { 
    id: 'feature-6', 
    name: 'ইলেকট্রিশিয়ান',
    icon: <Hammer className="h-6 w-6 text-yellow-500" />,
    description: 'ইলেকট্রিক্যাল ফিটিং এবং মেরামত',
    category: 'রিপেয়ার'
  },
  { 
    id: 'feature-7', 
    name: 'প্লাম্বিং',
    icon: <Pipette className="h-6 w-6 text-teal-500" />,
    description: 'পানির পাইপ এবং সেনিটারি ফিটিং',
    category: 'রিপেয়ার'
  },
  { 
    id: 'feature-8', 
    name: 'হোম রেনোভেশন',
    icon: <HousePlus className="h-6 w-6 text-indigo-500" />,
    description: 'বাড়ির আধুনিকীকরণ এবং পুনর্নির্মাণ',
    category: 'নির্মাণ'
  },
  { 
    id: 'feature-9', 
    name: 'বাসা ভাড়া',
    icon: <Building className="h-6 w-6 text-primary" />,
    description: 'বিভিন্ন এরিয়ায় বাসা ভাড়া সেবা',
    category: 'রিয়েল এস্টেট'
  },
  { 
    id: 'feature-10', 
    name: 'মেস/হোস্টেল',
    icon: <Hotel className="h-6 w-6 text-green-500" />,
    description: 'ছাত্র/চাকুরীজীবী মেস এবং হোস্টেল সেবা',
    category: 'রিয়েল এস্টেট'
  },
  { 
    id: 'feature-11', 
    name: 'সিঙ্গেল রুম',
    icon: <DoorOpen className="h-6 w-6 text-purple-500" />,
    description: 'একক ব্যক্তির জন্য রুম ভাড়া সেবা',
    category: 'রিয়েল এস্টেট'
  },
  { 
    id: 'feature-12', 
    name: 'শেয়ার্ড রুম',
    icon: <User className="h-6 w-6 text-red-500" />,
    description: 'শেয়ারিং ভিত্তিতে রুম ভাড়া সেবা',
    category: 'রিয়েল এস্টেট'
  }
];
