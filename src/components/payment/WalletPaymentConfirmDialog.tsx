import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';

interface WalletPaymentConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  currentBalance: number;
  description?: string;
  onConfirm: () => void;
  isProcessing?: boolean;
}

const WalletPaymentConfirmDialog: React.FC<WalletPaymentConfirmDialogProps> = ({
  open,
  onOpenChange,
  amount,
  currentBalance,
  description,
  onConfirm,
  isProcessing = false
}) => {
  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const remainingBalance = currentBalance - amount;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            ওয়ালেট পেমেন্ট নিশ্চিত করুন
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 pt-2">
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">পেমেন্ট পরিমাণ</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(amount)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>বর্তমান ব্যালেন্স: {formatPrice(currentBalance)}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>নতুন ব্যালেন্স: {formatPrice(remainingBalance)}</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                এই পেমেন্ট আপনার ওয়ালেট থেকে সরাসরি কেটে নেওয়া হবে।
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>বাতিল</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={isProcessing}
            className="bg-primary hover:bg-primary/90"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                প্রক্রিয়াকরণ...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                পে করুন {formatPrice(amount)}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WalletPaymentConfirmDialog;
