
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ShieldCheck,
  Clock,
  Check,
  AlertTriangle,
  X,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EscrowTransaction {
  id: string;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'refunded' | 'cancelled';
  seller: string;
  buyer: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  escrowSteps: {
    step: string;
    completed: boolean;
    date?: string;
  }[];
}

const EscrowStatus = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowTransaction | null>(null);
  
  // এটি ডেমো ডাটা; আসল অ্যাপে এটি API থেকে লোড হবে
  const escrowTransactions: EscrowTransaction[] = [
    {
      id: 'ESC-12345',
      amount: 15000,
      status: 'active',
      seller: 'মেহেদী হাসান',
      buyer: 'আব্দুল করিম',
      createdAt: '২০২৫-০৪-১০',
      updatedAt: '২০২৫-০৪-১২',
      description: 'ফ্রিল্যান্স ওয়েব ডিজাইন প্রজেক্ট',
      escrowSteps: [
        { step: 'অর্থ জমা', completed: true, date: '২০২৫-০৪-১০' },
        { step: 'সেলার নিশ্চিতকরণ', completed: true, date: '২০২৫-০৪-১১' },
        { step: 'কাজ সম্পন্নকরণ', completed: false },
        { step: 'বায়ার নিশ্চিতকরণ', completed: false },
        { step: 'পেমেন্ট রিলিজ', completed: false }
      ]
    },
    {
      id: 'ESC-12346',
      amount: 25000,
      status: 'completed',
      seller: 'জাকির হোসেন',
      buyer: 'আপনি',
      createdAt: '২০২৫-০৪-০৫',
      updatedAt: '২০২৫-০৪-০৯',
      description: 'মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট',
      escrowSteps: [
        { step: 'অর্থ জমা', completed: true, date: '২০২৫-০৪-০৫' },
        { step: 'সেলার নিশ্চিতকরণ', completed: true, date: '২০২৫-০৪-০৬' },
        { step: 'কাজ সম্পন্নকরণ', completed: true, date: '২০২৫-০৪-০৮' },
        { step: 'বায়ার নিশ্চিতকরণ', completed: true, date: '২০২৫-০৪-০৯' },
        { step: 'পেমেন্ট রিলিজ', completed: true, date: '২০২৫-০৪-০৯' }
      ]
    },
    {
      id: 'ESC-12347',
      amount: 3500,
      status: 'disputed',
      seller: 'রাকিব হাসান',
      buyer: 'আপনি',
      createdAt: '২০২৫-০৪-০১',
      updatedAt: '২০২৫-০৪-০৪',
      description: 'লোগো ডিজাইন',
      escrowSteps: [
        { step: 'অর্থ জমা', completed: true, date: '২০২৫-০৪-০১' },
        { step: 'সেলার নিশ্চিতকরণ', completed: true, date: '২০২৫-০৪-০২' },
        { step: 'কাজ সম্পন্নকরণ', completed: true, date: '২০২৫-০৪-০৩' },
        { step: 'বায়ার নিশ্চিতকরণ', completed: false },
        { step: 'বিরোধ দায়ের', completed: true, date: '২০২৫-০৪-০৪' },
        { step: 'পেমেন্ট রিলিজ', completed: false }
      ]
    },
    {
      id: 'ESC-12348',
      amount: 7500,
      status: 'pending',
      seller: 'আপনি',
      buyer: 'সাদিয়া খান',
      createdAt: '২০২৫-০৪-১৫',
      updatedAt: '২০২৫-০৪-১৫',
      description: 'কনটেন্ট রাইটিং সার্ভিস',
      escrowSteps: [
        { step: 'অর্থ জমা', completed: true, date: '২০২৫-০৪-১৫' },
        { step: 'সেলার নিশ্চিতকরণ', completed: false },
        { step: 'কাজ সম্পন্নকরণ', completed: false },
        { step: 'বায়ার নিশ্চিতকরণ', completed: false },
        { step: 'পেমেন্ট রিলিজ', completed: false }
      ]
    },
    {
      id: 'ESC-12349',
      amount: 12000,
      status: 'refunded',
      seller: 'আপনি',
      buyer: 'তানিম আহমেদ',
      createdAt: '২০২৫-০৩-২৫',
      updatedAt: '২০২৫-০৩-২৮',
      description: 'ডিজিটাল মার্কেটিং সার্ভিস',
      escrowSteps: [
        { step: 'অর্থ জমা', completed: true, date: '২০২৫-০৩-২৫' },
        { step: 'সেলার নিশ্চিতকরণ', completed: true, date: '২০২৫-০৩-২৬' },
        { step: 'কাজ বাতিল', completed: true, date: '২০২৫-০৩-২৮' },
        { step: 'রিফান্ড প্রসেস', completed: true, date: '২০২৫-০৩-২৮' }
      ]
    }
  ];
  
  // ফিল্টারিং লজিক
  const getFilteredTransactions = () => {
    return escrowTransactions.filter(tx => {
      // ট্যাব ফিল্টার
      if (activeTab !== 'all' && tx.status !== activeTab) {
        return false;
      }
      
      // স্ট্যাটাস ফিল্টার
      if (statusFilter !== 'all' && tx.status !== statusFilter) {
        return false;
      }
      
      // সার্চ ফিল্টার
      if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !tx.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  // স্ট্যাটাস ব্যাজ রেন্ডার করার ফাংশন
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">অপেক্ষমান</Badge>;
      case 'active':
        return <Badge className="bg-blue-500">প্রক্রিয়াধীন</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">সম্পন্ন</Badge>;
      case 'disputed':
        return <Badge className="bg-red-500">বিরোধপূর্ণ</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-500">রিফান্ডেড</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500">বাতিল</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // স্ট্যাটাস আইকন রেন্ডার করার ফাংশন
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-500 bg-yellow-50 p-1.5 rounded-full" />;
      case 'active':
        return <ShieldCheck className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded-full" />;
      case 'completed':
        return <Check className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full" />;
      case 'disputed':
        return <AlertTriangle className="h-8 w-8 text-red-500 bg-red-50 p-1.5 rounded-full" />;
      case 'refunded':
        return <ShieldCheck className="h-8 w-8 text-purple-500 bg-purple-50 p-1.5 rounded-full" />;
      case 'cancelled':
        return <X className="h-8 w-8 text-gray-500 bg-gray-50 p-1.5 rounded-full" />;
      default:
        return null;
    }
  };

  // এসক্রো প্রগ্রেস ক্যালকুলেট করার ফাংশন
  const calculateProgress = (steps: { step: string, completed: boolean }[]): number => {
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="container px-4 py-20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">এসক্রো স্ট্যাটাস</h1>
        </div>
        <p className="text-muted-foreground">আপনার সমস্ত এসক্রো লেনদেনের স্ট্যাটাস এখান থেকে দেখুন</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>ফিল্টার এবং সার্চ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="এসক্রো আইডি বা বিবরণ সার্চ করুন" 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="pending">অপেক্ষমান</SelectItem>
                <SelectItem value="active">প্রক্রিয়াধীন</SelectItem>
                <SelectItem value="completed">সম্পন্ন</SelectItem>
                <SelectItem value="disputed">বিরোধপূর্ণ</SelectItem>
                <SelectItem value="refunded">রিফান্ডেড</SelectItem>
                <SelectItem value="cancelled">বাতিল</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">সকল</TabsTrigger>
          <TabsTrigger value="active">প্রক্রিয়াধীন</TabsTrigger>
          <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
          <TabsTrigger value="disputed">বিরোধপূর্ণ</TabsTrigger>
          <TabsTrigger value="refunded">রিফান্ডেড</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredTransactions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShieldCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">কোন এসক্রো লেনদেন পাওয়া যায়নি</h3>
                <p className="text-muted-foreground">আপনার সার্চ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map(escrow => (
                <Card key={escrow.id} className="overflow-hidden hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedEscrow(escrow)}>
                  <CardContent className="p-0">
                    <div className="flex items-start p-4 gap-4">
                      <div className="shrink-0">
                        {renderStatusIcon(escrow.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                          <div>
                            <h3 className="font-medium flex items-center gap-2">
                              {escrow.description}
                              {renderStatusBadge(escrow.status)}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                              <span>আইডি: {escrow.id}</span>
                              <span>তারিখ: {escrow.createdAt}</span>
                              <span>
                                {escrow.seller === 'আপনি' ? 'খরিদ্দার' : 'বিক্রেতা'}: {escrow.seller === 'আপনি' ? escrow.buyer : escrow.seller}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold">৳{escrow.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>প্রগ্রেস</span>
                            <span>{Math.round(calculateProgress(escrow.escrowSteps))}%</span>
                          </div>
                          <Progress value={calculateProgress(escrow.escrowSteps)} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* এসক্রো বিস্তারিত ডায়ালগ */}
      {selectedEscrow && (
        <Dialog open={!!selectedEscrow} onOpenChange={() => setSelectedEscrow(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                এসক্রো বিস্তারিত
                {renderStatusBadge(selectedEscrow.status)}
              </DialogTitle>
              <DialogDescription>
                আইডি: {selectedEscrow.id} | তারিখ: {selectedEscrow.createdAt}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">{selectedEscrow.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    বিক্রেতা: {selectedEscrow.seller} | খরিদ্দার: {selectedEscrow.buyer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">৳{selectedEscrow.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">সর্বশেষ আপডেট: {selectedEscrow.updatedAt}</p>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                <h4 className="font-medium">এসক্রো স্টেপস</h4>
                <div className="space-y-4">
                  {selectedEscrow.escrowSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={step.completed ? 'font-medium' : 'text-muted-foreground'}>
                            {step.step}
                          </span>
                          {step.date && <span className="text-xs text-muted-foreground">{step.date}</span>}
                        </div>
                        {index < selectedEscrow.escrowSteps.length - 1 && (
                          <div className="ml-4 h-6 w-0.5 bg-gray-200 my-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEscrow.status === 'active' && (
                <div className="mt-6 space-y-4 pt-4 border-t">
                  <h4 className="font-medium">অ্যাকশন</h4>
                  {selectedEscrow.seller === 'আপনি' ? (
                    <Button className="w-full">কাজ সম্পন্ন করুন</Button>
                  ) : (
                    <Button className="w-full">পেমেন্ট রিলিজ করুন</Button>
                  )}
                </div>
              )}
              
              {selectedEscrow.status === 'disputed' && (
                <div className="mt-6 space-y-4 pt-4 border-t">
                  <h4 className="font-medium">বিরোধ রেজুলেশন</h4>
                  <div className="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 text-sm">
                    <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                    এই এসক্রো লেনদেনটি বিরোধপূর্ণ অবস্থায় রয়েছে। আমাদের সাপোর্ট টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
                  </div>
                  <Button className="w-full">বিরোধ বিস্তারিত দেখুন</Button>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setSelectedEscrow(null)}>বন্ধ করুন</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EscrowStatus;
