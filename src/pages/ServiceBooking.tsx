
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  ArrowLeft,
  CalendarCheck,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ServiceBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // In a real app, this would come from an API
  const service = {
    id: 101,
    title: "ডাক্তার কনসাল্টেশন",
    provider: "ডা. আহমেদ হাসান",
    price: "৳১,৫০০",
    duration: "৩০ মিনিট",
    location: "গুলশান, ঢাকা",
    availableTimeSlots: [
      "সকাল ১০:০০",
      "সকাল ১১:০০",
      "দুপুর ০৩:০০",
      "বিকাল ০৫:০০"
    ]
  };

  const handleBooking = () => {
    toast({
      title: "বুকিং সফল হয়েছে",
      description: "আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে",
    });
    navigate('/appointments');
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">অ্যাপয়েন্টমেন্ট বুক করুন</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সার্ভিস তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.provider}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {service.duration}
              </Badge>
              <Badge variant="secondary">{service.price}</Badge>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">তারিখ নির্বাচন করুন</h4>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">সময় নির্বাচন করুন</h4>
              <div className="grid grid-cols-2 gap-2">
                {service.availableTimeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === slot ? "default" : "outline"}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>আপনার তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">নাম</label>
              <Input placeholder="আপনার পূর্ণ নাম" />
            </div>
            <div>
              <label className="text-sm font-medium">ফোন নম্বর</label>
              <Input placeholder="আপনার ফোন নম্বর" />
            </div>
            <div>
              <label className="text-sm font-medium">ইমেইল</label>
              <Input placeholder="আপনার ইমেইল" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium">নোট (ঐচ্ছিক)</label>
              <Input placeholder="কোন বিশেষ নির্দেশনা থাকলে লিখুন" />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
            >
              বুকিং কনফার্ম করুন
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ServiceBooking;
