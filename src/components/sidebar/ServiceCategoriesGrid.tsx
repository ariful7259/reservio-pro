import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, ChevronRight, ChevronDown,
  Building, User, DoorOpen, Hotel, Plus, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';

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

interface CustomService {
  id: string;
  name: string;
  icon: string; // Icon ID stored as string
}

export const ServiceCategoriesGrid = () => {
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  
  // Load custom services from localStorage when component mounts
  useEffect(() => {
    const savedServices = localStorage.getItem('customServices');
    if (savedServices) {
      try {
        setCustomServices(JSON.parse(savedServices));
      } catch (error) {
        console.error('Error parsing stored services:', error);
      }
    }
  }, []);
  
  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories: ServiceCategory[] = useMemo(() => [
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
  ], []);

  // সার্ভিস ক্যাটাগরি প্রদর্শন - বাটন ক্লিক অনুযায়ী
  const displayedCategories = useMemo(() => 
    showAllCategories ? serviceCategories : serviceCategories.slice(0, 4),
  [showAllCategories, serviceCategories]);
  
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategory(prevExpanded => 
      prevExpanded === categoryName ? null : categoryName
    );
  };
  
  const renderSubCategories = (subCategories: ServiceSubCategory[]) => (
    <div className="grid grid-cols-2 gap-2">
      {subCategories.map((subCat, subIdx) => (
        <Link
          key={`sub-${subIdx}`}
          to={subCat.path}
          className="flex flex-col items-center text-center p-1 hover:bg-blue-100 rounded-md transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm">
            {subCat.icon}
          </div>
          <span className="text-xs">{subCat.name}</span>
        </Link>
      ))}
    </div>
  );
  
  // Handle navigation to feature selection page
  const goToFeatureSelection = () => {
    navigate('/feature-selection');
  };
  
  // Remove a custom service
  const handleRemoveCustomService = (id: string) => {
    const updatedServices = customServices.filter(service => service.id !== id);
    setCustomServices(updatedServices);
    localStorage.setItem('customServices', JSON.stringify(updatedServices));
    toast.info("সার্ভিস মুছে ফেলা হয়েছে");
  };
  
  // Helper function to render the proper icon based on stored icon ID
  const renderServiceIcon = (iconId: string) => {
    switch (iconId) {
      case 'feature-1':
        return <PaintBucket className="h-6 w-6 text-pink-500" />;
      case 'feature-2':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'feature-3':
        return <Home className="h-6 w-6 text-green-500" />;
      case 'feature-4':
        return <AirVent className="h-6 w-6 text-purple-500" />;
      case 'feature-5':
        return <Wrench className="h-6 w-6 text-amber-500" />;
      case 'feature-6':
        return <Hammer className="h-6 w-6 text-yellow-500" />;
      case 'feature-7':
        return <Pipette className="h-6 w-6 text-teal-500" />;
      case 'feature-8':
        return <HousePlus className="h-6 w-6 text-indigo-500" />;
      case 'feature-9':
        return <Building className="h-6 w-6 text-primary" />;
      case 'feature-10':
        return <Hotel className="h-6 w-6 text-green-500" />;
      case 'feature-11':
        return <DoorOpen className="h-6 w-6 text-purple-500" />;
      case 'feature-12':
        return <User className="h-6 w-6 text-red-500" />;
      default:
        return <Wrench className="h-6 w-6 text-primary" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">সার্ভিস ক্যাটাগরি</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {displayedCategories.map((category, index) => (
          <div key={index} className="flex flex-col">
            {category.subCategories ? (
              <Collapsible
                open={expandedCategory === category.name}
                onOpenChange={() => toggleCategoryExpansion(category.name)}
              >
                <CollapsibleTrigger className="w-full" asChild>
                  <div className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
                      {category.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-center line-clamp-1">{category.name}</span>
                      {expandedCategory === category.name ? 
                        <ChevronDown className="h-3 w-3 text-primary" /> : 
                        <ChevronRight className="h-3 w-3 text-gray-500" />
                      }
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 bg-gray-50 rounded-lg p-2 shadow-sm border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                  {renderSubCategories(category.subCategories)}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link 
                to={category.path}
                className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
                  {category.icon}
                </div>
                <span className="text-xs font-medium text-center line-clamp-2">{category.name}</span>
              </Link>
            )}
          </div>
        ))}

        {/* Custom services */}
        {customServices.map((service) => (
          <div key={service.id} className="flex flex-col">
            <div className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm relative">
              <button 
                onClick={() => handleRemoveCustomService(service.id)}
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                aria-label="Remove service"
              >
                <X className="h-3 w-3 text-red-600" />
              </button>
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
                {renderServiceIcon(service.id)}
              </div>
              <span className="text-xs font-medium text-center line-clamp-2">{service.name}</span>
            </div>
          </div>
        ))}

        {/* Add button */}
        <div className="flex flex-col">
          <button 
            onClick={goToFeatureSelection}
            className="flex flex-col items-center justify-center p-2 border border-dashed rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors h-full min-h-[90px]"
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs font-medium text-center text-primary">সার্ভিস যোগ করুন</span>
          </button>
        </div>
      </div>
      
      {/* আরও দেখুন বাটন */}
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-center gap-1 text-primary hover:bg-blue-50"
        onClick={() => setShowAllCategories(!showAllCategories)}
      >
        {showAllCategories ? "কম দেখুন" : "আরও দেখুন"}
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showAllCategories ? 'rotate-90' : ''}`} />
      </Button>
    </div>
  );
};
