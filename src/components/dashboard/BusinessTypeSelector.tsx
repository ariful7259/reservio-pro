
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Star, TrendingUp, Users, Zap } from 'lucide-react';

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

  // Default features for business types if not provided
  const getDefaultFeatures = (typeId: string): BusinessFeature[] => {
    const featureMap: Record<string, BusinessFeature[]> = {
      'restaurant': [
        {
          id: 'online-menu',
          name: 'অনলাইন মেনু',
          description: 'ডিজিটাল মেনু কার্ড তৈরি করুন',
          icon: <Zap className="h-4 w-4" />,
          popular: true
        },
        {
          id: 'table-booking',
          name: 'টেবিল বুকিং',
          description: 'গ্রাহকরা অনলাইনে টেবিল বুক করতে পারবেন',
          icon: <Users className="h-4 w-4" />
        },
        {
          id: 'delivery-system',
          name: 'ডেলিভারি সিস্টেম',
          description: 'হোম ডেলিভারি ম্যানেজমেন্ট',
          icon: <TrendingUp className="h-4 w-4" />
        }
      ],
      'retail': [
        {
          id: 'inventory',
          name: 'ইনভেন্টরি ম্যানেজমেন্ট',
          description: 'স্টক ট্র্যাক ও ম্যানেজ করুন',
          icon: <Zap className="h-4 w-4" />,
          popular: true
        },
        {
          id: 'pos-system',
          name: 'POS সিস্টেম',
          description: 'বিক্রয় পয়েন্ট সিস্টেম',
          icon: <Users className="h-4 w-4" />
        },
        {
          id: 'customer-loyalty',
          name: 'কাস্টমার লয়ালটি',
          description: 'গ্রাহক পুরস্কার প্রোগ্রাম',
          icon: <Star className="h-4 w-4" />
        }
      ],
      'service': [
        {
          id: 'appointment',
          name: 'এপয়েন্টমেন্ট বুকিং',
          description: 'অনলাইন সময় নির্ধারণ',
          icon: <Zap className="h-4 w-4" />,
          popular: true
        },
        {
          id: 'service-tracking',
          name: 'সার্ভিস ট্র্যাকিং',
          description: 'কাজের অগ্রগতি ট্র্যাক করুন',
          icon: <TrendingUp className="h-4 w-4" />
        },
        {
          id: 'customer-feedback',
          name: 'গ্রাহক ফিডব্যাক',
          description: 'রিভিউ ও রেটিং সিস্টেম',
          icon: <Star className="h-4 w-4" />
        }
      ]
    };
    return featureMap[typeId] || [];
  };

  const handleTypeClick = (typeId: string) => {
    // Toggle selection
    const newActiveType = activeType === typeId ? null : typeId;
    onChange(newActiveType);

    // Toggle expansion
    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
    }
  };

  const handleShowAllClick = () => {
    onChange(null);
    setExpandedType(null);
  };

  return (
    <div className="space-y-4">
      {/* Main selector buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button 
          variant={activeType === null ? "default" : "outline"}
          className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          onClick={handleShowAllClick}
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
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {businessTypes.find(t => t.id === expandedType)?.icon}
                <h3 className="text-lg font-semibold">
                  {businessTypes.find(t => t.id === expandedType)?.name} এর ফিচারসমূহ
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(businessTypes.find(t => t.id === expandedType)?.features || 
                  getDefaultFeatures(expandedType)).map((feature) => (
                  <Card 
                    key={feature.id} 
                    className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                              {feature.icon}
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
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Feature selected:', feature.id);
                          }}
                        >
                          ব্যবহার করুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Additional info section */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-sm">আরো ফিচার প্রয়োজন?</h4>
                    <p className="text-xs text-muted-foreground">
                      কাস্টম ফিচার যোগ করুন অথবা আমাদের সাথে যোগাযোগ করুন
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      কাস্টম ফিচার
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none">
                      সাপোর্ট
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessTypeSelector;
