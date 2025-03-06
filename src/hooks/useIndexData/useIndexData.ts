import { useMemo } from 'react';

import { useFetchZod } from 'hooks/useFetch/useFetchZod';
import { FetchError } from 'utils/fetch';
import { Pages, pagesSchema } from 'validators/pages';

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
  const { data: pages, loading: pagesLoading } = useFetchZod('index.json', pagesSchema);

  const { data: overrides, loading: overridesLoading } = useFetchZod(`overrides/index.json`, pagesSchema, {
    onError: (error) => {
      if (error instanceof FetchError && error.status === 404) {
        return;
      }

      return error;
    },
  });

  const loading = useMemo(() => pagesLoading || overridesLoading, [overridesLoading, pagesLoading]);

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
