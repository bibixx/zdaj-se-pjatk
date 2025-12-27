import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';

import { matomo } from 'utils/matomo/matomo';

export const useTrackEvent = () => {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (category: string, action: string, name?: string, value?: number) => {
      matomo?.push(['trackEvent', category, action, name, value]);

      posthog?.capture(`${category} ${action}`, {
        name,
        value,
      });
    },
    [posthog],
  );

  return trackEvent;
};
