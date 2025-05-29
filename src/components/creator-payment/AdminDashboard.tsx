
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [adminStats] = useState({
    totalUsers: 1250,
    totalTransactions: 8900,
    totalVolume: 2500000,
    activeDisputes: 12,
    pendingKyc: 35
  });

  const [disputes] = useState([
    {
      id: 'DIS001',
      orderId: 'ORD123',
      buyer: 'রহিম আহমেদ',
      creator: 'ডিজাইন স্টুডিও',
      amount: 5000,
      reason: 'কাজের মান সন্তোষজনক নয়',
      status: 'pending',
      createdAt: '২৮ নভেম্বর, ২০২৪'
    },
    {
      id: 'DIS002', 
      orderId: 'ORD124',
      buyer: 'করিম উদ্দিন',
      creator: 'ওয়েব ডেভেলপার',
      amount: 12000,
      reason: 'ডেলিভারি সময় অতিক্রম',
      status: 'investigating',
      createdAt: '২৬ নভেম্বর, ২০২৪'
    }
  ]);

  const [transactions] = useState([
    {
      id: 'TXN001',
      type: 'payment',
      buyer: 'রহিম আহমেদ',
      creator: 'আহমেদ ডিজাইনার',
      amount: 5000,
      status: 'completed',
      escrowStatus: 'released',
      date: '২৮ নভেম্বর, ২০২৪'
    },
    {
      id: 'TXN002',
      type: 'withdrawal',
      creator: 'টেক সলিউশন BD',
      amount: 15000,
      status: 'pending',
      date: '২৭ নভেম্বর, ২০২৪'
    }
  ]);

  const [users] = useState([
    {
      id: 'USR001',
      name: 'আহমেদ ডিজাইনার',
      email: 'ahmed@example.com',
      type: 'creator',
      kycStatus: 'verified',
      totalTransactions: 45,
      joinDate: '১৫ অক্টোবর, ২০২৪'
    },
    {
      id: 'USR002',
      name: 'রহিম আহমেদ',
      email: 'rahim@example.com',
      type: 'buyer',
      kycStatus: 'pending',
      totalTransactions: 8,
      joinDate: '২০ নভেম্বর, ২০২৪'
    }
  ]);

  const handleResolveDispute = (disputeId: string, action: 'approve_creator' | 'approve_buyer') => {
    toast({
      title: "বিরোধের সমাধান",
      description: action === 'approve_creator' ? 'পেমেন্ট ক্রিয়েটরের কাছে পাঠানো হবে' : 'রিফান্ড প্রক্রিয়া শুরু হবে',
    });
  };

  const handleUserAction = (userId: string, action: 'ban' | 'verify' | 'view') => {
    switch (action) {
      case 'ban':
        toast({
          title: "ইউজার নিষিদ্ধ",
          description: "ইউজার সাময়িকভাবে নিষিদ্ধ করা হয়েছে",
          variant: "destructive"
        });
        break;
      case 'verify':
        toast({
          title: "KYC অনুমোদন",
          description: "ইউজারের KYC ভেরিফিকেশন সম্পন্ন হয়েছে",
        });
        break;
      case 'view':
        toast({
          title: "ইউজার বিবরণ",
          description: "ইউজারের সম্পূর্ণ প্রোফাইল দেখানো হচ্ছে",
        });
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমান</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">তদন্তাধীন</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">যাচাইকৃত</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট ইউজার</p>
                <p className="text-xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট ভলিউম</p>
                <p className="text-xl font-bold">৳{(adminStats.totalVolume / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
                <p className="text-xl font-bold">{adminStats.totalTransactions.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">সক্রিয় বিরোধ</p>
                <p className="text-xl font-bold">{adminStats.activeDisputes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং KYC</p>
                <p className="text-xl font-bold">{adminStats.pendingKyc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="disputes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="disputes">বিরোধ সমাধান</TabsTrigger>
          <TabsTrigger value="transactions">লেনদেন</TabsTrigger>
          <TabsTrigger value="users">ইউজার ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="reports">রিপোর্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="disputes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>বিরোধ সমাধান</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  ফিল্টার
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  এক্সপোর্ট
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">বিরোধ #{dispute.id}</h4>
                          {getStatusBadge(dispute.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ক্রেতা: {dispute.buyer} • ক্রিয়েটর: {dispute.creator}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          অর্ডার: {dispute.orderId} • তারিখ: {dispute.createdAt}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">কারণ:</span> {dispute.reason}
                        </p>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <p className="text-lg font-bold">৳{dispute.amount.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUserAction(dispute.id, 'view')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleResolveDispute(dispute.id, 'approve_creator')}
                          >
                            ক্রিয়েটর
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleResolveDispute(dispute.id, 'approve_buyer')}
                          >
                            রিফান্ড
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>সমস্ত লেনদেন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ট্রানজেকশন খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    ফিল্টার
                  </Button>
                </div>
                
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {transaction.type === 'payment' ? 'পেমেন্ট' : 'উত্তোলন'} #{transaction.id}
                          </h4>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.buyer && `ক্রেতা: ${transaction.buyer} • `}
                          ক্রিয়েটর: {transaction.creator}
                        </p>
                        <p className="text-sm text-muted-foreground">তারিখ: {transaction.date}</p>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <p className="text-lg font-bold">৳{transaction.amount.toLocaleString()}</p>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>ইউজার ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{user.name}</h4>
                          <Badge variant={user.type === 'creator' ? 'default' : 'secondary'}>
                            {user.type === 'creator' ? 'ক্রিয়েটর' : 'ক্রেতা'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          যোগদান: {user.joinDate} • লেনদেন: {user.totalTransactions}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">KYC:</span>
                          {getStatusBadge(user.kycStatus)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(user.id, 'view')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.kycStatus === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleUserAction(user.id, 'verify')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleUserAction(user.id, 'ban')}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>রিপোর্ট ও অ্যানালিটিক্স</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>বিস্তারিত রিপোর্ট এবং অ্যানালিটিক্স এখানে দেখানো হবে</p>
                <p className="text-sm">আয়ের পরিসংখ্যান, ইউজার গ্রোথ, এবং সিস্টেম পারফরমেন্স</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
