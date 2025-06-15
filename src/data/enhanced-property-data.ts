
export interface EnhancedProperty {
  id: string;
  title: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  address: string;
  location: string;
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  availability: 'available' | 'booked' | 'soon';
  furnishing: 'furnished' | 'semi-furnished' | 'unfurnished';
  amenities: string[];
  description: string;
  contactPhone: string;
  contactWhatsapp: string;
  verified: boolean;
  postedDate: string;
  virtualTour?: string;
}

export const enhancedProperties: EnhancedProperty[] = [
  {
    id: '1',
    title: 'আধুনিক ৩ বেডরুম অ্যাপার্টমেন্ট',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    price: 35000,
    address: 'রোড ১১, ব্লক জি, গুলশান ১',
    location: 'গুলশান',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400'
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    availability: 'available',
    furnishing: 'furnished',
    amenities: ['ওয়াইফাই', 'এসি', 'লিফট', 'পার্কিং', 'জেনারেটর', 'নিরাপত্তা'],
    description: 'গুলশান এলাকায় অবস্থিত অত্যাধুনিক সুবিধা সম্পন্ন অ্যাপার্টমেন্ট। সব ধরনের আধুনিক সুবিধা উপলব্ধ।',
    contactPhone: '01711-123456',
    contactWhatsapp: '01711-123456',
    verified: true,
    postedDate: '2024-01-15',
    virtualTour: 'https://example.com/virtual-tour-1'
  },
  {
    id: '2',
    title: 'ছাত্রদের জন্য আদর্শ মেস',
    type: 'mess',
    bedrooms: 1,
    bathrooms: 1,
    area: 180,
    price: 8500,
    address: 'শাহবাগ রোড, ঢাকা বিশ্ববিদ্যালয় এলাকা',
    location: 'শাহবাগ',
    images: [
      'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=400',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=400'
    ],
    featured: true,
    rating: 4.5,
    reviewCount: 18,
    availability: 'available',
    furnishing: 'furnished',
    amenities: ['ওয়াইফাই', '৩ বেলা খাবার', 'লন্ড্রি', 'স্টাডি রুম'],
    description: 'ঢাকা বিশ্ববিদ্যালয়ের কাছে ছাত্রদের জন্য সুন্দর পরিবেশে মেস। পড়াশোনার জন্য আদর্শ।',
    contactPhone: '01811-654321',
    contactWhatsapp: '01811-654321',
    verified: true,
    postedDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'ফ্যামিলি হাউস - উত্তরা',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    price: 45000,
    address: 'সেক্টর ১১, উত্তরা',
    location: 'উত্তরা',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400'
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 31,
    availability: 'available',
    furnishing: 'semi-furnished',
    amenities: ['গ্যারেজ', 'বাগান', 'ছাদ', 'নিরাপত্তা', 'জেনারেটর'],
    description: 'পারিবারিক পরিবেশে সুন্দর বাড়ি। উত্তরার প্রাণকেন্দ্রে অবস্থিত।',
    contactPhone: '01911-789012',
    contactWhatsapp: '01911-789012',
    verified: true,
    postedDate: '2024-01-10'
  },
  {
    id: '4',
    title: 'সিঙ্গেল রুম - ধানমন্ডি',
    type: 'single',
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    price: 12000,
    address: 'রোড ৮, ধানমন্ডি',
    location: 'ধানমন্ডি',
    images: [
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=400'
    ],
    featured: false,
    rating: 4.3,
    reviewCount: 12,
    availability: 'available',
    furnishing: 'furnished',
    amenities: ['ওয়াইফাই', 'এসি', 'অ্যাটাচড বাথ'],
    description: 'ধানমন্ডি এলাকায় কর্মজীবীদের জন্য সুন্দর সিঙ্গেল রুম।',
    contactPhone: '01511-345678',
    contactWhatsapp: '01511-345678',
    verified: false,
    postedDate: '2024-01-25'
  },
  {
    id: '5',
    title: 'শেয়ারড অ্যাপার্টমেন্ট - বনানী',
    type: 'shared',
    bedrooms: 1,
    bathrooms: 1,
    area: 300,
    price: 15000,
    address: 'রোড ২৭, বনানী',
    location: 'বনানী',
    images: [
      'https://images.unsplash.com/photo-1523688471150-efdd09f0f312?q=80&w=400',
      'https://images.unsplash.com/photo-1534595038511-9f219fe0c979?q=80&w=400'
    ],
    featured: false,
    rating: 4.6,
    reviewCount: 8,
    availability: 'soon',
    furnishing: 'furnished',
    amenities: ['ওয়াইফাই', 'এসি', 'লিফট', 'কমন এরিয়া'],
    description: 'বনানী এলাকায় আধুনিক সুবিধা সম্পন্ন শেয়ারড অ্যাপার্টমেন্ট।',
    contactPhone: '01611-987654',
    contactWhatsapp: '01611-987654',
    verified: true,
    postedDate: '2024-01-22'
  },
  {
    id: '6',
    title: 'ছাত্রী হোস্টেল - নিউমার্কেট',
    type: 'hostel',
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    price: 9500,
    address: 'নিউমার্কেট এলাকা',
    location: 'নিউমার্কেট',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400'
    ],
    featured: false,
    rating: 4.4,
    reviewCount: 15,
    availability: 'available',
    furnishing: 'furnished',
    amenities: ['ওয়াইফাই', 'মহিলা নিরাপত্তা', 'কমন রুম', '২৪/৭ নিরাপত্তা'],
    description: 'ছাত্রীদের জন্য নিরাপদ ও আরামদায়ক হোস্টেল। সব ধরনের সুবিধা।',
    contactPhone: '01711-456789',
    contactWhatsapp: '01711-456789',
    verified: true,
    postedDate: '2024-01-18'
  }
];

export const dhakaAreas = [
  'গুলশান', 'বনানী', 'উত্তরা', 'ধানমন্ডি', 'মিরপুর', 'শাহবাগ', 
  'নিউমার্কেট', 'মোহাম্মদপুর', 'ওয়ারী', 'বাড্ডা', 'বসুন্ধরা', 
  'লালমাটিয়া', 'পান্থপথ', 'কলাবাগান', 'জিগাতলা'
];

export const propertyTypes = [
  { value: 'all', label: 'সব ধরন' },
  { value: 'apartment', label: 'অ্যাপার্টমেন্ট' },
  { value: 'house', label: 'বাসা/বাড়ি' },
  { value: 'mess', label: 'মেস' },
  { value: 'single', label: 'সিঙ্গেল রুম' },
  { value: 'shared', label: 'শেয়ারড রুম' },
  { value: 'hostel', label: 'হোস্টেল' }
];

export const budgetRanges = [
  { value: 'all', label: 'সব বাজেট' },
  { value: '0-10000', label: '১০,০০০ টাকা পর্যন্ত' },
  { value: '10000-20000', label: '১০,০০০-২০,০০০ টাকা' },
  { value: '20000-35000', label: '২০,০০০-৩৫,০০০ টাকা' },
  { value: '35000-50000', label: '৩৫,০০০-৫০,০০০ টাকা' },
  { value: '50000+', label: '৫০,০০০+ টাকা' }
];

export const amenitiesList = [
  'ওয়াইফাই', 'এসি', 'লিফট', 'পার্কিং', 'জেনারেটর', 'নিরাপত্তা',
  'গ্যাস', 'গার্ডেন', 'ছাদ', 'জিম', 'সুইমিং পুল', 'কমিউনিটি হল'
];
