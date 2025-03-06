import { useMemo } from 'react';

import { FILES_PATH } from 'constants/env';
import { useFetchZod } from 'hooks/useFetch/useFetchZod';
import { fileSystemSchema } from 'validators/filesList';

export const useFiles = () => {
  const options = useMemo(
    () => ({
      init: { rootUrl: FILES_PATH },
    }),
    [],
  );
  const { data, loading } = useFetchZod(`files.min.json`, fileSystemSchema, options);

  return useMemo(() => {
    if (loading || data === null) {
      return {
        state: 'loading',
      };
    }

    return {
      state: 'done',
      data: data,
    };
  }, [data, loading]);
};
