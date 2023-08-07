import { Fragment } from 'react';

interface Props {
  children: string;
}

export const MultilineText = ({ children }: Props) => {
  const lines = children
    .split('\n')
    .flatMap((line, i) => [<Fragment key={`line-${i}`}>{line}</Fragment>, <br key={`br-${i}`} />]);

  return <>{lines.slice(0, lines.length - 1)}</>;
};
