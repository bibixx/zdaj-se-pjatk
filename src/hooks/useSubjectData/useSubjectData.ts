import { useCallback, useEffect, useMemo } from 'react';
import { Asserts } from 'yup';

import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { useFetch } from 'hooks/useFetch/useFetch';
import { useUpdatedAt } from 'hooks/useUpdatedAt/useUpdatedAt';
import { FetchError } from 'utils/fetch';
import { Subject, subjectSchema } from 'validators/subjects';
import { getDataWithOverrides } from './useSubjectData.utils';

interface UseSubjectDataError {
  state: 'error';
  is404: boolean;
}

interface UseSubjectDataLoading {
  state: 'loading';
}

interface UseSubjectDataDone {
  state: 'done';
  data: Subject;
}

type UseSubjectData =
  | UseSubjectDataError
  | UseSubjectDataLoading
  | UseSubjectDataDone;

export const useSubjectData = (subjectId: string): UseSubjectData => {
  const { updatedAt, setUpdatedAt } = useUpdatedAt();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    setUpdatedAt(undefined);
  }, [setUpdatedAt]);

  const onLoad = useCallback(
    (newUpdatedAt: number) => {
      setUpdatedAt(Math.max(newUpdatedAt, updatedAt ?? 0));
    },
    [setUpdatedAt, updatedAt],
  );

  const fetchOptions = useMemo(
    () => ({
      onComplete: (data: Asserts<typeof subjectSchema>) =>
        onLoad(data.updatedAt),
      onError: (error: Error | null) => {
        if (error instanceof FetchError && error.status === 404) {
          return;
        }

        errorHandler(error);
      },
    }),
    [errorHandler, onLoad],
  );

  const {
    data: subject,
    loading: subjectLoading,
    is404,
    error,
  } = useFetch(`${subjectId}.json`, subjectSchema, fetchOptions);

  const { data: overrides, loading: overridesLoading } = useFetch(
    `overrides/${subjectId}.json`,
    subjectSchema,
    fetchOptions,
  );

  const loading = useMemo(
    () => subjectLoading || overridesLoading,
    [overridesLoading, subjectLoading],
  );

  return useMemo(() => {
    if (is404 || error !== null) {
      return {
        state: 'error',
        is404,
      };
    }

    if (loading || subject === null) {
      return {
        state: 'loading',
      };
    }

    return {
      state: 'done',
      data: getDataWithOverrides(subject, overrides),
    };
  }, [error, is404, loading, overrides, subject]);
};
