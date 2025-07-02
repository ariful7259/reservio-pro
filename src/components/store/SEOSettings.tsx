
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Globe, TrendingUp, Eye, Star, 
  CheckCircle2, AlertCircle, Target 
} from 'lucide-react';

const SEOSettings: React.FC = () => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    twitterTitle: '',
    twitterDescription: ''
  });

  const [seoScore, setSeoScore] = useState(75);

  const handleInputChange = (field: string, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
    // Simple SEO score calculation
    const fields = Object.values({ ...seoData, [field]: value });
    const filledFields = fields.filter(f => f.length > 0).length;
    setSeoScore(Math.round((filledFields / fields.length) * 100));
  };

  const seoTips = [
    {
      title: 'পেজ টাইটেল অপটিমাইজ করুন',
      description: '৫০-৬০ ক্যারেক্টারের মধ্যে রাখুন',
      status: seoData.title.length > 0 && seoData.title.length <= 60 ? 'good' : 'warning'
    },
    {
      title: 'মেটা ডিসক্রিপশন যোগ করুন',
      description: '১৫০-১৬০ ক্যারেক্টারের মধ্যে রাখুন',
      status: seoData.description.length > 0 && seoData.description.length <= 160 ? 'good' : 'warning'
    },
    {
      title: 'কীওয়ার্ড রিসার্চ করুন',
      description: 'প্রাসঙ্গিক কীওয়ার্ড ব্যবহার করুন',
      status: seoData.keywords.length > 0 ? 'good' : 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SEO অপটিমাইজেশন</h2>
        <p className="text-gray-600">আপনার স্টোর সার্চ ইঞ্জিনে দৃশ্যমান করুন</p>
      </div>

      {/* SEO Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            SEO স্কোর
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">সার্চ অপটিমাইজেশন</span>
                <span className="text-sm font-bold">{seoScore}%</span>
              </div>
              <Progress value={seoScore} className="h-3" />
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                seoScore >= 80 ? 'bg-green-100 text-green-600' :
                seoScore >= 60 ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {seoScore}
              </div>
              <Badge variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "destructive"}>
                {seoScore >= 80 ? 'চমৎকার' : seoScore >= 60 ? 'ভালো' : 'উন্নতি প্রয়োজন'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              বেসিক SEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="seoTitle">পেজ টাইটেল</Label>
              <Input
                id="seoTitle"
                placeholder="আপনার স্টোরের আকর্ষণীয় টাইটেল"
                value={seoData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                maxLength={60}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Google-এ দেখানো হবে</span>
                <span>{seoData.title.length}/60</span>
              </div>
            </div>

            <div>
              <Label htmlFor="seoDescription">মেটা ডিসক্রিপশন</Label>
              <Textarea
                id="seoDescription"
                placeholder="আপনার স্টোর সম্পর্কে সংক্ষিপ্ত বিবরণ"
                value={seoData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                maxLength={160}
                rows={3}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>সার্চ রেজাল্টে দেখানো হবে</span>
                <span>{seoData.description.length}/160</span>
              </div>
            </div>

            <div>
              <Label htmlFor="seoKeywords">কীওয়ার্ড</Label>
              <Input
                id="seoKeywords"
                placeholder="অনলাইন শপ, ই-কমার্স, কেনাকাটা"
                value={seoData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">কমা দিয়ে আলাদা করুন</p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              সোশ্যাল মিডিয়া SEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ogTitle">Facebook/LinkedIn টাইটেল</Label>
              <Input
                id="ogTitle"
                placeholder="Facebook-এ শেয়ার করার সময় দেখানো টাইটেল"
                value={seoData.ogTitle}
                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="ogDescription">Facebook/LinkedIn বিবরণ</Label>
              <Textarea
                id="ogDescription"
                placeholder="সোশ্যাল মিডিয়ায় শেয়ার করার সময় দেখানো বিবরণ"
                value={seoData.ogDescription}
                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="twitterTitle">Twitter টাইটেল</Label>
              <Input
                id="twitterTitle"
                placeholder="Twitter-এ শেয়ার করার সময় দেখানো টাইটেল"
                value={seoData.twitterTitle}
                onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            SEO উন্নতির টিপস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seoTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tip.status === 'good' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {tip.status === 'good' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-indigo-500" />
            SEO টুলস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Search className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <h4 className="font-medium">কীওয়ার্ড রিসার্চ</h4>
              <p className="text-sm text-gray-600 mb-3">সেরা কীওয়ার্ড খুঁজুন</p>
              <Button variant="outline" size="sm">শুরু করুন</Button>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <h4 className="font-medium">র‍্যাঙ্কিং ট্র্যাকার</h4>
              <p className="text-sm text-gray-600 mb-3">আপনার পজিশন দেখুন</p>
              <Button variant="outline" size="sm">চেক করুন</Button>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <h4 className="font-medium">পারফরমেন্স অডিট</h4>
              <p className="text-sm text-gray-600 mb-3">সাইট স্পিড চেক করুন</p>
              <Button variant="outline" size="sm">অডিট করুন</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-purple-600">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          SEO সেটিংস সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default SEOSettings;
