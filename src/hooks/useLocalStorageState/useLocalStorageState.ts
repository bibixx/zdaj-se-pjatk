import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

import { safeJSONParse } from 'utils/safeJSONParse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LocalStorageConfig<T extends z.ZodTypeAny = any, U = any> = {
  key: string;
  validator: T;
  defaultValue: U;
};

type R<V, D> = [V | D, (value: V) => void, () => void];

export const useLocalStorageState = <
  Config extends LocalStorageConfig,
  Value = z.infer<Config['validator']>,
  DefaultValue = Config['defaultValue'],
>({
  key,
  validator,
  defaultValue,
}: Config): R<Value, DefaultValue> => {
  const [state, _setState] = useState<Value | DefaultValue>(() => {
    const result = validator.safeParse(safeJSONParse(localStorage.getItem(key)));

    if (result.success) {
      return result.data;
    }

    return defaultValue;
  });

  const setState = useCallback(
    (value: Value) => {
      _setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  const clearState = useCallback(() => {
    _setState(defaultValue);
    localStorage.removeItem(key);
  }, [defaultValue, key]);

  useEffect(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === key) {
        const result = validator.safeParse(safeJSONParse(event.newValue));

        if (result.success) {
          _setState(result.data);
        } else {
          _setState(defaultValue);
        }
      }
    };

    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [defaultValue, key, validator]);

  return [state, setState, clearState];
};
