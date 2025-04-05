
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Define types for our referral data
interface ReferralUser {
  id: string;
  name: string;
  joinDate: string;
  amount: number;
  status: 'completed' | 'pending';
}

interface Milestone {
  id: string;
  count: number;
  reward: number;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  endDate: string;
  timeLeft: string;
  reward: number;
  targetReferrals: number;
  currentReferrals: number;
  isActive: boolean;
  isSpecial: boolean;
}

interface SocialTemplate {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'email' | 'whatsapp';
  title: string;
  content: string;
  image?: string;
  tags?: string[];
}

interface AnalyticsData {
  dailyData: {
    date: string;
    referrals: number;
    earnings: number;
  }[];
  channelData: {
    channel: string;
    referrals: number;
    percentage: number;
  }[];
  conversionRate: number;
  bestPerformingDay: string;
  bestPerformingChannel: string;
}

export interface ReferralData {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  currentMonthReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  referralRate: number;
  validContacts: number;
  validContactPercentage: number;
  referralUsers: ReferralUser[];
  milestones: Milestone[];
  campaigns: Campaign[];
  socialTemplates: SocialTemplate[];
  analytics: AnalyticsData;
  leaderboard: {
    users: {
      id: string;
      name: string;
      referrals: number;
      earnings: number;
      rank: number;
    }[];
    currentUserRank: number;
  };
  kycStatus: {
    personalInfo: boolean;
    idVerification: boolean;
    mobileVerification: boolean;
    isComplete: boolean;
  };
}

// Mock data generator function
const generateMockReferralData = (userId: string): ReferralData => {
  // Generate a deterministic but unique referral code based on userId
  const referralCode = `${userId.substring(0, 4).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
  
  return {
    referralCode,
    referralLink: `https://app.domain.com/signup?ref=${referralCode}`,
    totalReferrals: Math.floor(Math.random() * 50),
    currentMonthReferrals: Math.floor(Math.random() * 10),
    totalEarnings: Math.floor(Math.random() * 10000),
    pendingEarnings: Math.floor(Math.random() * 1000),
    referralRate: 500, // 500 per referral
    validContacts: Math.floor(Math.random() * 100),
    validContactPercentage: Math.floor(Math.random() * 100),
    referralUsers: [
      {
        id: '1',
        name: 'রহিম আহমেদ',
        joinDate: '2024-03-15',
        amount: 500,
        status: 'completed' as const,
      },
      {
        id: '2',
        name: 'মরিয়ম খাতুন',
        joinDate: '2024-03-20',
        amount: 500,
        status: 'completed' as const,
      },
      {
        id: '3',
        name: 'করিম মিয়া',
        joinDate: '2024-04-01',
        amount: 500,
        status: 'pending' as const,
      },
      {
        id: '4',
        name: 'সালমা বেগম',
        joinDate: '2024-04-02',
        amount: 500,
        status: 'pending' as const,
      },
    ],
    milestones: [
      {
        id: '1',
        count: 5,
        reward: 1000,
        description: '৫ জন বন্ধুকে আমন্ত্রণ জানান',
        status: 'completed' as const,
        progress: 100,
      },
      {
        id: '2',
        count: 10,
        reward: 2500,
        description: '১০ জন বন্ধুকে আমন্ত্রণ জানান',
        status: 'in-progress' as const,
        progress: 40,
      },
      {
        id: '3',
        count: 20,
        reward: 5000,
        description: '২০ জন বন্ধুকে আমন্ত্রণ জানান',
        status: 'locked' as const,
        progress: 0,
      },
      {
        id: '4',
        count: 50,
        reward: 15000,
        description: '৫০ জন বন্ধুকে আমন্ত্রণ জানান',
        status: 'locked' as const,
        progress: 0,
      },
    ],
    campaigns: [
      {
        id: '1',
        title: 'বসন্ত বোনাস',
        description: 'বসন্তে বিশেষ বোনাস! রেফার করুন এবং অতিরিক্ত ৫০% বোনাস পান।',
        endDate: '2024-04-30',
        timeLeft: '৫ দিন বাকি',
        reward: 750, // 50% extra
        targetReferrals: 3,
        currentReferrals: 1,
        isActive: true,
        isSpecial: true,
      },
      {
        id: '2',
        title: 'মাসিক চ্যালেঞ্জ',
        description: 'এই মাসে ৫ জনকে রেফার করুন, বিশেষ বোনাস জিতুন।',
        endDate: '2024-04-30',
        timeLeft: '৫ দিন বাকি',
        reward: 1500,
        targetReferrals: 5,
        currentReferrals: 2,
        isActive: true,
        isSpecial: false,
      },
    ],
    socialTemplates: [
      {
        id: '1',
        platform: 'facebook',
        title: 'ফেসবুক শেয়ার',
        content: 'আমি এই অ্যাপ ব্যবহার করে খুব সন্তুষ্ট! আপনিও ব্যবহার করে দেখুন এবং ৫০০ টাকা বোনাস পান! আমার রেফারেল কোড ব্যবহার করুন: {referralCode}',
        tags: ['অ্যাপ', 'বোনাস', 'রেফারেল'],
      },
      {
        id: '2',
        platform: 'twitter',
        title: 'টুইটার শেয়ার',
        content: 'এই অ্যাপ দিয়ে আমি প্রতিদিন সময় বাঁচাচ্ছি! আপনিও ব্যবহার করুন এবং ৫০০ টাকা বোনাস পান। রেফারেল: {referralLink} #অ্যাপ #বোনাস',
        tags: ['অ্যাপ', 'বোনাস', 'রেফারেল'],
      },
      {
        id: '3',
        platform: 'whatsapp',
        title: 'হোয়াটসঅ্যাপ শেয়ার',
        content: 'হ্যালো বন্ধু! আমি এই অ্যাপ ব্যবহার করে খুব সন্তুষ্ট। আপনিও ব্যবহার করুন এবং ৫০০ টাকা বোনাস পান! আমার রেফারেল কোড: {referralCode} অথবা এই লিঙ্কে ক্লিক করুন: {referralLink}',
      },
      {
        id: '4',
        platform: 'email',
        title: 'ইমেইল শেয়ার',
        content: 'প্রিয় বন্ধু,\n\nআশা করি ভালো আছেন। আমি সম্প্রতি একটি দুর্দান্ত অ্যাপ আবিষ্কার করেছি যা আমার জীবনকে অনেক সহজ করেছে। আপনিও এটি ব্যবহার করে দেখতে পারেন।\n\nসাইন আপ করার সময় আমার রেফারেল কোড ব্যবহার করুন: {referralCode}\n\nএতে আপনি ৫০০ টাকা বোনাস পাবেন, এবং আমিও পাবো!\n\nধন্যবাদ,\n{name}',
      },
    ],
    analytics: {
      dailyData: Array.from({ length: 10 }, (_, i) => ({
        date: `2024-04-${i + 1}`,
        referrals: Math.floor(Math.random() * 5),
        earnings: Math.floor(Math.random() * 2000),
      })),
      channelData: [
        { channel: 'Facebook', referrals: 12, percentage: 40 },
        { channel: 'WhatsApp', referrals: 8, percentage: 27 },
        { channel: 'Email', referrals: 6, percentage: 20 },
        { channel: 'Twitter', referrals: 4, percentage: 13 },
      ],
      conversionRate: 35, // 35%
      bestPerformingDay: 'শনিবার',
      bestPerformingChannel: 'Facebook',
    },
    leaderboard: {
      users: [
        { id: '1', name: 'মঞ্জুরুল হক', referrals: 32, earnings: 16000, rank: 1 },
        { id: '2', name: 'নাসরিন আক্তার', referrals: 28, earnings: 14000, rank: 2 },
        { id: '3', name: 'আব্দুল করিম', referrals: 25, earnings: 12500, rank: 3 },
        { id: '4', name: 'রহমান আলী', referrals: 23, earnings: 11500, rank: 4 },
        { id: '5', name: 'সাবিনা খাতুন', referrals: 21, earnings: 10500, rank: 5 },
      ],
      currentUserRank: 18,
    },
    kycStatus: {
      personalInfo: true,
      idVerification: false,
      mobileVerification: true,
      isComplete: false,
    },
  };
};

export const useReferralData = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would be an API call
    if (user) {
      try {
        // Simulate API call with a timeout
        const timeout = setTimeout(() => {
          const mockData = generateMockReferralData(user.id);
          setReferralData(mockData);
          setLoading(false);
        }, 800);

        return () => clearTimeout(timeout);
      } catch (err) {
        setError('রেফারেল ডাটা লোড করতে সমস্যা হয়েছে');
        setLoading(false);
      }
    } else {
      setReferralData(null);
      setLoading(false);
    }
  }, [user]);

  const shareReferral = async (platform: string, templateId: string) => {
    // Implement sharing logic here
    if (!referralData) return;

    const template = referralData.socialTemplates.find(t => t.id === templateId);
    if (!template) return;

    let shareUrl = '';
    let shareText = template.content
      .replace('{referralCode}', referralData.referralCode)
      .replace('{referralLink}', referralData.referralLink)
      .replace('{name}', user?.name || '');

    // Handle sharing based on platform
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.referralLink)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('রেফারেল ইনভিটেশন')}&body=${encodeURIComponent(shareText)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }

    return true;
  };

  return {
    referralData,
    loading,
    error,
    shareReferral,
  };
};
