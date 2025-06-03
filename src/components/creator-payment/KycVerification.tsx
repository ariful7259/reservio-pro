
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Eye,
  FileText,
  Camera,
  User,
  Shield,
  AlertTriangle
} from 'lucide-react';

const KycVerification = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  const kycRequests = [
    {
      id: 'KYC001',
      userId: 'user_12345',
      userName: 'আহমেদ হাসান',
      email: 'ahmed@email.com',
      phone: '01712345678',
      userType: 'creator',
      submittedAt: '২৮ নভেম্বর, ২০২৪',
      status: 'pending',
      documents: {
        nid: 'nid_front.jpg',
        nidBack: 'nid_back.jpg',
        photo: 'selfie.jpg',
        bankStatement: 'bank_statement.pdf'
      },
      personalInfo: {
        fullName: 'আহমেদ হাসান আলী',
        fatherName: 'মোহাম্মদ আলী',
        motherName: 'ফাতেমা বেগম',
        dateOfBirth: '১৫ জানুয়ারি, ১৯৯৫',
        nidNumber: '1234567890123',
        address: 'বাড়ি ১২, রোড ৫, ধানমন্ডি, ঢাকা-১২০৫'
      },
      businessInfo: {
        businessType: 'ওয়েব ডেভেলপমেন্ট',
        experience: '৫ বছর',
        expectedEarnings: '৳৫০,০০০/মাস'
      }
    },
    {
      id: 'KYC002',
      userId: 'user_67890',
      userName: 'ফাতেমা খান',
      email: 'fatema@email.com',
      phone: '01987654321',
      userType: 'buyer',
      submittedAt: '২৭ নভেম্বর, ২০২৪',
      status: 'approved',
      approvedAt: '২৮ নভেম্বর, ২০২৪',
      documents: {
        nid: 'nid_front.jpg',
        nidBack: 'nid_back.jpg',
        photo: 'selfie.jpg'
      },
      personalInfo: {
        fullName: 'ফাতেমা খান',
        fatherName: 'আব্দুল খান',
        motherName: 'রহিমা খাতুন',
        dateOfBirth: '২২ মার্চ, ১৯৯০',
        nidNumber: '9876543210987',
        address: 'বাড়ি ৮, রোড ১২, গুলশান, ঢাকা-১২১২'
      }
    },
    {
      id: 'KYC003',
      userId: 'user_11111',
      userName: 'করিম উদ্দিন',
      email: 'karim@email.com',
      phone: '01555666777',
      userType: 'creator',
      submittedAt: '২৬ নভেম্বর, ২০২৪',
      status: 'rejected',
      rejectedAt: '২৭ নভেম্বর, ২০২৪',
      rejectionReason: 'NID ছবি অস্পষ্ট, সেলফি ছবিতে মুখ স্পষ্ট নয়',
      documents: {
        nid: 'nid_front.jpg',
        photo: 'selfie.jpg'
      },
      personalInfo: {
        fullName: 'করিম উদ্দিন',
        nidNumber: '5555666777888'
      }
    }
  ];

  const kycStats = {
    totalRequests: 45,
    pending: 12,
    approved: 28,
    rejected: 5,
    todaySubmissions: 8
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">অনুমোদিত</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">বাতিল</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">পর্যালোচনাধীন</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getUserTypeBadge = (type: string) => {
    switch (type) {
      case 'creator':
        return <Badge variant="outline" className="text-blue-600">Creator</Badge>;
      case 'buyer':
        return <Badge variant="outline" className="text-green-600">Buyer</Badge>;
      default:
        return <Badge variant="outline">ইউজার</Badge>;
    }
  };

  const handleApprove = (kycId: string) => {
    toast({
      title: "KYC অনুমোদিত",
      description: `KYC আবেদন ${kycId} অনুমোদন করা হয়েছে`,
    });
  };

  const handleReject = (kycId: string) => {
    if (!reviewComment.trim()) {
      toast({
        title: "মন্তব্য প্রয়োজন",
        description: "KYC বাতিল করার কারণ উল্লেখ করুন",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "KYC বাতিল",
      description: `KYC আবেদন ${kycId} বাতিল করা হয়েছে`,
    });
    setReviewComment('');
  };

  const handleRequestMoreInfo = (kycId: string) => {
    toast({
      title: "অতিরিক্ত তথ্য চাওয়া হয়েছে",
      description: `KYC আবেদন ${kycId} এর জন্য অতিরিক্ত তথ্য চাওয়া হয়েছে`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <UserCheck className="h-6 w-6" />
          KYC যাচাইকরণ ব্যবস্থাপনা
        </h2>
        <p className="text-muted-foreground">
          ইউজার পরিচয় যাচাই এবং নিরাপত্তা নিশ্চিতকরণ
        </p>
      </div>

      {/* KYC Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{kycStats.totalRequests}</p>
            <p className="text-sm text-muted-foreground">মোট আবেদন</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{kycStats.pending}</p>
            <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{kycStats.approved}</p>
            <p className="text-sm text-muted-foreground">অনুমোদিত</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{kycStats.rejected}</p>
            <p className="text-sm text-muted-foreground">বাতিল</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{kycStats.todaySubmissions}</p>
            <p className="text-sm text-muted-foreground">আজকের জমা</p>
          </CardContent>
        </Card>
      </div>

      {/* KYC Requests */}
      <Card>
        <CardHeader>
          <CardTitle>KYC আবেদনসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">{request.userName}</h4>
                      {getStatusBadge(request.status)}
                      {getUserTypeBadge(request.userType)}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <span>KYC ID: {request.id}</span>
                      <span>ইমেইল: {request.email}</span>
                      <span>ফোন: {request.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        জমা: {request.submittedAt}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedUser(selectedUser === request.id ? null : request.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      বিস্তারিত
                    </Button>
                  </div>
                </div>

                {/* Detailed View */}
                {selectedUser === request.id && (
                  <div className="border-t pt-4 space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h5 className="font-medium mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        ব্যক্তিগত তথ্য
                      </h5>
                      <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">পূর্ণ নাম: </span>
                          <span>{request.personalInfo.fullName}</span>
                        </div>
                        {request.personalInfo.fatherName && (
                          <div>
                            <span className="font-medium">পিতার নাম: </span>
                            <span>{request.personalInfo.fatherName}</span>
                          </div>
                        )}
                        {request.personalInfo.motherName && (
                          <div>
                            <span className="font-medium">মাতার নাম: </span>
                            <span>{request.personalInfo.motherName}</span>
                          </div>
                        )}
                        {request.personalInfo.dateOfBirth && (
                          <div>
                            <span className="font-medium">জন্ম তারিখ: </span>
                            <span>{request.personalInfo.dateOfBirth}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">NID নম্বর: </span>
                          <span>{request.personalInfo.nidNumber}</span>
                        </div>
                        {request.personalInfo.address && (
                          <div className="md:col-span-2">
                            <span className="font-medium">ঠিকানা: </span>
                            <span>{request.personalInfo.address}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Business Information (for creators) */}
                    {request.businessInfo && (
                      <div>
                        <h5 className="font-medium mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          ব্যবসায়িক তথ্য
                        </h5>
                        <div className="bg-blue-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">ব্যবসার ধরন: </span>
                            <span>{request.businessInfo.businessType}</span>
                          </div>
                          <div>
                            <span className="font-medium">অভিজ্ঞতা: </span>
                            <span>{request.businessInfo.experience}</span>
                          </div>
                          <div>
                            <span className="font-medium">প্রত্যাশিত আয়: </span>
                            <span>{request.businessInfo.expectedEarnings}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    <div>
                      <h5 className="font-medium mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        জমাকৃত ডকুমেন্ট
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {request.documents.nid && (
                          <div className="border rounded-lg p-3 text-center">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm font-medium">NID সামনে</p>
                            <p className="text-xs text-muted-foreground">{request.documents.nid}</p>
                          </div>
                        )}
                        {request.documents.nidBack && (
                          <div className="border rounded-lg p-3 text-center">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm font-medium">NID পেছনে</p>
                            <p className="text-xs text-muted-foreground">{request.documents.nidBack}</p>
                          </div>
                        )}
                        {request.documents.photo && (
                          <div className="border rounded-lg p-3 text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2 text-green-600" />
                            <p className="text-sm font-medium">সেলফি ছবি</p>
                            <p className="text-xs text-muted-foreground">{request.documents.photo}</p>
                          </div>
                        )}
                        {request.documents.bankStatement && (
                          <div className="border rounded-lg p-3 text-center">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                            <p className="text-sm font-medium">ব্যাংক স্টেটমেন্ট</p>
                            <p className="text-xs text-muted-foreground">{request.documents.bankStatement}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rejection Reason (if rejected) */}
                    {request.status === 'rejected' && request.rejectionReason && (
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          বাতিলের কারণ
                        </h5>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-800">{request.rejectionReason}</p>
                          <p className="text-xs text-red-600 mt-1">বাতিল: {request.rejectedAt}</p>
                        </div>
                      </div>
                    )}

                    {/* Approval Info (if approved) */}
                    {request.status === 'approved' && request.approvedAt && (
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          অনুমোদন তথ্য
                        </h5>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-800">KYC সফলভাবে অনুমোদিত হয়েছে</p>
                          <p className="text-xs text-green-600 mt-1">অনুমোদন: {request.approvedAt}</p>
                        </div>
                      </div>
                    )}

                    {/* Admin Actions (for pending requests) */}
                    {request.status === 'pending' && (
                      <div>
                        <h5 className="font-medium mb-3">অ্যাডমিন অ্যাকশন</h5>
                        <div className="space-y-3">
                          <Textarea
                            placeholder="মন্তব্য বা বাতিলের কারণ লিখুন..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                          />
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              অনুমোদন করুন
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleReject(request.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              বাতিল করুন
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestMoreInfo(request.id)}
                            >
                              <Upload className="h-4 w-4 mr-1" />
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

      {/* KYC Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>KYC যাচাইকরণ নির্দেশনা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">প্রয়োজনীয় ডকুমেন্ট:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>NID কার্ডের সামনে ও পেছনের ছবি</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>NID ধরে সেলফি ছবি</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>ব্যাংক স্টেটমেন্ট (Creator এর জন্য)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>ব্যবসায়িক তথ্য (Creator এর জন্য)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">যাচাইকরণ মানদণ্ড:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ছবি স্পষ্ট ও পাঠযোগ্য হতে হবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>সেলফিতে মুখ ও NID উভয়ই স্পষ্ট</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>NID এর তথ্য ফর্মের সাথে মিলতে হবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ব্যাংক স্টেটমেন্ট ৩ মাসের মধ্যের</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KycVerification;
