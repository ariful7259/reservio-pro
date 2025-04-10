
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  Zap, 
  Phone, 
  Wifi, 
  Tv, 
  DollarSign, 
  Globe, 
  Building, 
  Home, 
  Clock, 
  CheckCircle2, 
  SearchIcon,
  PlusCircle
} from 'lucide-react';

type BillCategory = 'electricity' | 'mobile' | 'internet' | 'tv' | 'gas' | 'water' | 'house-rent' | 'education' | 'others';

interface BillProvider {
  id: string;
  name: string;
  logo?: string;
  category: BillCategory;
}

interface SavedBill {
  id: string;
  accountNumber: string;
  provider: BillProvider;
  nickname: string;
  autoPayEnabled?: boolean;
  dueDate?: Date;
}

const BILL_PROVIDERS: Record<BillCategory, BillProvider[]> = {
  'electricity': [
    { id: 'dpdc', name: 'ঢাকা পাওয়ার ডিস্ট্রিবিউশন কোম্পানি', category: 'electricity' },
    { id: 'desco', name: 'ঢাকা ইলেকট্রিক সাপ্লাই কোম্পানি', category: 'electricity' },
    { id: 'pdb', name: 'বাংলাদেশ পাওয়ার ডেভেলপমেন্ট বোর্ড', category: 'electricity' },
  ],
  'mobile': [
    { id: 'gp', name: 'গ্রামীণফোন', category: 'mobile' },
    { id: 'robi', name: 'রবি', category: 'mobile' },
    { id: 'bl', name: 'বাংলালিংক', category: 'mobile' },
    { id: 'airtel', name: 'এয়ারটেল', category: 'mobile' },
    { id: 'teletalk', name: 'টেলিটক', category: 'mobile' },
  ],
  'internet': [
    { id: 'link3', name: 'লিংক-৩', category: 'internet' },
    { id: 'aamra', name: 'আমরা নেটওয়ার্কস', category: 'internet' },
    { id: 'carnival', name: 'কার্নিভাল ইন্টারনেট', category: 'internet' },
  ],
  'tv': [
    { id: 'akash', name: 'আকাশ ডিটিএইচ', category: 'tv' },
    { id: 'dish', name: 'ডিশ হোম', category: 'tv' },
  ],
  'gas': [
    { id: 'titas', name: 'তিতাস গ্যাস', category: 'gas' },
    { id: 'karnaphuli', name: 'কর্ণফুলী গ্যাস', category: 'gas' },
  ],
  'water': [
    { id: 'wasa', name: 'ওয়াসা', category: 'water' },
    { id: 'cwasa', name: 'চট্টগ্রাম ওয়াসা', category: 'water' },
  ],
  'house-rent': [
    { id: 'house-rent', name: 'বাসা ভাড়া', category: 'house-rent' },
  ],
  'education': [
    { id: 'du', name: 'ঢাকা বিশ্ববিদ্যালয়', category: 'education' },
    { id: 'nsu', name: 'নর্থ সাউথ ইউনিভার্সিটি', category: 'education' },
    { id: 'buet', name: 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়', category: 'education' },
  ],
  'others': [
    { id: 'others', name: 'অন্যান্য', category: 'others' },
  ],
};

const SAVED_BILLS: SavedBill[] = [
  {
    id: 'bill-1',
    accountNumber: '01712345678',
    provider: BILL_PROVIDERS.mobile[0], // Grameenphone
    nickname: 'আমার জিপি নাম্বার',
    autoPayEnabled: true,
    dueDate: new Date(2025, 3, 20),
  },
  {
    id: 'bill-2',
    accountNumber: '1234567890',
    provider: BILL_PROVIDERS.electricity[0], // DPDC
    nickname: 'বাসার বিদ্যুৎ',
    autoPayEnabled: false,
    dueDate: new Date(2025, 3, 15),
  },
  {
    id: 'bill-3',
    accountNumber: 'NET123456',
    provider: BILL_PROVIDERS.internet[0], // Link3
    nickname: 'হোম ইন্টারনেট',
    autoPayEnabled: true,
    dueDate: new Date(2025, 3, 25),
  },
];

const BillPayment: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('saved');
  const [billCategory, setBillCategory] = useState<BillCategory>('electricity');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [nickname, setNickname] = useState('');
  const [savedBills, setSavedBills] = useState<SavedBill[]>(SAVED_BILLS);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredSavedBills = savedBills.filter(bill => 
    bill.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.accountNumber.includes(searchQuery) ||
    bill.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePayBill = (billId?: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      toast({
        title: "বিল পেমেন্ট সফল হয়েছে",
        description: "আপনার বিল সফলভাবে পরিশোধ করা হয়েছে।",
      });
      
      // Reset form after success
      setTimeout(() => {
        setPaymentSuccess(false);
        setBillCategory('electricity');
        setSelectedProvider('');
        setAccountNumber('');
        setBillAmount('');
        setNickname('');
      }, 3000);
    }, 1500);
  };

  const getCategoryIcon = (category: BillCategory) => {
    switch (category) {
      case 'electricity':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'mobile':
        return <Phone className="h-5 w-5 text-blue-500" />;
      case 'internet':
        return <Wifi className="h-5 w-5 text-purple-500" />;
      case 'tv':
        return <Tv className="h-5 w-5 text-red-500" />;
      case 'gas':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-orange-500"><path d="M14 8a2 2 0 0 0-2-2c0-1.06.34-1.89 1.2-2.8a1 1 0 0 0 .3-.7 1 1 0 0 0-1-1 1 1 0 0 0-.7.3C9.69 3.9 8 7.28 8 10c0 4 3 6 7 6a1 1 0 0 0 1-1 1 1 0 0 0-.3-.7c-.91-.86-1.2-1.69-1.2-2.8 0-1.06.34-1.89 1.2-2.8a1 1 0 0 0 .3-.7Z"/><path d="M5 8c0 4 3 8 8 8s8-4 8-8-3-8-8-8-8 4-8 8z"/></svg>;
      case 'water':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><path d="M12 22a8 8 0 0 1-8-8c0-4.52 7.04-13.12 7.04-13.12.32-.42.94-.42 1.26 0 0 0 7.7 8.6 7.7 13.12a8 8 0 0 1-8 8z"/></svg>;
      case 'house-rent':
        return <Home className="h-5 w-5 text-green-500" />;
      case 'education':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-indigo-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
      default:
        return <DollarSign className="h-5 w-5 text-primary" />;
    }
  };

  if (paymentSuccess) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">বিল পেমেন্ট সফল!</h2>
          <p className="text-muted-foreground mb-4">
            আপনার বিল সফলভাবে পরিশোধ করা হয়েছে। ধন্যবাদ!
          </p>
          <Button onClick={() => setPaymentSuccess(false)}>
            আরেকটি বিল পরিশোধ করুন
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved">সেভ করা বিল</TabsTrigger>
          <TabsTrigger value="new">নতুন বিল পে</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="mt-4 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="বিল খুঁজুন" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredSavedBills.length > 0 ? (
            <div className="space-y-3">
              {filteredSavedBills.map((bill) => (
                <Card key={bill.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getCategoryIcon(bill.provider.category)}
                        </div>
                        <div>
                          <h3 className="font-medium">{bill.nickname}</h3>
                          <p className="text-sm text-muted-foreground">{bill.provider.name}</p>
                        </div>
                      </div>
                      
                      {bill.autoPayEnabled && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          অটো-পে সক্রিয়
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">অ্যাকাউন্ট নম্বর</p>
                        <p>{bill.accountNumber}</p>
                      </div>
                      
                      {bill.dueDate && (
                        <div className="text-right">
                          <p className="text-muted-foreground">পরবর্তী বিলের তারিখ</p>
                          <p>{bill.dueDate.toLocaleDateString('bn-BD')}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={() => handlePayBill(bill.id)}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        {isProcessing ? 'প্রসেসিং...' : 'পে করুন'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        বিল চেক করুন
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <PlusCircle className="h-4 w-4" />
                নতুন বিল যোগ করুন
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <DollarSign className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">কোন সেভ করা বিল পাওয়া যায়নি</p>
              <Button 
                onClick={() => setActiveTab('new')} 
                className="mt-4"
                variant="outline"
              >
                নতুন বিল যোগ করুন
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>নতুন বিল পরিশোধ করুন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bill-category">বিলের ধরন</Label>
                <Select 
                  value={billCategory} 
                  onValueChange={(value) => {
                    setBillCategory(value as BillCategory);
                    setSelectedProvider('');
                  }}
                >
                  <SelectTrigger id="bill-category">
                    <SelectValue placeholder="বিলের ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500 inline mr-2" /> বিদ্যুৎ বিল
                    </SelectItem>
                    <SelectItem value="mobile" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-500 inline mr-2" /> মোবাইল বিল
                    </SelectItem>
                    <SelectItem value="internet" className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-purple-500 inline mr-2" /> ইন্টারনেট বিল
                    </SelectItem>
                    <SelectItem value="tv" className="flex items-center gap-2">
                      <Tv className="h-4 w-4 text-red-500 inline mr-2" /> টিভি বিল
                    </SelectItem>
                    <SelectItem value="gas" className="flex items-center gap-2">
                      <span className="inline mr-2">💨</span> গ্যাস বিল
                    </SelectItem>
                    <SelectItem value="water" className="flex items-center gap-2">
                      <span className="inline mr-2">💧</span> পানি বিল
                    </SelectItem>
                    <SelectItem value="house-rent" className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-green-500 inline mr-2" /> বাসা ভাড়া
                    </SelectItem>
                    <SelectItem value="education" className="flex items-center gap-2">
                      <span className="inline mr-2">🎓</span> শিক্ষা ফি
                    </SelectItem>
                    <SelectItem value="others" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary inline mr-2" /> অন্যান্য
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-provider">প্রতিষ্ঠান/সার্ভিস প্রোভাইডার</Label>
                <Select 
                  value={selectedProvider} 
                  onValueChange={setSelectedProvider}
                  disabled={!billCategory}
                >
                  <SelectTrigger id="service-provider">
                    <SelectValue placeholder="সার্ভিস প্রোভাইডার নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {BILL_PROVIDERS[billCategory]?.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-number">অ্যাকাউন্ট/মিটার/মোবাইল নম্বর</Label>
                <Input 
                  id="account-number" 
                  placeholder="অ্যাকাউন্ট নম্বর লিখুন"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bill-amount">বিলের পরিমাণ (৳)</Label>
                <Input 
                  id="bill-amount" 
                  placeholder="0"
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bill-nickname">
                  বিলের নিকনেম <span className="text-muted-foreground text-xs">(ঐচ্ছিক)</span>
                </Label>
                <Input 
                  id="bill-nickname" 
                  placeholder="উদাঃ আমার বাসার বিদ্যুৎ বিল"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between">
                <span className="font-medium">টোটাল পরিমাণ</span>
                <span className="font-bold text-lg">৳{billAmount || '0'}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => {
                  setBillCategory('electricity');
                  setSelectedProvider('');
                  setAccountNumber('');
                  setBillAmount('');
                  setNickname('');
                }}
              >
                রিসেট
              </Button>
              <Button 
                className="w-full sm:flex-1"
                disabled={!selectedProvider || !accountNumber || !billAmount || isProcessing}
                onClick={() => handlePayBill()}
              >
                {isProcessing ? 'প্রসেসিং...' : 'বিল পরিশোধ করুন'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক বিল পেমেন্ট</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">ইন্টারনেট বিল</h3>
                  <p className="font-semibold">৳১,২০০</p>
                </div>
                <p className="text-sm text-muted-foreground">লিংক-৩ নেটওয়ার্কস</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>৫ দিন আগে</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">মোবাইল বিল</h3>
                  <p className="font-semibold">৳৫৫০</p>
                </div>
                <p className="text-sm text-muted-foreground">গ্রামীণফোন</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>১ সপ্তাহ আগে</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full" size="sm" variant="outline">
              সব পেমেন্ট ইতিহাস দেখুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillPayment;
