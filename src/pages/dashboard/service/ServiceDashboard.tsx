
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Calendar, 
  Users, 
  AlertTriangle, 
  Star, 
  DollarSign,
  TrendingUp,
  Clock,
  MessageSquare,
  CheckCircle,
  UserPlus
} from 'lucide-react';

const ServiceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">সার্ভিস প্রোভাইডার ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার সেবা, অ্যাপয়েন্টমেন্ট এবং আয় পর্যবেক্ষণ করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Wrench className="h-4 w-4" />
          নতুন সার্ভিস যোগ করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <h3 className="text-2xl font-bold mt-1">৳১৮০,০০০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১২% গত মাস থেকে</span>
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
                <p className="text-sm font-medium text-muted-foreground">অ্যাপয়েন্টমেন্ট</p>
                <h3 className="text-2xl font-bold mt-1">৭৮</h3>
                <div className="flex items-center mt-1 text-sm text-sky-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>১০ আজকের</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ক্লায়েন্ট</p>
                <h3 className="text-2xl font-bold mt-1">১৫৪</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span>+৮ নতুন</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">সম্পন্ন সার্ভিস</p>
                <h3 className="text-2xl font-bold mt-1">৪৩০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>৯৮% সাফল্য হার</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>আয় পরিসংখ্যান</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">আয় চার্ট এখানে দেখানো হবে</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>আজকের অ্যাপয়েন্টমেন্ট</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">ক্লায়েন্ট #{item}</p>
                    <p className="text-sm text-muted-foreground">{item + 9}:00 AM</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">বিস্তারিত</Button>
              </div>
            ))}
            <Button className="w-full">সমস্ত অ্যাপয়েন্টমেন্ট দেখুন</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সেবার পারফরম্যান্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">সার্ভিস #{item}</p>
                      <div className="flex items-center text-sm text-amber-600">
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        <span>4.{9-item}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{2500 * item}</p>
                    <p className="text-sm text-muted-foreground">{20 + (item * 5)} বুকিং</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক ফিডব্যাক</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(item => (
                <div key={item} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">গ্রাহক #{item}</p>
                      <div className="flex items-center text-amber-600">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < 6-item ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "খুব সন্তোষজনক সেবা পেয়েছি। সময়মত কাজ শেষ করেছেন এবং সবকিছু পরিষ্কার ছিল।"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDashboard;
