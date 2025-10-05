-- Create wallet table for user balances
CREATE TABLE IF NOT EXISTS public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  balance numeric(10, 2) NOT NULL DEFAULT 0.00,
  currency text NOT NULL DEFAULT 'BDT',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT positive_balance CHECK (balance >= 0)
);

-- Enable RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own wallet
CREATE POLICY "Users can view their own wallet"
  ON public.wallets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallet"
  ON public.wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet"
  ON public.wallets FOR UPDATE
  USING (auth.uid() = user_id);

-- Create wallet transactions table
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('send', 'receive', 'add_money', 'withdraw')),
  amount numeric(10, 2) NOT NULL,
  description text,
  recipient_id uuid,
  sender_id uuid,
  payment_method text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Enable RLS
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view their own transactions"
  ON public.wallet_transactions FOR SELECT
  USING (
    wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
    OR recipient_id = auth.uid()
    OR sender_id = auth.uid()
  );

-- Users can insert transactions
CREATE POLICY "Users can create transactions"
  ON public.wallet_transactions FOR INSERT
  WITH CHECK (
    wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
  );

-- Create payment sources table
CREATE TABLE IF NOT EXISTS public.payment_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  source_type text NOT NULL CHECK (source_type IN ('bank', 'mobile_banking', 'card', 'cash')),
  provider_name text NOT NULL,
  account_number text,
  account_holder_name text,
  is_default boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_sources ENABLE ROW LEVEL SECURITY;

-- Users can manage their own payment sources
CREATE POLICY "Users can manage their payment sources"
  ON public.payment_sources FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create QR payment requests table
CREATE TABLE IF NOT EXISTS public.qr_payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount numeric(10, 2) NOT NULL,
  description text,
  qr_code_data text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired', 'cancelled')),
  expires_at timestamp with time zone NOT NULL,
  completed_at timestamp with time zone,
  paid_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Enable RLS
ALTER TABLE public.qr_payment_requests ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own QR payment requests
CREATE POLICY "Users can manage their QR requests"
  ON public.qr_payment_requests FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Anyone can view active QR requests (for scanning)
CREATE POLICY "Anyone can view active QR requests"
  ON public.qr_payment_requests FOR SELECT
  USING (status = 'active' AND expires_at > now());

-- Create function to update wallet updated_at
CREATE OR REPLACE FUNCTION update_wallet_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for wallet updates
CREATE TRIGGER update_wallet_timestamp
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_updated_at();

-- Create trigger for payment sources updates
CREATE TRIGGER update_payment_source_timestamp
  BEFORE UPDATE ON public.payment_sources
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_updated_at();