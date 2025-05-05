
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SocialMediaInfo {
  platform: string;
  username: string;
  url: string;
}

export interface AnalyzedContact {
  name: string;
  phone: string;
  isNew: boolean;
  socialMedia: SocialMediaInfo[];
  reward: number;
}

export const useContactAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedContacts, setAnalyzedContacts] = useState<AnalyzedContact[]>([]);
  const [totalReward, setTotalReward] = useState(0);
  const { toast } = useToast();

  // মোবাইল কন্টাক্ট অ্যাক্সেস এবং বিশ্লেষণ করার ফাংশন
  const analyzeContacts = async (contacts: Array<{name: string, phone: string}>) => {
    setAnalyzing(true);
    
    try {
      // মক ডাটা - বাস্তব অ্যাপ্লিকেশনে এটি একটি API কল হবে
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // নতুন বিশ্লেষিত কন্টাক্টগুলি
      const analyzed: AnalyzedContact[] = contacts.map(contact => {
        // র‍্যান্ডম সিমুলেশন - নতুন কন্টাক্ট কিনা
        const isNew = Math.random() > 0.3;
        
        // র‍্যান্ডম সিমুলেশন - সোশ্যাল মিডিয়া
        const socialMedia: SocialMediaInfo[] = [];
        if (Math.random() > 0.5) {
          socialMedia.push({
            platform: 'Facebook',
            username: `${contact.name.split(' ')[0].toLowerCase()}`,
            url: `https://facebook.com/${contact.name.split(' ')[0].toLowerCase()}`
          });
        }
        if (Math.random() > 0.7) {
          socialMedia.push({
            platform: 'Instagram',
            username: `${contact.name.split(' ')[0].toLowerCase()}`,
            url: `https://instagram.com/${contact.name.split(' ')[0].toLowerCase()}`
          });
        }
        
        // পুরষ্কার - শুধুমাত্র নতুন কন্টাক্টের জন্য
        const reward = isNew ? Math.floor(Math.random() * 3) + 5 : 0; // ৫-৮ টাকা
        
        return {
          ...contact,
          isNew,
          socialMedia,
          reward
        };
      });
      
      const newTotalReward = analyzed.reduce((sum, contact) => sum + contact.reward, 0);
      
      setAnalyzedContacts(analyzed);
      setTotalReward(newTotalReward);
      setAnalyzing(false);
      
      toast({
        title: "কন্টাক্ট বিশ্লেষণ সম্পন্ন",
        description: `${analyzed.length} টি কন্টাক্ট বিশ্লেষণ করা হয়েছে, ${analyzed.filter(c => c.isNew).length} টি নতুন কন্টাক্ট পাওয়া গেছে।`,
      });
      
      return { analyzed, totalReward: newTotalReward };
      
    } catch (err) {
      setAnalyzing(false);
      toast({
        title: "সমস্যা হয়েছে",
        description: "কন্টাক্ট বিশ্লেষণ করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
      
      return { analyzed: [], totalReward: 0 };
    }
  };
  
  return {
    analyzing,
    analyzedContacts,
    totalReward,
    analyzeContacts
  };
};
