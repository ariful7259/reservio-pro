
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  Users,
  Eye,
  BarChart3,
  PieChart,
  AlertCircle
} from 'lucide-react';

interface BusinessInsightsProps {
  selectedBusinessType: string | null;
}

const BusinessInsights = ({ selectedBusinessType }: BusinessInsightsProps) => {
  const [timeRange, setTimeRange] = useState('this-month');

  const getInsightsData = () => {
    if (!selectedBusinessType) {
      return {
        title: 'সামগ্রিক ব্যবসার অবস্থা',
        metrics: [
          { label: 'মোট রেভিনিউ', value: '৳২৩,৪০০', change: 15.2, icon: DollarSign },
          { label: 'সক্রিয় গ্রাহক', value: '১,২৪৫', change: 8.7, icon: Users },
          { label: 'অর্ডার সংখ্যা', value: '৮৯', change: 12.3, icon: BarChart3 },
          { label: 'ভিউ সংখ্যা', value: '১২,৫৬৭', change: 23.1, icon: Eye }
        ],
        goals: [
          { label: 'মাসিক টার্গেট', current: 75, target: 100, unit: '%' },
          { label: 'গ্রাহক সন্তুষ্টি', current: 4.8, target: 5.0, unit: '/৫' },
          { label: 'রিটার্ন রেট', current: 2.1, target: 5.0, unit: '%', reverse: true }
        ]
      };
    }

    const businessData = {
      marketplace: {
        title: 'মার্কেটপ্লেস ব্যবসার অবস্থা',
        metrics: [
          { label: 'প্রোডাক্ট বিক্রয়', value: '৮,৫০০', change: 12.5, icon: DollarSign },
          { label: 'অর্ডার সংখ্যা', value: '৪২', change: 18.2, icon: BarChart3 },
          { label: 'স্টক অবস্থা', value: '৮৫%', change: -3.1, icon: Target },
          { label: 'রেটিং', value: '৪.৭', change: 2.1, icon: Users }
        ],
        goals: [
          { label: 'স্টক লেভেল', current: 85, target: 90, unit: '%' },
          { label: 'অর্ডার ফুলফিলমেন্ট', current: 92, target: 95, unit: '%' },
          { label: 'রিটার্ন রেট', current: 3.2, target: 5.0, unit: '%', reverse: true }
        ]
      },
      rental: {
        title: 'রেন্টাল ব্যবসার অবস্থা',
        metrics: [
          { label: 'রেন্টাল আয়', value: '৪,২০০', change: 8.3, icon: DollarSign },
          { label: 'বুকিং সংখ্যা', value: '১৮', change: 15.7, icon: Calendar },
          { label: 'অকুপেন্সি রেট', value: '৭৮%', change: 5.2, icon: Target },
          { label: 'রিপিট কাস্টমার', value: '৬৫%', change: 12.8, icon: Users }
        ],
        goals: [
          { label: 'অকুপেন্সি টার্গেট', current: 78, target: 85, unit: '%' },
          { label: 'কাস্টমার স্যাটিসফ্যাকশন', current: 4.6, target: 5.0, unit: '/৫' },
          { label: 'মেইনটেনেন্স কস্ট', current: 12, target: 15, unit: '%', reverse: true }
        ]
      },
      service: {
        title: 'সার্ভিস ব্যবসার অবস্থা',
        metrics: [
          { label: 'সার্ভিস আয়', value: '৬,৮০০', change: -2.1, icon: DollarSign },
          { label: 'কমপ্লিটেড জব', value: '৩৫', change: -5.3, icon: BarChart3 },
          { label: 'এভারেজ রেটিং', value: '৪.৯', change: 3.2, icon: Users },
          { label: 'রিবুক রেট', value: '৮৫%', change: 8.7, icon: Target }
        ],
        goals: [
          { label: 'সার্ভিস কোয়ালিটি', current: 4.9, target: 5.0, unit: '/৫' },
          { label: 'অন টাইম ডেলিভারি', current: 88, target: 95, unit: '%' },
          { label: 'কমপ্লেইন রেট', current: 2.8, target: 5.0, unit: '%', reverse: true }
        ]
      },
      content: {
        title: 'ডিজিটাল কন্টেন্ট ব্যবসার অবস্থা',
        metrics: [
          { label: 'কন্টেন্ট সেলস', value: '৩,৯০০', change: 18.7, icon: DollarSign },
          { label: 'ডাউনলোড সংখ্যা', value: '২৮৭', change: 25.4, icon: BarChart3 },
          { label: 'সাবস্ক্রাইবার', value: '১,৮৯৫', change: 32.1, icon: Users },
          { label: 'এনগেজমেন্ট রেট', value: '৬৮%', change: 14.2, icon: Eye }
        ],
        goals: [
          { label: 'কন্টেন্ট আপলোড', current: 12, target: 20, unit: 'পিস' },
          { label: 'ভিউয়ার রিটেনশন', current: 68, target: 75, unit: '%' },
          { label: 'রিফান্ড রেট', current: 1.2, target: 3.0, unit: '%', reverse: true }
        ]
      }
    };

    return businessData[selectedBusinessType as keyof typeof businessData] || businessData.marketplace;
  };

  const data = getInsightsData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-xl font-bold">{data.title}</h3>
        
        <div className="flex gap-2">
          <Button 
            variant={timeRange === 'this-week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('this-week')}
          >
            এই সপ্তাহ
          </Button>
          <Button 
            variant={timeRange === 'this-month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('this-month')}
          >
            এই মাস
          </Button>
          <Button 
            variant={timeRange === 'this-year' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('this-year')}
          >
            এই বছর
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-xl font-bold mt-1">৳{metric.value}</p>
                  <div className="flex items-center mt-2 text-sm">
                    {metric.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={metric.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <metric.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goals and Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            লক্ষ্য ও অগ্রগতি
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.goals.map((goal, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.label}</span>
                  <Badge variant={
                    goal.reverse 
                      ? (goal.current <= goal.target ? 'default' : 'destructive')
                      : (goal.current >= goal.target * 0.8 ? 'default' : 'secondary')
                  }>
                    {goal.current}{goal.unit}
                  </Badge>
                </div>
                
                <Progress 
                  value={goal.reverse 
                    ? Math.max(0, ((goal.target - goal.current) / goal.target) * 100)
                    : (goal.current / goal.target) * 100
                  } 
                  className="h-2" 
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>টার্গেট: {goal.target}{goal.unit}</span>
                  <span>
                    {goal.reverse 
                      ? (goal.current <= goal.target ? 'লক্ষ্য অর্জিত' : 'উন্নতি প্রয়োজন')
                      : (goal.current >= goal.target ? 'লক্ষ্য অর্জিত' : `${Math.round((goal.current / goal.target) * 100)}% সম্পন্ন`)
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertCircle className="h-5 w-5" />
            সুপারিশ ও পরামর্শ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {selectedBusinessType === 'marketplace' && (
              <>
                <p>• স্টক লেভেল ৯০% এর উপরে রাখার চেষ্টা করুন</p>
                <p>• নতুন প্রোডাক্ট ক্যাটাগরি যোগ করে বিক্রয় বৃদ্ধি করুন</p>
                <p>• গ্রাহক রিভিউ সংগ্রহে বেশি মনোযোগ দিন</p>
              </>
            )}
            {selectedBusinessType === 'rental' && (
              <>
                <p>• অফ-সিজনের জন্য স্পেশাল অফার চালু করুন</p>
                <p>• প্রপার্টির ছবি ও বর্ণনা আপডেট করুন</p>
                <p>• রিপিট কাস্টমারদের জন্য ডিসকাউন্ট সিস্টেম চালু করুন</p>
              </>
            )}
            {selectedBusinessType === 'service' && (
              <>
                <p>• সার্ভিস কোয়ালিটি উন্নতির জন্য ট্রেনিং নিন</p>
                <p>• নতুন সার্ভিস ক্যাটাগরি যোগ করুন</p>
                <p>• অন-টাইম ডেলিভারি নিশ্চিত করার জন্য সময় ব্যবস্থাপনা উন্নত করুন</p>
              </>
            )}
            {selectedBusinessType === 'content' && (
              <>
                <p>• নিয়মিত নতুন কন্টেন্ট আপলোড করুন</p>
                <p>• এনগেজমেন্ট বৃদ্ধির জন্য ইন্টারঅ্যাক্টিভ কন্টেন্ট তৈরি করুন</p>
                <p>• ট্রেন্ডিং টপিকের উপর কন্টেন্ট তৈরি করুন</p>
              </>
            )}
            {!selectedBusinessType && (
              <>
                <p>• সবচেয়ে লাভজনক ব্যবসার ধরনে বেশি মনোযোগ দিন</p>
                <p>• কম পারফর্ম করা ব্যবসার ক্ষেত্রে নতুন কৌশল প্রয়োগ করুন</p>
                <p>• ক্রস-সেলিং এর মাধ্যমে রেভিনিউ বৃদ্ধি করুন</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessInsights;
