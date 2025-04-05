
// সার্ভিস এবং প্রোডাক্ট ক্যাটাগরি সম্পর্কিত তথ্য

export interface SubCategory {
  id: string;
  nameEN: string;
  nameBN: string;
  slug: string;
  icon?: string;
  description?: {
    en: string;
    bn: string;
  };
  image?: string;
  count?: number;
}

export interface Category {
  id: string;
  nameEN: string;
  nameBN: string;
  slug: string;
  icon: string;
  description?: {
    en: string;
    bn: string;
  };
  image?: string;
  count?: number;
  subCategories: SubCategory[];
}

// সার্ভিস ক্যাটাগরি ডেটা
export const serviceCategories: Category[] = [
  {
    id: "healthcare",
    nameEN: "Healthcare",
    nameBN: "হেলথকেয়ার",
    slug: "healthcare",
    icon: "🏥",
    count: 156,
    description: {
      en: "All health related services",
      bn: "সমস্ত স্বাস্থ্য সম্পর্কিত সেবা"
    },
    subCategories: [
      {
        id: "doctor",
        nameEN: "Doctor",
        nameBN: "ডাক্তার",
        slug: "doctor",
        icon: "👨‍⚕️",
        count: 78
      },
      {
        id: "dentist",
        nameEN: "Dentist",
        nameBN: "দন্ত চিকিৎসক",
        slug: "dentist",
        icon: "🦷",
        count: 34
      },
      {
        id: "therapy",
        nameEN: "Therapy",
        nameBN: "থেরাপি",
        slug: "therapy",
        icon: "🧠",
        count: 28
      },
      {
        id: "diagnostic",
        nameEN: "Diagnostic Center",
        nameBN: "ডায়াগনস্টিক সেন্টার",
        slug: "diagnostic",
        icon: "🔬",
        count: 16
      }
    ]
  },
  {
    id: "education",
    nameEN: "Education",
    nameBN: "শিক্ষা",
    slug: "education",
    icon: "🎓",
    count: 142,
    subCategories: [
      {
        id: "tuition",
        nameEN: "Private Tuition",
        nameBN: "প্রাইভেট টিউশন",
        slug: "tuition",
        icon: "📚",
        count: 62
      },
      {
        id: "language",
        nameEN: "Language Learning",
        nameBN: "ভাষা শিক্ষা",
        slug: "language",
        icon: "🗣️",
        count: 45
      },
      {
        id: "coaching",
        nameEN: "Coaching Center",
        nameBN: "কোচিং সেন্টার",
        slug: "coaching",
        icon: "👨‍🏫",
        count: 35
      }
    ]
  },
  {
    id: "household",
    nameEN: "Home Services",
    nameBN: "গৃহস্থালি",
    slug: "household",
    icon: "🏠",
    count: 128,
    subCategories: [
      {
        id: "cleaning",
        nameEN: "Cleaning",
        nameBN: "পরিষ্কার-পরিচ্ছন্নতা",
        slug: "cleaning",
        icon: "🧹",
        count: 45
      },
      {
        id: "plumbing",
        nameEN: "Plumbing",
        nameBN: "প্লাম্বিং",
        slug: "plumbing",
        icon: "🔧",
        count: 38
      },
      {
        id: "electrical",
        nameEN: "Electrical",
        nameBN: "ইলেক্ট্রিক্যাল",
        slug: "electrical",
        icon: "⚡",
        count: 45
      }
    ]
  },
  {
    id: "beauty",
    nameEN: "Beauty & Salon",
    nameBN: "বিউটি",
    slug: "beauty",
    icon: "💇‍♀️",
    count: 98,
    subCategories: [
      {
        id: "haircut",
        nameEN: "Hair Salon",
        nameBN: "হেয়ার স্যালুন",
        slug: "haircut",
        icon: "💇‍♂️",
        count: 42
      },
      {
        id: "spa",
        nameEN: "Spa & Massage",
        nameBN: "স্পা ও ম্যাসাজ",
        slug: "spa",
        icon: "💆‍♀️",
        count: 26
      },
      {
        id: "makeup",
        nameEN: "Makeup Artist",
        nameBN: "মেকআপ আর্টিস্ট",
        slug: "makeup",
        icon: "💄",
        count: 30
      }
    ]
  },
  {
    id: "professional",
    nameEN: "Professional",
    nameBN: "প্রফেশনাল",
    slug: "professional",
    icon: "💼",
    count: 85,
    subCategories: [
      {
        id: "legal",
        nameEN: "Legal Advisor",
        nameBN: "আইনি পরামর্শক",
        slug: "legal",
        icon: "⚖️",
        count: 28
      },
      {
        id: "tax",
        nameEN: "Tax Consultant",
        nameBN: "ট্যাক্স কনসালটেন্ট",
        slug: "tax",
        icon: "📊",
        count: 18
      },
      {
        id: "design",
        nameEN: "Design & Creative",
        nameBN: "ডিজাইন ও ক্রিয়েটিভ",
        slug: "design",
        icon: "🎨",
        count: 39
      }
    ]
  },
  {
    id: "tech",
    nameEN: "Technical",
    nameBN: "টেকনিক্যাল",
    slug: "tech",
    icon: "💻",
    count: 74,
    subCategories: [
      {
        id: "repair",
        nameEN: "Computer Repair",
        nameBN: "কম্পিউটার মেরামত",
        slug: "repair",
        icon: "🔧",
        count: 32
      },
      {
        id: "development",
        nameEN: "Web Development",
        nameBN: "ওয়েব ডেভেলপমেন্ট",
        slug: "development",
        icon: "🌐",
        count: 28
      },
      {
        id: "networking",
        nameEN: "Networking",
        nameBN: "নেটওয়ার্কিং",
        slug: "networking",
        icon: "📡",
        count: 14
      }
    ]
  },
  {
    id: "events",
    nameEN: "Events",
    nameBN: "ইভেন্ট",
    slug: "events",
    icon: "🎉",
    count: 63,
    subCategories: [
      {
        id: "photography",
        nameEN: "Photography",
        nameBN: "ফটোগ্রাফি",
        slug: "photography",
        icon: "📸",
        count: 24
      },
      {
        id: "catering",
        nameEN: "Catering",
        nameBN: "ক্যাটারিং",
        slug: "catering",
        icon: "🍽️",
        count: 21
      },
      {
        id: "decoration",
        nameEN: "Decoration",
        nameBN: "ডেকোরেশন",
        slug: "decoration",
        icon: "🎊",
        count: 18
      }
    ]
  },
  {
    id: "transportation",
    nameEN: "Transportation",
    nameBN: "পরিবহন",
    slug: "transportation",
    icon: "🚗",
    count: 58,
    subCategories: [
      {
        id: "ride",
        nameEN: "Ride Service",
        nameBN: "রাইড সার্ভিস",
        slug: "ride",
        icon: "🚕",
        count: 25
      },
      {
        id: "delivery",
        nameEN: "Delivery",
        nameBN: "ডেলিভারি",
        slug: "delivery",
        icon: "📦",
        count: 18
      },
      {
        id: "moving",
        nameEN: "Moving Service",
        nameBN: "মুভিং সার্ভিস",
        slug: "moving",
        icon: "🚚",
        count: 15
      }
    ]
  }
];

// প্রোডাক্ট ক্যাটেগরি ডেটা
export const productCategories: Category[] = [
  {
    id: "electronics",
    nameEN: "Electronics",
    nameBN: "ইলেকট্রনিক্স",
    slug: "electronics",
    icon: "📱",
    count: 240,
    subCategories: [
      {
        id: "smartphones",
        nameEN: "Smartphones",
        nameBN: "স্মার্টফোন",
        slug: "smartphones",
        icon: "📱",
        count: 85
      },
      {
        id: "laptops",
        nameEN: "Laptops",
        nameBN: "ল্যাপটপ",
        slug: "laptops",
        icon: "💻",
        count: 65
      },
      {
        id: "accessories",
        nameEN: "Accessories",
        nameBN: "অ্যাক্সেসরিজ",
        slug: "accessories",
        icon: "🎧",
        count: 90
      }
    ]
  },
  {
    id: "clothing",
    nameEN: "Clothing",
    nameBN: "পোশাক",
    slug: "clothing",
    icon: "👕",
    count: 320,
    subCategories: [
      {
        id: "mens",
        nameEN: "Men's Wear",
        nameBN: "পুরুষদের পোশাক",
        slug: "mens",
        icon: "👔",
        count: 120
      },
      {
        id: "womens",
        nameEN: "Women's Wear",
        nameBN: "মহিলাদের পোশাক",
        slug: "womens",
        icon: "👚",
        count: 150
      },
      {
        id: "kids",
        nameEN: "Kids Wear",
        nameBN: "বাচ্চাদের পোশাক",
        slug: "kids",
        icon: "👶",
        count: 50
      }
    ]
  },
  {
    id: "health",
    nameEN: "Health & Beauty",
    nameBN: "স্বাস্থ্য ও সৌন্দর্য",
    slug: "health",
    icon: "💊",
    count: 180,
    subCategories: [
      {
        id: "skincare",
        nameEN: "Skin Care",
        nameBN: "স্কিন কেয়ার",
        slug: "skincare",
        icon: "🧴",
        count: 70
      },
      {
        id: "haircare",
        nameEN: "Hair Care",
        nameBN: "হেয়ার কেয়ার",
        slug: "haircare",
        icon: "💇",
        count: 50
      },
      {
        id: "supplements",
        nameEN: "Supplements",
        nameBN: "সাপ্লিমেন্টস",
        slug: "supplements",
        icon: "💊",
        count: 60
      }
    ]
  },
  {
    id: "home",
    nameEN: "Home & Kitchen",
    nameBN: "হোম ও কিচেন",
    slug: "home",
    icon: "🏠",
    count: 210,
    subCategories: [
      {
        id: "furniture",
        nameEN: "Furniture",
        nameBN: "আসবাবপত্র",
        slug: "furniture",
        icon: "🪑",
        count: 85
      },
      {
        id: "kitchenappliances",
        nameEN: "Kitchen Appliances",
        nameBN: "রান্নাঘরের সরঞ্জাম",
        slug: "kitchenappliances",
        icon: "🍳",
        count: 75
      },
      {
        id: "decor",
        nameEN: "Home Decor",
        nameBN: "হোম ডেকোর",
        slug: "decor",
        icon: "🏺",
        count: 50
      }
    ]
  },
  {
    id: "books",
    nameEN: "Books & Stationery",
    nameBN: "বই ও স্টেশনারি",
    slug: "books",
    icon: "📚",
    count: 150,
    subCategories: [
      {
        id: "academic",
        nameEN: "Academic Books",
        nameBN: "একাডেমিক বই",
        slug: "academic",
        icon: "📘",
        count: 60
      },
      {
        id: "novels",
        nameEN: "Novels",
        nameBN: "উপন্যাস",
        slug: "novels",
        icon: "📕",
        count: 50
      },
      {
        id: "stationery",
        nameEN: "Stationery Items",
        nameBN: "স্টেশনারি আইটেম",
        slug: "stationery",
        icon: "✏️",
        count: 40
      }
    ]
  }
];

// প্রোডাক্টের অ্যাট্রিবিউট টাইপ
export interface ProductAttribute {
  id: string;
  name: string;
  nameBN: string;
  options: {
    id: string;
    value: string;
    valueBN: string;
  }[];
}

// প্রোডাক্টের অ্যাট্রিবিউট ডেটা
export const productAttributes: Record<string, ProductAttribute[]> = {
  electronics: [
    {
      id: "brand",
      name: "Brand",
      nameBN: "ব্র্যান্ড",
      options: [
        { id: "samsung", value: "Samsung", valueBN: "স্যামসাং" },
        { id: "apple", value: "Apple", valueBN: "অ্যাপল" },
        { id: "xiaomi", value: "Xiaomi", valueBN: "শাওমি" },
        { id: "lenovo", value: "Lenovo", valueBN: "লেনোভো" },
        { id: "hp", value: "HP", valueBN: "এইচপি" }
      ]
    },
    {
      id: "color",
      name: "Color",
      nameBN: "রঙ",
      options: [
        { id: "black", value: "Black", valueBN: "কালো" },
        { id: "white", value: "White", valueBN: "সাদা" },
        { id: "blue", value: "Blue", valueBN: "নীল" },
        { id: "red", value: "Red", valueBN: "লাল" },
        { id: "grey", value: "Grey", valueBN: "ধূসর" }
      ]
    },
    {
      id: "storage",
      name: "Storage",
      nameBN: "স্টোরেজ",
      options: [
        { id: "64gb", value: "64GB", valueBN: "৬৪ জিবি" },
        { id: "128gb", value: "128GB", valueBN: "১২৮ জিবি" },
        { id: "256gb", value: "256GB", valueBN: "২৫৬ জিবি" },
        { id: "512gb", value: "512GB", valueBN: "৫১২ জিবি" },
        { id: "1tb", value: "1TB", valueBN: "১ টিবি" }
      ]
    }
  ],
  clothing: [
    {
      id: "size",
      name: "Size",
      nameBN: "সাইজ",
      options: [
        { id: "xs", value: "XS", valueBN: "এক্সএস" },
        { id: "s", value: "S", valueBN: "এস" },
        { id: "m", value: "M", valueBN: "এম" },
        { id: "l", value: "L", valueBN: "এল" },
        { id: "xl", value: "XL", valueBN: "এক্সএল" },
        { id: "xxl", value: "XXL", valueBN: "ডাবল এক্সএল" }
      ]
    },
    {
      id: "color",
      name: "Color",
      nameBN: "রঙ",
      options: [
        { id: "black", value: "Black", valueBN: "কালো" },
        { id: "white", value: "White", valueBN: "সাদা" },
        { id: "blue", value: "Blue", valueBN: "নীল" },
        { id: "red", value: "Red", valueBN: "লাল" },
        { id: "green", value: "Green", valueBN: "সবুজ" },
        { id: "yellow", value: "Yellow", valueBN: "হলুদ" }
      ]
    },
    {
      id: "material",
      name: "Material",
      nameBN: "উপাদান",
      options: [
        { id: "cotton", value: "Cotton", valueBN: "সুতি" },
        { id: "polyester", value: "Polyester", valueBN: "পলিয়েস্টার" },
        { id: "wool", value: "Wool", valueBN: "পশম" },
        { id: "silk", value: "Silk", valueBN: "রেশম" },
        { id: "linen", value: "Linen", valueBN: "লিনেন" }
      ]
    }
  ]
};
