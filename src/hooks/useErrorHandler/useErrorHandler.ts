import { useCallback, useContext } from 'react';
import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';
import { useToast } from 'components/ui/use-toast';

export const useErrorHandler = () => {
  const piwik = useContext(AnalyticsContext);
  const { toast } = useToast();

  const errorHandler = useCallback(
    (error: Error | null) => {
      toast({
        variant: 'destructive',
        title: 'Ups, coś poszło nie tak',
        description: 'Wystąpił błąd. Spróbuj ponownie później.',
      });

      piwik?.trackError(error);
      // eslint-disable-next-line no-console
      console.error(error);
    },
    [piwik, toast],
  );

  return errorHandler;
};
