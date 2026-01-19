-- Create reseller referrals table
CREATE TABLE public.reseller_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id),
  referred_id UUID NOT NULL REFERENCES auth.users(id) UNIQUE,
  bonus_amount NUMERIC DEFAULT 0,
  bonus_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Add referral_code to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES auth.users(id);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := UPPER(SUBSTRING(MD5(NEW.id::text || random()::text) FROM 1 FOR 8));
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-generate referral code
DROP TRIGGER IF EXISTS generate_referral_code_trigger ON public.profiles;
CREATE TRIGGER generate_referral_code_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (NEW.referral_code IS NULL AND NEW.is_reseller = true)
  EXECUTE FUNCTION public.generate_referral_code();

-- Enable RLS
ALTER TABLE public.reseller_referrals ENABLE ROW LEVEL SECURITY;

-- RLS policies for reseller_referrals
CREATE POLICY "Users can view their own referrals"
  ON public.reseller_referrals
  FOR SELECT
  USING (referrer_id = auth.uid());

CREATE POLICY "Admins can view all referrals"
  ON public.reseller_referrals
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert referrals"
  ON public.reseller_referrals
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update referrals"
  ON public.reseller_referrals
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create function to process referral bonus
CREATE OR REPLACE FUNCTION public.process_referral_bonus(
  p_referrer_id UUID,
  p_referred_id UUID,
  p_bonus_amount NUMERIC DEFAULT 100
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert referral record
  INSERT INTO public.reseller_referrals (referrer_id, referred_id, bonus_amount)
  VALUES (p_referrer_id, p_referred_id, p_bonus_amount)
  ON CONFLICT (referred_id) DO NOTHING;
  
  RETURN TRUE;
END;
$$;