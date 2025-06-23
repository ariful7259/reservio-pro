
import React from 'react';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, Building, User, 
  DoorOpen, Hotel 
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
    name: "পেইন্টিং", 
    icon: <PaintBucket className="h-6 w-6 text-pink-500" />,
    path: "/services/category/painting" 
  },
  { 
    name: "প্যাকার্স & মুভার্স", 
    icon: <Truck className="h-6 w-6 text-blue-500" />,
    path: "/services/category/packers-movers" 
  },
  { 
    name: "হোম ক্লিনিং", 
    icon: <Home className="h-6 w-6 text-green-500" />,
    path: "/services/category/home-cleaning" 
  },
  { 
    name: "এসি রিপেয়ার", 
    icon: <AirVent className="h-6 w-6 text-purple-500" />,
    path: "/services/category/ac-repair" 
  },
  { 
    name: "ইলেকট্রিশিয়ান", 
    icon: <Hammer className="h-6 w-6 text-yellow-500" />,
    path: "/services/category/electrician" 
  },
  { 
    name: "কার্পেন্ট্রি", 
    icon: <Wrench className="h-6 w-6 text-amber-500" />,
    path: "/services/category/carpentry" 
  },
  { 
    name: "প্লাম্বিং", 
    icon: <Pipette className="h-6 w-6 text-teal-500" />,
    path: "/services/category/plumbing" 
  },
  { 
    name: "হোম রেনোভেশন", 
    icon: <HousePlus className="h-6 w-6 text-indigo-500" />,
    path: "/services/category/home-renovation" 
  }
];
