-- Drop function with CASCADE to remove dependent triggers
DROP FUNCTION IF EXISTS public.update_wallet_updated_at() CASCADE;

-- Recreate function with proper security settings
CREATE OR REPLACE FUNCTION public.update_wallet_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER update_wallet_timestamp
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_wallet_updated_at();

CREATE TRIGGER update_payment_source_timestamp
  BEFORE UPDATE ON public.payment_sources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_wallet_updated_at();