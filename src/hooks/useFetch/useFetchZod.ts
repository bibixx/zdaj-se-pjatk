import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { useErrorReporter } from 'hooks/useErrorReporter/useErrorReporter';
import { customFetchZod, CustomRequestInit, FetchError } from 'utils/fetch';
import { assertExistence } from 'utils/assertExistence';

type OnErrorReturn = Error | null | void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseFetchOptionsZod<T extends z.ZodTypeAny> {
  init?: CustomRequestInit;
  onComplete?: (data: z.infer<T>) => void;
  onError?: (error: Error) => OnErrorReturn | Promise<OnErrorReturn>;
}

export const useFetchZod = <T extends z.ZodTypeAny>(url: string, checkData: T, options: UseFetchOptionsZod<T> = {}) => {
  const reportError = useErrorReporter();
  const { init, onComplete, onError } = options;

  const [data, setData] = useState<z.infer<T> | null>(null);
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
      const fetchedData = await customFetchZod(url, checkData, init);

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
