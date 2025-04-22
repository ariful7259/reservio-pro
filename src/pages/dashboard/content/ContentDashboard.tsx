
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Eye, 
  Users, 
  TrendingUp, 
  Star, 
  DollarSign,
  MessageSquare,
  Upload,
  UserPlus,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">কন্টেন্ট ক্রিয়েটর ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার কন্টেন্ট, দর্শক এবং আয় পর্যবেক্ষণ করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Upload className="h-4 w-4" />
          নতুন কন্টেন্ট আপলোড করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট ভিউ</p>
                <h3 className="text-2xl font-bold mt-1">২৪৮,৩৫০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১৮% গত মাস থেকে</span>
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
                <p className="text-sm font-medium text-muted-foreground">সাবস্ক্রাইবার</p>
                <h3 className="text-2xl font-bold mt-1">১২,৫৮৪</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span>+২২৫ গত সপ্তাহে</span>
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
                <p className="text-sm font-medium text-muted-foreground">এনগেজমেন্ট রেট</p>
                <h3 className="text-2xl font-bold mt-1">৮.৭%</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+১.২% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <h3 className="text-2xl font-bold mt-1">৳৯৫,৪৫০</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+২৫% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>দর্শক সংখ্যা ট্রেন্ড</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">দর্শক সংখ্যা চার্ট এখানে দেখানো হবে</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>দর্শক ডেমোগ্রাফিক্স</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded">
              <p className="text-muted-foreground">ডেমোগ্রাফিক্স চার্ট এখানে দেখানো হবে</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সেরা পারফর্মিং কন্টেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-28 bg-gray-100 rounded flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">কন্টেন্ট টাইটেল #{item}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{item * 12450} ভিউস</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক কমেন্ট</CardTitle>
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
                      <p className="font-medium">ইউজার #{item}</p>
                      <p className="text-xs text-muted-foreground">২ ঘন্টা আগে</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "দারুণ কন্টেন্ট! আরও এরকম কন্টেন্ট দেখতে চাই। খুব উপকারী তথ্য দিয়েছেন।"
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">রিপ্লাই</Button>
                    <Button size="sm" variant="ghost">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>আয়ের উৎস</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">সাবস্ক্রিপশন</h3>
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold">৳৫৮,৪০০</p>
                <p className="text-sm text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +১৮% গত মাস থেকে
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">ডিজিটাল প্রোডাক্ট</h3>
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold">৳২৪,৬৫০</p>
                <p className="text-sm text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +৩৫% গত মাস থেকে
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">অ্যাফিলিয়েট</h3>
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold">৳১২,৪০০</p>
                <p className="text-sm text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +১২% গত মাস থেকে
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard;
