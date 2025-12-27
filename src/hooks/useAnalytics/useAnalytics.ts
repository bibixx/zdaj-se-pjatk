import { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import { usePostHog } from 'posthog-js/react';

import { getBooleanCookie } from 'utils/cookies';
import { matomo } from 'utils/matomo/matomo';

const CONSENT_KEY = 'consent';

export const useAnalytics = () => {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(getBooleanCookie(CONSENT_KEY));
  const posthog = usePostHog();

  useEffect(() => {
    if (areCookiesAccepted) {
      matomo.push(['setConsentGiven']);
      matomo.push(['setCookieConsentGiven']);
      posthog?.opt_in_capturing();
    } else {
      matomo.push(['forgetConsentGiven']);
      matomo.push(['forgetCookieConsentGiven']);
      posthog?.opt_out_capturing();
    }
  }, [areCookiesAccepted, posthog]);

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
