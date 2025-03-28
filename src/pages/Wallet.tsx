
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
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import WalletCard from '@/components/WalletCard';
import TransactionItem from '@/components/TransactionItem';
import WalletQRCode from '@/components/WalletQRCode';
import SendMoneyForm from '@/components/SendMoneyForm';
import WalletNearbyServices from '@/components/WalletNearbyServices';
import { useToast } from '@/components/ui/use-toast';

const Wallet = () => {
  const { toast } = useToast();
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);

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
        <h1 className="text-2xl font-bold">ওয়ালেট</h1>
      </div>

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
    </div>
  );
};

export default Wallet;
