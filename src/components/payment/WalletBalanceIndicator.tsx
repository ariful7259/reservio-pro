import React from 'react';
import { Wallet, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WalletBalanceIndicatorProps {
  balance: number;
  requiredAmount: number;
  onAddMoney?: () => void;
  compact?: boolean;
  className?: string;
}

const WalletBalanceIndicator: React.FC<WalletBalanceIndicatorProps> = ({
  balance,
  requiredAmount,
  onAddMoney,
  compact = false,
  className
}) => {
  const hasEnoughBalance = balance >= requiredAmount;
  const shortfall = Math.max(0, requiredAmount - balance);

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Wallet className="h-4 w-4 text-primary" />
        <span className="font-medium">{formatPrice(balance)}</span>
        {hasEnoughBalance ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-500" />
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      hasEnoughBalance 
        ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
        : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full",
            hasEnoughBalance 
              ? "bg-green-100 dark:bg-green-900/30" 
              : "bg-amber-100 dark:bg-amber-900/30"
          )}>
            <Wallet className={cn(
              "h-5 w-5",
              hasEnoughBalance ? "text-green-600" : "text-amber-600"
            )} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ওয়ালেট ব্যালেন্স</p>
            <p className="text-lg font-bold">{formatPrice(balance)}</p>
          </div>
        </div>
        
        <div className="text-right">
          {hasEnoughBalance ? (
            <Badge className="bg-green-500 hover:bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              পর্যাপ্ত
            </Badge>
          ) : (
            <div className="space-y-1">
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                <AlertCircle className="h-3 w-3 mr-1" />
                {formatPrice(shortfall)} আরো দরকার
              </Badge>
              {onAddMoney && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs"
                  onClick={onAddMoney}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  টাকা যোগ করুন
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceIndicator;
