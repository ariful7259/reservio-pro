
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
          setProfile(null);
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
          console.error('Error fetching seller profile:', error);
          setError(error.message);
          setProfile(null);
        } else {
          console.log('Seller profile fetched:', data);
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error('Exception in fetch seller profile:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated && user) {
      fetchSellerProfile();
    } else {
      setIsLoading(false);
      setProfile(null);
    }
  }, [isAuthenticated, user]);

  return { profile, isLoading, error };
}
