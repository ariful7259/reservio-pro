
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ServiceHeaderProps {
  onAddService: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ onAddService }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">সার্ভিস ম্যানেজমেন্ট</h1>
        <p className="text-muted-foreground">আপনার সেবা যোগ করুন, সম্পাদনা করুন এবং ম্যানেজ করুন</p>
      </div>
      <Button onClick={onAddService} className="w-full md:w-auto transition-all hover:scale-105">
        <Plus className="h-4 w-4 mr-2" />
        নতুন সার্ভিস যোগ করুন
      </Button>
    </div>
  );
};

export default ServiceHeader;
