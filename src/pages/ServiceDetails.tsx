
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, Star, MapPin, Clock, Phone, CheckCircle, 
  Shield, Award, Users, Calendar, MessageSquare, Share2,
  Heart, Home, Video, Truck, CreditCard
} from 'lucide-react';
import ServiceBookingModal from '@/components/booking/ServiceBookingModal';
import { useToast } from '@/hooks/use-toast';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock service data - in real app, fetch from API
  const service = {
    id: parseInt(id || '1'),
    title: 'হোম ভিজিট ডাক্তার',
    provider: 'ডা. আহমেদ হাসান',
    category: 'medical',
    subcategory: 'জেনারেল ডাক্তার',
    location: 'গুলশান, ঢাকা',
    price: '৳১,৫০০',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
    isVerified: true,
    bookingTypes: ['হোম ভিজিট', 'ভিডিও কনসালটেশন', 'চেম্বার ভিজিট'],
    responseTime: '৩০ মিনিট',
    description: 'অভিজ্ঞ জেনারেল ফিজিশিয়ান। ১৫+ বছরের অভিজ্ঞতা সহ সাধারণ রোগের চিকিৎসা, স্বাস্থ্য পরামর্শ এবং প্রতিরোধমূলক স্বাস্থ্যসেবা প্রদান করেন। হোম ভিজিট এবং অনলাইন কনসালটেশন উভয়ই উপলব্ধ।',
    features: [
      'হোম ভিজিট সুবিধা',
      'ভিডিও কনসালটেশন',
      'ফ্রি ফলো-আপ',
      '২৪/৭ জরুরি সেবা',
      'প্রেসক্রিপশন ডেলিভারি'
    ],
    qualifications: [
      'MBBS - ঢাকা মেডিকেল কলেজ',
      'MD - বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়',
      'BMA রেজিস্ট্রেশন সহ',
      '১৫+ বছরের অভিজ্ঞতা'
    ],
    availableHours: 'সকাল ৮টা - রাত ১০টা',
    languages: ['বাংলা', 'English', 'हिंदी']
  };

  const bookingTypeIcons = {
    'হোম ভিজিট': <Home className="h-4 w-4" />,
    'ভিডিও কনসালটেশন': <Video className="h-4 w-4" />,
    'চেম্বার ভিজিট': <MapPin className="h-4 w-4" />,
    'পিক-আপ সার্ভিস': <Truck className="h-4 w-4" />
  };

  const reviews = [
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      rating: 5,
      comment: 'খুবই ভালো সেবা পেয়েছি। ডাক্তার সাহেব খুব ধৈর্য সহকারে সমস্যা শুনেছেন এবং সঠিক চিকিৎসা দিয়েছেন।',
      date: '২ দিন আগে'
    },
    {
      id: 2,
      name: 'সালমা খাতুন',
      rating: 5,
      comment: 'হোম ভিজিট সার্ভিস অসাধারণ। সময়মতো এসেছেন এবং পরিবারের সবার দেখাশোনা করেছেন।',
      date: '১ সপ্তাহ আগে'
    },
    {
      id: 3,
      name: 'করিম মিয়া',
      rating: 4,
      comment: 'ভিডিও কল এর মাধ্যমে খুব ভালো পরামর্শ পেয়েছি। দামও যুক্তিসঙ্গত।',
      date: '২ সপ্তাহ আগে'
    }
  ];

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: `${service.provider} - ${service.description}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "লিংক কপি করা হয়েছে",
        description: "সার্ভিসের লিংক ক্লিপবোর্ডে কপি করা হয়েছে"
      });
    }
  };

  const handleSaveToWishlist = () => {
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">সার্ভিস বিস্তারিত</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600">উপলব্ধ</Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" className="bg-white" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white" onClick={handleSaveToWishlist}>
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Service Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-2">{service.provider}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground ml-1">({service.reviews} রিভিউ)</span>
                    </div>
                    {service.isVerified && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">{service.price}</div>
                  <div className="text-sm text-muted-foreground">প্রতি সেশন</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

              {/* Booking Types */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">উপলব্ধ সেবা</h3>
                <div className="flex flex-wrap gap-2">
                  {service.bookingTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {bookingTypeIcons[type as keyof typeof bookingTypeIcons]}
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">বিশেষ সুবিধা</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="font-semibold mb-3">যোগ্যতা ও অভিজ্ঞতা</h3>
                <div className="space-y-2">
                  {service.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">গ্রাহক পর্যালোচনা ({service.reviews})</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">রেসপন্স টাইম: {service.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">উপলব্ধ: {service.availableHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ভাষা: {service.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">নিরাপত্তা যাচাইকৃত</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  <Calendar className="h-4 w-4 mr-2" />
                  এখনই বুক করুন
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  কল করুন
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  মেসেজ করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">পেমেন্ট সুবিধা</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">ভিসা/মাস্টার কার্ড</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span className="text-sm">বিকাশ/নগদ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">ক্যাশ অন ডেলিভারি</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
      />
    </div>
  );
};

export default ServiceDetails;
