-- Fix security issue: Remove overly permissive system policy from seller_profiles table
-- This policy allows unrestricted access to sensitive contact information

-- Drop the incorrect "System can manage seller insights" policy from seller_profiles table
-- This policy was incorrectly named and overly permissive, allowing anyone to access all seller contact data
DROP POLICY IF EXISTS "System can manage seller insights" ON public.seller_profiles;

-- The seller_profiles table should only allow users to manage their own profiles
-- The existing user-specific policies are sufficient:
-- - "Allow users to read their own seller profile" 
-- - "Allow users to update their own seller profile"
-- - "Allow users to insert their own seller profile"
-- - "Allow users to delete their own seller profile"

-- No system-wide access should be granted to sensitive contact information
-- If system operations are needed, they should be done through specific service role functions