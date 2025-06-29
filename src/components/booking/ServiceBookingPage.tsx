
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, Calendar, CreditCard } from 'lucide-react';
import ServiceBookingModal from './ServiceBookingModal';

const ServiceBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(true);

  // Mock service data
  const service = {
    id: parseInt(id || '1'),
    title: 'হোম ভিজিট ডাক্তার',
    provider: 'ডা. আহমেদ হাসান',
    category: 'medical',
    subcategory: 'জেনারেল ডাক্তার',
    price: '৳১,৫০০',
    bookingTypes: ['হোম ভিজিট', 'ভিডিও কনসালটেশন', 'চেম্বার ভিজিট']
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    navigate(`/services/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">সার্ভিস বুকিং</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              বুকিং প্রক্রিয়া
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-muted-foreground mb-4">{service.provider}</p>
              <Badge variant="outline" className="mb-6">{service.subcategory}</Badge>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>বুকিং সম্পন্ন করতে ২-৩ মিনিট সময় লাগবে</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>আপনার সুবিধামত সময় নির্ধারণ করুন</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>নিরাপদ পেমেন্ট গ্যারান্টি</span>
                </div>
              </div>
              
              <Button 
                className="mt-6"
                onClick={() => setIsBookingModalOpen(true)}
              >
                বুকিং শুরু করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        service={service}
      />
    </div>
  );
};

export default ServiceBookingPage;
