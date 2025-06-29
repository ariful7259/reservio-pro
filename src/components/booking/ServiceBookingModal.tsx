
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Home, Video, MapPin, Truck, Clock, Phone, 
  CreditCard, Smartphone, Banknote, Calendar as CalendarIcon,
  User, MessageSquare, CheckCircle, FileText, Shield,
  AlertCircle, Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TimeSlotPicker from '@/components/TimeSlotPicker';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    title: string;
    provider: string;
    category: string;
    subcategory: string;
    price: string;
    bookingTypes: string[];
  };
}

const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const { toast } = useToast();
  const [selectedBookingType, setSelectedBookingType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    // Personal Information
    fullName: '',
    phone: '',
    email: '',
    alternatePhone: '',
    
    // Address Information
    address: '',
    area: '',
    city: '',
    zipCode: '',
    
    // Service Specific
    specialInstructions: '',
    pickupAddress: '',
    deliveryAddress: '',
    serviceType: '',
    urgency: 'normal',
    
    // Additional Requirements
    equipmentRequired: false,
    materialsIncluded: false,
    followUpRequired: false,
    
    // Subscription Details (for recurring services)
    subscriptionType: '',
    frequency: '',
    duration: '',
    
    // Emergency Contact
    emergencyContact: '',
    emergencyPhone: '',
    
    // Special Requirements
    accessInstructions: '',
    preferredGender: '',
    languages: [],
    
    // Insurance/Guarantee
    insuranceRequired: false,
    guaranteeType: ''
  });

  const bookingTypeIcons = {
    'হোম ভিজিট': <Home className="h-5 w-5" />,
    'ভিডিও কনসালটেশন': <Video className="h-5 w-5" />,
    'চেম্বার ভিজিট': <MapPin className="h-5 w-5" />,
    'পিক-আপ সার্ভিস': <Truck className="h-5 w-5" />,
    'হোম সার্ভিস': <Home className="h-5 w-5" />,
    'পার্লার ভিজিট': <MapPin className="h-5 w-5" />,
    'One-Time': <Clock className="h-5 w-5" />,
    'Weekly Plan': <CalendarIcon className="h-5 w-5" />,
    'Monthly Plan': <CalendarIcon className="h-5 w-5" />,
    'ডেলিভারি রিপেয়ার': <Truck className="h-5 w-5" />,
    'সাপ্তাহিক সাবস্ক্রিপশন': <CalendarIcon className="h-5 w-5" />,
    'মাসিক সাবস্ক্রিপশন': <CalendarIcon className="h-5 w-5" />,
    'কাস্টম কোট': <FileText className="h-5 w-5" />,
    'ভিডিও কল কনসাল্ট': <Video className="h-5 w-5" />,
    'Remote Booking': <Video className="h-5 w-5" />,
    'Project Contract': <FileText className="h-5 w-5" />,
    'টাইম স্লট': <Clock className="h-5 w-5" />,
    'প্যাকেজ ভিত্তিক': <Package className="h-5 w-5" />,
    'ইনস্ট্যান্ট ডেলিভারি': <Truck className="h-5 w-5" />,
    'সিডিউলড': <CalendarIcon className="h-5 w-5" />,
    'সিডিউলড ট্রিপ': <CalendarIcon className="h-5 w-5" />
  };

  const paymentMethods = [
    { id: 'bkash', name: 'বিকাশ', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'nagad', name: 'নগদ', icon: <Phone className="h-5 w-5" /> },
    { id: 'card', name: 'ভিসা/মাস্টার কার্ড', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'cod', name: 'ক্যাশ অন সার্ভিস', icon: <Banknote className="h-5 w-5" /> },
    { id: 'advance', name: 'আগাম পেমেন্ট', icon: <Shield className="h-5 w-5" /> }
  ];

  const urgencyOptions = [
    { value: 'normal', label: 'সাধারণ (২৪ ঘণ্টা)', price: 0 },
    { value: 'urgent', label: 'জরুরি (১২ ঘণ্টা)', price: 200 },
    { value: 'emergency', label: 'জরুরি (৬ ঘণ্টা)', price: 500 }
  ];

  const handleBookingSubmit = () => {
    // Validation
    const requiredFields = ['fullName', 'phone'];
    const missingFields = requiredFields.filter(field => !bookingDetails[field as keyof typeof bookingDetails]);
    
    if (!selectedBookingType || !selectedTimeSlot || !paymentMethod || missingFields.length > 0) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "সকল প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "বুকিং সফল!",
      description: `${service.title} এর জন্য আপনার বুকিং নিশ্চিত করা হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।`
    });
    
    onClose();
  };

  const renderPersonalInfoForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">পূর্ণ নাম *</Label>
          <Input
            id="fullName"
            placeholder="আপনার পূর্ণ নাম"
            value={bookingDetails.fullName}
            onChange={(e) => setBookingDetails({...bookingDetails, fullName: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">ফোন নাম্বার *</Label>
          <Input
            id="phone"
            placeholder="01XXXXXXXXX"
            value={bookingDetails.phone}
            onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">ইমেইল</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={bookingDetails.email}
            onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="alternatePhone">বিকল্প ফোন</Label>
          <Input
            id="alternatePhone"
            placeholder="01XXXXXXXXX"
            value={bookingDetails.alternatePhone}
            onChange={(e) => setBookingDetails({...bookingDetails, alternatePhone: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const renderBookingTypeContent = () => {
    switch (selectedBookingType) {
      case 'হোম ভিজিট':
      case 'হোম সার্ভিস':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">বাড়ির সম্পূর্ণ ঠিকানা *</Label>
              <Textarea
                id="address"
                placeholder="বাড়ির নাম্বার, রোড, এলাকা"
                value={bookingDetails.address}
                onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="area">এলাকা</Label>
                <Input
                  id="area"
                  placeholder="যেমন: গুলশান"
                  value={bookingDetails.area}
                  onChange={(e) => setBookingDetails({...bookingDetails, area: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="city">শহর</Label>
                <Input
                  id="city"
                  placeholder="যেমন: ঢাকা"
                  value={bookingDetails.city}
                  onChange={(e) => setBookingDetails({...bookingDetails, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">জিপ কোড</Label>
                <Input
                  id="zipCode"
                  placeholder="১২০০"
                  value={bookingDetails.zipCode}
                  onChange={(e) => setBookingDetails({...bookingDetails, zipCode: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="accessInstructions">বাড়িতে প্রবেশের নির্দেশনা</Label>
              <Textarea
                id="accessInstructions"
                placeholder="যেমন: ৩য় তলায় উঠতে হবে, বিকেলের সময় ভালো"
                value={bookingDetails.accessInstructions}
                onChange={(e) => setBookingDetails({...bookingDetails, accessInstructions: e.target.value})}
              />
            </div>
            
            <div>
              <Label>জরুরি মাত্রা</Label>
              <RadioGroup 
                value={bookingDetails.urgency} 
                onValueChange={(value) => setBookingDetails({...bookingDetails, urgency: value})}
              >
                {urgencyOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex items-center justify-between flex-1">
                      <span>{option.label}</span>
                      {option.price > 0 && <span className="text-primary">+৳{option.price}</span>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );
      
      case 'ভিডিও কনসালটেশন':
      case 'ভিডিও কল কনসাল্ট':
        return (
          <div className="space-y-4">
            <Card className="p-4 bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-blue-600" />
                <span className="font-medium">ভিডিও কল তথ্য</span>
              </div>
              <p className="text-sm text-muted-foreground">
                বুকিং নিশ্চিত হলে আপনার ফোনে ভিডিও কল লিংক পাঠানো হবে। 
                কল শুরু হওয়ার ৫ মিনিট আগে রিমাইন্ডার পাবেন।
              </p>
            </Card>
            
            <div>
              <Label htmlFor="preferredGender">পছন্দের সেবাদাতার লিঙ্গ</Label>
              <Select 
                value={bookingDetails.preferredGender} 
                onValueChange={(value) => setBookingDetails({...bookingDetails, preferredGender: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">কোনো পছন্দ নেই</SelectItem>
                  <SelectItem value="male">পুরুষ</SelectItem>
                  <SelectItem value="female">মহিলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="specialInstructions">সমস্যার বিস্তারিত বিবরণ</Label>
              <Textarea
                id="specialInstructions"
                placeholder="আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন যাতে ডাক্তার/এক্সপার্ট প্রস্তুত থাকতে পারেন"
                value={bookingDetails.specialInstructions}
                onChange={(e) => setBookingDetails({...bookingDetails, specialInstructions: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={bookingDetails.followUpRequired}
                onCheckedChange={(checked) => setBookingDetails({...bookingDetails, followUpRequired: checked as boolean})}
              />
              <Label htmlFor="followUpRequired">ফলো-আপ সেশন প্রয়োজন</Label>
            </div>
          </div>
        );
      
      case 'পিক-আপ সার্ভিস':
      case 'ইনস্ট্যান্ট ডেলিভারি':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pickupAddress">পিক-আপ ঠিকানা *</Label>
              <Textarea
                id="pickupAddress"
                placeholder="যেখান থেকে পণ্য নিয়ে যাবে - সম্পূর্ণ ঠিকানা"
                value={bookingDetails.pickupAddress}
                onChange={(e) => setBookingDetails({...bookingDetails, pickupAddress: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="deliveryAddress">ডেলিভারি ঠিকানা *</Label>
              <Textarea
                id="deliveryAddress"
                placeholder="যেখানে পৌঁছে দিতে হবে - সম্পূর্ণ ঠিকানা"
                value={bookingDetails.deliveryAddress}
                onChange={(e) => setBookingDetails({...bookingDetails, deliveryAddress: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">সার্ভিস টাইপ</Label>
                <Select 
                  value={bookingDetails.serviceType} 
                  onValueChange={(value) => setBookingDetails({...bookingDetails, serviceType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repair">রিপেয়ার</SelectItem>
                    <SelectItem value="replacement">রিপ্লেসমেন্ট</SelectItem>
                    <SelectItem value="diagnosis">ডায়াগনসিস</SelectItem>
                    <SelectItem value="cleaning">ক্লিনিং</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>ডেলিভারি স্পিড</Label>
                <RadioGroup 
                  value={bookingDetails.urgency} 
                  onValueChange={(value) => setBookingDetails({...bookingDetails, urgency: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal-delivery" />
                    <Label htmlFor="normal-delivery">সাধারণ (২৪-৪৮ ঘণ্টা)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fast" id="fast-delivery" />
                    <Label htmlFor="fast-delivery">দ্রুত (১২-২৪ ঘণ্টা) +৳১০০</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express-delivery" />
                    <Label htmlFor="express-delivery">এক্সপ্রেস (৬-১২ ঘণ্টা) +৳৩০০</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="insuranceRequired"
                checked={bookingDetails.insuranceRequired}
                onCheckedChange={(checked) => setBookingDetails({...bookingDetails, insuranceRequired: checked as boolean})}
              />
              <Label htmlFor="insuranceRequired">পণ্যের বীমা প্রয়োজন (+৳৫০)</Label>
            </div>
          </div>
        );
      
      case 'সাপ্তাহিক সাবস্ক্রিপশন':
      case 'মাসিক সাবস্ক্রিপশন':
      case 'Weekly Plan':
      case 'Monthly Plan':
        return (
          <div className="space-y-4">
            <Card className="p-4 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium">সাবস্ক্রিপশন প্ল্যান</span>
              </div>
              <p className="text-sm text-muted-foreground">
                নিয়মিত সেবার জন্য সাবস্ক্রিপশন নিন এবং ছাড় পান।
              </p>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency">সেবার ফ্রিকোয়েন্সি</Label>
                <Select 
                  value={bookingDetails.frequency} 
                  onValueChange={(value) => setBookingDetails({...bookingDetails, frequency: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">প্রতিদিন</SelectItem>
                    <SelectItem value="alternate">একদিন পর পর</SelectItem>
                    <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                    <SelectItem value="biweekly">পাক্ষিক</SelectItem>
                    <SelectItem value="monthly">মাসিক</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duration">সাবস্ক্রিপশনের মেয়াদ</Label>
                <Select 
                  value={bookingDetails.duration} 
                  onValueChange={(value) => setBookingDetails({...bookingDetails, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">১ মাস</SelectItem>
                    <SelectItem value="3months">৩ মাস (৫% ছাড়)</SelectItem>
                    <SelectItem value="6months">৬ মাস (১০% ছাড়)</SelectItem>
                    <SelectItem value="1year">১ বছর (১৫% ছাড়)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">সেবার ঠিকানা *</Label>
              <Textarea
                id="address"
                placeholder="যেখানে নিয়মিত সেবা প্রয়োজন"
                value={bookingDetails.address}
                onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="equipmentRequired"
                  checked={bookingDetails.equipmentRequired}
                  onCheckedChange={(checked) => setBookingDetails({...bookingDetails, equipmentRequired: checked as boolean})}
                />
                <Label htmlFor="equipmentRequired">নিজস্ব সরঞ্জাম নিয়ে আসবেন</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="materialsIncluded"
                  checked={bookingDetails.materialsIncluded}
                  onCheckedChange={(checked) => setBookingDetails({...bookingDetails, materialsIncluded: checked as boolean})}
                />
                <Label htmlFor="materialsIncluded">প্রয়োজনীয় উপকরণ সরবরাহ করবেন</Label>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceType">সেবার ধরন</Label>
              <Select 
                value={bookingDetails.serviceType} 
                onValueChange={(value) => setBookingDetails({...bookingDetails, serviceType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">পরামর্শ</SelectItem>
                  <SelectItem value="service">সেবা</SelectItem>
                  <SelectItem value="repair">মেরামত</SelectItem>
                  <SelectItem value="installation">ইনস্টলেশন</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="specialInstructions">বিশেষ নির্দেশনা</Label>
              <Textarea
                id="specialInstructions"
                placeholder="অতিরিক্ত তথ্য বা নির্দেশনা"
                value={bookingDetails.specialInstructions}
                onChange={(e) => setBookingDetails({...bookingDetails, specialInstructions: e.target.value})}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            সার্ভিস বুকিং - {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Info */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{service.provider}</p>
                <Badge variant="outline">{service.subcategory}</Badge>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary text-xl">{service.price}</span>
                <p className="text-xs text-muted-foreground">মূল দাম</p>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">ব্যক্তিগত তথ্য</TabsTrigger>
              <TabsTrigger value="booking">বুকিং টাইপ</TabsTrigger>
              <TabsTrigger value="datetime">সময় নির্বাচন</TabsTrigger>
              <TabsTrigger value="payment">পেমেন্ট</TabsTrigger>
              <TabsTrigger value="confirm">নিশ্চিতকরণ</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-4">ব্যক্তিগত তথ্য</h3>
                {renderPersonalInfoForm()}
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">জরুরি যোগাযোগ (ঐচ্ছিক)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">জরুরি যোগাযোগের নাম</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="নাম"
                        value={bookingDetails.emergencyContact}
                        onChange={(e) => setBookingDetails({...bookingDetails, emergencyContact: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">জরুরি যোগাযোগের ফোন</Label>
                      <Input
                        id="emergencyPhone"
                        placeholder="01XXXXXXXXX"
                        value={bookingDetails.emergencyPhone}
                        onChange={(e) => setBookingDetails({...bookingDetails, emergencyPhone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-3 block">বুকিং টাইপ নির্বাচন করুন</Label>
                <RadioGroup value={selectedBookingType} onValueChange={setSelectedBookingType}>
                  {service.bookingTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="flex items-center gap-2 cursor-pointer flex-1">
                        {bookingTypeIcons[type as keyof typeof bookingTypeIcons]}
                        <span>{type}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {selectedBookingType && (
                <div>
                  <Label className="text-base font-medium mb-3 block">বুকিং বিবরণ</Label>
                  {renderBookingTypeContent()}
                </div>
              )}
            </TabsContent>

            <TabsContent value="datetime" className="space-y-4">
              <TimeSlotPicker
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={setSelectedTimeSlot}
              />
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-3 block">পেমেন্ট মাধ্যম</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                        {method.icon}
                        <span>{method.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Card className="p-4 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">পেমেন্ট নিরাপত্তা</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  আপনার পেমেন্ট সম্পূর্ণ নিরাপদ এবং এনক্রিপ্টেড। সেবা সন্তোষজনক না হলে সম্পূর্ণ রিফান্ড।
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="confirm" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-4">বুকিং সারসংক্ষেপ</h3>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>সেবা:</span>
                      <span className="font-medium">{service.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>সেবাদাতা:</span>
                      <span className="font-medium">{service.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>বুকিং টাইপ:</span>
                      <span className="font-medium">{selectedBookingType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>তারিখ ও সময়:</span>
                      <span className="font-medium">
                        {selectedDate.toLocaleDateString('bn-BD')} - {selectedTimeSlot}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>পেমেন্ট মাধ্যম:</span>
                      <span className="font-medium">
                        {paymentMethods.find(p => p.id === paymentMethod)?.name}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>মোট:</span>
                      <span>{service.price}</span>
                    </div>
                  </div>
                </Card>
                
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm">
                    বুকিং নিশ্চিত করার পর আমাদের টিম আপনার সাথে যোগাযোগ করবে এবং সেবাদাতা নির্ধারণ করবে।
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              বাতিল করুন
            </Button>
            <Button onClick={handleBookingSubmit} className="flex-1" size="lg">
              বুকিং নিশ্চিত করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingModal;
