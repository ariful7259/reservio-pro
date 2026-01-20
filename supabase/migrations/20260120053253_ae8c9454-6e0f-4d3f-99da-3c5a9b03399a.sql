-- Add is_verified column to seller_profiles table
ALTER TABLE public.seller_profiles 
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;

-- Add verified_at column to track when seller was verified
ALTER TABLE public.seller_profiles 
ADD COLUMN IF NOT EXISTS verified_at timestamp with time zone;

-- Add verified_by column to track who verified the seller
ALTER TABLE public.seller_profiles 
ADD COLUMN IF NOT EXISTS verified_by uuid;

-- Create index for verified sellers
CREATE INDEX IF NOT EXISTS idx_seller_profiles_is_verified ON public.seller_profiles(is_verified);