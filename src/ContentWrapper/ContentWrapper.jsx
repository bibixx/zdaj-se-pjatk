import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: ({ loading = false }) => ({
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
    marginTop: loading ? '64px' : 0,
  }),
});

const ContentWrapper = ({ children, loading }) => {
  const classes = useStyles({ loading });

  return (
    <Paper classes={{ root: classes.root }} elevation={0}>{children}</Paper>
  );
};

export default ContentWrapper;
