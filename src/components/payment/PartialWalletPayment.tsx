import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wallet, ArrowRight, Smartphone, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartialWalletPaymentProps {
  totalAmount: number;
  walletBalance: number;
  useWallet: boolean;
  onUseWalletChange: (use: boolean) => void;
  selectedOtherMethod: string;
  onOtherMethodChange: (method: string) => void;
  className?: string;
}

const otherMethods = [
  { id: 'bkash', name: 'বিকাশ', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'nagad', name: 'নগদ', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'rocket', name: 'রকেট', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'bank', name: 'ব্যাংক', icon: <Building2 className="h-4 w-4" /> },
];

const PartialWalletPayment: React.FC<PartialWalletPaymentProps> = ({
  totalAmount,
  walletBalance,
  useWallet,
  onUseWalletChange,
  selectedOtherMethod,
  onOtherMethodChange,
  className
}) => {
  const walletPortion = useWallet ? Math.min(walletBalance, totalAmount) : 0;
  const remainingAmount = totalAmount - walletPortion;

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          স্প্লিট পেমেন্ট
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Portion */}
        <div className={cn(
          "p-4 rounded-lg border-2 transition-colors",
          useWallet 
            ? "border-primary bg-primary/5" 
            : "border-muted"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox 
                id="use-wallet"
                checked={useWallet}
                onCheckedChange={(checked) => onUseWalletChange(checked as boolean)}
              />
              <Label htmlFor="use-wallet" className="flex items-center gap-2 cursor-pointer">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">ওয়ালেট থেকে</p>
                  <p className="text-xs text-muted-foreground">
                    ব্যালেন্স: {formatPrice(walletBalance)}
                  </p>
                </div>
              </Label>
            </div>
            {useWallet && (
              <span className="text-lg font-bold text-primary">
                -{formatPrice(walletPortion)}
              </span>
            )}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">মোট পরিমাণ</span>
            <span className="font-medium">{formatPrice(totalAmount)}</span>
          </div>
          {useWallet && walletPortion > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>ওয়ালেট থেকে</span>
              <span>-{formatPrice(walletPortion)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold pt-2 border-t">
            <span>বাকি পেমেন্ট</span>
            <span className="text-primary">{formatPrice(remainingAmount)}</span>
          </div>
        </div>

        {/* Other Payment Method Selection */}
        {remainingAmount > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              বাকি {formatPrice(remainingAmount)} পে করুন
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {otherMethods.map(method => (
                <Button
                  key={method.id}
                  variant={selectedOtherMethod === method.id ? "default" : "outline"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => onOtherMethodChange(method.id)}
                >
                  {method.icon}
                  <span className="text-xs">{method.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartialWalletPayment;
