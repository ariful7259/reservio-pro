
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface WalletCardProps {
  balance: number;
  lastTransaction?: {
    amount: number;
    type: 'credit' | 'debit';
    date: string;
  };
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, lastTransaction }) => {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <h3 className="font-semibold text-lg">আমার ওয়ালেট</h3>
          </div>
          <div className="text-xs opacity-80">VISA</div>
        </div>

        <div className="mb-6">
          <p className="text-sm opacity-90">ব্যালেন্স</p>
          <p className="text-3xl font-bold">৳{balance != null ? balance.toLocaleString() : '0'}</p>
        </div>

        {lastTransaction && (
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {lastTransaction.type === 'credit' ? (
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowDownLeft className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">
                    {lastTransaction.type === 'credit' ? 'পেমেন্ট পাওয়া' : 'পেমেন্ট করা'}
                  </p>
                  <p className="text-xs opacity-80">{lastTransaction.date}</p>
                </div>
              </div>
              <span className={`font-medium ${lastTransaction.type === 'credit' ? 'text-green-300' : 'text-red-300'}`}>
                {lastTransaction.type === 'credit' ? '+' : '-'}৳{lastTransaction.amount != null ? lastTransaction.amount : 0}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletCard;
