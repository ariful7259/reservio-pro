import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SendMoneyDialog } from '@/components/wallet/SendMoneyDialog';
import { ReceiveMoneyDialog } from '@/components/wallet/ReceiveMoneyDialog';
import { QRPaymentDialog } from '@/components/wallet/QRPaymentDialog';
import { AddMoneyDialog } from '@/components/wallet/AddMoneyDialog';
import { WalletQRScannerDialog } from '@/components/wallet/WalletQRScannerDialog';
import WalletHeader from '@/components/wallet/WalletHeader';
import WalletBalanceCard from '@/components/wallet/WalletBalanceCard';
import WalletQuickActions from '@/components/wallet/WalletQuickActions';
import WalletServiceCategories from '@/components/wallet/WalletServiceCategories';
import WalletBottomNav from '@/components/wallet/WalletBottomNav';

const Wallet = () => {
  const { toast } = useToast();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User');
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [addMoneyDialogOpen, setAddMoneyDialogOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<'home' | 'statement' | 'qr' | 'support' | 'more'>('home');

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'দয়া করে লগইন করুন',
          description: 'ওয়ালেট ব্যবহার করতে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }

      // Get or create wallet
      let { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (walletError && walletError.code === 'PGRST116') {
        const { data: newWallet, error: createError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id, balance: 0 })
          .select()
          .single();

        if (createError) throw createError;
        wallet = newWallet;
      } else if (walletError) {
        throw walletError;
      }

      setWalletBalance(wallet?.balance || 0);
    } catch (error: any) {
      console.error('Error loading wallet:', error);
      toast({
        title: 'ত্রুটি',
        description: 'ওয়ালেট ডেটা লোড করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service: string) => {
    toast({
      title: 'শীঘ্রই আসছে',
      description: `${service} সার্ভিস শীঘ্রই উপলব্ধ হবে`,
    });
  };

  const handleNavItemClick = (item: 'home' | 'statement' | 'qr' | 'support' | 'more') => {
    setActiveNavItem(item);
    if (item === 'qr') {
      setQrScannerOpen(true);
    } else if (item !== 'home') {
      toast({
        title: 'শীঘ্রই আসছে',
        description: 'এই ফিচার শীঘ্রই উপলব্ধ হবে',
      });
    }
  };

  const handleQrScanSuccess = (data: any) => {
    console.log('QR Scan Result:', data);
    if (data.type === 'payment_request') {
      // Handle payment request
      toast({
        title: 'পেমেন্ট রিকোয়েস্ট',
        description: `৳${data.amount} পেমেন্ট করতে চান?`
      });
    }
    setQrScannerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <WalletHeader
        userName={userName}
        onSearchClick={() => toast({ title: 'সার্চ', description: 'সার্চ ফিচার শীঘ্রই আসছে' })}
        onNotificationClick={() => toast({ title: 'নোটিফিকেশন', description: 'নোটিফিকেশন ফিচার শীঘ্রই আসছে' })}
        onQrClick={() => setQrDialogOpen(true)}
      />

      {/* Balance Card */}
      <WalletBalanceCard
        balance={walletBalance}
        points={250}
        balanceVisible={balanceVisible}
        onToggleBalance={() => setBalanceVisible(!balanceVisible)}
        onPointsClick={() => toast({ title: 'পয়েন্টস', description: 'লয়্যালটি পয়েন্টস ফিচার শীঘ্রই আসছে' })}
      />

      {/* Quick Actions */}
      <WalletQuickActions
        onLoadMoney={() => setAddMoneyDialogOpen(true)}
        onSendMoney={() => setSendDialogOpen(true)}
        onBankTransfer={() => toast({ title: 'ব্যাংক ট্রান্সফার', description: 'এই ফিচার শীঘ্রই আসছে' })}
        onRemittance={() => toast({ title: 'রেমিটেন্স', description: 'এই ফিচার শীঘ্রই আসছে' })}
      />

      {/* Service Categories */}
      <WalletServiceCategories onServiceClick={handleServiceClick} />

      {/* Bottom Navigation with Center QR Button */}
      <WalletBottomNav
        activeItem={activeNavItem}
        onItemClick={handleNavItemClick}
      />

      {/* Dialogs */}
      <SendMoneyDialog
        open={sendDialogOpen}
        onOpenChange={setSendDialogOpen}
        currentBalance={walletBalance}
        onSuccess={loadWalletData}
      />

      <ReceiveMoneyDialog
        open={receiveDialogOpen}
        onOpenChange={setReceiveDialogOpen}
      />

      <QRPaymentDialog
        open={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        currentBalance={walletBalance}
        onSuccess={loadWalletData}
      />

      <WalletQRScannerDialog
        open={qrScannerOpen}
        onOpenChange={setQrScannerOpen}
        onScanSuccess={handleQrScanSuccess}
      />

      <AddMoneyDialog
        open={addMoneyDialogOpen}
        onOpenChange={setAddMoneyDialogOpen}
        onSuccess={loadWalletData}
      />
    </div>
  );
};

export default Wallet;
