
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, Building, User, 
  DoorOpen, Hotel, ArrowLeft, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
  category?: string;
  isSelected?: boolean;
}

export const FeatureSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customServicesFromStorage, setCustomServicesFromStorage] = useState<Feature[]>([]);
  
  useEffect(() => {
    // Load existing custom services from local storage
    const savedCustomServices = localStorage.getItem('customServices');
    if (savedCustomServices) {
      const parsedServices = JSON.parse(savedCustomServices);
      setCustomServicesFromStorage(parsedServices);
      // Mark which features are already selected
      const selectedIds = parsedServices.map((service: Feature) => service.id);
      setSelectedFeatures(selectedIds);
    }
  }, []);

  const allFeatures: Feature[] = [
    { 
      id: 'feature-1', 
      name: 'পেইন্টিং',
      icon: <PaintBucket className="h-6 w-6 text-pink-500" />,
      description: 'বাড়ি/অফিসের পেইন্টিং সেবা',
      category: 'হোম সার্ভিস'
    },
    { 
      id: 'feature-2', 
      name: 'প্যাকিং & মুভিং',
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      description: 'জিনিসপত্র প্যাকেজিং এবং স্থানান্তর সেবা',
      category: 'লজিস্টিকস'
    },
    { 
      id: 'feature-3', 
      name: 'হোম ক্লিনিং',
      icon: <Home className="h-6 w-6 text-green-500" />,
      description: 'বাড়ির সম্পূর্ণ পরিষ্কার পরিচ্ছন্নতা সেবা',
      category: 'ক্লিনিং'
    },
    { 
      id: 'feature-4', 
      name: 'এসি রিপেয়ার',
      icon: <AirVent className="h-6 w-6 text-purple-500" />,
      description: 'এয়ার কন্ডিশনার মেরামত এবং সার্ভিসিং',
      category: 'রিপেয়ার'
    },
    { 
      id: 'feature-5', 
      name: 'কার্পেন্ট্রি',
      icon: <Wrench className="h-6 w-6 text-amber-500" />,
      description: 'আসবাবপত্র নির্মাণ ও মেরামত',
      category: 'নির্মাণ'
    },
    { 
      id: 'feature-6', 
      name: 'ইলেকট্রিশিয়ান',
      icon: <Hammer className="h-6 w-6 text-yellow-500" />,
      description: 'ইলেকট্রিক্যাল ফিটিং এবং মেরামত',
      category: 'রিপেয়ার'
    },
    { 
      id: 'feature-7', 
      name: 'প্লাম্বিং',
      icon: <Pipette className="h-6 w-6 text-teal-500" />,
      description: 'পানির পাইপ এবং সেনিটারি ফিটিং',
      category: 'রিপেয়ার'
    },
    { 
      id: 'feature-8', 
      name: 'হোম রেনোভেশন',
      icon: <HousePlus className="h-6 w-6 text-indigo-500" />,
      description: 'বাড়ির আধুনিকীকরণ এবং পুনর্নির্মাণ',
      category: 'নির্মাণ'
    },
    { 
      id: 'feature-9', 
      name: 'বাসা ভাড়া',
      icon: <Building className="h-6 w-6 text-primary" />,
      description: 'বিভিন্ন এরিয়ায় বাসা ভাড়া সেবা',
      category: 'রিয়েল এস্টেট'
    },
    { 
      id: 'feature-10', 
      name: 'মেস/হোস্টেল',
      icon: <Hotel className="h-6 w-6 text-green-500" />,
      description: 'ছাত্র/চাকুরীজীবী মেস এবং হোস্টেল সেবা',
      category: 'রিয়েল এস্টেট'
    },
    { 
      id: 'feature-11', 
      name: 'সিঙ্গেল রুম',
      icon: <DoorOpen className="h-6 w-6 text-purple-500" />,
      description: 'একক ব্যক্তির জন্য রুম ভাড়া সেবা',
      category: 'রিয়েল এস্টেট'
    },
    { 
      id: 'feature-12', 
      name: 'শেয়ার্ড রুম',
      icon: <User className="h-6 w-6 text-red-500" />,
      description: 'শেয়ারিং ভিত্তিতে রুম ভাড়া সেবা',
      category: 'রিয়েল এস্টেট'
    }
  ];
  
  // Toggle selection of a feature
  const toggleFeatureSelection = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(prev => prev.filter(id => id !== featureId));
    } else {
      // Check if max limit of 10 is reached
      if (selectedFeatures.length >= 10) {
        toast.error("সর্বাধিক ১০টি সার্ভিস যোগ করা যাবে");
        return;
      }
      setSelectedFeatures(prev => [...prev, featureId]);
    }
  };
  
  // Save selected features and navigate back
  const saveSelection = () => {
    const selectedFeatureObjects = allFeatures
      .filter(feature => selectedFeatures.includes(feature.id))
      .map(feature => ({
        id: feature.id,
        name: feature.name,
        icon: feature.id // We'll recreate icons on the grid page
      }));
    
    localStorage.setItem('customServices', JSON.stringify(selectedFeatureObjects));
    toast.success("সার্ভিস লিস্ট আপডেট করা হয়েছে");
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">সার্ভিস নির্বাচন করুন</h1>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        সর্বাধিক ১০টি সার্ভিস যোগ করতে পারবেন। বর্তমানে {selectedFeatures.length}টি সিলেক্ট করা আছে।
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {allFeatures.map((feature) => {
          const isSelected = selectedFeatures.includes(feature.id);
          return (
            <div 
              key={feature.id}
              className={`relative border rounded-lg p-4 transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
              }`}
              onClick={() => toggleFeatureSelection(feature.id)}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  {feature.icon}
                </div>
                <h3 className="font-medium">{feature.name}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <Button 
          className="w-full" 
          onClick={saveSelection}
        >
          সিলেক্শন সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default FeatureSelectionPage;
