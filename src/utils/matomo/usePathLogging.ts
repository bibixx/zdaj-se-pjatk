import { useEffect, useRef } from 'react';
import { Location, useLocation } from 'react-router-dom';

import { constructUrl } from 'utils/path';

import { matomo } from './matomo';

const usePathLogging = () => {
  const location = useLocation();
  const prevPathRef = useRef<Location | null>(null);

  useEffect(() => {
    const prevPath = prevPathRef.current;

    const newUrl = constructUrl(window.location.host, '');
    newUrl.pathname = location.pathname;
    newUrl.search = location.search;
    newUrl.hash = location.hash;

    let oldUrl: URL | null = null;
    if (prevPath != null) {
      oldUrl = constructUrl(window.location.host, '');
      oldUrl.pathname = prevPath.pathname;
      oldUrl.search = prevPath.search;
      oldUrl.hash = prevPath.hash;
    }

    matomo.tracePageChange(newUrl.toString(), oldUrl?.toString());

    prevPathRef.current = location;
  }, [location]);
};

interface PathLoggerProviderProps {
  children: React.JSX.Element;
}
export const PathLoggerProvider = (props: PathLoggerProviderProps) => {
  usePathLogging();

  return props.children;
};
