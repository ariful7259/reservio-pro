
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PlusCircle, 
  ArrowUpRight, 
  CreditCard, 
  BarChart3,
  QrCode,
  SendHorizonal,
  Download,
  MapPin,
  Gift,
  Zap,
  History,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import WalletCard from '@/components/WalletCard';
import TransactionItem from '@/components/TransactionItem';
import WalletQRCode from '@/components/WalletQRCode';
import SendMoneyForm from '@/components/SendMoneyForm';
import WalletNearbyServices from '@/components/WalletNearbyServices';
import LoyaltyPoints from '@/components/wallet/LoyaltyPoints';
import BillPayment from '@/components/wallet/BillPayment';
import { useToast } from '@/components/ui/use-toast';

const Wallet = () => {
  const { toast } = useToast();
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const [mainTab, setMainTab] = useState('wallet');
  const [isFeatureExpanded, setIsFeatureExpanded] = useState(false);

  // Sample wallet data
  const walletData = {
    balance: 12500,
    walletId: 'R65278943',
    phoneNumber: '01712345678',
    userName: 'আবদুল্লাহ আল মামুন',
    lastTransaction: {
      amount: 1500,
      type: 'debit' as const,
      date: '২০ মে, ২০২৩',
    },
  };

  // Sample transactions data
  const transactions = [
    {
      id: '1',
      title: 'ডাক্তার কনসাল্টেশন',
      amount: 1500,
      type: 'debit' as const,
      category: 'appointment' as const,
      date: '২০ মে, ২০২৩',
    },
    {
      id: '2',
      title: 'ওয়ালেট রিচার্জ',
      amount: 5000,
      type: 'credit' as const,
      category: 'service' as const,
      date: '১৫ মে, ২০২৩',
    },
    {
      id: '3',
      title: 'ডেন্টাল চেকআপ',
      amount: 2000,
      type: 'debit' as const,
      category: 'appointment' as const,
      date: '১২ মে, ২০২৩',
    },
    {
      id: '4',
      title: 'রেন্ট পেমেন্ট',
      amount: 8000,
      type: 'debit' as const,
      category: 'rent' as const,
      date: '১০ মে, ২০২৩',
    },
    {
      id: '5',
      title: 'গ্রোসারি শপিং',
      amount: 2500,
      type: 'debit' as const,
      category: 'shopping' as const,
      date: '০৮ মে, ২০২৩',
    },
  ];

  const handleAddMoney = () => {
    // In a real app, this would open a payment gateway
    toast({
      title: "পেমেন্ট গেটওয়ে খোলা হচ্ছে",
      description: "ওয়ালেট রিচার্জের জন্য পেমেন্ট গেটওয়ে খোলা হচ্ছে...",
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="wallet">ওয়ালেট</TabsTrigger>
            <TabsTrigger value="loyalty">লয়ালটি</TabsTrigger>
            <TabsTrigger value="bills">বিল পেমেন্ট</TabsTrigger>
          </TabsList>
        
          <TabsContent value="wallet" className="mt-0">
            <div className="mb-6">
              <WalletCard balance={walletData.balance} lastTransaction={walletData.lastTransaction} />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="border">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <button 
                    className="flex flex-col items-center"
                    onClick={handleAddMoney}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <PlusCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm">অ্যাড মানি</span>
                  </button>
                </CardContent>
              </Card>
              
              <Dialog open={sendMoneyOpen} onOpenChange={setSendMoneyOpen}>
                <DialogTrigger asChild>
                  <Card className="border cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <button className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <SendHorizonal className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm">সেন্ড মানি</span>
                      </button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <SendMoneyForm onClose={() => setSendMoneyOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <Card className="border">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <button className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm">রিসিভ</span>
                  </button>
                </CardContent>
              </Card>
            </div>

            <WalletQRCode 
              walletId={walletData.walletId} 
              phoneNumber={walletData.phoneNumber} 
              userName={walletData.userName} 
            />

            <Collapsible 
              open={isFeatureExpanded} 
              onOpenChange={setIsFeatureExpanded} 
              className="w-full my-6"
            >
              <Card className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">ওয়ালেট ফিচারস</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isFeatureExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      className="flex flex-col p-4 h-auto"
                      onClick={() => setMainTab('loyalty')}
                    >
                      <Gift className="h-6 w-6 mb-2 text-purple-500" />
                      <span className="text-xs">লয়ালটি পয়েন্টস</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex flex-col p-4 h-auto"
                      onClick={() => setMainTab('bills')}
                    >
                      <Zap className="h-6 w-6 mb-2 text-yellow-500" />
                      <span className="text-xs">বিল পেমেন্ট</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex flex-col p-4 h-auto"
                    >
                      <History className="h-6 w-6 mb-2 text-blue-500" />
                      <span className="text-xs">লেনদেন ইতিহাস</span>
                    </Button>
                  </div>
                  
                  <CollapsibleContent className="mt-3">
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        variant="outline" 
                        className="flex flex-col p-4 h-auto"
                      >
                        <CreditCard className="h-6 w-6 mb-2 text-emerald-500" />
                        <span className="text-xs">কার্ড ম্যানেজমেন্ট</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex flex-col p-4 h-auto"
                      >
                        <BarChart3 className="h-6 w-6 mb-2 text-indigo-500" />
                        <span className="text-xs">ফাইনান্সিয়াল ড্যাশবোর্ড</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex flex-col p-4 h-auto"
                      >
                        <MapPin className="h-6 w-6 mb-2 text-red-500" />
                        <span className="text-xs">বিল পেমেন্ট সেন্টার</span>
                      </Button>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>

            <WalletNearbyServices />

            <Tabs defaultValue="transactions" className="mb-6">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="transactions" className="flex-1">লেনদেন</TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">এনালিটিক্স</TabsTrigger>
                <TabsTrigger value="nearby" className="flex-1">নিকটবর্তী</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-0">
                <div className="space-y-1 divide-y">
                  {transactions.map(transaction => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <Card className="border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">খরচের বিশ্লেষণ</h3>
                      <div className="text-sm text-muted-foreground">মে, ২০২৩</div>
                    </div>
                    <div className="h-48 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground mt-3">এনালিটিক্স তৈরি করা হচ্ছে...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nearby" className="mt-0">
                <Card className="border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">আপনার আশেপাশে</h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        ৫ কিমি
                      </Button>
                    </div>
                    <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                      <div className="flex flex-col items-center">
                        <MapPin className="h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground mt-3">ম্যাপ লোড হচ্ছে...</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        আপনার বর্তমান অবস্থান থেকে নিকটবর্তী সার্ভিস, রেস্টুরেন্ট, বা শপিং স্পট খুঁজুন।
                      </p>
                      <Button className="w-full">সার্ভিস খুঁজুন</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="loyalty" className="mt-0">
            <LoyaltyPoints />
          </TabsContent>
          
          <TabsContent value="bills" className="mt-0">
            <BillPayment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
