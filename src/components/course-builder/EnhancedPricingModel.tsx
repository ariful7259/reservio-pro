import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Percent, 
  Gift,
  Clock,
  Star,
  Zap
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'one-time' | 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

interface Discount {
  id: string;
  type: 'percentage' | 'fixed';
  value: number;
  validUntil?: Date;
  minQuantity?: number;
  couponCode?: string;
}

interface EnhancedPricingModelProps {
  onPricingChange: (pricing: any) => void;
}

export const EnhancedPricingModel: React.FC<EnhancedPricingModelProps> = ({
  onPricingChange
}) => {
  const [pricingModel, setPricingModel] = useState<'free' | 'one-time' | 'subscription' | 'tiered'>('one-time');
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: 'basic',
      name: 'বেসিক',
      price: 1500,
      currency: 'BDT',
      period: 'one-time',
      features: ['কোর্স অ্যাক্সেস', 'সার্টিফিকেট', 'ইমেইল সাপোর্ট']
    }
  ]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [earlyBirdDiscount, setEarlyBirdDiscount] = useState({
    enabled: false,
    percentage: 20,
    validUntil: ''
  });
  const [bulkDiscount, setBulkDiscount] = useState({
    enabled: false,
    minQuantity: 10,
    percentage: 15
  });

  const addPricingTier = () => {
    const newTier: PricingTier = {
      id: `tier-${Date.now()}`,
      name: 'নতুন টায়ার',
      price: 0,
      currency: 'BDT',
      period: 'one-time',
      features: []
    };
    setPricingTiers([...pricingTiers, newTier]);
  };

  const updatePricingTier = (tierId: string, updates: Partial<PricingTier>) => {
    setPricingTiers(pricingTiers.map(tier => 
      tier.id === tierId ? { ...tier, ...updates } : tier
    ));
  };

  const removePricingTier = (tierId: string) => {
    setPricingTiers(pricingTiers.filter(tier => tier.id !== tierId));
  };

  const addFeatureToTier = (tierId: string) => {
    const tier = pricingTiers.find(t => t.id === tierId);
    if (tier) {
      updatePricingTier(tierId, {
        features: [...tier.features, 'নতুন ফিচার']
      });
    }
  };

  const updateFeature = (tierId: string, featureIndex: number, newFeature: string) => {
    const tier = pricingTiers.find(t => t.id === tierId);
    if (tier) {
      const newFeatures = [...tier.features];
      newFeatures[featureIndex] = newFeature;
      updatePricingTier(tierId, { features: newFeatures });
    }
  };

  const removeFeature = (tierId: string, featureIndex: number) => {
    const tier = pricingTiers.find(t => t.id === tierId);
    if (tier) {
      const newFeatures = tier.features.filter((_, index) => index !== featureIndex);
      updatePricingTier(tierId, { features: newFeatures });
    }
  };

  const addDiscount = () => {
    const newDiscount: Discount = {
      id: `discount-${Date.now()}`,
      type: 'percentage',
      value: 10
    };
    setDiscounts([...discounts, newDiscount]);
  };

  // Notify parent of pricing changes
  React.useEffect(() => {
    onPricingChange({
      model: pricingModel,
      tiers: pricingTiers,
      discounts,
      earlyBird: earlyBirdDiscount,
      bulk: bulkDiscount
    });
  }, [pricingModel, pricingTiers, discounts, earlyBirdDiscount, bulkDiscount, onPricingChange]);

  return (
    <div className="space-y-6">
      {/* Pricing Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle>প্রাইসিং মডেল</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                pricingModel === 'free' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setPricingModel('free')}
            >
              <Gift className="h-6 w-6 mb-2 text-green-500" />
              <h3 className="font-medium">ফ্রি কোর্স</h3>
              <p className="text-sm text-muted-foreground">সম্পূর্ণ বিনামূল্যে</p>
            </div>

            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                pricingModel === 'one-time' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setPricingModel('one-time')}
            >
              <DollarSign className="h-6 w-6 mb-2 text-blue-500" />
              <h3 className="font-medium">একবারে পেমেন্ট</h3>
              <p className="text-sm text-muted-foreground">একবার কিনে চিরতরে অ্যাক্সেস</p>
            </div>

            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                pricingModel === 'subscription' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setPricingModel('subscription')}
            >
              <Calendar className="h-6 w-6 mb-2 text-purple-500" />
              <h3 className="font-medium">সাবস্ক্রিপশন</h3>
              <p className="text-sm text-muted-foreground">মাসিক/বার্ষিক পেমেন্ট</p>
            </div>

            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                pricingModel === 'tiered' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setPricingModel('tiered')}
            >
              <Star className="h-6 w-6 mb-2 text-orange-500" />
              <h3 className="font-medium">টায়ার্ড প্রাইসিং</h3>
              <p className="text-sm text-muted-foreground">একাধিক প্যাকেজ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Configuration */}
      {pricingModel !== 'free' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {pricingModel === 'tiered' ? 'প্রাইসিং টায়ার সমূহ' : 'প্রাইস কনফিগারেশন'}
            </CardTitle>
            {pricingModel === 'tiered' && (
              <Button onClick={addPricingTier}>
                <DollarSign className="h-4 w-4 mr-2" />
                নতুন টায়ার
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <div key={tier.id} className="border rounded-lg p-4 relative">
                  {tier.isPopular && (
                    <Badge className="absolute -top-2 left-4 bg-orange-500">
                      জনপ্রিয়
                    </Badge>
                  )}
                  
                  <div className="space-y-3">
                    <Input
                      value={tier.name}
                      onChange={(e) => updatePricingTier(tier.id, { name: e.target.value })}
                      placeholder="টায়ার নাম"
                      className="font-medium"
                    />
                    
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs">মূল্য</Label>
                        <div className="relative">
                          <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            type="number"
                            value={tier.price}
                            onChange={(e) => updatePricingTier(tier.id, { price: parseFloat(e.target.value) || 0 })}
                            className="pl-9"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs">পিরিয়ড</Label>
                        <Select
                          value={tier.period}
                          onValueChange={(value: any) => updatePricingTier(tier.id, { period: value })}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one-time">একবার</SelectItem>
                            <SelectItem value="monthly">মাসিক</SelectItem>
                            <SelectItem value="yearly">বার্ষিক</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">ফিচার সমূহ</Label>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => addFeatureToTier(tier.id)}
                        >
                          <Zap className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex gap-1">
                            <Input
                              value={feature}
                              onChange={(e) => updateFeature(tier.id, featureIndex, e.target.value)}
                              placeholder="ফিচার বর্ণনা"
                              className="text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(tier.id, featureIndex)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tier Options */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={tier.isPopular || false}
                          onCheckedChange={(checked) => updatePricingTier(tier.id, { isPopular: checked })}
                        />
                        <Label>জনপ্রিয়</Label>
                      </div>
                      
                      {pricingModel === 'tiered' && pricingTiers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePricingTier(tier.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          মুছুন
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discounts and Offers */}
      {pricingModel !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>ছাড় এবং অফার</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="early-bird">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="early-bird">আর্লি বার্ড</TabsTrigger>
                <TabsTrigger value="bulk">বাল্ক ডিসকাউন্ট</TabsTrigger>
                <TabsTrigger value="coupons">কুপন কোড</TabsTrigger>
              </TabsList>

              <TabsContent value="early-bird" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={earlyBirdDiscount.enabled}
                    onCheckedChange={(checked) => setEarlyBirdDiscount({
                      ...earlyBirdDiscount,
                      enabled: checked
                    })}
                  />
                  <Label>আর্লি বার্ড ডিসকাউন্ট এনাবল করুন</Label>
                </div>

                {earlyBirdDiscount.enabled && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>ছাড়ের পরিমাণ (%)</Label>
                      <div className="relative">
                        <Percent className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          type="number"
                          value={earlyBirdDiscount.percentage}
                          onChange={(e) => setEarlyBirdDiscount({
                            ...earlyBirdDiscount,
                            percentage: parseFloat(e.target.value) || 0
                          })}
                          className="pl-9"
                          placeholder="20"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>মেয়াদ উত্তীর্ণ</Label>
                      <div className="relative">
                        <Clock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          type="datetime-local"
                          value={earlyBirdDiscount.validUntil}
                          onChange={(e) => setEarlyBirdDiscount({
                            ...earlyBirdDiscount,
                            validUntil: e.target.value
                          })}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bulk" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={bulkDiscount.enabled}
                    onCheckedChange={(checked) => setBulkDiscount({
                      ...bulkDiscount,
                      enabled: checked
                    })}
                  />
                  <Label>বাল্ক ডিসকাউন্ট এনাবল করুন</Label>
                </div>

                {bulkDiscount.enabled && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>সর্বনিম্ন পরিমাণ</Label>
                      <div className="relative">
                        <Users className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          type="number"
                          value={bulkDiscount.minQuantity}
                          onChange={(e) => setBulkDiscount({
                            ...bulkDiscount,
                            minQuantity: parseInt(e.target.value) || 1
                          })}
                          className="pl-9"
                          placeholder="10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>ছাড়ের পরিমাণ (%)</Label>
                      <div className="relative">
                        <Percent className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          type="number"
                          value={bulkDiscount.percentage}
                          onChange={(e) => setBulkDiscount({
                            ...bulkDiscount,
                            percentage: parseFloat(e.target.value) || 0
                          })}
                          className="pl-9"
                          placeholder="15"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="coupons" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>কুপন কোড সমূহ</Label>
                  <Button onClick={addDiscount} variant="outline">
                    <Gift className="h-4 w-4 mr-2" />
                    নতুন কুপন
                  </Button>
                </div>

                {discounts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Gift className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>কোন কুপন কোড নেই</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {discounts.map((discount) => (
                      <div key={discount.id} className="border rounded-lg p-3">
                        <div className="grid gap-3 md:grid-cols-4">
                          <Input
                            placeholder="কুপন কোড"
                            value={discount.couponCode || ''}
                            onChange={(e) => {
                              const updatedDiscounts = discounts.map(d =>
                                d.id === discount.id ? {...d, couponCode: e.target.value} : d
                              );
                              setDiscounts(updatedDiscounts);
                            }}
                          />
                          <Select
                            value={discount.type}
                            onValueChange={(value: any) => {
                              const updatedDiscounts = discounts.map(d =>
                                d.id === discount.id ? {...d, type: value} : d
                              );
                              setDiscounts(updatedDiscounts);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">শতাংশ</SelectItem>
                              <SelectItem value="fixed">নির্দিষ্ট পরিমাণ</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            placeholder="ছাড়ের পরিমাণ"
                            value={discount.value}
                            onChange={(e) => {
                              const updatedDiscounts = discounts.map(d =>
                                d.id === discount.id ? {...d, value: parseFloat(e.target.value) || 0} : d
                              );
                              setDiscounts(updatedDiscounts);
                            }}
                          />
                          <Button
                            variant="ghost"
                            onClick={() => setDiscounts(discounts.filter(d => d.id !== discount.id))}
                          >
                            মুছুন
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>প্রাইসিং প্রিভিউ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id} 
                className={`border rounded-lg p-6 relative ${
                  tier.isPopular ? 'border-primary shadow-lg' : ''
                }`}
              >
                {tier.isPopular && (
                  <Badge className="absolute -top-2 left-4 bg-orange-500">
                    জনপ্রিয়
                  </Badge>
                )}
                
                <h3 className="font-semibold text-lg mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">৳{tier.price}</span>
                  {tier.period !== 'one-time' && (
                    <span className="text-muted-foreground">
                      /{tier.period === 'monthly' ? 'মাস' : 'বছর'}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full mt-4" variant={tier.isPopular ? 'default' : 'outline'}>
                  এখনই কিনুন
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};