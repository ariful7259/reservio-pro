
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BookingPaymentSelectionProps {
  totalPrice: number;
  depositAmount: number;
  depositRequired: number;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

const BookingPaymentSelection: React.FC<BookingPaymentSelectionProps> = ({
  totalPrice,
  depositAmount,
  depositRequired,
  paymentMethod,
  onPaymentMethodChange,
  onBack,
  onComplete,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <div className="bg-secondary/20 p-3 rounded-md space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">মোট রেন্টাল মূল্য:</span>
          <span className="font-medium">৳{totalPrice}</span>
        </div>
        
        {depositRequired > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm">ডিপোজিট মূল্য:</span>
            <span className="font-medium">৳{depositAmount}</span>
          </div>
        )}
        
        <Separator />
        
        <div className="flex items-center justify-between font-bold">
          <span>আপনার মোট প্রদেয়:</span>
          <span>৳{depositRequired > 0 ? depositAmount : totalPrice}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>পেমেন্ট মেথড নির্বাচন করুন</Label>
        <div className={isMobile ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-2"}>
          <Button
            variant={paymentMethod === 'bkash' ? 'default' : 'outline'}
            className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'bkash' ? 'border-primary' : ''}`}
            onClick={() => onPaymentMethodChange('bkash')}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Bkash_logo.png" 
                 alt="bKash" className="h-6" />
            <span className="text-xs">বিকাশ</span>
          </Button>
          
          <Button
            variant={paymentMethod === 'nagad' ? 'default' : 'outline'}
            className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'nagad' ? 'border-primary' : ''}`}
            onClick={() => onPaymentMethodChange('nagad')}
          >
            <img src="https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" 
                 alt="Nagad" className="h-6" />
            <span className="text-xs">নগদ</span>
          </Button>
          
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'card' ? 'border-primary' : ''}`}
            onClick={() => onPaymentMethodChange('card')}
          >
            <div className="flex items-center gap-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                   alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                   alt="MasterCard" className="h-4" />
            </div>
            <span className="text-xs">কার্ড</span>
          </Button>
          
          <Button
            variant={paymentMethod === 'cash' ? 'default' : 'outline'}
            className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'cash' ? 'border-primary' : ''}`}
            onClick={() => onPaymentMethodChange('cash')}
          >
            <div className="h-6 w-6 flex items-center justify-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
            </div>
            <span className="text-xs">ক্যাশ</span>
          </Button>
        </div>
      </div>
    
      <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4">
        <Button variant="outline" onClick={onBack} className="order-2 sm:order-1">
          ফিরে যান
        </Button>
        <Button onClick={onComplete} className="order-1 sm:order-2">
          <Check className="mr-2 h-4 w-4" /> বুকিং কনফার্ম করুন
        </Button>
      </div>
    </div>
  );
};

export default BookingPaymentSelection;
