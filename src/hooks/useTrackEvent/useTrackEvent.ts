import { useCallback } from 'react';

import { matomo } from 'utils/matomo/matomo';

export const useTrackEvent = () => {
  const trackEvent = useCallback((category: string, action: string, name?: string, value?: number) => {
    matomo?.push(['trackEvent', category, action, name, value]);
  }, []);

  return trackEvent;
};
