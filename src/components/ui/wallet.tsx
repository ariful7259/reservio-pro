
import React from 'react';
import { Wallet as WalletIcon } from 'lucide-react';

const Wallet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <WalletIcon {...props} ref={ref} />
  );
});

Wallet.displayName = "Wallet";

export { Wallet };
