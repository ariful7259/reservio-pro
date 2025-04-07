
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  ShoppingBag, 
  Users, 
  Percent,
  ShoppingCart,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StoreDashboardPreview = () => {
  // Sample data for charts
  const salesData = [
    { name: 'জানু', sales: 2400 },
    { name: 'ফেব্রু', sales: 1398 },
    { name: 'মার্চ', sales: 9800 },
    { name: 'এপ্রিল', sales: 3908 },
    { name: 'মে', sales: 4800 },
    { name: 'জুন', sales: 3800 },
    { name: 'জুলাই', sales: 4300 },
  ];
  
  const topProducts = [
    { name: 'স্মার্টফোন', sales: 45, change: 12 },
    { name: 'হেডফোন', sales: 32, change: -5 },
    { name: 'ল্যাপটপ', sales: 28, change: 8 },
    { name: 'স্মার্টওয়াচ', sales: 25, change: 15 },
    { name: 'ব্লুটুথ স্পীকার', sales: 18, change: 3 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">মোট বিক্রয়</p>
              <h3 className="text-2xl font-bold">৳২৪,৫৫০</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +১৮% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">ভিজিটর</p>
              <h3 className="text-2xl font-bold">১,২৩৫</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +২২% গত সপ্তাহ থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Eye className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">নতুন গ্রাহক</p>
              <h3 className="text-2xl font-bold">৮৫</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +১০% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">কনভার্শন রেট</p>
              <h3 className="text-2xl font-bold">৩.৭%</h3>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <ArrowDown className="h-3 w-3 mr-1" /> -২% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Percent className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">বিক্রয়ের ট্রেন্ড</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">সেরা বিক্রিত প্রোডাক্ট</h3>
            <div className="space-y-2">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-5">{idx + 1}.</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{product.sales} বিক্রি</span>
                    <span className={`text-xs flex items-center ${
                      product.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.change > 0 ? 
                        <ArrowUp className="h-3 w-3 mr-1" /> : 
                        <ArrowDown className="h-3 w-3 mr-1" />
                      }
                      {Math.abs(product.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">সাম্প্রতিক অর্ডার</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(order => (
                <div key={order} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">অর্ডার #{1000 + order}</p>
                      <p className="text-xs text-muted-foreground">গ্রাহক #{100 + order}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{order * 1250}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
                      {order} ঘন্টা আগে
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Traffic Sources */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">ট্রাফিক সোর্স</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>সোশ্যাল মিডিয়া</span>
              <span>৪২%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>সার্চ ইঞ্জিন</span>
              <span>৩৮%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '38%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>ডিরেক্ট</span>
              <span>১৫%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>রেফারেল</span>
              <span>৫%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '5%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreDashboardPreview;
