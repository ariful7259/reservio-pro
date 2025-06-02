
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Download,
  Edit,
  Eye,
  Settings,
  Share2,
  Copy,
  BarChart3,
  MessageSquare,
  Calendar,
  Bell,
  Zap,
  Rocket
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface QuickActionPanelProps {
  selectedBusinessType: string | null;
}

interface ActionItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'outline';
  route?: string;
  badge?: string;
}

interface ActionGroup {
  group: string;
  actions: ActionItem[];
}

const QuickActionPanel = ({ selectedBusinessType }: QuickActionPanelProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (action: string, route?: string) => {
    setIsLoading(action);
    
    if (route) {
      navigate(route);
    } else {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "অ্যাকশন সম্পন্ন",
        description: `${action} সফলভাবে সম্পন্ন হয়েছে`,
      });
    }
    
    setIsLoading(null);
  };

  const getQuickActions = (): ActionGroup[] => {
    const commonActions: ActionGroup = {
      group: 'সাধারণ কার্যক্রম',
      actions: [
        { id: 'view-analytics', label: 'অ্যানালিটিক্স দেখুন', icon: BarChart3, variant: 'default', route: '/seller-dashboard' },
        { id: 'download-report', label: 'রিপোর্ট ডাউনলোড', icon: Download, variant: 'outline' },
        { id: 'customer-messages', label: 'গ্রাহক বার্তা', icon: MessageSquare, variant: 'outline', badge: '৫ নতুন' },
        { id: 'schedule-calendar', label: 'ক্যালেন্ডার দেখুন', icon: Calendar, variant: 'outline' }
      ]
    };

    const businessSpecificActions: Record<string, ActionGroup> = {
      marketplace: {
        group: 'মার্কেটপ্লেস অ্যাকশন',
        actions: [
          { id: 'add-product', label: 'নতুন প্রোডাক্ট', icon: Plus, variant: 'default', route: '/create-digital-product' },
          { id: 'bulk-upload', label: 'বাল্ক আপলোড', icon: Upload, variant: 'outline' },
          { id: 'inventory-manage', label: 'ইনভেন্টরি ম্যানেজ', icon: Settings, variant: 'outline' },
          { id: 'price-update', label: 'দাম আপডেট', icon: Edit, variant: 'outline' }
        ]
      },
      rental: {
        group: 'রেন্টাল অ্যাকশন',
        actions: [
          { id: 'add-property', label: 'নতুন প্রপার্টি', icon: Plus, variant: 'default', route: '/basa-bari' },
          { id: 'booking-calendar', label: 'বুকিং ক্যালেন্ডার', icon: Calendar, variant: 'outline' },
          { id: 'maintenance-schedule', label: 'মেইনটেনেন্স', icon: Settings, variant: 'outline' },
          { id: 'availability-update', label: 'এভেইলেবিলিটি আপডেট', icon: Edit, variant: 'outline' }
        ]
      },
      service: {
        group: 'সার্ভিস অ্যাকশন',
        actions: [
          { id: 'add-service', label: 'নতুন সার্ভিস', icon: Plus, variant: 'default' },
          { id: 'appointment-book', label: 'অ্যাপয়েন্টমেন্ট বুক', icon: Calendar, variant: 'outline' },
          { id: 'service-portfolio', label: 'পোর্টফোলিও আপডেট', icon: Upload, variant: 'outline' },
          { id: 'pricing-update', label: 'প্রাইসিং আপডেট', icon: Edit, variant: 'outline' }
        ]
      },
      content: {
        group: 'কন্টেন্ট অ্যাকশন',
        actions: [
          { id: 'upload-content', label: 'নতুন কন্টেন্ট', icon: Plus, variant: 'default', route: '/create-digital-product' },
          { id: 'batch-upload', label: 'ব্যাচ আপলোড', icon: Upload, variant: 'outline' },
          { id: 'content-schedule', label: 'পাবলিশ শিডিউল', icon: Calendar, variant: 'outline' },
          { id: 'engagement-boost', label: 'এনগেজমেন্ট বুস্ট', icon: Rocket, variant: 'outline' }
        ]
      }
    };

    const businessActions = selectedBusinessType 
      ? [businessSpecificActions[selectedBusinessType]] || []
      : [];

    return [commonActions, ...businessActions].filter(Boolean);
  };

  const actionGroups = getQuickActions();

  return (
    <div className="space-y-6">
      {actionGroups.map((group, groupIndex) => (
        <Card key={groupIndex}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              {group.group}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {group.actions.map((action) => (
                <div key={action.id} className="relative">
                  <Button
                    variant={action.variant}
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => handleAction(action.label, action.route)}
                    disabled={isLoading === action.label}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <action.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{action.label}</p>
                        {action.badge && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Pro Tips */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800 flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            প্রো টিপস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-purple-700">
            {selectedBusinessType === 'marketplace' && (
              <>
                <p>💡 <strong>SEO অপটিমাইজেশন:</strong> প্রোডাক্ট টাইটেল ও ডিসক্রিপশনে কিওয়ার্ড ব্যবহার করুন</p>
                <p>📸 <strong>ছবির মান:</strong> উচ্চ রেজোলিউশনের ছবি ব্যবহার করে বিক্রয় ৩০% বাড়ান</p>
                <p>🏷️ <strong>প্রাইসিং স্ট্র্যাটেজি:</strong> কম্পিটিটর অ্যানালাইসিস করে দাম নির্ধারণ করুন</p>
              </>
            )}
            {selectedBusinessType === 'rental' && (
              <>
                <p>📅 <strong>বুকিং অপটিমাইজেশন:</strong> পিক সিজনে দাম বাড়িয়ে আয় ৪০% বৃদ্ধি করুন</p>
                <p>🏠 <strong>প্রপার্টি প্রেজেন্টেশন:</strong> ভার্চুয়াল ট্যুর যোগ করে বুকিং বাড়ান</p>
                <p>⭐ <strong>গেস্ট এক্সপেরিয়েন্স:</strong> চেক-ইন গাইড দিয়ে পজিটিভ রিভিউ নিশ্চিত করুন</p>
              </>
            )}
            {selectedBusinessType === 'service' && (
              <>
                <p>🎯 <strong>সার্ভিস প্যাকেজিং:</strong> বান্ডল সার্ভিস অফার করে আয় ২৫% বাড়ান</p>
                <p>📱 <strong>কমিউনিকেশন:</strong> ক্লায়েন্টের সাথে নিয়মিত আপডেট শেয়ার করুন</p>
                <p>📝 <strong>পোর্টফোলিও:</strong> বেস্ট ওয়ার্ক স্যাম্পল দিয়ে ক্রেডিবিলিটি বাড়ান</p>
              </>
            )}
            {selectedBusinessType === 'content' && (
              <>
                <p>🎬 <strong>কন্টেন্ট ক্যালেন্ডার:</strong> নিয়মিত পাবলিশিং এর জন্য শিডিউল বানান</p>
                <p>📊 <strong>ট্রেন্ড অ্যানালাইসিস:</strong> ভাইরাল কন্টেন্ট টাইপ খুঁজে বের করুন</p>
                <p>💬 <strong>কমিউনিটি বিল্ডিং:</strong> অডিয়েন্স এনগেজমেন্ট বাড়িয়ে লয়াল ফ্যান তৈরি করুন</p>
              </>
            )}
            {!selectedBusinessType && (
              <>
                <p>🚀 <strong>ডাইভার্সিফিকেশন:</strong> একাধিক ব্যবসার ধরন চালু করে রিস্ক কমান</p>
                <p>📈 <strong>ক্রস-সেলিং:</strong> এক কাস্টমারকে অন্য সার্ভিস অফার করুন</p>
                <p>🤝 <strong>নেটওয়ার্কিং:</strong> অন্য সেলারদের সাথে কোলাবরেশন করুন</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionPanel;
