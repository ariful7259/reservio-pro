
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import RefundDashboard from '@/components/refund/RefundDashboard';
import RefundRequests from '@/components/refund/RefundRequests';
import RefundRules from '@/components/refund/RefundRules';
import RefundDialogs from '@/components/refund/RefundDialogs';
import { renderStatusBadge } from '@/components/refund/refundUtils';
import { RefundRule, RefundRequest, RefundSettings } from '@/components/refund/types';

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
  const [refundSettings, setRefundSettings] = useState<RefundSettings>({
    enableAutoRefund: true,
    autoRefundThreshold: 5000,
    notifyOnRefund: true,
    refundToOriginalMethod: true,
    maxAutoRefundAmount: 25000,
    requireApprovalAbove: 10000,
    autoRejectKeywords: ['ইচ্ছা পরিবর্তন', 'মাইন্ড চেঞ্জ', 'পছন্দ নয়'],
    holdPeriod: 48, // ঘন্টায়
  });
  
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
            refundSettings={refundSettings}
            setRefundRules={setRefundRules}
            setRefundSettings={setRefundSettings}
            toggleRuleStatus={toggleRuleStatus}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialog components */}
      <RefundDialogs
        openRefundDetails={openRefundDetails}
        setOpenRefundDetails={setOpenRefundDetails}
        settingsDialog={settingsDialog}
        setSettingsDialog={setSettingsDialog}
        confirmationDialog={confirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
        refundRequests={refundRequests}
        refundSettings={refundSettings}
        setRefundSettings={setRefundSettings}
        updateRefundStatus={updateRefundStatus}
        renderStatusBadge={renderStatusBadge}
        toast={toast}
      />
    </div>
  );
};

export default AutomaticRefund;
