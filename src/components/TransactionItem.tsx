
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Calendar, Home, Zap } from 'lucide-react';

interface TransactionItemProps {
  id: string;
  title: string;
  amount: number;
  type: 'credit' | 'debit';
  category: 'shopping' | 'appointment' | 'rent' | 'service';
  date: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  title,
  amount,
  type,
  category,
  date,
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'shopping':
        return <ShoppingBag className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'rent':
        return <Home className="h-4 w-4" />;
      case 'service':
        return <Zap className="h-4 w-4" />;
      default:
        return <ShoppingBag className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {type === 'credit' ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{title}</h4>
            <div className="bg-gray-100 text-gray-600 rounded-full p-1">
              {getCategoryIcon()}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <span className={`font-medium ${
        type === 'credit' ? 'text-green-600' : 'text-red-600'
      }`}>
        {type === 'credit' ? '+' : '-'}৳{amount.toLocaleString()}
      </span>
    </div>
  );
};

export default TransactionItem;
