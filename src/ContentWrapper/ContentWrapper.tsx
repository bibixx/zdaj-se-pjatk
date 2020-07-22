import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface RootProps {
  loading?: boolean;
}

const useStyles = makeStyles<Theme, RootProps>({
  root: ({ loading = false }) => ({
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
    marginTop: loading ? '64px' : 0,
  }),
});

interface ContentWrapperProps {
  loading?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, loading = false }) => {
  const classes = useStyles({ loading });

  return (
    <Paper classes={{ root: classes.root }} elevation={0}>{children}</Paper>
  );
};

export default ContentWrapper;
