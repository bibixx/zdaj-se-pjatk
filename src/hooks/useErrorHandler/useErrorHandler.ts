import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import Grow from '@material-ui/core/Grow';
import AnalyticsContext from '../../AnalyticsContext/AnalyticsContext';

export const useErrorHandler = () => {
  const piwik = useContext(AnalyticsContext);
  const { enqueueSnackbar } = useSnackbar();

  const errorHandler = (error: Error) => {
    enqueueSnackbar(
      'Wystąpił błąd. Spóbuj ponownie później.',
      {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Grow as any,
      },
    );
    piwik?.trackError(error);
    // eslint-disable-next-line no-console
    console.error(error);
  };

  return errorHandler;
};
