
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
import { 
  Home, Video, MapPin, Truck, Clock, Phone, 
  CreditCard, Smartphone, Banknote, Calendar as CalendarIcon,
  User, MessageSquare, CheckCircle
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
    address: '',
    phone: '',
    specialInstructions: '',
    pickupAddress: '',
    deliveryAddress: ''
  });

  const bookingTypeIcons = {
    'হোম ভিজিট': <Home className="h-5 w-5" />,
    'ভিডিও কনসালটেশন': <Video className="h-5 w-5" />,
    'চেম্বার ভিজিট': <MapPin className="h-5 w-5" />,
    'পিক-আপ সার্ভিস': <Truck className="h-5 w-5" />,
    'হোম সার্ভিস': <Home className="h-5 w-5" />,
    'পার্লার ভিজিট': <MapPin className="h-5 w-5" />,
    'One-Time': <Clock className="h-5 w-5" />,
    'Weekly Plan': <Calendar className="h-5 w-5" />,
    'ডেলিভারি রিপেয়ার': <Truck className="h-5 w-5" />
  };

  const paymentMethods = [
    { id: 'bkash', name: 'বিকাশ', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'nagad', name: 'নগদ', icon: <Phone className="h-5 w-5" /> },
    { id: 'card', name: 'ভিসা/মাস্টার কার্ড', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: <Banknote className="h-5 w-5" /> }
  ];

  const handleBookingSubmit = () => {
    if (!selectedBookingType || !selectedTimeSlot || !paymentMethod) {
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

  const renderBookingTypeContent = () => {
    switch (selectedBookingType) {
      case 'হোম ভিজিট':
      case 'হোম সার্ভিস':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">বাড়ির ঠিকানা *</Label>
              <Textarea
                id="address"
                placeholder="বাড়ির নাম্বার, রোড, এলাকা, জিপ কোড"
                value={bookingDetails.address}
                onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
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
            <div>
              <Label htmlFor="instructions">বিশেষ নির্দেশনা</Label>
              <Textarea
                id="instructions"
                placeholder="যেমন: ৩য় তলায় উঠতে হবে, বিকেলের সময় ভালো"
                value={bookingDetails.specialInstructions}
                onChange={(e) => setBookingDetails({...bookingDetails, specialInstructions: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'ভিডিও কনসালটেশন':
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
              <Label htmlFor="phone">ফোন নাম্বার *</Label>
              <Input
                id="phone"
                placeholder="01XXXXXXXXX"
                value={bookingDetails.phone}
                onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="instructions">সমস্যার বিবরণ</Label>
              <Textarea
                id="instructions"
                placeholder="আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন"
                value={bookingDetails.specialInstructions}
                onChange={(e) => setBookingDetails({...bookingDetails, specialInstructions: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'পিক-আপ সার্ভিস':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup">পিক-আপ ঠিকানা *</Label>
              <Textarea
                id="pickup"
                placeholder="যেখান থেকে পণ্য নিয়ে যাবে"
                value={bookingDetails.pickupAddress}
                onChange={(e) => setBookingDetails({...bookingDetails, pickupAddress: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="delivery">ডেলিভারি ঠিকানা *</Label>
              <Textarea
                id="delivery"
                placeholder="যেখানে পৌঁছে দিতে হবে"
                value={bookingDetails.deliveryAddress}
                onChange={(e) => setBookingDetails({...bookingDetails, deliveryAddress: e.target.value})}
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
        );
      
      default:
        return (
          <div className="space-y-4">
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
            <div>
              <Label htmlFor="instructions">বিশেষ নির্দেশনা</Label>
              <Textarea
                id="instructions"
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            সার্ভিস বুকিং
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Info */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">{service.provider}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{service.subcategory}</Badge>
              <span className="font-bold text-primary">{service.price}</span>
            </div>
          </Card>

          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="booking">বুকিং টাইপ</TabsTrigger>
              <TabsTrigger value="datetime">সময় নির্বাচন</TabsTrigger>
              <TabsTrigger value="payment">পেমেন্ট</TabsTrigger>
            </TabsList>

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

              {selectedBookingType === 'ভিডিও কনসালটেশন' && (
                <Card className="p-4 bg-yellow-50">
                  <p className="text-sm">
                    <strong>বিশেষ নোট:</strong> ভিডিও কনসালটেশনের জন্য আগাম পেমেন্ট প্রয়োজন। 
                    পেমেন্ট নিশ্চিত হলে কল লিংক পাঠানো হবে।
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              বাতিল করুন
            </Button>
            <Button onClick={handleBookingSubmit} className="flex-1">
              বুকিং নিশ্চিত করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingModal;
