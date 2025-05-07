
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import RefundDashboard from '@/components/refund/RefundDashboard';
import RefundRequests from '@/components/refund/RefundRequests';
import RefundRules from '@/components/refund/RefundRules';
import { RefundRequest, RefundRule, RefundSettings } from '@/components/refund/types';

// Mock data for demonstration
const mockRefundRequests: RefundRequest[] = [
  {
    id: 'REF001',
    transactionId: 'TRX12345',
    amount: 1500,
    reason: 'প্রোডাক্ট ডিফেক্টিভ',
    category: 'marketplace',
    status: 'pending',
    requestDate: '২০২৫-০৫-০৫',
    customerName: 'আহমেদ হাসান',
    sellerName: 'ইলেকট্রনিক্স স্টোর',
    automatic: false
  },
  {
    id: 'REF002',
    transactionId: 'TRX67890',
    amount: 3000,
    reason: 'ভুল প্রোডাক্ট পাঠানো হয়েছে',
    category: 'marketplace',
    status: 'approved',
    requestDate: '২০২৫-০৫-০৪',
    customerName: 'ফারহানা আক্তার',
    sellerName: 'ফ্যাশন হাউস',
    responseDate: '২০২৫-০৫-০৬',
    automatic: false
  },
  {
    id: 'REF003',
    transactionId: 'TRX24680',
    amount: 800,
    reason: 'সার্ভিস প্রদান করা হয়নি',
    category: 'service',
    status: 'rejected',
    requestDate: '২০২৫-০৫-০২',
    customerName: 'করিম উদ্দিন',
    sellerName: 'হোম সার্ভিস প্রো',
    responseDate: '২০২৫-০৫-০৩',
    automatic: false
  },
  {
    id: 'REF004',
    transactionId: 'TRX13579',
    amount: 5000,
    reason: 'অটোম্যাটিক রিফান্ড - সার্ভিস সময়মত কমপ্লিট হয়নি',
    category: 'service',
    status: 'completed',
    requestDate: '২০২৫-০৫-০১',
    customerName: 'সামিরা খান',
    sellerName: 'টেক সপোর্ট সার্ভিস',
    responseDate: '২০২৫-০৫-০১',
    automatic: true
  },
  {
    id: 'REF005',
    transactionId: 'TRX97531',
    amount: 12000,
    reason: 'বুকিং বাতিল',
    category: 'rental',
    status: 'processing',
    requestDate: '২০২৫-০৫-০৩',
    customerName: 'রাকিব হোসেন',
    sellerName: 'লাক্সারি অ্যাপার্টমেন্টস',
    automatic: false
  }
];

const mockRefundRules: RefundRule[] = [
  {
    id: 'RULE1',
    title: 'মার্কেটপ্লেস রিফান্ড পলিসি',
    description: '৩ দিনের মধ্যে ডিফেক্টিভ প্রোডাক্টের জন্য সম্পূর্ণ রিফান্ড',
    category: 'marketplace',
    timeLimit: 72, // ঘন্টায়
    percent: 100,
    conditions: [
      'প্রোডাক্ট ডিফেক্টিভ হতে হবে',
      'ব্যবহার করা হয়নি এমন অবস্থায় রিটার্ন করতে হবে',
      'প্যাকেজিং অক্ষত থাকতে হবে'
    ],
    active: true
  },
  {
    id: 'RULE2',
    title: 'সার্ভিস রিফান্ড পলিসি',
    description: 'সার্ভিস না করা হলে ২৪ ঘন্টার মধ্যে সম্পূর্ণ রিফান্ড',
    category: 'service',
    timeLimit: 24, // ঘন্টায়
    percent: 100,
    conditions: [
      'সার্ভিস প্রদান না করা হলে',
      'সার্ভিস প্রভাইডার না আসলে',
      'সার্ভিস প্রদান না করেই চলে গেলে'
    ],
    active: true
  },
  {
    id: 'RULE3',
    title: 'রেন্টাল ক্যানসেলেশন পলিসি',
    description: 'বুকিং ডেটের ৪৮ ঘন্টা আগে ক্যানসেল করলে ৮০% রিফান্ড',
    category: 'rental',
    timeLimit: 48, // ঘন্টায়
    percent: 80,
    conditions: [
      'বুকিং ডেটের ৪৮ ঘন্টা আগে ক্যানসেল করতে হবে',
      'পেমেন্ট করার ২৪ ঘন্টার মধ্যে ক্যানসেল করতে হবে'
    ],
    active: false
  },
  {
    id: 'RULE4',
    title: 'পেমেন্ট এরর রিফান্ড পলিসি',
    description: 'দ্বিগুণ পেমেন্ট হলে বা পেমেন্ট এরর হলে সম্পূর্ণ রিফান্ড',
    category: 'marketplace',
    timeLimit: 168, // ঘন্টায় (৭ দিন)
    percent: 100,
    conditions: [
      'পেমেন্ট প্রমাণ দিতে হবে',
      'একই অর্ডারে দ্বিগুণ পেমেন্ট হয়েছে তা প্রমাণ করতে হবে'
    ],
    active: true
  }
];

const mockRefundSettings: RefundSettings = {
  enableAutoRefund: true,
  autoRefundThreshold: 1000,
  notifyOnRefund: true,
  refundToOriginalMethod: true,
  maxAutoRefundAmount: 5000,
  requireApprovalAbove: 3000,
  autoRejectKeywords: ['ভাঙা নয়', 'ইচ্ছা পরিবর্তন', 'মতিবদল'],
  holdPeriod: 24 // ঘন্টায়
};

const RefundManagementPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(mockRefundRequests);
  const [refundRules, setRefundRules] = useState<RefundRule[]>(mockRefundRules);
  const [refundSettings, setRefundSettings] = useState<RefundSettings>(mockRefundSettings);
  const [openRefundDetails, setOpenRefundDetails] = useState<string | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState<string | null>(null);
  const [refundFormOpen, setRefundFormOpen] = useState(false);
  const [newRefundRequest, setNewRefundRequest] = useState<Partial<RefundRequest>>({
    amount: 0,
    reason: '',
    category: 'marketplace',
    customerName: '',
    transactionId: ''
  });
  const { toast } = useToast();

  const handleConfirmationAction = (action: string) => {
    if (action.startsWith('approve-')) {
      const id = action.replace('approve-', '');
      const updatedRequests = refundRequests.map(req => 
        req.id === id ? { ...req, status: 'approved' as const, responseDate: new Date().toLocaleDateString('bn-BD') } : req
      );
      setRefundRequests(updatedRequests);
      toast({
        title: "রিফান্ড অনুমোদিত",
        description: `রিফান্ড আইডি ${id} অনুমোদিত করা হয়েছে।`,
      });
    } else if (action.startsWith('reject-')) {
      const id = action.replace('reject-', '');
      const updatedRequests = refundRequests.map(req => 
        req.id === id ? { ...req, status: 'rejected' as const, responseDate: new Date().toLocaleDateString('bn-BD') } : req
      );
      setRefundRequests(updatedRequests);
      toast({
        title: "রিফান্ড বাতিল হয়েছে",
        description: `রিফান্ড আইডি ${id} বাতিল করা হয়েছে।`,
      });
    }
    setConfirmationDialog(null);
  };

  const handleRefundFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: RefundRequest = {
      id: `REF${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      transactionId: newRefundRequest.transactionId || `TRX${Math.floor(Math.random() * 100000)}`,
      amount: newRefundRequest.amount || 0,
      reason: newRefundRequest.reason || '',
      category: (newRefundRequest.category as 'marketplace' | 'service' | 'rental') || 'marketplace',
      status: 'pending',
      requestDate: new Date().toLocaleDateString('bn-BD'),
      customerName: newRefundRequest.customerName || 'লগইন করা ইউজার',
      sellerName: 'নির্ধারণ করা হবে',
      automatic: false
    };
    
    setRefundRequests([newRequest, ...refundRequests]);
    setRefundFormOpen(false);
    setNewRefundRequest({
      amount: 0,
      reason: '',
      category: 'marketplace',
      customerName: '',
      transactionId: ''
    });
    toast({
      title: "রিফান্ড রিকোয়েস্ট সাবমিট করা হয়েছে",
      description: `আপনার রিফান্ড রিকোয়েস্ট (${newRequest.id}) সাবমিট করা হয়েছে।`,
    });
  };

  const getRefundDetails = (id: string) => {
    return refundRequests.find(request => request.id === id);
  };
  
  // Add toggleRuleStatus function for use in RefundRules component
  const toggleRuleStatus = (id: string) => {
    setRefundRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const currentRefundDetails = openRefundDetails ? getRefundDetails(openRefundDetails) : null;

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">রিফান্ড ম্যানেজমেন্ট</h1>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setRefundFormOpen(true)}
          >
            রিফান্ড রিকোয়েস্ট করুন
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
          <TabsTrigger value="requests">রিফান্ড রিকোয়েস্ট</TabsTrigger>
          <TabsTrigger value="rules">রিফান্ড রুলস</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <RefundDashboard 
            refundRequests={refundRequests}
            refundRules={refundRules}
            refundSettings={refundSettings}
            setRefundSettings={setRefundSettings}
            setActiveTab={setActiveTab}
            setOpenRefundDetails={setOpenRefundDetails}
            toast={toast}
          />
        </TabsContent>

        <TabsContent value="requests">
          <RefundRequests
            refundRequests={refundRequests}
            setOpenRefundDetails={setOpenRefundDetails}
            setConfirmationDialog={setConfirmationDialog}
          />
        </TabsContent>

        <TabsContent value="rules">
          <RefundRules 
            refundRules={refundRules}
            setRefundRules={setRefundRules}
            refundSettings={refundSettings}
            setRefundSettings={setRefundSettings}
            toggleRuleStatus={toggleRuleStatus}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="autoRefundThreshold">অটো রিফান্ড থ্রেশহোল্ড (৳)</Label>
                    <Input
                      id="autoRefundThreshold"
                      type="number"
                      value={refundSettings.autoRefundThreshold}
                      onChange={(e) => setRefundSettings({
                        ...refundSettings,
                        autoRefundThreshold: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      এই পরিমাণ পর্যন্ত অটোমেটিক রিফান্ড হবে
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxAutoRefundAmount">সর্বোচ্চ অটো রিফান্ড পরিমাণ (৳)</Label>
                    <Input
                      id="maxAutoRefundAmount"
                      type="number"
                      value={refundSettings.maxAutoRefundAmount}
                      onChange={(e) => setRefundSettings({
                        ...refundSettings,
                        maxAutoRefundAmount: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requireApprovalAbove">অনুমোদন প্রয়োজন পরিমাণ (৳)</Label>
                    <Input
                      id="requireApprovalAbove"
                      type="number"
                      value={refundSettings.requireApprovalAbove}
                      onChange={(e) => setRefundSettings({
                        ...refundSettings,
                        requireApprovalAbove: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      এই পরিমাণের উপরে ম্যানুয়াল অনুমোদন প্রয়োজন
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="holdPeriod">হোল্ড পিরিয়ড (ঘন্টায়)</Label>
                    <Input
                      id="holdPeriod"
                      type="number"
                      value={refundSettings.holdPeriod}
                      onChange={(e) => setRefundSettings({
                        ...refundSettings,
                        holdPeriod: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      রিফান্ড অনুমোদনের পর কত ঘন্টা অপেক্ষা করবে
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="autoRejectKeywords">অটো রিজেক্ট কিওয়ার্ডস</Label>
                    <Textarea
                      id="autoRejectKeywords"
                      value={refundSettings.autoRejectKeywords.join(', ')}
                      onChange={(e) => setRefundSettings({
                        ...refundSettings,
                        autoRejectKeywords: e.target.value.split(',').map(k => k.trim())
                      })}
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      কমা দিয়ে আলাদা করে লিখুন
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h3 className="font-medium">চেনজ সেভ করুন</h3>
                      <p className="text-sm text-muted-foreground">
                        সেটিংস পরিবর্তন সংরক্ষণ করুন
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        toast({
                          title: "সেটিংস সংরক্ষণ করা হয়েছে",
                          description: "আপনার রিফান্ড সেটিংস সফলভাবে আপডেট করা হয়েছে।"
                        });
                      }}
                    >
                      সেভ করুন
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* রিফান্ড ডিটেইলস ডায়ালগ */}
      <Dialog open={openRefundDetails !== null} onOpenChange={() => setOpenRefundDetails(null)}>
        <DialogContent className="max-w-md">
          {currentRefundDetails && (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">রিফান্ড ডিটেইলস</h2>
                <p className="text-muted-foreground">আইডি: {currentRefundDetails.id}</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">ট্রানজেকশন আইডি</p>
                    <p className="font-medium">{currentRefundDetails.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">পরিমাণ</p>
                    <p className="font-medium">৳{currentRefundDetails.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">কারণ</p>
                  <p className="font-medium">{currentRefundDetails.reason}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">স্ট্যাটাস</p>
                    <p className="font-medium">
                      {currentRefundDetails.status === 'pending' ? 'অপেক্ষমান' :
                       currentRefundDetails.status === 'approved' ? 'অনুমোদিত' :
                       currentRefundDetails.status === 'rejected' ? 'বাতিল' :
                       currentRefundDetails.status === 'processing' ? 'প্রসেসিং' :
                       currentRefundDetails.status === 'completed' ? 'সম্পন্ন' : 
                       currentRefundDetails.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">রিকোয়েস্ট তারিখ</p>
                    <p className="font-medium">{currentRefundDetails.requestDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">কাস্টমার</p>
                    <p className="font-medium">{currentRefundDetails.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">সেলার</p>
                    <p className="font-medium">{currentRefundDetails.sellerName}</p>
                  </div>
                </div>
                
                {currentRefundDetails.status === 'pending' && (
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        setOpenRefundDetails(null);
                        setConfirmationDialog(`reject-${currentRefundDetails.id}`);
                      }}
                    >
                      বাতিল করুন
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => {
                        setOpenRefundDetails(null);
                        setConfirmationDialog(`approve-${currentRefundDetails.id}`);
                      }}
                    >
                      অনুমোদন করুন
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* কনফার্মেশন ডায়ালগ */}
      <AlertDialog open={confirmationDialog !== null} onOpenChange={() => setConfirmationDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmationDialog?.startsWith('approve-') ? 'রিফান্ড অনুমোদন নিশ্চিত করুন' : 'রিফান্ড বাতিল নিশ্চিত করুন'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDialog?.startsWith('approve-') 
                ? 'আপনি কি এই রিফান্ড রিকোয়েস্ট অনুমোদন করতে চাচ্ছেন? এই অ্যাকশন ফিরিয়ে নেওয়া যাবে না।'
                : 'আপনি কি এই রিফান্ড রিকোয়েস্ট বাতিল করতে চাচ্ছেন? এই অ্যাকশন ফিরিয়ে নেওয়া যাবে না।'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmationDialog && handleConfirmationAction(confirmationDialog)}>
              {confirmationDialog?.startsWith('approve-') ? 'অনুমোদন করুন' : 'বাতিল নিশ্চিত করুন'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* নতুন রিফান্ড রিকোয়েস্ট ফর্ম */}
      <Dialog open={refundFormOpen} onOpenChange={setRefundFormOpen}>
        <DialogContent className="max-w-md">
          <h2 className="text-xl font-semibold mb-4">নতুন রিফান্ড রিকোয়েস্ট</h2>
          
          <form onSubmit={handleRefundFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="transactionId">ট্রানজেকশন আইডি</Label>
              <Input
                id="transactionId"
                value={newRefundRequest.transactionId || ''}
                onChange={(e) => setNewRefundRequest({...newRefundRequest, transactionId: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="amount">রিফান্ড পরিমাণ (৳)</Label>
              <Input
                id="amount"
                type="number"
                value={newRefundRequest.amount || ''}
                onChange={(e) => setNewRefundRequest({...newRefundRequest, amount: parseInt(e.target.value)})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">ক্যাটাগরি</Label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={newRefundRequest.category || 'marketplace'}
                onChange={(e) => setNewRefundRequest({...newRefundRequest, category: e.target.value as 'marketplace' | 'service' | 'rental'})}
              >
                <option value="marketplace">মার্কেটপ্লেস</option>
                <option value="service">সার্ভিস</option>
                <option value="rental">রেন্টাল</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="reason">রিফান্ডের কারণ</Label>
              <Textarea
                id="reason"
                value={newRefundRequest.reason || ''}
                onChange={(e) => setNewRefundRequest({...newRefundRequest, reason: e.target.value})}
                required
              />
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => setRefundFormOpen(false)}>
                বাতিল
              </Button>
              <Button type="submit">
                সাবমিট করুন
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefundManagementPage;
