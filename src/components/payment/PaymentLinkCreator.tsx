import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  Copy, 
  Share2, 
  Eye, 
  BarChart3, 
  Plus,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';

interface PaymentLink {
  id: string;
  title: string;
  amount: string;
  description: string;
  isActive: boolean;
  clicks: number;
  payments: number;
  createdAt: string;
  url: string;
}

const PaymentLinkCreator = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    amount: '',
    description: '',
    isActive: true
  });

  const [existingLinks] = useState<PaymentLink[]>([
    {
      id: '1',
      title: 'ওয়েব ডিজাইন সার্ভিস',
      amount: '৫০০০',
      description: 'প্রফেশনাল ওয়েবসাইট ডিজাইন',
      isActive: true,
      clicks: 45,
      payments: 12,
      createdAt: '২০২৪-০১-১৫',
      url: 'https://pay.example.com/web-design-5000'
    },
    {
      id: '2',
      title: 'গ্রাফিক ডিজাইন প্যাকেজ',
      amount: '৩০০০',
      description: 'লোগো এবং ব্র্যান্ডিং ডিজাইন',
      isActive: true,
      clicks: 28,
      payments: 8,
      createdAt: '২০২৪-০১-১০',
      url: 'https://pay.example.com/graphic-design-3000'
    },
    {
      id: '3',
      title: 'SEO অপটিমাইজেশন',
      amount: '৭৫০০',
      description: 'সার্চ ইঞ্জিন অপটিমাইজেশন সার্ভিস',
      isActive: false,
      clicks: 15,
      payments: 3,
      createdAt: '২০২৪-০১-০৫',
      url: 'https://pay.example.com/seo-optimization-7500'
    }
  ]);

  const handleCreateLink = () => {
    if (!newLink.title || !newLink.amount) {
      toast({
        title: "ভুল তথ্য",
        description: "শিরোনাম এবং পরিমাণ অবশ্যই দিতে হবে",
        variant: "destructive",
      });
      return;
    }

    const generatedUrl = `https://pay.example.com/${newLink.title.toLowerCase().replace(/\s+/g, '-')}-${newLink.amount}`;
    
    toast({
      title: "পেমেন্ট লিংক তৈরি হয়েছে",
      description: "আপনার নতুন পেমেন্ট লিংক সফলভাবে তৈরি হয়েছে",
    });

    // Reset form
    setNewLink({
      title: '',
      amount: '',
      description: '',
      isActive: true
    });
    setIsCreating(false);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "কপি করা হয়েছে",
      description: "পেমেন্ট লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  const shareLink = (url: string, title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `পেমেন্ট লিংক - ${title}`,
        url: url,
      });
    } else {
      copyToClipboard(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Link className="h-6 w-6 text-primary" />
            পেমেন্ট লিংক ক্রিয়েটর
          </h2>
          <p className="text-muted-foreground">
            সহজে পেমেন্ট লিংক তৈরি করুন এবং শেয়ার করুন
          </p>
        </div>
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          নতুন লিংক তৈরি করুন
        </Button>
      </div>

      {/* Create New Link Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>নতুন পেমেন্ট লিংক তৈরি করুন</CardTitle>
            <CardDescription>
              আপনার সার্ভিস বা প্রোডাক্টের জন্য পেমেন্ট লিংক তৈরি করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">শিরোনাম *</Label>
                <Input
                  id="title"
                  placeholder="সার্ভিস বা প্রোডাক্টের নাম"
                  value={newLink.title}
                  onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">পরিমাণ (৳) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="৫০০০"
                  value={newLink.amount}
                  onChange={(e) => setNewLink({...newLink, amount: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">বিবরণ</Label>
              <Textarea
                id="description"
                placeholder="সার্ভিস বা প্রোডাক্ট সম্পর্কে বিস্তারিত..."
                value={newLink.description}
                onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newLink.isActive}
                onCheckedChange={(checked) => setNewLink({...newLink, isActive: checked})}
              />
              <Label htmlFor="active">তৎক্ষণাৎ সক্রিয় করুন</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateLink} className="flex-1">
                লিংক তৈরি করুন
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCreating(false)}
                className="flex-1"
              >
                বাতিল
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Links */}
      <div className="grid grid-cols-1 gap-4">
        {existingLinks.map((link) => (
          <Card key={link.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Link Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <Badge variant={link.isActive ? "default" : "secondary"}>
                      {link.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{link.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>পরিমাণ: ৳{link.amount}</span>
                    <span>তৈরি: {link.createdAt}</span>
                  </div>
                  
                  {/* URL Display */}
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <code className="text-sm flex-1 break-all">{link.url}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats and Actions */}
                <div className="flex flex-col gap-3">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-blue-600">{link.clicks}</span>
                      </div>
                      <p className="text-xs text-blue-600">ক্লিক</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1">
                        <BarChart3 className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-600">{link.payments}</span>
                      </div>
                      <p className="text-xs text-green-600">পেমেন্ট</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareLink(link.url, link.title)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {existingLinks.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Link className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">কোন পেমেন্ট লিংক নেই</h3>
            <p className="text-muted-foreground text-center mb-4">
              আপনার প্রথম পেমেন্ট লিংক তৈরি করুন এবং গ্রাহকদের কাছ থেকে সহজে পেমেন্ট নিন
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              প্রথম লিংক তৈরি করুন
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentLinkCreator;
