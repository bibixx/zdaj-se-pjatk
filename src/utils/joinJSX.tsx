export const joinJSX = (elements: React.ReactNode[], delimiter: React.ReactNode) => {
  return <>{elements.flatMap((element, i) => (i === 0 ? element : [delimiter, element]))}</>;
};
