import { makeStyles } from '@material-ui/core';

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

export const TextPageWrapper: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>{children}</div>
  );
};
