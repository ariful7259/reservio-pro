
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeatureSection from './features/FeatureSection';
import ResponsiveFeatureGrid from './features/ResponsiveFeatureGrid';
import {
  coreFeatures,
  ecommerceFeatures,
  paymentFeatures,
  marketingFeatures,
  analyticsFeatures,
  supportFeatures
} from './features/storeFeatureData';
import { CheckCircle2, Sparkles, Award } from 'lucide-react';

const StoreFeaturesList: React.FC = () => {
  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 px-4">
        <div className="flex justify-center mb-4">
          <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            সম্পূর্ণ বিনামূল্যে
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          আপনার স্বপ্নের অনলাইন স্টোর
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          প্রফেশনাল অনলাইন স্টোর তৈরি করুন মাত্র ১০ মিনিটে। কোনো টেকনিক্যাল জ্ঞান বা কোডিং দরকার নেই।
        </p>
      </div>

      {/* Core Features */}
      <FeatureSection
        title="মূল ফিচারসমূহ"
        description="আপনার অনলাইন ব্যবসার জন্য প্রয়োজনীয় সব ফিচার"
        features={coreFeatures}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />

      {/* E-commerce Features */}
      <FeatureSection
        title="ই-কমার্স সলিউশন"
        description="পণ্য বিক্রয় এবং ব্যবস্থাপনার জন্য সম্পূর্ণ সমাধান"
        features={ecommerceFeatures}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />

      {/* Payment Features */}
      <div className="space-y-8">
        <FeatureSection
          title="পেমেন্ট সিস্টেম"
          description="নিরাপদ এবং সহজ পেমেন্ট অপশন"
          features={paymentFeatures}
          columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        />
        
        {/* Payment Security Highlight */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  ১০০% নিরাপদ পেমেন্ট গ্যারান্টি
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  আন্তর্জাতিক মানের SSL সিকিউরিটি এবং PCI DSS কমপ্লায়েন্স নিশ্চিত করি।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Features */}
      <FeatureSection
        title="মার্কেটিং টুলস"
        description="আপনার পণ্য প্রচার এবং গ্রাহক আকর্ষণের জন্য"
        features={marketingFeatures}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />

      {/* Analytics Features */}
      <FeatureSection
        title="বিজনেস এনালিটিক্স"
        description="আপনার ব্যবসার পারফরমেন্স ট্র্যাক করুন"
        features={analyticsFeatures}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />

      {/* Support Features */}
      <FeatureSection
        title="সাপোর্ট এবং সেবা"
        description="আপনার সফলতার জন্য আমাদের পূর্ণ সহায়তা"
        features={supportFeatures}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />

      {/* Success Guarantee */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20">
        <CardContent className="p-6 md:p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Award className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            আপনার সফলতাই আমাদের লক্ষ্য
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            হাজারো সফল অনলাইন স্টোর তৈরি করেছি আমরা। আপনিও হতে পারেন পরবর্তী সাক্সেস স্টোরি।
            এখনই শুরু করুন বিনামূল্যে!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreFeaturesList;
