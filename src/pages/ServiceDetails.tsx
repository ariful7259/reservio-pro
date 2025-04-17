
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Calendar, User, Phone } from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock service data - In a real app, this would come from an API
  const serviceData = {
    id: Number(id),
    title: "সার্ভিস নাম",
    description: "সার্ভিস বিস্তারিত বর্ণনা",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ৮০০/ঘণ্টা",
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
    navigate(`/appointment-booking/${id}`);
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
                {serviceData.price}
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
            অ্যাপয়েন্টমেন্ট বুক করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
