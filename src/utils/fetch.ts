import { AnySchema, Asserts } from 'yup';

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
  const rootUrl = process.env.REACT_APP_DATA_PATH || '/';

  const rootDeslashed = rootUrl.replace(/\/$/, '');
  const urlDeslashed = url.replace(/^\//, '');

  const response = await fetch(`${rootDeslashed}/${urlDeslashed}`, init);

  if (response.ok) {
    const data = await response.json();

    return checkData.validate(data);
  }

  throw new Error(response.statusText);
};
