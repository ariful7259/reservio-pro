
import { createContext, useContext, useEffect, useState } from "react";
import { applyGlobalTheme, isDarkModePreferred, addDarkModeListener } from "@/themes/globalTheme";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentTheme: "dark" | "light"; // আসল অ্যাপ্লাইড থিম
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  currentTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "reservio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let resolvedTheme: "dark" | "light" = "light";

    if (theme === "system") {
      resolvedTheme = isDarkModePreferred() ? "dark" : "light";
    } else {
      resolvedTheme = theme as "dark" | "light";
    }

    root.classList.add(resolvedTheme);
    setCurrentTheme(resolvedTheme);
    
    // গ্লোবাল থিম অ্যাপ্লাই করা
    applyGlobalTheme(resolvedTheme === "dark");

    // সিস্টেম থিম পরিবর্তনের জন্য লিসেনার যুক্ত করা
    let removeListener: (() => void) | undefined;
    
    if (theme === "system") {
      removeListener = addDarkModeListener((isDark) => {
        root.classList.remove("light", "dark");
        const newTheme = isDark ? "dark" : "light";
        root.classList.add(newTheme);
        setCurrentTheme(newTheme);
        applyGlobalTheme(isDark);
      });
    }

    return () => {
      if (removeListener) removeListener();
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    currentTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
