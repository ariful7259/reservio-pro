
// Admin dashboard theme configuration

export const adminTheme = {
  colors: {
    primary: '#2262C6', // নীল
    secondary: '#6E59A5', // বেগুনি
    accent: '#00A389', // সবুজ
    background: '#F5F8FC', // হালকা নীল-সাদা
    primaryLight: 'rgba(34, 98, 198, 0.1)',
    secondaryLight: 'rgba(110, 89, 165, 0.1)',
    accentLight: 'rgba(0, 163, 137, 0.1)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
      muted: '#6B7280',
      light: '#9CA3AF'
    },
    // ডার্ক মোড কালার
    dark: {
      background: '#1F2937',
      surface: '#374151',
      primary: '#60A5FA',
      secondary: '#A78BFA',
      accent: '#34D399',
      text: {
        primary: '#F9FAFB',
        secondary: '#E5E7EB',
        muted: '#D1D5DB'
      }
    }
  },
  gradients: {
    primary: 'linear-gradient(to right, #2262C6, #3C7DEF)',
    secondary: 'linear-gradient(to right, #6E59A5, #9B87F5)',
    accent: 'linear-gradient(to right, #00A389, #00C9A7)',
    success: 'linear-gradient(to right, #059669, #10B981)',
    warning: 'linear-gradient(to right, #D97706, #F59E0B)',
    error: 'linear-gradient(to right, #DC2626, #EF4444)',
    card: {
      primary: 'linear-gradient(135deg, rgba(34, 98, 198, 0.05) 0%, rgba(60, 125, 239, 0.1) 100%)',
      secondary: 'linear-gradient(135deg, rgba(110, 89, 165, 0.05) 0%, rgba(155, 135, 245, 0.1) 100%)',
      accent: 'linear-gradient(135deg, rgba(0, 163, 137, 0.05) 0%, rgba(0, 201, 167, 0.1) 100%)',
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)'
    },
    // নতুন গ্র্যাডিয়েন্ট
    button: {
      primary: 'linear-gradient(to right, #2262C6, #3C7DEF)',
      secondary: 'linear-gradient(to right, #6E59A5, #9B87F5)',
      accent: 'linear-gradient(to right, #00A389, #00C9A7)'
    },
    // নতুন ফ্যান্সি গ্র্যাডিয়েন্ট
    fancy: {
      blue: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
      purple: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      green: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    card: '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
    hover: '0 6px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)',
    button: '0 2px 4px rgba(34, 98, 198, 0.15), 0 1px 2px rgba(34, 98, 198, 0.1)'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem'    // 48px
  },
  animation: {
    fast: '0.2s',
    default: '0.3s',
    slow: '0.5s'
  }
};

export const applyAdminTheme = (element: HTMLElement, isDarkMode: boolean = false): void => {
  // Apply theme colors to CSS variables
  if (element) {
    if (isDarkMode) {
      // ডার্ক মোডের জন্য কালার অ্যাপ্লাই করা
      element.style.setProperty('--color-primary', adminTheme.colors.dark.primary);
      element.style.setProperty('--color-secondary', adminTheme.colors.dark.secondary);
      element.style.setProperty('--color-accent', adminTheme.colors.dark.accent);
      element.style.setProperty('--color-background', adminTheme.colors.dark.background);
      element.style.setProperty('--color-surface', adminTheme.colors.dark.surface);
      
      // টেক্সট কালার
      element.style.setProperty('--color-text-primary', adminTheme.colors.dark.text.primary);
      element.style.setProperty('--color-text-secondary', adminTheme.colors.dark.text.secondary);
      element.style.setProperty('--color-text-muted', adminTheme.colors.dark.text.muted);
    } else {
      // লাইট মোডের জন্য কালার অ্যাপ্লাই করা
      element.style.setProperty('--color-primary', adminTheme.colors.primary);
      element.style.setProperty('--color-secondary', adminTheme.colors.secondary);
      element.style.setProperty('--color-accent', adminTheme.colors.accent);
      element.style.setProperty('--color-background', adminTheme.colors.background);
      element.style.setProperty('--color-primary-light', adminTheme.colors.primaryLight);
      element.style.setProperty('--color-secondary-light', adminTheme.colors.secondaryLight);
      element.style.setProperty('--color-accent-light', adminTheme.colors.accentLight);
      
      // টেক্সট কালার
      element.style.setProperty('--color-text-primary', adminTheme.colors.text.primary);
      element.style.setProperty('--color-text-secondary', adminTheme.colors.text.secondary);
      element.style.setProperty('--color-text-muted', adminTheme.colors.text.muted);
    }
    
    // গ্র্যাডিয়েন্ট
    element.style.setProperty('--gradient-primary', adminTheme.gradients.primary);
    element.style.setProperty('--gradient-secondary', adminTheme.gradients.secondary);
    element.style.setProperty('--gradient-accent', adminTheme.gradients.accent);
    element.style.setProperty('--gradient-card-light', adminTheme.gradients.card.light);
    
    // শ্যাডো
    element.style.setProperty('--shadow-card', adminTheme.shadows.card);
    element.style.setProperty('--shadow-hover', adminTheme.shadows.hover);
    element.style.setProperty('--shadow-button', adminTheme.shadows.button);
    
    // স্পেসিং
    element.style.setProperty('--spacing-md', adminTheme.spacing.md);
    element.style.setProperty('--spacing-lg', adminTheme.spacing.lg);
    element.style.setProperty('--spacing-xl', adminTheme.spacing.xl);
    
    // বর্ডার রেডিয়াস
    element.style.setProperty('--radius-md', adminTheme.borderRadius.md);
    element.style.setProperty('--radius-lg', adminTheme.borderRadius.lg);
    element.style.setProperty('--radius-xl', adminTheme.borderRadius.xl);
  }
};
