
import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminTheme, applyAdminTheme } from '@/themes/adminTheme';

interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    dark: {
      background: string;
      surface: string;
      primary: string;
      text: {
        primary: string;
      }
    }
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    card: string;
    button: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  darkMode: boolean;
}

interface ThemeContextType {
  theme: ThemeState;
  updateTheme: (newTheme: ThemeState) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeState = {
  colors: adminTheme.colors,
  gradients: adminTheme.gradients,
  shadows: adminTheme.shadows,
  borderRadius: adminTheme.borderRadius,
  darkMode: false
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('admin-dark-mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', JSON.stringify(currentTheme));
    const root = document.documentElement;
    applyAdminTheme(root, isDarkMode);
  }, [currentTheme, isDarkMode]);

  useEffect(() => {
    localStorage.setItem('admin-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const updateTheme = (newTheme: ThemeState) => {
    setCurrentTheme(newTheme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      updateTheme, 
      isDarkMode, 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
