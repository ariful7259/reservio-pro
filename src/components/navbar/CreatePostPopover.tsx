
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle,
  ShoppingBag,
  FileText,
  Newspaper,
  MessageCircle,
  Store,
  BookOpen,
  Home,
  Clock,
  Building,
  Utensils,
  PenTool,
  Video,
  Headphones,
  Users,
  Calendar,
  Tag,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAdminConfig } from '@/context/AdminConfigContext';

const CreatePostPopover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { monetizationSettings } = useAdminConfig();

  const notifyComingSoon = (feature: string) => {
    toast({
      title: "শীঘ্রই আসছে",
      description: `${feature} ফিচারটি শীঘ্রই চালু করা হবে।`,
    });
  };

  // একটি পোস্ট বা লিস্টিং তৈরি করার জন্য পৃষ্ঠায় নেভিগেট করে
  const navigateToCreatePage = (path: string, featureName: string, premiumFeature = false) => {
    if (premiumFeature) {
      toast({
        title: "প্রিমিয়াম ফিচার",
        description: `${featureName} একটি প্রিমিয়াম ফিচার। আপগ্রেড করতে প্রিমিয়াম প্ল্যান কিনুন।`,
      });
      return;
    }
    navigate(path);
  };

  // চেক করে যে একটি ফিচার প্রিমিয়াম কিনা
  const isPremiumFeature = (featureKey: string, category: keyof typeof monetizationSettings): boolean => {
    const categorySettings = monetizationSettings[category];
    if (!categorySettings) return false;
    return Boolean(categorySettings[featureKey as keyof typeof categorySettings]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-3" align="end">
        <div className="space-y-2">
          <h3 className="font-medium text-sm">নতুন পোস্ট করুন</h3>
          
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/create-post', 'পোস্ট')}
            >
              <FileText className="mr-2 h-4 w-4" />
              পোস্ট
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/marketplace/create', 'প্রোডাক্ট', isPremiumFeature('premiumListing', 'marketplace'))}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              প্রোডাক্ট{isPremiumFeature('premiumListing', 'marketplace') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/service/create', 'সার্ভিস', isPremiumFeature('premiumListing', 'service'))}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              সার্ভিস{isPremiumFeature('premiumListing', 'service') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/rent/create', 'রেন্টাল', isPremiumFeature('premiumListing', 'rental'))}
            >
              <Home className="mr-2 h-4 w-4" />
              রেন্টাল{isPremiumFeature('premiumListing', 'rental') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/create-store/new', 'অনলাইন স্টোর')}
            >
              <Store className="mr-2 h-4 w-4" />
              অনলাইন স্টোর
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/housing/create', 'বাসা/রুম', isPremiumFeature('premiumListing', 'rental'))}
            >
              <Building className="mr-2 h-4 w-4" />
              বাসা/রুম{isPremiumFeature('premiumListing', 'rental') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/create-digital-product', 'ডিজিটাল প্রোডাক্ট', isPremiumFeature('digitalProductSale', 'digitalCreator'))}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              ডিজিটাল প্রোডাক্ট{isPremiumFeature('digitalProductSale', 'digitalCreator') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/course-builder', 'অনলাইন কোর্স', isPremiumFeature('courseSaleCommission', 'digitalCreator'))}
            >
              <Video className="mr-2 h-4 w-4" />
              অনলাইন কোর্স{isPremiumFeature('courseSaleCommission', 'digitalCreator') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/event-calendar/create', 'ইভেন্ট')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              ইভেন্ট
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/paid-community/create', 'পেইড কমিউনিটি', isPremiumFeature('premiumMembership', 'digitalCreator'))}
            >
              <Users className="mr-2 h-4 w-4" />
              পেইড কমিউনিটি{isPremiumFeature('premiumMembership', 'digitalCreator') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/appointment/create', 'অ্যাপয়েন্টমেন্ট', isPremiumFeature('oneOnOneSession', 'digitalCreator'))}
            >
              <Clock className="mr-2 h-4 w-4" />
              অ্যাপয়েন্টমেন্ট{isPremiumFeature('oneOnOneSession', 'digitalCreator') && <span className="ml-1 text-xs text-primary">★</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigateToCreatePage('/food-menu/create', 'ফুড মেনু')}
            >
              <Utensils className="mr-2 h-4 w-4" />
              ফুড মেনু
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => notifyComingSoon('পডকাস্ট')}
            >
              <Headphones className="mr-2 h-4 w-4" />
              পডকাস্ট<span className="ml-1 text-xs bg-yellow-500/20 text-yellow-600 rounded-full px-1.5">শীঘ্রই</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreatePostPopover;
