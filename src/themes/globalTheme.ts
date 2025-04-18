
/**
 * গ্লোবাল থিম কনফিগারেশন ফাইল
 * সমগ্র অ্যাপের জন্য একটি সামঞ্জস্যপূর্ণ রঙ, স্পেসিং, শ্যাডো, এবং অন্যান্য ডিজাইন ভেরিয়েবল সংজ্ঞায়িত করে
 */

export const globalTheme = {
  colors: {
    primary: '#2262C6', // প্রধান নীল - বাটন, হেডার, অন্যান্য মুখ্য উপাদান
    primaryLight: 'rgba(34, 98, 198, 0.1)', // হালকা নীল - ব্যাকগ্রাউন্ড টিন্ট
    primaryDark: '#1a4da3', // গাঢ় নীল - হোভার স্টেট
    
    secondary: '#6E59A5', // বেগুনি - সেকেন্ডারি অ্যাকশন, অ্যাকসেন্ট
    secondaryLight: 'rgba(110, 89, 165, 0.1)', // হালকা বেগুনি
    secondaryDark: '#574483', // গাঢ় বেগুনি - হোভার স্টেট
    
    accent: '#00A389', // টার্কোয়াজ/সবুজ - বিশেষ হাইলাইট
    accentLight: 'rgba(0, 163, 137, 0.1)', // হালকা টার্কোয়াজ
    accentDark: '#00826e', // গাঢ় টার্কোয়াজ
    
    success: '#10B981', // সবুজ - সফল কার্যক্রম
    warning: '#F59E0B', // কমলা - সতর্কতা
    error: '#EF4444', // লাল - ত্রুটি
    info: '#3B82F6', // হালকা নীল - তথ্য
    
    background: '#F5F8FC', // হালকা গ্রে - মূল ব্যাকগ্রাউন্ড
    card: '#FFFFFF', // সাদা - কার্ড, উপাদান
    
    text: {
      primary: '#1F2937', // ডার্ক গ্রে - প্রাথমিক টেক্সট
      secondary: '#4B5563', // মাঝারি গ্রে - সেকেন্ডারি টেক্সট
      muted: '#6B7280', // হালকা গ্রে - মিউটেড টেক্সট
      light: '#9CA3AF', // অতি হালকা গ্রে - হিন্ট টেক্সট
      white: '#FFFFFF', // সাদা টেক্সট - ডার্ক ব্যাকগ্রাউন্ডের জন্য
    },
    
    // ডার্ক মোড কালার
    dark: {
      background: '#1F2937', // ডার্ক গ্রে - মূল ব্যাকগ্রাউন্ড
      card: '#374151', // গাঢ় গ্রে - কার্ড, উপাদান
      surface: '#111827', // কালো গ্রে - সারফেস
      primary: '#60A5FA', // নীল - ডার্ক মোডে প্রাইমারি
      secondary: '#A78BFA', // হালকা বেগুনি
      accent: '#34D399', // হালকা সবুজ
      text: {
        primary: '#F9FAFB', // অতি হালকা গ্রে - প্রাইমারি টেক্সট
        secondary: '#E5E7EB', // হালকা গ্রে - সেকেন্ডারি টেক্সট
        muted: '#D1D5DB', // মিডিয়াম গ্রে - মিউটেড টেক্সট
      }
    }
  },
  
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    full: '9999px', // পুরোপুরি গোল
  },
  
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem'    // 48px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    card: '0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03)',
    elevated: '0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.05)'
  },
  
  gradients: {
    primary: 'linear-gradient(to right, #2262C6, #3C7DEF)',
    secondary: 'linear-gradient(to right, #6E59A5, #9B87F5)',
    accent: 'linear-gradient(to right, #00A389, #00C9A7)',
    
    // কার্ড গ্র্যাডিয়েন্ট
    card: {
      primary: 'linear-gradient(135deg, rgba(34, 98, 198, 0.05) 0%, rgba(60, 125, 239, 0.1) 100%)',
      secondary: 'linear-gradient(135deg, rgba(110, 89, 165, 0.05) 0%, rgba(155, 135, 245, 0.1) 100%)',
      accent: 'linear-gradient(135deg, rgba(0, 163, 137, 0.05) 0%, rgba(0, 201, 167, 0.1) 100%)'
    }
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    default: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  },
  
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      bengali: 'SolaimanLipi, Hind Siliguri, Kalpurush, Shonar Bangla, sans-serif'
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem'      // 48px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    
    lineHeight: {
      none: '1',
      tight: '1.25',
      normal: '1.5',
      loose: '1.75'
    }
  }
};

/**
 * থিম অ্যাপ্লাই করার ফাংশন - CSS ভেরিয়েবলগুলিকে ডকুমেন্ট রুটে সেট করে
 */
export const applyGlobalTheme = (isDarkMode: boolean = false): void => {
  const root = document.documentElement;
  const theme = isDarkMode ? globalTheme.colors.dark : globalTheme.colors;
  
  // প্রাইমারি কালার
  root.style.setProperty('--color-primary', theme.primary || globalTheme.colors.primary);
  root.style.setProperty('--color-primary-light', globalTheme.colors.primaryLight);
  root.style.setProperty('--color-primary-dark', globalTheme.colors.primaryDark);
  
  // সেকেন্ডারি কালার
  root.style.setProperty('--color-secondary', theme.secondary || globalTheme.colors.secondary);
  root.style.setProperty('--color-secondary-light', globalTheme.colors.secondaryLight);
  root.style.setProperty('--color-secondary-dark', globalTheme.colors.secondaryDark);
  
  // অ্যাকসেন্ট কালার
  root.style.setProperty('--color-accent', theme.accent || globalTheme.colors.accent);
  root.style.setProperty('--color-accent-light', globalTheme.colors.accentLight);
  root.style.setProperty('--color-accent-dark', globalTheme.colors.accentDark);
  
  // স্ট্যাটাস কালার
  root.style.setProperty('--color-success', globalTheme.colors.success);
  root.style.setProperty('--color-warning', globalTheme.colors.warning);
  root.style.setProperty('--color-error', globalTheme.colors.error);
  root.style.setProperty('--color-info', globalTheme.colors.info);
  
  // ব্যাকগ্রাউন্ড এবং সারফেস
  root.style.setProperty('--color-background', theme.background || globalTheme.colors.background);
  root.style.setProperty('--color-card', theme.card || globalTheme.colors.card);
  
  // টেক্সট কালার
  const textTheme = isDarkMode ? theme.text : globalTheme.colors.text;
  root.style.setProperty('--color-text-primary', textTheme.primary);
  root.style.setProperty('--color-text-secondary', textTheme.secondary);
  root.style.setProperty('--color-text-muted', textTheme.muted);
  
  // বর্ডার রেডিয়াস
  root.style.setProperty('--radius-sm', globalTheme.borderRadius.sm);
  root.style.setProperty('--radius-md', globalTheme.borderRadius.md);
  root.style.setProperty('--radius-lg', globalTheme.borderRadius.lg);
  root.style.setProperty('--radius-xl', globalTheme.borderRadius.xl);
  
  // শ্যাডো
  root.style.setProperty('--shadow-sm', globalTheme.shadows.sm);
  root.style.setProperty('--shadow-md', globalTheme.shadows.md);
  root.style.setProperty('--shadow-lg', globalTheme.shadows.lg);
  root.style.setProperty('--shadow-card', globalTheme.shadows.card);
  root.style.setProperty('--shadow-elevated', globalTheme.shadows.elevated);
  
  // গ্র্যাডিয়েন্ট
  root.style.setProperty('--gradient-primary', globalTheme.gradients.primary);
  root.style.setProperty('--gradient-secondary', globalTheme.gradients.secondary);
  root.style.setProperty('--gradient-accent', globalTheme.gradients.accent);
  
  // স্পেসিং
  root.style.setProperty('--spacing-xs', globalTheme.spacing.xs);
  root.style.setProperty('--spacing-sm', globalTheme.spacing.sm);
  root.style.setProperty('--spacing-md', globalTheme.spacing.md);
  root.style.setProperty('--spacing-lg', globalTheme.spacing.lg);
  root.style.setProperty('--spacing-xl', globalTheme.spacing.xl);
  
  // ট্রানজিশন
  root.style.setProperty('--transition-fast', globalTheme.transitions.fast);
  root.style.setProperty('--transition-default', globalTheme.transitions.default);
  root.style.setProperty('--transition-slow', globalTheme.transitions.slow);
};

// থিম ইউটিলিটি
export const isDarkModePreferred = (): boolean => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// সিস্টেম থিম পরিবর্তন করলে হ্যান্ডেল করা
export const addDarkModeListener = (callback: (isDark: boolean) => void): () => void => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (e: MediaQueryListEvent) => callback(e.matches);
  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
};
