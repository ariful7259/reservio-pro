
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Calendar, User, Phone, Shield, AlertTriangle, Clock3, Truck, Check, ChevronRight } from 'lucide-react';
import P2PPaymentModal from '@/components/P2PPaymentModal';
import { useToast } from "@/components/ui/use-toast";
import OfflineIndicator from '@/components/housing/OfflineIndicator';
import { useAuth } from '@/hooks/useAuth';
import { Steps } from '@/components/ui/steps';
import { useTheme } from '@/components/ThemeProvider';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { theme } = useTheme();
  
  // ইন্টারনেট সংযোগ ট্র্যাক করুন
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

  // সার্ভিস বুকিং প্রসেস স্টেপস
  const bookingSteps = [
    { id: "1", label: "ডিটেইলস দেখুন" },
    { id: "2", label: "বুকিং নিশ্চিত করুন" },
    { id: "3", label: "পেমেন্ট করুন" },
    { id: "4", label: "সার্ভিস গ্রহণ করুন" }
  ];

  // Mock service data - In a real app, this would come from an API
  const serviceData = {
    id: Number(id),
    title: "সার্ভিস নাম",
    description: "সার্ভিস বিস্তারিত বর্ণনা। এটি একটি দীর্ঘ বর্ণনা যাতে সেবা সম্পর্কে সবিস্তার জানানো হয়েছে। এই সেবাটি দক্ষ প্রফেশনালদের দ্বারা প্রদান করা হয় এবং সর্বোচ্চ মানের সেবা নিশ্চিত করা হয়। সার্ভিসটি সময়মত, পরিষ্কার-পরিচ্ছন্ন এবং ব্যবহারকারীর সন্তুষ্টি নিশ্চিত করে প্রদান করা হয়।",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
    price: 800,
    priceUnit: "ঘণ্টা",
    location: "ঢাকা",
    rating: 4.8,
    category: "মেরামত",
    provider: "জন ডো",
    experience: "৫ বছর",
    completedJobs: "১২০+",
    availability: "সকাল ৯টা - রাত ৮টা",
    contact: "০১৭৪৯-০০০০০০",
    disputeRate: "১%", // বিবাদের হার যোগ করা হয়েছে
    avgResolutionTime: "৪৮ ঘন্টা", // বিবাদ সমাধানের গড় সময়
    verifiedProvider: true, // প্রোভাইডার ভেরিফাইড কিনা
    insuranceAvailable: true, // সার্ভিসে ইনস্যুরেন্স কভারেজ আছে কিনা
    benefits: [
      "বাড়ি/অফিসে সার্ভিস প্রদান",
      "অভিজ্ঞ টেকনিশিয়ান",
      "১০০% জেনুইন প্রোডাক্ট",
      "৩ মাসের ওয়ারেন্টি"
    ],
    estimatedTime: "৪৫ মিনিট"
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: "দয়া করে লগইন করুন",
        description: "পেমেন্ট করার জন্য আপনাকে প্রথমে লগইন করতে হবে",
        variant: "destructive",
      });
      navigate('/login?redirect=service/' + id);
      return;
    }
    
    if (!isOnline) {
      toast({
        title: "অফলাইন মোড",
        description: "পেমেন্ট করার জন্য ইন্টারনেট সংযোগ প্রয়োজন।",
        variant: "destructive",
      });
      return;
    }
    
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    toast({
      title: "বুকিং সফল",
      description: "আপনার পেমেন্ট সফলভাবে কমপ্লিট হয়েছে।",
    });
  };

  return (
    <div className="container px-4 pt-12 pb-20">
      <OfflineIndicator isOnline={isOnline} language="bn" />
      
      <div className="mb-6">
        <Steps steps={bookingSteps} currentStep={1} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={serviceData.image} 
              alt={serviceData.title}
              className="w-full h-[300px] object-cover"
            />
          </div>
          
          <Card className="overflow-hidden border-0 shadow-md dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {serviceData.title}
                </h1>
                <Badge className="bg-[#41B985] hover:bg-[#41B985]/90 text-white">{serviceData.category}</Badge>
              </div>
              
              {serviceData.verifiedProvider && (
                <Badge variant="outline" className="mb-3 text-[#416CE1] bg-[#416CE1]/10 border-[#416CE1]/20 dark:bg-[#416CE1]/20 dark:text-blue-300">
                  <Shield className="h-3 w-3 mr-1" /> ভেরিফাইড প্রোভাইডার
                </Badge>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <MapPin className="h-4 w-4 text-[#416CE1] dark:text-blue-300" />
                <span>{serviceData.location}</span>
                <span className="mx-2">•</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{serviceData.rating}</span>
              </div>
              
              <p className="text-lg font-bold text-[#416CE1] dark:text-blue-300 mb-4">
                ৳ {serviceData.price}/{serviceData.priceUnit}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <Clock className="h-4 w-4 text-[#416CE1] dark:text-blue-300" />
                <span>সময় নিবেঃ {serviceData.estimatedTime}</span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {serviceData.description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">সার্ভিসের সুবিধাসমূহ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {serviceData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#41B985]" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-0 shadow-md dark:bg-gray-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">সার্ভিস প্রোভাইডার</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5 text-[#416CE1] dark:text-blue-300" />
                  <span>{serviceData.provider}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Clock className="h-5 w-5 text-[#416CE1] dark:text-blue-300" />
                  <span>অভিজ্ঞতা: {serviceData.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="h-5 w-5 text-[#416CE1] dark:text-blue-300" />
                  <span>সময়: {serviceData.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="h-5 w-5 text-[#416CE1] dark:text-blue-300" />
                  <span>{serviceData.contact}</span>
                </div>
                
                {/* বিবাদের হার এবং গড় সমাধান সময় */}
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>বিবাদের হার: {serviceData.disputeRate} (গড় সমাধান সময়: {serviceData.avgResolutionTime})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleBooking}
            className="w-full text-lg py-6 bg-[#416CE1] hover:bg-[#416CE1]/90 dark:bg-[#60A5FA] dark:hover:bg-[#60A5FA]/90"
          >
            নিরাপদ P2P পেমেন্ট এর মাধ্যমে বুক করুন
          </Button>
          
          <Card className="bg-[#EEF2FF] border-0 border-[#416CE1]/20 dark:bg-[#111827] dark:border-blue-500/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#416CE1] dark:text-blue-300 mb-2">নিরাপদ পেমেন্ট ব্যবস্থা</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                আমাদের এসক্রো সিস্টেমের মাধ্যমে আপনার অর্থ সম্পূর্ণ নিরাপদ থাকবে। সার্ভিস গ্রহণের পরে আপনি কনফার্ম করলে তবেই বিক্রেতা পেমেন্ট পাবেন।
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>১০০% নিরাপদ পেমেন্ট</li>
                <li>ভেরিফাইড সার্ভিস প্রোভাইডার</li>
                <li>২৪/৭ কাস্টমার সাপোর্ট</li>
                {serviceData.insuranceAvailable && (
                  <li className="font-semibold">সার্ভিস ইনস্যুরেন্স কভারড</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* উন্নত নিরাপত্তা ফিচার তথ্য কার্ড */}
          <Card className="bg-[#F0FDF4] border-0 border-[#41B985]/20 dark:bg-[#0F1720] dark:border-green-500/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#41B985] dark:text-green-400 mb-2">উন্নত নিরাপত্তা ফিচার</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <span className="font-medium">মাল্টিফ্যাক্টর ভেরিফিকেশন:</span> 
                  <p className="ml-5 mt-1">ফোন এবং ইমেল ভেরিফিকেশন দ্বারা উচ্চ নিরাপত্তা নিশ্চিত করা হয়</p>
                </li>
                <li>
                  <span className="font-medium">ডিসপিউট রেজোলিউশন:</span> 
                  <p className="ml-5 mt-1">যেকোনো বিবাদ ৪৮ ঘন্টার মধ্যে সমাধান করা হয়</p>
                </li>
                <li>
                  <span className="font-medium">রিয়েল-টাইম মনিটরিং:</span> 
                  <p className="ml-5 mt-1">সকল লেনদেন রিয়েল-টাইমে মনিটর করা হয়</p>
                </li>
                <li>
                  <span className="font-medium">ট্র্যাকেবল ট্রানজেকশন:</span> 
                  <p className="ml-5 mt-1">প্রতিটি লেনদেন পূর্ণরূপে ট্র্যাক করা যায়</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-md dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ডেলিভারি এবং সার্ভিস স্ট্যাটাস</h3>
                <Badge variant="outline" className="text-[#416CE1] dark:text-blue-300">লাইভ ট্র্যাকিং</Badge>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#416CE1]/10 flex items-center justify-center dark:bg-[#416CE1]/20">
                  <Truck className="h-5 w-5 text-[#416CE1] dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">আপনার লোকেশনে সার্ভিস প্রদান করা হবে</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">আপনার পছন্দের সময় অনুযায়ী</p>
                </div>
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-[#416CE1] text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-950">
                অন্যান্য সার্ভিস দেখুন <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <P2PPaymentModal 
        open={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen}
        item={{
          id: id || "0",
          title: serviceData.title,
          price: serviceData.price,
          priceUnit: serviceData.priceUnit,
          owner: serviceData.provider
        }}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default ServiceDetails;
