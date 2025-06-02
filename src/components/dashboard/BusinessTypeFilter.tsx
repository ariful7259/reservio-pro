
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingBag, 
  Building, 
  Wrench, 
  Pencil,
  TrendingUp,
  Users,
  Star,
  Eye,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessType {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  revenue: string;
  growth: number;
  status: 'active' | 'paused' | 'inactive';
}

interface BusinessTypeFilterProps {
  businessTypes: BusinessType[];
  activeType: string | null;
  onChange: (id: string | null) => void;
}

const BusinessTypeFilter = ({ 
  businessTypes, 
  activeType, 
  onChange 
}: BusinessTypeFilterProps) => {
  const { toast } = useToast();
  const [showAnalytics, setShowAnalytics] = useState(false);

  const enhancedBusinessTypes: BusinessType[] = [
    {
      id: 'marketplace',
      name: 'মার্কেটপ্লেস',
      icon: <ShoppingBag className="h-5 w-5" />,
      count: 15,
      revenue: '৳৮,৫০০',
      growth: 12.5,
      status: 'active'
    },
    {
      id: 'rental',
      name: 'রেন্টাল',
      icon: <Building className="h-5 w-5" />,
      count: 8,
      revenue: '৳৪,২০০',
      growth: 8.3,
      status: 'active'
    },
    {
      id: 'service',
      name: 'সার্ভিস',
      icon: <Wrench className="h-5 w-5" />,
      count: 22,
      revenue: '৳৬,৮০০',
      growth: -2.1,
      status: 'paused'
    },
    {
      id: 'content',
      name: 'ডিজিটাল কন্টেন্ট',
      icon: <Pencil className="h-5 w-5" />,
      count: 12,
      revenue: '৳৩,৯০০',
      growth: 18.7,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const handleQuickAction = (action: string, typeId: string) => {
    toast({
      title: "অ্যাকশন সম্পন্ন",
      description: `${action} সফলভাবে সম্পন্ন হয়েছে`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold">ব্যবসার ধরন</h3>
          <Badge variant="outline" className="ml-2">
            {enhancedBusinessTypes.filter(t => t.status === 'active').length} সক্রিয়
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={showAnalytics ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showAnalytics ? 'বিস্তারিত লুকান' : 'বিস্তারিত দেখুন'}
          </Button>
          
          <Button 
            variant={activeType === null ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(null)}
          >
            সকল ব্যবসা
          </Button>
        </div>
      </div>

      {/* Enhanced Business Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {enhancedBusinessTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => onChange(type.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {type.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{type.name}</p>
                    <Badge 
                      className={`${getStatusColor(type.status)} text-xs`}
                      variant="secondary"
                    >
                      {type.status === 'active' ? 'সক্রিয়' : 
                       type.status === 'paused' ? 'বিরতি' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction('সেটিংস', type.id);
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {showAnalytics && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">আইটেম:</span>
                    <span className="font-medium">{type.count}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">রেভিনিউ:</span>
                    <span className="font-medium">{type.revenue}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">গ্রোথ:</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`h-3 w-3 ${getGrowthColor(type.growth)}`} />
                      <span className={`font-medium ${getGrowthColor(type.growth)}`}>
                        {type.growth > 0 ? '+' : ''}{type.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!showAnalytics && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">{type.count} আইটেম</span>
                  <span className="text-sm font-medium">{type.revenue}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Panel */}
      {activeType && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h4 className="font-medium">
                  {enhancedBusinessTypes.find(t => t.id === activeType)?.name} এর জন্য দ্রুত অ্যাকশন
                </h4>
                <p className="text-sm text-gray-600">
                  এই ব্যবসার ধরনের জন্য বিশেষ কার্যক্রম
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleQuickAction('নতুন আইটেম যোগ', activeType)}
                >
                  নতুন যোগ করুন
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleQuickAction('বাল্ক এডিট', activeType)}
                >
                  বাল্ক এডিট
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleQuickAction('রিপোর্ট জেনারেট', activeType)}
                >
                  রিপোর্ট
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessTypeFilter;
