
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Shield, 
  Info
} from 'lucide-react';
import RentalBookingCalendar from '@/components/rental/RentalBookingCalendar';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import OfflineIndicator from '@/components/housing/OfflineIndicator';

// মক ডেটা - বাস্তব অ্যাপে এটি API থেকে আসবে
const rentalItemsData = {
  "electronics": [
    {
      id: "e1",
      name: "ম্যাকবুক প্রো ১৬ ইঞ্চি",
      category: "ল্যাপটপ",
      mainCategory: "ইলেকট্রনিক্স",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      price: 800,
      priceUnit: "দিন",
      location: "মিরপুর, ঢাকা",
      rating: 4.9,
      description: "আধুনিক ১৬ ইঞ্চি ম্যাকবুক প্রো, ১০ কোর প্রসেসর, ৩২জিবি র‍্যাম, ১টিবি এসএসডি স্টোরেজ। উচ্চ প্রযুক্তির কাজ ও গ্রাফিক্স ডিজাইনের জন্য উপযুক্ত।",
      minRentalDays: 1,
      depositRequired: 30,
      owner: "আকাশ চক্রবর্তী",
      contact: "01712-345678",
      availability: "সকাল ৯টা - রাত ৮টা",
      features: [
        "১ বছর ওয়ারেন্টি",
        "জেনুইন চার্জার",
        "প্রোটেক্টিভ কেস",
        "২৪/৭ টেকনিক্যাল সাপোর্ট"
      ],
      policy: "কোন ধরণের ক্ষতি করা যাবে না। ডাউন পেমেন্ট প্রয়োজন।"
    },
    {
      id: "e2",
      name: "আইফোন ১৩ প্রো",
      category: "স্মার্টফোন",
      mainCategory: "ইলেকট্রনিক্স",
      image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1000&auto=format&fit=crop",
      price: 500,
      priceUnit: "দিন",
      location: "গুলশান, ঢাকা",
      rating: 4.8,
      description: "আধুনিক আইফোন ১৩ প্রো মডেল, উন্নত ক্যামেরা সিস্টেম, ফেস আইডি, ১২৮ জিবি স্টোরেজ। বিশেষ অনুষ্ঠান বা ভ্রমণের জন্য উপযুক্ত।",
      minRentalDays: 1,
      depositRequired: 40,
      owner: "মঈন খান",
      contact: "01812-345678",
      availability: "সকাল ১০টা - রাত ৯টা",
      features: [
        "অরিজিনাল চার্জার",
        "স্ক্রিন প্রোটেক্টর",
        "ব্যাক কভার",
        "ইমার্জেন্সি সাপোর্ট"
      ],
      policy: "সঠিক অবস্থায় ফেরত দিতে হবে। কোন ধরণের নষ্ট হলে ফুল পেমেন্ট দিতে হবে।"
    }
  ],
  "transportation": [
    {
      id: "t1",
      name: "টয়োটা প্রিয়াস হাইব্রিড",
      category: "কার",
      mainCategory: "পরিবহন",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      price: 3000,
      priceUnit: "দিন",
      location: "বনানী, ঢাকা",
      rating: 4.7,
      description: "ফুয়েল-ইফিশিয়েন্ট টয়োটা প্রিয়াস হাইব্রিড। আরামদায়ক, নির্ভরযোগ্য এবং পরিবেশবান্ধব। চলাচলের জন্য এবং বিভিন্ন উপলক্ষে ভাড়া নেওয়া যাবে।",
      minRentalDays: 1,
      depositRequired: 20,
      owner: "জহির উদ্দিন",
      contact: "01612-345678",
      availability: "২৪ ঘন্টা",
      features: [
        "ফুল টেংক ফুয়েল",
        "এসি",
        "বীমাকৃত",
        "বিনামূল্যে ড্রাইভার"
      ],
      policy: "গাড়ি ব্যবহারের নিয়ম মেনে চলতে হবে। কোন ধরণের এক্সিডেন্ট হলে বীমা কভার করবে।"
    },
    {
      id: "t2",
      name: "হোন্ডা সিবিআর বাইক",
      category: "বাইক",
      mainCategory: "পরিবহন",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop",
      price: 1000,
      priceUnit: "দিন",
      location: "ধানমন্ডি, ঢাকা",
      rating: 4.5,
      description: "১৫০সিসি হোন্ডা সিবিআর বাইক। দ্রুত এবং আরামদায়ক। শহরের মধ্যে চলাচলের জন্য উপযুক্ত।",
      minRentalDays: 1,
      depositRequired: 25,
      owner: "শফিক ইসলাম",
      contact: "01912-345678",
      availability: "সকাল ৮টা - রাত ১০টা",
      features: [
        "হেলমেট",
        "বীমাকৃত",
        "রেইন কোট",
        "ফুল টেংক ফুয়েল"
      ],
      policy: "ট্রাফিক নিয়ম অনুসরণ করতে হবে। ডাউন পেমেন্ট প্রয়োজন।"
    }
  ],
  "event": [
    {
      id: "ev1",
      name: "বড় সাইজ ইভেন্ট টেন্ট",
      category: "ইভেন্ট সামগ্রী",
      mainCategory: "ইভেন্ট সামগ্রী",
      image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?q=80&w=1000&auto=format&fit=crop",
      price: 5000,
      priceUnit: "দিন",
      location: "উত্তরা, ঢাকা",
      rating: 4.6,
      description: "বড় সাইজ ইভেন্ট টেন্ট, প্রায় ১০০ জন লোক ধারণ করতে পারে। বিভিন্ন অনুষ্ঠানের জন্য উপযুক্ত।",
      minRentalDays: 1,
      depositRequired: 15,
      owner: "আনোয়ার হোসেন",
      contact: "01512-345678",
      availability: "সকাল ৯টা - সন্ধ্যা ৬টা",
      features: [
        "সেট-আপ সাপোর্ট",
        "টেবিল চেয়ার",
        "ডেকোরেশন",
        "সাউন্ড সিস্টেম"
      ],
      policy: "অনুষ্ঠান শেষে পরিষ্কার করতে হবে। কোন ধরণের ক্ষতি হলে ক্ষতিপূরণ দিতে হবে।"
    }
  ],
  "home": [
    {
      id: "h1",
      name: "মডার্ন সোফা সেট",
      category: "ফার্নিচার",
      mainCategory: "ঘরোয়া সামগ্রী",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
      price: 1200,
      priceUnit: "মাস",
      location: "বসুন্ধরা, ঢাকা",
      rating: 4.4,
      description: "আধুনিক ডিজাইনের সোফা সেট, ৩+২+১ কম্বিনেশন। আরামদায়ক এবং টেকসই।",
      minRentalDays: 30,
      depositRequired: 30,
      owner: "শাহীন আলম",
      contact: "01312-345678",
      availability: "সকাল ১০টা - সন্ধ্যা ৭টা",
      features: [
        "ফ্রি ডেলিভারি",
        "ফ্রি ইনস্টলেশন",
        "রিপ্লেসমেন্ট গ্যারান্টি",
        "প্রফেশনাল অ্যাসেম্বলি"
      ],
      policy: "ন্যূনতম ১ মাস রেন্ট নিতে হবে। পরিষ্কার অবস্থায় ফেরত দিতে হবে।"
    }
  ],
  "education": [
    {
      id: "ed1",
      name: "বিসিএস পরীক্ষা প্রস্তুতি বই সেট",
      category: "বই",
      mainCategory: "শিক্ষা সামগ্রী",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
      price: 500,
      priceUnit: "মাস",
      location: "শাহবাগ, ঢাকা",
      rating: 4.9,
      description: "বিসিএস প্রিলিমিনারি এবং লিখিত পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি বই সেট। সকল বিষয় কভার করা হয়েছে।",
      minRentalDays: 30,
      depositRequired: 50,
      owner: "মাহফুজ রহমান",
      contact: "01812-345678",
      availability: "সকাল ১১টা - সন্ধ্যা ৮টা",
      features: [
        "আপডেটেড কন্টেন্ট",
        "সকল বিষয়",
        "প্রশ্নব্যাংক",
        "সলভড পেপার"
      ],
      policy: "বই কোন পেইজে মার্কিং করা যাবে না। ক্ষতিগ্রস্ত হলে ক্ষতিপূরণ দিতে হবে।"
    }
  ],
  "agriculture": [
    {
      id: "a1",
      name: "পাওয়ার টিলার",
      category: "কৃষি যন্ত্রপাতি",
      mainCategory: "কৃষি যন্ত্রপাতি",
      image: "https://images.unsplash.com/photo-1599909143067-1763c1e8af3a?q=80&w=1000&auto=format&fit=crop",
      price: 1500,
      priceUnit: "দিন",
      location: "সাভার, ঢাকা",
      rating: 4.7,
      description: "আধুনিক পাওয়ার টিলার, জমি চাষের জন্য উপযুক্ত। ডিজেল ইঞ্জিন, কম ফুয়েল খরচ।",
      minRentalDays: 1,
      depositRequired: 20,
      owner: "শফিউল আলম",
      contact: "01612-345678",
      availability: "সকাল ৮টা - সন্ধ্যা ৫টা",
      features: [
        "প্রশিক্ষিত অপারেটর",
        "মেইনটেনেন্স সাপোর্ট",
        "ফ্রি সার্ভিসিং",
        "ফ্রি ডেলিভারি"
      ],
      policy: "অপারেটর ছাড়া চালানো যাবে না। জমির আয়তন আগেই জানাতে হবে।"
    }
  ],
  "business": [
    {
      id: "b1",
      name: "প্রজেক্টর সেট",
      category: "অফিস সরঞ্জাম",
      mainCategory: "ব্যবসায়িক সামগ্রী",
      image: "https://images.unsplash.com/photo-1517457210348-703d87d7e5be?q=80&w=1000&auto=format&fit=crop",
      price: 800,
      priceUnit: "দিন",
      location: "মতিঝিল, ঢাকা",
      rating: 4.5,
      description: "হাই কোয়ালিটি HD প্রজেক্টর সেট, স্ক্রিন এবং সাউন্ড সিস্টেম সহ। মিটিং, সেমিনার, ও প্রেজেন্টেশনের জন্য উপযুক্ত।",
      minRentalDays: 1,
      depositRequired: 40,
      owner: "হাসান মাহমুদ",
      contact: "01712-345678",
      availability: "সকাল ৯টা - রাত ৮টা",
      features: [
        "HD প্রজেকশন",
        "সাউন্ড সিস্টেম",
        "টেকনিক্যাল সাপোর্ট",
        "ব্যাকআপ সিস্টেম"
      ],
      policy: "ইকুইপমেন্ট সাবধানে ব্যবহার করতে হবে। কোন ধরণের ক্ষতি হলে ক্ষতিপূরণ দিতে হবে।"
    }
  ],
  "tools": [
    {
      id: "tool1",
      name: "পাওয়ার ড্রিল সেট",
      category: "কারিগরি টুলস",
      mainCategory: "কারিগরি টুলস",
      image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?q=80&w=1000&auto=format&fit=crop",
      price: 400,
      priceUnit: "দিন",
      location: "মিরপুর, ঢাকা",
      rating: 4.6,
      description: "প্রফেশনাল পাওয়ার ড্রিল সেট, বিভিন্ন সাইজের বিট সহ। দেয়াল, কাঠ, মেটাল সবক্ষেত্রে ব্যবহারযোগ্য।",
      minRentalDays: 1,
      depositRequired: 30,
      owner: "মাসুদ রানা",
      contact: "01912-345678",
      availability: "সকাল ৯টা - সন্ধ্যা ৬টা",
      features: [
        "মাল্টিপারপাস বিট",
        "ব্যাটারি ব্যাকআপ",
        "কেস",
        "ফ্রি কনসাল্টেশন"
      ],
      policy: "সঠিক নিয়মে ব্যবহার করতে হবে। সকল যন্ত্রপাতি সঠিকভাবে ফেরত দিতে হবে।"
    }
  ]
};

const RentalItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedTab, setSelectedTab] = useState('details');

  // ইন্টারনেট কানেকশন চেক
  React.useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // আইটেম খুঁজে বের করা
  const findItem = (id?: string): any => {
    if (!id) return null;
    
    for (const category in rentalItemsData) {
      const items = rentalItemsData[category as keyof typeof rentalItemsData];
      const foundItem = items.find(item => item.id === id);
      if (foundItem) return foundItem;
    }
    return null;
  };

  const item = findItem(id);

  // যদি আইটেম না পাওয়া যায়
  if (!item) {
    return (
      <div className="container px-4 pt-20 pb-20 min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Info className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">আইটেম পাওয়া যায়নি</h2>
              <p className="mb-4 text-gray-600">
                আপনার খোঁজা আইটেমটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
              </p>
              <Button onClick={() => navigate(-1)}>ফিরে যান</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBookingComplete = (bookingData: any) => {
    toast({
      title: "রেন্টাল বুকিং সফল হয়েছে",
      description: `${item.name} সফলভাবে ${bookingData.totalDays} দিনের জন্য রেন্ট করা হয়েছে`,
    });
    
    // বুকিং সফল হলে ইউজারকে কনফার্মেশন পেইজে নিয়ে যায়
    navigate(`/rental-confirmation/${id}`, { 
      state: { 
        bookingData,
        itemDetails: item
      } 
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <OfflineIndicator isOnline={isOnline} language="bn" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-[300px] object-cover"
            />
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge>{item.mainCategory}</Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">
                {item.name}
              </h1>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
                <span className="mx-2">•</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{item.rating}</span>
              </div>
              
              <p className="text-lg font-bold text-primary mb-4">
                ৳ {item.price}/{item.priceUnit}
              </p>

              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">বিবরণ</TabsTrigger>
                  <TabsTrigger value="features">ফিচার</TabsTrigger>
                  <TabsTrigger value="policy">পলিসি</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 pt-4">
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </TabsContent>
                
                <TabsContent value="features" className="pt-4">
                  <ul className="space-y-2">
                    {item.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="policy" className="pt-4">
                  <div className="p-3 bg-blue-50 rounded-md text-blue-800">
                    <p>{item.policy}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">রেন্টাল প্রোভাইডার</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>{item.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>সময়: {item.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{item.contact}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-green-700">ভেরিফাইড প্রোভাইডার</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <RentalBookingCalendar 
            itemName={item.name}
            pricePerDay={item.price}
            minRentalDays={item.minRentalDays}
            depositRequired={item.depositRequired}
            onBookingComplete={handleBookingComplete}
          />
          
          <Card className="bg-blue-50 border border-blue-100">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">নিরাপদ পেমেন্ট ব্যবস্থা</h3>
              <p className="text-sm text-blue-700 mb-2">
                আমাদের এসক্রো সিস্টেমের মাধ্যমে আপনার অর্থ সম্পূর্ণ নিরাপদ থাকবে। রেন্টাল সার্ভিস গ্রহণের পরে আপনি কনফার্ম করলে তবেই বিক্রেতা পেমেন্ট পাবেন।
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>১০০% নিরাপদ পেমেন্ট</li>
                <li>ভেরিফাইড রেন্টাল প্রোভাইডার</li>
                <li>২৪/৭ কাস্টমার সাপোর্ট</li>
                <li>ডিপোজিট রিফান্ডেবল</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentalItemDetail;
