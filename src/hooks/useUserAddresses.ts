import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { DeliveryAddress } from '@/components/cart/DeliveryAddressForm';

export interface UserAddressRecord {
  id: string;
  label: string;
  address: DeliveryAddress;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseUserAddressesReturn {
  addresses: UserAddressRecord[];
  defaultAddressId: string | null;
  isLoading: boolean;
  reload: () => Promise<void>;
  createAddress: (label: string, address: DeliveryAddress, options?: { setDefault?: boolean }) => Promise<string | null>;
  updateAddress: (id: string, label: string, address: DeliveryAddress) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
  setDefaultAddress: (id: string) => Promise<boolean>;
  getById: (id: string) => UserAddressRecord | undefined;
}

const deliveryAddressSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(20),
  address: z.string().trim().min(3).max(300),
  city: z.string().trim().min(1).max(50),
  area: z.string().trim().min(1).max(80),
  postalCode: z.string().trim().max(20).optional().or(z.literal('')),
});

const toRecord = (row: any): UserAddressRecord => ({
  id: row.id,
  label: row.label,
  isDefault: !!row.is_default,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  address: {
    fullName: row.full_name || '',
    phone: row.phone || '',
    address: row.address || '',
    city: row.city || '',
    area: row.area || '',
    postalCode: row.postal_code || '',
  },
});

export const useUserAddresses = (): UseUserAddressesReturn => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [addresses, setAddresses] = useState<UserAddressRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!user?.id) {
      setAddresses([]);
      return;
    }

    setIsLoading(true);
    try {
      // NOTE: `user_addresses` isn't in generated types yet; keep runtime correct with a cast.
      const { data, error } = await (supabase as any)
        .from('user_addresses')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setAddresses((data || []).map(toRecord));
    } catch (e: any) {
      console.error('Failed to load user addresses:', e);
      toast({
        title: 'ঠিকানা লোড করা যায়নি',
        description: e?.message || 'দয়া করে আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, user?.id]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const defaultAddressId = useMemo(() => {
    const d = addresses.find((a) => a.isDefault);
    return d?.id ?? null;
  }, [addresses]);

  const getById = useCallback((id: string) => addresses.find((a) => a.id === id), [addresses]);

  const createAddress = useCallback(
    async (label: string, address: DeliveryAddress, options?: { setDefault?: boolean }) => {
      if (!user?.id) {
        toast({ title: 'লগইন করুন', description: 'ঠিকানা সেভ করতে লগইন করতে হবে।', variant: 'destructive' });
        return null;
      }

      const cleanedLabel = (label || '').trim();
      if (!cleanedLabel) {
        toast({ title: 'নাম দিন', description: 'ঠিকানাটির জন্য একটি নাম দিন (যেমন: Home/Office)।', variant: 'destructive' });
        return null;
      }

      const parsed = deliveryAddressSchema.safeParse(address);
      if (!parsed.success) {
        toast({ title: 'ঠিকানা অসম্পূর্ণ', description: 'সেভ করার আগে ঠিকানার বাধ্যতামূলক ফিল্ডগুলো পূরণ করুন।', variant: 'destructive' });
        return null;
      }

      try {
        const payload = {
          user_id: user.id,
          label: cleanedLabel,
          full_name: parsed.data.fullName,
          phone: parsed.data.phone,
          address: parsed.data.address,
          city: parsed.data.city,
          area: parsed.data.area,
          postal_code: parsed.data.postalCode || '',
          is_default: false,
        };

        const { data, error } = await (supabase as any)
          .from('user_addresses')
          .insert(payload)
          .select('id')
          .single();

        if (error) throw error;

        const newId = data?.id as string | undefined;
        await reload();

        toast({ title: 'ঠিকানা সেভ হয়েছে', description: `“${cleanedLabel}” ঠিকানা সংরক্ষণ করা হয়েছে।` });

        if (options?.setDefault && newId) {
          await (supabase as any).rpc('set_default_user_address', { p_address_id: newId });
          await reload();
        }

        return newId ?? null;
      } catch (e: any) {
        console.error('Failed to create address:', e);
        toast({ title: 'সেভ করা যায়নি', description: e?.message || 'দয়া করে আবার চেষ্টা করুন।', variant: 'destructive' });
        return null;
      }
    },
    [reload, toast, user?.id]
  );

  const updateAddress = useCallback(
    async (id: string, label: string, address: DeliveryAddress) => {
      if (!user?.id) return false;

      const cleanedLabel = (label || '').trim();
      if (!cleanedLabel) {
        toast({ title: 'নাম দিন', description: 'ঠিকানাটির জন্য একটি নাম দিন (যেমন: Home/Office)।', variant: 'destructive' });
        return false;
      }

      const parsed = deliveryAddressSchema.safeParse(address);
      if (!parsed.success) {
        toast({ title: 'ঠিকানা অসম্পূর্ণ', description: 'সেভ করার আগে ঠিকানার বাধ্যতামূলক ফিল্ডগুলো পূরণ করুন।', variant: 'destructive' });
        return false;
      }

      try {
        const { error } = await (supabase as any)
          .from('user_addresses')
          .update({
            label: cleanedLabel,
            full_name: parsed.data.fullName,
            phone: parsed.data.phone,
            address: parsed.data.address,
            city: parsed.data.city,
            area: parsed.data.area,
            postal_code: parsed.data.postalCode || '',
          })
          .eq('id', id);

        if (error) throw error;
        await reload();
        toast({ title: 'ঠিকানা আপডেট হয়েছে', description: `“${cleanedLabel}” ঠিকানা আপডেট করা হয়েছে।` });
        return true;
      } catch (e: any) {
        console.error('Failed to update address:', e);
        toast({ title: 'আপডেট করা যায়নি', description: e?.message || 'দয়া করে আবার চেষ্টা করুন।', variant: 'destructive' });
        return false;
      }
    },
    [reload, toast, user?.id]
  );

  const deleteAddress = useCallback(
    async (id: string) => {
      if (!user?.id) return false;
      try {
        const { error } = await (supabase as any).from('user_addresses').delete().eq('id', id);
        if (error) throw error;
        await reload();
        toast({ title: 'ঠিকানা মুছে ফেলা হয়েছে', description: 'সেভড ঠিকানা সফলভাবে মুছে ফেলা হয়েছে।' });
        return true;
      } catch (e: any) {
        console.error('Failed to delete address:', e);
        toast({ title: 'ডিলিট করা যায়নি', description: e?.message || 'দয়া করে আবার চেষ্টা করুন।', variant: 'destructive' });
        return false;
      }
    },
    [reload, toast, user?.id]
  );

  const setDefaultAddress = useCallback(
    async (id: string) => {
      if (!user?.id) return false;
      try {
        const { error } = await (supabase as any).rpc('set_default_user_address', { p_address_id: id });
        if (error) throw error;
        await reload();
        toast({ title: 'ডিফল্ট ঠিকানা সেট হয়েছে', description: 'পরবর্তীবার চেকআউট-এ এই ঠিকানাই অটো দেখাবে।' });
        return true;
      } catch (e: any) {
        console.error('Failed to set default address:', e);
        toast({ title: 'ডিফল্ট সেট করা যায়নি', description: e?.message || 'দয়া করে আবার চেষ্টা করুন।', variant: 'destructive' });
        return false;
      }
    },
    [reload, toast, user?.id]
  );

  return useMemo(
    () => ({
      addresses,
      defaultAddressId,
      isLoading,
      reload,
      createAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      getById,
    }),
    [addresses, createAddress, defaultAddressId, deleteAddress, getById, isLoading, reload, setDefaultAddress, updateAddress]
  );
};

export default useUserAddresses;
