import Cookies from 'cookies-js';

export const getBooleanCookie = (key: string) => {
  const value = Cookies.get(key);
  if (value == null) {
    return undefined;
  }

  return Cookies.get(key) === 'true';
};
