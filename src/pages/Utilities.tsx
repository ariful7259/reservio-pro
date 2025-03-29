
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Utilities = () => {
  const utilities = [
    { name: 'গ্যাস বিল', icon: '🔥', color: 'bg-orange-100' },
    { name: 'বিদ্যুৎ বিল', icon: '⚡', color: 'bg-yellow-100' },
    { name: 'পানি বিল', icon: '💧', color: 'bg-blue-100' },
    { name: 'ইন্টারনেট বিল', icon: '🌐', color: 'bg-indigo-100' },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">ইউটিলিটিস</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {utilities.map((utility, index) => (
          <Card key={index} className="border hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className={`text-3xl h-16 w-16 rounded-full ${utility.color} flex items-center justify-center mb-3`}>
                {utility.icon}
              </div>
              <h3 className="font-medium text-center">{utility.name}</h3>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                পে করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Utilities;
