let promise: null | Promise<undefined> = null;

export const typeset = async () => {
  if (promise !== null) {
    return promise;
  }

  promise = window.MathJax.typesetPromise();

  const result = await promise;
  promise = null;

  return result;
};
