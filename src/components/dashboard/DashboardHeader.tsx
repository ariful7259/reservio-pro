
import React from 'react';
import { Store, Building, Wrench, Video } from 'lucide-react';

interface DashboardHeaderProps {
  type: 'marketplace' | 'rental' | 'service' | 'content';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ type }) => {
  return (
    <div className="border-b border-slate-200 p-4">
      <div className="flex items-center gap-2">
        {type === 'marketplace' && <Store className="h-6 w-6 text-primary" />}
        {type === 'rental' && <Building className="h-6 w-6 text-primary" />}
        {type === 'service' && <Wrench className="h-6 w-6 text-primary" />}
        {type === 'content' && <Video className="h-6 w-6 text-primary" />}
        <h2 className="text-lg font-medium">
          {type === 'marketplace' && 'মার্কেটপ্লেস ড্যাশবোর্ড'}
          {type === 'rental' && 'রেন্টাল ড্যাশবোর্ড'}
          {type === 'service' && 'সার্ভিস ড্যাশবোর্ড'}
          {type === 'content' && 'কন্টেন্ট ড্যাশবোর্ড'}
        </h2>
      </div>
    </div>
  );
};
