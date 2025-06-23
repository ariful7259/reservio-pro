
import React from 'react';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, Building, User, 
  DoorOpen, Hotel, Scissors, Utensils, Camera,
  Car, Computer, Briefcase, Heart, ShieldCheck,
  Book, Music, Gamepad2, Shirt, Baby,
  FlowerIcon as Flower, Package, Zap
} from 'lucide-react';
import { ServiceCategory } from './serviceTypes';

export const serviceCategories: ServiceCategory[] = [
  { 
    name: "বাসা/বাড়ি", 
    icon: <Home className="h-6 w-6 text-primary" />,
    path: "/rental-category/house",
    subCategories: [
      { 
        name: "ফ্ল্যাট", 
        icon: <Building className="h-5 w-5 text-primary" />,
        path: "/rental-category/flat" 
      },
      { 
        name: "অ্যাপার্টমেন্ট", 
        icon: <Building className="h-5 w-5 text-blue-500" />,
        path: "/rental-category/apartment" 
      },
      { 
        name: "মেস", 
        icon: <User className="h-5 w-5 text-amber-500" />,
        path: "/rental-category/mess" 
      },
      { 
        name: "হোস্টেল", 
        icon: <Hotel className="h-5 w-5 text-green-500" />,
        path: "/rental-category/hostel" 
      },
      { 
        name: "সিঙ্গেল রুম", 
        icon: <DoorOpen className="h-5 w-5 text-purple-500" />,
        path: "/rental-category/single-room" 
      },
      { 
        name: "শেয়ার্ড রুম", 
        icon: <User className="h-5 w-5 text-red-500" />,
        path: "/rental-category/shared-room" 
      }
    ] 
  },
  { 
    name: "হোম সার্ভিস", 
    icon: <Home className="h-6 w-6 text-green-500" />,
    path: "/services/category/home-services",
    subCategories: [
      { 
        name: "হোম ক্লিনিং", 
        icon: <Home className="h-5 w-5 text-green-500" />,
        path: "/services/category/home-cleaning" 
      },
      { 
        name: "পেইন্টিং", 
        icon: <PaintBucket className="h-5 w-5 text-pink-500" />,
        path: "/services/category/painting" 
      },
      { 
        name: "প্লাম্বিং", 
        icon: <Pipette className="h-5 w-5 text-teal-500" />,
        path: "/services/category/plumbing" 
      },
      { 
        name: "ইলেকট্রিশিয়ান", 
        icon: <Zap className="h-5 w-5 text-yellow-500" />,
        path: "/services/category/electrician" 
      },
      { 
        name: "এসি রিপেয়ার", 
        icon: <AirVent className="h-5 w-5 text-purple-500" />,
        path: "/services/category/ac-repair" 
      },
      { 
        name: "কার্পেন্ট্রি", 
        icon: <Wrench className="h-5 w-5 text-amber-500" />,
        path: "/services/category/carpentry" 
      }
    ] 
  },
  { 
    name: "ব্যক্তিগত সেবা", 
    icon: <User className="h-6 w-6 text-blue-500" />,
    path: "/services/category/personal-services",
    subCategories: [
      { 
        name: "চুল কাটা", 
        icon: <Scissors className="h-5 w-5 text-pink-500" />,
        path: "/services/category/hair-cut" 
      },
      { 
        name: "বিউটি সেবা", 
        icon: <Heart className="h-5 w-5 text-red-500" />,
        path: "/services/category/beauty-service" 
      },
      { 
        name: "ম্যাসাজ থেরাপি", 
        icon: <Heart className="h-5 w-5 text-purple-500" />,
        path: "/services/category/massage-therapy" 
      }
    ] 
  },
  { 
    name: "পরিবহন", 
    icon: <Truck className="h-6 w-6 text-blue-500" />,
    path: "/services/category/transportation",
    subCategories: [
      { 
        name: "প্যাকার্স & মুভার্স", 
        icon: <Truck className="h-5 w-5 text-blue-500" />,
        path: "/services/category/packers-movers" 
      },
      { 
        name: "কার রেন্টাল", 
        icon: <Car className="h-5 w-5 text-green-500" />,
        path: "/services/category/car-rental" 
      },
      { 
        name: "ডেলিভারি সেবা", 
        icon: <Package className="h-5 w-5 text-amber-500" />,
        path: "/services/category/delivery-service" 
      }
    ] 
  },
  { 
    name: "খাবার ও রান্না", 
    icon: <Utensils className="h-6 w-6 text-orange-500" />,
    path: "/services/category/food-cooking",
    subCategories: [
      { 
        name: "হোম কুকিং", 
        icon: <Utensils className="h-5 w-5 text-orange-500" />,
        path: "/services/category/home-cooking" 
      },
      { 
        name: "ক্যাটারিং", 
        icon: <Utensils className="h-5 w-5 text-red-500" />,
        path: "/services/category/catering" 
      }
    ] 
  },
  { 
    name: "ইভেন্ট ও ফটোগ্রাফি", 
    icon: <Camera className="h-6 w-6 text-indigo-500" />,
    path: "/services/category/event-photography",
    subCategories: [
      { 
        name: "ফটোগ্রাফি", 
        icon: <Camera className="h-5 w-5 text-indigo-500" />,
        path: "/services/category/photography" 
      },
      { 
        name: "ইভেন্ট ম্যানেজমেন্ট", 
        icon: <Briefcase className="h-5 w-5 text-purple-500" />,
        path: "/services/category/event-management" 
      }
    ] 
  },
  { 
    name: "প্রযুক্তি ও কম্পিউটার", 
    icon: <Computer className="h-6 w-6 text-cyan-500" />,
    path: "/services/category/tech-computer",
    subCategories: [
      { 
        name: "কম্পিউটার রিপেয়ার", 
        icon: <Computer className="h-5 w-5 text-cyan-500" />,
        path: "/services/category/computer-repair" 
      },
      { 
        name: "সফটওয়্যার সেবা", 
        icon: <Computer className="h-5 w-5 text-blue-500" />,
        path: "/services/category/software-service" 
      }
    ] 
  },
  { 
    name: "আইনি ও পরামর্শ", 
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    path: "/services/category/legal-consultation",
    subCategories: [
      { 
        name: "আইনি পরামর্শ", 
        icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
        path: "/services/category/legal-advice" 
      },
      { 
        name: "ব্যবসায়িক পরামর্শ", 
        icon: <Briefcase className="h-5 w-5 text-blue-500" />,
        path: "/services/category/business-consultation" 
      }
    ] 
  },
  { 
    name: "শিক্ষা ও প্রশিক্ষণ", 
    icon: <Book className="h-6 w-6 text-violet-500" />,
    path: "/services/category/education-training",
    subCategories: [
      { 
        name: "টিউশন", 
        icon: <Book className="h-5 w-5 text-violet-500" />,
        path: "/services/category/tuition" 
      },
      { 
        name: "ভাষা শেখানো", 
        icon: <Book className="h-5 w-5 text-green-500" />,
        path: "/services/category/language-teaching" 
      },
      { 
        name: "দক্ষতা উন্নয়ন", 
        icon: <Briefcase className="h-5 w-5 text-amber-500" />,
        path: "/services/category/skill-development" 
      }
    ] 
  },
  { 
    name: "বিনোদন", 
    icon: <Music className="h-6 w-6 text-pink-500" />,
    path: "/services/category/entertainment",
    subCategories: [
      { 
        name: "সঙ্গীত শিক্ষা", 
        icon: <Music className="h-5 w-5 text-pink-500" />,
        path: "/services/category/music-teaching" 
      },
      { 
        name: "গেমিং কোচিং", 
        icon: <Gamepad2 className="h-5 w-5 text-purple-500" />,
        path: "/services/category/gaming-coaching" 
      }
    ] 
  },
  { 
    name: "ফ্যাশন ও সেলাই", 
    icon: <Shirt className="h-6 w-6 text-rose-500" />,
    path: "/services/category/fashion-tailoring",
    subCategories: [
      { 
        name: "কাপড় সেলাই", 
        icon: <Shirt className="h-5 w-5 text-rose-500" />,
        path: "/services/category/cloth-tailoring" 
      },
      { 
        name: "ডিজাইন সেবা", 
        icon: <PaintBucket className="h-5 w-5 text-purple-500" />,
        path: "/services/category/design-service" 
      }
    ] 
  },
  { 
    name: "শিশু ও পরিবার", 
    icon: <Baby className="h-6 w-6 text-yellow-500" />,
    path: "/services/category/baby-family",
    subCategories: [
      { 
        name: "বেবি সিটিং", 
        icon: <Baby className="h-5 w-5 text-yellow-500" />,
        path: "/services/category/baby-sitting" 
      },
      { 
        name: "এল্ডার কেয়ার", 
        icon: <Heart className="h-5 w-5 text-green-500" />,
        path: "/services/category/elder-care" 
      }
    ] 
  },
  { 
    name: "বাগান ও গাছপালা", 
    icon: <Flower className="h-6 w-6 text-green-600" />,
    path: "/services/category/garden-plants",
    subCategories: [
      { 
        name: "গার্ডেনিং", 
        icon: <Flower className="h-5 w-5 text-green-600" />,
        path: "/services/category/gardening" 
      },
      { 
        name: "ল্যান্ডস্কেপিং", 
        icon: <Flower className="h-5 w-5 text-emerald-500" />,
        path: "/services/category/landscaping" 
      }
    ] 
  },
  { 
    name: "হোম রেনোভেশন", 
    icon: <HousePlus className="h-6 w-6 text-indigo-500" />,
    path: "/services/category/home-renovation",
    subCategories: [
      { 
        name: "ইন্টেরিয়র ডিজাইন", 
        icon: <HousePlus className="h-5 w-5 text-indigo-500" />,
        path: "/services/category/interior-design" 
      },
      { 
        name: "এক্সটেরিয়র ডিজাইন", 
        icon: <Building className="h-5 w-5 text-blue-500" />,
        path: "/services/category/exterior-design" 
      }
    ] 
  }
];
