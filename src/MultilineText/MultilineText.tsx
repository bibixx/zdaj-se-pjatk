interface Props {
  children: string;
}

export const MultilineText = ({ children }: Props) => {
  const lines = children.split('\n').flatMap((line) => [line, <br />]);

  return <>{lines.slice(0, lines.length - 1)}</>;
};
