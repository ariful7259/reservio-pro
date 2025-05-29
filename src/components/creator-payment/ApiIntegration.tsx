import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Copy, 
  Key, 
  Webhook, 
  Settings, 
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiIntegration = () => {
  const { toast } = useToast();
  
  const [apiKeys] = useState([
    {
      id: 'API001',
      name: 'Production API Key',
      key: 'bp_live_xxxxxxxxxxxxxxxxxxxxxxxx',
      created: '২৮ নভেম্বর, ২০২৪',
      lastUsed: '২ ঘন্টা আগে',
      permissions: ['payment:create', 'payment:read', 'webhook:manage'],
      status: 'active'
    },
    {
      id: 'API002', 
      name: 'Development API Key',
      key: 'bp_test_xxxxxxxxxxxxxxxxxxxxxxxx',
      created: '২৫ নভেম্বর, ২০২৪',
      lastUsed: 'কখনো ব্যবহার হয়নি',
      permissions: ['payment:create', 'payment:read'],
      status: 'active'
    }
  ]);

  const [webhooks] = useState([
    {
      id: 'WH001',
      url: 'https://yoursite.com/webhooks/payment',
      events: ['payment.received', 'payment.released', 'dispute.created'],
      status: 'active',
      lastDelivery: '৫ মিনিট আগে',
      deliveryStatus: 'success'
    },
    {
      id: 'WH002',
      url: 'https://api.example.com/basabari-webhook',
      events: ['payment.received'],
      status: 'failed',
      lastDelivery: '১ ঘন্টা আগে',
      deliveryStatus: 'failed'
    }
  ]);

  const [apiDocs] = useState({
    endpoints: [
      {
        method: 'POST',
        endpoint: '/api/v1/payment-links',
        description: 'নতুন পেমেন্ট লিংক তৈরি করুন',
        requiredParams: ['service_name', 'amount', 'currency']
      },
      {
        method: 'GET',
        endpoint: '/api/v1/payments/{id}',
        description: 'পেমেন্টের বিস্তারিত তথ্য দেখুন',
        requiredParams: ['id']
      },
      {
        method: 'POST',
        endpoint: '/api/v1/webhooks',
        description: 'Webhook তৈরি করুন',
        requiredParams: ['url', 'events']
      }
    ]
  });

  const [newWebhook, setNewWebhook] = useState({
    url: '',
    events: []
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "কপি সফল!",
      description: "ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  const generateApiKey = () => {
    const newKey = 'bp_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    toast({
      title: "নতুন API Key তৈরি",
      description: "নতুন API Key সফলভাবে তৈরি হয়েছে",
    });
  };

  const testWebhook = (webhookId: string) => {
    toast({
      title: "Webhook টেস্ট",
      description: "টেস্ট payload পাঠানো হয়েছে",
    });
  };

  const createWebhook = () => {
    if (!newWebhook.url) {
      toast({
        title: "URL প্রয়োজন",
        description: "Webhook URL দিতে হবে",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Webhook তৈরি সফল",
      description: "নতুন webhook সফলভাবে তৈরি হয়েছে",
    });
    
    setNewWebhook({ url: '', events: [] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-600" />
            API Integration & Webhooks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            আপনার অ্যাপ্লিকেশনের সাথে আমাদের পেমেন্ট সিস্টেম ইন্টিগ্রেট করুন। API Key এবং Webhook ব্যবহার করে রিয়েল-টাইম আপডেট পান।
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="documentation">ডকুমেন্টেশন</TabsTrigger>
          <TabsTrigger value="examples">উদাহরণ</TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  API Keys
                </CardTitle>
                <Button onClick={generateApiKey}>
                  <Key className="h-4 w-4 mr-2" />
                  নতুন Key তৈরি
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {apiKey.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">তৈরি: {apiKey.created}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono">{apiKey.key}</code>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">শেষ ব্যবহার:</span> {apiKey.lastUsed}</p>
                        <div>
                          <span className="font-medium">অনুমতি:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {apiKey.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  API ব্যবহারের পরিসংখ্যান
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-blue-800">মোট API কল</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-green-800">সাফল্যের হার</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">45ms</div>
                    <div className="text-sm text-yellow-800">গড় Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">15</div>
                    <div className="text-sm text-purple-800">আজকের কল</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks">
          <div className="space-y-6">
            {/* Existing Webhooks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-green-600" />
                  বিদ্যমান Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {webhook.url}
                            </code>
                            <Badge className={webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {webhook.status === 'active' ? 'সক্রিয়' : 'ব্যর্থ'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>শেষ ডেলিভারি: {webhook.lastDelivery}</span>
                            <span className={`flex items-center gap-1 ${webhook.deliveryStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                              {webhook.deliveryStatus === 'success' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                              {webhook.deliveryStatus === 'success' ? 'সফল' : 'ব্যর্থ'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => testWebhook(webhook.id)}
                          >
                            টেস্ট
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium">Events:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create New Webhook */}
            <Card>
              <CardHeader>
                <CardTitle>নতুন Webhook তৈরি করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhookUrl">Webhook URL *</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://yoursite.com/webhook"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Events (যে events এর জন্য notification চান)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      'payment.received',
                      'payment.released', 
                      'payment.failed',
                      'dispute.created',
                      'dispute.resolved',
                      'kyc.approved',
                      'kyc.rejected'
                    ].map((event) => (
                      <label key={event} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <input 
                          type="checkbox" 
                          className="rounded"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhook(prev => ({ 
                                ...prev, 
                                events: [...prev.events, event] 
                              }));
                            } else {
                              setNewWebhook(prev => ({ 
                                ...prev, 
                                events: prev.events.filter(e => e !== event) 
                              }));
                            }
                          }}
                        />
                        <span className="text-sm">{event}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={createWebhook} className="w-full">
                  Webhook তৈরি করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                API ডকুমেন্টেশন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Base URL */}
                <div>
                  <h4 className="font-medium mb-2">Base URL</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-sm">https://api.basabari.com/v1</code>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="ml-2"
                      onClick={() => copyToClipboard('https://api.basabari.com/v1')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Authentication */}
                <div>
                  <h4 className="font-medium mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    সকল API কলে Bearer Token ব্যবহার করুন:
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>

                {/* Endpoints */}
                <div>
                  <h4 className="font-medium mb-4">API Endpoints</h4>
                  <div className="space-y-4">
                    {apiDocs.endpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                        <div>
                          <span className="text-sm font-medium">Required Parameters: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {endpoint.requiredParams.map((param, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {param}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webhook Events */}
                <div>
                  <h4 className="font-medium mb-4">Webhook Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Payment Events</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <code>payment.received</code>
                          <span className="text-muted-foreground">পেমেন্ট প্রাপ্তি</span>
                        </div>
                        <div className="flex justify-between">
                          <code>payment.released</code>
                          <span className="text-muted-foreground">Escrow রিলিজ</span>
                        </div>
                        <div className="flex justify-between">
                          <code>payment.failed</code>
                          <span className="text-muted-foreground">পেমেন্ট ব্যর্থ</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Other Events</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <code>dispute.created</code>
                          <span className="text-muted-foreground">বিরোধ সৃষ্টি</span>
                        </div>
                        <div className="flex justify-between">
                          <code>kyc.approved</code>
                          <span className="text-muted-foreground">KYC অনুমোদন</span>
                        </div>
                        <div className="flex justify-between">
                          <code>kyc.rejected</code>
                          <span className="text-muted-foreground">KYC প্রত্যাখ্যান</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples">
          <div className="space-y-6">
            {/* Create Payment Link Example */}
            <Card>
              <CardHeader>
                <CardTitle>উদাহরণ: পেমেন্ট লিংক তৈরি</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">cURL Example</h5>
                    <div className="bg-gray-900 text-green-400 rounded p-4 text-sm font-mono overflow-x-auto">
                      <pre>{`curl -X POST https://api.basabari.com/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service_name": "লোগো ডিজাইন",
    "description": "প্রফেশনাল লোগো ডিজাইন সার্ভিস",
    "amount": 5000,
    "currency": "BDT",
    "delivery_time": "৩ দিন",
    "advance_payment": 50
  }'`}</pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">JavaScript Example</h5>
                    <div className="bg-gray-900 text-blue-400 rounded p-4 text-sm font-mono overflow-x-auto">
                      <pre>{`const response = await fetch('https://api.basabari.com/v1/payment-links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    service_name: 'লোগো ডিজাইন',
    description: 'প্রফেশনাল লোগো ডিজাইন সার্ভিস',
    amount: 5000,
    currency: 'BDT',
    delivery_time: '৩ দিন',
    advance_payment: 50
  })
});

const data = await response.json();
console.log(data.payment_url);`}</pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Response Example</h5>
                    <div className="bg-gray-900 text-yellow-400 rounded p-4 text-sm font-mono overflow-x-auto">
                      <pre>{`{
  "success": true,
  "data": {
    "payment_id": "pay_123abc",
    "payment_url": "https://basabari.com/pay/logo-design-123abc",
    "status": "pending",
    "created_at": "2024-11-28T10:30:00Z"
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Example */}
            <Card>
              <CardHeader>
                <CardTitle>উদাহরণ: Webhook Payload</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h5 className="font-medium mb-2">Payment Received Webhook</h5>
                  <div className="bg-gray-900 text-green-400 rounded p-4 text-sm font-mono overflow-x-auto">
                    <pre>{`{
  "event": "payment.received",
  "data": {
    "payment_id": "pay_123abc",
    "service_name": "লোগো ডিজাইন",
    "amount": 5000,
    "currency": "BDT",
    "buyer_email": "buyer@example.com",
    "creator_id": "creator_456",
    "escrow_status": "holding",
    "auto_release_at": "2024-12-05T10:30:00Z",
    "created_at": "2024-11-28T10:30:00Z"
  },
  "timestamp": "2024-11-28T10:30:00Z"
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegration;
