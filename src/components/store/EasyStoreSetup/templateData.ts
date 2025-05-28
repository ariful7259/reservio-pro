
import { StoreTemplate } from './types';

export const storeTemplates: StoreTemplate[] = [
  {
    id: 'linkinbio',
    name: 'লিংক ইন বায়ো',
    description: 'সোশ্যাল মিডিয়ার জন্য এক পেজে সব লিংক',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&auto=format&fit=crop&q=60',
    category: 'linkinbio',
    type: 'linkinbio',
    features: ['সোশ্যাল লিংক', 'QR কোড', 'ক্লিক ট্র্যাকিং', 'কাস্টম ডিজাইন']
  },
  {
    id: 'fashion',
    name: 'ফ্যাশন স্টোর',
    description: 'কাপড়, জুতা, ব্যাগ ও ফ্যাশন আইটেম',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&auto=format&fit=crop&q=60',
    category: 'fashion',
    type: 'store',
    features: ['সাইজ গাইড', 'কালার ভেরিয়েন্ট', 'ফ্যাশন ক্যাটালগ']
  },
  {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স শপ',
    description: 'মোবাইল, ল্যাপটপ, গ্যাজেট ও ইলেকট্রনিক্স',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&auto=format&fit=crop&q=60',
    category: 'electronics',
    type: 'store',
    features: ['প্রোডাক্ট স্পেসিফিকেশন', 'ওয়ারেন্টি ইনফো', 'কম্পেয়ার ফিচার']
  },
  {
    id: 'food',
    name: 'খাবারের দোকান',
    description: 'রেস্টুরেন্ট, ক্যাফে ও খাবার ডেলিভারি',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=60',
    category: 'food',
    type: 'store',
    features: ['মেনু ক্যাটাগরি', 'অর্ডার ট্র্যাকিং', 'হট ডিল']
  },
  {
    id: 'services',
    name: 'সার্ভিস বিজনেস',
    description: 'পার্লার, রিপেয়ার, কনসালটেন্সি সার্ভিস',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&auto=format&fit=crop&q=60',
    category: 'services',
    type: 'store',
    features: ['অ্যাপয়েন্টমেন্ট বুকিং', 'সার্ভিস প্যাকেজ', 'রিভিউ সিস্টেম']
  },
  {
    id: 'books',
    name: 'বুক স্টোর',
    description: 'বই, নোটবুক, স্টেশনারি আইটেম',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=60',
    category: 'books',
    type: 'store',
    features: ['বুক ক্যাটালগ', 'অথর সার্চ', 'প্রি-অর্ডার']
  }
];
