import { useCallback, useEffect } from 'react';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

import { useErrorReporter } from 'hooks/useErrorReporter/useErrorReporter';
import { customFetchZod, CustomRequestInit, FetchError } from 'utils/fetch';
import { assertExistence } from 'utils/assertExistence';

type OnErrorReturn = Error | null | void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseFetchOptionsZod {
  init?: CustomRequestInit;
  onError?: (error: Error) => OnErrorReturn | Promise<OnErrorReturn>;
}

export const useFetchZod = <T extends z.ZodTypeAny>(url: string, checkData: T, options: UseFetchOptionsZod = {}) => {
  const reportError = useErrorReporter();
  const { init, onError } = options;

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
      return { type: 'done' as const, data: await customFetchZod(url, checkData, init) };
    } catch (e) {
      const errorOrNull = e instanceof Error ? e : null;

      if (errorOrNull instanceof FetchError && errorOrNull.status === 404) {
        return { type: '404' as const };
      }

      throw e;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, init]);

  const query = useQuery({ queryKey: [url], queryFn: fetchData, retry: false });
  useEffect(() => {
    const e = query.error;
    if (!e) {
      return;
    }

    const errorOrNull = e instanceof Error ? e : null;
    if (onError != null && errorOrNull != null) {
      handleError(errorOrNull);
    } else {
      reportError(errorOrNull);
    }
  }, [handleError, onError, query.error, reportError]);

  return {
    data: query.data?.type === 'done' ? query.data.data : null,
    loading: query.isLoading,
    error: query.error,
    refetch: fetchData,
    is404: query.data?.type === '404' || (query.error instanceof FetchError && query.error.status === 404),
  };
};
