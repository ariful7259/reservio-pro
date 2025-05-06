
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  Check,
  Settings,
  Clock,
  FileText,
  Info,
  Shield,
  Cog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

interface RefundRule {
  id: string;
  title: string;
  description: string;
  category: 'marketplace' | 'service' | 'rental';
  timeLimit: number; // ঘন্টায়
  percent: number;
  conditions: string[];
  active: boolean;
}

interface RefundRequest {
  id: string;
  transactionId: string;
  amount: number;
  reason: string;
  category: 'marketplace' | 'service' | 'rental';
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  requestDate: string;
  customerName: string;
  sellerName: string;
  responseDate?: string;
  automatic: boolean;
}

const AutomaticRefund = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [openRefundDetails, setOpenRefundDetails] = useState<string | null>(null);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState<string | null>(null);
  
  // রিফান্ড রুলস
  const [refundRules, setRefundRules] = useState<RefundRule[]>([
    {
      id: '1',
      title: 'প্রোডাক্ট ডেলিভারি ফেইলড',
      description: 'প্রোডাক্ট ডেলিভারি না হলে অটোমেটিক রিফান্ড হবে',
      category: 'marketplace',
      timeLimit: 72,
      percent: 100,
      conditions: [
        'ডেলিভারি স্ট্যাটাস "ফেইলড" হিসেবে চিহ্নিত হতে হবে',
        'প্রোডাক্ট রিসিভ করা হয়নি নিশ্চিত করতে হবে'
      ],
      active: true
    },
    {
      id: '2',
      title: 'সার্ভিস বাতিল (২৪ ঘন্টার মধ্যে)',
      description: 'কাজ শুরু হওয়ার আগে সার্ভিস বাতিল করলে সম্পূর্ণ রিফান্ড',
      category: 'service',
      timeLimit: 24,
      percent: 100,
      conditions: [
        'সার্ভিস প্রোভাইডার কাজ শুরু করেননি',
        'বুকিংয়ের পর ২৪ ঘন্টার মধ্যে বাতিল করতে হবে'
      ],
      active: true
    },
    {
      id: '3',
      title: 'রেন্টাল চেক-ইন সমস্যা',
      description: 'রেন্টাল প্রপার্টিতে চেক-ইন প্রবলেম হলে আংশিক রিফান্ড',
      category: 'rental',
      timeLimit: 48,
      percent: 80,
      conditions: [
        'প্রোপার্টি ওনার দ্বারা নিশ্চিত করতে হবে',
        'চেক-ইন তারিখের ৪৮ ঘন্টার মধ্যে রিপোর্ট করতে হবে'
      ],
      active: true
    },
    {
      id: '4',
      title: 'প্রোডাক্ট ডিফেক্টিভ',
      description: 'প্রোডাক্ট ডিফেক্টিভ থাকলে আংশিক রিফান্ড',
      category: 'marketplace',
      timeLimit: 24,
      percent: 75,
      conditions: [
        'প্রোডাক্ট রিসিভ করার পর ২৪ ঘন্টার মধ্যে রিপোর্ট করতে হবে',
        'প্রোডাক্টের ছবি প্রদান করতে হবে'
      ],
      active: false
    }
  ]);
  
  // রিফান্ড রিকোয়েস্ট ডেটা
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([
    {
      id: 'REF-12345',
      transactionId: 'TX-67890',
      amount: 3500,
      reason: 'প্রোডাক্ট ডেলিভারি হয়নি',
      category: 'marketplace',
      status: 'approved',
      requestDate: '২০২৫-০৪-১৫',
      customerName: 'আব্দুল করিম',
      sellerName: 'ডিজিটাল স্টোর',
      responseDate: '২০২৫-০৪-১৬',
      automatic: true
    },
    {
      id: 'REF-12346',
      transactionId: 'TX-67891',
      amount: 7500,
      reason: 'সার্ভিস প্রভাইডার রেসপন্স করেনি',
      category: 'service',
      status: 'processing',
      requestDate: '২০২৫-০৪-১৭',
      customerName: 'সাদিয়া আহমেদ',
      sellerName: 'টেক সার্ভিসেস',
      automatic: true
    },
    {
      id: 'REF-12347',
      transactionId: 'TX-67892',
      amount: 15000,
      reason: 'প্রোপার্টির বর্ণনা সঠিক ছিল না',
      category: 'rental',
      status: 'pending',
      requestDate: '২০২৫-০৪-১৮',
      customerName: 'মেহেদী হাসান',
      sellerName: 'প্রিমিয়াম রেন্টাল',
      automatic: false
    },
    {
      id: 'REF-12348',
      transactionId: 'TX-67893',
      amount: 2000,
      reason: 'প্রোডাক্ট ডিফেক্টিভ ছিল',
      category: 'marketplace',
      status: 'rejected',
      requestDate: '২০২৫-০৪-১০',
      customerName: 'রাশেদ আহমেদ',
      sellerName: 'ইলেক্ট্রনিক বাজার',
      responseDate: '২০২৫-০৪-১২',
      automatic: false
    },
    {
      id: 'REF-12349',
      transactionId: 'TX-67894',
      amount: 5000,
      reason: 'পেমেন্ট দুইবার হয়ে গেছে',
      category: 'service',
      status: 'completed',
      requestDate: '২০২৫-০৪-০৫',
      customerName: 'জাহিদ হাসান',
      sellerName: 'টেক সার্ভিসেস',
      responseDate: '২০২৫-০৪-০৬',
      automatic: true
    }
  ]);
  
  // রিফান্ড সেটিংস
  const [refundSettings, setRefundSettings] = useState({
    enableAutoRefund: true,
    autoRefundThreshold: 5000,
    notifyOnRefund: true,
    refundToOriginalMethod: true,
    maxAutoRefundAmount: 25000,
    requireApprovalAbove: 10000,
    autoRejectKeywords: ['ইচ্ছা পরিবর্তন', 'মাইন্ড চেঞ্জ', 'পছন্দ নয়'],
    holdPeriod: 48, // ঘন্টায়
  });
  
  // রিফান্ড রিকোয়েস্ট বিস্তারিত পাওয়া
  const getRefundDetails = (id: string) => {
    return refundRequests.find(request => request.id === id);
  };
  
  // রিফান্ড স্ট্যাটাস আপডেট করা
  const updateRefundStatus = (id: string, newStatus: RefundRequest['status']) => {
    setRefundRequests(
      refundRequests.map(request =>
        request.id === id
          ? {
              ...request,
              status: newStatus,
              responseDate: new Date().toLocaleDateString('bn-BD')
            }
          : request
      )
    );
    
    toast({
      title: "রিফান্ড স্ট্যাটাস আপডেট হয়েছে",
      description: `${id} রিফান্ড এর স্ট্যাটাস এখন ${newStatus === 'approved' ? 'অনুমোদিত' : 
        newStatus === 'processing' ? 'প্রসেসিং' :
        newStatus === 'completed' ? 'সম্পন্ন' :
        newStatus === 'rejected' ? 'বাতিল' : 'পেন্ডিং'}`
    });
    
    setConfirmationDialog(null);
  };
  
  // রিফান্ড রুলের স্ট্যাটাস টগল করা
  const toggleRuleStatus = (id: string) => {
    setRefundRules(
      refundRules.map(rule =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    
    const rule = refundRules.find(r => r.id === id);
    if (rule) {
      toast({
        title: rule.active ? "রুল নিষ্ক্রিয় করা হয়েছে" : "রুল সক্রিয় করা হয়েছে",
        description: `"${rule.title}" ${rule.active ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে৷`
      });
    }
  };
  
  // ফিল্টার অপশনস
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // ফিল্টার করা রিকোয়েস্ট
  const getFilteredRequests = () => {
    return refundRequests.filter(request => {
      if (statusFilter !== 'all' && request.status !== statusFilter) {
        return false;
      }
      
      if (categoryFilter !== 'all' && request.category !== categoryFilter) {
        return false;
      }
      
      if (searchQuery && !request.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !request.reason.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  // স্ট্যাটাস ব্যাজ রেন্ডার করা
  const renderStatusBadge = (status: RefundRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">অপেক্ষমান</Badge>;
      case 'approved':
        return <Badge className="bg-blue-500">অনুমোদিত</Badge>;
      case 'processing':
        return <Badge className="bg-purple-500">প্রসেসিং</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">সম্পন্ন</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">বাতিল</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // স্ট্যাটাস আইকন রেন্ডার করা
  const renderStatusIcon = (status: RefundRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-500 bg-yellow-50 p-1.5 rounded-full" />;
      case 'approved':
        return <Check className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded-full" />;
      case 'processing':
        return <RefreshCw className="h-8 w-8 text-purple-500 bg-purple-50 p-1.5 rounded-full" />;
      case 'completed':
        return <Check className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full" />;
      case 'rejected':
        return <AlertTriangle className="h-8 w-8 text-red-500 bg-red-50 p-1.5 rounded-full" />;
      default:
        return null;
    }
  };

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
          <h1 className="text-2xl font-bold">অটোমেটিক রিফান্ড</h1>
        </div>
        <p className="text-muted-foreground">অটোমেটিক রিফান্ড রুলস সেট এবং রিফান্ড রিকোয়েস্ট ম্যানেজ করুন</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
            <TabsTrigger value="requests">রিফান্ড রিকোয়েস্ট</TabsTrigger>
            <TabsTrigger value="rules">রিফান্ড রুলস</TabsTrigger>
          </TabsList>
          <Button onClick={() => setSettingsDialog(true)}>
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          {/* স্ট্যাটিসটিকস */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{refundRequests.length}</div>
                </div>
                <p className="text-muted-foreground">মোট রিফান্ড</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <div className="bg-green-100 text-green-700 p-2 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">
                    {refundRequests.filter(r => r.status === 'completed').length}
                  </div>
                </div>
                <p className="text-muted-foreground">সম্পন্ন রিফান্ড</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">
                    {refundRequests.filter(r => r.status === 'pending' || r.status === 'processing').length}
                  </div>
                </div>
                <p className="text-muted-foreground">পেন্ডিং রিফান্ড</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">
                    {refundRequests.filter(r => r.automatic).length}
                  </div>
                </div>
                <p className="text-muted-foreground">অটোমেটিক রিফান্ড</p>
              </CardContent>
            </Card>
          </div>
          
          {/* অটো রিফান্ড স্ট্যাটাস */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>অটোমেটিক রিফান্ড স্ট্যাটাস</CardTitle>
                <CardDescription>সিস্টেম রিফান্ড স্থিতি এবং কনফিগারেশন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">অটোমেটিক রিফান্ড</h3>
                      <p className="text-sm text-muted-foreground">সর্বোচ্চ ৳{refundSettings.autoRefundThreshold} পর্যন্ত অটোমেটিক রিফান্ড</p>
                    </div>
                    <Switch 
                      checked={refundSettings.enableAutoRefund} 
                      onCheckedChange={(checked) => {
                        setRefundSettings({...refundSettings, enableAutoRefund: checked});
                        toast({
                          title: checked ? "অটোমেটিক রিফান্ড সক্রিয় করা হয়েছে" : "অটোমেটিক রিফান্ড নিষ্ক্রিয় করা হয়েছে",
                        });
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">রিফান্ড নোটিফিকেশন</h3>
                      <p className="text-sm text-muted-foreground">রিফান্ড প্রসেস হলে নোটিফিকেশন</p>
                    </div>
                    <Switch 
                      checked={refundSettings.notifyOnRefund} 
                      onCheckedChange={(checked) => {
                        setRefundSettings({...refundSettings, notifyOnRefund: checked});
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">আসল পেমেন্ট মেথডে রিফান্ড</h3>
                      <p className="text-sm text-muted-foreground">যে পেমেন্ট মেথড থেকে পেমেন্ট করা হয়েছিল</p>
                    </div>
                    <Switch 
                      checked={refundSettings.refundToOriginalMethod} 
                      onCheckedChange={(checked) => {
                        setRefundSettings({...refundSettings, refundToOriginalMethod: checked});
                      }}
                    />
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {refundSettings.enableAutoRefund 
                      ? `অটোমেটিক রিফান্ড সক্রিয় আছে। ৳${refundSettings.autoRefundThreshold} পর্যন্ত রিফান্ড অটোমেটিক প্রসেস হবে।` 
                      : "অটোমেটিক রিফান্ড বর্তমানে নিষ্ক্রিয় আছে। সকল রিফান্ড ম্যানুয়ালি রিভিউ করা হবে।"}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* সাম্প্রতিক রিফান্ড */}
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক রিফান্ড</CardTitle>
                <CardDescription>সর্বশেষ রিফান্ড রিকোয়েস্ট</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {refundRequests.slice(0, 3).map(request => (
                    <div 
                      key={request.id} 
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setOpenRefundDetails(request.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {renderStatusIcon(request.status)}
                          <div>
                            <h4 className="font-medium">{request.reason}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{request.id}</span>
                              <span>•</span>
                              <span>৳{request.amount}</span>
                              <span>•</span>
                              <span>{request.requestDate}</span>
                            </div>
                          </div>
                        </div>
                        {renderStatusBadge(request.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-3 px-4 border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setActiveTab('requests')}
                  >
                    সকল রিফান্ড দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* অ্যাকটিভ রুলস এবং অটো রিফান্ড পারফরম্যান্স */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>অ্যাকটিভ রিফান্ড রুলস</CardTitle>
                  <CardDescription>বর্তমানে সক্রিয় রিফান্ড রুলস</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {refundRules.filter(rule => rule.active).length === 0 ? (
                      <div className="p-6 text-center">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <h3 className="font-medium mb-1">কোন সক্রিয় রুল নেই</h3>
                        <p className="text-sm text-muted-foreground">
                          রিফান্ড রুলস ট্যাবে গিয়ে রিফান্ড রুলস সক্রিয় করুন
                        </p>
                      </div>
                    ) : (
                      refundRules.filter(rule => rule.active).map(rule => (
                        <div key={rule.id} className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{rule.title}</h3>
                              <Badge variant="outline">
                                {rule.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                                 rule.category === 'service' ? 'সার্ভিস' :
                                 rule.category === 'rental' ? 'রেন্টাল' : rule.category}
                              </Badge>
                            </div>
                            <div className="text-sm text-blue-600 font-medium">{rule.percent}% রিফান্ড</div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                          <div className="text-xs text-muted-foreground">
                            সময়সীমা: {rule.timeLimit} ঘন্টা
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="py-3 px-4 border-t">
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setActiveTab('rules')}
                    >
                      সকল রুলস ম্যানেজ করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>অটো রিফান্ড পারফরম্যান্স</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>স্বয়ংক্রিয়তা রেট</span>
                      <span>
                        {Math.round((refundRequests.filter(r => r.automatic).length / refundRequests.length) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(refundRequests.filter(r => r.automatic).length / refundRequests.length) * 100}
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>রিফান্ড সম্পন্ন হার</span>
                      <span>
                        {Math.round((refundRequests.filter(r => r.status === 'completed').length / refundRequests.length) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(refundRequests.filter(r => r.status === 'completed').length / refundRequests.length) * 100}
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>রিফান্ড প্রসেসিং সময়</span>
                      <span>গড় 24 ঘন্টা</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-3">রিফান্ড ক্যাটাগরি বন্টন</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <div className="text-sm font-medium">
                          {refundRequests.filter(r => r.category === 'marketplace').length}
                        </div>
                        <div className="text-xs text-muted-foreground">মার্কেটপ্লেস</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="text-sm font-medium">
                          {refundRequests.filter(r => r.category === 'service').length}
                        </div>
                        <div className="text-xs text-muted-foreground">সার্ভিস</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded text-center">
                        <div className="text-sm font-medium">
                          {refundRequests.filter(r => r.category === 'rental').length}
                        </div>
                        <div className="text-xs text-muted-foreground">রেন্টাল</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-6">
          {/* ফিল্টার অপশনস */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>রিফান্ড রিকোয়েস্ট ফিল্টার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="আইডি, কাস্টমার বা বিবরণ সার্চ করুন" 
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
                    <SelectItem value="approved">অনুমোদিত</SelectItem>
                    <SelectItem value="processing">প্রসেসিং</SelectItem>
                    <SelectItem value="completed">সম্পন্ন</SelectItem>
                    <SelectItem value="rejected">বাতিল</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="ক্যাটাগরি ফিল্টার" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                    <SelectItem value="service">সার্ভিস</SelectItem>
                    <SelectItem value="rental">রেন্টাল</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* রিফান্ড রিকোয়েস্ট লিস্ট */}
          <div className="space-y-4">
            {getFilteredRequests().length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">কোন রিকোয়েস্ট পাওয়া যায়নি</h3>
                  <p className="text-muted-foreground">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                </CardContent>
              </Card>
            ) : (
              getFilteredRequests().map(request => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex justify-between p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">{renderStatusIcon(request.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{request.reason}</h3>
                            {renderStatusBadge(request.status)}
                            {request.automatic && (
                              <Badge variant="outline" className="bg-purple-50">অটোমেটিক</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <span>আইডি: {request.id}</span>
                            <span>তারিখ: {request.requestDate}</span>
                            <span>
                              ক্যাটাগরি: {request.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                                         request.category === 'service' ? 'সার্ভিস' :
                                         request.category === 'rental' ? 'রেন্টাল' : ''}
                            </span>
                            <span>ট্রানজেকশন: {request.transactionId}</span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <span className="text-lg font-semibold">৳{request.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setOpenRefundDetails(request.id)}
                        >
                          বিস্তারিত
                        </Button>
                      </div>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="px-4 pb-4 pt-0 flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => setConfirmationDialog(`reject-${request.id}`)}
                        >
                          বাতিল করুন
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                          onClick={() => setConfirmationDialog(`approve-${request.id}`)}
                        >
                          অনুমোদন করুন
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-6">
          {/* রিফান্ড রুলস */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>রিফান্ড রুলস</CardTitle>
                  <CardDescription>অটোমেটিক রিফান্ড রুলস কনফিগারেশন</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {refundRules.map(rule => (
                      <div key={rule.id} className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{rule.title}</h3>
                            <Badge variant={rule.active ? "default" : "outline"}>
                              {rule.active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                            </Badge>
                          </div>
                          <Switch 
                            checked={rule.active}
                            onCheckedChange={() => toggleRuleStatus(rule.id)}
                          />
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">ক্যাটাগরি:</span>
                            <Badge variant="outline" className="ml-2">
                              {rule.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                               rule.category === 'service' ? 'সার্ভিস' :
                               rule.category === 'rental' ? 'রেন্টাল' : rule.category}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">রিফান্ড পরিমাণ:</span>
                            <span className="ml-2 font-medium">{rule.percent}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">সময়সীমা:</span>
                            <span className="ml-2">{rule.timeLimit} ঘন্টা</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-2 rounded text-sm">
                          <h4 className="font-medium mb-1">শর্তাবলী:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {rule.conditions.map((condition, i) => (
                              <li key={i} className="text-muted-foreground">{condition}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* অটোমেটিক রিফান্ড বিবরণ */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>অটোমেটিক রিফান্ড গাইড</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    অটোমেটিক রিফান্ড সিস্টেম স্বয়ংক্রিয়ভাবে নির্দিষ্ট শর্তাবলীর উপর ভিত্তি করে রিফান্ড প্রসেস করে, যা খরচ এবং সময় সাশ্রয় করে।
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">দ্রুত রিফান্ড প্রসেসিং</h4>
                        <p className="text-xs text-muted-foreground">
                          ম্যানুয়াল অনুমোদনের প্রয়োজন ছাড়াই দ্রুত রিফান্ড
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">নিয়ম-ভিত্তিক প্রসেসিং</h4>
                        <p className="text-xs text-muted-foreground">
                          স্পষ্ট নিয়ম ও শর্তাবলী অনুসারে রিফান্ড প্রসেস করা হয়
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Cog className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">কাস্টমাইজেবল সেটিংস</h4>
                        <p className="text-xs text-muted-foreground">
                          আপনার প্রয়োজনে অনুযায়ী রিফান্ড রুলস কাস্টমাইজ করতে পারেন
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">শুরু করার টিপস</h4>
                    <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                      <li>প্রথমে আপনার সাধারণ রিফান্ড কেস গুলো চিহ্নিত করুন</li>
                      <li>সঠিক সময়সীমা নির্ধারণ করুন যাতে গ্রাহকরা রিফান্ড পাওয়ার সুযোগ পায়</li>
                      <li>রিফান্ড রুলস সক্রিয় করুন এবং সিস্টেম টেস্ট করুন</li>
                      <li>পার্ফরমেন্স মনিটর করুন এবং প্রয়োজনে সামঞ্জস্য করুন</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* রিফান্ড বিস্তারিত ডায়ালগ */}
      {openRefundDetails && (
        <Dialog open={!!openRefundDetails} onOpenChange={() => setOpenRefundDetails(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                রিফান্ড বিস্তারিত
                {renderStatusBadge(getRefundDetails(openRefundDetails)?.status || 'pending')}
              </DialogTitle>
              <DialogDescription>
                আইডি: {openRefundDetails}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <Label className="text-muted-foreground">রিকোয়েস্ট তারিখ</Label>
                  <div>{getRefundDetails(openRefundDetails)?.requestDate}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">পরিমাণ</Label>
                  <div className="font-bold">৳{getRefundDetails(openRefundDetails)?.amount.toLocaleString()}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">ট্রানজেকশন আইডি</Label>
                  <div>{getRefundDetails(openRefundDetails)?.transactionId}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">ক্যাটাগরি</Label>
                  <div>
                    {getRefundDetails(openRefundDetails)?.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                     getRefundDetails(openRefundDetails)?.category === 'service' ? 'সার্ভিস' :
                     getRefundDetails(openRefundDetails)?.category === 'rental' ? 'রেন্টাল' : ''}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">কাস্টমার</Label>
                  <div>{getRefundDetails(openRefundDetails)?.customerName}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">সেলার</Label>
                  <div>{getRefundDetails(openRefundDetails)?.sellerName}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <Label className="text-muted-foreground">রিফান্ড কারণ</Label>
                <div className="bg-gray-50 p-3 rounded mt-1">
                  {getRefundDetails(openRefundDetails)?.reason}
                </div>
              </div>
              
              {getRefundDetails(openRefundDetails)?.automatic && (
                <Alert className="mb-4 bg-purple-50 border-purple-200">
                  <RefreshCw className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-700">
                    এটি একটি অটোমেটিক রিফান্ড রিকোয়েস্ট যা সিস্টেম দ্বারা প্রসেস করা হচ্ছে।
                  </AlertDescription>
                </Alert>
              )}
              
              {getRefundDetails(openRefundDetails)?.status === 'pending' && (
                <div className="flex gap-2 justify-end mt-4">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setConfirmationDialog(`reject-${openRefundDetails}`)}
                  >
                    বাতিল করুন
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                    onClick={() => setConfirmationDialog(`approve-${openRefundDetails}`)}
                  >
                    অনুমোদন করুন
                  </Button>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setOpenRefundDetails(null)}>বন্ধ করুন</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* রিফান্ড সেটিংস ডায়ালগ */}
      <Dialog open={settingsDialog} onOpenChange={setSettingsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>রিফান্ড সেটিংস</DialogTitle>
            <DialogDescription>
              অটোমেটিক রিফান্ড সিস্টেমের জন্য সেটিংস কনফিগার করুন
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">অটোমেটিক রিফান্ড</h3>
                <p className="text-sm text-muted-foreground">স্বয়ংক্রিয়ভাবে রিফান্ড প্রসেস করুন</p>
              </div>
              <Switch 
                checked={refundSettings.enableAutoRefund} 
                onCheckedChange={(checked) => {
                  setRefundSettings({...refundSettings, enableAutoRefund: checked});
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label>অটো রিফান্ড থ্রেশহোল্ড</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">৳</span>
                <Input 
                  type="number" 
                  value={refundSettings.autoRefundThreshold}
                  onChange={(e) => setRefundSettings({
                    ...refundSettings, 
                    autoRefundThreshold: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                এই পরিমাণের কম টাকার রিফান্ড অটোমেটিক প্রসেস করা হবে
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>সর্বোচ্চ অটো রিফান্ড পরিমাণ</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">৳</span>
                <Input 
                  type="number" 
                  value={refundSettings.maxAutoRefundAmount}
                  onChange={(e) => setRefundSettings({
                    ...refundSettings, 
                    maxAutoRefundAmount: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                সর্বোচ্চ যত টাকা অটোমেটিক রিফান্ড করা যাবে
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>হোল্ড পিরিয়ড (ঘন্টা)</Label>
              <Input 
                type="number" 
                value={refundSettings.holdPeriod}
                onChange={(e) => setRefundSettings({
                  ...refundSettings, 
                  holdPeriod: parseInt(e.target.value) || 0
                })}
              />
              <p className="text-xs text-muted-foreground">
                রিফান্ড প্রসেস করার আগে কত ঘন্টা অপেক্ষা করবে
              </p>
            </div>
            
            <div className="pt-4 border-t flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">নোটিফিকেশন</h3>
                  <p className="text-sm text-muted-foreground">রিফান্ড প্রসেস হলে নোটিফিকেশন</p>
                </div>
                <Switch 
                  checked={refundSettings.notifyOnRefund} 
                  onCheckedChange={(checked) => {
                    setRefundSettings({...refundSettings, notifyOnRefund: checked});
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">আসল পেমেন্ট মেথডে রিফান্ড</h3>
                  <p className="text-sm text-muted-foreground">যে পেমেন্ট মেথড থেকে পেমেন্ট করা হয়েছিল</p>
                </div>
                <Switch 
                  checked={refundSettings.refundToOriginalMethod} 
                  onCheckedChange={(checked) => {
                    setRefundSettings({...refundSettings, refundToOriginalMethod: checked});
                  }}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialog(false)}>বাতিল</Button>
            <Button onClick={() => {
              toast({
                title: "সেটিংস সংরক্ষিত হয়েছে",
                description: "রিফান্ড সেটিংস সফলভাবে সংরক্ষিত হয়েছে।"
              });
              setSettingsDialog(false);
            }}>সংরক্ষণ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* রিফান্ড অনুমোদন/বাতিল কনফার্মেশন ডায়ালগ */}
      {confirmationDialog && (
        <Dialog open={!!confirmationDialog} onOpenChange={() => setConfirmationDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {confirmationDialog.startsWith('approve') ? 'রিফান্ড অনুমোদন' : 'রিফান্ড বাতিল'}
              </DialogTitle>
              <DialogDescription>
                {confirmationDialog.startsWith('approve') 
                  ? 'আপনি কি নিশ্চিত এই রিফান্ড রিকোয়েস্ট অনুমোদন করতে চান?' 
                  : 'আপনি কি নিশ্চিত এই রিফান্ড রিকোয়েস্ট বাতিল করতে চান?'}
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialog(null)}>না, বাতিল করুন</Button>
              <Button 
                variant={confirmationDialog.startsWith('approve') ? "default" : "destructive"}
                onClick={() => {
                  const [action, id] = confirmationDialog.split('-');
                  if (action === 'approve') {
                    updateRefundStatus(id, 'approved');
                  } else if (action === 'reject') {
                    updateRefundStatus(id, 'rejected');
                  }
                }}
              >
                {confirmationDialog.startsWith('approve') ? 'হ্যাঁ, অনুমোদন করুন' : 'হ্যাঁ, বাতিল করুন'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AutomaticRefund;
