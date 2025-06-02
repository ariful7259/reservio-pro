
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Code, 
  Copy, 
  Eye, 
  Key, 
  Webhook,
  Settings,
  Globe,
  Shield,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ApiIntegration = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('bsb_live_sk_1234567890abcdef...');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState({
    paymentReceived: true,
    paymentReleased: false,
    disputeRaised: true,
    kycUpdated: false,
    withdrawalProcessed: true
  });

  const [apiUsage] = useState({
    totalRequests: 15420,
    successfulRequests: 15280,
    failedRequests: 140,
    rateLimitHits: 8,
    lastRequest: '৫ মিনিট আগে'
  });

  const generateApiKey = () => {
    const newKey = 'bsb_live_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "নতুন API Key তৈরি হয়েছে",
      description: "আপনার নতুন API Key সুরক্ষিত জায়গায় সংরক্ষণ করুন",
    });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key কপি হয়েছে",
      description: "API Key ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  const testWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL দিন",
        description: "টেস্ট করার জন্য Webhook URL প্রয়োজন",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Webhook টেস্ট পাঠানো হচ্ছে",
      description: "আপনার Webhook endpoint এ টেস্ট payload পাঠানো হচ্ছে",
    });
  };

  const codeExamples = {
    curl: `curl -X POST https://api.basabari.com/v1/payment-links \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service_name": "ওয়েব ডিজাইন সার্ভিস",
    "amount": 5000,
    "currency": "BDT",
    "description": "প্রফেশনাল ওয়েবসাইট ডিজাইন"
  }'`,
    
    javascript: `const response = await fetch('https://api.basabari.com/v1/payment-links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    service_name: 'ওয়েব ডিজাইন সার্ভিস',
    amount: 5000,
    currency: 'BDT',
    description: 'প্রফেশনাল ওয়েবসাইট ডিজাইন'
  })
});

const data = await response.json();`,

    python: `import requests

url = "https://api.basabari.com/v1/payment-links"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {
    "service_name": "ওয়েব ডিজাইন সার্ভিস",
    "amount": 5000,
    "currency": "BDT",
    "description": "প্রফেশনাল ওয়েবসাইট ডিজাইন"
}

response = requests.post(url, json=data, headers=headers)`
  };

  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Code className="h-6 w-6" />
          API ইন্টিগ্রেশন
        </h2>
        <p className="text-muted-foreground">
          আপনার কাস্টম প্ল্যাটফর্ম থেকে পেমেন্ট সিস্টেম ব্যবহার করুন
        </p>
      </div>

      {/* API Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{apiUsage.totalRequests.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">মোট রিকোয়েস্ট</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{apiUsage.successfulRequests.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">সফল</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{apiUsage.failedRequests}</p>
            <p className="text-sm text-muted-foreground">ব্যর্থ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{apiUsage.rateLimitHits}</p>
            <p className="text-sm text-muted-foreground">Rate Limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm font-medium">সর্বশেষ রিকোয়েস্ট</p>
            <p className="text-sm text-muted-foreground">{apiUsage.lastRequest}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Key Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Key ব্যবস্থাপনা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  value={apiKey}
                  readOnly
                  type="password"
                  className="font-mono"
                />
                <Button variant="outline" onClick={copyApiKey}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">নিরাপত্তা সতর্কতা</span>
              </div>
              <p className="text-sm text-yellow-700">
                API Key গোপনীয় রাখুন এবং client-side কোডে ব্যবহার করবেন না
              </p>
            </div>
            
            <Button onClick={generateApiKey} className="w-full">
              নতুন API Key তৈরি করুন
            </Button>
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              Webhook কনফিগারেশন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-website.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Webhook Events</Label>
              <div className="space-y-2 mt-2">
                {Object.entries(webhookEvents).map(([event, enabled]) => (
                  <div key={event} className="flex items-center justify-between">
                    <Label htmlFor={event} className="text-sm">
                      {event === 'paymentReceived' && 'পেমেন্ট রিসিভ'}
                      {event === 'paymentReleased' && 'পেমেন্ট রিলিজ'}
                      {event === 'disputeRaised' && 'বিরোধ উত্থাপন'}
                      {event === 'kycUpdated' && 'KYC আপডেট'}
                      {event === 'withdrawalProcessed' && 'উত্তোলন প্রক্রিয়া'}
                    </Label>
                    <Switch
                      id={event}
                      checked={enabled}
                      onCheckedChange={(checked) => 
                        setWebhookEvents(prev => ({...prev, [event]: checked}))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button onClick={testWebhook} variant="outline" className="w-full">
              Webhook টেস্ট করুন
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            কোড উদাহরণ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="flex gap-2">
              {Object.keys(codeExamples).map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
            
            {/* Code Block */}
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{codeExamples[selectedLanguage as keyof typeof codeExamples]}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  navigator.clipboard.writeText(codeExamples[selectedLanguage as keyof typeof codeExamples]);
                  toast({
                    title: "কোড কপি হয়েছে",
                    description: "কোড ক্লিপবোর্ডে কপি করা হয়েছে",
                  });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800">POST</Badge>
                <code className="text-sm">/v1/payment-links</code>
              </div>
              <p className="text-sm text-muted-foreground">পেমেন্ট লিংক তৈরি করুন</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                <code className="text-sm">/v1/transactions/{id}</code>
              </div>
              <p className="text-sm text-muted-foreground">লেনদেনের বিস্তারিত দেখুন</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-100 text-orange-800">PUT</Badge>
                <code className="text-sm">/v1/payment-links/{id}</code>
              </div>
              <p className="text-sm text-muted-foreground">পেমেন্ট লিংক আপডেট করুন</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-100 text-red-800">DELETE</Badge>
                <code className="text-sm">/v1/payment-links/{id}</code>
              </div>
              <p className="text-sm text-muted-foreground">পেমেন্ট লিংক ডিলিট করুন</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limits এবং Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Rate Limits:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>১০০ রিকোয়েস্ট/মিনিট</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>১০,০০০ রিকোয়েস্ট/দিন</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>Rate limit exceeded = 429 status</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Best Practices:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>HTTPS ব্যবহার করুন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>Error handling implement করুন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>Webhook signature verify করুন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span>API key secure রাখুন</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiIntegration;
