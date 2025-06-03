
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  Star,
  MessageCircle,
  FileText,
  Eye,
  RefreshCw,
  CreditCard,
  User,
  Calendar
} from 'lucide-react';

const BuyerDashboard = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const buyerStats = {
    totalOrders: 15,
    completedOrders: 12,
    activeOrders: 2,
    disputedOrders: 1,
    totalSpent: 75000,
    averageOrderValue: 5000,
    savedMoney: 12000
  };

  const orders = [
    {
      id: 'ORD001234',
      service: 'ওয়েব ডিজাইন',
      seller: 'ফারহান আহমেদ',
      amount: 15000,
      status: 'escrow_holding',
      orderDate: '২৮ নভেম্বর, ২০২৪',
      expectedDelivery: '৫ ডিসেম্বর, ২০২৪',
      daysLeft: 7,
      isAdvance: false,
      escrowStatus: 'holding',
      canRelease: true,
      canDispute: true,
      progress: 75,
      lastUpdate: '২ দিন আগে',
      description: 'একটি রেস্পন্সিভ কর্পোরেট ওয়েবসাইট ডিজাইন যা ৫টি পেজ নিয়ে গঠিত',
      deliverables: ['Home Page Design', 'About Us Page', 'Services Page', 'Contact Page', 'Blog Page']
    },
    {
      id: 'ORD001235',
      service: 'লোগো ডিজাইন - অ্যাডভান্স',
      seller: 'রিফাত হোসেন',
      amount: 3000,
      status: 'in_progress',
      orderDate: '২৫ নভেম্বর, ২০২৪',
      expectedDelivery: 'কাজ সম্পন্ন না হওয়া পর্যন্ত',
      daysLeft: null,
      isAdvance: true,
      escrowStatus: 'holding',
      canRelease: false,
      canDispute: false,
      progress: 40,
      lastUpdate: '১ দিন আগে',
      description: 'একটি প্রিমিয়াম লোগো ডিজাইন প্রজেক্ট যাতে ৩টি কনসেপ্ট অন্তর্ভুক্ত',
      deliverables: ['3 Logo Concepts', 'Final Logo in Multiple Formats', 'Brand Guidelines']
    },
    {
      id: 'ORD001236',
      service: 'গ্রাফিক ডিজাইন',
      seller: 'সাবিনা আক্তার',
      amount: 5000,
      status: 'disputed',
      orderDate: '২০ নভেম্বর, ২০২৪',
      expectedDelivery: '৩০ নভেম্বর, ২০২৪',
      daysLeft: 2,
      isAdvance: false,
      escrowStatus: 'disputed',
      canRelease: false,
      canDispute: false,
      progress: 90,
      lastUpdate: '৩ দিন আগে',
      description: 'সোশ্যাল মিডিয়া পোস্টের জন্য গ্রাফিক ডিজাইন',
      deliverables: ['10 Social Media Posts', 'Story Templates', 'Banner Designs'],
      disputeReason: 'ডিজাইনের মান প্রত্যাশা অনুযায়ী নয়'
    },
    {
      id: 'ORD001237',
      service: 'ভিডিও এডিটিং',
      seller: 'মাহমুদ আলী',
      amount: 8000,
      status: 'completed',
      orderDate: '১৫ নভেম্বর, ২০২৪',
      expectedDelivery: '২৫ নভেম্বর, ২০২৪',
      daysLeft: 0,
      isAdvance: false,
      escrowStatus: 'released',
      canRelease: false,
      canDispute: false,
      progress: 100,
      lastUpdate: '১০ দিন আগে',
      description: 'একটি প্রোমোশনাল ভিডিও এডিটিং প্রজেক্ট',
      deliverables: ['2-minute Promotional Video', 'Multiple Format Exports', 'Raw Files'],
      completedAt: '২৪ নভেম্বর, ২০২৪',
      canReview: true
    }
  ];

  const paymentHistory = [
    {
      id: 'PAY001',
      orderId: 'ORD001234',
      service: 'ওয়েব ডিজাইন',
      amount: 15000,
      method: 'bkash',
      date: '২৮ নভেম্বর, ২০২৪',
      status: 'completed'
    },
    {
      id: 'PAY002',
      orderId: 'ORD001235',
      service: 'লোগো ডিজাইন',
      amount: 3000,
      method: 'nagad',
      date: '২৫ নভেম্বর, ২০২৪',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'escrow_holding':
        return <Badge className="bg-yellow-100 text-yellow-800">Escrow এ</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const handleReleasePayment = (orderId: string) => {
    toast({
      title: "পেমেন্ট রিলিজ করা হয়েছে",
      description: `অর্ডার ${orderId} এর পেমেন্ট বিক্রেতার কাছে পাঠানো হয়েছে`,
    });
  };

  const handleRaiseDispute = (orderId: string) => {
    toast({
      title: "বিরোধ উত্থাপন করা হয়েছে",
      description: `অর্ডার ${orderId} এর জন্য বিরোধ নিবন্ধন করা হয়েছে`,
    });
  };

  const handleSubmitReview = (orderId: string) => {
    if (!reviewText.trim() || rating === 0) {
      toast({
        title: "রিভিউ অসম্পূর্ণ",
        description: "রেটিং এবং মন্তব্য উভয়ই প্রদান করুন",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "রিভিউ জমা দেওয়া হয়েছে",
      description: `আপনার ${rating} তারকা রিভিউ সফলভাবে জমা দেওয়া হয়েছে`,
    });
    setReviewText('');
    setRating(0);
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }: { rating: number, onRatingChange?: (rating: number) => void, readonly?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <ShoppingCart className="h-6 w-6" />
          Buyer ড্যাশবোর্ড
        </h2>
        <p className="text-muted-foreground">
          আপনার অর্ডার, পেমেন্ট এবং সার্ভিস ট্র্যাক করুন
        </p>
      </div>

      {/* Buyer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                <p className="text-xl font-bold">{buyerStats.totalOrders}</p>
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
                <p className="text-sm text-muted-foreground">সম্পন্ন অর্ডার</p>
                <p className="text-xl font-bold">{buyerStats.completedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট খরচ</p>
                <p className="text-xl font-bold">৳{buyerStats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সক্রিয় অর্ডার</p>
                <p className="text-xl font-bold">{buyerStats.activeOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            আপনার অর্ডারসমূহ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{order.service}</h4>
                      {getStatusBadge(order.status)}
                      {order.isAdvance && (
                        <Badge variant="outline" className="text-xs">
                          অ্যাডভান্স
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {order.seller}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {order.orderDate}
                      </span>
                      <span>অর্ডার: {order.id}</span>
                      <span>শেষ আপডেট: {order.lastUpdate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <p className="text-lg font-bold">৳{order.amount.toLocaleString()}</p>
                    {order.daysLeft && order.daysLeft > 0 && (
                      <p className="text-sm text-muted-foreground">{order.daysLeft} দিন বাকি</p>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-2">{order.description}</p>
                  
                  {/* Progress Bar */}
                  {order.status !== 'completed' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>অগ্রগতি</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Deliverables */}
                  <div>
                    <p className="text-sm font-medium mb-2">ডেলিভারেবলস:</p>
                    <div className="flex flex-wrap gap-1">
                      {order.deliverables.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dispute Info */}
                {order.status === 'disputed' && order.disputeReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">বিরোধের কারণ</span>
                    </div>
                    <p className="text-sm text-red-700">{order.disputeReason}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    বিস্তারিত
                  </Button>
                  
                  {order.canRelease && (
                    <Button 
                      size="sm"
                      onClick={() => handleReleasePayment(order.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      পেমেন্ট রিলিজ
                    </Button>
                  )}
                  
                  {order.canDispute && (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRaiseDispute(order.id)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      বিরোধ উত্থাপন
                    </Button>
                  )}

                  {order.canReview && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      রিভিউ দিন
                    </Button>
                  )}

                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    মেসেজ
                  </Button>
                </div>

                {/* Review Section */}
                {selectedOrder === order.id && order.canReview && (
                  <div className="border-t pt-4 space-y-3">
                    <h5 className="font-medium">আপনার রিভিউ দিন:</h5>
                    <div>
                      <label className="text-sm font-medium">রেটিং:</label>
                      <StarRating rating={rating} onRatingChange={setRating} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">মন্তব্য:</label>
                      <Textarea
                        placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitReview(order.id)}
                      >
                        রিভিউ জমা দিন
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedOrder(null)}
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

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            পেমেন্ট ইতিহাস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.service}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.date} • {payment.method.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">ID: {payment.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">৳{payment.amount.toLocaleString()}</p>
                  <Badge className="bg-green-100 text-green-800">সফল</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;
