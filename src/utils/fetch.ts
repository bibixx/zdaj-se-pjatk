type Checker<T> = (element: unknown) => asserts element is T;

const defaultChecker: Checker<unknown> = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test: unknown
): asserts test is unknown => {};

interface CustomRequestInit extends Omit<RequestInit, 'body'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

const customFetch = async <T = unknown>(
  url: string,
  checkData: Checker<T> = defaultChecker,
  init?: CustomRequestInit
): Promise<T> => {
  const initWithStringifiedBody = init?.body
    ? { ...init, body: JSON.stringify(init.body) }
    : init;

  const response = await fetch(url, initWithStringifiedBody);

  if (response.ok) {
    const data = await response.json();

    checkData(data);

    return data;
  }

  throw new Error(response.statusText);
};

export default customFetch;
