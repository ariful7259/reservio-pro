
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type SellerType = 'marketplace' | 'rental' | 'service' | 'content';

export interface SellerProfile {
  id: string;
  seller_type: SellerType;
  business_name: string | null;
  created_at: string;
  updated_at: string;
}

export function useSellerProfile() {
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchSellerProfile() {
      try {
        if (!isAuthenticated || !user) {
          setError('User not authenticated');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('seller_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSellerProfile();
  }, [isAuthenticated, user]);

  return { profile, isLoading, error };
}
