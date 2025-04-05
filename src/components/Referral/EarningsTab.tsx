import React from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PiggyBank, LoaderCircle, CheckCircle, Clock, AlertTriangle, Download } from 'lucide-react';

const EarningsTab = () => {
  const { referralData, loading } = useReferralData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-28 w-full md:w-1/2" />
          <Skeleton className="h-28 w-full md:w-1/2" />
        </div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!referralData) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">সম্পূর্ণ</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">পেন্ডিং</Badge>;
      default:
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">বাতিল</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">মোট উপার্জন</p>
                <h3 className="text-2xl font-bold mt-1">{referralData.totalEarnings} ৳</h3>
                <p className="text-xs text-muted-foreground mt-1">সর্বশেষ আপডেট: আজ, ১২:৩০ PM</p>
              </div>
              <div className="rounded-full bg-primary/20 p-3">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">পেন্ডিং উপার্জন</p>
                <h3 className="text-2xl font-bold mt-1">{referralData.pendingEarnings} ৳</h3>
                <p className="text-xs text-muted-foreground mt-1">স্ট্যাটাস: প্রক্রিয়াধীন</p>
              </div>
              <div className="rounded-full bg-secondary/20 p-3">
                <LoaderCircle className="h-6 w-6 text-secondary-foreground animate-spin-slow" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">সব</TabsTrigger>
            <TabsTrigger value="completed">সম্পূর্ণ</TabsTrigger>
            <TabsTrigger value="pending">পেন্ডিং</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            স্টেটমেন্ট ডাউনলোড
          </Button>
        </div>
        
        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>আপনার উপার্জন হিস্টরি</CardTitle>
              <CardDescription>
                সমস্ত রেফারেল উপার্জনের বিস্তারিত তালিকা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/20">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">নাম</th>
                      <th className="text-left p-3 text-sm font-medium">তারিখ</th>
                      <th className="text-left p-3 text-sm font-medium">পরিমাণ</th>
                      <th className="text-left p-3 text-sm font-medium">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {referralData.referralUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary/5">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{user.joinDate}</td>
                        <td className="p-3 font-medium">{user.amount} ৳</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(user.status)}
                            {getStatusBadge(user.status)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {referralData.referralUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো উপার্জন নেই
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>সম্পূর্ণ উপার্জন</CardTitle>
              <CardDescription>
                সম্পূর্ণ হওয়া রেফারেলের তালিকা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/20">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">নাম</th>
                      <th className="text-left p-3 text-sm font-medium">তারিখ</th>
                      <th className="text-left p-3 text-sm font-medium">পরিমাণ</th>
                      <th className="text-left p-3 text-sm font-medium">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {referralData.referralUsers
                      .filter(user => user.status === 'completed')
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-secondary/5">
                          <td className="p-3">{user.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{user.joinDate}</td>
                          <td className="p-3 font-medium">{user.amount} ৳</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(user.status)}
                              {getStatusBadge(user.status)}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              
              {referralData.referralUsers.filter(user => user.status === 'completed').length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো সম্পূর্ণ উপার্জন নেই
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>পেন্ডিং উপার্জন</CardTitle>
              <CardDescription>
                এখনও প্রক্রিয়াধীন রেফারেলের তালিকা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/20">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">নাম</th>
                      <th className="text-left p-3 text-sm font-medium">তারিখ</th>
                      <th className="text-left p-3 text-sm font-medium">পরিমাণ</th>
                      <th className="text-left p-3 text-sm font-medium">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {referralData.referralUsers
                      .filter(user => user.status === 'pending')
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-secondary/5">
                          <td className="p-3">{user.name}</td>
                          <td className="p-3 text-sm text-muted-foreground">{user.joinDate}</td>
                          <td className="p-3 font-medium">{user.amount} ৳</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(user.status)}
                              {getStatusBadge(user.status)}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              
              {referralData.referralUsers.filter(user => user.status === 'pending').length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো পেন্ডিং উপার্জন নেই
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EarningsTab;
