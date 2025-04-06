
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Award, 
  Bolt, 
  CreditCard, 
  DollarSign, 
  Gift, 
  Lightbulb, 
  Loader2,
  Receipt, 
  Search, 
  ShoppingBag, 
  Smartphone, 
  Star, 
  Tag, 
  Ticket, 
  Wifi, 
  Zap 
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

interface WalletExtensionProps {
  balance: number;
  points?: number;
  onPointsRedeemed?: (points: number) => void;
  onBillPayment?: (billInfo: any) => void;
  onTransfer?: (transferInfo: any) => void;
}

const WalletExtension: React.FC<WalletExtensionProps> = ({
  balance = 12500,
  points = 450,
  onPointsRedeemed,
  onBillPayment,
  onTransfer
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('loyalty');
  const [loadingBill, setLoadingBill] = useState(false);
  const [billType, setBillType] = useState<string>('electricity');
  const [billAmount, setBillAmount] = useState<string>('');
  const [billNumber, setBillNumber] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [recipientNumber, setRecipientNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRedeemOption, setSelectedRedeemOption] = useState<string | null>(null);
  
  const pointsToNextLevel = 50;
  const pointsProgress = (points % 500) / 5; // Calculate percentage to next level (0-100)
  
  // Reward options
  const redeemOptions = [
    { id: '1', title: '৳১০০ ক্যাশব্যাক', points: 200, icon: <DollarSign className="h-5 w-5" /> },
    { id: '2', title: '৫% ডিসকাউন্ট কুপন', points: 300, icon: <Tag className="h-5 w-5" /> },
    { id: '3', title: 'প্রিমিয়াম ফিচার (৭ দিন)', points: 400, icon: <Award className="h-5 w-5" /> },
    { id: '4', title: 'ফ্রি ডেলিভারি (৩টি)', points: 250, icon: <ShoppingBag className="h-5 w-5" /> },
    { id: '5', title: 'মুভি টিকেট', points: 500, icon: <Ticket className="h-5 w-5" /> },
  ];
  
  // Providers by bill type
  const providers: Record<string, { name: string; icon: React.ReactNode }[]> = {
    electricity: [
      { name: 'ডেসকো', icon: <Bolt className="h-5 w-5" /> },
      { name: 'পল্লী বিদ্যুৎ', icon: <Lightbulb className="h-5 w-5" /> },
      { name: 'নেসকো', icon: <Bolt className="h-5 w-5" /> },
    ],
    internet: [
      { name: 'লিংকথ্রি', icon: <Wifi className="h-5 w-5" /> },
      { name: 'আমবার আইটি', icon: <Wifi className="h-5 w-5" /> },
      { name: 'বিটিসিএল', icon: <Wifi className="h-5 w-5" /> },
    ],
    mobile: [
      { name: 'গ্রামীণফোন', icon: <Smartphone className="h-5 w-5" /> },
      { name: 'রবি', icon: <Smartphone className="h-5 w-5" /> },
      { name: 'বাংলালিংক', icon: <Smartphone className="h-5 w-5" /> },
      { name: 'টেলিটক', icon: <Smartphone className="h-5 w-5" /> },
    ],
  };
  
  const handleFetchBill = () => {
    if (!billNumber) {
      toast({
        variant: "destructive",
        title: "বিল নম্বর দিন",
        description: "বিল ফেচ করতে বিল নম্বর দিতে হবে",
      });
      return;
    }
    
    setLoadingBill(true);
    
    // Simulate API call
    setTimeout(() => {
      // Example bill amount based on bill type
      let amount = 0;
      switch (billType) {
        case 'electricity':
          amount = 1250;
          break;
        case 'internet':
          amount = 1000;
          break;
        case 'mobile':
          amount = 500;
          break;
        case 'gas':
          amount = 800;
          break;
        case 'water':
          amount = 350;
          break;
        default:
          amount = 500;
      }
      
      setBillAmount(amount.toString());
      setLoadingBill(false);
      
      toast({
        title: "বিল পাওয়া গেছে",
        description: `${billType === 'electricity' ? 'বিদ্যুৎ' : 
                       billType === 'internet' ? 'ইন্টারনেট' : 
                       billType === 'mobile' ? 'মোবাইল' : 
                       billType === 'gas' ? 'গ্যাস' : 'পানি'} বিলের পরিমাণ: ৳${amount}`,
      });
    }, 1500);
  };
  
  const handlePayBill = () => {
    if (!billNumber || !billAmount) {
      toast({
        variant: "destructive",
        title: "অসম্পূর্ণ তথ্য",
        description: "বিল পরিশোধ করতে সব তথ্য দিতে হবে",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      if (Number(billAmount) > balance) {
        toast({
          variant: "destructive",
          title: "অপর্যাপ্ত ব্যালেন্স",
          description: "বিল পরিশোধ করতে আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই",
        });
        return;
      }
      
      if (onBillPayment) {
        onBillPayment({
          type: billType,
          number: billNumber,
          amount: Number(billAmount)
        });
      }
      
      // Reset form
      setBillNumber('');
      setBillAmount('');
      
      // Show success message
      toast({
        title: "বিল পরিশোধ সফল",
        description: `${billType === 'electricity' ? 'বিদ্যুৎ' : 
                       billType === 'internet' ? 'ইন্টারনেট' : 
                       billType === 'mobile' ? 'মোবাইল' : 
                       billType === 'gas' ? 'গ্যাস' : 'পানি'} বিল সফলভাবে পরিশোধ করা হয়েছে`,
      });
    }, 2000);
  };
  
  const handleTransfer = () => {
    if (!recipientNumber || !transferAmount) {
      toast({
        variant: "destructive",
        title: "অসম্পূর্ণ তথ্য",
        description: "টাকা পাঠাতে সব তথ্য দিতে হবে",
      });
      return;
    }
    
    const amount = Number(transferAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "অবৈধ পরিমাণ",
        description: "একটি বৈধ পরিমাণ দিন",
      });
      return;
    }
    
    if (amount > balance) {
      toast({
        variant: "destructive",
        title: "অপর্যাপ্ত ব্যালেন্স",
        description: "টাকা পাঠাতে আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      if (onTransfer) {
        onTransfer({
          recipient: recipientNumber,
          amount: amount
        });
      }
      
      // Reset form
      setRecipientNumber('');
      setTransferAmount('');
      
      // Show success message
      toast({
        title: "টাকা পাঠানো সফল",
        description: `${recipientNumber} নম্বরে ৳${amount} সফলভাবে পাঠানো হয়েছে`,
      });
    }, 2000);
  };
  
  const handleRedeemPoints = (optionId: string) => {
    const option = redeemOptions.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    if (option.points > points) {
      toast({
        variant: "destructive",
        title: "অপর্যাপ্ত পয়েন্টস",
        description: "এই রিওয়ার্ড রিডিম করতে আপনার পর্যাপ্ত পয়েন্টস নেই",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      if (onPointsRedeemed) {
        onPointsRedeemed(option.points);
      }
      
      // Reset selection
      setSelectedRedeemOption(null);
      
      // Show success message
      toast({
        title: "রিওয়ার্ড রিডিম সফল",
        description: `আপনি সফলভাবে "${option.title}" রিওয়ার্ড রিডিম করেছেন`,
      });
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" /> ওয়ালেট ফিচার
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="loyalty" className="flex items-center gap-1">
              <Star className="h-4 w-4" /> লয়ালটি
            </TabsTrigger>
            <TabsTrigger value="transfer" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" /> ট্রান্সফার
            </TabsTrigger>
            <TabsTrigger value="bills" className="flex items-center gap-1">
              <Receipt className="h-4 w-4" /> বিল পে
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyalty" className="space-y-4 mt-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">আপনার লয়ালটি পয়েন্টস</h3>
                <Badge variant="secondary" className="font-bold">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {points} পয়েন্টস
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>লেভেল প্রোগ্রেস</span>
                  <span>{points % 500}/500</span>
                </div>
                <Progress value={pointsProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  আরও {500 - (points % 500)} পয়েন্টস আর্জন করলে পরবর্তী লেভেলে উন্নীত হবেন
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">পয়েন্টস থেকে রিওয়ার্ড</h3>
              
              <RadioGroup
                value={selectedRedeemOption || ""}
                onValueChange={setSelectedRedeemOption}
              >
                {redeemOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} disabled={option.points > points} />
                    <Label 
                      htmlFor={`option-${option.id}`}
                      className={`flex flex-1 items-center justify-between p-3 rounded-md border cursor-pointer ${
                        selectedRedeemOption === option.id ? 'border-primary bg-primary/5' : 'border-muted'
                      } ${option.points > points ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {option.icon}
                        </div>
                        <span>{option.title}</span>
                      </div>
                      <Badge variant="outline">{option.points} পয়েন্টস</Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <Button 
                className="w-full mt-2" 
                disabled={!selectedRedeemOption || isProcessing}
                onClick={() => selectedRedeemOption && handleRedeemPoints(selectedRedeemOption)}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                  </>
                ) : (
                  <>
                    <Gift className="mr-2 h-4 w-4" /> রিডিম করুন
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">পয়েন্টস আর্জন করুন</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">কেনাকাটা</p>
                      <p className="text-xs text-muted-foreground">প্রতি ১০০ টাকায় ১ পয়েন্ট</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">রেফারেল</p>
                      <p className="text-xs text-muted-foreground">প্রতি রেফারেলে ৫০ পয়েন্ট</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">বিল পেমেন্ট</p>
                      <p className="text-xs text-muted-foreground">প্রতি বিলে ৫ পয়েন্ট</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transfer" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">প্রাপকের মোবাইল নম্বর</Label>
                <Input 
                  id="recipient" 
                  placeholder="01XXXXXXXXX" 
                  value={recipientNumber}
                  onChange={(e) => setRecipientNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">পরিমাণ (৳)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="টাকার পরিমাণ দিন" 
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  ব্যালেন্স: ৳{balance.toLocaleString()}
                </p>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full" 
                  onClick={handleTransfer}
                  disabled={
                    !recipientNumber || 
                    !transferAmount || 
                    isProcessing || 
                    Number(transferAmount) > balance
                  }
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                    </>
                  ) : (
                    <>
                      টাকা পাঠান
                    </>
                  )}
                </Button>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">রিসেন্ট কন্টাক্টস</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setRecipientNumber('01712345678')}>
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mr-2">
                      ক
                    </div>
                    করিম (01712345678)
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setRecipientNumber('01812345678')}>
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mr-2">
                      র
                    </div>
                    রহিম (01812345678)
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bills" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="bill-type">বিলের ধরন</Label>
              <Select value={billType} onValueChange={setBillType}>
                <SelectTrigger id="bill-type">
                  <SelectValue placeholder="বিলের ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electricity">বিদ্যুৎ বিল</SelectItem>
                  <SelectItem value="internet">ইন্টারনেট বিল</SelectItem>
                  <SelectItem value="mobile">মোবাইল রিচার্জ</SelectItem>
                  <SelectItem value="gas">গ্যাস বিল</SelectItem>
                  <SelectItem value="water">পানির বিল</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {billType && providers[billType] && (
              <div className="space-y-2">
                <Label>প্রোভাইডার</Label>
                <div className="grid grid-cols-3 gap-2">
                  {providers[billType].map((provider, idx) => (
                    <div 
                      key={idx} 
                      className="border rounded-md p-2 text-center cursor-pointer hover:border-primary hover:bg-primary/5"
                    >
                      <div className="h-10 w-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        {provider.icon}
                      </div>
                      <span className="text-xs">{provider.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="bill-number">বিল/অ্যাকাউন্ট নম্বর</Label>
              <div className="flex space-x-2">
                <Input 
                  id="bill-number" 
                  placeholder="বিল নম্বর দিন" 
                  className="flex-grow"
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                />
                <Button variant="outline" onClick={handleFetchBill} disabled={loadingBill || !billNumber}>
                  {loadingBill ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {billAmount && (
              <div className="space-y-2">
                <Label htmlFor="bill-amount">বিলের পরিমাণ</Label>
                <Input 
                  id="bill-amount" 
                  value={billAmount} 
                  readOnly 
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  ব্যালেন্স: ৳{balance.toLocaleString()}
                </p>
              </div>
            )}
            
            {billAmount && (
              <Button 
                className="w-full" 
                onClick={handlePayBill}
                disabled={isProcessing || Number(billAmount) > balance}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                  </>
                ) : (
                  <>
                    বিল পরিশোধ করুন
                  </>
                )}
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletExtension;
