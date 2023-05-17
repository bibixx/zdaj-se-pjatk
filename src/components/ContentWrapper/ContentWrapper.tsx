import React, { ReactNode } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface RootProps {
  noHeader?: boolean;
}

const useStyles = makeStyles<Theme, RootProps>({
  root: ({ noHeader = false }) => ({
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
    marginTop: noHeader ? '64px' : 0,
    '& > *': {
      minWidth: 0,
    },
  }),
});

interface ContentWrapperProps {
  noHeader?: boolean;
  children: ReactNode;
}

export const ContentWrapper = ({
  children,
  noHeader = false,
}: ContentWrapperProps) => {
  const classes = useStyles({ noHeader });

  return (
    <Paper classes={{ root: classes.root }} elevation={0}>
      {children}
    </Paper>
  );
};
