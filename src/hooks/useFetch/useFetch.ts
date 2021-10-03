import { useCallback, useEffect, useState } from 'react';
import { AnySchema, Asserts } from 'yup';
import { customFetch } from 'utils/fetch';

interface Options<
  T extends AnySchema<Type, TContext, TOut>,
  Type = any,
  TContext = any,
  TOut = any,
> {
  init?: RequestInit;
  onComplete?: (data: Asserts<T>) => void;
  onError?: (error: Error | null) => void;
}

export const useFetch = <
  T extends AnySchema<Type, TContext, TOut>,
  Type = any,
  TContext = any,
  TOut = any,
>(
  url: string,
  checkData: T,
  options: Options<T, Type, TContext, TOut> = {},
) => {
  const { init, onComplete, onError } = options;

  const [data, setData] = useState<Asserts<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

      if (e instanceof Error) {
        setError(e);
        onError?.(e);
      } else {
        setError(null);
        onError?.(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, init]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
