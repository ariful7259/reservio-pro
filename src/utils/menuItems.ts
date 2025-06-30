
// This file now uses the translation system from AppContext
// Import useApp hook in components that use these functions

export const getMenuItems = (language: 'en' | 'bn', t: (key: string) => string) => {
  return [
    {
      title: t('home'),
      href: '/',
    },
    {
      title: t('services'),
      href: '/services',
    },
    {
      title: t('shopping'),
      href: '/shopping',
    },
    {
      title: t('rentals'),
      href: '/rentals',
    },
    {
      title: t('favorites'),
      href: '/favorites',
    },
    {
      title: t('my_reviews'),
      href: '/reviews',
    },
    {
      title: t('loyalty_points'),
      href: '/rewards',
    },
    {
      title: 'ফিডব্যাক',
      href: '/feedback',
    },
    {
      title: 'QR স্ক্যান',
      href: '/qr-scanner',
    },
    {
      title: 'অ্যাপয়েন্টমেন্ট',
      href: '/appointment-booking',
    },
    {
      title: t('language'),
      href: '/language-settings',
    },
    {
      title: t('offline_mode'),
      href: '/offline-mode',
    },
  ];
};

export const getSettingsItems = (language: 'en' | 'bn', t: (key: string) => string) => {
  return [
    {
      title: t('profile'),
      href: '/profile',
    },
    {
      title: t('wallet'),
      href: '/wallet',
    },
    {
      title: t('favorites'),
      href: '/favorites',
    },
    {
      title: t('my_reviews'),
      href: '/reviews',
    },
    {
      title: t('loyalty_points'),
      href: '/rewards',
    },
    {
      title: 'ফিডব্যাক',
      href: '/feedback',
    },
    {
      title: 'QR স্ক্যান',
      href: '/qr-scanner',
    },
    {
      title: 'অ্যাপয়েন্টমেন্ট',
      href: '/appointment-booking',
    },
    {
      title: language === 'bn' ? 'ভাষা সেটিংস' : 'Language Settings',
      href: '/language-settings',
    },
    {
      title: t('offline_mode'),
      href: '/offline-mode',
    },
    {
      title: 'সাহায্য',
      href: '/help',
    },
  ];
};
