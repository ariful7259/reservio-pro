
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletQRCode from '@/components/WalletQRCode';
import { 
  QrCode, 
  Download, 
  Share2, 
  Smartphone, 
  Users,
  TrendingUp,
  Copy,
  Plus,
  BarChart3
} from 'lucide-react';

const QRCodePaymentSystem = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('fixed');

  // Predefined amounts
  const predefinedAmounts = ['১০০', '৫০০', '১০০০', '২০০০', '৫০০০', '১০০০০'];

  // QR Code stats
  const qrStats = [
    {
      title: 'আজকের QR পেমেন্ট',
      value: '৳১৮,৫০০',
      change: '+১৫%',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />
    },
    {
      title: 'QR স্ক্যান',
      value: '৮৯',
      change: '+১২%',
      icon: <QrCode className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'সফল পেমেন্ট',
      value: '৭৬',
      change: '+৮%',
      icon: <Users className="h-5 w-5 text-purple-600" />
    }
  ];

  // Recent QR transactions
  const recentTransactions = [
    {
      id: '1',
      amount: '৳২,৫০০',
      time: '১০ মিনিট আগে',
      method: 'বিকাশ',
      status: 'সফল'
    },
    {
      id: '2',
      amount: '৳১,০০০',
      time: '২৫ মিনিট আগে',
      method: 'নগদ',
      status: 'সফল'
    },
    {
      id: '3',
      amount: '৳৭৫০',
      time: '১ ঘন্টা আগে',
      method: 'রকেট',
      status: 'সফল'
    }
  ];

  const generateQRCode = () => {
    const amount = activeTab === 'fixed' ? selectedAmount : customAmount;
    if (!amount) {
      toast({
        title: "পরিমাণ নির্বাচন করুন",
        description: "QR কোড তৈরি করতে পেমেন্টের পরিমাণ দিন",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "QR কোড তৈরি হয়েছে",
      description: `৳${amount} এর জন্য QR কোড তৈরি করা হয়েছে`,
    });
  };

  const downloadQRCode = () => {
    toast({
      title: "QR কোড ডাউনলোড",
      description: "QR কোড ছবি হিসেবে ডাউনলোড হচ্ছে...",
    });
  };

  const shareQRCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'আমার পেমেন্ট QR কোড',
        text: 'এই QR কোড স্ক্যান করে পেমেন্ট করুন',
      });
    } else {
      toast({
        title: "QR কোড শেয়ার",
        description: "QR কোড শেয়ার করার লিংক কপি করা হয়েছে",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            QR কোড পেমেন্ট সিস্টেম
          </h2>
          <p className="text-muted-foreground">
            QR কোড দিয়ে সহজে পেমেন্ট গ্রহণ করুন
          </p>
        </div>
      </div>

      {/* QR Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {qrStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} গত সপ্তাহ থেকে</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main QR Code Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code Generator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>QR কোড জেনারেটর</CardTitle>
              <CardDescription>
                পেমেন্টের পরিমাণ নির্বাচন করে QR কোড তৈরি করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fixed">নির্দিষ্ট পরিমাণ</TabsTrigger>
                  <TabsTrigger value="custom">কাস্টম পরিমাণ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="fixed" className="space-y-4">
                  <Label>পরিমাণ নির্বাচন করুন:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => setSelectedAmount(amount)}
                        className="h-12"
                      >
                        ৳{amount}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">কাস্টম পরিমাণ (৳)</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="পরিমাণ লিখুন"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={generateQRCode} className="flex-1">
                  <QrCode className="h-4 w-4 mr-2" />
                  QR কোড তৈরি করুন
                </Button>
                <Button variant="outline" onClick={downloadQRCode}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={shareQRCode}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My QR Code */}
        <div>
          <WalletQRCode 
            walletId="SHOP001"
            phoneNumber="01712345678"
            userName="আমার দোকান"
          />
        </div>
      </div>

      {/* Recent QR Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            সাম্প্রতিক QR পেমেন্ট
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.method} • {transaction.time}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QR Payment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            QR কোড ব্যবহারের নির্দেশনা
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">গ্রাহকদের জন্য:</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">১</span>
                  <span>আপনার মোবাইল ব্যাংকিং অ্যাপ খুলুন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">২</span>
                  <span>QR কোড স্ক্যান অপশনে যান</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">৩</span>
                  <span>QR কোড স্ক্যান করুন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">৪</span>
                  <span>পেমেন্ট নিশ্চিত করুন</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">সাপোর্টেড অ্যাপ:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">বিকাশ</span>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">নগদ</span>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">রকেট</span>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm">সুরেক্যাশ</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodePaymentSystem;
