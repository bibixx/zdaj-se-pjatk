import { useContext } from 'react';
import AnalyticsContext from '../../AnalyticsContext/AnalyticsContext';

export const useErrorHandler = () => {
  const piwik = useContext(AnalyticsContext);

  const errorHandler = (error: Error) => {
    piwik?.trackError(error);
    // eslint-disable-next-line no-console
    console.error(error);
  };

  return errorHandler;
};
