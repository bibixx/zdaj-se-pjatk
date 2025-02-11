import { useCallback } from 'react';
import * as Sentry from '@sentry/react';

import { useToast } from 'components/ui/use-toast';

export const useErrorReporter = () => {
  const { toast } = useToast();

  const reportError = useCallback(
    (error: unknown, description = 'Wystąpił błąd. Spróbuj ponownie później.') => {
      toast({
        variant: 'destructive',
        title: 'Ups, coś poszło nie tak',
        description,
      });

      Sentry.captureException(error);

      // eslint-disable-next-line no-console
      console.error(error);
    },
    [toast],
  );

  return reportError;
};
