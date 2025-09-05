import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentGateway, { PaymentResultData } from '@/components/payment/PaymentGateway';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currencyUtils';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get cart data from navigation state
  const { amount, items, totalItems } = location.state || { amount: 0, items: [], totalItems: 0 };

  const handlePaymentComplete = (data: PaymentResultData) => {
    toast({
      title: "পেমেন্ট সফল হয়েছে!",
      description: `ট্রানজেকশন ID: ${data.transactionId}`,
    });
    
    // Clear cart and redirect to success page or marketplace
    setTimeout(() => {
      navigate('/marketplace-hub', { state: { paymentSuccess: true } });
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/marketplace-hub');
  };

  // If no amount or items, redirect to marketplace
  if (!amount || amount <= 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">কোন পণ্য পাওয়া যায়নি</p>
            <Button onClick={() => navigate('/marketplace-hub')}>
              মার্কেটপ্লেসে ফিরে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-24">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">পেমেন্ট সম্পন্ন করুন</h1>
            <p className="text-muted-foreground">
              {totalItems} টি পণ্যের জন্য {formatCurrency(amount, 'BDT')} টাকা পেমেন্ট করুন
            </p>
          </div>
        </div>

        {/* Order Summary */}
        {items && items.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>অর্ডার সারাংশ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          পরিমাণ: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity, 'BDT')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Gateway Component */}
        <PaymentGateway
          amount={amount}
          onPaymentComplete={handlePaymentComplete}
          onCancel={handleCancel}
          allowedMethods={['card', 'bkash', 'nagad', 'rocket', 'rupantorpay']}
          processingFee={0}
          includeCallbacks={true}
        />
      </div>
    </div>
  );
};

export default PaymentPage;