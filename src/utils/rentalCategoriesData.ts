
export interface RentalBookingField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number' | 'textarea' | 'checkbox' | 'radio' | 'time' | 'daterange';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface RentalPricingMethod {
  type: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'fixed' | 'per_item' | 'custom';
  basePrice?: number;
  currency: string;
  hasDeposit: boolean;
  depositAmount?: number;
  depositType?: 'fixed' | 'percentage';
}

export interface RentalCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  subcategories: string[];
  bookingFields: RentalBookingField[];
  pricingMethod: RentalPricingMethod;
  deliveryOptions: string[];
  approvalRequired: boolean;
  verificationRequired: boolean;
  specialFeatures: string[];
  monetization: {
    commissionRate: number;
    additionalFees: string[];
  };
}

export const rentalCategories: RentalCategory[] = [
  {
    id: 'house_living',
    name: 'বাসা বাড়ি',
    nameEn: 'House & Living Space',
    icon: '🏠',
    subcategories: ['অ্যাপার্টমেন্ট/ফ্ল্যাট', 'বাসা/বাড়ি', 'মেস/হোস্টেল', 'সিঙ্গেল রুম/শেয়ারড'],
    bookingFields: [
      {
        id: 'rental_period',
        label: 'ভাড়ার মেয়াদ',
        type: 'daterange',
        required: true
      },
      {
        id: 'occupancy_type',
        label: 'কে থাকবে',
        type: 'radio',
        required: true,
        options: ['ফ্যামিলি', 'ব্যাচেলর', 'অফিস কর্মী', 'ছাত্র-ছাত্রী']
      },
      {
        id: 'people_count',
        label: 'কতজন থাকবে',
        type: 'number',
        required: false,
        validation: { min: 1, max: 20 }
      },
      {
        id: 'monthly_rent',
        label: 'মাসিক ভাড়া (৳)',
        type: 'number',
        required: true
      },
      {
        id: 'address',
        label: 'সম্পূর্ণ ঠিকানা',
        type: 'textarea',
        required: true
      },
      {
        id: 'special_requirements',
        label: 'বিশেষ চাহিদা',
        type: 'textarea',
        required: false
      }
    ],
    pricingMethod: {
      type: 'monthly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['স্ব-সংগ্রহ', 'চাবি হস্তান্তর'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['Google Map Integration', 'Virtual Tour', 'Owner Contact'],
    monetization: {
      commissionRate: 5,
      additionalFees: ['Listing Fee', 'Verification Fee']
    }
  },
  {
    id: 'electronics',
    name: 'ইলেকট্রনিক্স',
    nameEn: 'Electronics',
    icon: '💻',
    subcategories: ['ল্যাপটপ/কম্পিউটার', 'প্রজেক্টর/মনিটর', 'প্রিন্টার/স্ক্যানার', 'ক্যামেরা/ভিডিও ক্যামেরা', 'সাউন্ড সিস্টেম/স্পিকার', 'LED টিভি', 'গেমিং কনসোল', 'পাওয়ার ব্যাঙ্ক/ইউপিএস'],
    bookingFields: [
      {
        id: 'rental_duration',
        label: 'ভাড়ার সময়কাল',
        type: 'select',
        required: true,
        options: ['১ দিন', '৩ দিন', '১ সপ্তাহ', '১ মাস', 'কাস্টম']
      },
      {
        id: 'device_condition',
        label: 'ডিভাইসের অবস্থা জানতে চান?',
        type: 'checkbox',
        required: false
      },
      {
        id: 'security_deposit',
        label: 'নিরাপত্তা জামানত (৳)',
        type: 'number',
        required: true
      },
      {
        id: 'pickup_delivery',
        label: 'পিকআপ/ডেলিভারি',
        type: 'radio',
        required: true,
        options: ['নিজে নিয়ে যাবো', 'ডেলিভারি চাই', 'উভয়ই সম্ভব']
      },
      {
        id: 'usage_purpose',
        label: 'ব্যবহারের উদ্দেশ্য',
        type: 'text',
        required: false,
        placeholder: 'অফিস কাজ, ইভেন্ট, প্রেজেন্টেশন ইত্যাদি'
      }
    ],
    pricingMethod: {
      type: 'daily',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['স্ব-সংগ্রহ', 'হোম ডেলিভারি', 'পিকআপ পয়েন্ট'],
    approvalRequired: false,
    verificationRequired: false,
    specialFeatures: ['Damage Insurance', 'Express Delivery', 'Technical Support'],
    monetization: {
      commissionRate: 15,
      additionalFees: ['Delivery Fee', 'Insurance Fee']
    }
  },
  {
    id: 'transport',
    name: 'পরিবহন',
    nameEn: 'Transport',
    icon: '🚗',
    subcategories: ['প্রাইভেট কার', 'মাইক্রোবাস/নোয়াহ', 'মোটরসাইকেল/স্কুটার', 'ভ্যান/পিকআপ', 'রিকশা/ভ্যানগাড়ি', 'ট্রাক/মিনি ট্রাক', 'বাইসাইকেল'],
    bookingFields: [
      {
        id: 'rental_datetime',
        label: 'ভাড়ার তারিখ ও সময়',
        type: 'daterange',
        required: true
      },
      {
        id: 'pickup_location',
        label: 'পিকআপ লোকেশন',
        type: 'text',
        required: true
      },
      {
        id: 'drop_location',
        label: 'ড্রপ লোকেশন',
        type: 'text',
        required: true
      },
      {
        id: 'driver_needed',
        label: 'ড্রাইভার লাগবে?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না', 'উভয়ই সম্ভব']
      },
      {
        id: 'fuel_included',
        label: 'জ্বালানি অন্তর্ভুক্ত?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      },
      {
        id: 'license_upload',
        label: 'ড্রাইভিং লাইসেন্স (যদি নিজে চালান)',
        type: 'text',
        required: false
      }
    ],
    pricingMethod: {
      type: 'hourly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['নির্দিষ্ট স্থানে ডেলিভারি', 'GPS ট্র্যাকিং'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['GPS Tracking', 'Driver Rating', 'Real-time Booking'],
    monetization: {
      commissionRate: 12,
      additionalFees: ['Driver Fee', 'Fuel Surcharge']
    }
  },
  {
    id: 'event_equipment',
    name: 'ইভেন্ট সামগ্রী',
    nameEn: 'Event Equipment',
    icon: '🎪',
    subcategories: ['চেয়ার/টেবিল/সাউন্ড বক্স', 'লাইটিং ও সাজসজ্জা', 'স্টেজ ও ব্যাকড্রপ', 'ক্যাটারিং সামগ্রী', 'ক্যামেরা ও ফটোগ্রাফি সার্ভিস', 'জেনারেটর', 'ফ্যান/এসি'],
    bookingFields: [
      {
        id: 'event_date',
        label: 'ইভেন্টের তারিখ ও সময়',
        type: 'daterange',
        required: true
      },
      {
        id: 'item_quantity',
        label: 'কতটি দরকার',
        type: 'number',
        required: true,
        validation: { min: 1, max: 1000 }
      },
      {
        id: 'setup_location',
        label: 'সেটআপ লোকেশন',
        type: 'textarea',
        required: true
      },
      {
        id: 'setup_service',
        label: 'সেটআপ সার্ভিস লাগবে?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      },
      {
        id: 'event_type',
        label: 'ইভেন্টের ধরন',
        type: 'select',
        required: true,
        options: ['বিয়ে', 'জন্মদিন', 'কর্পোরেট', 'ধর্মীয়', 'সামাজিক', 'অন্যান্য']
      }
    ],
    pricingMethod: {
      type: 'per_item',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['হোম ডেলিভারি', 'স্ব-সংগ্রহ', 'সেটআপ সার্ভিস'],
    approvalRequired: false,
    verificationRequired: false,
    specialFeatures: ['Auto Price Calculator', 'Setup Service', 'Event Planning'],
    monetization: {
      commissionRate: 10,
      additionalFees: ['Setup Fee', 'Delivery Charges']
    }
  },
  {
    id: 'home_essentials',
    name: 'ঘরোয়া সামগ্রী',
    nameEn: 'Home Essentials',
    icon: '🏡',
    subcategories: ['বিছানা/ম্যাট্রেস', 'ফ্রিজ/রেফ্রিজারেটর', 'ওয়াশিং মেশিন', 'ব্লেন্ডার/কুকার', 'গ্যাস চুলা/সিলিন্ডার', 'পানির পাম্প', 'হিটার/ফ্যান/এয়ার কুলার'],
    bookingFields: [
      {
        id: 'rental_duration',
        label: 'ভাড়ার সময়কাল',
        type: 'select',
        required: true,
        options: ['১ সপ্তাহ', '১ মাস', '৩ মাস', '৬ মাস', '১ বছর']
      },
      {
        id: 'delivery_address',
        label: 'ডেলিভারি ঠিকানা',
        type: 'textarea',
        required: true
      },
      {
        id: 'refundable_deposit',
        label: 'ফেরতযোগ্য জামানত (৳)',
        type: 'number',
        required: true
      },
      {
        id: 'installation_needed',
        label: 'ইনস্টলেশন সার্ভিস লাগবে?',
        type: 'radio',
        required: false,
        options: ['হ্যাঁ', 'না']
      }
    ],
    pricingMethod: {
      type: 'monthly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['হোম ডেলিভারি', 'ইনস্টলেশন সার্ভিস'],
    approvalRequired: false,
    verificationRequired: false,
    specialFeatures: ['One-click Rent', 'Installation Service', 'Maintenance Support'],
    monetization: {
      commissionRate: 12,
      additionalFees: ['Installation Fee', 'Maintenance Fee']
    }
  },
  {
    id: 'educational_tools',
    name: 'শিক্ষা সামগ্রী',
    nameEn: 'Educational Tools',
    icon: '📚',
    subcategories: ['হোয়াইটবোর্ড/প্রজেক্টর', 'টিউটরিং কিট', 'কম্পিউটার/ল্যাপটপ', 'স্টাডি ডেস্ক/চেয়ার', 'অনলাইন ক্লাস সেটআপ কিট'],
    bookingFields: [
      {
        id: 'booking_time',
        label: 'বুকিং সময়',
        type: 'daterange',
        required: true
      },
      {
        id: 'education_type',
        label: 'শিক্ষার ধরন',
        type: 'select',
        required: true,
        options: ['স্কুল ক্লাস', 'অনলাইন ক্লাস', 'প্রাইভেট পড়ানো', 'কোচিং', 'প্রেজেন্টেশন']
      },
      {
        id: 'student_count',
        label: 'ছাত্র-ছাত্রী সংখ্যা',
        type: 'number',
        required: false,
        validation: { min: 1, max: 100 }
      },
      {
        id: 'pickup_delivery',
        label: 'পিকআপ/ডেলিভারি',
        type: 'radio',
        required: true,
        options: ['পিকআপ', 'ডেলিভারি', 'উভয়ই']
      }
    ],
    pricingMethod: {
      type: 'daily',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['স্ব-সংগ্রহ', 'হোম ডেলিভারি'],
    approvalRequired: false,
    verificationRequired: false,
    specialFeatures: ['Education Partner Program', 'Technical Support'],
    monetization: {
      commissionRate: 8,
      additionalFees: ['Delivery Fee']
    }
  },
  {
    id: 'agricultural_tools',
    name: 'কৃষি যন্ত্রপাতি',
    nameEn: 'Agricultural Tools',
    icon: '🚜',
    subcategories: ['পাওয়ার টিলার', 'হারভেস্টার মেশিন', 'পানি সেচ পাম্প', 'ট্রলি/খাল খননের সরঞ্জাম', 'স্প্রে মেশিন', 'বীজ বপন মেশিন'],
    bookingFields: [
      {
        id: 'work_date_range',
        label: 'কাজের তারিখ',
        type: 'daterange',
        required: true
      },
      {
        id: 'operator_required',
        label: 'অপারেটর লাগবে?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      },
      {
        id: 'field_location',
        label: 'জমির অবস্থান',
        type: 'textarea',
        required: true
      },
      {
        id: 'fuel_included',
        label: 'জ্বালানি অন্তর্ভুক্ত?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      },
      {
        id: 'work_hours',
        label: 'কত ঘন্টা কাজ?',
        type: 'number',
        required: true,
        validation: { min: 1, max: 24 }
      }
    ],
    pricingMethod: {
      type: 'hourly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['ফিল্ড ডেলিভারি', 'অপারেটর সহ'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['Operator Service', 'Field Location Mapping'],
    monetization: {
      commissionRate: 15,
      additionalFees: ['Operator Fee', 'Fuel Charges']
    }
  },
  {
    id: 'business_items',
    name: 'ব্যবসায়িক সামগ্রী',
    nameEn: 'Business Items',
    icon: '💼',
    subcategories: ['POS মেশিন', 'সিসিটিভি ক্যামেরা', 'ডিসপ্লে র‍্যাক/শেলফ', 'কফি মেশিন/ভেন্ডিং মেশিন', 'টেন্ট/বুথ/এক্সিবিশন কিট', 'লাইটবক্স সাইনবোর্ড'],
    bookingFields: [
      {
        id: 'rental_duration',
        label: 'ভাড়ার মেয়াদ',
        type: 'select',
        required: true,
        options: ['১ সপ্তাহ', '১ মাস', '৩ মাস', '৬ মাস', '১ বছর']
      },
      {
        id: 'business_type',
        label: 'ব্যবসার ধরন',
        type: 'select',
        required: true,
        options: ['রেস্টুরেন্ট', 'দোকান', 'অফিস', 'ইভেন্ট', 'মার্কেট', 'অন্যান্য']
      },
      {
        id: 'setup_location',
        label: 'সেটআপ লোকেশন',
        type: 'textarea',
        required: true
      },
      {
        id: 'service_needed',
        label: 'সার্ভিস লাগবে?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      }
    ],
    pricingMethod: {
      type: 'monthly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['বিজনেস ডেলিভারি', 'সেটআপ সার্ভিস'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['Business Package', 'Professional Setup', 'Maintenance'],
    monetization: {
      commissionRate: 18,
      additionalFees: ['Setup Fee', 'Professional Service Fee']
    }
  },
  {
    id: 'tools_equipment',
    name: 'কারিগরি টুলস',
    nameEn: 'Tools & Equipment',
    icon: '🔧',
    subcategories: ['ড্রিল মেশিন', 'ওয়েল্ডিং মেশিন', 'কাটার/গ্রাইন্ডার', 'স্যান্ডার/প্লেনার', 'কাঠ মিস্ত্রির টুল কিট', 'ইলেকট্রিশিয়ান টুলস', 'মিস্ত্রি/মেসনের সরঞ্জাম'],
    bookingFields: [
      {
        id: 'rental_duration',
        label: 'ভাড়ার সময়কাল',
        type: 'select',
        required: true,
        options: ['১ দিন', '৩ দিন', '১ সপ্তাহ', '১ মাস']
      },
      {
        id: 'safety_acknowledgment',
        label: 'নিরাপত্তা নির্দেশনা মেনে চলবেন?',
        type: 'checkbox',
        required: true
      },
      {
        id: 'experience_level',
        label: 'ব্যবহারের অভিজ্ঞতা',
        type: 'select',
        required: true,
        options: ['নতুন', 'মাঝারি', 'অভিজ্ঞ', 'পেশাদার']
      },
      {
        id: 'pickup_location',
        label: 'পিকআপ লোকেশন',
        type: 'text',
        required: true
      }
    ],
    pricingMethod: {
      type: 'daily',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['স্ব-সংগ্রহ', 'হোম ডেলিভারি'],
    approvalRequired: false,
    verificationRequired: true,
    specialFeatures: ['Safety Instructions', 'Return Confirmation', 'Toolkit Packages'],
    monetization: {
      commissionRate: 14,
      additionalFees: ['Safety Deposit', 'Toolkit Package Fee']
    }
  },
  {
    id: 'commercial_space',
    name: 'কমার্শিয়াল স্পেস',
    nameEn: 'Commercial Space',
    icon: '🏪',
    subcategories: ['দোকানের স্পেস', 'ফুড কার্ট বা স্টল', 'শো রুম/ডিসপ্লে এরিয়া', 'ট্রেড ফেয়ার বুথ স্পেস'],
    bookingFields: [
      {
        id: 'rental_period',
        label: 'ভাড়ার মেয়াদ',
        type: 'daterange',
        required: true
      },
      {
        id: 'space_usage',
        label: 'স্পেস ব্যবহারের উদ্দেশ্য',
        type: 'select',
        required: true,
        options: ['খুচরা বিক্রয়', 'খাবারের দোকান', 'প্রদর্শনী', 'ইভেন্ট', 'অফিস', 'অন্যান্য']
      },
      {
        id: 'exact_location',
        label: 'সঠিক অবস্থান',
        type: 'textarea',
        required: true
      },
      {
        id: 'electricity_needed',
        label: 'বিদ্যুৎ সংযোগ লাগবে?',
        type: 'radio',
        required: true,
        options: ['হ্যাঁ', 'না']
      },
      {
        id: 'decoration_needed',
        label: 'সাজসজ্জা লাগবে?',
        type: 'radio',
        required: false,
        options: ['হ্যাঁ', 'না']
      }
    ],
    pricingMethod: {
      type: 'monthly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['স্পেস হ্যান্ডওভার', 'ভার্চুয়াল ট্যুর'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['Virtual Map View', 'Physical Visit', 'Business License Check'],
    monetization: {
      commissionRate: 15,
      additionalFees: ['Setup Service', 'Utility Connection Fee']
    }
  },
  {
    id: 'short_stay',
    name: 'গেস্ট হাউস/স্বল্পমেয়াদী',
    nameEn: 'Short Stay',
    icon: '🏨',
    subcategories: ['ফ্যামিলি গেস্ট হাউস', 'ব্যাচেলর থাকার স্পেস', 'অফিস ট্রিপ/ট্রেনিংয়ের জন্য অ্যাপার্টমেন্ট', 'ঘন্টারভিত্তিক বুকিং'],
    bookingFields: [
      {
        id: 'checkin_checkout',
        label: 'চেক-ইন ও চেক-আউট',
        type: 'daterange',
        required: true
      },
      {
        id: 'people_count',
        label: 'কতজন থাকবে',
        type: 'number',
        required: true,
        validation: { min: 1, max: 20 }
      },
      {
        id: 'stay_purpose',
        label: 'থাকার উদ্দেশ্য',
        type: 'select',
        required: false,
        options: ['ব্যবসায়িক', 'পর্যটন', 'চিকিৎসা', 'পারিবারিক', 'অন্যান্য']
      },
      {
        id: 'special_requirements',
        label: 'বিশেষ প্রয়োজন',
        type: 'textarea',
        required: false
      }
    ],
    pricingMethod: {
      type: 'daily',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['কী হ্যান্ডওভার', 'অটো চেকআউট'],
    approvalRequired: false,
    verificationRequired: true,
    specialFeatures: ['Hourly Booking', 'Auto Checkout', 'Guest Management'],
    monetization: {
      commissionRate: 12,
      additionalFees: ['Cleaning Charges', 'Extra Service Fee']
    }
  },
  {
    id: 'rural_housing',
    name: 'গ্রামীণ বাসস্থান',
    nameEn: 'Rural Housing',
    icon: '🌾',
    subcategories: ['কুটির/টিনের ঘর', 'বাশের ঘর/মাটির ঘর', 'পুকুর সংলগ্ন ঘর', 'কৃষিজমিতে থাকা'],
    bookingFields: [
      {
        id: 'rental_duration',
        label: 'ভাড়ার মেয়াদ',
        type: 'daterange',
        required: true
      },
      {
        id: 'stay_purpose',
        label: 'থাকার উদ্দেশ্য',
        type: 'select',
        required: true,
        options: ['কৃষিকাজ', 'মাছ চাষ', 'বিশ্রাম/ছুটি', 'গবেষণা', 'অন্যান্য']
      },
      {
        id: 'gps_location',
        label: 'GPS অবস্থান',
        type: 'text',
        required: true
      },
      {
        id: 'facilities_needed',
        label: 'কী কী সুবিধা লাগবে',
        type: 'textarea',
        required: false,
        placeholder: 'বিদ্যুৎ, পানি, রান্নার ব্যবস্থা ইত্যাদি'
      }
    ],
    pricingMethod: {
      type: 'daily',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'fixed'
    },
    deliveryOptions: ['ম্যানুয়াল হ্যান্ডওভার', 'GPS গাইডেড'],
    approvalRequired: true,
    verificationRequired: true,
    specialFeatures: ['Picture/Video Verification', 'Eco-stay Packages', 'Rural Experience'],
    monetization: {
      commissionRate: 8,
      additionalFees: ['Rural Experience Package']
    }
  },
  {
    id: 'studio_space',
    name: 'স্টুডিও/কনটেন্ট স্পেস',
    nameEn: 'Studio Space',
    icon: '🎬',
    subcategories: ['ভিডিও শুটিং স্টুডিও', 'ইউটিউব/লাইভ স্ট্রিমিং রুম', 'ফটোস্টুডিও/ব্যাকড্রপ সহ', 'রেকর্ডিং স্টুডিও', 'কুকিং কন্টেন্ট স্টুডিও', 'আর্টিস্টিক স্পেস'],
    bookingFields: [
      {
        id: 'booking_slot',
        label: 'বুকিং স্লট',
        type: 'daterange',
        required: true
      },
      {
        id: 'equipment_needed',
        label: 'ইকুইপমেন্ট লাগবে?',
        type: 'checkbox',
        required: false
      },
      {
        id: 'internet_setup',
        label: 'ইন্টারনেট/সেটআপ',
        type: 'radio',
        required: true,
        options: ['হাই-স্পিড ইন্টারনেট চাই', 'বেসিক চলবে', 'দরকার নেই']
      },
      {
        id: 'content_purpose',
        label: 'কনটেন্টের উদ্দেশ্য',
        type: 'select',
        required: true,
        options: ['ভিডিও শুটিং', 'ফটোশুট', 'পডকাস্ট', 'লাইভ স্ট্রিমিং', 'কুকিং শো', 'অন্যান্য']
      },
      {
        id: 'support_staff',
        label: 'সাপোর্ট স্টাফ লাগবে?',
        type: 'radio',
        required: false,
        options: ['হ্যাঁ', 'না']
      }
    ],
    pricingMethod: {
      type: 'hourly',
      currency: 'BDT',
      hasDeposit: true,
      depositType: 'percentage'
    },
    deliveryOptions: ['স্টুডিও অ্যাক্সেস', 'সাপোর্ট স্টাফ'],
    approvalRequired: false,
    verificationRequired: false,
    specialFeatures: ['Hourly Slot Booking', 'Equipment Rental', 'Editing Service'],
    monetization: {
      commissionRate: 20,
      additionalFees: ['Equipment Fee', 'Editing Service Fee', 'Support Staff Fee']
    }
  }
];

export const getRentalCategoryById = (categoryId: string): RentalCategory | undefined => {
  return rentalCategories.find(category => category.id === categoryId);
};

export const getRentalSubcategories = (categoryId: string): string[] => {
  const category = getRentalCategoryById(categoryId);
  return category ? category.subcategories : [];
};
