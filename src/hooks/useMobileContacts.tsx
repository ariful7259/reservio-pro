import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useContactManagement } from '@/hooks/useContactManagement';

interface MobileContact {
  name: string;
  phone: string;
  email?: string;
}

export const useMobileContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const { addBulkContacts } = useContactManagement();

  // Mock function to simulate accessing mobile contacts
  // In a real implementation, this would use a native plugin or Web Contacts API
  const getMobileContacts = async (): Promise<MobileContact[]> => {
    // This is a mock function that simulates fetching contacts
    // In a real app, you would use a Capacitor/Cordova plugin or the Web Contacts API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockContacts: MobileContact[] = [
          { name: 'রহিম আহমেদ', phone: '01712345678', email: 'rahim@example.com' },
          { name: 'করিম মিয়া', phone: '01812345678', email: 'karim@example.com' },
          { name: 'সাবিনা খাতুন', phone: '01912345678' },
          { name: 'ফারহানা জামান', phone: '01612345678', email: 'farhana@example.com' },
          { name: 'আরিফ হোসেন', phone: '+8801512345678' },
          { name: 'জাহিদ হাসান', phone: '018123456', email: 'zahid@example.com' }, // Invalid number
          { name: 'নাজমুল হক', phone: '01712345678' }, // Duplicate
          { name: 'সালমা বেগম', phone: '0171234567', email: 'salma@example.com' }, // Invalid
          { name: 'মাহফুজা আক্তার', phone: '01312345678' },
          { name: 'ইমরান হোসেন', phone: '01412345678', email: 'imran@example.com' },
        ];
        resolve(mockContacts);
      }, 1500);
    });
  };

  // Validate phone number (Bangladesh format)
  const isValidBangladeshiPhone = (phone: string): boolean => {
    // Clean up the phone number - remove spaces, dashes, etc.
    const cleanPhone = phone.replace(/\s+|-|\(|\)/g, '');
    
    // Check if it's a valid Bangladesh phone number
    // Format: 01XXXXXXXXX or +8801XXXXXXXXX
    const regex = /^(?:\+?880|0)1[3-9]\d{8}$/;
    return regex.test(cleanPhone);
  };

  // Normalize phone number to a standard format
  const normalizePhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\s+|-|\(|\)/g, '');
    
    // If it starts with +880, leave it
    if (cleaned.startsWith('+880')) {
      return cleaned;
    }
    
    // If it starts with 880, add +
    if (cleaned.startsWith('880')) {
      return '+' + cleaned;
    }
    
    // If it starts with 0, replace with +880
    if (cleaned.startsWith('0')) {
      return '+88' + cleaned;
    }
    
    // Otherwise, assume it's a partial number and add +880
    return '+880' + cleaned;
  };

  const uploadMobileContacts = async () => {
    if (!user) {
      toast({
        title: "ত্রুটি!",
        description: "কন্টাক্ট আপলোড করতে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      // Get all contacts from the mobile phone
      const contacts = await getMobileContacts();
      setProgress(30);

      // Filter valid contacts and normalize the phone numbers
      const validContacts = contacts
        .filter(contact => contact.phone && isValidBangladeshiPhone(contact.phone))
        .map(contact => ({
          name: contact.name || 'অজানা',
          phone: normalizePhoneNumber(contact.phone),
          email: contact.email || '',
        }));

      setProgress(60);

      if (validContacts.length === 0) {
        toast({
          title: "ত্রুটি!",
          description: "কোনো বৈধ কন্টাক্ট পাওয়া যায়নি।",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Format for addBulkContacts function
      const formattedContacts = validContacts.map(({ name, email, phone }) => ({
        name,
        email,
        phone,
      }));

      // Add the contacts
      const result = await addBulkContacts(formattedContacts);
      setProgress(100);

      toast({
        title: "সফল!",
        description: `${result.total} টি কন্টাক্টের মধ্যে ${result.added} টি যোগ করা হয়েছে। ${result.duplicates} টি ডুপ্লিকেট ছিল।`,
      });

      setIsLoading(false);
      return result;
    } catch (error) {
      toast({
        title: "ত্রুটি!",
        description: "কন্টাক্ট আপলোড করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return {
    uploadMobileContacts,
    isLoading,
    progress,
  };
};
