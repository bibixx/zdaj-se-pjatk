import { useCallback, useEffect, useState } from 'react';
import customFetch from '../utils/fetch';

interface Options<T> {
  init?: RequestInit,
  onComplete?: (data: T) => void;
  onError?: (error: Error) => void;
}

const useFetch = <T>(
  url: string,
  checkData: (element: any) => element is T,
  options: Options<T> = {},
) => {
  const { init, onComplete, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await customFetch(url, checkData, init);

      setLoading(false);
      setData(fetchedData);
      onComplete?.(fetchedData);
    } catch (e) {
      setLoading(false);
      setError(e);
      onError?.(e);
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

export default useFetch;
