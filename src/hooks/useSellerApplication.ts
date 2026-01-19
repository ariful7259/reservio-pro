import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

interface ProductSample {
  name: string;
  description: string;
  image?: string;
}

interface Reference {
  name: string;
  phone: string;
  relationship: string;
}

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
  // New fields
  nid_number: string | null;
  nid_type: string | null;
  nid_front_image: string | null;
  nid_back_image: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_account_holder: string | null;
  bank_branch: string | null;
  mobile_banking_provider: string | null;
  mobile_banking_number: string | null;
  trade_license_number: string | null;
  trade_license_image: string | null;
  trade_license_expiry: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  whatsapp_number: string | null;
  website_url: string | null;
  product_samples: unknown;
  seller_references: unknown;
  video_introduction_url: string | null;
}

export interface SubmitApplicationData {
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  category: string;
  experience: string;
  documents?: string[];
  // New fields
  nidType?: string;
  nidNumber?: string;
  nidFrontImage?: string;
  nidBackImage?: string;
  tradeLicenseNumber?: string;
  tradeLicenseImage?: string;
  tradeLicenseExpiry?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  bankBranch?: string;
  mobileBankingProvider?: string;
  mobileBankingNumber?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  references?: Reference[];
  productSamples?: ProductSample[];
  videoIntroductionUrl?: string;
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

  const submitApplication = async (formData: SubmitApplicationData) => {
    if (!user?.id) {
      throw new Error('ব্যবহারকারী লগইন করা নেই');
    }

    // Map business type to seller_type enum values
    const businessTypeMap: Record<string, string> = {
      'individual': 'marketplace',
      'company': 'marketplace',
      'partnership': 'marketplace'
    };

    const insertData = {
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
      status: 'pending' as const,
      // New fields - cast as any since types haven't regenerated yet
      nid_type: formData.nidType || null,
      nid_number: formData.nidNumber || null,
      nid_front_image: formData.nidFrontImage || null,
      nid_back_image: formData.nidBackImage || null,
      trade_license_number: formData.tradeLicenseNumber || null,
      trade_license_image: formData.tradeLicenseImage || null,
      trade_license_expiry: formData.tradeLicenseExpiry || null,
      bank_name: formData.bankName || null,
      bank_account_number: formData.bankAccountNumber || null,
      bank_account_holder: formData.bankAccountHolder || null,
      bank_branch: formData.bankBranch || null,
      mobile_banking_provider: formData.mobileBankingProvider || null,
      mobile_banking_number: formData.mobileBankingNumber || null,
      facebook_url: formData.facebookUrl || null,
      instagram_url: formData.instagramUrl || null,
      whatsapp_number: formData.whatsappNumber || null,
      website_url: formData.websiteUrl || null,
      product_samples: formData.productSamples || [],
      seller_references: formData.references || [],
      video_introduction_url: formData.videoIntroductionUrl || null
    };

    const { data, error } = await supabase
      .from('seller_applications')
      .insert(insertData as any)
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
