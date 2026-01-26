import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, 
  Share2, 
  Download, 
  Copy,
  User,
  Calendar,
  Hash
} from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

interface PaymentReceiptData {
  transactionId: string;
  amount: number;
  recipientName: string;
  recipientPhone?: string;
  description?: string;
  timestamp: Date;
  newBalance: number;
}

interface PaymentReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: PaymentReceiptData | null;
}

export const PaymentReceiptDialog: React.FC<PaymentReceiptDialogProps> = ({
  open,
  onOpenChange,
  receiptData
}) => {
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!receiptData) return null;

  const formattedDate = format(receiptData.timestamp, 'dd MMMM yyyy, hh:mm a', { locale: bn });
  const shortTxId = receiptData.transactionId.slice(0, 8).toUpperCase();

  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(receiptData.transactionId);
      toast({
        title: 'কপি হয়েছে!',
        description: 'ট্রানজেকশন আইডি কপি হয়েছে'
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'কপি করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    }
  };

  const shareReceipt = async () => {
    const shareText = `✅ পেমেন্ট সফল!
    
💰 পরিমাণ: ৳${receiptData.amount.toLocaleString()}
👤 প্রাপক: ${receiptData.recipientName}
📝 বিবরণ: ${receiptData.description || 'N/A'}
🔖 ট্রানজেকশন: #${shortTxId}
📅 তারিখ: ${formattedDate}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'পেমেন্ট রিসিপ্ট',
          text: shareText
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText);
          toast({
            title: 'কপি হয়েছে!',
            description: 'রিসিপ্ট তথ্য ক্লিপবোর্ডে কপি হয়েছে'
          });
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: 'কপি হয়েছে!',
        description: 'রিসিপ্ট তথ্য ক্লিপবোর্ডে কপি হয়েছে'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center sr-only">পেমেন্ট রিসিপ্ট</DialogTitle>
        </DialogHeader>

        <div ref={receiptRef} className="space-y-4">
          {/* Success Header */}
          <div className="text-center pt-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-600">পেমেন্ট সফল!</h3>
            <p className="text-3xl font-bold mt-2">৳{receiptData.amount.toLocaleString()}</p>
          </div>

          {/* Receipt Details */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            {/* Recipient */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">প্রাপক</p>
                <p className="font-medium">{receiptData.recipientName}</p>
                {receiptData.recipientPhone && (
                  <p className="text-xs text-muted-foreground">{receiptData.recipientPhone}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {receiptData.description && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground">বিবরণ</p>
                <p className="text-sm">{receiptData.description}</p>
              </div>
            )}

            {/* Transaction ID */}
            <div className="pt-2 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">ট্রানজেকশন আইডি</p>
                  <p className="text-sm font-mono">#{shortTxId}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyTransactionId}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Date */}
            <div className="pt-2 border-t border-border/50 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">তারিখ ও সময়</p>
                <p className="text-sm">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* New Balance */}
          <div className="bg-primary/5 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">বর্তমান ব্যালেন্স</p>
            <p className="text-lg font-bold text-primary">৳{receiptData.newBalance.toLocaleString()}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              onClick={shareReceipt}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              শেয়ার করুন
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="gap-2"
            >
              সম্পন্ন
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceiptDialog;
