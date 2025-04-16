
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    async function fetchSellerProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
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
  }, []);

  return { profile, isLoading, error };
}
