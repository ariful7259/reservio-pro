
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RefundRequest, RefundSettings } from './types';

interface RefundDialogsProps {
  openRefundDetails: string | null;
  setOpenRefundDetails: (id: string | null) => void;
  settingsDialog: boolean;
  setSettingsDialog: (open: boolean) => void;
  confirmationDialog: string | null;
  setConfirmationDialog: (id: string | null) => void;
  refundRequests: RefundRequest[];
  refundSettings: RefundSettings;
  setRefundSettings: (settings: RefundSettings) => void;
  updateRefundStatus: (id: string, status: RefundRequest['status']) => void;
  renderStatusBadge: (status: RefundRequest['status']) => React.ReactNode;
  toast: any;
}

const RefundDialogs: React.FC<RefundDialogsProps> = ({
  openRefundDetails,
  setOpenRefundDetails,
  settingsDialog,
  setSettingsDialog,
  confirmationDialog,
  setConfirmationDialog,
  refundRequests,
  refundSettings,
  setRefundSettings,
  updateRefundStatus,
  renderStatusBadge,
  toast
}) => {
  // রিফান্ড রিকোয়েস্ট বিস্তারিত পাওয়া
  const getRefundDetails = (id: string) => {
    return refundRequests.find(request => request.id === id);
  };

  return (
    <>
      {/* সেটিংস ডায়ালগ */}
      <Dialog open={settingsDialog} onOpenChange={setSettingsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>রিফান্ড সেটিংস</DialogTitle>
            <DialogDescription>
              অটোমেটিক রিফান্ড সিস্টেম কনফিগার করুন
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="autoRefund">অটোমেটিক রিফান্ড</Label>
              <Switch
                id="autoRefund"
                checked={refundSettings.enableAutoRefund}
                onCheckedChange={(checked) => {
                  setRefundSettings({...refundSettings, enableAutoRefund: checked});
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="notifyRefund">রিফান্ড নোটিফিকেশন</Label>
              <Switch
                id="notifyRefund"
                checked={refundSettings.notifyOnRefund}
                onCheckedChange={(checked) => {
                  setRefundSettings({...refundSettings, notifyOnRefund: checked});
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="originalMethod">আসল পেমেন্ট মেথডে রিফান্ড</Label>
              <Switch
                id="originalMethod"
                checked={refundSettings.refundToOriginalMethod}
                onCheckedChange={(checked) => {
                  setRefundSettings({...refundSettings, refundToOriginalMethod: checked});
                }}
              />
            </div>
            
            <div>
              <Label htmlFor="autoRejectKeywords" className="mb-2 block">অটো-রিজেকশন কিওয়ার্ডস</Label>
              <Textarea 
                id="autoRejectKeywords"
                placeholder="কমা দিয়ে আলাদা করে কিওয়ার্ড লিখুন"
                value={refundSettings.autoRejectKeywords.join(', ')}
                onChange={(e) => {
                  setRefundSettings({
                    ...refundSettings, 
                    autoRejectKeywords: e.target.value.split(', ').map(keyword => keyword.trim())
                  });
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSettingsDialog(false)}
            >
              বাতিল
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "সেটিংস আপডেট হয়েছে",
                  description: "রিফান্ড সেটিংস সফলভাবে আপডেট করা হয়েছে"
                });
                setSettingsDialog(false);
              }}
            >
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* রিফান্ড বিস্তারিত ডায়ালগ */}
      {openRefundDetails && (
        <Dialog open={!!openRefundDetails} onOpenChange={() => setOpenRefundDetails(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {(() => {
              const refund = getRefundDetails(openRefundDetails);
              if (!refund) return null;
              
              return (
                <>
                  <DialogHeader>
                    <DialogTitle>রিফান্ড বিস্তারিত</DialogTitle>
                    <DialogDescription>
                      রিফান্ড রেফারেন্স: {refund.id}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{refund.reason}</h3>
                      {renderStatusBadge(refund.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">কাস্টমার</p>
                        <p className="font-medium">{refund.customerName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">সেলার</p>
                        <p className="font-medium">{refund.sellerName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">অর্ডার আইডি</p>
                        <p className="font-medium">{refund.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">রিফান্ড অ্যামাউন্ট</p>
                        <p className="font-medium">৳{refund.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">ক্যাটাগরি</p>
                        <p className="font-medium">
                          {refund.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                           refund.category === 'service' ? 'সার্ভিস' :
                           refund.category === 'rental' ? 'রেন্টাল' : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">রিকোয়েস্ট তারিখ</p>
                        <p className="font-medium">{refund.requestDate}</p>
                      </div>
                      {refund.responseDate && (
                        <div>
                          <p className="text-muted-foreground mb-1">প্রসেস তারিখ</p>
                          <p className="font-medium">{refund.responseDate}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground mb-1">প্রসেস টাইপ</p>
                        <p className="font-medium">
                          {refund.automatic ? 'অটোমেটিক প্রসেস' : 'ম্যানুয়াল প্রসেস'}
                        </p>
                      </div>
                    </div>
                    
                    {refund.status === 'pending' && (
                      <div className="flex justify-end gap-3 pt-3 border-t">
                        <Button 
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => {
                            updateRefundStatus(refund.id, 'rejected');
                            setOpenRefundDetails(null);
                          }}
                        >
                          বাতিল করুন
                        </Button>
                        <Button 
                          onClick={() => {
                            updateRefundStatus(refund.id, 'approved');
                            setOpenRefundDetails(null);
                          }}
                        >
                          অনুমোদন করুন
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      )}
      
      {/* কনফার্মেশন ডায়ালগ */}
      {confirmationDialog && (
        <Dialog open={!!confirmationDialog} onOpenChange={() => setConfirmationDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {confirmationDialog.startsWith('approve') ? 'রিফান্ড অনুমোদন নিশ্চিতকরণ' : 'রিফান্ড বাতিল নিশ্চিতকরণ'}
              </DialogTitle>
              <DialogDescription>
                {confirmationDialog.startsWith('approve') 
                  ? 'আপনি কি এই রিফান্ড রিকোয়েস্টটি অনুমোদন করতে চান?' 
                  : 'আপনি কি এই রিফান্ড রিকোয়েস্টটি বাতিল করতে চান?'}
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setConfirmationDialog(null)}
              >
                ক্যানসেল
              </Button>
              <Button 
                variant={confirmationDialog.startsWith('approve') ? 'default' : 'destructive'}
                onClick={() => {
                  const id = confirmationDialog.split('-')[1];
                  updateRefundStatus(id, confirmationDialog.startsWith('approve') ? 'approved' : 'rejected');
                }}
              >
                নিশ্চিত করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RefundDialogs;
