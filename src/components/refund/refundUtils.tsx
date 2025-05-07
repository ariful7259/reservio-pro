
import React from 'react';
import { CheckCircle, XCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const renderStatusIcon = (status: "pending" | "approved" | "rejected" | "processing" | "completed") => {
  switch (status) {
    case 'pending':
      return <Clock className="h-10 w-10 rounded-full p-2 bg-yellow-50 text-yellow-500" />;
    case 'approved':
      return <CheckCircle className="h-10 w-10 rounded-full p-2 bg-green-50 text-green-500" />;
    case 'rejected':
      return <XCircle className="h-10 w-10 rounded-full p-2 bg-red-50 text-red-500" />;
    case 'processing':
      return <RefreshCw className="h-10 w-10 rounded-full p-2 bg-blue-50 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-10 w-10 rounded-full p-2 bg-green-50 text-green-500" />;
    default:
      return <AlertCircle className="h-10 w-10 rounded-full p-2 bg-gray-50 text-gray-500" />;
  }
};

export const renderStatusBadge = (status: "pending" | "approved" | "rejected" | "processing" | "completed") => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">অপেক্ষমান</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">অনুমোদিত</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">বাতিল</Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">প্রসেসিং</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">সম্পন্ন</Badge>;
    default:
      return <Badge variant="outline">আনোন</Badge>;
  }
};
