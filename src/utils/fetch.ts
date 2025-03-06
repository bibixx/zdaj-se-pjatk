import { AnySchema, Asserts } from 'yup';
import { ZodTypeAny, TypeOf } from 'zod';

import { ROOT_URL } from '../constants/env';

import { joinPath } from './joinPath';

export class FetchError extends Error {
  public readonly name = 'FetchError';

  public readonly url: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly headers: Record<string, string>;
  public readonly requestInit?: RequestInit;
  public readonly errorData?: unknown;

  public static async build(response: Response, requestInit?: RequestInit) {
    // Try to extract error body (as JSON or text) for more debugging info.
    const errorData = await response
      .json()
      .catch(() => response.text())
      .catch(() => null);

    const message = `Request failed with status ${response.status} ${response.statusText}`;
    return new FetchError(message, response, errorData, requestInit);
  }

  /**
   * @param message - A human-readable error message.
   * @param response - The original fetch API Response object.
   * @param errorData - Optional, extra data from the response body.
   * @param requestInit - Optional, the original request initialization options.
   */
  private constructor(message: string, response: Response, errorData?: unknown, requestInit?: RequestInit) {
    super(message);
    Object.setPrototypeOf(this, FetchError.prototype); // restore prototype chain

    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.requestInit = requestInit;
    this.errorData = errorData;

    // Convert headers into a plain object.
    this.headers = {};
    response.headers.forEach((value, key) => {
      this.headers[key] = value;
    });
  }
}

export type CustomRequestInit = RequestInit & {
  rootUrl?: string;
};
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
  init?: CustomRequestInit,
): Promise<Asserts<T>> => {
  const rootUrl = init?.rootUrl || ROOT_URL;
  const response = await fetch(joinPath(rootUrl, url), init);

  if (response.ok) {
    const data = await response.json();

    return checkData.validate(data);
  }

  throw await FetchError.build(response, init);
};

export const customFetchZod = async <T extends ZodTypeAny>(
  url: string,
  checkData: T,
  init?: CustomRequestInit,
): Promise<TypeOf<T>> => {
  const rootUrl = init?.rootUrl || ROOT_URL;
  const response = await fetch(joinPath(rootUrl, url), init);

  if (response.ok) {
    const data = await response.json();

    return checkData.parseAsync(data);
  }

  throw await FetchError.build(response, init);
};
