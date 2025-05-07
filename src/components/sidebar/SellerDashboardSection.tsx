
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Store } from 'lucide-react';
import { sellerDashboardMenuItems } from './menuData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const SellerDashboardSection = () => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Store className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">সেলার ড্যাশবোর্ড</h3>
          <p className="text-sm">সকল বিজনেস একসাথে পরিচালনা করুন</p>
        </div>
      </div>
      
      <div className="space-y-2 mt-2">
        {sellerDashboardMenuItems.slice(0, 4).map((item, index) => (
          <Link key={index} to={item.path} className="block">
            <div className="flex items-center justify-between p-2 hover:bg-white/50 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
      
      <Link to="/seller-dashboard">
        <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700" variant="default">
          সম্পূর্ণ ড্যাশবোর্ড দেখুন
        </Button>
      </Link>
    </div>
  );
};
