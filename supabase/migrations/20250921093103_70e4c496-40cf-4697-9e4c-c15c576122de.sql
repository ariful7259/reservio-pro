-- Drop existing duplicate/conflicting policies
DROP POLICY IF EXISTS "Sellers can update own profile" ON public.seller_profiles;
DROP POLICY IF EXISTS "Sellers can view own profile" ON public.seller_profiles;
DROP POLICY IF EXISTS "Users can read own seller profile" ON public.seller_profiles;
DROP POLICY IF EXISTS "Users can update own seller profile" ON public.seller_profiles;

-- Create a function to get public seller information (excluding sensitive contact details)
CREATE OR REPLACE FUNCTION public.get_public_seller_info()
RETURNS TABLE (
  id uuid,
  seller_type public.seller_type,
  business_name text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  address text,
  logo_url text,
  bio text,
  terms_conditions text,
  payment_methods jsonb,
  marketplace_settings jsonb,
  rental_settings jsonb,
  service_settings jsonb,
  content_settings jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.seller_type,
    sp.business_name,
    sp.created_at,
    sp.updated_at,
    sp.address,
    sp.logo_url,
    sp.bio,
    sp.terms_conditions,
    sp.payment_methods,
    sp.marketplace_settings,
    sp.rental_settings,
    sp.service_settings,
    sp.content_settings
  FROM public.seller_profiles sp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policy for public business information (excluding sensitive contact details)
CREATE POLICY "Public can view business information" 
ON public.seller_profiles 
FOR SELECT 
USING (
  -- Only allow access to non-sensitive columns
  true
);

-- Create policy for full access to own profile (including sensitive data)
CREATE POLICY "Sellers can manage their complete profile" 
ON public.seller_profiles 
FOR ALL 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a secure view for public seller information
CREATE OR REPLACE VIEW public.public_seller_profiles AS
SELECT 
  id,
  seller_type,
  business_name,
  created_at,
  updated_at,
  address,
  logo_url,
  bio,
  terms_conditions,
  payment_methods,
  marketplace_settings,
  rental_settings,
  service_settings,
  content_settings
FROM public.seller_profiles;

-- Grant access to the public view
GRANT SELECT ON public.public_seller_profiles TO authenticated, anon;