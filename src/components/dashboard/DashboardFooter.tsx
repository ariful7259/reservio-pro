
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DashboardFooter: React.FC = () => {
  return (
    <div className="border-t border-slate-200 p-4">
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <MessageSquare className="h-4 w-4" />
          সাপোর্ট
        </Button>
      </div>
    </div>
  );
};
