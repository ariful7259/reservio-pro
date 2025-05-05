
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ReferralSystem = () => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gradient-to-r from-primary/10 to-purple-100 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg">রেফারেল সিস্টেম</h3>
          <p className="text-sm">বন্ধুদের আমন্ত্রণ জানিয়ে উপার্জন করুন</p>
        </div>
      </div>
      <Link to="/referral">
        <Button className="w-full gap-2" variant="outline">
          <Award className="h-4 w-4" />
          রেফারেল পেতে ক্লিক করুন
        </Button>
      </Link>
    </div>
  );
};
