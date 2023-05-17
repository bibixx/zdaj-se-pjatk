import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

export const useStyles = makeStyles({
  wrapper: {
    '& h2': {
      marginBottom: '0.25rem',
      '& + h3': {
        marginTop: 0,
      },
    },
    '& h3': {
      marginBottom: 0,
      '& + p': {
        marginTop: 0,
      },
    },
  },
});

interface TextPageWrapperProps {
  children: ReactNode;
}
export const TextPageWrapper = ({ children }: TextPageWrapperProps) => {
  const classes = useStyles();

  return <div className={classes.wrapper}>{children}</div>;
};
