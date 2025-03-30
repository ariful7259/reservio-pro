
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Search, 
  ShoppingBag,
  ChevronLeft,
  Camera,
  MapPin,
  Tag,
  DollarSign,
  Clock,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const CreatePost = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState<'rent' | 'service' | 'marketplace'>('rent');

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">পোস্ট করুন</h1>
      </div>

      <Tabs defaultValue="rent" onValueChange={(value) => setPostType(value as any)} className="mb-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="rent" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> রেন্ট
          </TabsTrigger>
          <TabsTrigger value="service" className="flex items-center gap-2">
            <Search className="h-4 w-4" /> সার্ভিস
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> মার্কেটপ্লেস
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rent" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>শিরোনাম</Label>
                  <Input placeholder="শিরোনাম লিখুন" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                      <SelectItem value="house">বাসা</SelectItem>
                      <SelectItem value="car">গাড়ি</SelectItem>
                      <SelectItem value="office">অফিস স্পেস</SelectItem>
                      <SelectItem value="event">ইভেন্ট স্পেস</SelectItem>
                      <SelectItem value="equipment">ইকুইপমেন্ট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>লোকেশন</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input placeholder="লোকেশন লিখুন" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ভাড়া (প্রতি মাস/দিন)</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input type="number" placeholder="0" />
                    <Select defaultValue="month">
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="পিরিয়ড" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">ঘন্টা</SelectItem>
                        <SelectItem value="day">দিন</SelectItem>
                        <SelectItem value="month">মাস</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea placeholder="এখানে বিস্তারিত লিখুন..." className="min-h-[120px]" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input type="file" className="hidden" id="file-upload" multiple accept="image/*" />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button className="w-full">পোস্ট করুন</Button>
          </div>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>সার্ভিসের নাম</Label>
                  <Input placeholder="সার্ভিসের নাম লিখুন" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">মেডিকেল</SelectItem>
                      <SelectItem value="dental">ডেন্টাল</SelectItem>
                      <SelectItem value="mental">মেন্টাল হেলথ</SelectItem>
                      <SelectItem value="legal">লিগ্যাল</SelectItem>
                      <SelectItem value="cleaning">ক্লিনিং</SelectItem>
                      <SelectItem value="repair">রিপেয়ার</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>লোকেশন</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input placeholder="লোকেশন লিখুন" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>মূল্য</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>সময়কাল</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input type="number" placeholder="0" />
                    <Select defaultValue="minutes">
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="সময়" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">মিনিট</SelectItem>
                        <SelectItem value="hours">ঘন্টা</SelectItem>
                        <SelectItem value="days">দিন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea placeholder="এখানে বিস্তারিত লিখুন..." className="min-h-[120px]" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input type="file" className="hidden" id="service-upload" multiple accept="image/*" />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('service-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button className="w-full">পোস্ট করুন</Button>
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>পণ্যের নাম</Label>
                  <Input placeholder="পণ্যের নাম লিখুন" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">হেলথ</SelectItem>
                      <SelectItem value="fitness">ফিটনেস</SelectItem>
                      <SelectItem value="medicine">মেডিসিন</SelectItem>
                      <SelectItem value="electronics">ইলেক্ট্রনিক্স</SelectItem>
                      <SelectItem value="beauty">বিউটি</SelectItem>
                      <SelectItem value="accessories">এক্সেসরিজ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>মূল্য</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input type="number" placeholder="মূল্য" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ডিসকাউন্ট মূল্য (যদি থাকে)</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input type="number" placeholder="ডিসকাউন্ট মূল্য" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ট্যাগ</Label>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input placeholder="কমা দিয়ে ট্যাগ আলাদা করুন" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>বিবরণ</Label>
                  <Textarea placeholder="এখানে বিস্তারিত লিখুন..." className="min-h-[120px]" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label>ছবি যুক্ত করুন</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
                    <input type="file" className="hidden" id="product-upload" multiple accept="image/*" />
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('product-upload')?.click()}>
                      আপলোড করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button className="w-full">পোস্ট করুন</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatePost;
