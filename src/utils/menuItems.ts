export const getMenuItems = (language: 'en' | 'bn') => {
  const items = [
    {
      title: language === 'bn' ? 'বিজ্ঞাপন পোস্ট' : 'Create Ad',
      href: '/create-post',
    },
    {
      title: language === 'bn' ? 'রেফারেল সিস্টেম' : 'Referral System',
      href: '/referral',
    },
    {
      title: language === 'bn' ? 'নতুন ভিডিও' : 'New Videos',
      href: '/videos',
    },
    {
      title: language === 'bn' ? 'হোম' : 'Home',
      href: '/',
    },
    {
      title: language === 'bn' ? 'সার্ভিস' : 'Services',
      href: '/services',
    },
    {
      title: language === 'bn' ? 'শপিং' : 'Shopping',
      href: '/shopping',
    },
    {
      title: language === 'bn' ? 'ভাড়া' : 'Rentals',
      href: '/rentals',
    },
    {
      title: language === 'bn' ? 'আমার পছন্দ' : 'My Favorites',
      href: '/favorites',
    },
    {
      title: language === 'bn' ? 'রিভিউ' : 'Reviews',
      href: '/reviews',
    },
    {
      title: language === 'bn' ? 'লয়ালটি রিওয়ার্ড' : 'Loyalty Rewards',
      href: '/rewards',
    },
    {
      title: language === 'bn' ? 'ফিডব্যাক' : 'Feedback',
      href: '/feedback',
    },
    {
      title: language === 'bn' ? 'QR স্ক্যান' : 'QR Scan',
      href: '/qr-scanner',
    },
    {
      title: language === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'Appointments',
      href: '/appointment-booking',
    },
    {
      title: language === 'bn' ? 'ভাষা' : 'Language',
      href: '/language-settings',
    },
    {
      title: language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode',
      href: '/offline-mode',
    },
  ];
  
  return items;
};

export const getSettingsItems = (language: 'en' | 'bn') => {
  return [
    {
      title: language === 'bn' ? 'প্রোফাইল' : 'Profile',
      href: '/profile',
    },
    {
      title: language === 'bn' ? 'ওয়ালেট' : 'Wallet',
      href: '/wallet',
    },
    {
      title: language === 'bn' ? 'আমার পছন্দ' : 'My Favorites',
      href: '/favorites',
    },
    {
      title: language === 'bn' ? 'রিভিউ' : 'Reviews',
      href: '/reviews',
    },
    {
      title: language === 'bn' ? 'লয়ালটি রিওয়ার্ড' : 'Loyalty Rewards',
      href: '/rewards',
    },
    {
      title: language === 'bn' ? 'ফিডব্যাক' : 'Feedback',
      href: '/feedback',
    },
    {
      title: language === 'bn' ? 'QR স্ক্যান' : 'QR Scan',
      href: '/qr-scanner',
    },
    {
      title: language === 'bn' ? 'অ্যাপয়েন্টমেন্ট' : 'Appointments',
      href: '/appointment-booking',
    },
    {
      title: language === 'bn' ? 'ভাষা সেটিংস' : 'Language Settings',
      href: '/language-settings',
    },
    {
      title: language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode',
      href: '/offline-mode',
    },
    {
      title: language === 'bn' ? 'সাহায্য' : 'Help',
      href: '/help',
    },
  ];
};
