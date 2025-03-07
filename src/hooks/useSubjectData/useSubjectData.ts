import { useMemo } from 'react';

import { useFetch, UseFetchOptions } from 'hooks/useFetch/useFetch';
import { FetchError } from 'utils/fetch';
import { overrideSubjectSchema, Subject, subjectSchema } from 'validators/subjects';

import { generateMissingQuestionIdsForSubject, getDataWithOverrides } from './useSubjectData.utils';

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

export type UseSubjectData = UseSubjectDataError | UseSubjectDataLoading | UseSubjectDataDone;

export const useSubjectData = (subjectId: string): UseSubjectData => {
  const fetchOptions = useMemo(
    (): UseFetchOptions => ({
      onError: (error: Error | null) => {
        if (error instanceof FetchError && error.status === 404) {
          return;
        }

        return error;
      },
    }),
    [],
  );

  const {
    data: subject,
    loading: subjectLoading,
    is404,
    error,
  } = useFetch(`${subjectId}.json`, subjectSchema, fetchOptions);

  const {
    data: overrides,
    loading: overridesLoading,
    error: overridesError,
  } = useFetch(`overrides/${subjectId}.json`, overrideSubjectSchema, fetchOptions);

  const loading = useMemo(() => subjectLoading || overridesLoading, [overridesLoading, subjectLoading]);

  return useMemo(() => {
    if (overridesError !== null) {
      return {
        state: 'error',
        is404: false,
      };
    }

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
      data: getDataWithOverrides(
        generateMissingQuestionIdsForSubject(subject),
        overrides ? generateMissingQuestionIdsForSubject(overrides) : null,
      ),
    };
  }, [error, is404, loading, overrides, overridesError, subject]);
};
