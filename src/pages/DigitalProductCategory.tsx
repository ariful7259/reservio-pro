
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DigitalProductCategory = () => {
  const { category } = useParams();
  
  const getCategoryTitle = () => {
    switch(category) {
      case 'ebooks':
        return 'ইবুক';
      case 'templates':
        return 'টেমপ্লেট';
      case 'software':
        return 'সফটওয়্যার';
      case 'videos':
        return 'ভিডিও';
      case 'audio':
        return 'অডিও';
      case 'graphics':
        return 'গ্রাফিক্স';
      case 'courses':
        return 'কোর্স';
      default:
        return 'ডিজিটাল প্রোডাক্টস';
    }
  };

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{getCategoryTitle()}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* এখানে প্রোডাক্ট লিস্ট আসবে */}
        <Card className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
          <CardContent className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalProductCategory;
