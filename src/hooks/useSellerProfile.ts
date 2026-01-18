
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
  const [hasApprovedApplication, setHasApprovedApplication] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchSellerProfile() {
      try {
        if (!isAuthenticated || !user || !user.id) {
          setProfile(null);
          setHasApprovedApplication(false);
          setError('অনুগ্রহ করে লগইন করুন');
          setIsLoading(false);
          return;
        }

        console.log('ব্যবহারকারীর আইডি লোড করছি:', user.id);
        
        // প্রথমে seller_profiles থেকে ডাটা আনি
        const { data: profileData, error: profileError } = await supabase
          .from('seller_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('সেলার প্রোফাইল লোড করতে সমস্যা:', profileError);
          setError(profileError.message);
          setProfile(null);
        } else {
          console.log('সেলার প্রোফাইল লোড হয়েছে:', profileData);
          setProfile(profileData);
          setError(null);
        }

        // এরপর seller_applications থেকে approved status চেক করি
        const { data: appData } = await supabase
          .from('seller_applications')
          .select('status')
          .eq('user_id', user.id)
          .maybeSingle();

        setHasApprovedApplication(appData?.status === 'approved');

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
      setHasApprovedApplication(false);
    }
  }, [isAuthenticated, user]);

  // seller হিসেবে গণ্য হবে যদি profile থাকে অথবা approved application থাকে
  const isSeller = !!profile || hasApprovedApplication;

  return { profile, isLoading, error, isSeller, hasApprovedApplication };
}

