-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for product images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create reseller_orders table for tracking reseller orders with margin
CREATE TABLE IF NOT EXISTS public.reseller_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  order_data JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  margin_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  final_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  balance_updated BOOLEAN DEFAULT FALSE,
  balance_update_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reseller_orders
ALTER TABLE public.reseller_orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for reseller_orders
CREATE POLICY "Users can view their own reseller orders"
ON public.reseller_orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reseller orders"
ON public.reseller_orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reseller orders"
ON public.reseller_orders FOR UPDATE
USING (auth.uid() = user_id);

-- Add reseller field to profiles table if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_reseller BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reseller_balance NUMERIC DEFAULT 0;