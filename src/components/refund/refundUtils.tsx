
import React from 'react';
import { Clock, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RefundRequest } from './types';

// স্ট্যাটাস ব্যাজ রেন্ডার করা
export const renderStatusBadge = (status: RefundRequest['status']) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500">অপেক্ষমান</Badge>;
    case 'approved':
      return <Badge className="bg-blue-500">অনুমোদিত</Badge>;
    case 'processing':
      return <Badge className="bg-purple-500">প্রসেসিং</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">সম্পন্ন</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">বাতিল</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

// স্ট্যাটাস আইকন রেন্ডার করা
export const renderStatusIcon = (status: RefundRequest['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-8 w-8 text-yellow-500 bg-yellow-50 p-1.5 rounded-full" />;
    case 'approved':
      return <Check className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded-full" />;
    case 'processing':
      return <RefreshCw className="h-8 w-8 text-purple-500 bg-purple-50 p-1.5 rounded-full" />;
    case 'completed':
      return <Check className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full" />;
    case 'rejected':
      return <AlertTriangle className="h-8 w-8 text-red-500 bg-red-50 p-1.5 rounded-full" />;
    default:
      return null;
  }
};
