import { createContext, useContext, useEffect, useState } from 'react';

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  ThemeType,
  getThemeFromStorage,
  setBodyClassName,
} from './ThemeProvider.utils';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(getThemeFromStorage(THEME_STORAGE_KEY, DEFAULT_THEME));

  useEffect(() => {
    setBodyClassName(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: ThemeType) => {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
