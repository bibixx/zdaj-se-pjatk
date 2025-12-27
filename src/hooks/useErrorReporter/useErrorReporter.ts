import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';

import { useToast } from 'components/ui/use-toast';

export const useErrorReporter = () => {
  const { toast } = useToast();
  const posthog = usePostHog();

  const reportError = useCallback(
    (error: unknown, description = 'Wystąpił błąd. Spróbuj ponownie później.') => {
      toast({
        variant: 'destructive',
        title: 'Ups, coś poszło nie tak',
        description,
      });

      posthog?.captureException(error instanceof Error ? error : new Error(String(error)));

      // eslint-disable-next-line no-console
      console.error(error);
    },
    [toast, posthog],
  );

  return reportError;
};
