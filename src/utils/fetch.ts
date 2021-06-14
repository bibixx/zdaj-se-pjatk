type Checker<T> = (element: any) => element is T;

const defaultChecker: Checker<any> = (test: any): test is unknown => true;

export const customFetch = async <T = unknown>(
  url: string,
  checkData: Checker<T> = defaultChecker,
  init?: RequestInit,
): Promise<T> => {
  const rootUrl = process.env.REACT_APP_DATA_PATH || '/';

  const rootDeslashed = rootUrl.replace(/\/$/, '');
  const urlDeslashed = url.replace(/^\//, '');

  const response = await fetch(`${rootDeslashed}/${urlDeslashed}`, init);

  if (response.ok) {
    const data = await response.json();

    if (checkData(data)) {
      return data;
    }

    throw new Error('Data doesn\'t match the type');
  }

  throw new Error(response.statusText);
};
