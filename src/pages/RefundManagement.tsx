
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Import refund components
import RefundRequests from '@/components/refund/RefundRequests';
import { RefundRequest, RefundRule, RefundSettings } from '@/components/refund/types';

// Sample data (in a real application, this would come from an API)
const sampleRefundRequests: RefundRequest[] = [
  {
    id: 'REF-001',
    transactionId: 'TR-12345',
    amount: 1200,
    reason: 'পণ্য মানসম্মত নয়',
    category: 'marketplace',
    status: 'pending',
    requestDate: '২০২৫-০৫-০৫',
    customerName: 'আহমেদ হাসান',
    sellerName: 'ডিজিটাল শপ',
    automatic: false
  },
  {
    id: 'REF-002',
    transactionId: 'TR-12346',
    amount: 3500,
    reason: 'সঠিক পণ্য ডেলিভারি হয়নি',
    category: 'marketplace',
    status: 'approved',
    requestDate: '২০২৫-০৫-০৪',
    responseDate: '২০২৫-০৫-০৪',
    customerName: 'ফারিহা খান',
    sellerName: 'ইলেকট্রনিক হাব',
    automatic: false
  },
  {
    id: 'REF-003',
    transactionId: 'TR-12347',
    amount: 750,
    reason: 'সেবা বাতিল করা হয়েছে',
    category: 'service',
    status: 'processing',
    requestDate: '২০২৫-০৫-০৩',
    responseDate: '২০২৫-০৫-০৩',
    customerName: 'করিম মিয়া',
    sellerName: 'হোম সার্ভিসেস',
    automatic: true
  },
  {
    id: 'REF-004',
    transactionId: 'TR-12348',
    amount: 4000,
    reason: 'ভাড়া বাতিল করা হয়েছে',
    category: 'rental',
    status: 'completed',
    requestDate: '২০২৫-০৫-০২',
    responseDate: '২০২৫-০৫-০৩',
    customerName: 'সাবরিনা হোসেন',
    sellerName: 'রেন্টাল সলিউশন',
    automatic: false
  },
  {
    id: 'REF-005',
    transactionId: 'TR-12349',
    amount: 2200,
    reason: 'ক্রেতা মতামত পরিবর্তন করেছেন',
    category: 'marketplace',
    status: 'rejected',
    requestDate: '২০২৫-০৫-০১',
    responseDate: '২০২৫-০৫-০২',
    customerName: 'তানবীর আকাশ',
    sellerName: 'লাইফস্টাইল স্টোর',
    automatic: false
  }
];

// Sample refund rules
const sampleRefundRules: RefundRule[] = [
  {
    id: 'RULE-001',
    title: 'মার্কেটপ্লেস পণ্য রিফান্ড নীতি',
    description: 'ডেলিভারি পরবর্তী ৭২ ঘণ্টার মধ্যে উপযুক্ত কারণে রিফান্ড সম্ভব',
    category: 'marketplace',
    timeLimit: 72,
    percent: 100,
    conditions: [
      'পণ্যটি অক্ষত অবস্থায় ফেরত দিতে হবে',
      'অরিজিনাল প্যাকেজিং সহ ফেরত দিতে হবে',
      'ডেলিভারি স্লিপ এবং ইনভয়েস থাকতে হবে'
    ],
    active: true
  },
  {
    id: 'RULE-002',
    title: 'সার্ভিস রিফান্ড নীতি',
    description: 'সেবা শুরুর আগে বাতিলে সম্পূর্ণ রিফান্ড, শুরুর পরে আংশিক',
    category: 'service',
    timeLimit: 24,
    percent: 80,
    conditions: [
      'সেবা শুরুর আগে বাতিলে ১০০% রিফান্ড',
      'সেবা শুরুর পর কিন্তু সম্পন্ন না হলে ০-৮০% রিফান্ড',
      'অসন্তোষজনক সেবা প্রমাণিত হলে আংশিক রিফান্ড'
    ],
    active: true
  },
  {
    id: 'RULE-003',
    title: 'রেন্টাল রিফান্ড নীতি',
    description: 'ব্যবহার শুরুর আগে বাতিলে সময় অনুযায়ী আংশিক রিফান্ড',
    category: 'rental',
    timeLimit: 48,
    percent: 90,
    conditions: [
      'ব্যবহার শুরুর ৭২+ ঘণ্টা আগে বাতিলে ৯০% রিফান্ড',
      'ব্যবহার শুরুর ২৪-৭২ ঘণ্টা আগে বাতিলে ৫০% রিফান্ড',
      'ব্যবহার শুরুর ২৪ ঘণ্টার কম আগে বাতিলে রিফান্ড নেই'
    ],
    active: true
  }
];

// Sample refund settings
const sampleRefundSettings: RefundSettings = {
  enableAutoRefund: true,
  autoRefundThreshold: 500,
  notifyOnRefund: true,
  refundToOriginalMethod: true,
  maxAutoRefundAmount: 2000,
  requireApprovalAbove: 1000,
  autoRejectKeywords: ['ভুল', 'মতামত পরিবর্তন', 'বদ্ধ দরজা'],
  holdPeriod: 24
};

const RefundManagement: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('requests');
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(sampleRefundRequests);
  const [refundRules, setRefundRules] = useState<RefundRule[]>(sampleRefundRules);
  const [refundSettings, setRefundSettings] = useState<RefundSettings>(sampleRefundSettings);
  const [openRefundDetails, setOpenRefundDetails] = useState<string | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState<string | null>(null);
  
  // Handle approve refund request
  const handleApproveRefund = (requestId: string) => {
    setRefundRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'approved',
              responseDate: new Date().toLocaleDateString('bn-BD')
            }
          : request
      )
    );
    
    toast({
      title: "রিফান্ড অনুমোদিত",
      description: `রিফান্ড রিকোয়েস্ট #${requestId} সফলভাবে অনুমোদিত হয়েছে`,
    });
    
    setConfirmationDialog(null);
  };
  
  // Handle reject refund request
  const handleRejectRefund = (requestId: string) => {
    setRefundRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'rejected',
              responseDate: new Date().toLocaleDateString('bn-BD')
            }
          : request
      )
    );
    
    toast({
      title: "রিফান্ড বাতিল",
      description: `রিফান্ড রিকোয়েস্ট #${requestId} বাতিল করা হয়েছে`,
    });
    
    setConfirmationDialog(null);
  };
  
  // Handle save settings
  const handleSaveSettings = (newSettings: RefundSettings) => {
    setRefundSettings(newSettings);
    toast({
      title: "সেটিংস আপডেট হয়েছে",
      description: "রিফান্ড সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে",
    });
  };
  
  // Handle save rule
  const handleSaveRule = (rule: RefundRule) => {
    const exists = refundRules.some(r => r.id === rule.id);
    
    if (exists) {
      // Update existing rule
      setRefundRules(prevRules =>
        prevRules.map(r => (r.id === rule.id ? rule : r))
      );
    } else {
      // Add new rule
      setRefundRules(prevRules => [...prevRules, { ...rule, id: `RULE-${Date.now()}` }]);
    }
    
    toast({
      title: "রিফান্ড নীতি আপডেট হয়েছে",
      description: "রিফান্ড নীতি সফলভাবে সংরক্ষণ করা হয়েছে",
    });
  };
  
  // Extract approval/reject ID from confirmation dialog string
  const getIdFromConfirmationDialog = () => {
    if (!confirmationDialog) return null;
    const parts = confirmationDialog.split('-');
    return parts.length > 1 ? parts[1] : null;
  };
  
  // Handle confirmation dialog action
  const handleConfirmationAction = () => {
    if (!confirmationDialog) return;
    
    const action = confirmationDialog.startsWith('approve') ? 'approve' : 'reject';
    const id = getIdFromConfirmationDialog();
    
    if (id) {
      action === 'approve' ? handleApproveRefund(id) : handleRejectRefund(id);
    }
  };
  
  // Confirmation dialog based on action
  const renderConfirmationDialog = () => {
    if (!confirmationDialog) return null;
    
    const action = confirmationDialog.startsWith('approve') ? 'approve' : 'reject';
    const id = getIdFromConfirmationDialog();
    const request = refundRequests.find(r => r.id === id);
    
    if (!request) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {action === 'approve' ? 'রিফান্ড অনুমোদন নিশ্চিত করুন' : 'রিফান্ড বাতিল নিশ্চিত করুন'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {action === 'approve'
                ? `আপনি কি নিশ্চিত যে আপনি #${request.id} রিফান্ড রিকোয়েস্টটি অনুমোদন করতে চান? এটি গ্রাহককে ${request.amount}৳ ফেরত দেওয়া হবে।`
                : `আপনি কি নিশ্চিত যে আপনি #${request.id} রিফান্ড রিকোয়েস্টটি বাতিল করতে চান? এই সিদ্ধান্তটি গ্রাহকের সাথে যোগাযোগ করা হবে।`}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setConfirmationDialog(null)}
              >
                বাতিল করুন
              </Button>
              <Button
                variant={action === 'approve' ? 'default' : 'destructive'}
                onClick={handleConfirmationAction}
              >
                {action === 'approve' ? 'অনুমোদন করুন' : 'বাতিল করুন'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      {/* Back navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          ফিরে যান
        </Button>
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">রিফান্ড ম্যানেজমেন্ট</h1>
        <Button
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="h-4 w-4" />
          সেটিংস
        </Button>
      </div>
      
      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="requests">রিফান্ড রিকোয়েস্ট</TabsTrigger>
          <TabsTrigger value="rules">রিফান্ড নীতিমালা</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-6">
          <RefundRequests 
            refundRequests={refundRequests}
            setOpenRefundDetails={setOpenRefundDetails}
            setConfirmationDialog={setConfirmationDialog}
          />
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড নীতিমালা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {refundRules.map(rule => (
                  <Card key={rule.id} className="overflow-hidden">
                    <CardHeader className={`pb-2 ${rule.active ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{rule.title}</CardTitle>
                        <Button variant="outline" size="sm">এডিট করুন</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground mb-1">বিবরণ</p>
                          <p>{rule.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-muted-foreground mb-1">ক্যাটাগরি</p>
                            <p className="font-medium">
                              {rule.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                               rule.category === 'service' ? 'সার্ভিস' : 'রেন্টাল'}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">সময়সীমা</p>
                            <p className="font-medium">{rule.timeLimit} ঘন্টা</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">রিফান্ড পরিমাণ</p>
                            <p className="font-medium">{rule.percent}%</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground mb-2">শর্তাবলী</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {rule.conditions.map((condition, index) => (
                              <li key={index}>{condition}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button className="w-full">
                  + নতুন রিফান্ড নীতি যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড সেটিংস</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অটোমেটিক রিফান্ড সক্রিয় করুন</h3>
                      <p className="text-sm text-muted-foreground">
                        নির্দিষ্ট পরিমাণের নিচে স্বয়ংক্রিয়ভাবে রিফান্ড অনুমোদন করা হবে
                      </p>
                    </div>
                    <div className="flex items-center h-8">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={refundSettings.enableAutoRefund}
                          onChange={() => 
                            setRefundSettings(prev => ({ ...prev, enableAutoRefund: !prev.enableAutoRefund }))
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">অটোমেটিক রিফান্ড থ্রেশহোল্ড</h3>
                    <p className="text-sm text-muted-foreground">
                      এই পরিমাণের নিচে অটোমেটিক রিফান্ড হবে
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">৳</span>
                        <input 
                          type="number"
                          className="pl-7 border rounded-md h-10 w-full px-3"
                          value={refundSettings.autoRefundThreshold}
                          onChange={(e) => 
                            setRefundSettings(prev => ({ 
                              ...prev, 
                              autoRefundThreshold: parseInt(e.target.value) || 0 
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">সর্বোচ্চ অটোমেটিক রিফান্ড পরিমাণ</h3>
                    <p className="text-sm text-muted-foreground">
                      একটি একক লেনদেনের জন্য সর্বোচ্চ অটোমেটিক রিফান্ড পরিমাণ
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">৳</span>
                        <input 
                          type="number"
                          className="pl-7 border rounded-md h-10 w-full px-3"
                          value={refundSettings.maxAutoRefundAmount}
                          onChange={(e) => 
                            setRefundSettings(prev => ({ 
                              ...prev, 
                              maxAutoRefundAmount: parseInt(e.target.value) || 0 
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">অনুমোদন প্রয়োজন পরিমাণ</h3>
                    <p className="text-sm text-muted-foreground">
                      এই পরিমাণের বেশি হলে ম্যানুয়াল অনুমোদন প্রয়োজন হবে
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">৳</span>
                        <input 
                          type="number"
                          className="pl-7 border rounded-md h-10 w-full px-3"
                          value={refundSettings.requireApprovalAbove}
                          onChange={(e) => 
                            setRefundSettings(prev => ({ 
                              ...prev, 
                              requireApprovalAbove: parseInt(e.target.value) || 0 
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">অটোমেটিক বাতিল শব্দ</h3>
                    <p className="text-sm text-muted-foreground">
                      যে শব্দগুলি থাকলে অটোমেটিক রিফান্ড বাতিল হবে
                    </p>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        className="border rounded-md h-10 w-full px-3"
                        value={refundSettings.autoRejectKeywords.join(', ')}
                        onChange={(e) => 
                          setRefundSettings(prev => ({ 
                            ...prev, 
                            autoRejectKeywords: e.target.value.split(',').map(k => k.trim()) 
                          }))
                        }
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      কমা দিয়ে আলাদা করে শব্দ লিখুন
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">রিফান্ড নোটিফিকেশন</h3>
                      <p className="text-sm text-muted-foreground">
                        রিফান্ড স্ট্যাটাস পরিবর্তনের সময় নোটিফিকেশন পাঠান
                      </p>
                    </div>
                    <div className="flex items-center h-8">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={refundSettings.notifyOnRefund}
                          onChange={() => 
                            setRefundSettings(prev => ({ ...prev, notifyOnRefund: !prev.notifyOnRefund }))
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অরিজিনাল পেমেন্ট মেথডে রিফান্ড</h3>
                      <p className="text-sm text-muted-foreground">
                        যে পেমেন্ট মেথডে লেনদেন হয়েছে, সেখানেই রিফান্ড প্রদান করুন
                      </p>
                    </div>
                    <div className="flex items-center h-8">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={refundSettings.refundToOriginalMethod}
                          onChange={() => 
                            setRefundSettings(prev => ({ ...prev, refundToOriginalMethod: !prev.refundToOriginalMethod }))
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">হোল্ড পিরিয়ড (ঘন্টা)</h3>
                    <p className="text-sm text-muted-foreground">
                      রিফান্ড অনুরোধের পর এই সময় পর্যন্ত অপেক্ষা করুন
                    </p>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number"
                        className="border rounded-md h-10 w-full px-3"
                        value={refundSettings.holdPeriod}
                        onChange={(e) => 
                          setRefundSettings(prev => ({ 
                            ...prev, 
                            holdPeriod: parseInt(e.target.value) || 0 
                          }))
                        }
                      />
                      <span>ঘন্টা</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings(refundSettings)}>
                    সংরক্ষণ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Refund details modal would go here */}
      {openRefundDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>রিফান্ড বিস্তারিত</CardTitle>
            </CardHeader>
            <CardContent>
              <p>রিফান্ড রিকোয়েস্ট #{openRefundDetails} এর বিস্তারিত তথ্য এখানে দেখানো হবে।</p>
              <Button 
                className="mt-4" 
                variant="outline"
                onClick={() => setOpenRefundDetails(null)}
              >
                বন্ধ করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Confirmation dialog */}
      {confirmationDialog && renderConfirmationDialog()}
    </div>
  );
};

export default RefundManagement;
