import React from 'react';
import { Wallet, Send, Building2, BanknoteIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface WalletQuickActionsProps {
  onLoadMoney: () => void;
  onSendMoney: () => void;
  onBankTransfer: () => void;
  onPaymentRequest: () => void;
}

const WalletQuickActions: React.FC<WalletQuickActionsProps> = ({
  onLoadMoney,
  onSendMoney,
  onBankTransfer,
  onPaymentRequest
}) => {
  const actions: QuickAction[] = [
    {
      title: 'টাকা যোগ করুন',
      icon: <Wallet className="h-6 w-6" />,
      onClick: onLoadMoney
    },
    {
      title: 'টাকা পাঠান',
      icon: <Send className="h-6 w-6" />,
      onClick: onSendMoney
    },
    {
      title: 'ব্যাংক ট্রান্সফার',
      icon: <Building2 className="h-6 w-6" />,
      onClick: onBankTransfer
    },
    {
      title: 'পেমেন্ট নিন',
      icon: <BanknoteIcon className="h-6 w-6" />,
      onClick: onPaymentRequest
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-purple-600 px-4 pb-4">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="grid grid-cols-4 gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="h-12 w-12 rounded-xl border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary">
                {action.icon}
              </div>
              <span className="text-xs font-medium text-center text-foreground leading-tight">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletQuickActions;
