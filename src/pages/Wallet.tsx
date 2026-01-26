import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SendMoneyDialog } from '@/components/wallet/SendMoneyDialog';
import { ReceiveMoneyDialog } from '@/components/wallet/ReceiveMoneyDialog';
import { QRPaymentDialog } from '@/components/wallet/QRPaymentDialog';
import { AddMoneyDialog } from '@/components/wallet/AddMoneyDialog';
import { WalletQRScannerDialog } from '@/components/wallet/WalletQRScannerDialog';
import { WalletStatement } from '@/components/wallet/WalletStatement';
import { QRPaymentConfirmDialog } from '@/components/wallet/QRPaymentConfirmDialog';
import { PaymentRequestDialog } from '@/components/wallet/PaymentRequestDialog';
import { ClaimPaymentDialog } from '@/components/wallet/ClaimPaymentDialog';
import WalletHeader from '@/components/wallet/WalletHeader';
import WalletBalanceCard from '@/components/wallet/WalletBalanceCard';
import WalletQuickActions from '@/components/wallet/WalletQuickActions';
import WalletServiceCategories from '@/components/wallet/WalletServiceCategories';
import WalletBottomNav from '@/components/wallet/WalletBottomNav';

interface QRPaymentData {
  type: string;
  amount?: number;
  user_id?: string;
  name?: string;
  phone?: string;
  description?: string;
  data?: string;
  request_id?: string;
  expires_at?: string;
  sender_id?: string;
  sender_name?: string;
}

const Wallet = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User');
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);
  const [paymentConfirmOpen, setPaymentConfirmOpen] = useState(false);
  const [paymentRequestOpen, setPaymentRequestOpen] = useState(false);
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);
  const [scannedPaymentData, setScannedPaymentData] = useState<QRPaymentData | null>(null);
  const [claimPaymentData, setClaimPaymentData] = useState<QRPaymentData | null>(null);
  const [addMoneyDialogOpen, setAddMoneyDialogOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<'home' | 'statement' | 'qr' | 'support' | 'more'>('home');

  // Handle payment link from URL parameter (pay = payment request, claim = send payment)
  useEffect(() => {
    const payParam = searchParams.get('pay');
    const claimParam = searchParams.get('claim');
    
    if (payParam) {
      try {
        const decodedData = atob(payParam);
        const paymentData = JSON.parse(decodedData) as QRPaymentData;
        
        if (paymentData.type === 'payment_request' && paymentData.amount && paymentData.user_id) {
          setScannedPaymentData(paymentData);
          setPaymentConfirmOpen(true);
          
          // Remove the pay parameter from URL after processing
          searchParams.delete('pay');
          setSearchParams(searchParams, { replace: true });
        }
      } catch (error) {
        console.error('Error parsing payment link:', error);
        toast({
          title: 'ত্রুটি',
          description: 'পেমেন্ট লিংক পার্স করতে সমস্যা হয়েছে',
          variant: 'destructive'
        });
      }
    }
    
    if (claimParam) {
      try {
        const decodedData = atob(claimParam);
        const claimData = JSON.parse(decodedData) as QRPaymentData;
        
        if (claimData.type === 'send_payment' && claimData.amount && claimData.sender_id) {
          setClaimPaymentData(claimData);
          setClaimDialogOpen(true);
          
          // Remove the claim parameter from URL after processing
          searchParams.delete('claim');
          setSearchParams(searchParams, { replace: true });
        }
      } catch (error) {
        console.error('Error parsing claim link:', error);
        toast({
          title: 'ত্রুটি',
          description: 'পেমেন্ট লিংক পার্স করতে সমস্যা হয়েছে',
          variant: 'destructive'
        });
      }
    }
  }, [searchParams, setSearchParams, toast]);

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
    } else if (item === 'statement') {
      setStatementOpen(true);
    } else if (item !== 'home') {
      toast({
        title: 'শীঘ্রই আসছে',
        description: 'এই ফিচার শীঘ্রই উপলব্ধ হবে',
      });
    }
  };

  const handleQrScanSuccess = (data: QRPaymentData) => {
    console.log('QR Scan Result:', data);
    
    // Check if it's a send payment (claim)
    if (data.type === 'send_payment' && data.sender_id) {
      setClaimPaymentData(data);
      setClaimDialogOpen(true);
    }
    // Check if it's a payment request or wallet receive QR
    else if (data.type === 'payment_request' || data.type === 'wallet_receive') {
      setScannedPaymentData(data);
      setPaymentConfirmOpen(true);
    } else if (data.type === 'text' && data.data) {
      // Plain text QR - show as toast
      toast({
        title: 'QR কোড স্ক্যান হয়েছে',
        description: data.data
      });
    } else {
      toast({
        title: 'QR ডেটা',
        description: JSON.stringify(data)
      });
    }
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
        onPaymentRequest={() => setPaymentRequestOpen(true)}
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
        onQrScanSuccess={handleQrScanSuccess}
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

      <WalletStatement
        open={statementOpen}
        onOpenChange={setStatementOpen}
      />

      <QRPaymentConfirmDialog
        open={paymentConfirmOpen}
        onOpenChange={setPaymentConfirmOpen}
        paymentData={scannedPaymentData}
        currentBalance={walletBalance}
        onSuccess={loadWalletData}
      />

      <AddMoneyDialog
        open={addMoneyDialogOpen}
        onOpenChange={setAddMoneyDialogOpen}
        onSuccess={loadWalletData}
      />

      <PaymentRequestDialog
        open={paymentRequestOpen}
        onOpenChange={setPaymentRequestOpen}
      />

      <ClaimPaymentDialog
        open={claimDialogOpen}
        onOpenChange={setClaimDialogOpen}
        claimData={claimPaymentData ? {
          type: claimPaymentData.type,
          request_id: claimPaymentData.request_id || '',
          sender_id: claimPaymentData.sender_id || '',
          sender_name: claimPaymentData.sender_name || 'Unknown',
          amount: claimPaymentData.amount || 0,
          description: claimPaymentData.description,
          expires_at: claimPaymentData.expires_at || ''
        } : null}
        onSuccess={loadWalletData}
      />
    </div>
  );
};

export default Wallet;
