export const getCounter = () => {
  let counter = 0;

  // eslint-disable-next-line no-plusplus
  return () => counter++;
};
