import { useEffect, useState } from 'react';
import Cookies from 'cookies-js';

import { getBooleanCookie } from 'utils/cookies';
import { matomo } from 'utils/matomo/matomo';

const CONSENT_KEY = 'consent';

export const useAnalytics = () => {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(getBooleanCookie(CONSENT_KEY));

  useEffect(() => {
    if (areCookiesAccepted) {
      matomo.push(['setConsentGiven']);
      matomo.push(['setCookieConsentGiven']);
    }
  }, [areCookiesAccepted]);

  const onBannerClose = (cookiesAccepted: boolean) => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    Cookies.set(CONSENT_KEY, cookiesAccepted, {
      expires: expiryDate,
    });

    setAreCookiesAccepted(cookiesAccepted);
  };

  return { areCookiesAccepted, onBannerClose };
};
