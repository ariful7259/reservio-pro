
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ShoppingBag, 
  MessageSquare, 
  UserPlus, 
  Star, 
  Clock,
  DollarSign
} from 'lucide-react';

// মক অ্যাকটিভিটি ডেটা
const activities = [
  {
    id: 1,
    type: 'order',
    icon: <ShoppingBag className="h-4 w-4" />,
    text: 'সাবিনা খাতুন একটি "প্রিমিয়াম টেমপ্লেট" অর্ডার করেছেন',
    time: '১০ মিনিট আগে',
    highlight: true
  },
  {
    id: 2,
    type: 'message',
    icon: <MessageSquare className="h-4 w-4" />,
    text: 'রহিম আহমেদ আপনার প্রোডাক্ট সম্পর্কে জিজ্ঞাসা করেছেন',
    time: '৩০ মিনিট আগে',
    highlight: true
  },
  {
    id: 3,
    type: 'customer',
    icon: <UserPlus className="h-4 w-4" />,
    text: 'নতুন গ্রাহক নিবন্ধন: কামাল হোসেন',
    time: '১ ঘন্টা আগে',
    highlight: false
  },
  {
    id: 4,
    type: 'review',
    icon: <Star className="h-4 w-4" />,
    text: 'তানভীর আপনার সার্ভিসকে ৫ স্টার রেটিং দিয়েছেন',
    time: '২ ঘন্টা আগে',
    highlight: true
  },
  {
    id: 5,
    type: 'booking',
    icon: <Clock className="h-4 w-4" />,
    text: 'আপনার অ্যাপার্টমেন্টে আজ চেকইন রয়েছে',
    time: '৩ ঘন্টা আগে',
    highlight: false
  },
  {
    id: 6,
    type: 'payment',
    icon: <DollarSign className="h-4 w-4" />,
    text: '৳১২,৫০০ পেমেন্ট প্রসেস করা হয়েছে',
    time: '৫ ঘন্টা আগে',
    highlight: false
  },
  {
    id: 7,
    type: 'message',
    icon: <MessageSquare className="h-4 w-4" />,
    text: 'সাপোর্ট টিম থেকে নতুন মেসেজ এসেছে',
    time: '৬ ঘন্টা আগে',
    highlight: false
  },
  {
    id: 8,
    type: 'review',
    icon: <Star className="h-4 w-4" />,
    text: 'আপনার ডিজিটাল কোর্সে নতুন রিভিউ এসেছে',
    time: '৮ ঘন্টা আগে',
    highlight: false
  }
];

const ActivityFeed = () => {
  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-4 pr-3">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className={`p-3 border rounded-md ${
              activity.highlight ? 'bg-muted/50 border-primary/20' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center
                ${activity.type === 'order' ? 'bg-blue-100 text-blue-600' : ''}
                ${activity.type === 'message' ? 'bg-violet-100 text-violet-600' : ''}
                ${activity.type === 'customer' ? 'bg-green-100 text-green-600' : ''}
                ${activity.type === 'review' ? 'bg-amber-100 text-amber-600' : ''}
                ${activity.type === 'booking' ? 'bg-indigo-100 text-indigo-600' : ''}
                ${activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' : ''}
              `}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActivityFeed;
