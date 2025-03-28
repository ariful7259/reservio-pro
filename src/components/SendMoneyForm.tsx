
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Smartphone, Search, User, SendHorizonal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface SendMoneyFormProps {
  onClose?: () => void;
}

const SendMoneyForm: React.FC<SendMoneyFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [receiverInfo, setReceiverInfo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiverInfo || !amount) {
      toast({
        title: "ফর্ম পূরণ করুন",
        description: "প্রাপকের তথ্য এবং পরিমাণ দিতে হবে",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "টাকা পাঠানো হয়েছে",
        description: `${receiverInfo} কে ${amount}৳ পাঠানো হয়েছে`,
      });
      setIsLoading(false);
      setReceiverInfo('');
      setAmount('');
      setNote('');
      if (onClose) onClose();
    }, 1500);
  };

  const openQRScanner = () => {
    // In a real implementation, this would open a camera to scan QR code
    toast({
      title: "QR স্ক্যানার",
      description: "QR কোড স্ক্যান করার জন্য ক্যামেরা খোলা হচ্ছে..."
    });
  };

  return (
    <Card className="border">
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-4">টাকা পাঠান</h3>
        
        <Tabs defaultValue="wallet">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="wallet">ওয়ালেট আইডি</TabsTrigger>
            <TabsTrigger value="mobile">মোবাইল নম্বর</TabsTrigger>
            <TabsTrigger value="qr">QR কোড</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet">
            <form onSubmit={handleSendMoney}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receiver-id">প্রাপকের ওয়ালেট আইডি</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="receiver-id"
                      placeholder="ওয়ালেট আইডি লিখুন"
                      className="pl-9"
                      value={receiverInfo}
                      onChange={(e) => setReceiverInfo(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">পরিমাণ (৳)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="পরিমাণ লিখুন"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note">নোট (ঐচ্ছিক)</Label>
                  <Input
                    id="note"
                    placeholder="উদাহরণ: দোকান বিল"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">প্রক্রিয়া করা হচ্ছে...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <SendHorizonal className="h-4 w-4" />
                      টাকা পাঠান
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="mobile">
            <form onSubmit={handleSendMoney}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receiver-mobile">প্রাপকের মোবাইল নম্বর</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="receiver-mobile"
                      placeholder="০১XXXXXXXXX"
                      className="pl-9"
                      value={receiverInfo}
                      onChange={(e) => setReceiverInfo(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount-mobile">পরিমাণ (৳)</Label>
                  <Input
                    id="amount-mobile"
                    type="number"
                    placeholder="পরিমাণ লিখুন"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note-mobile">নোট (ঐচ্ছিক)</Label>
                  <Input
                    id="note-mobile"
                    placeholder="উদাহরণ: দোকান বিল"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">প্রক্রিয়া করা হচ্ছে...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <SendHorizonal className="h-4 w-4" />
                      টাকা পাঠান
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="qr">
            <div className="flex flex-col items-center space-y-4 py-6">
              <QrCode className="h-24 w-24 text-primary opacity-80" />
              <p className="text-center text-sm text-muted-foreground">
                QR কোড স্ক্যান করে সহজেই টাকা পাঠান
              </p>
              <Button onClick={openQRScanner} className="mt-2">
                QR স্ক্যান করুন
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SendMoneyForm;
