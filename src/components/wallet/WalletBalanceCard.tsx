import React from 'react';
import { Wallet, Star, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletBalanceCardProps {
  balance: number;
  points?: number;
  balanceVisible: boolean;
  onToggleBalance: () => void;
  onPointsClick?: () => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  points = 0,
  balanceVisible,
  onToggleBalance,
  onPointsClick
}) => {
  return (
    <div className="bg-gradient-to-r from-primary to-purple-600 px-4 pb-6">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          {/* Balance Section */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ব্যালেন্স</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-foreground">
                  ৳ {balanceVisible ? balance.toLocaleString() : 'XXXX.XX'}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={onToggleBalance}
                >
                  {balanceVisible ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Animated Logo */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center animate-pulse">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">৳</span>
              </div>
            </div>
          </div>

          {/* Points Section */}
          <button 
            onClick={onPointsClick}
            className="flex items-center gap-2 hover:bg-accent rounded-lg p-2 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">পয়েন্টস</p>
              <p className="text-lg font-bold text-foreground">{points}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
