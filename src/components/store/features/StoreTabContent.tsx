
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Crown, Zap, ShoppingCart, CreditCard, Megaphone, Truck, BarChart3, Palette, Settings } from 'lucide-react';
import FeatureSection from './FeatureSection';
import {
  basicStoreFeatures,
  paymentFeatures,
  marketingFeatures,
  deliveryFeatures,
  analyticsFeatures,
  designFeatures,
  advancedFeatures
} from './featureData';

const StoreTabContent: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* ১. বেসিক স্টোর ফিচার */}
      <FeatureSection
        title="১. বেসিক স্টোর ফিচার"
        icon={<ShoppingCart className="h-4 w-4 text-blue-600" />}
        emoji="🛍️"
        features={basicStoreFeatures}
      />

      {/* ২. পেমেন্ট ও ফিন্যান্স */}
      <FeatureSection
        title="২. পেমেন্ট ও ফিন্যান্স"
        icon={<CreditCard className="h-4 w-4 text-green-600" />}
        emoji="💰"
        features={paymentFeatures}
      />

      {/* ৩. মার্কেটিং ও প্রমোশন */}
      <FeatureSection
        title="৩. মার্কেটিং ও প্রমোশন"
        icon={<Megaphone className="h-4 w-4 text-purple-600" />}
        emoji="📣"
        features={marketingFeatures}
      />

      {/* ৪. ডেলিভারি ও লজিস্টিক */}
      <FeatureSection
        title="৪. ডেলিভারি ও লজিস্টিক"
        icon={<Truck className="h-4 w-4 text-orange-600" />}
        emoji="🚚"
        features={deliveryFeatures}
      />

      {/* ৫. অ্যানালিটিক্স ও রিপোর্টিং */}
      <FeatureSection
        title="৫. অ্যানালিটিক্স ও রিপোর্টিং"
        icon={<BarChart3 className="h-4 w-4 text-indigo-600" />}
        emoji="📊"
        features={analyticsFeatures}
      />

      {/* ৬. ডিজাইন ও কাস্টমাইজেশন */}
      <FeatureSection
        title="৬. ডিজাইন ও কাস্টমাইজেশন"
        icon={<Palette className="h-4 w-4 text-pink-600" />}
        emoji="🎨"
        features={designFeatures}
      />

      {/* ৭. এডভান্সড ফিচার */}
      <FeatureSection
        title="৭. এডভান্সড ফিচার"
        icon={<Settings className="h-4 w-4 text-red-600" />}
        emoji="🚀"
        features={advancedFeatures}
      />
      
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-purple-100 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">🚀 সব ফিচার একসাথে পাবেন!</h3>
          <p className="text-muted-foreground text-sm mb-4">
            উপরের সকল ফিচার আপনার স্টোরে স্বয়ংক্রিয়ভাবে যুক্ত হবে। কোনো অতিরিক্ত সেটআপের প্রয়োজন নেই।
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">৮+</div>
              <div className="text-xs text-gray-600">ফিচার ক্যাটাগরি</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">২৮+</div>
              <div className="text-xs text-gray-600">মোট ফিচার</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">১৮+</div>
              <div className="text-xs text-gray-600">প্রিমিয়াম ফিচার</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">১০+</div>
              <div className="text-xs text-gray-600">ফ্রি ফিচার</div>
            </div>
          </div>
        </div>
        <Link to="/create-store/new">
          <Button size="lg" className="px-8 py-3 text-base bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600">
            <Zap className="h-5 w-5 mr-2" />
            এখনই আপনার স্টোর তৈরি করুন
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StoreTabContent;
