import { useEffect, useMemo, useRef } from 'react';

import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { useFetch } from 'hooks/useFetch/useFetch';
import { useUpdatedAt } from 'hooks/useUpdatedAt/useUpdatedAt';
import { Pages, pagesSchema } from 'validators/pages';
import { FetchError } from 'utils/fetch';
import { getDataWithOverrides } from './useIndexData.utils';

interface UseSubjectDataLoading {
  state: 'loading';
}

interface UseSubjectDataDone {
  state: 'done';
  data: Pages;
}

type UseSubjectData = UseSubjectDataLoading | UseSubjectDataDone;

export const useIndexData = (): UseSubjectData => {
  const errorHandler = useErrorHandler();
  const { setUpdatedAt, updatedAt } = useUpdatedAt();
  const updatedAtRef = useRef(updatedAt);
  useEffect(() => {
    updatedAtRef.current = updatedAt;
  }, [updatedAt]);

  const { data: pages, loading: pagesLoading } = useFetch(
    'index.json',
    pagesSchema,
    {
      onComplete: (data) =>
        setUpdatedAt(Math.max(data.updatedAt, updatedAtRef.current ?? 0)),
      onError: errorHandler,
    },
  );

  const { data: overrides, loading: overridesLoading } = useFetch(
    `overrides/index.json`,
    pagesSchema,
    {
      onComplete: (data: Pages) =>
        setUpdatedAt(Math.max(data.updatedAt, updatedAtRef.current ?? 0)),
      onError: (error) => {
        if (error instanceof FetchError && error.status === 404) {
          return;
        }

        errorHandler(error);
      },
    },
  );

  const loading = useMemo(
    () => pagesLoading || overridesLoading,
    [overridesLoading, pagesLoading],
  );

  return useMemo(() => {
    if (loading || pages === null) {
      return {
        state: 'loading',
      };
    }

    return {
      state: 'done',
      data: getDataWithOverrides(pages, overrides),
    };
  }, [loading, overrides, pages]);
};
