
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
  },
  gradients: {
    primary: 'linear-gradient(to right, #2262C6, #3C7DEF)',
    secondary: 'linear-gradient(to right, #6E59A5, #9B87F5)',
    accent: 'linear-gradient(to right, #00A389, #00C9A7)',
    success: 'linear-gradient(to right, #059669, #10B981)',
    warning: 'linear-gradient(to right, #D97706, #F59E0B)',
    error: 'linear-gradient(to right, #DC2626, #EF4444)',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }
};

export const applyAdminTheme = (element: HTMLElement): void => {
  // Apply theme colors to CSS variables
  if (element) {
    element.style.setProperty('--color-primary', adminTheme.colors.primary);
    element.style.setProperty('--color-secondary', adminTheme.colors.secondary);
    element.style.setProperty('--color-accent', adminTheme.colors.accent);
    element.style.setProperty('--color-background', adminTheme.colors.background);
    element.style.setProperty('--color-primary-light', adminTheme.colors.primaryLight);
    element.style.setProperty('--color-secondary-light', adminTheme.colors.secondaryLight);
    element.style.setProperty('--color-accent-light', adminTheme.colors.accentLight);
  }
};
