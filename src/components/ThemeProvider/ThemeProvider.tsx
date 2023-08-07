import { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'system' | 'dark' | 'light';
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
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

const getThemeFromStorage = (storageKey: string, defaultTheme: ThemeType): ThemeType => {
  const item = localStorage.getItem(storageKey);

  if (item == null) {
    return defaultTheme;
  }

  if (item === 'system' || item === 'dark' || item === 'light') {
    return item;
  }

  return defaultTheme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(getThemeFromStorage(storageKey, defaultTheme));

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: ThemeType) => {
      localStorage.setItem(storageKey, newTheme);
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
