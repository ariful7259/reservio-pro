
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Calendar, User, Phone } from 'lucide-react';
import P2PPaymentModal from '@/components/P2PPaymentModal';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
    contact: "০১৭৪৯-০০০০০০"
  };

  const handleBooking = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    // Here you would typically navigate or show success message
  };

  return (
    <div className="container px-4 pt-20 pb-20">
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
              <h1 className="text-2xl font-bold mb-2">{serviceData.title}</h1>
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
      />
    </div>
  );
};

export default ServiceDetails;
