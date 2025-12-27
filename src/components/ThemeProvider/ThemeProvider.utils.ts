export type ThemeType = 'system' | 'dark' | 'light';

export const DEFAULT_THEME: ThemeType = 'dark';
export const THEME_STORAGE_KEY = 'ui-theme';

export const getThemeFromStorage = (storageKey: string, defaultTheme: ThemeType): ThemeType => {
  const item = localStorage.getItem(storageKey);

  if (item == null) {
    return defaultTheme;
  }

  if (item === 'system' || item === 'dark' || item === 'light') {
    return item;
  }

  return defaultTheme;
};

export const setBodyClassName = (theme: ThemeType) => {
  const root = window.document.documentElement;

  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
};
