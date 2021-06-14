import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const desiredHost = 'pjatk.zdaj.se';

export const RelCanonical = () => {
  const { pathname } = useLocation();

  const shouldRedirect = window.location.host !== desiredHost;

  if (!shouldRedirect) {
    return null;
  }

  return (
    <Helmet>
      <link href={`https://${desiredHost}${pathname}`} rel="canonical" />
    </Helmet>
  );
};
