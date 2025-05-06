
import React from 'react';
import { FileText, Check, Clock, RefreshCw, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefundRule, RefundRequest, RefundSettings } from './types';
import { renderStatusIcon, renderStatusBadge } from './refundUtils';

interface RefundDashboardProps {
  refundRequests: RefundRequest[];
  refundRules: RefundRule[];
  refundSettings: RefundSettings;
  setRefundSettings: (settings: RefundSettings) => void;
  setActiveTab: (tab: string) => void;
  setOpenRefundDetails: (id: string | null) => void;
  toast: any;
}

const RefundDashboard: React.FC<RefundDashboardProps> = ({
  refundRequests,
  refundRules,
  refundSettings,
  setRefundSettings,
  setActiveTab,
  setOpenRefundDetails,
  toast
}) => {
  return (
    <div className="space-y-6">
      {/* স্ট্যাটিসটিকস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">{refundRequests.length}</div>
            </div>
            <p className="text-muted-foreground">মোট রিফান্ড</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <div className="bg-green-100 text-green-700 p-2 rounded-full">
                <Check className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">
                {refundRequests.filter(r => r.status === 'completed').length}
              </div>
            </div>
            <p className="text-muted-foreground">সম্পন্ন রিফান্ড</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">
                {refundRequests.filter(r => r.status === 'pending' || r.status === 'processing').length}
              </div>
            </div>
            <p className="text-muted-foreground">পেন্ডিং রিফান্ড</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">
                {refundRequests.filter(r => r.automatic).length}
              </div>
            </div>
            <p className="text-muted-foreground">অটোমেটিক রিফান্ড</p>
          </CardContent>
        </Card>
      </div>
      
      {/* অটো রিফান্ড স্ট্যাটাস */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>অটোমেটিক রিফান্ড স্ট্যাটাস</CardTitle>
            <CardDescription>সিস্টেম রিফান্ড স্থিতি এবং কনফিগারেশন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">অটোমেটিক রিফান্ড</h3>
                  <p className="text-sm text-muted-foreground">সর্বোচ্চ ৳{refundSettings.autoRefundThreshold} পর্যন্ত অটোমেটিক রিফান্ড</p>
                </div>
                <Switch 
                  checked={refundSettings.enableAutoRefund} 
                  onCheckedChange={(checked) => {
                    setRefundSettings({...refundSettings, enableAutoRefund: checked});
                    toast({
                      title: checked ? "অটোমেটিক রিফান্ড সক্রিয় করা হয়েছে" : "অটোমেটিক রিফান্ড নিষ্ক্রিয় করা হয়েছে",
                    });
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">রিফান্ড নোটিফিকেশন</h3>
                  <p className="text-sm text-muted-foreground">রিফান্ড প্রসেস হলে নোটিফিকেশন</p>
                </div>
                <Switch 
                  checked={refundSettings.notifyOnRefund} 
                  onCheckedChange={(checked) => {
                    setRefundSettings({...refundSettings, notifyOnRefund: checked});
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">আসল পেমেন্ট মেথডে রিফান্ড</h3>
                  <p className="text-sm text-muted-foreground">যে পেমেন্ট মেথড থেকে পেমেন্ট করা হয়েছিল</p>
                </div>
                <Switch 
                  checked={refundSettings.refundToOriginalMethod} 
                  onCheckedChange={(checked) => {
                    setRefundSettings({...refundSettings, refundToOriginalMethod: checked});
                  }}
                />
              </div>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                {refundSettings.enableAutoRefund 
                  ? `অটোমেটিক রিফান্ড সক্রিয় আছে। ৳${refundSettings.autoRefundThreshold} পর্যন্ত রিফান্ড অটোমেটিক প্রসেস হবে।` 
                  : "অটোমেটিক রিফান্ড বর্তমানে নিষ্ক্রিয় আছে। সকল রিফান্ড ম্যানুয়ালি রিভিউ করা হবে।"}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* সাম্প্রতিক রিফান্ড */}
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক রিফান্ড</CardTitle>
            <CardDescription>সর্বশেষ রিফান্ড রিকোয়েস্ট</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {refundRequests.slice(0, 3).map(request => (
                <div 
                  key={request.id} 
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setOpenRefundDetails(request.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {renderStatusIcon(request.status)}
                      <div>
                        <h4 className="font-medium">{request.reason}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{request.id}</span>
                          <span>•</span>
                          <span>৳{request.amount}</span>
                          <span>•</span>
                          <span>{request.requestDate}</span>
                        </div>
                      </div>
                    </div>
                    {renderStatusBadge(request.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3 px-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setActiveTab('requests')}
              >
                সকল রিফান্ড দেখুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* অ্যাকটিভ রুলস এবং অটো রিফান্ড পারফরম্যান্স */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>অ্যাকটিভ রিফান্ড রুলস</CardTitle>
              <CardDescription>বর্তমানে সক্রিয় রিফান্ড রুলস</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {refundRules.filter(rule => rule.active).length === 0 ? (
                  <div className="p-6 text-center">
                    <AlertDescription className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <h3 className="font-medium mb-1">কোন সক্রিয় রুল নেই</h3>
                    <p className="text-sm text-muted-foreground">
                      রিফান্ড রুলস ট্যাবে গিয়ে রিফান্ড রুলস সক্রিয় করুন
                    </p>
                  </div>
                ) : (
                  refundRules.filter(rule => rule.active).map(rule => (
                    <div key={rule.id} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{rule.title}</h3>
                          <Badge variant="outline">
                            {rule.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                             rule.category === 'service' ? 'সার্ভিস' :
                             rule.category === 'rental' ? 'রেন্টাল' : rule.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-blue-600 font-medium">{rule.percent}% রিফান্ড</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="text-xs text-muted-foreground">
                        সময়সীমা: {rule.timeLimit} ঘন্টা
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="py-3 px-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setActiveTab('rules')}
                >
                  সকল রুলস ম্যানেজ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>অটো রিফান্ড পারফরম্যান্স</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>স্বয়ংক্রিয়তা রেট</span>
                  <span>
                    {Math.round((refundRequests.filter(r => r.automatic).length / refundRequests.length) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(refundRequests.filter(r => r.automatic).length / refundRequests.length) * 100}
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>রিফান্ড সম্পন্ন হার</span>
                  <span>
                    {Math.round((refundRequests.filter(r => r.status === 'completed').length / refundRequests.length) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(refundRequests.filter(r => r.status === 'completed').length / refundRequests.length) * 100}
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>রিফান্ড প্রসেসিং সময়</span>
                  <span>গড় 24 ঘন্টা</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-3">রিফান্ড ক্যাটাগরি বন্টন</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">
                      {refundRequests.filter(r => r.category === 'marketplace').length}
                    </div>
                    <div className="text-xs text-muted-foreground">মার্কেটপ্লেস</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">
                      {refundRequests.filter(r => r.category === 'service').length}
                    </div>
                    <div className="text-xs text-muted-foreground">সার্ভিস</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded text-center">
                    <div className="text-sm font-medium">
                      {refundRequests.filter(r => r.category === 'rental').length}
                    </div>
                    <div className="text-xs text-muted-foreground">রেন্টাল</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RefundDashboard;
