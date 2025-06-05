
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, Tablet, Smartphone, Edit, Eye, 
  Palette, Download, Share2, Settings 
} from 'lucide-react';

interface TemplatePreviewModalProps {
  template: {
    id: string;
    name: string;
    category: string;
    preview: string;
    description: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onUse: (templateId: string) => void;
  onCustomize: (templateId: string) => void;
}

const TemplatePreviewModal = ({ 
  template, 
  isOpen, 
  onClose, 
  onUse, 
  onCustomize 
}: TemplatePreviewModalProps) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getDeviceClasses = () => {
    switch (device) {
      case 'desktop':
        return 'w-full h-96';
      case 'tablet':
        return 'w-2/3 h-80 mx-auto';
      case 'mobile':
        return 'w-1/2 h-96 mx-auto';
      default:
        return 'w-full h-96';
    }
  };

  const mockTemplateContent = {
    'facebook-ads': `
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Facebook Ads Campaign</h1>
        <p class="text-xl mb-6">৫০% ছাড়ে পেশাদার Facebook বিজ্ঞাপন সেবা</p>
        <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold">
          এখনই অর্ডার করুন - ৳২,৫০০
        </button>
      </div>
    `,
    'google-ads': `
      <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Google Ads Expert</h1>
        <p class="text-xl mb-6">গুগল বিজ্ঞাপনে সফলতার গ্যারান্টি</p>
        <button class="bg-white text-red-600 px-8 py-3 rounded-lg font-bold">
          শুরু করুন - ৳৩,০০০
        </button>
      </div>
    `,
    default: `
      <div class="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 text-center">
        <h1 class="text-4xl font-bold mb-4">${template.name}</h1>
        <p class="text-xl mb-6">পেশাদার ডিজিটাল মার্কেটিং সেবা</p>
        <button class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold">
          অর্ডার করুন
        </button>
      </div>
    `
  };

  const getTemplateContent = () => {
    const key = template.id.toLowerCase().replace(/\s+/g, '-');
    return mockTemplateContent[key as keyof typeof mockTemplateContent] || mockTemplateContent.default;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-xl">{template.name} - প্রিভিউ</span>
              <Badge variant="outline" className="ml-2">{template.category}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={device === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDevice('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={device === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDevice('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={device === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDevice('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preview" className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              প্রিভিউ
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              ফিচার
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              কাস্টমাইজ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 mt-4">
            <div className="bg-gray-100 p-4 rounded-lg h-full">
              <div className={`${getDeviceClasses()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
                <div dangerouslySetInnerHTML={{ __html: getTemplateContent() }} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold">টেমপ্লেট ফিচার:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ মোবাইল রেসপন্সিভ ডিজাইন</li>
                  <li>✓ SEO অপটিমাইজড কন্টেন্ট</li>
                  <li>✓ দ্রুত লোড টাইম</li>
                  <li>✓ কনভার্শন অপটিমাইজড</li>
                  <li>✓ সোশ্যাল মিডিয়া ইন্টিগ্রেশন</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">কাস্টমাইজেশন অপশন:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ রঙ পরিবর্তন</li>
                  <li>✓ টেক্সট এডিটিং</li>
                  <li>✓ ইমেজ আপলোড</li>
                  <li>✓ বাটন কাস্টমাইজেশন</li>
                  <li>✓ পেমেন্ট ইন্টিগ্রেশন</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">প্রাথমিক রঙ</label>
                  <input type="color" className="w-full h-10 rounded border" defaultValue="#3b82f6" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">সেকেন্ডারি রঙ</label>
                  <input type="color" className="w-full h-10 rounded border" defaultValue="#8b5cf6" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">হেডলাইন টেক্সট</label>
                <input type="text" className="w-full p-2 border rounded" defaultValue={template.name} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">বর্ণনা</label>
                <textarea className="w-full p-2 border rounded h-20" defaultValue={template.description} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              ডাউনলোড
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              শেয়ার
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              বন্ধ করুন
            </Button>
            <Button variant="outline" onClick={() => onCustomize(template.id)}>
              <Edit className="h-4 w-4 mr-2" />
              কাস্টমাইজ করুন
            </Button>
            <Button onClick={() => onUse(template.id)}>
              ব্যবহার করুন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
