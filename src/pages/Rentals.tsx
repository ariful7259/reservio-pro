import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryGrid from '@/components/rentals/CategoryGrid';
import RentalCard from '@/components/rentals/RentalCard';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/components/ui/use-toast';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Clock, 
  Shield, 
  Users,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';

// Sample rental data
const rentCategories = [
  { 
    id: 1, 
    name: "বাসা বাড়ি", 
    icon: "🏠", 
    count: 120,
    description: "আবাসিক সম্পত্তি ভাড়া",
    trending: true,
    averagePrice: "৳২০,০০০-৮০,০০০/মাস",
    features: ["ফার্নিশড", "আনফার্নিশড", "ব্যাচেলর", "ফ্যামিলি"],
    popularAreas: ["গুলশান", "ধানমন্ডি", "বনানী", "উত্তরা"]
  },
  { 
    id: 2, 
    name: "ইলেকট্রনিক্স", 
    icon: "💻", 
    count: 85,
    description: "ইলেকট্রনিক পণ্য ভাড়া",
    trending: false,
    averagePrice: "৳৫০০-৩,০০০/দিন",
    features: ["ক্যামেরা", "ল্যাপটপ", "প্রজেক্টর", "সাউন্ড সিস্টেম"],
    popularAreas: ["ধানমন্ডি", "নিউমার্কেট", "বনানী", "মিরপুর"]
  },
  { 
    id: 3, 
    name: "পরিবহন", 
    icon: "🚗", 
    count: 95,
    description: "গাড়ি ও পরিবহন ভাড়া",
    trending: true,
    averagePrice: "৳২,০০০-১০,০০০/দিন",
    features: ["প্রাইভেট কার", "মাইক্রোবাস", "ট্রাক", "মোটরসাইকেল"],
    popularAreas: ["সাভার", "মিরপুর", "উত্তরা", "বাড্ডা"]
  },
  { 
    id: 4, 
    name: "ইভেন্ট সামগ্রী", 
    icon: "🎪", 
    count: 45,
    description: "অনুষ্ঠানের জিনিসপত্র",
    trending: false,
    averagePrice: "৳৫০০-৫,০০০/দিন",
    features: ["চেয়ার টেবিল", "সাউন্ড", "লাইটিং", "ডেকোরেশন"],
    popularAreas: ["গুলশান", "ধানমন্ডি", "উত্তরা", "বনানী"]
  },
  { 
    id: 5, 
    name: "ঘরোয়া সামগ্রী", 
    icon: "🛏️", 
    count: 78,
    description: "ঘরের আসবাবপত্র",
    trending: false,
    averagePrice: "৳১,০০০-৮,০০০/মাস",
    features: ["ফ্রিজ", "ওয়াশিং মেশিন", "বিছানা", "সোফা"],
    popularAreas: ["মিরপুর", "উত্তরা", "বাড্ডা", "ধানমন্ডি"]
  },
  { 
    id: 6, 
    name: "শিক্ষা সামগ্রী", 
    icon: "📚", 
    count: 32,
    description: "শিক্ষা উপকরণ",
    trending: false,
    averagePrice: "৳৩০০-২,০০০/দিন",
    features: ["প্রজেক্টর", "হোয়াইটবোর্ড", "বই", "কম্পিউটার"],
    popularAreas: ["পান্থপথ", "বনানী", "ধানমন্ডি", "উত্তরা"]
  },
  { 
    id: 7, 
    name: "কৃষি যন্ত্রপাতি", 
    icon: "🚜", 
    count: 28,
    description: "কৃষি কাজের যন্ত্র",
    trending: true,
    averagePrice: "৮০০-৩,০০০/দিন",
    features: ["পাওয়ার টিলার", "স্প্রে মেশিন", "হারভেস্টার", "পাম্প"],
    popularAreas: ["সাভার", "গাজীপুর", "নারায়ণগঞ্জ", "মানিকগঞ্জ"]
  },
  { 
    id: 8, 
    name: "ব্যবসায়িক সামগ্রী", 
    icon: "💼", 
    count: 56,
    description: "ব্যবসার জন্য সরঞ্জাম",
    trending: false,
    averagePrice: "৳১,০০০-৮,০০০/মাস",
    features: ["POS মেশিন", "CCTV", "ক্যাশ রেজিস্টার", "অফিস সরঞ্জাম"],
    popularAreas: ["নিউমার্কেট", "গুলশান", "মতিঝিল", "ধানমন্ডি"]
  },
  { 
    id: 9, 
    name: "কারিগরি টুলস", 
    icon: "🔧", 
    count: 42,
    description: "নির্মাণ ও মেরামতের টুলস",
    trending: false,
    averagePrice: "৩০০-২,০০০/দিন",
    features: ["ড্রিল মেশিন", "কাটিং টুলস", "ওয়েল্ডিং", "মাপার যন্ত্র"],
    popularAreas: ["মিরপুর", "তেজগাঁও", "শ্যামপুর", "কামরাঙ্গীরচর"]
  },
  { 
    id: 10, 
    name: "কমার্শিয়াল স্পেস", 
    icon: "🏪", 
    count: 18,
    description: "ব্যবসায়িক জায়গা",
    trending: true,
    averagePrice: "৳২০,০০০-১,৫০,০০০/মাস",
    features: ["অফিস স্পেস", "দোকান", "গুদাম", "শোরুম"],
    popularAreas: ["বনানী", "নিউমার্কেট", "গুলশান", "মতিঝিল"]
  },
  { 
    id: 11, 
    name: "গেস্ট হাউস", 
    icon: "🏨", 
    count: 34,
    description: "অস্থায়ী বাসস্থান",
    trending: false,
    averagePrice: "৳১,০০০-৫,০০০/রাত",
    features: ["শর্ট স্টে", "গেস্ট রুম", "সার্ভিস অ্যাপার্টমেন্ট", "হোস্টেল"],
    popularAreas: ["ধানমন্ডি", "উত্তরা", "গুলশান", "বনানী"]
  },
  { 
    id: 12, 
    name: "গ্রামীণ বাসস্থান", 
    icon: "🏡", 
    count: 15,
    description: "গ্রামের পরিবেশে থাকার জায়গা",
    trending: false,
    averagePrice: "৫০০-২,০০০/রাত",
    features: ["পুকুরপাড়ের বাড়ি", "টিনের ঘর", "মাটির ঘর", "বাগান বাড়ি"],
    popularAreas: ["নারায়ণগঞ্জ", "মানিকগঞ্জ", "গাজীপুর", "টাঙ্গাইল"]
  },
  { 
    id: 13, 
    name: "স্টুডিও", 
    icon: "🎬", 
    count: 22,
    description: "ভিডিও ও ফটো স্টুডিও",
    trending: true,
    averagePrice: "৳১,০০০-৫,০০০/ঘন্টা",
    features: ["ভিডিও স্টুডিও", "ফটো স্টুডিও", "কুকিং স্টুডিও", "মিউজিক স্টুডিও"],
    popularAreas: ["ধানমন্ডি", "বনানী", "গুলশান", "উত্তরা"]
  }
];

// Sample rental data
const rentListings = [
  // বাসা বাড়ি listings
  {
    id: "1",
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    provider: "কামাল হোসেন",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    subcategory: "বাসা বাড়ি",
    rating: 4.8,
    reviews: 34
  },
  {
    id: "14",
    title: "২ বেডরুম ফ্ল্যাট",
    provider: "রহিমা খাতুন",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳২০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    subcategory: "বাসা বাড়ি",
    rating: 4.5,
    reviews: 28
  },
  {
    id: "15",
    title: "১ বেডরুম স্টুডিও",
    provider: "মাহমুদ আলী",
    location: "বনানী, ঢাকা",
    price: "৳১৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    subcategory: "বাসা বাড়ি",
    rating: 4.2,
    reviews: 19
  },
  {
    id: "16",
    title: "ফ্যামিলি মেস সিট",
    provider: "নাদিয়া বেগম",
    location: "মিরপুর, ঢাকা",
    price: "৳৮,০০০/মাস",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop",
    category: "mess",
    subcategory: "বাসা বাড়ি",
    rating: 4.3,
    reviews: 45
  },

  // ইলেকট্রনিক্স listings
  {
    id: "4",
    title: "ডিএসএলআর ক্যামেরা",
    provider: "তানভীর আহমেদ",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "camera",
    subcategory: "ইলেকট্রনিক্স",
    rating: 4.7,
    reviews: 42
  },
  {
    id: "17",
    title: "ল্যাপটপ ভাড়া",
    provider: "সাকিব হাসান",
    location: "উত্তরা, ঢাকা",
    price: "৳৮০০/দিন",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    category: "laptop",
    subcategory: "ইলেকট্রনিক্স",
    rating: 4.6,
    reviews: 33
  },
  {
    id: "18",
    title: "প্রিন্টার ভাড়া",
    provider: "রফিক উল্লাহ",
    location: "মতিঝিল, ঢাকা",
    price: "৳৫০০/দিন",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=1000&auto=format&fit=crop",
    category: "printer",
    subcategory: "ইলেকট্রনিক্স",
    rating: 4.4,
    reviews: 22
  },

  // পরিবহন listings
  {
    id: "3",
    title: "টয়োটা কোরোলা",
    provider: "সাইফুল ইসলাম",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
    category: "car",
    subcategory: "পরিবহন",
    rating: 4.9,
    reviews: 56
  },
  {
    id: "8",
    title: "মিনি ট্রাক ভাড়া",
    provider: "আবুল কালাম",
    location: "সাভার, ঢাকা",
    price: "৳২,৫০০/দিন",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop",
    category: "truck",
    subcategory: "পরিবহন",
    rating: 4.8,
    reviews: 45
  },
  {
    id: "19",
    title: "মোটরসাইকেল ভাড়া",
    provider: "জাহিদ হাসান",
    location: "বাড্ডা, ঢাকা",
    price: "৳১,২০০/দিন",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
    category: "bike",
    subcategory: "পরিবহন",
    rating: 4.5,
    reviews: 31
  },

  // ইভেন্ট সামগ্রী listings
  {
    id: "5",
    title: "ইভেন্ট চেয়ার সেট",
    provider: "হাসান আলী",
    location: "উত্তরা, ঢাকা",
    price: "৳৫০/দিন",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    category: "chair",
    subcategory: "ইভেন্ট সামগ্রী",
    rating: 4.5,
    reviews: 23
  },
  {
    id: "20",
    title: "সাউন্ড সিস্টেম",
    provider: "রিয়াজ আহমেদ",
    location: "গুলশান, ঢাকা",
    price: "৳২,০০০/দিন",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
    category: "sound",
    subcategory: "ইভেন্ট সামগ্রী",
    rating: 4.7,
    reviews: 38
  },
  {
    id: "21",
    title: "লাইটিং সেটআপ",
    provider: "মোস্তাফা করিম",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,৫০০/দিন",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    category: "lighting",
    subcategory: "ইভেন্ট সামগ্রী",
    rating: 4.6,
    reviews: 29
  },

  // ঘরোয়া সামগ্রী listings
  {
    id: "6",
    title: "ফ্রিজ ভাড়া",
    provider: "নাসির উদ্দিন",
    location: "বাড্ডা, ঢাকা",
    price: "৳৩,০০০/মাস",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1000&auto=format&fit=crop",
    category: "fridge",
    subcategory: "ঘরোয়া সামগ্রী",
    rating: 4.3,
    reviews: 18
  },
  {
    id: "22",
    title: "বিছানা সেট",
    provider: "সালমা খাতুন",
    location: "মিরপুর, ঢাকা",
    price: "৳২,০০০/মাস",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    category: "bed",
    subcategory: "ঘরোয়া সামগ্রী",
    rating: 4.4,
    reviews: 25
  },
  {
    id: "23",
    title: "ওয়াশিং মেশিন",
    provider: "করিম মিয়া",
    location: "উত্তরা, ঢাকা",
    price: "৳২,৫০০/মাস",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop",
    category: "washing-machine",
    subcategory: "ঘরোয়া সামগ্রী",
    rating: 4.2,
    reviews: 16
  },

  // শিক্ষা সামগ্রী listings
  {
    id: "7",
    title: "প্রজেক্টর ভাড়া",
    provider: "রাহুল চন্দ্র",
    location: "পান্থপথ, ঢাকা",
    price: "৳৮০০/দিন",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop",
    category: "projector",
    subcategory: "শিক্ষা সামগ্রী",
    rating: 4.6,
    reviews: 31
  },
  {
    id: "24",
    title: "হোয়াইটবোর্ড ভাড়া",
    provider: "ফারুক হোসেন",
    location: "বনানী, ঢাকা",
    price: "৳৩০০/দিন",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    category: "whiteboard",
    subcategory: "শিক্ষা সামগ্রী",
    rating: 4.1,
    reviews: 14
  },

  // কৃষি যন্ত্রপাতি listings
  {
    id: "25",
    title: "পাওয়ার টিলার",
    provider: "আলম মিয়া",
    location: "সাভার, ঢাকা",
    price: "৳১,৮০০/দিন",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1000&auto=format&fit=crop",
    category: "tiller",
    subcategory: "কৃষি যন্ত্রপাতি",
    rating: 4.5,
    reviews: 27
  },
  {
    id: "26",
    title: "স্প্রে মেশিন",
    provider: "রশিদ কৃষক",
    location: "গাজীপুর, ঢাকা",
    price: "৳৮০০/দিন",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1000&auto=format&fit=crop",
    category: "spray",
    subcategory: "কৃষি যন্ত্রপাতি",
    rating: 4.3,
    reviews: 18
  },

  // ব্যবসায়িক সামগ্রী listings
  {
    id: "27",
    title: "POS মেশিন ভাড়া",
    provider: "সাদিক ব্যবসায়ী",
    location: "নিউমার্কেট, ঢাকা",
    price: "৳১,২০০/মাস",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    category: "pos",
    subcategory: "ব্যবসায়িক সামগ্রী",
    rating: 4.4,
    reviews: 32
  },
  {
    id: "28",
    title: "সিসিটিভি সিস্টেম",
    provider: "টেক সিকিউরিটি",
    location: "গুলশান, ঢাকা",
    price: "৳২,৫০০/মাস",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
    category: "cctv",
    subcategory: "ব্যবসায়িক সামগ্রী",
    rating: 4.7,
    reviews: 41
  },

  // কারিগরি টুলস listings
  {
    id: "29",
    title: "ড্রিল মেশিন",
    provider: "কারিগর সাহেব",
    location: "মিরপুর, ঢাকা",
    price: "৳৪০০/দিন",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop",
    category: "drill",
    subcategory: "কারিগরি টুলস",
    rating: 4.2,
    reviews: 23
  },
  {
    id: "30",
    title: "কাটিং টুলস সেট",
    provider: "মিস্ত্রি ভাই",
    location: "তেজগাঁও, ঢাকা",
    price: "৳৬০০/দিন",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1000&auto=format&fit=crop",
    category: "cutting",
    subcategory: "কারিগরি টুলস",
    rating: 4.3,
    reviews: 19
  },

  // কমার্শিয়াল স্পেস listings
  {
    id: "2",
    title: "অফিস স্পেস",
    provider: "রশিদ আহমেদ",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
    category: "office",
    subcategory: "কমার্শিয়াল স্পেস",
    rating: 4.6,
    reviews: 27
  },
  {
    id: "31",
    title: "দোকান ভাড়া",
    provider: "হক সাহেব",
    location: "নিউমার্কেট, ঢাকা",
    price: "৳৩০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    category: "shop",
    subcategory: "কমার্শিয়াল স্পেস",
    rating: 4.1,
    reviews: 15
  },

  // গেস্ট হাউস listings
  {
    id: "32",
    title: "শর্ট স্টে অ্যাপার্টমেন্ট",
    provider: "হোস্টেল ম্যানেজার",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳২,০০০/রাত",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    category: "short-stay",
    subcategory: "গেস্ট হাউস",
    rating: 4.4,
    reviews: 52
  },
  {
    id: "33",
    title: "গেস্ট রুম",
    provider: "মেহমান খানা",
    location: "উত্তরা, ঢাকা",
    price: "৳১,৫০০/রাত",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop",
    category: "guest-room",
    subcategory: "গেস্ট হাউস",
    rating: 4.0,
    reviews: 21
  },

  // গ্রামীণ বাসস্থান listings
  {
    id: "34",
    title: "পুকুরপাড়ের বাড়ি",
    provider: "গ্রাম্য হোস্ট",
    location: "নারায়ণগঞ্জ",
    price: "৳৮০০/রাত",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop",
    category: "rural-house",
    subcategory: "গ্রামীণ বাসস্থান",
    rating: 4.6,
    reviews: 35
  },
  {
    id: "35",
    title: "টিনের ঘর ভাড়া",
    provider: "গ্রামীণ সেবা",
    location: "মানিকগঞ্জ",
    price: "৳৫০০/রাত",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop",
    category: "tin-house",
    subcategory: "গ্রামীণ বাসস্থান",
    rating: 3.9,
    reviews: 12
  },

  // স্টুডিও listings
  {
    id: "36",
    title: "ভিডিও স্টুডিও",
    provider: "ক্রিয়েটিভ স্টুডিও",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,৮০০/ঘন্টা",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    category: "video-studio",
    subcategory: "স্টুডিও",
    rating: 4.7,
    reviews: 48
  },
  {
    id: "37",
    title: "ফটো স্টুডিও",
    provider: "ফটো আর্ট",
    location: "বনানী, ঢাকা",
    price: "৳১,২০০/ঘন্টা",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1000&auto=format&fit=crop",
    category: "photo-studio",
    subcategory: "স্টুডিও",
    rating: 4.5,
    reviews: 29
  },
  {
    id: "38",
    title: "কুকিং স্টুডিও",
    provider: "কুক হাউস",
    location: "গুলশান, ঢাকা",
    price: "৳২,৫০০/ঘন্টা",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop",
    category: "cooking-studio",
    subcategory: "স্টুডিও",
    rating: 4.8,
    reviews: 33
  }
];

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental',
    });
    setShowShareModal(true);
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const getListingsByCategory = (categoryName: string) => {
    return rentListings.filter(listing => listing.subcategory === categoryName);
  };

  const renderCategoryItem = (category: any, index: number) => (
    <Card 
      key={category.id} 
      className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20"
      onClick={() => handleCategoryClick(category)}
    >
      <CardContent className="p-4 flex flex-col items-center relative">
        {category.trending && (
          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            ট্রেন্ডিং
          </Badge>
        )}
        
        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        
        <h3 className="font-semibold text-sm mb-2 text-center group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-2 text-center leading-tight">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between w-full mb-2">
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Users className="h-3 w-3" />
            {category.count}
          </Badge>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs ml-1">4.{Math.floor(Math.random() * 4) + 5}</span>
          </div>
        </div>
        
        <div className="text-xs font-medium text-primary mb-2">
          {category.averagePrice}
        </div>
        
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {category.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{category.popularAreas[0]}+</span>
          <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">ভাড়া দিন</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় যেকোনো কিছু ভাড়া নিন</p>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="listings">সকল লিস্টিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="mt-6">
          <CategoryGrid
            rentCategories={rentCategories}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            renderCategoryItem={renderCategoryItem}
          />
          
          {/* Selected Category Detailed View */}
          {selectedCategory && (
            <div className="mt-8">
              {/* Category Header with Enhanced Info */}
              <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{selectedCategory.icon}</div>
                      <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          {selectedCategory.name}
                          {selectedCategory.trending && (
                            <Badge className="bg-orange-500 text-white flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              ট্রেন্ডিং
                            </Badge>
                          )}
                        </h2>
                        <p className="text-muted-foreground">{selectedCategory.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      বন্ধ করুন
                    </Button>
                  </div>
                  
                  {/* Category Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold text-primary">
                        <Users className="h-4 w-4" />
                        {selectedCategory.count}
                      </div>
                      <p className="text-xs text-muted-foreground">মোট লিস্টিং</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold text-green-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        4.{Math.floor(Math.random() * 4) + 5}
                      </div>
                      <p className="text-xs text-muted-foreground">গড় রেটিং</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold text-blue-600">
                        <Clock className="h-4 w-4" />
                        তাৎক্ষণিক
                      </div>
                      <p className="text-xs text-muted-foreground">উপলব্ধতা</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold text-purple-600">
                        <Shield className="h-4 w-4" />
                        নিরাপদ
                      </div>
                      <p className="text-xs text-muted-foreground">যাচাইকৃত</p>
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">দামের পরিসর</h4>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {selectedCategory.averagePrice}
                    </Badge>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">বৈশিষ্ট্যসমূহ</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.features.map((feature: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Popular Areas */}
                  <div>
                    <h4 className="font-medium mb-2">জনপ্রিয় এলাকা</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.popularAreas.map((area: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Filter and Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`${selectedCategory.name} এ খুঁজুন...`}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  ফিল্টার
                </Button>
              </div>
              
              {/* Category Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getListingsByCategory(selectedCategory.name).map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onShare={handleShare}
                  />
                ))}
                {getListingsByCategory(selectedCategory.name).length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="text-4xl mb-4">😔</div>
                    <h3 className="text-lg font-medium mb-2">কোন লিস্টিং পাওয়া যায়নি</h3>
                    <p className="text-muted-foreground">এই ক্যাটাগরিতে এখনও কোন লিস্টিং যোগ করা হয়নি</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Featured Listings Section */}
          {!selectedCategory && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">জনপ্রিয় লিস্টিং</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/rentals?tab=listings')}
                >
                  সব দেখুন
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rentListings.slice(0, 8).map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="listings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rentListings.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                onShare={handleShare}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default Rentals;
