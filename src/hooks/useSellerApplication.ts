import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface SellerApplication {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  description: string | null;
  category: string | null;
  experience: string | null;
  documents: string[] | null;
  status: ApplicationStatus;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useSellerApplication() {
  const [application, setApplication] = useState<SellerApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchApplication = async () => {
    try {
      if (!isAuthenticated || !user || !user.id) {
        setApplication(null);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('seller_applications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('আবেদন লোড করতে সমস্যা:', error);
        setError(error.message);
        setApplication(null);
      } else {
        setApplication(data as SellerApplication | null);
        setError(null);
      }
    } catch (err) {
      console.error('আবেদন লোড করতে ব্যর্থ:', err);
      setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
      setApplication(null);
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (formData: {
    businessName: string;
    businessType: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    category: string;
    experience: string;
    documents?: string[];
  }) => {
    if (!user?.id) {
      throw new Error('ব্যবহারকারী লগইন করা নেই');
    }

    // Map business type to seller_type enum values
    const businessTypeMap: Record<string, string> = {
      'individual': 'marketplace',
      'company': 'marketplace',
      'partnership': 'marketplace'
    };

    const { data, error } = await supabase
      .from('seller_applications')
      .insert({
        user_id: user.id,
        business_name: formData.businessName,
        business_type: businessTypeMap[formData.businessType] || 'marketplace',
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        description: formData.description,
        category: formData.category,
        experience: formData.experience,
        documents: formData.documents || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    setApplication(data as SellerApplication);
    return data;
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchApplication();
    } else {
      setIsLoading(false);
      setApplication(null);
    }
  }, [isAuthenticated, user]);

  return { 
    application, 
    isLoading, 
    error, 
    submitApplication,
    refetch: fetchApplication,
    isPending: application?.status === 'pending',
    isApproved: application?.status === 'approved',
    isRejected: application?.status === 'rejected'
  };
}
