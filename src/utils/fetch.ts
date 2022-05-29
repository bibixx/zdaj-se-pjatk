import { AnySchema, Asserts } from 'yup';

export class FetchError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const customFetch = async <
  T extends AnySchema<Type, TContext, TOut>,
  Type = any,
  TContext = any,
  TOut = any,
>(
  url: string,
  checkData: T,
  init?: RequestInit,
): Promise<Asserts<T>> => {
  const rootUrl = String(import.meta.env.VITE_DATA_PATH) || '/';

  const rootDeslashed = rootUrl.replace(/\/$/, '');
  const urlDeslashed = url.replace(/^\//, '');

  const response = await fetch(`${rootDeslashed}/${urlDeslashed}`, init);

  if (response.ok) {
    const data = await response.json();

    return checkData.validate(data);
  }

  throw new FetchError(response.statusText, response.status);
};
