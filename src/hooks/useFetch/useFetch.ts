import { useCallback, useEffect, useState } from 'react';
import { AnySchema, Asserts } from 'yup';

import { useErrorReporter } from 'hooks/useErrorReporter/useErrorReporter';
import { customFetch, FetchError } from 'utils/fetch';
import { assertExistence } from 'utils/assertExistence';

type OnErrorReturn = Error | null | void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseFetchOptions<T extends AnySchema<Type, TContext, TOut>, Type = any, TContext = any, TOut = any> {
  init?: RequestInit;
  onComplete?: (data: Asserts<T>) => void;
  onError?: (error: Error) => OnErrorReturn | Promise<OnErrorReturn>;
}

export const useFetch = <
  T extends AnySchema<Type, TContext, TOut>,
  Type = any,
  TContext = any,
  TOut = any,
  /* eslint-enable @typescript-eslint/no-explicit-any */
>(
  url: string,
  checkData: T,
  options: UseFetchOptions<T, Type, TContext, TOut> = {},
) => {
  const reportError = useErrorReporter();
  const { init, onComplete, onError } = options;

  const [data, setData] = useState<Asserts<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback(
    async (error: Error) => {
      try {
        assertExistence(onError);
        const result = await onError(error);

        if (result != null) {
          reportError(error);
        }
      } catch (newError) {
        reportError(newError);
      }
    },
    [onError, reportError],
  );

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await customFetch(url, checkData, init);

      if (!fetchData) {
        return;
      }

      setLoading(false);
      setData(fetchedData);
      onComplete?.(fetchedData);
    } catch (e) {
      setLoading(false);

      const errorOrNull = e instanceof Error ? e : null;
      setError(errorOrNull);

      if (onError != null && errorOrNull != null) {
        handleError(errorOrNull);
      } else {
        reportError(errorOrNull);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, init, reportError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    is404: error instanceof FetchError && error.status === 404,
  };
};
