
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Building, 
  Wrench, 
  Pencil,
  Calendar,
  Clock,
  User,
  MapPin,
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface OrderBookingManagementProps {
  businessType?: string | null;
}

const OrderBookingManagement: React.FC<OrderBookingManagementProps> = ({ businessType }) => {
  // Different data based on business type
  const getBusinessData = () => {
    switch (businessType) {
      case 'marketplace':
        return {
          title: 'সাম্প্রতিক অর্ডার',
          items: [
            {
              id: 'ORD-001',
              type: 'প্রোডাক্ট অর্ডার',
              customer: 'রহিম আহমেদ',
              amount: '৳ ২,৫০০',
              status: 'প্রসেসিং',
              time: '২ ঘন্টা আগে',
              icon: <Package className="h-4 w-4" />,
              statusColor: 'bg-yellow-100 text-yellow-800'
            },
            {
              id: 'ORD-002',
              type: 'ইলেকট্রনিক্স',
              customer: 'নাদিয়া খান',
              amount: '৳ ৫,৮০০',
              status: 'ডেলিভারি',
              time: '৪ ঘন্টা আগে',
              icon: <Package className="h-4 w-4" />,
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 'ORD-003',
              type: 'ফ্যাশন',
              customer: 'করিম উদ্দিন',
              amount: '৳ ১,২০০',
              status: 'সম্পন্ন',
              time: '১ দিন আগে',
              icon: <CheckCircle className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'rental':
        return {
          title: 'সাম্প্রতিক বুকিং',
          items: [
            {
              id: 'RENT-001',
              type: 'বাসা ভাড়া',
              customer: 'তানিয়া আক্তার',
              amount: '৳ ১৫,০০০/মাস',
              status: 'নিশ্চিত',
              time: '১ ঘন্টা আগে',
              icon: <Building className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 'RENT-002',
              type: 'গাড়ি ভাড়া',
              customer: 'সাকিব হাসান',
              amount: '৳ ২,০০০/দিন',
              status: 'পেন্ডিং',
              time: '৩ ঘন্টা আগে',
              icon: <MapPin className="h-4 w-4" />,
              statusColor: 'bg-yellow-100 text-yellow-800'
            },
            {
              id: 'RENT-003',
              type: 'অফিস স্পেস',
              customer: 'মারিয়া রহমান',
              amount: '৳ ২৫,০০০/মাস',
              status: 'সম্পন্ন',
              time: '২ দিন আগে',
              icon: <CheckCircle className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'service':
        return {
          title: 'সাম্প্রতিক সার্ভিস বুকিং',
          items: [
            {
              id: 'SRV-001',
              type: 'হোম সার্ভিস',
              customer: 'ফাতেমা বেগম',
              amount: '৳ ৮০০',
              status: 'চলমান',
              time: '৩০ মিনিট আগে',
              icon: <Wrench className="h-4 w-4" />,
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 'SRV-002',
              type: 'রিপেয়ার সার্ভিস',
              customer: 'আলমগীর হোসেন',
              amount: '৳ ১,৫০০',
              status: 'নিশ্চিত',
              time: '১ ঘন্টা আগে',
              icon: <AlertCircle className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 'SRV-003',
              type: 'ক্লিনিং সার্ভিস',
              customer: 'রোকেয়া খাতুন',
              amount: '৳ ৬০০',
              status: 'সম্পন্ন',
              time: '৫ ঘন্টা আগে',
              icon: <CheckCircle className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'content':
        return {
          title: 'ডিজিটাল কন্টেন্ট অর্ডার',
          items: [
            {
              id: 'DIG-001',
              type: 'ই-বুক',
              customer: 'মোহাম্মদ আলী',
              amount: '৳ ৩০০',
              status: 'ডাউনলোড',
              time: '১৫ মিনিট আগে',
              icon: <Pencil className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 'DIG-002',
              type: 'অনলাইন কোর্স',
              customer: 'সুমাইয়া আক্তার',
              amount: '৳ ২,৫০০',
              status: 'এক্সেস দেওয়া',
              time: '২ ঘন্টা আগে',
              icon: <User className="h-4 w-4" />,
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 'DIG-003',
              type: 'গ্রাফিক ডিজাইন',
              customer: 'জামিল উদ্দিন',
              amount: '৳ ১,০০০',
              status: 'সম্পন্ন',
              time: '১ দিন আগে',
              icon: <CheckCircle className="h-4 w-4" />,
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      default:
        return {
          title: 'সাম্প্রতিক অর্ডার ও বুকিং',
          items: [
            {
              id: 'MIX-001',
              type: 'মিশ্র অর্ডার',
              customer: 'সাধারণ গ্রাহক',
              amount: '৳ ১,৫০০',
              status: 'প্রসেসিং',
              time: '১ ঘন্টা আগে',
              icon: <Package className="h-4 w-4" />,
              statusColor: 'bg-yellow-100 text-yellow-800'
            }
          ]
        };
    }
  };

  const businessData = getBusinessData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {businessType === 'marketplace' && <ShoppingBag className="h-5 w-5" />}
          {businessType === 'rental' && <Building className="h-5 w-5" />}
          {businessType === 'service' && <Wrench className="h-5 w-5" />}
          {businessType === 'content' && <Pencil className="h-5 w-5" />}
          {!businessType && <Package className="h-5 w-5" />}
          {businessData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {businessData.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{item.type}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {item.customer}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{item.amount}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={`text-xs ${item.statusColor}`}>
                  {item.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 inline mr-1" />
                {item.time}
              </p>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          সব {businessData.title.toLowerCase()} দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderBookingManagement;
