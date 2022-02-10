/* eslint-disable react/no-danger */

import { makeStyles } from '@material-ui/core';
import { useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { typeset } from 'utils/typeset';

const useStyles = makeStyles({
  userContent: {
    overflow: 'auto',
    wordBreak: 'break-word',
    '& p': {
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '& img': {
      background: '#fff',
    },
    '& pre': {
      background: '#272c34',
      color: '#fff',
      borderRadius: 4,
      overflow: 'auto',
      padding: '1em',
      fontSize: '0.9em',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
});

interface Props {
  children: string;
  isMarkdown?: boolean;
}

export const UserContent = ({ children, isMarkdown = false }: Props) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    typeset();
  }, []);

  if (isMarkdown) {
    return (
      <ReactMarkdown className={classes.userContent}>{children}</ReactMarkdown>
    );
  }

  return (
    <span
      className={classes.userContent}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
