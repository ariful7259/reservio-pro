import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  DollarSign,
  Target,
  Share2,
  Settings,
  Code,
  ExternalLink,
  Copy,
  CheckCircle,
  Activity,
  Zap,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AnalyticsData {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  ctr: number;
}

interface TrackingPlatform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  pixelId?: string;
  trackingCode?: string;
}

export const AdTrackingAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedPixel, setCopiedPixel] = useState<string | null>(null);
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    views: 12450,
    clicks: 890,
    conversions: 67,
    revenue: 89500,
    roi: 320,
    ctr: 7.15
  });

  const [trackingPlatforms, setTrackingPlatforms] = useState<TrackingPlatform[]>([
    { 
      id: 'meta', 
      name: 'Meta Pixel (Facebook/Instagram)', 
      icon: Share2, 
      enabled: true,
      pixelId: '1234567890123456'
    },
    { 
      id: 'google-analytics', 
      name: 'Google Analytics 4', 
      icon: BarChart3, 
      enabled: true,
      trackingCode: 'G-XXXXXXXXXX'
    },
    { 
      id: 'google-tag-manager', 
      name: 'Google Tag Manager', 
      icon: Code, 
      enabled: false,
      trackingCode: 'GTM-XXXXXXX'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok Pixel', 
      icon: Activity, 
      enabled: false,
      pixelId: ''
    },
    { 
      id: 'google-ads', 
      name: 'Google Ads Conversion', 
      icon: Target, 
      enabled: true,
      trackingCode: 'AW-XXXXXXXXX'
    }
  ]);

  const togglePlatform = (platformId: string) => {
    setTrackingPlatforms(prev => prev.map(platform => 
      platform.id === platformId ? { ...platform, enabled: !platform.enabled } : platform
    ));
  };

  const updateTrackingCode = (platformId: string, field: string, value: string) => {
    setTrackingPlatforms(prev => prev.map(platform => 
      platform.id === platformId ? { ...platform, [field]: value } : platform
    ));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPixel(type);
      toast.success('কপি হয়েছে!');
      setTimeout(() => setCopiedPixel(null), 2000);
    } catch (error) {
      toast.error('কপি করতে সমস্যা হয়েছে');
    }
  };

  const generateTrackingScript = (platform: TrackingPlatform) => {
    switch (platform.id) {
      case 'meta':
        return `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${platform.pixelId}');
fbq('track', 'PageView');
</script>`;

      case 'google-analytics':
        return `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${platform.trackingCode}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${platform.trackingCode}');
</script>`;

      case 'google-tag-manager':
        return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${platform.trackingCode}');</script>`;

      case 'tiktok':
        return `<!-- TikTok Pixel -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${platform.pixelId}');
  ttq.page();
}(window, document, 'ttq');
</script>`;

      default:
        return '<!-- Tracking code will be generated here -->';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          অ্যাড ট্র্যাকিং ও অ্যানালিটিক্স
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
            <TabsTrigger value="tracking">ট্র্যাকিং সেটাপ</TabsTrigger>
            <TabsTrigger value="campaigns">ক্যাম্পেইন</TabsTrigger>
            <TabsTrigger value="retargeting">রিটার্গেটিং</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Analytics Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">মোট ভিউ</p>
                      <p className="text-2xl font-bold">{analyticsData.views.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+12.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">ক্লিক</p>
                      <p className="text-2xl font-bold">{analyticsData.clicks.toLocaleString()}</p>
                    </div>
                    <MousePointer className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+8.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">কনভার্শন</p>
                      <p className="text-2xl font-bold">{analyticsData.conversions}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+15.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">রেভিনিউ</p>
                      <p className="text-2xl font-bold">৳{analyticsData.revenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+22.1%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-2xl font-bold">{analyticsData.roi}%</p>
                    </div>
                    <Target className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+5.8%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">CTR</p>
                      <p className="text-2xl font-bold">{analyticsData.ctr}%</p>
                    </div>
                    <MousePointer className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+3.2%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">কনভার্শন ফানেল</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ভিজিটর</span>
                    <span className="font-medium">{analyticsData.views.toLocaleString()}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ইন্টারেস্টেড (ক্লিক)</span>
                    <span className="font-medium">{analyticsData.clicks.toLocaleString()}</span>
                  </div>
                  <Progress value={(analyticsData.clicks / analyticsData.views) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">কনভার্ট (ক্রয়)</span>
                    <span className="font-medium">{analyticsData.conversions}</span>
                  </div>
                  <Progress value={(analyticsData.conversions / analyticsData.views) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">ট্র্যাকিং প্ল্যাটফর্ম সেটাপ</h3>
              
              {trackingPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Card key={platform.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${platform.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <IconComponent className={`h-4 w-4 ${platform.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{platform.name}</h4>
                            <Badge variant={platform.enabled ? 'default' : 'secondary'}>
                              {platform.enabled ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                            </Badge>
                          </div>
                        </div>
                        <Switch
                          checked={platform.enabled}
                          onCheckedChange={() => togglePlatform(platform.id)}
                        />
                      </div>

                      {platform.enabled && (
                        <div className="space-y-3 border-t pt-4">
                          {platform.pixelId !== undefined && (
                            <div className="space-y-2">
                              <Label>Pixel ID</Label>
                              <div className="flex gap-2">
                                <Input
                                  value={platform.pixelId}
                                  onChange={(e) => updateTrackingCode(platform.id, 'pixelId', e.target.value)}
                                  placeholder="আপনার Pixel ID"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(platform.pixelId || '', platform.id)}
                                >
                                  {copiedPixel === platform.id ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}

                          {platform.trackingCode !== undefined && (
                            <div className="space-y-2">
                              <Label>Tracking Code</Label>
                              <div className="flex gap-2">
                                <Input
                                  value={platform.trackingCode}
                                  onChange={(e) => updateTrackingCode(platform.id, 'trackingCode', e.target.value)}
                                  placeholder="আপনার Tracking Code"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(platform.trackingCode || '', `${platform.id}-code`)}
                                >
                                  {copiedPixel === `${platform.id}-code` ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Generated Script</Label>
                            <Textarea
                              value={generateTrackingScript(platform)}
                              readOnly
                              className="font-mono text-xs h-32"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generateTrackingScript(platform), `${platform.id}-script`)}
                            >
                              {copiedPixel === `${platform.id}-script` ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  কপি হয়েছে
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-2" />
                                  স্ক্রিপ্ট কপি করুন
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">অ্যাক্টিভ ক্যাম্পেইন</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                নতুন ক্যাম্পেইন
              </Button>
            </div>

            <div className="grid gap-4">
              {['Facebook Ads', 'Google Ads', 'TikTok Ads'].map((campaign, index) => (
                <Card key={campaign}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{campaign} - কোর্স প্রমোশন</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>খরচ: ৳{(2000 + index * 500).toLocaleString()}</span>
                          <span>ক্লিক: {150 + index * 50}</span>
                          <span>ROI: {250 + index * 30}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="retargeting" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">অটোমেটিক রিটার্গেটিং সেটাপ</h3>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">স্মার্ট রিটার্গেটিং</h4>
                      <p className="text-sm text-muted-foreground">
                        যারা আপনার কোর্স দেখেছে কিন্তু কিনেনি তাদের টার্গেট করুন
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>রিটার্গেটিং ডিসকাউন্ট (%)</Label>
                      <Input type="number" defaultValue="15" />
                    </div>
                    <div className="space-y-2">
                      <Label>ক্যাম্পেইন সময়কাল (দিন)</Label>
                      <Input type="number" defaultValue="7" />
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">অটো রিটার্গেটিং অডিয়েন্স</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Facebook, Instagram, Google এ স্বয়ংক্রিয়ভাবে অডিয়েন্স তৈরি হবে
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">রিটার্গেটিং পারফরমেন্স</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">রিটার্গেট অডিয়েন্স</span>
                        <span className="font-medium">১,২৪৫</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">কনভার্শন রেট</span>
                        <span className="font-medium">১২.৮%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};