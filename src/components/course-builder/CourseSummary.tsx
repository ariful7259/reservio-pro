
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Module {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
    type: string;
    duration: string;
    isComplete: boolean;
  }[];
}

interface CourseSummaryProps {
  modules: Module[];
}

export const CourseSummary: React.FC<CourseSummaryProps> = ({ modules }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>কোর্স সামারি</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">মডিউল সংখ্যা</p>
            <p className="text-2xl font-bold">{modules.length}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">লেসন সংখ্যা</p>
            <p className="text-2xl font-bold">
              {modules.reduce((acc, module) => acc + module.lessons.length, 0)}
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">মোট সময়</p>
            <p className="text-2xl font-bold">
              2:15:30
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
