
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Home, 
  Truck, 
  Briefcase, 
  PaintBucket, 
  Wrench,
  MapPin,
  UserPlus,
  FileText,
  CreditCard,
  Clock,
  Map,
  Bike,
  ShoppingBag,
  Check,
  User,
  Calendar,
  Filter,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const RentalFeatures = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  // Rent features
  const rentFeatures = [
    { 
      id: 'home', 
      title: 'Find a Home', 
      banglaTitle: 'বাসা খোঁজুন', 
      description: 'বাসা খোঁজার সার্চ ফিচার',
      icon: <Home className="h-16 w-16 text-primary" />,
      path: '/rent/find-home',
      bgColor: 'bg-primary/5',
      buttonVariant: 'default' as const
    },
    { 
      id: 'roommates', 
      title: 'Roommates', 
      banglaTitle: 'রুমমেট', 
      description: 'রুমমেট খোঁজার অপশন',
      icon: <UserPlus className="h-16 w-16 text-blue-500" />,
      path: '/rent/roommates',
      bgColor: 'bg-blue-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'mess', 
      title: 'Mess Seats', 
      banglaTitle: 'মেস সিট', 
      description: 'মেসের খালি সিটের তালিকা',
      icon: <Briefcase className="h-16 w-16 text-green-500" />,
      path: '/rent/mess-seats',
      bgColor: 'bg-green-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'lease', 
      title: 'Lease Negotiation', 
      banglaTitle: 'লিজ নেগোশিয়েশন', 
      description: 'লিজ দর-কষাকষির সহায়তা',
      icon: <FileText className="h-16 w-16 text-amber-500" />,
      path: '/rent/lease',
      bgColor: 'bg-amber-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'property', 
      title: 'Property Listing', 
      banglaTitle: 'প্রপার্টি লিস্টিং', 
      description: 'সম্পত্তি মালিকদের জন্য লিস্টিং সুবিধা',
      icon: <Building className="h-16 w-16 text-red-500" />,
      path: '/rent/listing',
      bgColor: 'bg-red-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'tenant', 
      title: 'Tenant Management', 
      banglaTitle: 'টেনেন্ট ম্যানেজমেন্ট', 
      description: 'টেনেন্টদের তথ্য সংরক্ষণ ও পরিচালনা',
      icon: <User className="h-16 w-16 text-purple-500" />,
      path: '/rent/tenant',
      bgColor: 'bg-purple-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'payment', 
      title: 'Rent Collection', 
      banglaTitle: 'রেন্ট কালেকশন', 
      description: 'অনলাইন ভাড়া সংগ্রহ এবং পেমেন্ট ট্র্যাকিং',
      icon: <CreditCard className="h-16 w-16 text-pink-500" />,
      path: '/rent/payment',
      bgColor: 'bg-pink-50',
      buttonVariant: 'outline' as const
    },
    { 
      id: 'map', 
      title: 'Map View', 
      banglaTitle: 'ম্যাপ ভিউ', 
      description: 'কাছাকাছি থাকা ভাড়ার সম্পত্তি ম্যাপে দেখা',
      icon: <Map className="h-16 w-16 text-cyan-500" />,
      path: '/rent/map',
      bgColor: 'bg-cyan-50',
      buttonVariant: 'outline' as const
    }
  ];
  
  const additionalFeatures = [
    { 
      id: 'browse', 
      title: 'Browse Rental Items', 
      banglaTitle: 'রেন্টাল আইটেম ব্রাউজ', 
      description: 'বাইসাইকেল, বই, ইলেকট্রনিক্স, আসবাবপত্র ইত্যাদি ভাড়া নেওয়ার সুবিধা',
      icon: <Bike className="h-10 w-10 text-indigo-500" />,
      path: '/rent/browse',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    { 
      id: 'post', 
      title: 'Post Items for Rent', 
      banglaTitle: 'রেন্টের জন্য আইটেম পোস্ট', 
      description: 'ব্যবহারকারীরা নিজেদের জিনিস ভাড়ার জন্য পোস্ট করতে পারবে',
      icon: <ShoppingBag className="h-10 w-10 text-gray-500" />,
      path: '/rent/post',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
    { 
      id: 'category', 
      title: 'Category Search', 
      banglaTitle: 'ক্যাটাগরি সার্চ', 
      description: 'ক্যাটাগরি অনুযায়ী ভাড়া আইটেম ব্রাউজ করা',
      icon: <Filter className="h-10 w-10 text-orange-500" />,
      path: '/rent/category',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    { 
      id: 'agreement', 
      title: 'Rental Agreements', 
      banglaTitle: 'রেন্টাল এগ্রিমেন্ট', 
      description: 'ভাড়ার চুক্তি তৈরির সুবিধা',
      icon: <Check className="h-10 w-10 text-teal-500" />,
      path: '/rent/agreement',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">রেন্ট ফিচারস</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={() => navigate('/rent-anything')}
        >
          সব দেখুন <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-hidden rounded-lg border mb-8 bg-gradient-to-r from-white to-gray-50">
        <Tabs onValueChange={setActiveTab} value={activeTab} className="w-full">
          <TabsList className="flex w-full h-14 justify-start gap-2 border-b bg-transparent p-2 overflow-x-auto scrollbar-thin">
            {rentFeatures.map(feature => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <div className={`p-1 rounded-full ${feature.id === activeTab ? 'text-primary' : 'text-gray-400'}`}>
                  {React.cloneElement(feature.icon, { className: 'h-5 w-5' })}
                </div>
                <span>{feature.banglaTitle}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {rentFeatures.map(feature => (
            <TabsContent key={feature.id} value={feature.id} className="focus-visible:outline-none focus-visible:ring-0 p-6">
              <div className={`rounded-lg ${feature.bgColor} p-8`}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex flex-col items-center text-center md:text-left">
                    <div className="p-5 bg-white rounded-full shadow-md mb-4">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="mb-1">{feature.title}</Badge>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-3">{feature.banglaTitle}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant={feature.buttonVariant} 
                        size="lg"
                        onClick={() => navigate(feature.path)}
                        className="gap-2"
                      >
                        এখনই ব্যবহার করুন
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="lg"
                        onClick={() => navigate(`${feature.path}/help`)}
                      >
                        আরও জানুন
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {additionalFeatures.map(feature => (
          <Card 
            key={feature.id} 
            className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate(feature.path)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${feature.bgColor} mb-3`}>
                {feature.icon}
              </div>
              <h3 className={`font-medium ${feature.color}`}>{feature.banglaTitle}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-center">
              <Button 
                variant="link" 
                className={`text-sm ${feature.color}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(feature.path);
                }}
              >
                ব্যবহার করুন <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentalFeatures;
