
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
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 1) 100%)'
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
  }
};

export const applyAdminTheme = (element: HTMLElement): void => {
  // Apply theme colors to CSS variables
  if (element) {
    // Base colors
    element.style.setProperty('--color-primary', adminTheme.colors.primary);
    element.style.setProperty('--color-secondary', adminTheme.colors.secondary);
    element.style.setProperty('--color-accent', adminTheme.colors.accent);
    element.style.setProperty('--color-background', adminTheme.colors.background);
    element.style.setProperty('--color-primary-light', adminTheme.colors.primaryLight);
    element.style.setProperty('--color-secondary-light', adminTheme.colors.secondaryLight);
    element.style.setProperty('--color-accent-light', adminTheme.colors.accentLight);
    
    // Text colors
    element.style.setProperty('--color-text-primary', adminTheme.colors.text.primary);
    element.style.setProperty('--color-text-secondary', adminTheme.colors.text.secondary);
    element.style.setProperty('--color-text-muted', adminTheme.colors.text.muted);
    
    // Gradients
    element.style.setProperty('--gradient-primary', adminTheme.gradients.primary);
    element.style.setProperty('--gradient-secondary', adminTheme.gradients.secondary);
    element.style.setProperty('--gradient-accent', adminTheme.gradients.accent);
    
    // Shadows
    element.style.setProperty('--shadow-card', adminTheme.shadows.card);
    element.style.setProperty('--shadow-hover', adminTheme.shadows.hover);
    element.style.setProperty('--shadow-button', adminTheme.shadows.button);
  }
};
