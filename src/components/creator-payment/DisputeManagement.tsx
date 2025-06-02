
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  FileText, 
  Upload, 
  Eye, 
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Calendar
} from 'lucide-react';

const DisputeManagement = () => {
  const { toast } = useToast();
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  
  const [disputes] = useState([
    {
      id: 'DIS001',
      transactionId: 'ESC004',
      serviceName: 'গ্রাফিক ডিজাইন',
      buyer: 'রাশিদা বেগম',
      creator: 'ডিজাইন স্টুডিও',
      amount: 5000,
      status: 'open',
      reason: 'সার্ভিস পাইনি',
      description: 'অর্ডার দেওয়ার ৫ দিন পর এখনো কোনো ডিজাইন পাইনি। বার বার মেসেজ দিলেও কোনো সাড়া নেই।',
      evidence: ['screenshot1.jpg', 'conversation.png'],
      createdAt: '২৮ নভেম্বর, ২০২৪',
      adminNotes: null
    },
    {
      id: 'DIS002',
      transactionId: 'ESC005',
      serviceName: 'ওয়েবসাইট ডেভেলপমেন্ট',
      buyer: 'আলী হোসেন',
      creator: 'ওয়েব সলিউশন',
      amount: 12000,
      status: 'investigating',
      reason: 'কাজ অসম্পূর্ণ',
      description: 'ওয়েবসাইটে অনেক বাগ আছে এবং রেসপন্সিভ ডিজাইন কাজ করছে না। প্রতিশ্রুতি অনুযায়ী কাজ হয়নি।',
      evidence: ['website_issues.mp4', 'requirements.pdf'],
      createdAt: '২৬ নভেম্বর, ২০২৪',
      adminNotes: 'তদন্ত চলছে। উভয় পক্ষের সাথে যোগাযোগ করা হচ্ছে।'
    },
    {
      id: 'DIS003',
      transactionId: 'ESC006',
      serviceName: 'ভিডিও এডিটিং',
      buyer: 'সারা খান',
      creator: 'ক্রিয়েটিভ এডিটর',
      amount: 3500,
      status: 'resolved',
      reason: 'মানের সমস্যা',
      description: 'ভিডিওর কোয়ালিটি প্রত্যাশা অনুযায়ী হয়নি।',
      evidence: ['original_video.mp4', 'edited_video.mp4'],
      createdAt: '২৪ নভেম্বর, ২০২৪',
      adminNotes: 'ক্রিয়েটর পুনরায় কাজ করে দিয়েছে। বায়ার সন্তুষ্ট।',
      resolution: 'টাকা ক্রিয়েটরের কাছে রিলিজ করা হয়েছে'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800">খোলা</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-100 text-yellow-800">তদন্ত চলছে</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">সমাধান হয়েছে</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'investigating':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleResponse = (disputeId: string) => {
    if (!response.trim()) {
      toast({
        title: "উত্তর লিখুন",
        description: "বিরোধের উত্তর অবশ্যই লিখতে হবে",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "উত্তর পাঠানো হয়েছে",
      description: "আপনার উত্তর সফলভাবে জমা দেওয়া হয়েছে",
    });
    
    setResponse('');
    setSelectedDispute(null);
  };

  const handleEvidenceUpload = () => {
    toast({
      title: "প্রমাণ আপলোড",
      description: "প্রমাণের ফাইল আপলোড করার ব্যবস্থা শীঘ্রই যোগ করা হবে",
    });
  };

  return (
    <div className="space-y-6">
      {/* Dispute Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">খোলা বিরোধ</p>
                <p className="text-xl font-bold">{disputes.filter(d => d.status === 'open').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">তদন্ত চলছে</p>
                <p className="text-xl font-bold">{disputes.filter(d => d.status === 'investigating').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সমাধান হয়েছে</p>
                <p className="text-xl font-bold">{disputes.filter(d => d.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disputes List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            বিরোধ ব্যবস্থাপনা
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(dispute.status)}
                      <h4 className="font-medium">{dispute.serviceName}</h4>
                      {getStatusBadge(dispute.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        ক্রেতা: {dispute.buyer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {dispute.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {dispute.id}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <p className="text-lg font-bold">৳{dispute.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">কারণ: {dispute.reason}</p>
                  </div>
                </div>

                {/* Dispute Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <h5 className="font-medium mb-2">বিবরণ:</h5>
                    <p className="text-sm text-gray-700">{dispute.description}</p>
                  </div>

                  {dispute.evidence && dispute.evidence.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2">প্রমাণপত্র:</h5>
                      <div className="flex flex-wrap gap-2">
                        {dispute.evidence.map((file, index) => (
                          <div key={index} className="flex items-center gap-1 bg-white border rounded px-2 py-1">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file}</span>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dispute.adminNotes && (
                    <div>
                      <h5 className="font-medium mb-2">অ্যাডমিন নোট:</h5>
                      <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">{dispute.adminNotes}</p>
                    </div>
                  )}

                  {dispute.resolution && (
                    <div>
                      <h5 className="font-medium mb-2">সমাধান:</h5>
                      <p className="text-sm text-green-700 bg-green-50 p-2 rounded">{dispute.resolution}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    আলোচনা করুন
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleEvidenceUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    প্রমাণ আপলোড
                  </Button>
                  {dispute.status !== 'resolved' && (
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedDispute(dispute.id)}
                    >
                      উত্তর দিন
                    </Button>
                  )}
                </div>

                {/* Response Form */}
                {selectedDispute === dispute.id && (
                  <div className="border-t pt-4 space-y-3">
                    <h5 className="font-medium">আপনার উত্তর:</h5>
                    <Textarea
                      placeholder="বিরোধের উত্তর লিখুন..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleResponse(dispute.id)}
                      >
                        উত্তর পাঠান
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedDispute(null)}
                      >
                        বাতিল
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dispute Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>বিরোধ সমাধানের নির্দেশনা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">ক্রিয়েটরদের জন্য:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>দ্রুত প্রতিক্রিয়া দিন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>প্রমাণসহ উত্তর দিন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>সমস্যা সমাধানের চেষ্টা করুন</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">ক্রেতাদের জন্য:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>স্পষ্ট কারণ উল্লেখ করুন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>প্রমাণপত্র সংযুক্ত করুন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ধৈর্য ধরে সমাধানের অপেক্ষা করুন</span>
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
