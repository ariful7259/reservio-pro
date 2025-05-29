
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ShoppingBag, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BuyerDashboard = () => {
  const { toast } = useToast();
  const [orders] = useState([
    {
      id: 'ORD001',
      service: 'লোগো ডিজাইন সার্ভিস',
      creator: 'আহমেদ ডিজাইনার',
      amount: 5000,
      status: 'delivered',
      orderDate: '২৫ নভেম্বর, ২০২৪',
      deliveryDate: '২৮ নভেম্বর, ২০২৪',
      escrowStatus: 'holding'
    },
    {
      id: 'ORD002',
      service: 'ওয়েবসাইট ডেভেলপমেন্ট',
      creator: 'টেক সলিউশন BD',
      amount: 15000,
      status: 'in_progress',
      orderDate: '২০ নভেম্বর, ২০২৪',
      deliveryDate: 'প্রত্যাশিত: ৫ ডিসেম্বর',
      escrowStatus: 'holding'
    },
    {
      id: 'ORD003',
      service: 'ভিডিও এডিটিং',
      creator: 'ক্রিয়েটিভ স্টুডিও',
      amount: 3000,
      status: 'completed',
      orderDate: '১৫ নভেম্বর, ২০২৪',
      deliveryDate: '১৮ নভেম্বর, ২০২৪',
      escrowStatus: 'released'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'delivered':
        return <Badge className="bg-blue-100 text-blue-800">ডেলিভার হয়েছে</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800">চলমান</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const handleAcceptDelivery = (orderId: string) => {
    toast({
      title: "ডেলিভারি গ্রহণ করা হয়েছে",
      description: "পেমেন্ট ক্রিয়েটরের কাছে পাঠানো হবে",
    });
  };

  const handleDispute = (orderId: string) => {
    if (!disputeReason.trim()) {
      toast({
        title: "সমস্যার বিবরণ দিন",
        description: "অবশ্যই সমস্যার কারণ লিখতে হবে",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "বিরোধ জমা দেওয়া হয়েছে",
      description: "আমাদের টিম শীঘ্রই এটি পর্যালোচনা করবে",
    });
    
    setSelectedOrder(null);
    setDisputeReason('');
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                <p className="text-xl font-bold">{orders.length}</p>
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
                <p className="text-sm text-muted-foreground">সম্পন্ন</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'completed').length}</p>
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
                <p className="text-sm text-muted-foreground">চলমান</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'in_progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>আমার অর্ডারসমূহ</CardTitle>
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
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ক্রিয়েটর: {order.creator}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      অর্ডার: {order.orderDate} • ডেলিভারি: {order.deliveryDate}
                    </p>
                  </div>
                  <div className="flex flex-col lg:items-end gap-2">
                    <p className="text-lg font-bold">৳{order.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">অর্ডার: {order.id}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    মেসেজ করুন
                  </Button>
                  
                  {order.status === 'delivered' && order.escrowStatus === 'holding' && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptDelivery(order.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        গ্রহণ করুন
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        সমস্যা জানান
                      </Button>
                    </>
                  )}
                  
                  {order.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      রিভিউ দিন
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    ইনভয়েস
                  </Button>
                </div>

                {/* Dispute Form */}
                {selectedOrder === order.id && (
                  <div className="border-t pt-4 space-y-3">
                    <h5 className="font-medium text-red-600">সমস্যার বিবরণ দিন:</h5>
                    <Textarea
                      placeholder="কী সমস্যা হয়েছে বিস্তারিত লিখুন..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDispute(order.id)}
                      >
                        বিরোধ জমা দিন
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

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle>যোগাযোগের ইতিহাস</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>এখনো কোনো মেসেজ নেই</p>
            <p className="text-sm">আপনার ক্রিয়েটরদের সাথে যোগাযোগের ইতিহাস এখানে দেখা যাবে</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboard;
