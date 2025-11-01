-- Fix the security definer view by setting security_invoker=on
-- First, we need to recreate the view with security_invoker
ALTER VIEW public.public_seller_profiles SET (security_invoker = on);