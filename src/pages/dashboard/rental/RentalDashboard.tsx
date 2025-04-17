
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  Calendar, 
  Users, 
  AlertTriangle, 
  Star, 
  Wrench,
  DollarSign,
  TrendingUp,
  Clock,
  Percent
} from 'lucide-react';

const RentalDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">রেন্টাল সম্পত্তির ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার প্রপার্টি, বুকিং এবং আয় পর্যবেক্ষণ করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Building className="h-4 w-4" />
          নতুন প্রপার্টি যোগ করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <h3 className="text-2xl font-bold mt-1">৳৩৫০,০০০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১০% গত মাস থেকে</span>
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
                <p className="text-sm font-medium text-muted-foreground">মোট প্রপার্টি</p>
                <h3 className="text-2xl font-bold mt-1">১৫</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <span>৩ অ্যাক্টিভ লিস্টিং</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">অকুপেন্সি রেট</p>
                <h3 className="text-2xl font-bold mt-1">৮৫%</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+৫% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">আসন্ন বুকিং</p>
                <h3 className="text-2xl font-bold mt-1">১২</h3>
                <div className="flex items-center mt-1 text-sm text-sky-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>৫ আজকের</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>অকুপেন্সি অ্যানালিটিক্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">অকুপেন্সি চার্ট এখানে দেখানো হবে</p>
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
              <span>মেইনটেনেন্স রিকোয়েস্ট (৮)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-sky-600">
              <Calendar className="h-4 w-4" />
              <span>আসন্ন চেক-ইন (৩)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-violet-600">
              <Star className="h-4 w-4" />
              <span>নতুন রিভিউ (৫)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-emerald-600">
              <Wrench className="h-4 w-4" />
              <span>ইন্সপেকশন শিডিউল (২)</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক বুকিং</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Home className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">ফ্ল্যাট #{item}</p>
                      <p className="text-sm text-muted-foreground">চেক-ইন: আজ + {item} দিন</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{8000 * item}/মাস</p>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      কনফার্মড
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>প্রপার্টি পারফরম্যান্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Building className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">প্রপার্টি #{item}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-emerald-600">{90 - (item * 5)}% অকুপেন্সি</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{12000 * item}</p>
                    <div className="flex items-center text-sm text-amber-600 justify-end">
                      <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                      <span>4.{9-item}</span>
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

export default RentalDashboard;
