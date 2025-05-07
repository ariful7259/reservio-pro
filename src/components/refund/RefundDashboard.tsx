
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, CheckCircle, AlertCircle, Clock, RefreshCw, XCircle } from 'lucide-react';
import { RefundRequest, RefundRule, RefundSettings } from './types';
import { type Toast } from '@/components/ui/use-toast';

interface RefundDashboardProps {
  refundRequests: RefundRequest[];
  refundRules: RefundRule[];
  refundSettings: RefundSettings;
  setRefundSettings: (settings: RefundSettings) => void;
  setActiveTab: (tab: string) => void;
  setOpenRefundDetails: (id: string | null) => void;
  toast: (props: Toast) => { id: string; dismiss: () => void; update: (props: any) => void };
}

const RefundDashboard: React.FC<RefundDashboardProps> = ({
  refundRequests,
  refundRules,
  refundSettings,
  setActiveTab,
  setOpenRefundDetails,
  toast
}) => {
  // Count refund requests by status
  const pendingCount = refundRequests.filter(r => r.status === 'pending').length;
  const approvedCount = refundRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = refundRequests.filter(r => r.status === 'rejected').length;
  const processingCount = refundRequests.filter(r => r.status === 'processing').length;
  const completedCount = refundRequests.filter(r => r.status === 'completed').length;
  
  // Calculate total refund amount
  const totalRefundAmount = refundRequests
    .filter(r => r.status === 'completed' || r.status === 'approved')
    .reduce((sum, request) => sum + request.amount, 0);
  
  // Count active rules
  const activeRules = refundRules.filter(rule => rule.active).length;
  
  const handleToggleAutoRefund = () => {
    toast({
      title: refundSettings.enableAutoRefund ? 
        "অটো রিফান্ড বন্ধ করা হয়েছে" : 
        "অটো রিফান্ড চালু করা হয়েছে",
      description: refundSettings.enableAutoRefund ?
        "এখন থেকে রিফান্ড রিকোয়েস্ট ম্যানুয়ালি অনুমোদন করতে হবে" :
        `${refundSettings.autoRefundThreshold}৳ পর্যন্ত অটোমেটিক রিফান্ড হবে`,
    });
  };

  return (
    <div className="space-y-6">
      {/* স্ট্যাটিসটিকস */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট রিফান্ড অ্যামাউন্ট</p>
                <p className="text-3xl font-bold">৳{totalRefundAmount.toLocaleString()}</p>
              </div>
              <BarChart className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং রিকোয়েস্ট</p>
                <p className="text-3xl font-bold">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">অনুমোদিত এবং সম্পন্ন</p>
                <p className="text-3xl font-bold">{approvedCount + completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">বাতিল</p>
                <p className="text-3xl font-bold">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* রিফান্ড অবস্থা */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>সাম্প্রতিক রিফান্ড রিকোয়েস্ট</CardTitle>
          </CardHeader>
          <CardContent>
            {refundRequests.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">কোন রিফান্ড রিকোয়েস্ট নেই</p>
              </div>
            ) : (
              <div className="space-y-4">
                {refundRequests.slice(0, 5).map((request) => (
                  <div 
                    key={request.id}
                    className="flex justify-between items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => setOpenRefundDetails(request.id)}
                  >
                    <div>
                      <p className="font-medium">{request.reason}</p>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <span>৳{request.amount}</span>
                        <span>{request.requestDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && <Clock className="h-5 w-5 text-yellow-500" />}
                      {request.status === 'approved' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {request.status === 'rejected' && <XCircle className="h-5 w-5 text-red-500" />}
                      {request.status === 'processing' && <RefreshCw className="h-5 w-5 text-blue-500" />}
                      {request.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab('requests')}
                >
                  সব রিকোয়েস্ট দেখুন
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>কুইক অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">অটোমেটিক রিফান্ড</p>
                  <div className="relative inline-flex items-center cursor-pointer" onClick={handleToggleAutoRefund}>
                    <div className={`w-11 h-6 rounded-full transition ${refundSettings.enableAutoRefund ? 'bg-primary' : 'bg-gray-200'}`}>
                      <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${refundSettings.enableAutoRefund ? 'transform translate-x-5' : ''}`}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {refundSettings.enableAutoRefund 
                    ? `${refundSettings.autoRefundThreshold}৳ পর্যন্ত অটোমেটিক রিফান্ড এনাবল করা আছে` 
                    : 'অটোমেটিক রিফান্ড ডিসেবল করা আছে'}
                </p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">অ্যাকটিভ রুলস</p>
                  <span className="text-xl font-bold">{activeRules}/{refundRules.length}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => setActiveTab('rules')}
                >
                  রুলস ম্যানেজ করুন
                </Button>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">পেন্ডিং রিকোয়েস্টস</p>
                  <div className="flex items-center gap-1">
                    <AlertCircle className={`h-5 w-5 ${pendingCount > 5 ? 'text-red-500' : 'text-yellow-500'}`} />
                    <span className="text-xl font-bold">{pendingCount}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className={`w-full mt-2 ${pendingCount > 0 ? 'border-yellow-200 text-yellow-700 hover:bg-yellow-50' : ''}`}
                  onClick={() => setActiveTab('requests')}
                >
                  রিভিউ করুন
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundDashboard;
