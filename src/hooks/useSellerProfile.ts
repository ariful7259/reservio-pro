
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
  address: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  terms_conditions: string | null;
  logo_url: string | null;
  payment_methods: any | null;
  marketplace_settings: any | null;
  rental_settings: any | null;
  service_settings: any | null;
  content_settings: any | null;
}

export function useSellerProfile() {
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchSellerProfile() {
      try {
        if (!isAuthenticated || !user || !user.id) {
          setProfile(null);
          setError('অনুগ্রহ করে লগইন করুন');
          setIsLoading(false);
          return;
        }

        // ব্যবহারকারীর আইডি সঠিক ফরম্যাটে আছে কিনা তা পরীক্ষা করি
        console.log('ব্যবহারকারীর আইডি লোড করছি:', user.id);
        
        // মোটামুটি সিঙ্গেল রিটার্নের জন্য supabase থেকে প্রোফাইল ডাটা আনি
        const { data, error } = await supabase
          .from('seller_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('সেলার প্রোফাইল লোড করতে সমস্যা:', error);
          setError(error.message);
          setProfile(null);
        } else {
          console.log('সেলার প্রোফাইল লোড হয়েছে:', data);
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error('সেলার প্রোফাইল লোড করতে ব্যর্থ:', err);
        setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
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
