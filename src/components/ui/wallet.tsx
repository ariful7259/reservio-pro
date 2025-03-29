
import React from 'react';
import { Wallet as WalletIcon } from 'lucide-react';

// Create a proper component wrapper around the icon
const Wallet = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<typeof WalletIcon>
>((props, ref) => {
  return <WalletIcon ref={ref} {...props} />;
});

Wallet.displayName = "Wallet";

export { Wallet };
