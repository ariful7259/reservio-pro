
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  Users, 
  Clock, 
  Shield, 
  CreditCard,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { rentalCategories } from '@/utils/rentalCategoriesData';
import { useNavigate } from 'react-router-dom';

const RentalCategoriesShowcase = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string, subcategory?: string) => {
    navigate(`/rental-booking/${categoryId}`, {
      state: { subcategory }
    });
  };

  const getPricingTypeIcon = (type: string) => {
    switch (type) {
      case 'hourly': return <Clock className="h-4 w-4" />;
      case 'daily': return <Clock className="h-4 w-4" />;
      case 'monthly': return <CreditCard className="h-4 w-4" />;
      case 'per_item': return <Users className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPricingTypeText = (type: string) => {
    switch (type) {
      case 'hourly': return 'ঘন্টা ভিত্তিক';
      case 'daily': return 'দৈনিক ভিত্তিক';
      case 'weekly': return 'সাপ্তাহিক ভিত্তিক';
      case 'monthly': return 'মাসিক ভিত্তিক';
      case 'per_item': return 'আইটেম ভিত্তিক';
      case 'fixed': return 'নির্দিষ্ট মূল্য';
      default: return 'কাস্টম';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">রেন্ট ক্যাটাগরি সমূহ</h1>
        <p className="text-muted-foreground">প্রতিটি ক্যাটাগরির জন্য আলাদা বুকিং পদ্ধতি ও তথ্য</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">সকল ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="pricing">ভাড়া পদ্ধতি</TabsTrigger>
          <TabsTrigger value="features">বিশেষ সুবিধা</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalCategories.map((category) => (
              <Card 
                key={category.id} 
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div>{category.name}</div>
                      <div className="text-sm text-muted-foreground font-normal">{category.nameEn}</div>
                    </div>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {category.subcategories.length} সাব-ক্যাটাগরি
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${category.approvalRequired ? 'bg-orange-50' : 'bg-green-50'}`}
                    >
                      {category.approvalRequired ? 'ম্যানুয়াল অনুমোদন' : 'তাৎক্ষণিক বুকিং'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Subcategories */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">সাব-ক্যাটাগরি সমূহ:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {category.subcategories.slice(0, 4).map((sub, index) => (
                        <Button
                          key={sub}
                          variant="ghost"
                          size="sm"
                          className="justify-start h-8 px-2 text-xs hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(category.id, sub);
                          }}
                        >
                          <ArrowRight className="h-3 w-3 mr-2" />
                          {sub}
                        </Button>
                      ))}
                      {category.subcategories.length > 4 && (
                        <Badge variant="outline" className="text-xs text-center">
                          +{category.subcategories.length - 4} আরও
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pricing Method */}
                  <div className="flex items-center gap-2 text-sm">
                    {getPricingTypeIcon(category.pricingMethod.type)}
                    <span className="text-muted-foreground">ভাড়া:</span>
                    <span className="font-medium">{getPricingTypeText(category.pricingMethod.type)}</span>
                  </div>

                  {/* Commission Rate */}
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-muted-foreground">কমিশন:</span>
                    <span className="font-medium text-green-600">{category.monetization.commissionRate}%</span>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {category.pricingMethod.hasDeposit && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          <Shield className="h-3 w-3 mr-1" />
                          জামানত
                        </Badge>
                      )}
                      {category.verificationRequired && (
                        <Badge variant="outline" className="text-xs bg-green-50">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          যাচাইকরণ
                        </Badge>
                      )}
                      {category.approvalRequired && (
                        <Badge variant="outline" className="text-xs bg-orange-50">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          অনুমোদন
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                  >
                    বুকিং করুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rentalCategories.map((category) => (
              <Card key={category.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.nameEn}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ভাড়ার ধরন:</span>
                    <span className="font-medium">{getPricingTypeText(category.pricingMethod.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>কমিশন রেট:</span>
                    <span className="font-medium text-green-600">{category.monetization.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>জামানত:</span>
                    <span className="font-medium">
                      {category.pricingMethod.hasDeposit ? '✓ প্রযোজ্য' : '✗ প্রযোজ্য নয়'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-xs font-medium mb-2">অতিরিক্ত ফি:</h4>
                  <div className="flex flex-wrap gap-1">
                    {category.monetization.additionalFees.map((fee) => (
                      <Badge key={fee} variant="outline" className="text-xs">
                        {fee}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentalCategories.map((category) => (
              <Card key={category.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.nameEn}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      বিশেষ সুবিধা:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {category.specialFeatures.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs bg-blue-50">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      ডেলিভারি অপশন:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {category.deliveryOptions.map((option) => (
                        <Badge key={option} variant="outline" className="text-xs bg-green-50">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">প্রয়োজনীয় ক্ষেত্র:</h4>
                    <p className="text-xs text-muted-foreground">
                      {category.bookingFields.length}টি ইনপুট ফিল্ড 
                      ({category.bookingFields.filter(f => f.required).length}টি বাধ্যতামূলক)
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    বিস্তারিত দেখুন
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RentalCategoriesShowcase;
