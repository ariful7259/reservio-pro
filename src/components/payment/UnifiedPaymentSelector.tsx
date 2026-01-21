import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  Building2, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import WalletBalanceIndicator from './WalletBalanceIndicator';
import WalletPaymentConfirmDialog from './WalletPaymentConfirmDialog';
import { useWalletPayment } from '@/hooks/useWalletPayment';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

interface UnifiedPaymentSelectorProps {
  amount: number;
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  onWalletPaymentConfirm?: () => void;
  onAddMoney?: () => void;
  showWalletOption?: boolean;
  allowPartialWallet?: boolean;
  title?: string;
  className?: string;
}

const paymentMethods: PaymentMethod[] = [
  { 
    id: 'wallet', 
    name: 'ওয়ালেট পেমেন্ট', 
    icon: <Wallet className="h-5 w-5" />,
    description: 'সরাসরি ওয়ালেট থেকে পে করুন'
  },
  { 
    id: 'bkash', 
    name: 'বিকাশ', 
    icon: <Smartphone className="h-5 w-5" />,
    description: 'বিকাশ মোবাইল ব্যাংকিং'
  },
  { 
    id: 'nagad', 
    name: 'নগদ', 
    icon: <Smartphone className="h-5 w-5" />,
    description: 'নগদ মোবাইল ব্যাংকিং'
  },
  { 
    id: 'rocket', 
    name: 'রকেট', 
    icon: <Smartphone className="h-5 w-5" />,
    description: 'ডাচ বাংলা রকেট'
  },
  { 
    id: 'bank', 
    name: 'ব্যাংক ট্রান্সফার', 
    icon: <Building2 className="h-5 w-5" />,
    description: 'সরাসরি ব্যাংক ট্রান্সফার'
  },
  { 
    id: 'cod', 
    name: 'ক্যাশ অন ডেলিভারি', 
    icon: <CreditCard className="h-5 w-5" />,
    description: 'পণ্য হাতে পেয়ে পে করুন'
  },
];

const UnifiedPaymentSelector: React.FC<UnifiedPaymentSelectorProps> = ({
  amount,
  selectedMethod,
  onMethodChange,
  onWalletPaymentConfirm,
  onAddMoney,
  showWalletOption = true,
  allowPartialWallet = false,
  title = 'পেমেন্ট মেথড নির্বাচন করুন',
  className
}) => {
  const { walletBalance, formatPrice } = useWalletPayment();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const hasEnoughBalance = walletBalance >= amount;
  const partialAmount = Math.min(walletBalance, amount);
  const remainingAmount = amount - partialAmount;

  const filteredMethods = paymentMethods.filter(method => {
    if (method.id === 'wallet' && !showWalletOption) return false;
    return true;
  });

  const handleMethodSelect = (methodId: string) => {
    onMethodChange(methodId);
    
    // If wallet selected and has full balance, show confirm dialog
    if (methodId === 'wallet' && hasEnoughBalance && onWalletPaymentConfirm) {
      setShowConfirmDialog(true);
    }
  };

  const handleWalletConfirm = async () => {
    setIsProcessing(true);
    if (onWalletPaymentConfirm) {
      await onWalletPaymentConfirm();
    }
    setIsProcessing(false);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Wallet Balance Indicator */}
          {showWalletOption && (
            <WalletBalanceIndicator
              balance={walletBalance}
              requiredAmount={amount}
              onAddMoney={onAddMoney}
            />
          )}

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredMethods.map(method => {
              const isSelected = selectedMethod === method.id;
              const isWallet = method.id === 'wallet';
              const isWalletDisabled = isWallet && !hasEnoughBalance && !allowPartialWallet;

              return (
                <Button
                  key={method.id}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "h-auto py-4 flex flex-col items-center gap-2 relative",
                    isWallet && hasEnoughBalance && "border-primary",
                    isWalletDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isWalletDisabled && handleMethodSelect(method.id)}
                  disabled={isWalletDisabled}
                >
                  {/* Recommended badge for wallet */}
                  {isWallet && hasEnoughBalance && (
                    <Badge 
                      className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-green-500"
                    >
                      প্রস্তাবিত
                    </Badge>
                  )}
                  
                  <div className={cn(
                    "p-2 rounded-full",
                    isSelected 
                      ? "bg-primary-foreground/20" 
                      : isWallet && hasEnoughBalance 
                        ? "bg-green-100 dark:bg-green-900/30" 
                        : "bg-muted"
                  )}>
                    {method.icon}
                  </div>
                  <span className="text-sm font-medium">{method.name}</span>
                  
                  {/* Show balance for wallet */}
                  {isWallet && (
                    <span className={cn(
                      "text-xs",
                      hasEnoughBalance ? "text-green-600" : "text-amber-600"
                    )}>
                      {formatPrice(walletBalance)}
                    </span>
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <CheckCircle2 className="absolute top-2 right-2 h-4 w-4" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Partial Payment Info */}
          {allowPartialWallet && selectedMethod === 'wallet' && !hasEnoughBalance && walletBalance > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                ওয়ালেট থেকে {formatPrice(partialAmount)} কাটা হবে। 
                বাকি {formatPrice(remainingAmount)} অন্য মেথডে পে করতে হবে।
              </p>
            </div>
          )}

          {/* Add Money Button */}
          {showWalletOption && !hasEnoughBalance && onAddMoney && (
            <Button 
              variant="outline" 
              className="w-full border-dashed"
              onClick={onAddMoney}
            >
              <Plus className="h-4 w-4 mr-2" />
              ওয়ালেটে টাকা যোগ করুন
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Wallet Payment Confirmation Dialog */}
      <WalletPaymentConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        amount={amount}
        currentBalance={walletBalance}
        description="এই অর্ডারের জন্য পেমেন্ট"
        onConfirm={handleWalletConfirm}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default UnifiedPaymentSelector;
