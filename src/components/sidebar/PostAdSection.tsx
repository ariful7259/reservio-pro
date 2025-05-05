
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PostAdSection = () => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium text-lg">বিজ্ঞাপন পোস্ট করুন</h3>
      <p className="text-sm text-gray-600">আপনার পণ্য, সেবা, বা প্রপার্টি বিজ্ঞাপন দিতে এখনই পোস্ট করুন</p>
      <Link to="/create-post">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          বিজ্ঞাপন পোস্ট করুন
        </Button>
      </Link>
    </div>
  );
};
