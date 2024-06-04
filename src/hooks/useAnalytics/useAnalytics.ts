import { useEffect, useState } from 'react';
import PiwikReactRouter from 'piwik-react-router';
import Cookies from 'cookies-js';

import { getBooleanCookie } from 'utils/cookies';

const CONSENT_KEY = 'consent';

export const piwik = PiwikReactRouter({
  url: 'analytics.legiec.info',
  siteId: 3,
  updateDocumentTitle: false,
  trackErrors: true,
  injectScript: true,
});
piwik.push(['requireConsent']);
piwik.push(['requireCookieConsent']);

export const useAnalytics = () => {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(getBooleanCookie(CONSENT_KEY));

  useEffect(() => {
    if (areCookiesAccepted) {
      piwik.push(['setConsentGiven']);
      piwik.push(['setCookieConsentGiven']);
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
