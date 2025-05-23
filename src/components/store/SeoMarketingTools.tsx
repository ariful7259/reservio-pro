
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Tag,
  Search,
  Save,
  Link,
  Globe,
  FileText,
  Ticket,
  Loader2,
  Check,
  ChevronRight,
  BarChart2,
  Percent,
  Plus,
  Info
} from 'lucide-react';

const SeoMarketingTools = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('seo');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "সেটিংস সংরক্ষিত হয়েছে",
        description: "SEO সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।",
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Search className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">SEO এবং মার্কেটিং টুলস</h3>
          <p className="text-sm text-muted-foreground">
            আপনার অনলাইন স্টোর সার্চ ইঞ্জিনে উন্নত র‍্যাঙ্কিং পাওয়ার জন্য SEO সেটিংস কনফিগার করুন এবং মার্কেটিং ক্যাম্পেইন সেটআপ করুন।
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-4">
          <TabsTrigger value="seo">
            <Search className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="blog">
            <FileText className="h-4 w-4 mr-2" />
            ব্লগ
          </TabsTrigger>
          <TabsTrigger value="coupons">
            <Ticket className="h-4 w-4 mr-2" />
            কুপন
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="h-4 w-4 mr-2" />
            অ্যানালিটিক্স
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">মেটা ট্যাগ ও SEO সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">মেটা টাইটেল</Label>
                <Input 
                  id="meta-title" 
                  placeholder="আপনার পেইজের টাইটেল লিখুন (60 অক্ষরের মধ্যে)" 
                />
                <p className="text-xs text-muted-foreground">
                  আপনার পেজের টাইটেল। Google সার্চ রেজাল্টে এটি প্রদর্শিত হবে। (সর্বোচ্চ 60 অক্ষর)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">মেটা ডেসক্রিপশন</Label>
                <Textarea 
                  id="meta-description" 
                  placeholder="আপনার পেইজের বর্ণনা লিখুন (160 অক্ষরের মধ্যে)" 
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  আপনার পেজের সংক্ষিপ্ত বিবরণ। Google সার্চ রেজাল্টে এটি প্রদর্শিত হবে। (সর্বোচ্চ 160 অক্ষর)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">কীওয়ার্ডস</Label>
                <Input 
                  id="keywords" 
                  placeholder="কমা দিয়ে আলাদা করে কীওয়ার্ড লিখুন (উদা: ই-কমার্স, অনলাইন শপিং)" 
                />
                <p className="text-xs text-muted-foreground">
                  কীওয়ার্ড কমা দিয়ে আলাদা করুন। এটি সার্চ ইঞ্জিনে আপনার রেঙ্কিং উন্নত করবে।
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical-url">ক্যানোনিকাল URL</Label>
                <Input 
                  id="canonical-url" 
                  placeholder="https://yourdomain.com/page" 
                />
                <p className="text-xs text-muted-foreground">
                  ডুপ্লিকেট কন্টেন্ট এড়াতে ক্যানোনিকাল URL ব্যবহার করুন।
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-url">URL স্লাগ কাস্টমাইজেশন</Label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l text-muted-foreground">
                    yourdomain.com/
                  </span>
                  <Input 
                    id="page-url" 
                    placeholder="page-url-slug" 
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  URL স্লাগ SEO-ফ্রেন্ডলি হওয়া উচিত (শুধুমাত্র ছোট হাতের অক্ষর, সংখ্যা এবং হাইফেন)
                </p>
              </div>

              {showPreview && (
                <div className="mt-4 p-4 border rounded-md bg-muted/20">
                  <h3 className="text-sm font-medium text-blue-600 mb-1">
                    আপনার স্টোর - Google সার্চ রেজাল্ট প্রিভিউ
                  </h3>
                  <h4 className="text-[16px] text-blue-700 font-medium">
                    আপনার স্টোর | অনলাইন শপিং
                  </h4>
                  <p className="text-xs text-green-700">https://yourdomain.com › page-url-slug</p>
                  <p className="text-sm text-gray-700 mt-1">
                    আপনার অনলাইন স্টোর থেকে সেরা মানের পণ্য সামগ্রী কিনুন। আমরা সারা দেশে হোম ডেলিভারি সার্ভিস প্রদান করি। ফ্রি শিপিং ও ক্যাশ অন ডেলিভারি...
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? 'প্রিভিউ লুকান' : 'Google প্রিভিউ দেখুন'}
                </Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      সেটিংস সংরক্ষণ করুন
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">অতিরিক্ত SEO সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">সাইটম্যাপ জেনারেট</h4>
                        <p className="text-sm text-muted-foreground">
                          XML সাইটম্যাপ স্বয়ংক্রিয়ভাবে তৈরি করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">জেনারেট</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">রোবট.txt কনফিগারেশন</h4>
                        <p className="text-sm text-muted-foreground">
                          কোন পেইজ সার্চ ইঞ্জিন ক্রল করবে তা নিয়ন্ত্রণ করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">কনফিগার</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Link className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">রিডাইরেকশন ম্যানেজার</h4>
                        <p className="text-sm text-muted-foreground">
                          301, 302 রিডাইরেক্টস সেটআপ এবং ম্যানেজ করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">কনফিগার</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Tag className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">স্কিমা মার্কআপ</h4>
                        <p className="text-sm text-muted-foreground">
                          রিচ স্নিপেটস সহ সার্চ রেজাল্ট উন্নত করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">কনফিগার</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Search className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Google Search Console</h4>
                        <p className="text-sm text-muted-foreground">
                          Google Search Console-এর সাথে ইন্টিগ্রেট করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">কানেক্ট</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <BarChart2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          ট্র্যাকিং ID দিয়ে Google Analytics সেটআপ করুন
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">কানেক্ট</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ব্লগ পোস্ট ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">আপনার ব্লগ পোস্ট</h3>
                    <p className="text-sm text-muted-foreground">
                      সকল ব্লগ পোস্টের তালিকা দেখুন, এডিট করুন এবং নতুন পোস্ট তৈরি করুন।
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    নতুন পোস্ট লিখুন
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-2 px-4 font-medium">শিরোনাম</th>
                        <th className="text-left py-2 px-4 font-medium">অবস্থা</th>
                        <th className="text-left py-2 px-4 font-medium">তারিখ</th>
                        <th className="text-left py-2 px-4 font-medium">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-primary-light">SEO টিপস</Badge>
                            <span className="font-medium">কিভাবে আপনার ই-কমার্স সাইট অপ্টিমাইজ করবেন</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800">প্রকাশিত</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">২৫ মে, ২০২৫</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">এডিট</Button>
                            <Button variant="ghost" size="sm">ডিলিট</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-primary-light">মার্কেটিং</Badge>
                            <span className="font-medium">সোশ্যাল মিডিয়া মার্কেটিং টিপস</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-amber-100 text-amber-800">ড্রাফট</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">১২ মে, ২০২৫</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">এডিট</Button>
                            <Button variant="ghost" size="sm">ডিলিট</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coupons" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ডিসকাউন্ট কুপন ম্যানেজার</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">ডিসকাউন্ট কুপন</h3>
                  <p className="text-sm text-muted-foreground">
                    বিভিন্ন ধরনের কুপন কোড তৈরি করুন এবং সেগুলোকে ম্যানেজ করুন।
                  </p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন কুপন তৈরি করুন
                </Button>
              </div>
              
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-2 px-4 font-medium">কুপন কোড</th>
                      <th className="text-left py-2 px-4 font-medium">ডিসকাউন্ট</th>
                      <th className="text-left py-2 px-4 font-medium">স্ট্যাটাস</th>
                      <th className="text-left py-2 px-4 font-medium">ব্যবহার</th>
                      <th className="text-left py-2 px-4 font-medium">মেয়াদ</th>
                      <th className="text-left py-2 px-4 font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3 px-4">
                        <span className="font-medium bg-muted px-2 py-1 rounded-md">WELCOME50</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-green-600" />
                          <span>৫০% (সর্বোচ্চ ৳৫০০)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">অ্যাকটিভ</Badge>
                      </td>
                      <td className="py-3 px-4">১২/১০০</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">৩০ জুন, ২০২৫</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">এডিট</Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 px-4">
                        <span className="font-medium bg-muted px-2 py-1 rounded-md">SUMMER25</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-green-600" />
                          <span>২৫% (সর্বোচ্চ ৳৩০০)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">অ্যাকটিভ</Badge>
                      </td>
                      <td className="py-3 px-4">৪৫/২০০</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">১৫ জুলাই, ২০২৫</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">এডিট</Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 px-4">
                        <span className="font-medium bg-muted px-2 py-1 rounded-md">FREESHIP</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1 text-blue-600" />
                          <span>ফ্রি শিপিং</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-red-100 text-red-800">মেয়াদ শেষ</Badge>
                      </td>
                      <td className="py-3 px-4">৭৮/১০০</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">১০ মে, ২০২৫</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">এডিট</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO এবং মার্কেটিং পারফরমেন্স</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-6 rounded-md text-center">
                <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">অ্যানালিটিক্স ডাটা লোড হচ্ছে</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  এখানে আপনার SEO এবং মার্কেটিং পারফরমেন্স ডাটা প্রদর্শিত হবে
                </p>
                <Button variant="outline" className="mt-4">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Google অ্যানালিটিক্স কানেক্ট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoMarketingTools;
