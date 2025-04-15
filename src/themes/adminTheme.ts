// Admin dashboard theme configuration

export const adminTheme = {
  colors: {
    primary: '#4A90E2', // Modern, trustworthy blue
    secondary: '#50E3C2', // Fresh mint green
    accent: '#FF6B6B', // Warm, engaging red
    background: '#F8FAFC', // Clean, subtle background
    primaryLight: 'rgba(74, 144, 226, 0.1)',
    secondaryLight: 'rgba(80, 227, 194, 0.1)',
    accentLight: 'rgba(255, 107, 107, 0.1)',
    success: '#34D399', // Positive green
    warning: '#F59E0B', // Clear warning orange
    error: '#EF4444', // Strong error red
    info: '#3B82F6', // Informative blue
    text: {
      primary: '#1E293B', // Clear, readable dark
      secondary: '#475569', // Balanced gray
      muted: '#64748B', // Subtle text
      light: '#94A3B8' // Light text
    },
    dark: {
      background: '#0F172A', // Rich navy background
      surface: '#1E293B', // Elevated surface
      primary: '#60A5FA', // Bright blue
      secondary: '#5EEAD4', // Cyan
      accent: '#FF6B6B', // Preserved accent
      text: {
        primary: '#F8FAFC', // Clear white
        secondary: '#E2E8F0', // Soft white
        muted: '#CBD5E1' // Muted text
      }
    }
  },
  gradients: {
    primary: 'linear-gradient(to right, #4A90E2, #60A5FA)',
    secondary: 'linear-gradient(to right, #50E3C2, #5EEAD4)',
    accent: 'linear-gradient(to right, #FF6B6B, #FF8787)',
    success: 'linear-gradient(to right, #34D399, #10B981)',
    warning: 'linear-gradient(to right, #F59E0B, #FBBF24)',
    error: 'linear-gradient(to right, #EF4444, #DC2626)',
    card: {
      primary: 'linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(96, 165, 250, 0.1) 100%)',
      secondary: 'linear-gradient(135deg, rgba(80, 227, 194, 0.05) 0%, rgba(94, 234, 212, 0.1) 100%)',
      accent: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 135, 135, 0.1) 100%)',
      light: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.4) 100%)'
    },
    button: {
      primary: 'linear-gradient(to right, #4A90E2, #60A5FA)',
      secondary: 'linear-gradient(to right, #50E3C2, #5EEAD4)',
      accent: 'linear-gradient(to right, #FF6B6B, #FF8787)'
    },
    fancy: {
      blue: 'linear-gradient(120deg, #60A5FA 0%, #93C5FD 100%)',
      mint: 'linear-gradient(120deg, #50E3C2 0%, #5EEAD4 100%)',
      coral: 'linear-gradient(120deg, #FF6B6B 0%, #FF8787 100%)'
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    card: '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
    hover: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
    button: '0 2px 4px rgba(74, 144, 226, 0.15), 0 1px 2px rgba(74, 144, 226, 0.1)'
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
