import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'invited' | 'joined' | 'invalid' | 'duplicate';
  rewardStatus?: 'eligible' | 'rewarded' | 'ineligible';
}

export const useContactManagement = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'হাসান আহমেদ', email: 'hasan@example.com', phone: '01712345678', status: 'pending', rewardStatus: 'eligible' },
    { id: '2', name: 'ফারহানা বেগম', email: 'farhana@example.com', phone: '01812345678', status: 'invited', rewardStatus: 'eligible' },
    { id: '3', name: 'কামাল হোসেন', email: 'kamal@example.com', phone: '01912345678', status: 'joined', rewardStatus: 'rewarded' },
    { id: '4', name: 'সাদিয়া আক্তার', email: 'sadia@example.com', phone: '01512345678', status: 'invalid', rewardStatus: 'ineligible' },
    { id: '5', name: 'নাজমুল হক', email: 'nazmul@example.com', phone: '01612345678', status: 'duplicate', rewardStatus: 'ineligible' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addContact = async (contact: Omit<Contact, 'id' | 'status' | 'rewardStatus'>) => {
    setLoading(true);
    try {
      // Check if contact already exists
      const isDuplicate = contacts.some(
        c => c.email === contact.email || c.phone === contact.phone
      );

      if (isDuplicate) {
        setError('এই কন্টাক্ট ইতিমধ্যে আছে।');
        setLoading(false);
        return false;
      }

      // In a real implementation, this would be an API call
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      const newContact: Contact = {
        id: Date.now().toString(),
        ...contact,
        status: 'pending',
        rewardStatus: 'eligible',
      };

      setContacts(prev => [...prev, newContact]);
      setLoading(false);
      return true;
    } catch (err) {
      setError('কন্টাক্ট যোগ করতে সমস্যা হয়েছে।');
      setLoading(false);
      return false;
    }
  };

  const addBulkContacts = async (contactList: Array<Omit<Contact, 'id' | 'status' | 'rewardStatus'>>) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const existingEmails = new Set(contacts.map(c => c.email));
      const existingPhones = new Set(contacts.map(c => c.phone));

      const newContacts = contactList.map(contact => {
        const isDuplicate =
          (contact.email && existingEmails.has(contact.email)) || 
          (contact.phone && existingPhones.has(contact.phone));

        return {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...contact,
          status: isDuplicate ? ('duplicate' as const) : ('pending' as const),
          rewardStatus: isDuplicate ? ('ineligible' as const) : ('eligible' as const),
        };
      });

      setContacts(prev => [...prev, ...newContacts]);
      
      // Calculate rewards for the user
      const eligibleContacts = newContacts.filter(c => c.status === 'pending');
      if (eligibleContacts.length > 0) {
        // In a real implementation, this would call an API to add rewards to the user's wallet
        console.log(`Adding ${eligibleContacts.length * 10} rewards to user's wallet`);
      }
      
      setLoading(false);

      return {
        total: contactList.length,
        added: newContacts.filter(c => c.status === 'pending').length,
        duplicates: newContacts.filter(c => c.status === 'duplicate').length,
        reward: newContacts.filter(c => c.status === 'pending').length * 10, // 10 taka per valid contact
      };
    } catch (err) {
      setError('কন্টাক্ট যোগ করতে সমস্যা হয়েছে।');
      setLoading(false);
      return {
        total: 0,
        added: 0,
        duplicates: 0,
        reward: 0,
        error: true,
      };
    }
  };

  const uploadCsvContacts = async (file: File) => {
    setLoading(true);
    try {
      // In a real implementation, this would parse the CSV file
      // and call the API to add the contacts
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data for demonstration
      const mockContacts = [
        { name: 'ইমরান হোসেন', email: 'imran@example.com', phone: '01712345111' },
        { name: 'জাহিদ হাসান', email: 'zahid@example.com', phone: '01712345222' },
        { name: 'মাহফুজা আক্তার', email: 'mahfuza@example.com', phone: '01712345333' },
      ];

      const result = await addBulkContacts(mockContacts);
      setLoading(false);
      return result;
    } catch (err) {
      setError('সিএসভি ফাইল প্রসেস করতে সমস্যা হয়েছে।');
      setLoading(false);
      return {
        total: 0,
        added: 0,
        duplicates: 0,
        error: true,
      };
    }
  };

  const inviteContact = async (contactId: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      setContacts(prev =>
        prev.map(contact =>
          contact.id === contactId
            ? { ...contact, status: 'invited' as const }
            : contact
        )
      );

      setLoading(false);
      return true;
    } catch (err) {
      setError('কন্টাক্ট ইনভাইট করতে সমস্যা হয়েছে।');
      setLoading(false);
      return false;
    }
  };

  const inviteAll = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      setContacts(prev =>
        prev.map(contact =>
          contact.status === 'pending'
            ? { ...contact, status: 'invited' as const }
            : contact
        )
      );

      setLoading(false);
      return true;
    } catch (err) {
      setError('কন্টাক্টগুলি ইনভাইট করতে সমস্যা হয়েছে।');
      setLoading(false);
      return false;
    }
  };

  const deleteContact = async (contactId: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      setLoading(false);
      return true;
    } catch (err) {
      setError('কন্টাক্ট ডিলিট করতে সমস্যা হয়েছে।');
      setLoading(false);
      return false;
    }
  };

  return {
    contacts,
    loading,
    error,
    addContact,
    addBulkContacts,
    uploadCsvContacts,
    inviteContact,
    inviteAll,
    deleteContact,
  };
};
