
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCategory {
  name: string;
  icon: React.ReactNode;
  path: string;
}

export const ServiceCategoriesGrid = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories: ServiceCategory[] = [
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

  // সার্ভিস ক্যাটাগরি প্রদর্শন - বাটন ক্লিক অনুযায়ী
  const displayedCategories = showAllCategories ? serviceCategories : serviceCategories.slice(0, 4);
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">সার্ভিস ক্যাটাগরি</h3>
      <div className="grid grid-cols-4 gap-3">
        {displayedCategories.map((category, index) => (
          <Link 
            key={index} 
            to={category.path}
            className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
              {category.icon}
            </div>
            <span className="text-xs text-center">{category.name}</span>
          </Link>
        ))}
      </div>
      
      {/* আরও দেখুন বাটন */}
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-center gap-1 text-primary"
        onClick={() => setShowAllCategories(!showAllCategories)}
      >
        {showAllCategories ? "কম দেখুন" : "আরও দেখুন"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
