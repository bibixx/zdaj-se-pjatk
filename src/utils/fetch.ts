import { AnySchema, Asserts } from 'yup';

import { ROOT_URL } from '../constants/env';
import { joinPath } from './joinPath';

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const customFetch = async <
  T extends AnySchema<Type, TContext, TOut>,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  Type = any,
  TContext = any,
  TOut = any,
  /* eslint-enable @typescript-eslint/no-explicit-any */
>(
  url: string,
  checkData: T,
  init?: RequestInit,
): Promise<Asserts<T>> => {
  const response = await fetch(joinPath(ROOT_URL, url), init);

  if (response.ok) {
    const data = await response.json();

    return checkData.validate(data);
  }

  throw new FetchError(response.statusText, response.status);
};
