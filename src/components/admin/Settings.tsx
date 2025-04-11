
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Settings as SettingsIcon, 
  User, 
  Globe, 
  Mail, 
  Lock, 
  Database, 
  Link, 
  Bell, 
  FileText, 
  Upload,
  Plus,
  Badge,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge as BadgeComponent } from '@/components/ui/badge';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("system");
  
  const handleSave = () => {
    toast({
      title: "সেটিংস সংরক্ষিত হয়েছে",
      description: "আপনার পরিবর্তনগুলি সফলভাবে সংরক্ষণ করা হয়েছে।",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">সেটিংস</h1>
          <p className="text-muted-foreground">
            সিস্টেমের জন্য প্রয়োজনীয় কনফিগারেশন পরিচালনা করুন
          </p>
        </div>
        <Button onClick={handleSave}>পরিবর্তন সংরক্ষণ করুন</Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
          <TabsTrigger value="system" className="flex gap-2 items-center">
            <SettingsIcon size={16} />
            <span>সিস্টেম</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex gap-2 items-center">
            <User size={16} />
            <span>ইউজার রোল</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex gap-2 items-center">
            <Globe size={16} />
            <span>অ্যাপিয়ারেন্স</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex gap-2 items-center">
            <Mail size={16} />
            <span>ইমেইল</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Lock size={16} />
            <span>সিকিউরিটি</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex gap-2 items-center">
            <Database size={16} />
            <span>ব্যাকআপ</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex gap-2 items-center">
            <Link size={16} />
            <span>API</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex gap-2 items-center">
            <Bell size={16} />
            <span>নোটিফিকেশন</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex gap-2 items-center">
            <FileText size={16} />
            <span>লিগ্যাল</span>
          </TabsTrigger>
        </TabsList>
        
        {/* সিস্টেম সেটিংস */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">জেনারেল সিস্টেম সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>সাইট টাইটেল</Label>
                  <Input defaultValue="আমার মার্কেটপ্লেস" />
                </div>
                <div className="space-y-2">
                  <Label>সাইট ডেসক্রিপশন</Label>
                  <Input defaultValue="সবচেয়ে জনপ্রিয় বাংলা মার্কেটপ্লেস" />
                </div>
                <div className="space-y-2">
                  <Label>অ্যাডমিন ইমেইল</Label>
                  <Input defaultValue="admin@marketplace.com" />
                </div>
                <div className="space-y-2">
                  <Label>টাইমজোন</Label>
                  <Select defaultValue="asia_dhaka">
                    <SelectTrigger>
                      <SelectValue placeholder="টাইমজোন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia_dhaka">আশিয়া/ঢাকা (GMT+6)</SelectItem>
                      <SelectItem value="asia_kolkata">আশিয়া/কলকাতা (GMT+5:30)</SelectItem>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>মেইনটেনেন্স মোড</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">সাইট মেইনটেনেন্স মোড এনাবল করুন</h4>
                    <p className="text-sm text-muted-foreground">
                      এটি চালু করলে ব্যবহারকারীরা সাইটে প্রবেশ করতে পারবে না।
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>ক্যাশ সেটিংস</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">সিস্টেম ক্যাশিং</h4>
                      <p className="text-sm text-muted-foreground">
                        সাইটের পারফরম্যান্স বাড়াতে সক্রিয় রাখুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ক্যাশ লাইফটাইম (মিনিট)</h4>
                    </div>
                    <Input defaultValue="60" className="w-24 text-right" />
                  </div>
                  
                  <Button variant="outline" size="sm" className="ml-auto">ক্যাশ পরিষ্কার করুন</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>ডেভেলপার সেটিংস</Label>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">ডিবাগ মোড</h4>
                    <p className="text-sm text-muted-foreground">
                      শুধুমাত্র টেস্টিং এনভায়রনমেন্টে এটি চালু রাখুন
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>সিস্টেম মডিউল</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">রেন্টাল সিস্টেম</h4>
                      <p className="text-sm text-muted-foreground">
                        রেন্টাল ফিচার এনাবল করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ডিজিটাল প্রোডাক্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        ডিজিটাল প্রোডাক্ট ফিচার এনাবল করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">সার্ভিস মার্কেটপ্লেস</h4>
                      <p className="text-sm text-muted-foreground">
                        সার্ভিস মার্কেটপ্লেস ফিচার এনাবল করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ব্লগ এবং আর্টিকেল</h4>
                      <p className="text-sm text-muted-foreground">
                        ব্লগ এবং আর্টিকেল মডিউল এনাবল করুন
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>কাস্টম মডিউল</Label>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium">মেম্বারশিপ মডিউল</p>
                      <p className="text-sm text-muted-foreground">পেইড মেম্বারশিপ সিস্টেম</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium">অ্যাফিলিয়েট সিস্টেম</p>
                      <p className="text-sm text-muted-foreground">অ্যাফিলিয়েট রেফারেল সিস্টেম</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>নতুন মডিউল যোগ করুন</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ইউজার রোল সেটিংস */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ইউজার রোল ও পারমিশন সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">বিদ্যমান রোল</h3>
                
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">অ্যাডমিন</h4>
                      <p className="text-sm text-muted-foreground">সম্পূর্ণ অ্যাকসেস</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">মডারেটর</h4>
                      <p className="text-sm text-muted-foreground">কনটেন্ট অ্যাপ্রুভাল এবং ইউজার ম্যানেজমেন্ট</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">ভেন্ডর</h4>
                      <p className="text-sm text-muted-foreground">প্রোডাক্ট এবং সার্ভিস ম্যানেজমেন্ট</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">কাস্টমার</h4>
                      <p className="text-sm text-muted-foreground">রেজিস্টার্ড ইউজার</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>নতুন রোল তৈরি করুন</span>
                </Button>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ডিফল্ট পারমিশন সেটিংস</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>নতুন ইউজার রেজিস্ট্রেশন</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">এনাবল</SelectItem>
                          <SelectItem value="approval">অনুমোদন প্রয়োজন</SelectItem>
                          <SelectItem value="disabled">ডিজেবল</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>ডিফল্ট ইউজার রোল</Label>
                      <Select defaultValue="customer">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">কাস্টমার</SelectItem>
                          <SelectItem value="vendor">ভেন্ডর</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ইউজার ভেরিফিকেশন প্রয়োজন</h4>
                      <p className="text-sm text-muted-foreground">
                        ইমেইল ভেরিফিকেশন বাধ্যতামূলক করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ফোন ভেরিফিকেশন প্রয়োজন</h4>
                      <p className="text-sm text-muted-foreground">
                        ফোন নাম্বার ভেরিফিকেশন বাধ্যতামূলক করুন
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">অ্যাডমিন অ্যাকসেস সেটিংস</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>অ্যাডমিন লগইন আইপি রেস্ট্রিকশন</Label>
                      <Textarea placeholder="অনুমোদিত আইপি ঠিকানা (প্রতি লাইনে একটি)" className="h-24" />
                      <p className="text-xs text-muted-foreground">খালি রাখলে সব আইপি থেকে লগইন করা যাবে</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>অ্যাডমিন সেশন টাইমআউট (মিনিট)</Label>
                      <Input defaultValue="30" type="number" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">অ্যাডমিন টু-ফ্যাক্টর অথেনটিকেশন</h4>
                      <p className="text-sm text-muted-foreground">
                        অ্যাডমিন অ্যাকাউন্টের জন্য 2FA বাধ্যতামূলক করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* অ্যাপিয়ারেন্স সেটিংস */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">সাইট অ্যাপিয়ারেন্স সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">লোগো এবং ফেভিকন</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>সাইট লোগো</Label>
                    <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-50 h-32">
                      <div className="flex flex-col items-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm">লোগো আপলোড করুন</span>
                        <span className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG (মাক্স. 2MB)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">আপলোড করুন</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>ফেভিকন</Label>
                    <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-50 h-32">
                      <div className="flex flex-col items-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm">ফেভিকন আপলোড করুন</span>
                        <span className="text-xs text-muted-foreground mt-1">PNG, ICO (32x32 পিক্সেল)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">আপলোড করুন</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">থিম কালার</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>প্রাইমারি কালার</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="#3498db" />
                        <div className="w-10 h-10 rounded-md bg-blue-500 border"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>সেকেন্ডারি কালার</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="#2ecc71" />
                        <div className="w-10 h-10 rounded-md bg-green-500 border"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>একসেন্ট কালার</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="#e74c3c" />
                        <div className="w-10 h-10 rounded-md bg-red-500 border"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>টেক্সট কালার</Label>
                      <div className="flex gap-2">
                        <Input defaultValue="#333333" />
                        <div className="w-10 h-10 rounded-md bg-gray-800 border"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" size="sm" className="mr-2">রিসেট ডিফল্ট</Button>
                    <Button size="sm">কালার সেভ করুন</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ফন্ট সেটিংস</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>প্রাইমারি ফন্ট</Label>
                      <Select defaultValue="hind_siliguri">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hind_siliguri">হিন্দ সিলিগুড়ি</SelectItem>
                          <SelectItem value="noto_sans_bengali">নোটো সান্স বাংলা</SelectItem>
                          <SelectItem value="kalpurush">কালপুরুষ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>সেকেন্ডারি ফন্ট</Label>
                      <Select defaultValue="noto_sans_bengali">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="noto_sans_bengali">নোটো সান্স বাংলা</SelectItem>
                          <SelectItem value="hind_siliguri">হিন্দ সিলিগুড়ি</SelectItem>
                          <SelectItem value="kalpurush">কালপুরুষ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>বেস ফন্ট সাইজ</Label>
                      <Select defaultValue="16px">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14px">14px</SelectItem>
                          <SelectItem value="16px">16px</SelectItem>
                          <SelectItem value="18px">18px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">অতিরিক্ত কাস্টমাইজেশন</h3>
                  
                  <div className="space-y-2">
                    <Label>কাস্টম CSS</Label>
                    <Textarea className="font-mono text-sm h-32" placeholder="কাস্টম CSS কোড এখানে লিখুন..." />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ডার্ক মোড সাপোর্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        ব্যবহারকারীদের জন্য ডার্ক মোড সক্রিয় করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">RTL সাপোর্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        Right-to-Left ভাষার সাপোর্ট যোগ করুন
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ইমেইল টেমপ্লেট সেটিংস */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ইমেইল সেটিংস এবং টেমপ্লেট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">SMTP কনফিগারেশন</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP সার্ভার</Label>
                    <Input placeholder="smtp.example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SMTP পোর্ট</Label>
                    <Input placeholder="587" type="number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SMTP ইউজারনেম</Label>
                    <Input placeholder="username@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SMTP পাসওয়ার্ড</Label>
                    <Input type="password" placeholder="********" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">SSL এনক্রিপশন ব্যবহার করুন</h4>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>সেন্ডার ইমেইল</Label>
                  <Input placeholder="no-reply@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>সেন্ডার নাম</Label>
                  <Input placeholder="আমার মার্কেটপ্লেস" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">টেস্ট ইমেইল পাঠান</Button>
                  <Button>সেটিংস সেভ করুন</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ইমেইল টেমপ্লেট</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">ইউজার রেজিস্ট্রেশন</h4>
                        <p className="text-sm text-muted-foreground">নতুন ব্যবহারকারী রেজিস্ট্রেশন ইমেইল</p>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">পাসওয়ার্ড রিসেট</h4>
                        <p className="text-sm text-muted-foreground">পাসওয়ার্ড রিসেট লিংক ইমেইল</p>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">অর্ডার কনফার্মেশন</h4>
                        <p className="text-sm text-muted-foreground">অর্ডার প্লেস করার পর ইমেইল</p>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">পেমেন্ট কনফার্মেশন</h4>
                        <p className="text-sm text-muted-foreground">পেমেন্ট সম্পন্ন হওয়ার পর ইমেইল</p>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">শিপিং আপডেট</h4>
                        <p className="text-sm text-muted-foreground">শিপিং স্ট্যাটাস আপডেট ইমেইল</p>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus size={16} />
                    <span>নতুন টেমপ্লেট যোগ করুন</span>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ইমেইল নোটিফিকেশন সেটিংস</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">অ্যাডমিন নোটিফিকেশন</h4>
                        <p className="text-sm text-muted-foreground">
                          নতুন অর্ডার, প্রশ্ন ইত্যাদির জন্য অ্যাডমিনকে ইমেইল পাঠান
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">ভেন্ডর নোটিফিকেশন</h4>
                        <p className="text-sm text-muted-foreground">
                          নতুন অর্ডার নোটিফিকেশন ভেন্ডরদের পাঠান
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">মার্কেটিং ইমেইল</h4>
                        <p className="text-sm text-muted-foreground">
                          প্রমোশন এবং নতুন অফার ইমেইল
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* সিকিউরিটি সেটিংস */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">সিকিউরিটি সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">পাসওয়ার্ড পলিসি</h3>
                
                <div className="space-y-2">
                  <Label>মিনিমাম পাসওয়ার্ড লেংথ</Label>
                  <Input defaultValue="8" type="number" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">কমপ্লেক্স পাসওয়ার্ড প্রয়োজন</h4>
                    <p className="text-sm text-muted-foreground">
                      পাসওয়ার্ডে অক্ষর, সংখ্যা এবং সিম্বল বাধ্যতামূলক করুন
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">পাসওয়ার্ড এক্সপায়ার</h4>
                    <p className="text-sm text-muted-foreground">
                      নির্দিষ্ট সময় পর ব্যবহারকারীদের পাসওয়ার্ড পরিবর্তন করতে বলুন
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>পাসওয়ার্ড এক্সপায়ার ডে</Label>
                  <Input defaultValue="90" type="number" />
                  <p className="text-xs text-muted-foreground">০ দিয়ে এক্সপায়ার ডিজেবল করুন</p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">টু-ফ্যাক্টর অথেনটিকেশন (2FA)</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">2FA এনাবল করুন</h4>
                      <p className="text-sm text-muted-foreground">
                        সকল ব্যবহারকারীদের জন্য 2FA অপশন এনাবল করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>2FA মেথড</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div className="flex items-center">
                          <input type="checkbox" id="2fa_email" checked className="mr-2" />
                          <label htmlFor="2fa_email">ইমেইল OTP</label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div className="flex items-center">
                          <input type="checkbox" id="2fa_sms" checked className="mr-2" />
                          <label htmlFor="2fa_sms">SMS OTP</label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div className="flex items-center">
                          <input type="checkbox" id="2fa_authenticator" checked className="mr-2" />
                          <label htmlFor="2fa_authenticator">Authenticator অ্যাপ</label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div className="flex items-center">
                          <input type="checkbox" id="2fa_recoveryCodes" className="mr-2" />
                          <label htmlFor="2fa_recoveryCodes">রিকভারি কোড</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">সেশন সিকিউরিটি</h3>
                    
                    <div className="space-y-2">
                      <Label>সেশন টাইমআউট (মিনিট)</Label>
                      <Input defaultValue="60" type="number" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">অটো লগআউট</h4>
                        <p className="text-sm text-muted-foreground">
                          নিষ্ক্রিয় থাকার পর অটোমেটিক লগআউট করুন
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">একাধিক ডিভাইস নোটিফিকেশন</h4>
                        <p className="text-sm text-muted-foreground">
                          একাধিক ডিভাইসে লগইন করলে ব্যবহারকারীকে নোটিফাই করুন
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">অ্যাকাউন্ট সিকিউরিটি</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">লগইন অ্যাটেম্প্ট সীমা</h4>
                        <p className="text-sm text-muted-foreground">
                          অসফল লগইন প্রচেষ্টা সীমিত করুন
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>মাক্স লগইন অ্যাটেম্প্ট</Label>
                      <Input defaultValue="5" type="number" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>অ্যাকাউন্ট লক টাইম (মিনিট)</Label>
                      <Input defaultValue="30" type="number" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">ফোর্স পাসওয়ার্ড চেঞ্জ</h4>
                        <p className="text-sm text-muted-foreground">
                          সাসপিসিয়াস অ্যাকটিভিটি ডিটেক্ট করলে পাসওয়ার্ড পরিবর্তন করতে বাধ্য করুন
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ব্যাকআপ সেটিংস */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">ব্যাকআপ ও রিস্টোর সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">অটোমেটিক ব্যাকআপ</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">স্বয়ংক্রিয় ব্যাকআপ এনাবল করুন</h4>
                    <p className="text-sm text-muted-foreground">
                      সিস্টেম নিয়মিত ব্যাকআপ নিবে
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>ব্যাকআপ ফ্রিকোয়েন্সি</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">প্রতি ঘন্টায়</SelectItem>
                      <SelectItem value="daily">দৈনিক</SelectItem>
                      <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                      <SelectItem value="monthly">মাসিক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>সর্বাধিক ব্যাকআপ সংরক্ষণ করুন</Label>
                  <Input defaultValue="10" type="number" />
                  <p className="text-xs text-muted-foreground">পুরাতন ব্যাকআপ অটোমেটিক ডিলিট হবে</p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ব্যাকআপ লোকেশন</h3>
                  
                  <div className="space-y-2">
                    <Label>লোকাল ব্যাকআপ পাথ</Label>
                    <Input placeholder="/var/backups/marketplace" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ক্লাউড ব্যাকআপ</h4>
                      <p className="text-sm text-muted-foreground">
                        ব্যাকআপ একটি ক্লাউড স্টোরেজে রাখুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ক্লাউড প্রোভাইডার</Label>
                    <Select defaultValue="aws_s3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws_s3">Amazon S3</SelectItem>
                        <SelectItem value="google_cloud">Google Cloud Storage</SelectItem>
                        <SelectItem value="dropbox">Dropbox</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>API কী</Label>
                      <Input type="password" placeholder="*********" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>সিক্রেট কী</Label>
                      <Input type="password" placeholder="*********" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>বাকেট/ফোল্ডার</Label>
                    <Input placeholder="marketplace-backups" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ম্যানুয়াল ব্যাকআপ</h3>
                  
                  <div className="flex justify-start gap-4">
                    <Button>ডাটাবেস ব্যাকআপ</Button>
                    <Button variant="outline">ফাইল সিস্টেম ব্যাকআপ</Button>
                    <Button variant="outline">ফুল সিস্টেম ব্যাকআপ</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">রিস্টোর সেটিংস</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">রিস্টোর মোড</h4>
                      <p className="text-sm text-muted-foreground">
                        রিস্টোর করার সময় সাইট মেইনটেনেন্স মোডে রাখুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>ব্যাকআপ ফাইল আপলোড করুন</Label>
                    <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-50 h-32">
                      <div className="flex flex-col items-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm">রিস্টোর ফাইল আপলোড করুন</span>
                        <span className="text-xs text-muted-foreground mt-1">SQL, ZIP, or TAR.GZ ফাইল</span>
                      </div>
                    </div>
                    <Button variant="outline">আপলোড করুন</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">রিস্টোর করার আগে ব্যাকআপ করুন</h4>
                      <p className="text-sm text-muted-foreground">
                        রিস্টোর করার আগে বর্তমান ডাটা ব্যাকআপ নিয়ে রাখুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API সেটিংস */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">API ইন্টিগ্রেশন সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">API অ্যাকসেস</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">API এনাবল করুন</h4>
                    <p className="text-sm text-muted-foreground">
                      থার্ড-পার্টি অ্যাপ্লিকেশনের জন্য API অ্যাকসেস এনাবল করুন
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">API লিমিটেশন সেটিংস</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>রেট লিমিট (রিকোয়েস্ট/মিনিট)</Label>
                        <Input defaultValue="60" type="number" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>মাক্স রিজাল্ট পার পেজ</Label>
                        <Input defaultValue="100" type="number" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">API মেট্রিক্স ট্র্যাকিং</h4>
                        <p className="text-sm text-muted-foreground">
                          API ব্যবহার পরিসংখ্যান সংগ্রহ করুন
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">API কী ম্যানেজমেন্ট</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">অ্যাপ্লিকেশন</th>
                          <th className="text-left py-3 px-4">API কী</th>
                          <th className="text-left py-3 px-4">স্ট্যাটাস</th>
                          <th className="text-right py-3 px-4">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">মোবাইল অ্যাপ</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm mr-2">API_KEY_12345</code>
                              <BadgeComponent variant="outline" className="text-xs">প্রোডাকশন</BadgeComponent>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <BadgeComponent className="bg-green-100 text-green-800 hover:bg-green-100">সক্রিয়</BadgeComponent>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">ম্যানেজ করুন</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">ওয়েব হুক</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm mr-2">API_KEY_67890</code>
                              <BadgeComponent variant="outline" className="text-xs">টেস্টিং</BadgeComponent>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <BadgeComponent className="bg-amber-100 text-amber-800 hover:bg-amber-100">সীমিত</BadgeComponent>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">ম্যানেজ করুন</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Plus size={16} />
                    <span>নতুন API কী তৈরি করুন</span>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ওয়েবহুক কনফিগারেশন</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">অর্ডার ওয়েবহুক</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">অর্ডার.ক্রিয়েটেড</code>
                          <BadgeComponent className="text-xs" variant="outline">সক্রিয়</BadgeComponent>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">পেমেন্ট ওয়েবহুক</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">পেমেন্ট.সাকসেস</code>
                          <BadgeComponent className="text-xs" variant="outline">সক্রিয়</BadgeComponent>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">এডিট</Button>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="flex items-center gap-1 mt-2">
                    <Plus size={16} />
                    <span>নতুন ওয়েবহুক যোগ করুন</span>
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">থার্ড-পার্টি ইন্টিগ্রেশন</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">গুগল অ্যানালিটিক্স</h4>
                        <p className="text-sm text-muted-foreground">
                          ট্র্যাকিং আইডি: UA-123456789-1
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">ফেসবুক পিক্সেল</h4>
                        <p className="text-sm text-muted-foreground">
                          পিক্সেল আইডি: 987654321
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Intercom</h4>
                        <p className="text-sm text-muted-foreground">
                          সাপোর্ট চ্যাট
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">অন্যান্য ইন্টিগ্রেশন</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* নোটিফিকেশন সেটিংস */}
        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">নোটিফিকেশন প্রেফারেন্স</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">অ্যাডমিন নোটিফিকেশন</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">নতুন অর্ডার অ্যালার্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        যখন নতুন অর্ডার প্লেস করা হয়
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">লো স্টক অ্যালার্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        যখন প্রোডাক্ট স্টক থ্রেশহোল্ডের নিচে যায়
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">নতুন কাস্টমার</h4>
                      <p className="text-sm text-muted-foreground">
                        যখন নতুন ব্যবহারকারী রেজিস্ট্রেশন করে
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ফিডব্যাক ও রিভিউ</h4>
                      <p className="text-sm text-muted-foreground">
                        যখন নতুন রিভিউ জমা দেওয়া হয়
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">সিস্টেম নোটিফিকেশন</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">সিস্টেম আপডেট</h4>
                      <p className="text-sm text-muted-foreground">
                        সিস্টেম আপডেট, মেইনটেনেন্স এবং পরিবর্তন সম্পর্কে
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">সিকিউরিটি অ্যালার্ট</h4>
                      <p className="text-sm text-muted-foreground">
                        সিকিউরিটি থ্রেট, সাসপিসিয়াস লগইন প্রচেষ্টা
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">ব্যাকআপ স্ট্যাটাস</h4>
                      <p className="text-sm text-muted-foreground">
                        ব্যাকআপ সফল বা ব্যর্থ হলে নোটিফিকেশন
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ড্যাশবোর্ড</span>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">ব্যবহারকারী নোটিফিকেশন</h3>
                  
                  <p className="text-sm text-muted-foreground">
                    এগুলি হল ডিফল্ট সেটিংস যেগুলি সকল ব্যবহারকারীদের জন্য প্রযোজ্য হবে
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">অর্ডার স্ট্যাটাস</h4>
                      <p className="text-sm text-muted-foreground">
                        অর্ডার প্রসেসিং, শিপিং এবং ডেলিভারি স্ট্যাটাস
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">SMS</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">প্রমোশন ও অফার</h4>
                      <p className="text-sm text-muted-foreground">
                        ডিসকাউন্ট, মেম্বারশিপ অফার ইত্যাদি
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">SMS</span>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">সিকিউরিটি আপডেট</h4>
                      <p className="text-sm text-muted-foreground">
                        পাসওয়ার্ড চেঞ্জ, অ্যাকাউন্ট একসেস ইত্যাদি
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">ইমেইল</span>
                      <Check className="text-green-500" size={18} />
                      <span className="text-sm text-muted-foreground">SMS</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">পুশ নোটিফিকেশন</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">পুশ নোটিফিকেশন এনাবল</h4>
                      <p className="text-sm text-muted-foreground">
                        মোবাইল অ্যাপ ও ওয়েব পুশ নোটিফিকেশন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ফায়ারবেস API কী</Label>
                      <Input placeholder="Firebase API Key" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>VAPID পাবলিক কী</Label>
                      <Input placeholder="Web Push VAPID Key" />
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4">নোটিফিকেশন সেটিংস সেভ করুন</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* লিগ্যাল সেটিংস */}
        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">লিগ্যাল ডকুমেন্টেশন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">প্রাইভেসি পলিসি</h3>
                
                <div className="space-y-2">
                  <Label>প্রাইভেসি পলিসি</Label>
                  <Textarea className="min-h-[300px]" placeholder="আপনার প্রাইভেসি পলিসি এখানে লিখুন..."></Textarea>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">টার্মস এন্ড কন্ডিশন অ্যাকসেপ্ট বাধ্যতামূলক</h4>
                    <p className="text-sm text-muted-foreground">
                      রেজিস্ট্রেশনের সময় ব্যবহারকারীদের টার্মস গ্রহণ করতে হবে
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <h3 className="font-medium">টার্মস অব সার্ভিস</h3>
                
                <div className="space-y-2">
                  <Label>টার্মস অব সার্ভিস</Label>
                  <Textarea className="min-h-[300px]" placeholder="আপনার টার্মস অব সার্ভিস এখানে লিখুন..."></Textarea>
                </div>
                
                <Separator />
                
                <h3 className="font-medium">কুকি পলিসি</h3>
                
                <div className="space-y-2">
                  <Label>কুকি পলিসি</Label>
                  <Textarea className="min-h-[200px]" placeholder="আপনার কুকি পলিসি এখানে লিখুন..."></Textarea>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">কুকি বাধ্যতামূলক ব্যানার</h4>
                      <p className="text-sm text-muted-foreground">
                        সাইটে প্রথম ভিজিট করার সময় কুকি ব্যানার দেখানো হবে
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">অপশনাল কুকি অপ্ট-আউট</h4>
                      <p className="text-sm text-muted-foreground">
                        ব্যবহারকারীদের অপশনাল কুকি বন্ধ করার অপশন দিন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium">অন্যান্য লিগ্যাল ডকুমেন্ট</h3>
                
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">রিফান্ড পলিসি</h4>
                      <p className="text-sm text-muted-foreground">প্রোডাক্ট রিফান্ড ও রিটার্ন পলিসি</p>
                    </div>
                    <Button variant="outline" size="sm">এডিট</Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">শিপিং পলিসি</h4>
                      <p className="text-sm text-muted-foreground">প্রোডাক্ট শিপিং ও ডেলিভারি পলিসি</p>
                    </div>
                    <Button variant="outline" size="sm">এডিট</Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">GDPR কমপ্লায়েন্স</h4>
                      <p className="text-sm text-muted-foreground">ডাটা প্রাইভেসি এবং প্রোটেকশন</p>
                    </div>
                    <Button variant="outline" size="sm">এডিট</Button>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus size={16} />
                  <span>নতুন লিগ্যাল ডকুমেন্ট যোগ করুন</span>
                </Button>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">আইনি বিজ্ঞপ্তি</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">কপিরাইট নোটিস</h4>
                      <p className="text-sm text-muted-foreground">
                        সাইটের ফুটারে কপিরাইট নোটিস দেখান
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>কপিরাইট টেক্সট</Label>
                    <Input defaultValue="© 2023 আমার মার্কেটপ্লেস। সর্বস্বত্ব সংরক্ষিত।" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

