
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  MessageCircle, 
  FileText, 
  Clock, 
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  Upload,
  Eye
} from 'lucide-react';

const DisputeManagement = () => {
  const { toast } = useToast();
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [adminResponse, setAdminResponse] = useState('');

  const disputes = [
    {
      id: 'DIS001',
      orderId: 'ORD001234',
      serviceName: 'ওয়েবসাইট ডিজাইন',
      buyer: 'আহমেদ হাসান',
      seller: 'ফারহান আহমেদ',
      amount: 15000,
      status: 'investigating',
      priority: 'high',
      createdAt: '২৫ নভেম্বর, ২০২৪',
      reason: 'সার্ভিস ডেলিভার হয়নি',
      description: 'আমি ৫ দিন আগে ওয়েবসাইট ডিজাইনের জন্য পেমেন্ট করেছি কিন্তু এখনো কোনো কাজ পাইনি। বিক্রেতার সাথে যোগাযোগ করার চেষ্টা করেছি কিন্তু কোনো সাড়া পাচ্ছি না।',
      evidence: ['screenshot1.jpg', 'chat_log.txt'],
      timeline: [
        { date: '২৫ নভেম্বর', action: 'বিরোধ উত্থাপিত', by: 'ক্রেতা' },
        { date: '২৫ নভেম্বর', action: 'তদন্ত শুরু', by: 'অ্যাডমিন' },
        { date: '২৬ নভেম্বর', action: 'বিক্রেতার কাছ থেকে জবাব চাওয়া', by: 'অ্যাডমিন' }
      ]
    },
    {
      id: 'DIS002',
      orderId: 'ORD001235',
      serviceName: 'লোগো ডিজাইন',
      buyer: 'ফাতেমা খান',
      seller: 'রিফাত হোসেন',
      amount: 3000,
      status: 'resolved',
      priority: 'medium',
      createdAt: '২০ নভেম্বর, ২০২৪',
      reason: 'কাজের মান সন্তোষজনক নয়',
      description: 'লোগো ডিজাইন আমার প্রত্যাশা অনুযায়ী হয়নি। বেশ কয়েকবার রিভিশন চেয়েছি কিন্তু উন্নতি হয়নি।',
      evidence: ['original_design.png', 'requirements.pdf'],
      resolution: 'আংশিক রিফান্ড - ৳১৫০০',
      timeline: [
        { date: '২০ নভেম্বর', action: 'বিরোধ উত্থাপিত', by: 'ক্রেতা' },
        { date: '২১ নভেম্বর', action: 'প্রমাণ পর্যালোচনা', by: 'অ্যাডমিন' },
        { date: '২৩ নভেম্বর', action: 'আংশিক রিফান্ড অনুমোদন', by: 'অ্যাডমিন' }
      ]
    },
    {
      id: 'DIS003',
      orderId: 'ORD001236',
      serviceName: 'কন্টেন্ট রাইটিং',
      buyer: 'করিম উদ্দিন',
      seller: 'সাবিনা আক্তার',
      amount: 2500,
      status: 'pending',
      priority: 'low',
      createdAt: '২৮ নভেম্বর, ২০২৪',
      reason: 'পেমেন্ট করার পর যোগাযোগ বন্ধ',
      description: 'কন্টেন্ট রাইটিংয়ের জন্য পেমেন্ট করেছি কিন্তু বিক্রেতার সাথে যোগাযোগ করতে পারছি না।',
      evidence: ['payment_receipt.pdf'],
      timeline: [
        { date: '২৮ নভেম্বর', action: 'বিরোধ উত্থাপিত', by: 'ক্রেতা' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">তদন্তাধীন</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">সমাধান</Badge>;
      case 'escalated':
        return <Badge className="bg-red-100 text-red-800">জটিল</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">উচ্চ</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">মধ্যম</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">নিম্ন</Badge>;
      default:
        return <Badge variant="secondary">সাধারণ</Badge>;
    }
  };

  const handleAdminAction = (action: string, disputeId: string) => {
    toast({
      title: "অ্যাকশন সফল",
      description: `বিরোধ ${disputeId} এর জন্য ${action} সম্পন্ন হয়েছে`,
    });
  };

  const totalDisputes = disputes.length;
  const pendingDisputes = disputes.filter(d => d.status === 'pending').length;
  const investigatingDisputes = disputes.filter(d => d.status === 'investigating').length;
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6" />
          বিরোধ ব্যবস্থাপনা
        </h2>
        <p className="text-muted-foreground">
          ক্রেতা ও বিক্রেতার মধ্যে বিরোধ সমাধান এবং ন্যায়বিচার নিশ্চিতকরণ
        </p>
      </div>

      {/* Dispute Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalDisputes}</p>
            <p className="text-sm text-muted-foreground">মোট বিরোধ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingDisputes}</p>
            <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{investigatingDisputes}</p>
            <p className="text-sm text-muted-foreground">তদন্তাধীন</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{resolvedDisputes}</p>
            <p className="text-sm text-muted-foreground">সমাধান</p>
          </CardContent>
        </Card>
      </div>

      {/* Dispute List */}
      <Card>
        <CardHeader>
          <CardTitle>বিরোধের তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{dispute.serviceName}</h4>
                      {getStatusBadge(dispute.status)}
                      {getPriorityBadge(dispute.priority)}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span>বিরোধ ID: {dispute.id}</span>
                      <span>অর্ডার ID: {dispute.orderId}</span>
                      <span>ক্রেতা: {dispute.buyer}</span>
                      <span>বিক্রেতা: {dispute.seller}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {dispute.createdAt}
                      </span>
                      <span>কারণ: {dispute.reason}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <p className="text-lg font-bold">৳{dispute.amount.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedDispute(selectedDispute === dispute.id ? null : dispute.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        বিস্তারিত
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Dispute Details */}
                {selectedDispute === dispute.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">বিবরণ:</h5>
                      <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                        {dispute.description}
                      </p>
                    </div>

                    {/* Evidence */}
                    {dispute.evidence.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">প্রমাণ:</h5>
                        <div className="flex gap-2">
                          {dispute.evidence.map((file, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div>
                      <h5 className="font-medium mb-2">সময়রেখা:</h5>
                      <div className="space-y-2">
                        {dispute.timeline.map((event, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.date}:</span>
                            <span>{event.action}</span>
                            <Badge variant="outline" className="text-xs">{event.by}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resolution (if resolved) */}
                    {dispute.resolution && (
                      <div>
                        <h5 className="font-medium mb-2">সমাধান:</h5>
                        <p className="text-sm bg-green-50 text-green-800 p-3 rounded">
                          {dispute.resolution}
                        </p>
                      </div>
                    )}

                    {/* Admin Actions */}
                    {dispute.status !== 'resolved' && (
                      <div>
                        <h5 className="font-medium mb-2">অ্যাডমিন অ্যাকশন:</h5>
                        <div className="space-y-3">
                          <Textarea
                            placeholder="আপনার মন্তব্য বা সিদ্ধান্ত লিখুন..."
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                          />
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              onClick={() => handleAdminAction('সম্পূর্ণ রিফান্ড', dispute.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              সম্পূর্ণ রিফান্ড
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleAdminAction('আংশিক রিফান্ড', dispute.id)}
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              আংশিক রিফান্ড
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleAdminAction('বিক্রেতার পক্ষে', dispute.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              বিক্রেতার পক্ষে
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAdminAction('আরও তথ্য চাওয়া', dispute.id)}
                            >
                              আরও তথ্য চান
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dispute Resolution Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>বিরোধ সমাধানের নীতিমালা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">ক্রেতার অধিকার:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>প্রতিশ্রুতি অনুযায়ী সার্ভিস পাওয়ার অধিকার</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>সার্ভিস না পেলে সম্পূর্ণ রিফান্ডের অধিকার</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>মানসম্পন্ন কাজ না পেলে আংশিক রিফান্ড</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">বিক্রেতার দায়িত্ব:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>প্রতিশ্রুতি অনুযায়ী সার্ভিস ডেলিভার করা</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>নির্ধারিত সময়ে কাজ সম্পন্ন করা</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ক্রেতার সাথে নিয়মিত যোগাযোগ রাখা</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisputeManagement;
