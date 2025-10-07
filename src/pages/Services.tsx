import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, MapPin, Clock, Users, Share2, Bookmark, Heart, ArrowUpRight, Stethoscope, Scissors, Wrench, Smartphone, UtensilsCrossed, Brush, Hammer, Bug, GraduationCap, Camera, Package, Laptop, PartyPopper, Building, Car, Phone, Video, Home, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import ServiceCategoryFilterForm from '@/components/services/ServiceCategoryFilterForm';
import ServiceCategoryGrid from '@/components/services/ServiceCategoryGrid';

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  const serviceCategories = [{
    id: 'medical',
    name: 'ডাক্তার ও স্বাস্থ্য সেবা',
    nameEn: 'Medical & Health Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🩺'),
    color: 'bg-red-50',
    iconColor: 'text-red-500',
    count: 156,
    subcategories: language === 'bn' ? ['জেনারেল ডাক্তার', 'শিশু চিকিৎসক', 'গাইনী', 'চক্ষু চিকিৎসক', 'মানসিক স্বাস্থ্য'] : ['General Doctor', 'Pediatrician', 'Gynecologist', 'Eye Specialist', 'Mental Health'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ভিডিও কনসালটেশন', 'চেম্বার ভিজিট'] : ['Home Visit', 'Video Consultation', 'Chamber Visit'],
    monetization: language === 'bn' ? '২০-৩০% কমিশন + প্রাইমারি কনসালটেশন চার্জ' : '20-30% commission + Primary consultation charge'
  }, {
    id: 'dental',
    name: 'ডেন্টাল কেয়ার',
    nameEn: 'Dental Care',
    icon: React.createElement('div', { className: 'text-2xl' }, '🦷'),
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
    count: 89,
    subcategories: language === 'bn' ? ['দাঁত ফিলিং', 'ব্রেসিং', 'স্কেলিং ও ক্লিনিং', 'রুট ক্যানাল'] : ['Tooth Filling', 'Bracing', 'Scaling & Cleaning', 'Root Canal'],
    bookingTypes: language === 'bn' ? ['চেম্বার ভিজিট', 'হোম সার্ভিস', 'ভিডিও কনসাল্ট'] : ['Chamber Visit', 'Home Service', 'Video Consult'],
    monetization: language === 'bn' ? '১৫-২০% কমিশন + বুকিং ফি' : '15-20% commission + Booking fee'
  }, {
    id: 'salon',
    name: 'সেলুন ও বিউটি সার্ভিস',
    nameEn: 'Salon & Beauty Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '✂️'),
    color: 'bg-pink-50',
    iconColor: 'text-pink-500',
    count: 234,
    subcategories: language === 'bn' ? ['পুরুষ হেয়ার কাট', 'মহিলা হেয়ার কাট', 'ফেসিয়াল ও স্কিন কেয়ার', 'ওয়েডিং মেকআপ'] : ['Men\'s Haircut', 'Women\'s Haircut', 'Facial & Skin Care', 'Wedding Makeup'],
    bookingTypes: language === 'bn' ? ['হোম সার্ভিস', 'পার্লার ভিজিট'] : ['Home Service', 'Parlor Visit'],
    monetization: language === 'bn' ? '১৫% কমিশন + "Fast Booking" চার্জ' : '15% commission + "Fast Booking" charge'
  }, {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স রিপেয়ার',
    nameEn: 'Electronics Repair',
    icon: React.createElement('div', { className: 'text-2xl' }, '🔧'),
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    count: 178,
    subcategories: language === 'bn' ? ['ফ্রিজ', 'এসি', 'টিভি', 'ওভেন'] : ['Refrigerator', 'AC', 'TV', 'Oven'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ডেলিভারি রিপেয়ার'] : ['Home Visit', 'Delivery Repair'],
    monetization: language === 'bn' ? 'Flat ফিক্সড সার্ভিস চার্জ + পার্টস চার্জ থেকে কমিশন' : 'Flat fixed service charge + Commission from parts charge'
  }, {
    id: 'mobile',
    name: 'মোবাইল ও গ্যাজেট সার্ভিস',
    nameEn: 'Mobile & Gadget Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '📱'),
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
    count: 145,
    subcategories: language === 'bn' ? ['মোবাইল রিপেয়ার', 'ল্যাপটপ সার্ভিস', 'ডিসপ্লে রিপ্লেস', 'সফটওয়্যার ইনস্টল'] : ['Mobile Repair', 'Laptop Service', 'Display Replace', 'Software Install'],
    bookingTypes: language === 'bn' ? ['পিক-আপ সার্ভিস', 'হোম সার্ভিস', 'ভিডিও ডায়াগনসিস'] : ['Pick-up Service', 'Home Service', 'Video Diagnosis'],
    monetization: language === 'bn' ? 'প্যাকেজ অফার + রিপেয়ার কমিশন' : 'Package offer + Repair commission'
  }, {
    id: 'cooking',
    name: 'খাবার ও কুকিং সার্ভিস',
    nameEn: 'Food & Cooking Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🍳'),
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    count: 67,
    subcategories: language === 'bn' ? ['হোম কুক', 'ক্যাটারিং', 'রান্নার সহকারী', 'হেলদি ফুড প্রিপারেশন'] : ['Home Cook', 'Catering', 'Cooking Assistant', 'Healthy Food Preparation'],
    bookingTypes: language === 'bn' ? ['সাপ্তাহিক সাবস্ক্রিপশন', 'নির্দিষ্ট তারিখে বুকিং'] : ['Weekly Subscription', 'Specific Date Booking'],
    monetization: language === 'bn' ? 'সাবস্ক্রিপশন মডেল + % কমিশন' : 'Subscription model + % commission'
  }, {
    id: 'cleaning',
    name: 'হাউজ ক্লিনিং সার্ভিস',
    nameEn: 'House Cleaning Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🧹'),
    color: 'bg-green-50',
    iconColor: 'text-green-500',
    count: 198,
    subcategories: language === 'bn' ? ['ঘর ঝাড়ু ও মপিং', 'বাথরুম ক্লিন', 'সোফা/কার্পেট ওয়াশ', 'অফিস ক্লিনিং'] : ['Room Sweeping & Mopping', 'Bathroom Clean', 'Sofa/Carpet Wash', 'Office Cleaning'],
    bookingTypes: language === 'bn' ? ['One-Time', 'Weekly/Monthly Plan'] : ['One-Time', 'Weekly/Monthly Plan'],  
    monetization: language === 'bn' ? 'প্যাকেজ চার্জ + টাইম বেইজড চার্জ' : 'Package charge + Time based charge'
  }, {
    id: 'furniture',
    name: 'ফার্নিচার মেকিং/রিপেয়ার',
    nameEn: 'Furniture Making/Repair',
    icon: React.createElement('div', { className: 'text-2xl' }, '🔨'),
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    count: 76,
    subcategories: language === 'bn' ? ['কাঠের বিছানা তৈরি', 'সোফা ফোম চেঞ্জ', 'কাঠ মেরামত', 'ইন্টেরিয়র কাঠ কাজ'] : ['Wooden Bed Making', 'Sofa Foam Change', 'Wood Repair', 'Interior Wood Work'],
    bookingTypes: language === 'bn' ? ['কাস্টম কোট', 'ভিডিও কল কনসাল্ট'] : ['Custom Quote', 'Video Call Consult'],
    monetization: language === 'bn' ? 'কাস্টম বিলিং + % কমিশন' : 'Custom billing + % commission'
  }, {
    id: 'education',
    name: 'শিক্ষা ও টিউটরিং',
    nameEn: 'Education & Tutoring',
    icon: React.createElement('div', { className: 'text-2xl' }, '📚'),
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    count: 142,
    subcategories: language === 'bn' ? ['হোম টিউটর', 'অনলাইন ক্লাস', 'ভাষা শিক্ষা', 'স্কিল ডেভেলপমেন্ট'] : ['Home Tutor', 'Online Classes', 'Language Learning', 'Skill Development'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'অনলাইন সেশন', 'গ্রুপ ক্লাস'] : ['Home Visit', 'Online Session', 'Group Class'],
    monetization: language === 'bn' ? 'ঘণ্টা প্রতি চার্জ + % কমিশন' : 'Hourly charge + % commission'
  }, {
    id: 'photography',
    name: 'ফটোগ্রাফি ও ভিডিওগ্রাফি',
    nameEn: 'Photography & Videography',
    icon: React.createElement('div', { className: 'text-2xl' }, '📸'),
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
    count: 98,
    subcategories: language === 'bn' ? ['ওয়েডিং ফটো', 'ইভেন্ট কভারেজ', 'প্রোডাক্ট ফটো', 'পোর্ট্রেইট'] : ['Wedding Photo', 'Event Coverage', 'Product Photo', 'Portrait'],
    bookingTypes: language === 'bn' ? ['প্যাকেজ বুকিং', 'ঘণ্টা ভিত্তিক', 'কাস্টম প্রজেক্ট'] : ['Package Booking', 'Hourly Basis', 'Custom Project'],
    monetization: language === 'bn' ? 'প্যাকেজ রেট + ট্রাভেল চার্জ' : 'Package rate + Travel charge'
  }, {
    id: 'event',
    name: 'ইভেন্ট প্ল্যানিং',
    nameEn: 'Event Planning',
    icon: React.createElement('div', { className: 'text-2xl' }, '🎉'),
    color: 'bg-fuchsia-50',
    iconColor: 'text-fuchsia-500',
    count: 67,
    subcategories: language === 'bn' ? ['বিয়ে অনুষ্ঠান', 'জন্মদিন পার্টি', 'কর্পোরেট ইভেন্ট', 'সাংস্কৃতিক অনুষ্ঠান'] : ['Wedding Planning', 'Birthday Party', 'Corporate Event', 'Cultural Program'],
    bookingTypes: language === 'bn' ? ['ফুল প্যাকেজ', 'আংশিক সেবা', 'কনসালটেশন অনলি'] : ['Full Package', 'Partial Service', 'Consultation Only'],
    monetization: language === 'bn' ? 'প্রজেক্ট বেসড + ভেন্ডর কমিশন' : 'Project based + Vendor commission'
  }, {
    id: 'pest_control',
    name: 'পেস্ট কন্ট্রোল',
    nameEn: 'Pest Control',
    icon: React.createElement('div', { className: 'text-2xl' }, '🐛'),
    color: 'bg-lime-50',
    iconColor: 'text-lime-600',
    count: 54,
    subcategories: language === 'bn' ? ['মশা নিধন', 'তেলাপোকা দমন', 'ইঁদুর নিয়ন্ত্রণ', 'জেনারেল স্প্রে'] : ['Mosquito Control', 'Cockroach Control', 'Rat Control', 'General Spray'],
    bookingTypes: language === 'bn' ? ['ওয়ান টাইম সার্ভিস', 'মাসিক চুক্তি', 'ইমার্জেন্সি কল'] : ['One Time Service', 'Monthly Contract', 'Emergency Call'],
    monetization: language === 'bn' ? 'সার্ভিস চার্জ + কেমিক্যাল কস্ট' : 'Service charge + Chemical cost'
  }, {
    id: 'plumbing',
    name: 'প্লাম্বিং সার্ভিস',
    nameEn: 'Plumbing Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🔧'),
    color: 'bg-sky-50',
    iconColor: 'text-sky-500',
    count: 123,
    subcategories: language === 'bn' ? ['পাইপ লিকেজ', 'বাথরুম ফিটিং', 'ড্রেন ক্লিনিং', 'ওয়াটার হিটার'] : ['Pipe Leakage', 'Bathroom Fitting', 'Drain Cleaning', 'Water Heater'],
    bookingTypes: language === 'bn' ? ['ইমার্জেন্সি কল', 'স্ল্যাট টাইম', 'প্রজেক্ট বেসড'] : ['Emergency Call', 'Slot Time', 'Project Based'],
    monetization: language === 'bn' ? 'কল আউট চার্জ + লেবার + পার্টস' : 'Call out charge + Labor + Parts'
  }, {
    id: 'security',
    name: 'সিকিউরিটি সার্ভিস',
    nameEn: 'Security Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🛡️'),
    color: 'bg-slate-50',
    iconColor: 'text-slate-600',
    count: 89,
    subcategories: language === 'bn' ? ['হোম সিকিউরিটি', 'ইভেন্ট সিকিউরিটি', 'CCTV ইনস্টলেশন', 'পার্সোনাল গার্ড'] : ['Home Security', 'Event Security', 'CCTV Installation', 'Personal Guard'],
    bookingTypes: language === 'bn' ? ['দৈনিক ভিত্তিতে', 'মাসিক চুক্তি', 'ইভেন্ট বেসড'] : ['Daily Basis', 'Monthly Contract', 'Event Based'],
    monetization: language === 'bn' ? 'ঘণ্টা প্রতি রেট + সুপারভিশন চার্জ' : 'Hourly rate + Supervision charge'
  }, {
    id: 'transport',
    name: 'ট্রান্সপোর্ট সার্ভিস',
    nameEn: 'Transport Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🚗'),
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    count: 156,
    subcategories: language === 'bn' ? ['প্রাইভেট কার', 'ট্রাক রেন্টাল', 'পিকআপ ভ্যান', 'লং ট্রিপ'] : ['Private Car', 'Truck Rental', 'Pickup Van', 'Long Trip'],
    bookingTypes: language === 'bn' ? ['ঘণ্টা ভিত্তিক', 'দিন ভিত্তিক', 'কিলোমিটার ভিত্তিক'] : ['Hourly Basis', 'Daily Basis', 'Per Kilometer'],
    monetization: language === 'bn' ? 'ট্রিপ চার্জ + ফুয়েল + ড্রাইভার চার্জ' : 'Trip charge + Fuel + Driver charge'
  }, {
    id: 'pet_care',
    name: 'পেট কেয়ার',
    nameEn: 'Pet Care',
    icon: React.createElement('div', { className: 'text-2xl' }, '🐕'),
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    count: 43,
    subcategories: language === 'bn' ? ['পেট গ্রুমিং', 'ভেট কনসালটেশন', 'পেট সিটিং', 'ট্রেনিং'] : ['Pet Grooming', 'Vet Consultation', 'Pet Sitting', 'Training'],
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ক্লিনিক ভিজিট', 'অনলাইন কনসালট'] : ['Home Visit', 'Clinic Visit', 'Online Consult'],
    monetization: language === 'bn' ? 'সার্ভিস চার্জ + কেয়ার প্রোডাক্ট' : 'Service charge + Care products'
  }, {
    id: 'tailoring',
    name: 'টেইলরিং সার্ভিস',
    nameEn: 'Tailoring Services',
    icon: React.createElement('div', { className: 'text-2xl' }, '🪡'),
    color: 'bg-violet-50',
    iconColor: 'text-violet-500',
    count: 87,
    subcategories: language === 'bn' ? ['কাস্টম স্যুট', 'পোশাক সিলাই', 'অলটারেশন', 'ড্রেস ডিজাইন'] : ['Custom Suit', 'Clothing Stitching', 'Alteration', 'Dress Design'],
    bookingTypes: language === 'bn' ? ['মেজারমেন্ট হোম', 'শপ ভিজিট', 'ডেলিভারি সার্ভিস'] : ['Measurement Home', 'Shop Visit', 'Delivery Service'],
    monetization: language === 'bn' ? 'পিস রেট + ম্যাটেরিয়াল চার্জ' : 'Piece rate + Material charge'
  }];

  const allServices = [{
    id: 1,
    title: language === 'bn' ? 'হোম ভিজিট ডাক্তার' : 'Home Visit Doctor',
    provider: language === 'bn' ? 'ডা. আহমেদ হাসান' : 'Dr. Ahmed Hasan',
    category: 'medical',
    subcategory: language === 'bn' ? 'জেনারেল ডাক্তার' : 'General Doctor',
    location: language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka',
    price: '৳১,৫০০',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['হোম ভিজিট', 'ভিডিও কনসালটেশন'] : ['Home Visit', 'Video Consultation'],
    responseTime: language === 'bn' ? '৩০ মিনিট' : '30 minutes'
  }, {
    id: 2,
    title: language === 'bn' ? 'ডেন্টাল চেকআপ' : 'Dental Checkup',
    provider: language === 'bn' ? 'ডা. ফারহানা আক্তার' : 'Dr. Farhana Akter',
    category: 'dental',
    subcategory: language === 'bn' ? 'দাঁত ফিলিং' : 'Tooth Filling',
    location: language === 'bn' ? 'বনানী, ঢাকা' : 'Banani, Dhaka',
    price: '৳১,২০০',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['চেম্বার ভিজিট', 'হোম সার্ভিস'] : ['Chamber Visit', 'Home Service'],
    responseTime: language === 'bn' ? '১ ঘণ্টা' : '1 hour' 
  }, {
    id: 3,
    title: language === 'bn' ? 'প্রিমিয়াম হেয়ার কাট' : 'Premium Hair Cut',
    provider: language === 'bn' ? 'স্টাইল সেলুন' : 'Style Salon',
    category: 'salon',
    subcategory: language === 'bn' ? 'পুরুষ হেয়ার কাট' : 'Men\'s Hair Cut',
    location: language === 'bn' ? 'ধানমন্ডি, ঢাকা' : 'Dhanmondi, Dhaka',
    price: '৳৮০০',
    rating: 4.5,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: false,
    bookingTypes: language === 'bn' ? ['হোম সার্ভিস', 'পার্লার ভিজিট'] : ['Home Service', 'Parlor Visit'],
    responseTime: language === 'bn' ? '৪৫ মিনিট' : '45 minutes'
  }, {
    id: 4,
    title: language === 'bn' ? 'এসি সার্ভিসিং' : 'AC Servicing',
    provider: language === 'bn' ? 'কুল টেক সার্ভিস' : 'Cool Tech Service',
    category: 'electronics',
    subcategory: language === 'bn' ? 'এসি' : 'AC',
    location: language === 'bn' ? 'মোহাম্মদপুর, ঢাকা' : 'Mohammadpur, Dhaka',
    price: '৳১,৮০০',
    rating: 4.6,
    reviews: 154,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['হোম ভিজিট'] : ['Home Visit'],
    responseTime: language === 'bn' ? '২ ঘণ্টা' : '2 hours'
  }, {
    id: 5,
    title: language === 'bn' ? 'মোবাইল স্ক্রিন রিপেয়ার' : 'Mobile Screen Repair',
    provider: language === 'bn' ? 'টেক ফিক্স' : 'Tech Fix',
    category: 'mobile',
    subcategory: language === 'bn' ? 'মোবাইল রিপেয়ার' : 'Mobile Repair',
    location: language === 'bn' ? 'উত্তরা, ঢাকা' : 'Uttara, Dhaka',
    price: '৳২,৫০০',
    rating: 4.4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['পিক-আপ সার্ভিস', 'হোম সার্ভিস'] : ['Pick-up Service', 'Home Service'],
    responseTime: language === 'bn' ? '১ দিন' : '1 day'
  }, {
    id: 6,
    title: language === 'bn' ? 'হোম ক্লিনিং সার্ভিস' : 'Home Cleaning Service',
    provider: language === 'bn' ? 'ক্লিন হোম' : 'Clean Home',
    category: 'cleaning',
    subcategory: language === 'bn' ? 'ঘর ঝাড়ু ও মপিং' : 'Room Sweeping & Mopping',
    location: language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka',
    price: '৳১,২০০',
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    isVerified: true,
    bookingTypes: language === 'bn' ? ['One-Time', 'Weekly Plan'] : ['One-Time', 'Weekly Plan'],
    responseTime: language === 'bn' ? '৩ ঘণ্টা' : '3 hours'
  }];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || service.subcategory === selectedSubcategory;
    const matchesLocation = selectedLocation === 'all' || service.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesLocation;
  });

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: language === 'bn' ? "সংরক্ষিত হয়েছে" : "Bookmarked",
      description: language === 'bn' ? "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে" : "Service added to your favorites list"
    });
  };

  const handleShare = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: language === 'bn' ? "শেয়ার করুন" : "Share",
      description: language === 'bn' ? "সার্ভিসটি শেয়ার করার লিংক কপি করা হয়েছে" : "Service share link copied"
    });
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleBookService = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    navigate(`/services/${serviceId}/book`);
  };

  // Featured services data
  const featuredServices = allServices.slice(0, 4);

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t('services')}</h1>
        <p className="text-muted-foreground">
          {language === 'bn' ? 'আপনার প্রয়োজনীয় সেবা খুঁজে নিন' : 'Find the services you need'}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder={language === 'bn' ? 'সেবা খুঁজুন...' : 'Search services...'} 
            className="pl-10" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Featured Services Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">{language === 'bn' ? 'ফিচার্ড সার্ভিস' : 'Featured Services'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredServices.map(service => (
            <Card key={service.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleServiceClick(service.id)}>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-2 left-2">{language === 'bn' ? service.category : service.subcategory}</Badge>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleBookmark(e, service.id)}>
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  {service.isVerified && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="text-xs bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{service.location}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{service.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.reviews})</span>
                  </div>
                  <p className="text-sm font-bold text-primary">{service.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Service Categories - Grid Layout with Collapsible */}
      <ServiceCategoryGrid
        serviceCategories={serviceCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        searchTerm={categorySearchTerm}
        setSearchTerm={setCategorySearchTerm}
      />

      {/* Service Listings Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {language === 'bn' ? 'উপযুক্ত সেবা সমূহ' : 'Available Services'}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredServices.length} {language === 'bn' ? 'সেবা পাওয়া গেছে' : 'services found'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <Card 
              key={service.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative aspect-video">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.isVerified && (
                  <Badge className="absolute top-2 left-2 bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/90 h-8 w-8 rounded-full hover:bg-white"
                    onClick={(e) => handleBookmark(e, service.id)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/90 h-8 w-8 rounded-full hover:bg-white"
                    onClick={(e) => handleShare(e, service.id)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base line-clamp-1">{service.title}</h3>
                  <div className="flex items-center ml-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{service.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({service.reviews})</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{service.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{language === 'bn' ? 'রেসপন্স টাইম: ' : 'Response: '}{service.responseTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {service.bookingTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">{service.price}</p>
                  <Button 
                    size="sm"
                    onClick={(e) => handleBookService(e, service.id)}
                    className="hover:scale-105 transition-transform"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {language === 'bn' ? 'বুক করুন' : 'Book Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                {language === 'bn' ? 'কোনো সেবা পাওয়া যায়নি' : 'No services found'}
              </p>
              <p className="text-sm">
                {language === 'bn' ? 'অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন' : 'Try adjusting your search criteria'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-8">
        <Button className="px-8">
          {language === 'bn' ? 'আরো সেবা দেখুন' : 'Show More Services'}
        </Button>
      </div>
    </div>
  );
};

export default Services;
