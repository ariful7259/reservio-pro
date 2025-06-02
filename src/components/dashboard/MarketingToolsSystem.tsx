
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Share2, 
  Gift, 
  Target, 
  TrendingUp, 
  Eye,
  MessageSquare,
  Heart,
  Users,
  Percent
} from 'lucide-react';

const MarketingToolsSystem = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  // বর্তমান ক্যাম্পেইনগুলো
  const campaigns = [
    {
      id: 1,
      name: 'গ্রীষ্মকালীন ছাড়',
      type: 'discount',
      status: 'active',
      reach: '২,৫০০',
      engagement: '১৮%',
      conversions: '৮৫',
      budget: '৳৫,০০০'
    },
    {
      id: 2,
      name: 'নতুন পণ্য লঞ্চ',
      type: 'product_launch',
      status: 'active',
      reach: '১,৮০০',
      engagement: '২৪%',
      conversions: '৪২',
      budget: '৳৩,০০০'
    },
    {
      id: 3,
      name: 'রেফারেল প্রোগ্রাম',
      type: 'referral',
      status: 'paused',
      reach: '৯৫০',
      engagement: '৩২%',
      conversions: '২৮',
      budget: '৳২,০০০'
    }
  ];

  // ক্রস-প্রমোশন সুযোগ
  const crossPromotions = [
    {
      partner: 'টেক স্টোর বিডি',
      category: 'ইলেকট্রনিক্স',
      potential_reach: '৫,০০০+',
      estimated_revenue: '৳১৫,০০০',
      status: 'pending'
    },
    {
      partner: 'ফ্যাশন হাব',
      category: 'পোশাক',
      potential_reach: '৩,২০০+',
      estimated_revenue: '৳৮,৫০০',
      status: 'active'
    },
    {
      partner: 'হোম ডেকোর প্লাস',
      category: 'ঘর সাজানো',
      potential_reach: '২,৮০০+',
      estimated_revenue: '৳৬,২০০',
      status: 'negotiating'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'negotiating':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active':
        return 'সক্রিয়';
      case 'paused':
        return 'বিরতি';
      case 'pending':
        return 'অপেক্ষমাণ';
      case 'negotiating':
        return 'আলোচনায়';
      default:
        return status;
    }
  };

  const getCampaignIcon = (type: string) => {
    switch(type) {
      case 'discount':
        return <Percent className="h-4 w-4" />;
      case 'product_launch':
        return <Gift className="h-4 w-4" />;
      case 'referral':
        return <Users className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          মার্কেটিং টুলস এবং ক্রস-প্রমোশন
        </CardTitle>
        <CardDescription>বিভিন্ন ব্যবসা জুড়ে মার্কেটিং ক্যাম্পেইন এবং প্রমোশন পরিচালনা করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">ক্যাম্পেইন</TabsTrigger>
            <TabsTrigger value="cross-promotion">ক্রস-প্রমোশন</TabsTrigger>
            <TabsTrigger value="analytics">পরিসংখ্যান</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">চলমান ক্যাম্পেইন</h3>
              <Button size="sm">
                <Target className="h-4 w-4 mr-1" />
                নতুন ক্যাম্পেইন
              </Button>
            </div>
            
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getCampaignIcon(campaign.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusText(campaign.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">বাজেট</p>
                      <p className="font-bold">{campaign.budget}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="font-bold">{campaign.reach}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">পৌঁছানো</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-bold">{campaign.engagement}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">এনগেজমেন্ট</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-bold">{campaign.conversions}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">কনভার্শন</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cross-promotion" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">ক্রস-প্রমোশন পার্টনারশিপ</h3>
              <Button size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                নতুন পার্টনারশিপ
              </Button>
            </div>
            
            <div className="space-y-3">
              {crossPromotions.map((promo, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{promo.partner}</h4>
                      <p className="text-sm text-muted-foreground">{promo.category}</p>
                    </div>
                    <Badge className={getStatusColor(promo.status)}>
                      {getStatusText(promo.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">সম্ভাব্য পৌঁছানো</p>
                      <p className="text-lg font-bold text-blue-600">{promo.potential_reach}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">আনুমানিক আয়</p>
                      <p className="text-lg font-bold text-green-600">{promo.estimated_revenue}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">বিস্তারিত</Button>
                    {promo.status === 'pending' && (
                      <Button size="sm">গ্রহণ করুন</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h3 className="font-semibold">মার্কেটিং পরিসংখ্যান</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">৮৫%</p>
                <p className="text-sm text-blue-600">ক্যাম্পেইন সাফল্যের হার</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">৳২৮,৫০০</p>
                <p className="text-sm text-green-600">মোট মার্কেটিং ROI</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">১২,৮০০</p>
                <p className="text-sm text-purple-600">মোট পৌঁছানো</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">২১%</p>
                <p className="text-sm text-orange-600">গড় এনগেজমেন্ট</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">চ্যানেল পারফরমেন্স</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>সোশ্যাল মিডিয়া</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-bold">৭৫%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ইমেইল মার্কেটিং</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-bold">৬০%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ক্রস-প্রমোশন</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm font-bold">৪৫%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingToolsSystem;
