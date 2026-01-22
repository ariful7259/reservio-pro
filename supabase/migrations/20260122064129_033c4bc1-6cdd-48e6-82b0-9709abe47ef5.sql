-- Expand allowed transaction_type values for wallet_transactions
ALTER TABLE public.wallet_transactions
  DROP CONSTRAINT IF EXISTS wallet_transactions_transaction_type_check;

ALTER TABLE public.wallet_transactions
  ADD CONSTRAINT wallet_transactions_transaction_type_check
  CHECK (
    transaction_type IN (
      'send',
      'receive',
      'add_money',
      'withdraw',
      'payment',
      'refund',
      'product_purchase',
      'service_booking',
      'rental_payment',
      'rental_deposit',
      'partial_payment',
      'order_refund'
    )
  );