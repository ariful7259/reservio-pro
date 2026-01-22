import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import type { DeliveryAddress } from '@/components/cart/DeliveryAddressForm';

export interface SavedDeliveryAddress {
  id: string;
  label: string;
  address: DeliveryAddress;
  createdAt: number;
  updatedAt: number;
}

interface UseSavedDeliveryAddressesReturn {
  savedAddresses: SavedDeliveryAddress[];
  defaultAddressId: string | null;
  getById: (id: string) => SavedDeliveryAddress | undefined;
  saveAddress: (label: string, address: DeliveryAddress, options?: { setDefault?: boolean }) => boolean;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const STORAGE_KEY = 'saved-delivery-addresses-v1';
const DEFAULT_KEY = 'saved-delivery-addresses-default-v1';

const deliveryAddressSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(20),
  address: z.string().trim().min(3).max(300),
  city: z.string().trim().min(1).max(50),
  area: z.string().trim().min(1).max(80),
  postalCode: z.string().trim().max(20).optional().or(z.literal('')),
});

export const useSavedDeliveryAddresses = (): UseSavedDeliveryAddressesReturn => {
  const { toast } = useToast();
  const [savedAddresses, setSavedAddresses] = useState<SavedDeliveryAddress[]>([]);
  const [defaultAddressId, setDefaultAddressIdState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedDefault = localStorage.getItem(DEFAULT_KEY);
    if (storedDefault) setDefaultAddressIdState(storedDefault);

    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setSavedAddresses(parsed);
      }
    } catch (e) {
      console.error('Failed to parse saved delivery addresses:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = useCallback((next: SavedDeliveryAddress[]) => {
    setSavedAddresses(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const getById = useCallback(
    (id: string) => savedAddresses.find((a) => a.id === id),
    [savedAddresses]
  );

  const setDefaultAddress = useCallback((id: string) => {
    setDefaultAddressIdState(id);
    localStorage.setItem(DEFAULT_KEY, id);
    toast({
      title: 'ডিফল্ট ঠিকানা সেট হয়েছে',
      description: 'পরবর্তীবার চেকআউট-এ এই ঠিকানাই অটো দেখাবে।',
    });
  }, [toast]);

  const saveAddress = useCallback(
    (label: string, address: DeliveryAddress, options?: { setDefault?: boolean }): boolean => {
      const parsed = deliveryAddressSchema.safeParse(address);
      if (!parsed.success) {
        toast({
          title: 'ঠিকানা অসম্পূর্ণ',
          description: 'সেভ করার আগে ঠিকানার বাধ্যতামূলক ফিল্ডগুলো পূরণ করুন।',
          variant: 'destructive',
        });
        return false;
      }

      const validatedAddress = parsed.data as unknown as DeliveryAddress;

      const cleanedLabel = (label || '').trim();
      if (!cleanedLabel) {
        toast({
          title: 'নাম দিন',
          description: 'ঠিকানাটির জন্য একটি নাম দিন (যেমন: বাসা/অফিস)।',
          variant: 'destructive',
        });
        return false;
      }

      const now = Date.now();
      const existingIndex = savedAddresses.findIndex(
        (a) => a.label.toLowerCase() === cleanedLabel.toLowerCase()
      );

      let next: SavedDeliveryAddress[];
      let id: string;
      if (existingIndex >= 0) {
        const existing = savedAddresses[existingIndex];
        id = existing.id;
        next = savedAddresses.map((a) =>
          a.id === existing.id
            ? { ...a, address: validatedAddress, updatedAt: now, label: cleanedLabel }
            : a
        );
      } else {
        id = now.toString();
        next = [
          ...savedAddresses,
          {
            id,
            label: cleanedLabel,
            address: validatedAddress,
            createdAt: now,
            updatedAt: now,
          },
        ];
      }

      persist(next);

      toast({
        title: 'ঠিকানা সেভ হয়েছে',
        description: `“${cleanedLabel}” ঠিকানা সংরক্ষণ করা হয়েছে।`,
      });

      if (options?.setDefault) {
        setDefaultAddress(id);
      }

      return true;
    },
    [persist, savedAddresses, setDefaultAddress, toast]
  );

  const removeAddress = useCallback(
    (id: string) => {
      const next = savedAddresses.filter((a) => a.id !== id);
      persist(next);
      if (defaultAddressId === id) {
        setDefaultAddressIdState(null);
        localStorage.removeItem(DEFAULT_KEY);
      }
      toast({
        title: 'ঠিকানা মুছে ফেলা হয়েছে',
        description: 'সেভড ঠিকানা সফলভাবে মুছে ফেলা হয়েছে।',
      });
    },
    [defaultAddressId, persist, savedAddresses, toast]
  );

  return useMemo(
    () => ({
      savedAddresses,
      defaultAddressId,
      getById,
      saveAddress,
      removeAddress,
      setDefaultAddress,
    }),
    [defaultAddressId, getById, removeAddress, saveAddress, savedAddresses, setDefaultAddress]
  );
};

export default useSavedDeliveryAddresses;
