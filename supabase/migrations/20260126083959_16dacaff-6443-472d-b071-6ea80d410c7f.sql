-- Create send_payment_requests table for storing payment links
CREATE TABLE public.send_payment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  description TEXT,
  qr_code_data TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'claimed', 'expired', 'cancelled')),
  claimed_by UUID,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.send_payment_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can create their own send requests
CREATE POLICY "Users can create send payment requests"
ON public.send_payment_requests
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Policy: Users can view their own send requests
CREATE POLICY "Users can view own send requests"
ON public.send_payment_requests
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = claimed_by);

-- Policy: Anyone can view active requests for claiming
CREATE POLICY "Anyone can view active requests"
ON public.send_payment_requests
FOR SELECT
USING (status = 'active' AND expires_at > now());

-- Policy: Users can update their own requests (cancel)
CREATE POLICY "Users can update own requests"
ON public.send_payment_requests
FOR UPDATE
USING (auth.uid() = sender_id);

-- Policy: Authenticated users can claim requests
CREATE POLICY "Users can claim active requests"
ON public.send_payment_requests
FOR UPDATE
USING (status = 'active' AND expires_at > now() AND auth.uid() IS NOT NULL)
WITH CHECK (claimed_by = auth.uid());

-- Create index for faster lookups
CREATE INDEX idx_send_payment_requests_sender ON public.send_payment_requests(sender_id);
CREATE INDEX idx_send_payment_requests_status ON public.send_payment_requests(status);
CREATE INDEX idx_send_payment_requests_expires ON public.send_payment_requests(expires_at);