import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  getThemeFromStorage,
  setBodyClassName,
} from 'components/ThemeProvider/ThemeProvider.utils';

setBodyClassName(getThemeFromStorage(THEME_STORAGE_KEY, DEFAULT_THEME));

export {};
