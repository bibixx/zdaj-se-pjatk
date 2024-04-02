import { useCallback, useContext } from 'react';

import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';

export const useTrackEvent = () => {
  const piwik = useContext(AnalyticsContext);
  const trackEvent = useCallback(
    (category: string, action: string, name?: string, value?: number) => {
      piwik?.push(['trackEvent', category, action, name, value]);
    },
    [piwik],
  );

  return trackEvent;
};
