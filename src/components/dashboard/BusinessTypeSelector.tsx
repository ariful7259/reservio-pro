
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Star, TrendingUp, Users, Zap, CheckCircle2, Settings, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BusinessType {
  id: string;
  name: string;
  icon: React.ReactNode;
  features?: BusinessFeature[];
}

interface BusinessFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  enabled?: boolean;
  setupProgress?: number;
  dependencies?: string[];
  route?: string;
}

interface BusinessTypeSelectorProps {
  businessTypes: BusinessType[];
  activeType: string | null;
  onChange: (id: string | null) => void;
}

const BusinessTypeSelector = ({ 
  businessTypes, 
  activeType, 
  onChange 
}: BusinessTypeSelectorProps) => {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [enabledFeatures, setEnabledFeatures] = useState<Set<string>>(new Set());
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Enhanced features with navigation routes and dependencies
  const getEnhancedFeatures = (typeId: string): BusinessFeature[] => {
    const featureMap: Record<string, BusinessFeature[]> = {
      'restaurant': [
        {
          id: 'online-menu',
          name: 'অনলাইন মেনু',
          description: 'ডিজিটাল মেনু কার্ড তৈরি করুন',
          icon: <Zap className="h-4 w-4" />,
          popular: true,
          enabled: enabledFeatures.has('online-menu'),
          setupProgress: 75,
          route: '/restaurant/menu-setup'
        },
        {
          id: 'table-booking',
          name: 'টেবিল বুকিং',
          description: 'গ্রাহকরা অনলাইনে টেবিল বুক করতে পারবেন',
          icon: <Users className="h-4 w-4" />,
          enabled: enabledFeatures.has('table-booking'),
          setupProgress: 30,
          dependencies: ['online-menu'],
          route: '/restaurant/booking-setup'
        },
        {
          id: 'delivery-system',
          name: 'ডেলিভারি সিস্টেম',
          description: 'হোম ডেলিভারি ম্যানেজমেন্ট',
          icon: <TrendingUp className="h-4 w-4" />,
          enabled: enabledFeatures.has('delivery-system'),
          setupProgress: 0,
          dependencies: ['online-menu', 'table-booking'],
          route: '/restaurant/delivery-setup'
        }
      ],
      'retail': [
        {
          id: 'inventory',
          name: 'ইনভেন্টরি ম্যানেজমেন্ট',
          description: 'স্টক ট্র্যাক ও ম্যানেজ করুন',
          icon: <Zap className="h-4 w-4" />,
          popular: true,
          enabled: enabledFeatures.has('inventory'),
          setupProgress: 90,
          route: '/marketplace/inventory'
        },
        {
          id: 'pos-system',
          name: 'POS সিস্টেম',
          description: 'বিক্রয় পয়েন্ট সিস্টেম',
          icon: <Users className="h-4 w-4" />,
          enabled: enabledFeatures.has('pos-system'),
          setupProgress: 45,
          route: '/marketplace/pos'
        },
        {
          id: 'customer-loyalty',
          name: 'কাস্টমার লয়ালটি',
          description: 'গ্রাহক পুরস্কার প্রোগ্রাম',
          icon: <Star className="h-4 w-4" />,
          enabled: enabledFeatures.has('customer-loyalty'),
          setupProgress: 15,
          dependencies: ['inventory'],
          route: '/marketplace/loyalty'
        }
      ],
      'service': [
        {
          id: 'appointment',
          name: 'এপয়েন্টমেন্ট বুকিং',
          description: 'অনলাইন সময় নির্ধারণ',
          icon: <Zap className="h-4 w-4" />,
          popular: true,
          enabled: enabledFeatures.has('appointment'),
          setupProgress: 60,
          route: '/services/appointment-setup'
        },
        {
          id: 'service-tracking',
          name: 'সার্ভিস ট্র্যাকিং',
          description: 'কাজের অগ্রগতি ট্র্যাক করুন',
          icon: <TrendingUp className="h-4 w-4" />,
          enabled: enabledFeatures.has('service-tracking'),
          setupProgress: 25,
          route: '/services/tracking-setup'
        },
        {
          id: 'customer-feedback',
          name: 'গ্রাহক ফিডব্যাক',
          description: 'রিভিউ ও রেটিং সিস্টেম',
          icon: <Star className="h-4 w-4" />,
          enabled: enabledFeatures.has('customer-feedback'),
          setupProgress: 0,
          dependencies: ['appointment'],
          route: '/services/feedback-setup'
        }
      ]
    };
    return featureMap[typeId] || [];
  };

  const handleTypeClick = (typeId: string) => {
    const newActiveType = activeType === typeId ? null : typeId;
    onChange(newActiveType);

    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
    }
  };

  const handleFeatureUse = (feature: BusinessFeature) => {
    // Check dependencies
    if (feature.dependencies && feature.dependencies.length > 0) {
      const unmetDependencies = feature.dependencies.filter(dep => !enabledFeatures.has(dep));
      if (unmetDependencies.length > 0) {
        toast({
          title: "ডিপেন্ডেন্সি প্রয়োজন",
          description: `প্রথমে ${unmetDependencies.join(', ')} সেটআপ করুন`,
          variant: "destructive"
        });
        return;
      }
    }

    // Navigate to feature setup page
    if (feature.route) {
      navigate(feature.route);
    } else {
      // Enable/disable feature
      const newEnabledFeatures = new Set(enabledFeatures);
      if (enabledFeatures.has(feature.id)) {
        newEnabledFeatures.delete(feature.id);
        toast({
          title: "ফিচার বন্ধ করা হয়েছে",
          description: `${feature.name} বন্ধ করা হয়েছে`
        });
      } else {
        newEnabledFeatures.add(feature.id);
        toast({
          title: "ফিচার চালু করা হয়েছে",
          description: `${feature.name} সফলভাবে চালু করা হয়েছে`
        });
      }
      setEnabledFeatures(newEnabledFeatures);
    }
  };

  const handleCustomFeature = () => {
    setCustomDialogOpen(true);
  };

  const handleSupport = () => {
    navigate('/help');
    toast({
      title: "সাপোর্ট",
      description: "সাপোর্ট পেজে রিডাইরেক্ট করা হচ্ছে...",
    });
  };

  const canUseFeature = (feature: BusinessFeature) => {
    if (!feature.dependencies) return true;
    return feature.dependencies.every(dep => enabledFeatures.has(dep));
  };

  return (
    <div className="space-y-4">
      {/* Main selector buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button 
          variant={activeType === null ? "default" : "outline"}
          className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          onClick={() => {
            onChange(null);
            setExpandedType(null);
          }}
        >
          সকল ব্যবসা
        </Button>
        
        {businessTypes.map((type) => (
          <Button
            key={type.id}
            variant={activeType === type.id ? "default" : "outline"}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
            onClick={() => handleTypeClick(type.id)}
          >
            {type.icon}
            <span className="hidden sm:inline">{type.name}</span>
            {expandedType === type.id ? 
              <ChevronUp className="h-3 w-3 ml-1" /> : 
              <ChevronDown className="h-3 w-3 ml-1" />
            }
          </Button>
        ))}
      </div>

      {/* Expanded features section */}
      {expandedType && (
        <Card className="animate-fade-in border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {businessTypes.find(t => t.id === expandedType)?.icon}
                <h3 className="text-lg font-semibold">
                  {businessTypes.find(t => t.id === expandedType)?.name} এর ফিচারসমূহ
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {getEnhancedFeatures(expandedType).map((feature) => (
                  <Card 
                    key={feature.id} 
                    className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group ${
                      !canUseFeature(feature) ? 'opacity-60' : ''
                    }`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg transition-colors ${
                              feature.enabled 
                                ? 'bg-green-500 text-white' 
                                : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                            }`}>
                              {feature.enabled ? <CheckCircle2 className="h-4 w-4" /> : feature.icon}
                            </div>
                            {feature.popular && (
                              <Badge variant="secondary" className="text-xs">
                                জনপ্রিয়
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-1">{feature.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                          
                          {/* Progress bar */}
                          {feature.setupProgress !== undefined && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>সেটআপ অগ্রগতি</span>
                                <span>{feature.setupProgress}%</span>
                              </div>
                              <Progress value={feature.setupProgress} className="h-1" />
                            </div>
                          )}

                          {/* Dependencies */}
                          {feature.dependencies && feature.dependencies.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-orange-600">
                                প্রয়োজন: {feature.dependencies.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full text-xs"
                          variant={feature.enabled ? "secondary" : "default"}
                          disabled={!canUseFeature(feature)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeatureUse(feature);
                          }}
                        >
                          {feature.enabled ? 'কনফিগার করুন' : 'ব্যবহার করুন'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Additional info section */}
              <div className="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-sm">আরো ফিচার প্রয়োজন?</h4>
                    <p className="text-xs text-muted-foreground">
                      কাস্টম ফিচার যোগ করুন অথবা আমাদের সাথে যোগাযোগ করুন
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 sm:flex-none flex items-center gap-1"
                      onClick={handleCustomFeature}
                    >
                      <Settings className="h-3 w-3" />
                      কাস্টম ফিচার
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 sm:flex-none flex items-center gap-1"
                      onClick={handleSupport}
                    >
                      <MessageCircle className="h-3 w-3" />
                      সাপোর্ট
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Feature Dialog */}
      <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>কাস্টম ফিচার অনুরোধ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              আপনার বিশেষ প্রয়োজনের জন্য কাস্টম ফিচার তৈরি করতে আমাদের সাথে যোগাযোগ করুন।
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCustomDialogOpen(false)}
                className="flex-1"
              >
                বাতিল
              </Button>
              <Button 
                onClick={() => {
                  setCustomDialogOpen(false);
                  navigate('/help');
                  toast({
                    title: "অনুরোধ পাঠানো হয়েছে",
                    description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব"
                  });
                }}
                className="flex-1"
              >
                অনুরোধ পাঠান
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessTypeSelector;
