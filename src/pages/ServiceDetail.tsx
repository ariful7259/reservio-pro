
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, User, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { useToast } from '@/components/ui/use-toast';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    slotId: string;
  } | null>(null);

  // Mock service data (in a real app, fetch this based on the ID)
  const service = {
    id: id || '1',
    title: 'ডাক্তার কনসাল্টেশন',
    provider: 'মেডিকেল সেন্টার',
    providerImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
    rating: 4.8,
    reviewCount: 127,
    price: 1500,
    discount: 10,
    duration: '৩০ মিনিট',
    location: 'মেডিকেল সেন্টার, ঢাকা',
    description: 'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের পরামর্শ পান আপনার সুবিধা অনুযায়ী সময়ে। অ্যাপয়েন্টমেন্ট নিয়ে বিশেষজ্ঞ ডাক্তারের সাথে কথা বলুন এবং আপনার সমস্যার সমাধান পান। সরাসরি ডাক্তারের সাথে কথা বলতে পারবেন, প্রেসক্রিপশন পাবেন এবং ফলোআপ পরামর্শও পাবেন।',
    features: [
      'বিশেষজ্ঞ ডাক্তারের পরামর্শ',
      'ডিজিটাল প্রেসক্রিপশন',
      'ফলোআপ কনসাল্টেশন',
      'মেডিকেল টেস্ট রিপোর্ট রিভিউ',
    ],
    tags: ['মেডিকেল', 'অনলাইন'],
  };

  const discountedPrice = service.discount 
    ? service.price - (service.price * service.discount) / 100 
    : service.price;

  const handleSelectTimeSlot = (date: Date, slotId: string) => {
    setSelectedTimeSlot({ date, slotId });
  };

  const handleBookNow = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "সময় নির্বাচন করুন",
        description: "অ্যাপয়েন্টমেন্ট বুক করতে একটি সময় নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would make an API call to book the appointment
    toast({
      title: "অ্যাপয়েন্টমেন্ট বুক করা হয়েছে!",
      description: "আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে।",
      variant: "default",
    });
    
    navigate('/appointments');
  };

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">সার্ভিস বিবরণ</h1>
      </div>

      <div className="mb-6 rounded-lg overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-sm">{service.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({service.reviewCount} রিভিউস)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {service.discount && (
              <span className="text-sm line-through text-muted-foreground">
                ৳{service.price}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={service.providerImage}
              alt={service.provider}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{service.provider}</h3>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{service.location}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">বিবরণ</TabsTrigger>
          <TabsTrigger value="booking" className="flex-1">বুকিং করুন</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">বিবরণ</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">বৈশিষ্ট্য</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">ট্যাগস</h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="booking" className="mt-4">
          <div className="space-y-4">
            <TimeSlotPicker onSelectTimeSlot={handleSelectTimeSlot} />
            
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3">বুকিং সারাংশ</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সার্ভিস</span>
                    <span>{service.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সময়কাল</span>
                    <span>{service.duration}</span>
                  </div>
                  {selectedTimeSlot && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">সময়</span>
                      <span>{selectedTimeSlot.date.toLocaleDateString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>মোট</span>
                    <span>৳{discountedPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button
              onClick={handleBookNow}
              className="w-full"
            >
              এখনই বুক করুন
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceDetail;
