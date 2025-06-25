
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Star,
  Plus,
  BarChart3,
  Package,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isSeller } = useAuth();

  const stats = [
    {
      title: 'মোট বিক্রয়',
      value: '৫২,৩৪৫',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      title: 'পণ্যের সংখ্যা',
      value: '১২৩',
      icon: <Package className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'গ্রাহক',
      value: '৪৫৬',
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      title: 'রেটিং',
      value: '৪.৮',
      icon: <Star className="h-5 w-5" />,
      color: 'text-yellow-600'
    }
  ];

  const recentOrders = [
    { id: '1', customer: 'আহমেদ করিম', product: 'স্মার্টফোন', amount: '২৫,০০০', status: 'সম্পন্ন' },
    { id: '2', customer: 'ফাতেমা খাতুন', product: 'ল্যাপটপ', amount: '৪৫,০০০', status: 'প্রক্রিয়াধীন' },
    { id: '3', customer: 'রহিম উদ্দিন', product: 'হেডফোন', amount: '৩,৫০০', status: 'পেন্ডিং' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">স্বাগতম, {user?.name}</h1>
            <p className="text-muted-foreground">আপনার ব্যবসার পরিসংখ্যান দেখুন</p>
          </div>
          {isSeller && (
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/create-post">
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন পণ্য যোগ করুন
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                সাম্প্রতিক অর্ডার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳{order.amount}</p>
                      <Badge variant={order.status === 'সম্পন্ন' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                বিক্রয় পরিসংখ্যান
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>আজকের বিক্রয়</span>
                  <span className="font-bold">৳৮,৫০০</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>এই সপ্তাহে</span>
                  <span className="font-bold">৳৫২,৩০০</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>এই মাসে</span>
                  <span className="font-bold">৳২,৩৪,৫০০</span>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/analytics">
                    বিস্তারিত দেখুন
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>দ্রুত অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/orders">
                  <ShoppingBag className="h-6 w-6 mb-2" />
                  অর্ডার দেখুন
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/products">
                  <Package className="h-6 w-6 mb-2" />
                  পণ্য পরিচালনা
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/customers">
                  <Users className="h-6 w-6 mb-2" />
                  গ্রাহক তালিকা
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link to="/favorites">
                  <Heart className="h-6 w-6 mb-2" />
                  পছন্দের তালিকা
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
