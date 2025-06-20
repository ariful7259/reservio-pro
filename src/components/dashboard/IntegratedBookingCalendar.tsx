
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  Building,
  Wrench,
  ShoppingBag,
  Pencil,
  Phone,
  CheckCircle
} from 'lucide-react';

interface IntegratedBookingCalendarProps {
  businessType?: string | null;
}

const IntegratedBookingCalendar: React.FC<IntegratedBookingCalendarProps> = ({ businessType }) => {
  // Different calendar data based on business type
  const getCalendarData = () => {
    switch (businessType) {
      case 'marketplace':
        return {
          title: 'ডেলিভারি শিডিউল',
          icon: <ShoppingBag className="h-5 w-5" />,
          events: [
            {
              id: 1,
              title: 'প্রোডাক্ট ডেলিভারি',
              time: '১০:০০ AM',
              date: 'আজ',
              location: 'ধানমন্ডি, ঢাকা',
              customer: 'রহিম আহমেদ',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 2,
              title: 'অর্ডার পিকআপ',
              time: '২:৩০ PM',
              date: 'আজ',
              location: 'গুলশান, ঢাকা',
              customer: 'নাদিয়া খান',
              status: 'পেন্ডিং',
              statusColor: 'bg-yellow-100 text-yellow-800'
            },
            {
              id: 3,
              title: 'রিটার্ন কালেকশন',
              time: '৪:০০ PM',
              date: 'কাল',
              location: 'বনানী, ঢাকা',
              customer: 'করিম উদ্দিন',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'rental':
        return {
          title: 'রেন্টাল বুকিং ক্যালেন্ডার',
          icon: <Building className="h-5 w-5" />,
          events: [
            {
              id: 1,
              title: 'বাসা ভিউইং',
              time: '১১:০০ AM',
              date: 'আজ',
              location: 'মিরপুর, ঢাকা',
              customer: 'তানিয়া আক্তার',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 2,
              title: 'গাড়ি ডেলিভারি',
              time: '৩:০০ PM',
              date: 'আজ',
              location: 'উত্তরা, ঢাকা',
              customer: 'সাকিব হাসান',
              status: 'প্রস্তুত',
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 3,
              title: 'অফিস ইন্সপেকশন',
              time: '১০:৩০ AM',
              date: 'কাল',
              location: 'মতিঝিল, ঢাকা',
              customer: 'মারিয়া রহমান',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'service':
        return {
          title: 'সার্ভিস অ্যাপয়েন্টমেন্ট',
          icon: <Wrench className="h-5 w-5" />,
          events: [
            {
              id: 1,
              title: 'হোম ক্লিনিং',
              time: '৯:০০ AM',
              date: 'আজ',
              location: 'বসুন্ধরা, ঢাকা',
              customer: 'ফাতেমা বেগম',
              status: 'চলমান',
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 2,
              title: 'AC রিপেয়ার',
              time: '২:০০ PM',
              date: 'আজ',
              location: 'ওয়ারী, ঢাকা',
              customer: 'আলমগীর হোসেন',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            },
            {
              id: 3,
              title: 'প্লাম্বিং সার্ভিস',
              time: '১১:০০ AM',
              date: 'কাল',
              location: 'রমনা, ঢাকা',
              customer: 'রোকেয়া খাতুন',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      case 'content':
        return {
          title: 'কন্টেন্ট শিডিউল',
          icon: <Pencil className="h-5 w-5" />,
          events: [
            {
              id: 1,
              title: 'ওয়েবিনার সেশন',
              time: '৮:০০ PM',
              date: 'আজ',
              location: 'অনলাইন',
              customer: 'মোহাম্মদ আলী',
              status: 'লাইভ',
              statusColor: 'bg-red-100 text-red-800'
            },
            {
              id: 2,
              title: 'কোর্স রেকর্ডিং',
              time: '১০:০০ AM',
              date: 'কাল',
              location: 'স্টুডিও',
              customer: 'সুমাইয়া আক্তার',
              status: 'প্রস্তুত',
              statusColor: 'bg-blue-100 text-blue-800'
            },
            {
              id: 3,
              title: 'ডিজাইন ডেলিভারি',
              time: '৪:৩০ PM',
              date: 'পরশু',
              location: 'ইমেইল',
              customer: 'জামিল উদ্দিন',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
      default:
        return {
          title: 'আজকের কার্যক্রম',
          icon: <Calendar className="h-5 w-5" />,
          events: [
            {
              id: 1,
              title: 'সাধারণ মিটিং',
              time: '২:০০ PM',
              date: 'আজ',
              location: 'অফিস',
              customer: 'সাধারণ গ্রাহক',
              status: 'নিশ্চিত',
              statusColor: 'bg-green-100 text-green-800'
            }
          ]
        };
    }
  };

  const calendarData = getCalendarData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {calendarData.icon}
          {calendarData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {calendarData.events.map((event) => (
          <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="text-xs text-muted-foreground">{event.date}</div>
              <div className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">{event.title}</h4>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {event.customer}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs mt-2 ${event.statusColor}`}>
                {event.status}
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          সম্পূর্ণ ক্যালেন্ডার দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegratedBookingCalendar;
