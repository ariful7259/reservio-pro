-- Fix security definer function to include search_path
CREATE OR REPLACE FUNCTION public.get_public_seller_info()
RETURNS TABLE(
  id uuid,
  seller_type seller_type,
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
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;