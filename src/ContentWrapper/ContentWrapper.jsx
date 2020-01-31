import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
  },
});

const ContentWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }} elevation={0}>{children}</Paper>
  );
};

export default ContentWrapper;
