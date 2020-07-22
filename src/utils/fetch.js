const customFetch = async (url, ...args) => {
  const rootUrl = process.env.REACT_APP_DATA_PATH;

  const response = await fetch(`${rootUrl}/${url.replace(/$\/, ''/)}`, ...args);

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

export default customFetch;
