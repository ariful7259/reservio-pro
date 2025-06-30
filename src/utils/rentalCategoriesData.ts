
export interface RentalBookingField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'daterange';
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface RentalCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  count: number;
  pricingMethod: {
    type: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'per-item' | 'contract';
    hasDeposit: boolean;
    depositType?: 'fixed' | 'percentage';
    depositAmount?: number;
  };
  bookingFields: RentalBookingField[];
  deliveryOptions: string[];
  specialFeatures: string[];
  approvalRequired: boolean;
  verificationRequired: boolean;
  monetization: {
    commissionRate: number;
    additionalFees: string[];
  };
  subcategories: {
    id: string;
    name: string;
    icon?: string;
    count: number;
  }[];
}

export const rentalCategories: RentalCategory[] = [
  {
    id: 'housing',
    name: 'বাসা বাড়ি',
    nameEn: 'Housing',
    icon: '🏠',
    count: 892,
    pricingMethod: {
      type: 'monthly',
      hasDeposit: true,
      depositType: 'percentage',
      depositAmount: 20
    },
    bookingFields: [
      { id: 'startDate', label: 'শুরুর তারিখ', type: 'date', required: true },
      { id: 'endDate', label: 'শেষের তারিখ', type: 'date', required: true },
      { id: 'occupancyType', label: 'থাকার ধরন', type: 'radio', required: true, options: ['ফ্যামিলি', 'ব্যাচেলর', 'অফিস'] },
      { id: 'personCount', label: 'কতজন থাকবে', type: 'number', required: false, validation: { min: 1, max: 20 } },
      { id: 'address', label: 'সম্পূর্ণ ঠিকানা', type: 'textarea', required: true, placeholder: 'বিস্তারিত ঠিকানা লিখুন' },
      { id: 'additionalRequirements', label: 'অতিরিক্ত প্রয়োজনীয়তা', type: 'textarea', required: false, placeholder: 'কোন বিশেষ চাহিদা থাকলে লিখুন' }
    ],
    deliveryOptions: ['স্ব-পরিদর্শন', 'ভার্চুয়াল ট্যুর', 'এজেন্ট সহায়তা'],
    specialFeatures: ['ফার্নিশড অপশন', 'পার্কিং সুবিধা', 'নিরাপত্তা ব্যবস্থা', 'ইউটিলিটি বিল অন্তর্ভুক্ত'],
    approvalRequired: true,
    verificationRequired: true,
    monetization: {
      commissionRate: 10,
      additionalFees: ['লিস্টিং ফি', 'ভেরিফিকেশন চার্জ']
    },
    subcategories: [
      { id: 'apartment', name: 'অ্যাপার্টমেন্ট/ফ্ল্যাট', icon: '🏢', count: 187 },
      { id: 'house', name: 'বাসা/বাড়ি', icon: '🏡', count: 156 },
      { id: 'hostel', name: 'মেস/হোস্টেল', icon: '🏨', count: 83 },
      { id: 'room', name: 'সিঙ্গেল রুম/শেয়ারড', icon: '🛏️', count: 119 }
    ]
  },
  {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স',
    nameEn: 'Electronics',
    icon: '💻',
    count: 324,
    pricingMethod: {
      type: 'daily',
      hasDeposit: true,
      depositType: 'fixed',
      depositAmount: 5000
    },
    bookingFields: [
      { id: 'duration', label: 'ভাড়ার মেয়াদ', type: 'select', required: true, options: ['১ দিন', '১ সপ্তাহ', '১ মাস'] },
      { id: 'deliveryOption', label: 'ডেলিভারি অপশন', type: 'radio', required: true, options: ['পিকআপ', 'হোম ডেলিভারি'] },
      { id: 'address', label: 'ডেলিভারি ঠিকানা', type: 'textarea', required: true, placeholder: 'সম্পূর্ণ ঠিকানা লিখুন' },
      { id: 'purpose', label: 'ব্যবহারের উদ্দেশ্য', type: 'text', required: false, placeholder: 'যেমন: অফিস কাজ, ইভেন্ট' },
      { id: 'damageInsurance', label: 'ক্ষতি বীমা নিতে চান?', type: 'checkbox', required: false }
    ],
    deliveryOptions: ['হোম ডেলিভারি', 'পিকআপ পয়েন্ট', 'এক্সপ্রেস ডেলিভারি'],
    specialFeatures: ['ড্যামেজ ইন্স্যুরেন্স', 'টেকনিক্যাল সাপোর্ট', 'রিপ্লেসমেন্ট গ্যারান্টি'],
    approvalRequired: false,
    verificationRequired: false,
    monetization: {
      commissionRate: 15,
      additionalFees: ['ইন্স্যুরেন্স ফি', 'এক্সপ্রেস ডেলিভারি চার্জ']
    },
    subcategories: [
      { id: 'laptop', name: 'ল্যাপটপ/কম্পিউটার', count: 45 },
      { id: 'projector', name: 'প্রজেক্টর/মনিটর', count: 23 },
      { id: 'printer', name: 'প্রিন্টার/স্ক্যানার', count: 18 },
      { id: 'camera', name: 'ক্যামেরা/ভিডিও ক্যামেরা', count: 34 }
    ]
  },
  {
    id: 'transport',
    name: 'পরিবহন',
    nameEn: 'Transport',
    icon: '🚗',
    count: 178,
    pricingMethod: {
      type: 'hourly',
      hasDeposit: true,
      depositType: 'fixed',
      depositAmount: 10000
    },
    bookingFields: [
      { id: 'pickupDateTime', label: 'পিকআপ তারিখ ও সময়', type: 'date', required: true },
      { id: 'dropDateTime', label: 'রিটার্ন তারিখ ও সময়', type: 'date', required: true },
      { id: 'pickupLocation', label: 'পিকআপ লোকেশন', type: 'text', required: true, placeholder: 'পিকআপ পয়েন্ট' },
      { id: 'dropLocation', label: 'ড্রপ লোকেশন', type: 'text', required: true, placeholder: 'গন্তব্য স্থান' },
      { id: 'driverNeeded', label: 'ড্রাইভার প্রয়োজন?', type: 'radio', required: true, options: ['হ্যাঁ', 'না'] },
      { id: 'fuelIncluded', label: 'জ্বালানি অন্তর্ভুক্ত?', type: 'radio', required: true, options: ['হ্যাঁ', 'না'] },
      { id: 'licenseUpload', label: 'ড্রাইভিং লাইসেন্স আপলোড', type: 'text', required: false, placeholder: 'লাইসেন্স নম্বর' }
    ],
    deliveryOptions: ['সেলফ ড্রাইভ', 'ড্রাইভার সহ', 'জিপিএস ট্র্যাকিং'],
    specialFeatures: ['রিয়েল-টাইম ট্র্যাকিং', 'ভেরিফাইড ড্রাইভার', '২৪/৭ সাপোর্ট'],
    approvalRequired: true,
    verificationRequired: true,
    monetization: {
      commissionRate: 20,
      additionalFees: ['ড্রাইভার ফি', 'জিপিএস চার্জ']
    },
    subcategories: [
      { id: 'car', name: 'প্রাইভেট কার', count: 67 },
      { id: 'microbus', name: 'মাইক্রোবাস/নোয়াহ', count: 23 },
      { id: 'bike', name: 'মোটরসাইকেল/স্কুটার', count: 45 }
    ]
  },
  {
    id: 'event',
    name: 'ইভেন্ট সামগ্রী',
    nameEn: 'Event Equipment',
    icon: '🎪',
    count: 89,
    pricingMethod: {
      type: 'per-item',
      hasDeposit: false
    },
    bookingFields: [
      { id: 'eventDate', label: 'ইভেন্টের তারিখ', type: 'date', required: true },
      { id: 'eventTime', label: 'ইভেন্টের সময়', type: 'text', required: true, placeholder: 'সকাল ১০টা - রাত ৮টা' },
      { id: 'chairQuantity', label: 'চেয়ারের সংখ্যা', type: 'number', required: false, validation: { min: 0, max: 1000 } },
      { id: 'tableQuantity', label: 'টেবিলের সংখ্যা', type: 'number', required: false, validation: { min: 0, max: 100 } },
      { id: 'setupLocation', label: 'সেটআপ লোকেশন', type: 'textarea', required: true, placeholder: 'ইভেন্ট স্থানের সম্পূর্ণ ঠিকানা' },
      { id: 'setupService', label: 'সেটআপ সার্ভিস প্রয়োজন?', type: 'radio', required: true, options: ['হ্যাঁ', 'না'] }
    ],
    deliveryOptions: ['হোম ডেলিভারি', 'সেটআপ সার্ভিস', 'সেলফ পিকআপ'],
    specialFeatures: ['অটো প্রাইস ক্যালকুলেটর', 'সেটআপ সার্ভিস', 'ইভেন্ট পার্টনার'],
    approvalRequired: false,
    verificationRequired: false,
    monetization: {
      commissionRate: 12,
      additionalFees: ['সেটআপ ফি', 'ট্রান্সপোর্ট চার্জ']
    },
    subcategories: [
      { id: 'furniture', name: 'চেয়ার/টেবিল/সাউন্ড বক্স', count: 25 },
      { id: 'lighting', name: 'লাইটিং ও সাজসজ্জা', count: 18 },
      { id: 'stage', name: 'স্টেজ ও ব্যাকড্রপ', count: 12 }
    ]
  }
];

export const getRentalCategoryById = (id: string): RentalCategory | null => {
  return rentalCategories.find(category => category.id === id) || null;
};

export const getRentalSubcategories = (categoryId: string) => {
  const category = getRentalCategoryById(categoryId);
  return category?.subcategories || [];
};
