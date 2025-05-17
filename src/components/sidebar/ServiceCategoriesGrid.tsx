
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  icon: React.ReactNode;
}

export const ServiceCategoriesGrid = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  
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
  
  // Add a new custom service
  const handleAddCustomService = () => {
    if (customServices.length >= 10) {
      toast.warning("সর্বাধিক ১০টি সার্ভিস যোগ করা যাবে");
      return;
    }
    
    if (!newServiceName.trim()) {
      toast.error("সার্ভিসের নাম দিন");
      return;
    }
    
    const newService: CustomService = {
      id: `custom-${Date.now()}`,
      name: newServiceName.trim(),
      icon: <Wrench className="h-6 w-6 text-primary" />
    };
    
    setCustomServices(prev => [...prev, newService]);
    setNewServiceName('');
    setShowAddForm(false);
    toast.success("নতুন সার্ভিস যোগ করা হয়েছে");
  };
  
  // Remove a custom service
  const handleRemoveCustomService = (id: string) => {
    setCustomServices(prev => prev.filter(service => service.id !== id));
    toast.info("সার্ভিস মুছে ফেলা হয়েছে");
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
                {service.icon}
              </div>
              <span className="text-xs font-medium text-center line-clamp-2">{service.name}</span>
            </div>
          </div>
        ))}

        {/* Add button */}
        {customServices.length < 10 && (
          <div className="flex flex-col">
            {showAddForm ? (
              <div className="flex flex-col items-center justify-center p-2 border rounded-lg shadow-sm">
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="সার্ভিসের নাম"
                  className="w-full p-1 mb-2 border rounded text-xs"
                />
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={handleAddCustomService}
                    className="flex-1 text-xs bg-primary text-white rounded py-1 hover:bg-primary/90"
                  >
                    যোগ করুন
                  </button>
                  <button 
                    onClick={() => {
                      setShowAddForm(false);
                      setNewServiceName('');
                    }}
                    className="flex-1 text-xs bg-gray-200 rounded py-1 hover:bg-gray-300"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex flex-col items-center justify-center p-2 border border-dashed rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors h-full min-h-[90px]"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-center text-primary">নতুন সার্ভিস</span>
              </button>
            )}
          </div>
        )}
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
