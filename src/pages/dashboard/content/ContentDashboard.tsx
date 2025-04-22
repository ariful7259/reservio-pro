
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  TrendingUp, 
  Play, 
  Users, 
  AlertTriangle, 
  Star, 
  DollarSign,
  Clock,
  Layers,
  MessageSquare,
  BarChart3,
  Eye
} from 'lucide-react';

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">কন্টেন্ট ক্রিয়েটর ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার ভিডিও, পাবলিকেশন এবং আয় পর্যবেক্ষণ করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Video className="h-4 w-4" />
          নতুন কন্টেন্ট যোগ করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <h3 className="text-2xl font-bold mt-1">৳৮০,০০০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১৮% গত মাস থেকে</span>
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
                <p className="text-sm font-medium text-muted-foreground">মোট ভিউ</p>
                <h3 className="text-2xl font-bold mt-1">২৫,৪৮০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+২২% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">অডিয়েন্স</p>
                <h3 className="text-2xl font-bold mt-1">৩,৬৫০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১৫% গত মাস থেকে</span>
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
                <p className="text-sm font-medium text-muted-foreground">কন্টেন্ট সংখ্যা</p>
                <h3 className="text-2xl font-bold mt-1">৪৮</h3>
                <div className="flex items-center mt-1 text-sm text-sky-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>৩ ড্রাফট বাকি</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Layers className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>ভিউ অ্যানালিটিক্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">ভিউ চার্ট এখানে দেখানো হবে</p>
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
              <span>পেন্ডিং আপডেট (৫)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-sky-600">
              <MessageSquare className="h-4 w-4" />
              <span>নতুন কমেন্ট (১৬)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-violet-600">
              <BarChart3 className="h-4 w-4" />
              <span>মাসিক রিপোর্ট</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              <span>ট্রেন্ডিং কন্টেন্ট</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>টপ পারফর্মিং কন্টেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">কন্টেন্ট #{item}</p>
                      <p className="text-sm text-muted-foreground">প্রকাশিত: {item} দিন আগে</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item * 880} ভিউ</p>
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

        <Card>
          <CardHeader>
            <CardTitle>আসন্ন পাবলিকেশন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">শিডিউলড কন্টেন্ট #{item}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-sky-600">আজ + {item} দিন</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">ড্রাফট</p>
                    <Button size="sm" variant="ghost" className="h-8 px-2">এডিট</Button>
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

export default ContentDashboard;
