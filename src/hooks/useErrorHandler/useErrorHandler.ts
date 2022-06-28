import { useSnackbar } from 'notistack';
import { useCallback, useContext } from 'react';
import Grow from '@material-ui/core/Grow';
import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';

export const useErrorHandler = () => {
  const piwik = useContext(AnalyticsContext);
  const { enqueueSnackbar } = useSnackbar();

  const errorHandler = useCallback(
    (error: Error | null) => {
      enqueueSnackbar('Wystąpił błąd. Spróbuj ponownie później.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Grow as any,
      });
      piwik?.trackError(error);
      // eslint-disable-next-line no-console
      console.error(error);
    },
    [enqueueSnackbar, piwik],
  );

  return errorHandler;
};
