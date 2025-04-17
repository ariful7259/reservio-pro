
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Calendar, User, Phone, Shield, AlertTriangle } from 'lucide-react';
import P2PPaymentModal from '@/components/P2PPaymentModal';
import { useToast } from "@/components/ui/use-toast";
import OfflineIndicator from '@/components/housing/OfflineIndicator';
import { useAuth } from '@/hooks/useAuth';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
    <div className="container px-4 pt-20 pb-20">
      <OfflineIndicator isOnline={isOnline} language="bn" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <img 
              src={serviceData.image} 
              alt={serviceData.title}
              className="w-full h-[300px] object-cover"
            />
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h1 className="text-2xl font-bold mb-2">
                {serviceData.title}
                {serviceData.verifiedProvider && 
                  <Badge variant="outline" className="ml-2 text-blue-600 bg-blue-50 border-blue-200">
                    <Shield className="h-3 w-3 mr-1" /> ভেরিফাইড প্রোভাইডার
                  </Badge>
                }
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{serviceData.location}</span>
                <span className="mx-2">•</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{serviceData.rating}</span>
              </div>
              <Badge className="mb-4">{serviceData.category}</Badge>
              <p className="text-lg font-bold text-primary mb-4">
                ৳ {serviceData.price}/{serviceData.priceUnit}
              </p>
              <p className="text-gray-600 mb-4">
                {serviceData.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">সার্ভিস প্রোভাইডার</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>{serviceData.provider}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>অভিজ্ঞতা: {serviceData.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>সময়: {serviceData.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{serviceData.contact}</span>
                </div>
                
                {/* বিবাদের হার এবং গড় সমাধান সময় (যোগ করা হয়েছে) */}
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>বিবাদের হার: {serviceData.disputeRate} (গড় সমাধান সময়: {serviceData.avgResolutionTime})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleBooking}
            className="w-full text-lg py-6"
          >
            নিরাপদ P2P পেমেন্ট এর মাধ্যমে বুক করুন
          </Button>
          
          <Card className="bg-blue-50 border border-blue-100">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">নিরাপদ পেমেন্ট ব্যবস্থা</h3>
              <p className="text-sm text-blue-700 mb-2">
                আমাদের এসক্রো সিস্টেমের মাধ্যমে আপনার অর্থ সম্পূর্ণ নিরাপদ থাকবে। সার্ভিস গ্রহণের পরে আপনি কনফার্ম করলে তবেই বিক্রেতা পেমেন্ট পাবেন।
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>১০০% নিরাপদ পেমেন্ট</li>
                <li>ভেরিফাইড সার্ভিস প্রোভাইডার</li>
                <li>২৪/৭ কাস্টমার সাপোর্ট</li>
                {serviceData.insuranceAvailable && (
                  <li className="font-semibold">সার্ভিস ইনস্যুরেন্স কভারড</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* উন্নত নিরাপত্তা ফিচার তথ্য কার্ড (নতুন যোগ করা হয়েছে) */}
          <Card className="bg-green-50 border border-green-100">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">উন্নত নিরাপত্তা ফিচার</h3>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-2">
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
