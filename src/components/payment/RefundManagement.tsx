
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  RefreshCw, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Plus,
  Eye,
  FileText
} from 'lucide-react';

interface RefundRequest {
  id: string;
  transactionId: string;
  customer: string;
  amount: string;
  reason: string;
  status: 'অপেক্ষমাণ' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'সম্পন্ন';
  requestDate: string;
  processedDate?: string;
  notes?: string;
}

const RefundManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRefund, setNewRefund] = useState({
    transactionId: '',
    reason: '',
    amount: '',
    notes: ''
  });

  const refundRequests: RefundRequest[] = [
    {
      id: 'REF001',
      transactionId: 'TXN001',
      customer: 'আহমেদ হোসেন',
      amount: '৳২,৫০০',
      reason: 'পণ্য ক্ষতিগ্রস্ত অবস্থায় পৌঁছেছে',
      status: 'অপেক্ষমাণ',
      requestDate: '১৬ জানুয়ারি, ২০২৪',
      notes: 'গ্রাহক ছবি প্রমাণ পাঠিয়েছেন'
    },
    {
      id: 'REF002',
      transactionId: 'TXN005',
      customer: 'ফাতেমা খাতুন',
      amount: '৳১,২০০',
      reason: 'সার্ভিস প্রত্যাশা অনুযায়ী হয়নি',
      status: 'অনুমোদিত',
      requestDate: '১৫ জানুয়ারি, ২০২৪',
      processedDate: '১৬ জানুয়ারি, ২০২৪',
      notes: 'আংশিক রিফান্ড অনুমোদিত'
    },
    {
      id: 'REF003',
      transactionId: 'TXN008',
      customer: 'করিম উদ্দিন',
      amount: '৳৮০০',
      reason: 'ভুল পেমেন্ট',
      status: 'সম্পন্ন',
      requestDate: '১৪ জানুয়ারি, ২০২৪',
      processedDate: '১৫ জানুয়ারি, ২০২৪',
      notes: 'সম্পূর্ণ রিফান্ড প্রদান করা হয়েছে'
    },
    {
      id: 'REF004',
      transactionId: 'TXN012',
      customer: 'রাশিদা বেগম',
      amount: '৳৩,৮০০',
      reason: 'সময়মত ডেলিভারি হয়নি',
      status: 'প্রত্যাখ্যাত',
      requestDate: '১৩ জানুয়ারি, ২০২৪',
      processedDate: '১৪ জানুয়ারি, ২০২৪',
      notes: 'ডেলিভারি শুধু ১ দিন দেরি হয়েছে'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'অপেক্ষমাণ':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'অনুমোদিত':
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      case 'সম্পন্ন':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'প্রত্যাখ্যাত':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'অপেক্ষমাণ':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'অনুমোদিত':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'সম্পন্ন':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'প্রত্যাখ্যাত':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateRefund = () => {
    if (!newRefund.transactionId || !newRefund.reason) {
      toast({
        title: "ভুল তথ্য",
        description: "ট্রানজেকশন ID এবং কারণ অবশ্যই দিতে হবে",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "রিফান্ড রিকোয়েস্ট তৈরি হয়েছে",
      description: "রিফান্ড রিকোয়েস্ট সফলভাবে জমা দেয়া হয়েছে",
    });

    setNewRefund({
      transactionId: '',
      reason: '',
      amount: '',
      notes: ''
    });
    setShowCreateForm(false);
  };

  const handleRefundAction = (action: string, refundId: string) => {
    let message = '';
    switch (action) {
      case 'approve':
        message = 'রিফান্ড অনুমোদন করা হয়েছে';
        break;
      case 'reject':
        message = 'রিফান্ড প্রত্যাখ্যান করা হয়েছে';
        break;
      case 'process':
        message = 'রিফান্ড প্রসেসিং শুরু হয়েছে';
        break;
    }

    toast({
      title: "রিফান্ড আপডেট",
      description: message,
    });
  };

  const filteredRefunds = refundRequests.filter(refund =>
    refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            রিফান্ড ম্যানেজমেন্ট
          </h2>
          <p className="text-muted-foreground">
            গ্রাহকদের রিফান্ড রিকোয়েস্ট পরিচালনা করুন
          </p>
        </div>
        
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন রিফান্ড রিকোয়েস্ট
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {refundRequests.filter(r => r.status === 'অপেক্ষমাণ').length}
            </p>
            <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {refundRequests.filter(r => r.status === 'অনুমোদিত').length}
            </p>
            <p className="text-sm text-muted-foreground">অনুমোদিত</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {refundRequests.filter(r => r.status === 'সম্পন্ন').length}
            </p>
            <p className="text-sm text-muted-foreground">সম্পন্ন</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {refundRequests.filter(r => r.status === 'প্রত্যাখ্যাত').length}
            </p>
            <p className="text-sm text-muted-foreground">প্রত্যাখ্যাত</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Refund Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>নতুন রিফান্ড রিকোয়েস্ট তৈরি করুন</CardTitle>
            <CardDescription>
              গ্রাহকের পক্ষ থেকে রিফান্ড রিকোয়েস্ট তৈরি করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-id">ট্রানজেকশন ID *</Label>
                <Input
                  id="transaction-id"
                  placeholder="TXN001"
                  value={newRefund.transactionId}
                  onChange={(e) => setNewRefund({...newRefund, transactionId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">রিফান্ড পরিমাণ</Label>
                <Input
                  id="amount"
                  placeholder="৫০০০"
                  value={newRefund.amount}
                  onChange={(e) => setNewRefund({...newRefund, amount: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">রিফান্ডের কারণ *</Label>
              <Textarea
                id="reason"
                placeholder="রিফান্ডের কারণ বিস্তারিত লিখুন..."
                value={newRefund.reason}
                onChange={(e) => setNewRefund({...newRefund, reason: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">অতিরিক্ত নোট</Label>
              <Textarea
                id="notes"
                placeholder="কোন অতিরিক্ত তথ্য বা নোট..."
                value={newRefund.notes}
                onChange={(e) => setNewRefund({...newRefund, notes: e.target.value})}
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateRefund} className="flex-1">
                রিফান্ড রিকোয়েস্ট জমা দিন
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="flex-1"
              >
                বাতিল
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="গ্রাহক, ট্রানজেকশন ID বা রিফান্ড ID সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Refund Requests */}
      <div className="space-y-4">
        {filteredRefunds.map((refund) => (
          <Card key={refund.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Refund Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">রিফান্ড ID: {refund.id}</h3>
                    <Badge className={getStatusColor(refund.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(refund.status)}
                        {refund.status}
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">গ্রাহক:</p>
                      <p className="font-medium">{refund.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ট্রানজেকশন ID:</p>
                      <p className="font-medium">{refund.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">পরিমাণ:</p>
                      <p className="font-bold text-lg">{refund.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">রিকোয়েস্ট তারিখ:</p>
                      <p className="font-medium">{refund.requestDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">কারণ:</p>
                    <p className="text-sm">{refund.reason}</p>
                  </div>
                  
                  {refund.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground">নোট:</p>
                      <p className="text-sm">{refund.notes}</p>
                    </div>
                  )}
                  
                  {refund.processedDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">প্রসেসিং তারিখ:</p>
                      <p className="text-sm font-medium">{refund.processedDate}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    বিস্তারিত দেখুন
                  </Button>
                  
                  {refund.status === 'অপেক্ষমাণ' && (
                    <>
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleRefundAction('approve', refund.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        অনুমোদন করুন
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleRefundAction('reject', refund.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        প্রত্যাখ্যান করুন
                      </Button>
                    </>
                  )}
                  
                  {refund.status === 'অনুমোদিত' && (
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleRefundAction('process', refund.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      প্রসেসিং করুন
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRefunds.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">কোন রিফান্ড রিকোয়েস্ট নেই</h3>
            <p className="text-muted-foreground text-center mb-4">
              এখন পর্যন্ত কোন রিফান্ড রিকোয়েস্ট পাওয়া যায়নি
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              প্রথম রিফান্ড রিকোয়েস্ট তৈরি করুন
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Refund Policy Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            রিফান্ড নীতি
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p>পণ্য/সার্ভিস ডেলিভারির ৭ দিনের মধ্যে রিফান্ড রিকোয়েস্ট করতে হবে</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p>রিফান্ডের জন্য যথাযথ কারণ এবং প্রমাণ প্রয়োজন</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p>অনুমোদিত রিফান্ড ৩-৫ কার্যদিবসের মধ্যে প্রসেস হবে</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p>ডিজিটাল প্রোডাক্টের ক্ষেত্রে আলাদা নীতি প্রযোজ্য</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundManagement;
