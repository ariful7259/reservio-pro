
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign,
  Calendar,
  User,
  FileText
} from 'lucide-react';

const EscrowManagement = () => {
  const [escrowTransactions] = useState([
    {
      id: 'ESC001',
      serviceName: 'ওয়েবসাইট ডিজাইন',
      buyer: 'আহমেদ হাসান',
      amount: 15000,
      status: 'holding',
      createdAt: '২৫ নভেম্বর, ২০২৪',
      autoReleaseDate: '৫ ডিসেম্বর, ২০২৪',
      daysLeft: 10,
      isAdvance: false
    },
    {
      id: 'ESC002',
      serviceName: 'লোগো ডিজাইন - অ্যাডভান্স',
      buyer: 'ফাতেমা খান',
      amount: 3000,
      status: 'pending_completion',
      createdAt: '২০ নভেম্বর, ২০২৪',
      autoReleaseDate: 'কাজ সম্পন্ন না হওয়া পর্যন্ত',
      daysLeft: null,
      isAdvance: true
    },
    {
      id: 'ESC003',
      serviceName: 'ভিডিও এডিটিং',
      buyer: 'করিম উদ্দিন',
      amount: 8000,
      status: 'released',
      createdAt: '১৫ নভেম্বর, ২০২৪',
      autoReleaseDate: '২৫ নভেম্বর, ২০২৪',
      daysLeft: 0,
      isAdvance: false
    },
    {
      id: 'ESC004',
      serviceName: 'গ্রাফিক ডিজাইন',
      buyer: 'রাশিদা বেগম',
      amount: 5000,
      status: 'disputed',
      createdAt: '১০ নভেম্বর, ২০২৪',
      autoReleaseDate: 'বিরোধ সমাধানের অপেক্ষায়',
      daysLeft: null,
      isAdvance: false
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'holding':
        return <Badge className="bg-yellow-100 text-yellow-800">Escrow এ সংরক্ষিত</Badge>;
      case 'pending_completion':
        return <Badge className="bg-blue-100 text-blue-800">সম্পন্নতার অপেক্ষায়</Badge>;
      case 'released':
        return <Badge className="bg-green-100 text-green-800">মুক্ত করা হয়েছে</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ অবস্থায়</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'holding':
        return <Shield className="h-5 w-5 text-yellow-600" />;
      case 'pending_completion':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'released':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'disputed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const totalHolding = escrowTransactions
    .filter(t => t.status === 'holding' || t.status === 'pending_completion')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReleased = escrowTransactions
    .filter(t => t.status === 'released')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDisputed = escrowTransactions
    .filter(t => t.status === 'disputed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Escrow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escrow এ সংরক্ষিত</p>
                <p className="text-xl font-bold">৳{totalHolding.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">মুক্ত করা হয়েছে</p>
                <p className="text-xl font-bold">৳{totalReleased.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">বিরোধ অবস্থায়</p>
                <p className="text-xl font-bold">৳{totalDisputed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Escrow লেনদেনের ইতিহাস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {escrowTransactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <h4 className="font-medium">{transaction.serviceName}</h4>
                      {transaction.isAdvance && (
                        <Badge variant="outline" className="text-xs">অ্যাডভান্স</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {transaction.buyer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {transaction.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {transaction.id}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <p className="text-lg font-bold">৳{transaction.amount.toLocaleString()}</p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>

                {/* Auto Release Info */}
                {transaction.status === 'holding' && transaction.daysLeft && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">অটো-রিলিজ কাউন্টডাউন</span>
                      <span className="text-sm text-blue-600">{transaction.daysLeft} দিন বাকি</span>
                    </div>
                    <Progress value={(10 - transaction.daysLeft) * 10} className="h-2" />
                    <p className="text-xs text-blue-600 mt-1">
                      {transaction.autoReleaseDate} তারিখে অটোমেটিক রিলিজ হবে
                    </p>
                  </div>
                )}

                {/* Advance Payment Info */}
                {transaction.isAdvance && transaction.status === 'pending_completion' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">অ্যাডভান্স পেমেন্ট</span>
                    </div>
                    <p className="text-xs text-orange-600">
                      কাজ সম্পন্ন এবং ক্রেতার নিশ্চিতকরণের পর রিলিজ হবে
                    </p>
                  </div>
                )}

                {/* Disputed Status Info */}
                {transaction.status === 'disputed' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">বিরোধ অবস্থায়</span>
                    </div>
                    <p className="text-xs text-red-600">
                      অ্যাডমিন তদন্ত করে টাকা রিলিজ বা রিফান্ডের সিদ্ধান্ত নেবে
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    বিস্তারিত দেখুন
                  </Button>
                  {transaction.status === 'holding' && (
                    <Button size="sm" variant="outline">
                      ক্রেতার সাথে যোগাযোগ
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Escrow Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Escrow সিস্টেম নির্দেশনা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">নিয়মিত পেমেন্ট:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>পেমেন্ট ১০ দিন Escrow এ থাকবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>কোনো বিরোধ না থাকলে অটোমেটিক রিলিজ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>ক্রেতা চাইলে আগেও রিলিজ করতে পারে</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">অ্যাডভান্স পেমেন্ট:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>কাজ সম্পন্ন না হওয়া পর্যন্ত হোল্ড</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ক্রেতার নিশ্চিতকরণ প্রয়োজন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>কমপ্লিশন স্ট্যাটাস ট্র্যাকিং</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EscrowManagement;
