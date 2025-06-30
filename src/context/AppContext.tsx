
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  user: any;
  setUser: (user: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('bn');
  const [currency, setCurrency] = useState('BDT');
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency,
      user,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
