const customFetch = async (url, ...args) => {
  const rootUrl = process.env.REACT_APP_DATA_PATH;

  const rootDeslashed = rootUrl.replace(/\/$/, '');
  const urlDeslashed = url.replace(/^\//, '');

  const response = await fetch(`${rootDeslashed}/${urlDeslashed}`, ...args);

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

export default customFetch;
