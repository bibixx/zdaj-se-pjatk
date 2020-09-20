type Checker<T> = (element: unknown) => asserts element is T;

const defaultChecker: Checker<unknown> = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test: unknown
): asserts test is unknown => {};

const customFetch = async <T = unknown>(
  url: string,
  checkData: Checker<T> = defaultChecker,
  init?: RequestInit
): Promise<T> => {
  const rootUrl = process.env.REACT_APP_DATA_PATH || '/';

  const rootDeslashed = rootUrl.replace(/\/$/, '');
  const urlDeslashed = url.replace(/^\//, '');

  const response = await fetch(`${rootDeslashed}/${urlDeslashed}`, init);

  if (response.ok) {
    const data = await response.json();

    checkData(data);

    return data;
  }

  throw new Error(response.statusText);
};

export default customFetch;
