
import React from 'react';
import { 
  Shirt, 
  Smartphone, 
  Laptop, 
  ChefHat, 
  Headphones, 
  BookOpen, 
  Baby, 
  Car, 
  Home, 
  Dumbbell, 
  Tag, 
  RefreshCw, 
  Store, 
  Package 
} from 'lucide-react';

export interface MarketplaceCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: JSX.Element;
  color: string;
  iconColor: string;
  count: number;
  subcategories: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: 'fashion',
    name: 'ফ্যাশন',
    nameEn: 'Fashion',
    icon: React.createElement('div', { className: 'text-2xl' }, '👕'),
    color: 'bg-pink-50',
    iconColor: 'text-pink-500',
    count: 234,
    subcategories: ['পুরুষদের পোশাক', 'নারীদের পোশাক', 'বাচ্চাদের জামা', 'জুতা, ব্যাগ, এক্সেসরিজ']
  },
  {
    id: 'mobile_gadgets',
    name: 'মোবাইল ও গ্যাজেট',
    nameEn: 'Mobile & Gadgets',
    icon: React.createElement('div', { className: 'text-2xl' }, '📱'),
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    count: 156,
    subcategories: ['স্মার্টফোন', 'ট্যাব', 'মোবাইল কভার', 'চার্জার/হেডফোন']
  },
  {
    id: 'electronics_computer',
    name: 'ইলেকট্রনিক্স ও কম্পিউটার',
    nameEn: 'Electronics & Computer',
    icon: React.createElement('div', { className: 'text-2xl' }, '💻'),
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    count: 98,
    subcategories: ['ল্যাপটপ', 'প্রিন্টার', 'রাউটার', 'মনিটর']
  },
  {
    id: 'kitchen_appliances',
    name: 'কিচেন ও হোম অ্যাপ্লায়েন্স',
    nameEn: 'Kitchen & Home Appliances',
    icon: React.createElement('div', { className: 'text-2xl' }, '🍳'),
    color: 'bg-green-50',
    iconColor: 'text-green-500',
    count: 89,
    subcategories: ['গ্যাস ওভেন', 'ফ্রিজ', 'ব্লেন্ডার', 'হটপট/কুকার']
  },
  {
    id: 'audio_camera',
    name: 'অডিও ও ক্যামেরা',
    nameEn: 'Audio & Camera',
    icon: React.createElement('div', { className: 'text-2xl' }, '🎧'),
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    count: 67,
    subcategories: ['স্পিকার', 'হেডফোন', 'ক্যামেরা', 'ক্যামেরা এক্সেসরিজ']
  },
  {
    id: 'books_education',
    name: 'বই ও এডুকেশনাল আইটেম',
    nameEn: 'Books & Educational Items',
    icon: React.createElement('div', { className: 'text-2xl' }, '📚'),
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    count: 73,
    subcategories: ['স্কুল/কলেজ বই', 'পরীক্ষার প্রস্তুতি বই', 'নোটস', 'Stationery']
  },
  {
    id: 'baby_kids',
    name: 'বাচ্চাদের জিনিস',
    nameEn: 'Baby & Kids',
    icon: React.createElement('div', { className: 'text-2xl' }, '🧸'),
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    count: 54,
    subcategories: ['খেলনা', 'বেবি ডায়াপার', 'বেবি খাবার', 'ওয়াকারের মত গ্যাজেট']
  },
  {
    id: 'car_auto',
    name: 'গাড়ি ও অটো এক্সেসরিজ',
    nameEn: 'Car & Auto Accessories',
    icon: React.createElement('div', { className: 'text-2xl' }, '🚗'),
    color: 'bg-red-50',
    iconColor: 'text-red-500',
    count: 42,
    subcategories: ['বাইক', 'প্রাইভেট কার', 'গাড়ির পার্টস', 'বাইক হেলমেট']
  },
  {
    id: 'home_furniture',
    name: 'ঘরের আসবাব ও ডেকোরেশন',
    nameEn: 'Home Furniture & Decoration',
    icon: React.createElement('div', { className: 'text-2xl' }, '🪑'),
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    count: 76,
    subcategories: ['খাট, টেবিল', 'সোফা', 'আলনা/ক্যাবিনেট', 'ওয়াল পেইন্টিং']
  },
  {
    id: 'sports_fitness',
    name: 'স্পোর্টস ও ফিটনেস',
    nameEn: 'Sports & Fitness',
    icon: React.createElement('div', { className: 'text-2xl' }, '🏋️'),
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    count: 38,
    subcategories: ['জিম এক্সিপমেন্ট', 'ফুটবল/ক্রিকেট', 'স্পোর্টস শু', 'ফিটনেস ব্যান্ড']
  },
  {
    id: 'deals_offer',
    name: 'Deals & Offer',
    nameEn: 'Deals & Offer',
    icon: React.createElement('div', { className: 'text-2xl' }, '🏷️'),
    color: 'bg-gradient-to-br from-red-50 to-orange-50',
    iconColor: 'text-red-500',
    count: 125,
    subcategories: ['Flash Deals', 'Buy 1 Get 1', 'Under ৫০৳', '৫০%+ ডিসকাউন্ট'],
    isHot: true,
    isNew: true
  },
  {
    id: 'used_products',
    name: 'Used Products',
    nameEn: 'Used Products',
    icon: React.createElement('div', { className: 'text-2xl' }, '♻️'),
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    count: 89,
    subcategories: ['পুরাতন ফোন', 'Second-hand ফ্রিজ / টিভি', 'ব্যবহৃত ফার্নিচার', 'ব্যাগ, জামা, বই'],
    isNew: true
  },
  {
    id: 'local_brands',
    name: 'Local Brands',
    nameEn: 'Local Brands',
    icon: React.createElement('div', { className: 'text-2xl' }, '🏪'),
    color: 'bg-violet-50',
    iconColor: 'text-violet-600',
    count: 67,
    subcategories: ['Local Clothing Brands', 'Homemade Products', 'Handicrafts', 'গ্রামীণ পণ্যের ব্র্যান্ড'],
    isNew: true
  },
  {
    id: 'others',
    name: 'অন্যান্য',
    nameEn: 'Others',
    icon: React.createElement('div', { className: 'text-2xl' }, '📦'),
    color: 'bg-gray-50',
    iconColor: 'text-gray-500',
    count: 45,
    subcategories: ['উপহার সামগ্রী', 'Religious Items', 'Hobby Products', 'Unlisted']
  }
];
