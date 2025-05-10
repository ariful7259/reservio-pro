
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, ChevronRight, ChevronDown,
  Building, User, DoorOpen, Hotel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ServiceCategory {
  name: string;
  icon: React.ReactNode;
  path: string;
  subCategories?: ServiceSubCategory[];
}

interface ServiceSubCategory {
  name: string;
  icon: React.ReactNode;
  path: string;
}

export const ServiceCategoriesGrid = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories: ServiceCategory[] = [
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

  // সার্ভিস ক্যাটাগরি প্রদর্শন - বাটন ক্লিক অনুযায়ী
  const displayedCategories = showAllCategories ? serviceCategories : serviceCategories.slice(0, 4);
  
  const toggleCategoryExpansion = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">সার্ভিস ক্যাটাগরি</h3>
      <div className="grid grid-cols-4 gap-3">
        {displayedCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            {category.subCategories ? (
              <Collapsible
                open={expandedCategory === category.name}
                onOpenChange={() => toggleCategoryExpansion(category.name)}
              >
                <CollapsibleTrigger className="w-full" asChild>
                  <div className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                      {category.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-center">{category.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 bg-gray-50 rounded-lg p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {category.subCategories.map((subCat, subIdx) => (
                      <Link
                        key={`sub-${subIdx}`}
                        to={subCat.path}
                        className="flex flex-col items-center text-center p-1 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-1">
                          {subCat.icon}
                        </div>
                        <span className="text-xs">{subCat.name}</span>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link 
                to={category.path}
                className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  {category.icon}
                </div>
                <span className="text-xs text-center">{category.name}</span>
              </Link>
            )}
          </div>
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
