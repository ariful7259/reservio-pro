
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefundRequest } from './types';
import { renderStatusIcon, renderStatusBadge } from './refundUtils';

interface RefundRequestsProps {
  refundRequests: RefundRequest[];
  setOpenRefundDetails: (id: string | null) => void;
  setConfirmationDialog: (id: string | null) => void;
}

const RefundRequests: React.FC<RefundRequestsProps> = ({
  refundRequests,
  setOpenRefundDetails,
  setConfirmationDialog
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // ফিল্টার করা রিকোয়েস্ট
  const getFilteredRequests = () => {
    return refundRequests.filter(request => {
      if (statusFilter !== 'all' && request.status !== statusFilter) {
        return false;
      }
      
      if (categoryFilter !== 'all' && request.category !== categoryFilter) {
        return false;
      }
      
      if (searchQuery && !request.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !request.reason.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  return (
    <div className="space-y-6">
      {/* ফিল্টার অপশনস */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>রিফান্ড রিকোয়েস্ট ফিল্টার</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="আইডি, কাস্টমার বা বিবরণ সার্চ করুন" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="pending">অপেক্ষমান</SelectItem>
                <SelectItem value="approved">অনুমোদিত</SelectItem>
                <SelectItem value="processing">প্রসেসিং</SelectItem>
                <SelectItem value="completed">সম্পন্ন</SelectItem>
                <SelectItem value="rejected">বাতিল</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ক্যাটাগরি ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                <SelectItem value="marketplace">মার্কেটপ্লেস</SelectItem>
                <SelectItem value="service">সার্ভিস</SelectItem>
                <SelectItem value="rental">রেন্টাল</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* রিফান্ড রিকোয়েস্ট লিস্ট */}
      <div className="space-y-4">
        {getFilteredRequests().length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">কোন রিকোয়েস্ট পাওয়া যায়নি</h3>
              <p className="text-muted-foreground">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
            </CardContent>
          </Card>
        ) : (
          getFilteredRequests().map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex justify-between p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">{renderStatusIcon(request.status)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{request.reason}</h3>
                        {renderStatusBadge(request.status)}
                        {request.automatic && (
                          <Badge variant="outline" className="bg-purple-50">অটোমেটিক</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>আইডি: {request.id}</span>
                        <span>তারিখ: {request.requestDate}</span>
                        <span>
                          ক্যাটাগরি: {request.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                                     request.category === 'service' ? 'সার্ভিস' :
                                     request.category === 'rental' ? 'রেন্টাল' : ''}
                        </span>
                        <span>ট্রানজেকশন: {request.transactionId}</span>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <span className="text-lg font-semibold">৳{request.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setOpenRefundDetails(request.id)}
                    >
                      বিস্তারিত
                    </Button>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="px-4 pb-4 pt-0 flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => setConfirmationDialog(`reject-${request.id}`)}
                    >
                      বাতিল করুন
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => setConfirmationDialog(`approve-${request.id}`)}
                    >
                      অনুমোদন করুন
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RefundRequests;
