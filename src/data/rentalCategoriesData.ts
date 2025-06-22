
import React from 'react';

export const rentCategories = [
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🏠'),
    name: "বাসা বাড়ি",
    path: "/rental-category/housing",
    count: 892,
    isMainCategory: true,
    subcategories: [
      {
        icon: React.createElement('div', { className: 'text-xl' }, '🏢'),
        name: "অ্যাপার্টমেন্ট/ফ্ল্যাট",
        path: "/rental-category/apartment",
        count: 187
      },
      {
        icon: React.createElement('div', { className: 'text-xl' }, '🏡'),
        name: "বাসা/বাড়ি",
        path: "/rental-category/house",
        count: 156
      },
      {
        icon: React.createElement('div', { className: 'text-xl' }, '🏨'),
        name: "মেস/হোস্টেল",
        path: "/rental-category/hostel",
        count: 83
      },
      {
        icon: React.createElement('div', { className: 'text-xl' }, '🛏️'),
        name: "সিঙ্গেল রুম/শেয়ারড",
        path: "/rental-category/room",
        count: 119
      }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '💻'),
    name: "ইলেকট্রনিক্স",
    path: "/rental-category/electronics",
    count: 324,
    subcategories: [
      { name: "ল্যাপটপ / কম্পিউটার", path: "/rental-category/laptop", count: 45 },
      { name: "প্রজেক্টর / মনিটর", path: "/rental-category/projector", count: 23 },
      { name: "প্রিন্টার / স্ক্যানার", path: "/rental-category/printer", count: 18 },
      { name: "ক্যামেরা / ভিডিও ক্যামেরা", path: "/rental-category/camera", count: 34 },
      { name: "সাউন্ড সিস্টেম / স্পিকার", path: "/rental-category/sound", count: 28 },
      { name: "LED টিভি", path: "/rental-category/tv", count: 42 },
      { name: "গেমিং কনসোল", path: "/rental-category/gaming", count: 15 },
      { name: "পাওয়ার ব্যাঙ্ক / ইউপিএস", path: "/rental-category/power", count: 22 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🚗'),
    name: "পরিবহন",
    path: "/rental-category/transport",
    count: 178,
    subcategories: [
      { name: "প্রাইভেট কার", path: "/rental-category/car", count: 67 },
      { name: "মাইক্রোবাস / নোয়াহ", path: "/rental-category/microbus", count: 23 },
      { name: "মোটরসাইকেল / স্কুটার", path: "/rental-category/bike", count: 45 },
      { name: "ভ্যান / পিকআপ", path: "/rental-category/van", count: 18 },
      { name: "রিকশা / ভ্যানগাড়ি", path: "/rental-category/rickshaw", count: 12 },
      { name: "ট্রাক / মিনি ট্রাক", path: "/rental-category/truck", count: 8 },
      { name: "বাইসাইকেল", path: "/rental-category/bicycle", count: 5 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🎪'),
    name: "ইভেন্ট সামগ্রী",
    path: "/rental-category/event",
    count: 89,
    subcategories: [
      { name: "চেয়ার / টেবিল / সাউন্ড বক্স", path: "/rental-category/furniture", count: 25 },
      { name: "লাইটিং ও সাজসজ্জা", path: "/rental-category/lighting", count: 18 },
      { name: "স্টেজ ও ব্যাকড্রপ", path: "/rental-category/stage", count: 12 },
      { name: "ক্যাটারিং সামগ্রী", path: "/rental-category/catering", count: 15 },
      { name: "ক্যামেরা ও ফটোগ্রাফি সার্ভিস", path: "/rental-category/photography", count: 10 },
      { name: "জেনারেটর", path: "/rental-category/generator", count: 6 },
      { name: "ফ্যান / এসি", path: "/rental-category/cooling", count: 3 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🪑'),
    name: "ঘরোয়া সামগ্রী",
    path: "/rental-category/home",
    count: 145,
    subcategories: [
      { name: "বিছানা / ম্যাট্রেস", path: "/rental-category/bed", count: 35 },
      { name: "ফ্রিজ / রেফ্রিজারেটর", path: "/rental-category/fridge", count: 28 },
      { name: "ওয়াশিং মেশিন", path: "/rental-category/washing", count: 22 },
      { name: "ব্লেন্ডার / কুকার", path: "/rental-category/kitchen", count: 18 },
      { name: "গ্যাস চুলা / সিলিন্ডার", path: "/rental-category/gas", count: 15 },
      { name: "পানির পাম্প", path: "/rental-category/pump", count: 12 },
      { name: "হিটার / ফ্যান / এয়ার কুলার", path: "/rental-category/climate", count: 15 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '📚'),
    name: "শিক্ষা সামগ্রী",
    path: "/rental-category/education",
    count: 65,
    subcategories: [
      { name: "হোয়াইটবোর্ড / প্রজেক্টর", path: "/rental-category/teaching", count: 18 },
      { name: "টিউটরিং কিট", path: "/rental-category/tutoring", count: 12 },
      { name: "কম্পিউটার / ল্যাপটপ", path: "/rental-category/edu-computer", count: 15 },
      { name: "স্টাডি ডেস্ক / চেয়ার", path: "/rental-category/study-furniture", count: 10 },
      { name: "অনলাইন ক্লাস সেটআপ কিট", path: "/rental-category/online-class", count: 10 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🚜'),
    name: "কৃষি যন্ত্রপাতি",
    path: "/rental-category/agriculture",
    count: 42,
    subcategories: [
      { name: "পাওয়ার টিলার", path: "/rental-category/tiller", count: 8 },
      { name: "হারভেস্টার মেশিন", path: "/rental-category/harvester", count: 5 },
      { name: "পানি সেচ পাম্প", path: "/rental-category/irrigation", count: 12 },
      { name: "ট্রলি / খাল খননের সরঞ্জাম", path: "/rental-category/excavation", count: 6 },
      { name: "স্প্রে মেশিন", path: "/rental-category/spray", count: 7 },
      { name: "বীজ বপন মেশিন", path: "/rental-category/seeding", count: 4 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🏪'),
    name: "ব্যবসায়িক সামগ্রী",
    path: "/rental-category/business",
    count: 86,
    subcategories: [
      { name: "POS মেশিন", path: "/rental-category/pos", count: 15 },
      { name: "সিসিটিভি ক্যামেরা", path: "/rental-category/cctv", count: 18 },
      { name: "ডিসপ্লে র‍্যাক / শেলফ", path: "/rental-category/display", count: 22 },
      { name: "কফি মেশিন / ভেন্ডিং মেশিন", path: "/rental-category/vending", count: 8 },
      { name: "টেন্ট / বুথ / এক্সিবিশন কিট", path: "/rental-category/exhibition", count: 12 },
      { name: "লাইটবক্স সাইনবোর্ড", path: "/rental-category/signboard", count: 11 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🔨'),
    name: "কারিগরি টুলস",
    path: "/rental-category/tools",
    count: 96,
    subcategories: [
      { name: "ড্রিল মেশিন", path: "/rental-category/drill", count: 18 },
      { name: "ওয়েল্ডিং মেশিন", path: "/rental-category/welding", count: 12 },
      { name: "কাটার / গ্রাইন্ডার", path: "/rental-category/cutting", count: 15 },
      { name: "স্যান্ডার / প্লেনার", path: "/rental-category/sanding", count: 10 },
      { name: "কাঠ মিস্ত্রির টুল কিট", path: "/rental-category/carpentry", count: 20 },
      { name: "ইলেকট্রিশিয়ান টুলস", path: "/rental-category/electrical", count: 14 },
      { name: "মিস্ত্রি/মেসনের সরঞ্জাম", path: "/rental-category/masonry", count: 7 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '💼'),
    name: "কমার্শিয়াল স্পেস",
    path: "/rental-category/commercial",
    count: 76,
    subcategories: [
      { name: "দোকানের স্পেস", path: "/rental-category/shop-space", count: 25 },
      { name: "ফুড কার্ট বা স্টল", path: "/rental-category/food-cart", count: 18 },
      { name: "শো রুম / ডিসপ্লে এরিয়া", path: "/rental-category/showroom", count: 20 },
      { name: "ট্রেড ফেয়ার বুথ স্পেস", path: "/rental-category/trade-fair", count: 13 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🏨'),
    name: "গেস্ট হাউস/স্বল্পমেয়াদী",
    path: "/rental-category/guesthouse",
    count: 59,
    subcategories: [
      { name: "ফ্যামিলি গেস্ট হাউস", path: "/rental-category/family-guest", count: 20 },
      { name: "ব্যাচেলর থাকার স্পেস", path: "/rental-category/bachelor", count: 15 },
      { name: "অফিস ট্রিপ/ট্রেনিংয়ের জন্য অ্যাপার্টমেন্ট", path: "/rental-category/office-trip", count: 12 },
      { name: "ঘন্টারভিত্তিক বুকিং", path: "/rental-category/hourly", count: 12 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '🏡'),
    name: "গ্রামীণ বাসস্থান",
    path: "/rental-category/rural",
    count: 47,
    subcategories: [
      { name: "কুটির / টিনের ঘর", path: "/rental-category/cottage", count: 15 },
      { name: "বাশের ঘর / মাটির ঘর", path: "/rental-category/bamboo", count: 12 },
      { name: "পুকুর সংলগ্ন ঘর", path: "/rental-category/pond-side", count: 10 },
      { name: "কৃষিজমিতে থাকা", path: "/rental-category/farmland", count: 10 }
    ]
  },
  {
    icon: React.createElement('div', { className: 'text-2xl' }, '📷'),
    name: "স্টুডিও/স্পেশাল স্পেস",
    path: "/rental-category/studio",
    count: 35,
    subcategories: [
      { name: "ভিডিও শুটিং স্টুডিও", path: "/rental-category/video-studio", count: 8 },
      { name: "ইউটিউব/লাইভ স্ট্রিমিং রুম", path: "/rental-category/streaming", count: 10 },
      { name: "ফটোস্টুডিও / ব্যাকড্রপ সহ", path: "/rental-category/photo-studio", count: 7 },
      { name: "রেকর্ডিং স্টুডিও", path: "/rental-category/recording", count: 5 },
      { name: "কুকিং কন্টেন্ট স্টুডিও", path: "/rental-category/cooking-studio", count: 3 },
      { name: "আর্টিস্টিক স্পেস", path: "/rental-category/artistic", count: 2 }
    ]
  }
];
