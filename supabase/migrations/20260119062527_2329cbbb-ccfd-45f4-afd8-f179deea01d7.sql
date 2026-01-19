-- Reseller settings table for admin controls
CREATE TABLE public.reseller_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  min_margin NUMERIC DEFAULT 0,
  max_margin NUMERIC DEFAULT 100,
  cod_enabled BOOLEAN DEFAULT true,
  payout_delay_days INTEGER DEFAULT 3,
  fraud_prevention_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.reseller_settings (min_margin, max_margin, cod_enabled, payout_delay_days, fraud_prevention_enabled)
VALUES (0, 100, true, 3, true);

-- RLS for reseller_settings
ALTER TABLE public.reseller_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reseller settings"
ON public.reseller_settings FOR SELECT
USING (true);

CREATE POLICY "Only admins can update reseller settings"
ON public.reseller_settings FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Reseller balance history table
CREATE TABLE public.reseller_balance_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'withdrawal', 'refund', 'blocked')),
  description TEXT,
  order_id UUID REFERENCES public.reseller_orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reseller_balance_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own balance history"
ON public.reseller_balance_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert balance history"
ON public.reseller_balance_history FOR INSERT
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Withdrawal requests table
CREATE TABLE public.withdrawal_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  account_details JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  admin_notes TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own withdrawal requests"
ON public.withdrawal_requests FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create own withdrawal requests"
ON public.withdrawal_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update withdrawal requests"
ON public.withdrawal_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Add columns to reseller_orders for admin management
ALTER TABLE public.reseller_orders ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.reseller_orders ADD COLUMN IF NOT EXISTS margin_blocked BOOLEAN DEFAULT false;

-- Admin policies for reseller_orders
CREATE POLICY "Admins can view all reseller orders"
ON public.reseller_orders FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reseller orders"
ON public.reseller_orders FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Function to update reseller balance
CREATE OR REPLACE FUNCTION public.update_reseller_balance(
  p_user_id UUID,
  p_amount NUMERIC,
  p_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_order_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update the profile balance
  IF p_type = 'credit' THEN
    UPDATE public.profiles SET reseller_balance = COALESCE(reseller_balance, 0) + p_amount WHERE id = p_user_id;
  ELSIF p_type IN ('debit', 'withdrawal', 'blocked') THEN
    UPDATE public.profiles SET reseller_balance = COALESCE(reseller_balance, 0) - p_amount WHERE id = p_user_id;
  ELSIF p_type = 'refund' THEN
    UPDATE public.profiles SET reseller_balance = COALESCE(reseller_balance, 0) + p_amount WHERE id = p_user_id;
  END IF;
  
  -- Insert balance history
  INSERT INTO public.reseller_balance_history (user_id, amount, type, description, order_id)
  VALUES (p_user_id, p_amount, p_type, p_description, p_order_id);
  
  RETURN TRUE;
END;
$$;