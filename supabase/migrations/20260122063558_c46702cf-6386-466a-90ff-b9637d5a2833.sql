-- Atomic wallet debit to avoid race conditions / constraint failures
CREATE OR REPLACE FUNCTION public.process_wallet_debit(
  p_amount numeric,
  p_transaction_type text,
  p_description text,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_wallet_id uuid;
  v_balance numeric;
  v_tx_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Unauthorized' USING ERRCODE = '28000';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount' USING ERRCODE = '22023';
  END IF;

  -- Lock the wallet row for this user
  SELECT id, balance
    INTO v_wallet_id, v_balance
  FROM public.wallets
  WHERE user_id = auth.uid()
  FOR UPDATE;

  IF v_wallet_id IS NULL THEN
    -- create wallet if missing
    INSERT INTO public.wallets (user_id, balance, currency)
    VALUES (auth.uid(), 0, 'BDT')
    RETURNING id, balance INTO v_wallet_id, v_balance;
  END IF;

  IF v_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient balance' USING ERRCODE = 'P0001';
  END IF;

  -- Update balance (positive_balance constraint will enforce >=0)
  UPDATE public.wallets
  SET balance = balance - p_amount,
      updated_at = now()
  WHERE id = v_wallet_id;

  -- Insert transaction (positive_amount constraint requires >0)
  INSERT INTO public.wallet_transactions (
    wallet_id,
    amount,
    transaction_type,
    description,
    sender_id,
    status,
    payment_method,
    metadata
  )
  VALUES (
    v_wallet_id,
    p_amount,
    p_transaction_type,
    p_description,
    auth.uid(),
    'completed',
    'wallet',
    jsonb_build_object('direction','debit','debited_amount',p_amount) || COALESCE(p_metadata, '{}'::jsonb)
  )
  RETURNING id INTO v_tx_id;

  RETURN v_tx_id;
END;
$$;

-- Ensure authenticated users can execute
REVOKE ALL ON FUNCTION public.process_wallet_debit(numeric, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.process_wallet_debit(numeric, text, text, jsonb) TO authenticated;