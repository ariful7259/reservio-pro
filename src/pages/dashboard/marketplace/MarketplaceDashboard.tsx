
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  Users, 
  AlertTriangle, 
  Star, 
  Percent,
  DollarSign
} from 'lucide-react';

const MarketplaceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">মার্কেটপ্লেস বিক্রেতার ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার পণ্য, অর্ডার এবং বিক্রয় পর্যবেক্ষণ করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <ShoppingBag className="h-4 w-4" />
          নতুন পণ্য যোগ করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট বিক্রয়</p>
                <h3 className="text-2xl font-bold mt-1">৳১২৪,৫০০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১৫% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট অর্ডার</p>
                <h3 className="text-2xl font-bold mt-1">৩২৫</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+৯% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট পণ্য</p>
                <h3 className="text-2xl font-bold mt-1">৪৯</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span>৫ নতুন পণ্য</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট গ্রাহক</p>
                <h3 className="text-2xl font-bold mt-1">১,২৪০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+২৫% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>বিক্রয় পরিসংখ্যান</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">বিক্রয় চার্ট এখানে দেখানো হবে</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>দ্রুত কাজ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span>লো স্টক পণ্য (৫)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-sky-600">
              <ShoppingBag className="h-4 w-4" />
              <span>পেন্ডিং অর্ডার (১২)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-violet-600">
              <Star className="h-4 w-4" />
              <span>নতুন রিভিউ (৭)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-emerald-600">
              <Percent className="h-4 w-4" />
              <span>প্রোমোশন তৈরি করুন</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">অর্ডার #{123400 + item}</p>
                      <p className="text-sm text-muted-foreground">১ ঘন্টা আগে</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{1200 * item}</p>
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                      পেন্ডিং
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>টপ সেলিং পণ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">পণ্য নাম #{item}</p>
                      <p className="text-sm text-muted-foreground">স্টক: {item * 10}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item * 25} বিক্রয়</p>
                    <div className="flex items-center text-sm text-amber-600">
                      <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                      <span>4.{item}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplaceDashboard;
