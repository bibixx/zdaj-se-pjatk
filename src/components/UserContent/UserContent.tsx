/* eslint-disable react/no-danger */

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  userContent: {
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
  },
});

interface Props {
  children: string;
}

export const UserContent = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <span
      className={classes.userContent}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
