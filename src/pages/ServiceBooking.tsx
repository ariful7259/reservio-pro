import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  ArrowLeft,
  CalendarCheck,
  User,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWalletPayment } from '@/hooks/useWalletPayment';
import WalletBalanceIndicator from '@/components/payment/WalletBalanceIndicator';
import WalletPaymentConfirmDialog from '@/components/payment/WalletPaymentConfirmDialog';

const paymentMethods = [
  { id: 'wallet', name: 'ওয়ালেট', icon: <Wallet className="h-4 w-4" /> },
  { id: 'bkash', name: 'বিকাশ', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'nagad', name: 'নগদ', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: <CreditCard className="h-4 w-4" /> },
];

const ServiceBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showWalletConfirm, setShowWalletConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    walletBalance, 
    canPayFromWallet, 
    processWalletPayment,
    isLoading: walletLoading 
  } = useWalletPayment();

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

  // Parse price from Bengali string
  const parseServicePrice = (): number => {
    const priceStr = service.price.replace(/[৳,\s]/g, '');
    const converted = priceStr.replace(/[০-৯]/g, (match) => {
      const bengaliToEnglish: Record<string, string> = {'০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'};
      return bengaliToEnglish[match] || match;
    });
    return parseFloat(converted) || 0;
  };

  const servicePrice = parseServicePrice();

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    if (methodId === 'wallet' && canPayFromWallet(servicePrice)) {
      setShowWalletConfirm(true);
    }
  };

  const handleWalletPayment = async () => {
    setIsProcessing(true);
    const result = await processWalletPayment(
      servicePrice,
      `সার্ভিস বুকিং - ${service.title}`,
      'service_booking',
      { order_type: 'service', service_name: service.title }
    );

    if (result.success) {
      setShowWalletConfirm(false);
      toast({
        title: "বুকিং সফল হয়েছে",
        description: "আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে এবং ওয়ালেট থেকে পেমেন্ট কাটা হয়েছে",
      });
      navigate('/appointments');
    } else {
      toast({
        title: "পেমেন্ট ব্যর্থ",
        description: result.error,
        variant: "destructive"
      });
    }
    setIsProcessing(false);
  };

  const handleBooking = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "পেমেন্ট মেথড নির্বাচন করুন",
        description: "বুকিং সম্পন্ন করতে পেমেন্ট মেথড নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    if (selectedPaymentMethod === 'wallet' && canPayFromWallet(servicePrice)) {
      setShowWalletConfirm(true);
      return;
    }

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
            
            <Separator />
            
            {/* Payment Method Section */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                পেমেন্ট মেথড
              </h4>
              
              <WalletBalanceIndicator
                balance={walletBalance}
                requiredAmount={servicePrice}
                onAddMoney={() => navigate('/wallet')}
                className="mb-3"
              />
              
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(method => {
                  const isWallet = method.id === 'wallet';
                  const hasBalance = canPayFromWallet(servicePrice);
                  const isDisabled = isWallet && !hasBalance;
                  
                  return (
                    <Button
                      key={method.id}
                      variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                      className={`h-auto py-3 flex items-center gap-2 ${
                        isWallet && hasBalance ? 'border-primary' : ''
                      }`}
                      onClick={() => !isDisabled && handlePaymentMethodSelect(method.id)}
                      disabled={isDisabled}
                    >
                      {method.icon}
                      <span className="text-sm">{method.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !selectedPaymentMethod || isProcessing}
            >
              {isProcessing ? 'প্রক্রিয়াকরণ...' : 'বুকিং কনফার্ম করুন'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Wallet Payment Confirmation Dialog */}
        <WalletPaymentConfirmDialog
          open={showWalletConfirm}
          onOpenChange={setShowWalletConfirm}
          amount={servicePrice}
          currentBalance={walletBalance}
          description={`${service.title} বুকিং করার জন্য পেমেন্ট`}
          onConfirm={handleWalletPayment}
          isProcessing={isProcessing || walletLoading}
        />
      </div>
    </div>
  );
};

export default ServiceBooking;
